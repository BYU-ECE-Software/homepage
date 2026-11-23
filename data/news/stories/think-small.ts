import type { NewsStory } from '../types';

const story: NewsStory = {
  slug: 'think-small',
  title: 'Think small',
  description:
    'Department researchers are advancing small-scale systems that make ambitious sensing and space applications possible.',
  date: '2025-04-21',
  category: 'Department News',
  author: 'Kylie Lay',
  sourceUrl: 'https://ece.byu.edu/department-news/think-small',
  image: '/news/think-small/image-01.jpg',
  imageAlt: 'Capstone team',
  content:
    'Picture a satellite. Really–picture it. Close your eyes if you need to. What does it look like?\n\nChances are you pictured a rather large contraption with solar panels, but there are some satellites, called CubeSats, that are only 10 centimeters long on each side! These tiny satellites are commonly used by small companies and universities to provide cost-effective access to space for research, testing, and education. The BYU CubeSat Capstone team worked on one of these miniscule satellites, developing an Attitude Determination and Control System (ADCS) to allow it to determine the direction of Earth and turn accordingly.\n\nTypically, a CubeSat’s payload, or the necessary systems and equipment, takes up a large portion of the interior. Most Attitude Determination and Control Systems are extremely expensive, ranging from $10,000 to $50,000, and use a lot of power.\n\nTo combat this issue, the team designed two sensor systems that use infrared sensing to find Earth’s horizon and a magnetometer that measures the strength and the direction of Earth’s magnetic field. Together, these determine the satellite’s orientation in relation to Earth.\n\nThe system is a printed circuit board that uses magnetorquers, which are electromagnetic coils that generate a magnetic field. This magnetic field allows the CubeSat to adjust its orientation without using any fuel or moving parts. Once the direction the CubeSat needs to move is determined by the sensor systems, it will alert certain magnetorquers to turn on. The magnetorquers then generate a magnetic field, creating torque to turn the CubeSat to face the Earth or detumble a spinning CubeSat.\n\nThe team’s design resulted in a significant reduction of the volume and weight of a standard CubeSat ADCS; a standard CubeSat has a volume of 1U with the ADCS typically taking up 0.25 to 0.5U’s, and their ADCS design for a 1U has a volume of only 0.1U.\n\nWho knew space tech could be this tiny? So next time you picture a satellite, think small–like Rubik’s cube small.\n\n![Think small image 2](/news/think-small/image-02.png)',
};

export default story;
