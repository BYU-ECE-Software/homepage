import type { NewsStory } from '../types';

const story: NewsStory = {
  slug: 'remote-id-for-older-drones',
  title: 'No hardware? No problem: Remote ID for older drones',
  description:
    'Students developed a practical way to add required Remote ID telemetry to drones that predate newer FAA rules.',
  date: '2025-05-14',
  category: 'Department News',
  author: 'Kylie Lay',
  sourceUrl:
    'https://ece.byu.edu/department-news/no-hardware-no-problem-remote-id-for-older-drones',
  image: '/news/no-hardware-no-problem-remote-id-for-older-drones/image-01.jpg',
  imageAlt: 'Capstone team with their coach',
  content:
    'Drones have been a fast-spreading and useful technology; they take pictures, video, can be used to transport things, and so much more. But technology changes fast–and often comes new regulations. Many older drones do not have the ability to transmit remote ID telemetry data, which is now required by the Federal Aviation Administration (FAA) and includes information like location, velocity, heading, and drone identification.\n\nRetrofitting the hardware on old drones or buying a new drone altogether is costly. One of our BYU Capstone teams saw an opportunity to tackle this issue when they were commissioned by the Air Force Research Lab to develop new technologies for Software Defined Radios (SDR)—radio frequency systems on a microchip that can be reprogrammed for different applications. The team, composed entirely of Electrical and Computer Engineering students, developed a method to use SDRs to transmit the remote ID data from older drones using photos or live video footage from the drone.\n\nTheir solution? Instead of modifying the drone itself, they developed a clever way to transmit the necessary telemetry data through the drone’s video or photo stream. Many older drones are already transmitting information in the form of video or photo, so the team’s prototype modified redundant portions of the video stream data to embed the necessary telemetry data without affecting video quality.\n\nThe data can then be extracted alongside the video, allowing the drone to meet FAA requirements with zero hardware changes.\n\nOut of the alternative methods considered, embedding the telemetry data into the video data was the simplest and easiest to implement. It does not require any new hardware or retrofitting of the drone itself–only slight modifications to the video data.\n\nThe team competed as one of eight finalists at Wright-Patterson Air Force Base, where they presented their findings to military and industry experts. Their work could help thousands of drone users keep flying legally—without having to ditch their trusted gear.',
};

export default story;
