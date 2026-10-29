import type { NewsStory } from './types';
import gpsFailsHeroratsByuEngineers from './stories/gps-fails-herorats-byu-engineers';
import honorGraduateMarineCorpsOfficerCandidate from './stories/honor-graduate-marine-corps-officer-candidate';
import remoteIdForOlderDrones from './stories/remote-id-for-older-drones';
import thinkSmall from './stories/think-small';
import wearableTechnologySearchAndRescueRats from './stories/wearable-technology-search-and-rescue-rats';

export type { NewsStory } from './types';

export const stories: NewsStory[] = [
  gpsFailsHeroratsByuEngineers,
  honorGraduateMarineCorpsOfficerCandidate,
  remoteIdForOlderDrones,
  thinkSmall,
  wearableTechnologySearchAndRescueRats,
].sort((a, b) => b.date.localeCompare(a.date));
