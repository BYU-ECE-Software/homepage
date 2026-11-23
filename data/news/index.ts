import type { NewsStory } from './types';
import archiveStories from './stories/archive';
import gpsFailsHeroratsByuEngineers from './stories/gps-fails-herorats-byu-engineers';
import honorGraduateMarineCorpsOfficerCandidate from './stories/honor-graduate-marine-corps-officer-candidate';
import remoteIdForOlderDrones from './stories/remote-id-for-older-drones';
import thinkSmall from './stories/think-small';
import wearableTechnologySearchAndRescueRats from './stories/wearable-technology-search-and-rescue-rats';

export type { NewsStory } from './types';

const existingStories: NewsStory[] = [
  gpsFailsHeroratsByuEngineers,
  honorGraduateMarineCorpsOfficerCandidate,
  remoteIdForOlderDrones,
  thinkSmall,
  wearableTechnologySearchAndRescueRats,
];

const normalizeSourceUrl = (url?: string) => url?.replace(/\/+$/, '').toLowerCase();
const existingSourceUrls = new Set(
  existingStories.map((story) => normalizeSourceUrl(story.sourceUrl)),
);

export const stories: NewsStory[] = [
  ...existingStories,
  ...archiveStories.filter(
    (story) => !existingSourceUrls.has(normalizeSourceUrl(story.sourceUrl)),
  ),
].sort((a, b) => b.date.localeCompare(a.date));
