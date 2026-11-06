import type { NewsStory } from '../types';

const content = `
    A team of BYU electrical and computer engineering students helped make it easier for search and rescue workers to locate survivors after earthquakes, with help from an unusual partner: rats.

    As part of a humanitarian Capstone project, a team of six BYU electrical and computer engineering students and one mechanical engineering student worked with APOPO, an organization that trains African giant pouched rats, known as HeroRATs, to detect people trapped in rubble.

    “So we were tasked with creating a localization unit so that search and rescuers on the ground could see the exact location of where the rats were and where the survivors of these earthquakes were,” said Quinn Bird, a BYU electrical engineering graduate.

    The team's challenge was to design a tracking system that could work in environments where GPS is unavailable. Reinforced concrete and collapsed buildings can block signals, making traditional location technology unreliable.

    To address that challenge, the team developed three potential solutions. One used visual odometry, which relies on cameras to track points of information and estimate the rat's position. Another used an inertial measurement unit, similar to an accelerometer, to help track movement through space. A third approach used machine learning to process data and classify movement.

    The team connected the system to a Raspberry Pi, which sends information back to a tablet. Their final approach focused on combining the three methods to improve accuracy in GPS-denied environments.

    “It was new to me that these algorithms exist and we can use them to combine those two,” Bird said. “And maybe by combining them, we get the accuracy that we're looking for.”

    Bird said the project showed how engineering can support creative humanitarian solutions.

    “We are combining millions of years of evolution with high-tech technology,” she said. “APOPO is frankly revolutionary in their ability to draw on this unique asset that we have in the world.”

    For the BYU Capstone team, the project was more than a technical challenge. It was a chance to contribute to technology that could someday help rescuers save lives.

    “It's inspiring to see that there are people out there who are thinking creatively and working intentionally to solve real problems,” Bird said.
`
  .trim()
  .replace(/^ {4}/gm, '');

const story: NewsStory = {
  slug: 'gps-fails-herorats-byu-engineers',
  title: 'When GPS fails, HeroRATs and BYU engineers step in',
  description:
    'ECE students helped improve how rescue workers locate trained rats and the survivors they identify after earthquakes.',
  date: '2026-05-14',
  category: 'Department News',
  author: 'Allyson Gibson',
  videoUrl: 'https://www.youtube-nocookie.com/embed/TyoZEFPzBl8',
  content,
};

export default story;
