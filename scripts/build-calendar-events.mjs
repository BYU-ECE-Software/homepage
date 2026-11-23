#!/usr/bin/env node
// Fetches the department Outlook calendar (.ics) and converts upcoming
// VEVENTs into data/events/events.generated.json, consumed by
// data/events/index.ts. This runs at build time (see package.json) because
// the site is a static export (next.config.ts: output: 'export') with no
// server to fetch the calendar live on each request — events are only as
// fresh as the last build/deploy.

import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const outFile = path.join(rootDir, 'data', 'events', 'events.generated.json');

const CALENDAR_URL =
  'https://outlook.office365.com/owa/calendar/a3e0f18708ff4147888db4e15f9bf045@byu.edu/5c669c3dec7b43f4b4501530b96369703597652552248665359/calendar.ics';

// Only keep events starting within this many days from now, and cap the
// count, so the page doesn't grow unbounded as the calendar fills up.
const MAX_DAYS_AHEAD = 180;
const MAX_EVENTS = 50;

// Unfolds RFC 5545 line-folding (continuation lines start with a space or
// tab) so each logical property is on one line before we split into VEVENTs.
function unfold(ics) {
  return ics.replace(/\r\n[ \t]/g, '').replace(/\n[ \t]/g, '');
}

function splitEvents(ics) {
  const blocks = [];
  const regex = /BEGIN:VEVENT([\s\S]*?)END:VEVENT/g;
  let match;
  while ((match = regex.exec(ics)) !== null) {
    blocks.push(match[1]);
  }
  return blocks;
}

// Pulls a property value out of an unfolded VEVENT block, e.g.
// `DTSTART;TZID=Mountain Standard Time:20260521T180000` -> the part after
// the last colon. Returns undefined if the property isn't present.
function property(block, name) {
  const regex = new RegExp(`^${name}(?:;[^:\\r\\n]*)?:(.*)$`, 'm');
  const match = block.match(regex);
  return match ? match[1].trim() : undefined;
}

// Reverses the backslash-escaping .ics TEXT values use for commas,
// semicolons, newlines, and backslashes.
function unescapeText(value) {
  return value
    .replace(/\\n/gi, ' ')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\');
}

// Parses DATE (YYYYMMDD) or DATE-TIME (YYYYMMDDTHHMMSS[Z]) values into a JS
// Date. Floating/local times (no Z, no TZID handled here) are treated as
// local time, which is close enough for display purposes on this page.
function parseIcsDate(value) {
  if (!value) return null;
  const dateOnly = /^(\d{4})(\d{2})(\d{2})$/.exec(value);
  if (dateOnly) {
    const [, y, m, d] = dateOnly;
    return new Date(Number(y), Number(m) - 1, Number(d));
  }
  const dateTime = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z)?$/.exec(value);
  if (dateTime) {
    const [, y, m, d, hh, mm, ss, z] = dateTime;
    if (z) {
      return new Date(Date.UTC(Number(y), Number(m) - 1, Number(d), Number(hh), Number(mm), Number(ss)));
    }
    return new Date(Number(y), Number(m) - 1, Number(d), Number(hh), Number(mm), Number(ss));
  }
  return null;
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatTime(date, isAllDay) {
  if (isAllDay) return undefined;
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function toEventItem(block) {
  const summary = property(block, 'SUMMARY');
  const dtstartRaw = property(block, 'DTSTART');
  if (!summary || !dtstartRaw) return null;

  const isAllDay = /^\d{8}$/.test(dtstartRaw);
  const start = parseIcsDate(dtstartRaw);
  if (!start) return null;

  const location = property(block, 'LOCATION');
  const description = property(block, 'DESCRIPTION');
  const url = property(block, 'URL');

  return {
    title: unescapeText(summary),
    date: formatDate(start),
    dateKey: formatDateKey(start),
    time: formatTime(start, isAllDay),
    location: location ? unescapeText(location) : undefined,
    description: description ? unescapeText(description) : undefined,
    href: url || undefined,
    _sortKey: start.getTime(),
  };
}

async function main() {
  let events = [];

  try {
    const response = await fetch(CALENDAR_URL);
    if (!response.ok) {
      throw new Error(`Calendar fetch failed: ${response.status} ${response.statusText}`);
    }
    const ics = unfold(await response.text());
    const now = Date.now();
    const cutoff = now + MAX_DAYS_AHEAD * 24 * 60 * 60 * 1000;

    events = splitEvents(ics)
      .map(toEventItem)
      .filter((event) => event !== null)
      .filter((event) => event._sortKey >= now && event._sortKey <= cutoff)
      .sort((a, b) => a._sortKey - b._sortKey)
      .slice(0, MAX_EVENTS)
      .map(({ _sortKey, ...event }) => event);
  } catch (error) {
    console.warn(`[build-calendar-events] Skipping calendar fetch: ${error.message}`);
  }

  mkdirSync(path.dirname(outFile), { recursive: true });
  writeFileSync(outFile, JSON.stringify(events, null, 2) + '\n');
  console.log(`Wrote ${events.length} events to ${path.relative(rootDir, outFile)}`);
}

main();
