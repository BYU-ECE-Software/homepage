'use client';

import { useState } from 'react';
import Link from 'next/link';
import EventGrid from './EventGrid';
import type { EventItem } from './EventCard';

type View = 'cards' | 'calendar';

function getEventDateKey(item: EventItem) {
  if (item.dateKey && /^\d{4}-\d{2}-\d{2}$/.test(item.dateKey)) return item.dateKey;

  // Older generated event data only has a formatted date. Keep it usable
  // until the calendar feed is regenerated with dateKey values.
  const parsed = new Date(item.date);
  if (Number.isNaN(parsed.getTime())) return null;

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function CalendarView({ items }: { items: EventItem[] }) {
  const [month, setMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const monthLabel = month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  const days = Array.from({ length: cellCount }, (_, index) => {
    const date = new Date(year, monthIndex, index - firstWeekday + 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return { date, key, inMonth: date.getMonth() === monthIndex };
  });

  const eventsByDate = new Map<string, EventItem[]>();
  for (const item of items) {
    const key = getEventDateKey(item);
    if (!key) continue;
    const dateEvents = eventsByDate.get(key) ?? [];
    dateEvents.push(item);
    eventsByDate.set(key, dateEvents);
  }

  const hasMonthEvents = days.some(({ key, inMonth }) => inMonth && eventsByDate.has(key));

  return (
    <section aria-label="Events calendar" className="mt-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setMonth(new Date(year, monthIndex - 1, 1))}
          className="rounded-md border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-byu-royal"
          aria-label="Show previous month"
        >
          <span aria-hidden="true">←</span>
          <span className="sr-only"> Previous month</span>
        </button>
        <h2 className="text-byu-navy text-xl font-semibold" aria-live="polite" aria-atomic="true">
          {monthLabel}
        </h2>
        <button
          type="button"
          onClick={() => setMonth(new Date(year, monthIndex + 1, 1))}
          className="rounded-md border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-byu-royal"
          aria-label="Show next month"
        >
          <span aria-hidden="true">→</span>
          <span className="sr-only"> Next month</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full min-w-[42rem] table-fixed border-collapse">
          <thead>
            <tr className="bg-slate-100 text-left text-sm text-slate-700">
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
                (weekday) => (
                  <th key={weekday} scope="col" className="border-b border-slate-200 px-3 py-2">
                    <span className="hidden sm:inline">{weekday}</span>
                    <span className="sm:hidden">{weekday.slice(0, 3)}</span>
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: cellCount / 7 }, (_, week) => (
              <tr key={week}>
                {days.slice(week * 7, week * 7 + 7).map(({ date, key, inMonth }) => {
                  const dateEvents = eventsByDate.get(key) ?? [];
                  return (
                    <td
                      key={key}
                      className={`h-28 border-t border-r border-slate-200 p-2 align-top last:border-r-0 sm:h-36 ${inMonth ? 'bg-white' : 'bg-slate-50 text-slate-400'}`}
                    >
                      <time
                        dateTime={key}
                        className={`text-sm font-semibold ${inMonth ? 'text-slate-800' : 'text-slate-400'}`}
                      >
                        {date.getDate()}
                      </time>
                      <ul className="mt-1 space-y-1 overflow-y-auto text-xs leading-4 sm:text-sm">
                        {dateEvents.map((item, index) => {
                          const content = (
                            <>
                              {item.time && <span className="font-semibold">{item.time} </span>}
                              <span>{item.title}</span>
                            </>
                          );
                          const className =
                            'block rounded bg-blue-50 px-1.5 py-1 text-byu-navy hover:bg-blue-100 hover:underline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-byu-royal';

                          return (
                            <li key={`${item.title}-${index}`}>
                              {item.href?.startsWith('/') ? (
                                <Link href={item.href} className={className}>
                                  {content}
                                </Link>
                              ) : item.href ? (
                                <a
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={className}
                                >
                                  {content}
                                </a>
                              ) : (
                                <span className={className}>{content}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!hasMonthEvents && (
        <p className="mt-4 text-center leading-7 text-slate-600">
          No events are scheduled for {monthLabel}.
        </p>
      )}
    </section>
  );
}

export default function EventViewToggle({ items }: { items: EventItem[] }) {
  const [view, setView] = useState<View>('cards');

  return (
    <>
      <div className="flex justify-end">
        <div className="inline-flex rounded-md border border-slate-300 p-1" role="group" aria-label="Choose event view">
          <button
            type="button"
            aria-pressed={view === 'cards'}
            onClick={() => setView('cards')}
            className={`rounded px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-byu-royal ${view === 'cards' ? 'bg-byu-navy text-white' : 'text-slate-700 hover:bg-slate-100'}`}
          >
            Cards
          </button>
          <button
            type="button"
            aria-pressed={view === 'calendar'}
            onClick={() => setView('calendar')}
            className={`rounded px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-byu-royal ${view === 'calendar' ? 'bg-byu-navy text-white' : 'text-slate-700 hover:bg-slate-100'}`}
          >
            Calendar
          </button>
        </div>
      </div>
      {view === 'cards' || items.length === 0 ? (
        <div className="mt-6">
          <EventGrid items={items} />
        </div>
      ) : (
        <CalendarView items={items} />
      )}
    </>
  );
}
