export const siteConfig = {
  nextRun: {
    label: 'NEXT ASCENT',
    day: 'SUNDAY',
    time: '06:30 AM',
    place: 'SAME PLACE',
    note: 'ALL PACES',
  },
  links: {
    strava: 'https://www.strava.com/clubs/ascent-runners-club',
    whatsapp: 'https://chat.whatsapp.com/',
    instagram: 'https://www.instagram.com/runascent/',
  },
};

export const events = [
  {
    when: 'SUN / 06:30',
    title: 'Sunday Ascent',
    description: 'Easy group run · All paces',
    action: 'Join this run',
  },
  {
    when: 'WED / OPEN',
    title: 'Find a Run Buddy',
    description: 'Runs, rides, hikes via General Discussion',
    action: 'Ask the group',
  },
  {
    when: 'APR 19 / 06:30',
    title: 'Reset Run',
    description: 'A low-pressure exam-season run',
    action: 'See route',
  },
];

export const routes = [
  {
    name: 'Campus Warmup Loop',
    distance: '2.4 KM',
    climb: '42 M',
    effort: 'Beginner',
    surface: 'Campus road',
    start: 'Main gate',
    notes: 'Short, social, and easy to exit early.',
  },
  {
    name: 'Vithura Green Roll',
    distance: '5.1 KM',
    climb: '118 M',
    effort: 'All paces',
    surface: 'Road',
    start: 'Same place',
    notes: 'A steady out-and-back with shade and regroup points.',
  },
  {
    name: 'Hill Reset',
    distance: '7.8 KM',
    climb: '242 M',
    effort: 'Progression',
    surface: 'Road + hill',
    start: 'Campus circle',
    notes: 'Run the climbs, walk the climbs, or turn early.',
  },
  {
    name: 'Long Slow Ascent',
    distance: '11.0 KM',
    climb: '320 M',
    effort: 'Race training',
    surface: 'Road',
    start: 'Main gate',
    notes: 'Conversational pace with planned water stops.',
  },
];

export const pulseStats = [
  { value: '28', label: 'Active Climbers' },
  { value: '163.4 KM', label: 'Moved Together' },
  { value: '2,140 M', label: 'Climbed' },
];

export const consistencyBoard = [
  { name: 'Ananya', days: '4 DAYS' },
  { name: 'Aditya', days: '3 DAYS' },
  { name: 'Nandana', days: '3 DAYS' },
];

export const galleryItems = [
  {
    caption: 'Early light near campus',
    alt: 'ASCENT runners gathering near campus in the early morning',
    image: '',
  },
  {
    caption: 'Post-run chai stop',
    alt: 'ASCENT runners at a post-run chai stop',
    image: '',
  },
  {
    caption: 'Green road out of Vithura',
    alt: 'A green road near Vithura used by ASCENT runners',
    image: '',
  },
  {
    caption: 'Sunday regroup point',
    alt: 'ASCENT runners regrouping during a Sunday run',
    image: '',
  },
];
