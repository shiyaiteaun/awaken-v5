type Project = {
  title: string
  description: string
  imgSrc: string
  href: string
}

type ProjectsData = {
  [locale: string]: Project[]
}

const projectsData: ProjectsData = {
  en: [
    {
      title: 'Planda',
      description: `Online calendar and task-management system for students, with course syllabus
        parsing via OpenAI API, a 2-way Google calendar sync, task organizing views, and productivity
        tracking.`,
      imgSrc: '/static/images/planda-cover-photo.png',
      href: 'https://planda.ca/about',
    },
    {
      title: 'Celebrate This Mortal',
      description: `Cards = Clutter. But throwing them away is SOO hard.

      Don't create a hard choice.

      \nCelebrate someone special with a collage of messages and photos from their friends and family, with us.
      All cards free for a limited time.`,
      imgSrc: '/static/images/mortal-cover-photo.png',
      href: 'https://www.celebratethismortal.com',
    },
    {
      title: 'UBC Schedule Optimizer',
      description: `Generates optimal course schedules for based on walking times, professor ratings, gaps between classes, and more. Note: Not yet updated for Workday (2024W)`,
      imgSrc: '/static/images/ubc-schedule-opt.png',
      href: 'https://ubc-schedule-optimizer.herokuapp.com/',
    },
    {
      title: 'Exam Study Planner',
      description: `Simple util to keep track of exams and study progress.`,
      imgSrc: '/static/images/exam-planner.png',
      href: 'https://github.com/yangchristina/exam-planner',
    },
    {
      title: 'Lord of the Lakes',
      description: `2D fishing game, RPG minigame with a turn-based battle mechanic. Developed in a 6 person team, won student-choice award out of 19 games.
      `,
      imgSrc: '/static/images/lord-of-the-lakes.png',
      href: 'https://ellynchan.itch.io/lord-of-the-lakes',
    },
    {
      title: 'event-cron-parser',
      description: `Expanded @aws-cron-parser to support AWS rate expressions, durations, date ranges, conversions between local and UTC times, and more.
      `,
      imgSrc: '/static/images/npm.png',
      href: 'https://github.com/yangchristina/event-cron-parser',
    },
    {
      title: 'Stock Watch',
      description: `Scans NYSE and NASDAQ periodically for over 75 specific signals in market data.
      Automated bots use Interactive Brokers to paper trade, custom exit strategies and backtesting. (currently down)
      `,
      imgSrc: '/static/images/stock-watch-graph.png',
      href: 'https://github.com/yangchristina/stocks',
    },
    {
      title: 'Productive hours tracker',
      description: `Track your energy, focus, and motivations levels throughout the day. Java GUI using JSON storage.
      `,
      imgSrc: '/static/images/productive-hours-tracker.png',
      href: 'https://github.com/yangchristina/productive-hours-tracker',
    },
  ],

  // fr: [
  //   {
  //     title: 'Un moteur de recherche',
  //     description: `Et si vous pouviez rechercher n'importe quelle information dans le monde ? Pages Web, images, vidéos
  //       et plus. Google propose de nombreuses fonctionnalités pour vous aider à trouver exactement ce que vous cherchez.`,
  //     imgSrc: '/static/images/google.png',
  //     href: 'https://www.celebratethismortal.com',
  //   },
  //   {
  //     title: 'La Machine à remonter le temps',
  //     description: `Imaginez pouvoir voyager dans le temps ou vers le futur. Tournez simplement le bouton
  //       à la date souhaitée et appuyez sur "Go". Ne vous inquiétez plus des clés perdues ou
  //       écouteurs oubliés avec cette solution simple mais abordable.`,
  //     imgSrc: '/static/images/time-machine.jpg',
  //     href: '/blog/articles/la-machine-a-remonter-le-temps',
  //   },
  // ],
}

export default projectsData
