const projectsRaw = [
  { img: 'assets/Projects/front-end-projects.png', name: 'Mini web Projects', description: 'A collection of small front-end projects built with HTML, CSS, and JavaScript.', categories: ['Web-Projects'], link: 'https://github.com/KareemH-1/Front-end-projects', linkType: 'github' },
  { img: 'assets/Projects/FirstReactProject.png', name: 'Movie App', description: 'A simple movie app built with React. It allows users to search for movies, and shows 5 most searched projects', categories: ['Web-Projects'], link: 'https://github.com/KareemH-1/React/tree/main/Movie-React-Project', linkType: 'github' },
  { img: 'assets/Projects/TopDownShooter.png', name: 'Top Down Shooter', description: 'A top-down shooter game built with Unity. It features fast-paced gameplay, skills, shop, clean UI, and enemy AI.', categories: ['Game-Development'], link: 'https://mega.nz/file/mYUDQRAB#bL9UexOtVQ2_OImQW_Aqgi1dL7xNKAyCRO3nZMiu-Yo', linkType: 'game' },
  { img: 'assets/Projects/Pong3D.png', name: 'Pong3D', description: 'Pong game built with Unity using C#. Two paddles, a ball, expanded with new features beyond the tutorial baseline.', categories: ['Game-Development'], link: 'https://github.com/KareemH-1/GameDevelopment/tree/main/Unity/Pong3D', linkType: 'github' },
  { img: 'assets/Projects/SpaceGame.png', name: 'SpaceGame', description: 'A simple space shooter built with Unity in C#. Player-controlled spaceship vs incoming alien invaders.', categories: ['Game-Development'], link: 'https://github.com/KareemH-1/GameDevelopment/tree/main/Unity/SpaceGame', linkType: 'github' },
  { img: 'assets/Projects/WeatherApp.png', name: 'Weather App', description: 'A responsive weather app with real-time data, timezone integration, and dynamic background imagery.', categories: ['Web-Projects'], link: 'https://github.com/KareemH-1/WeatherApp', linkType: 'github' },
  { img: 'assets/Projects/todolist.png', name: 'To-Do List', description: 'Full-stack to-do app built with Node.js, Express, SQLite, and JWT auth.', categories: ['Web-Projects', 'Full-Stack'], link: 'https://github.com/KareemH-1/Todo-App-NodeJS_ExpressJS_SQLite', linkType: 'github' },
  { img: 'assets/Projects/dashboard.png', name: 'Freelancer Dashboard', description: 'A dashboard built with React and Chart.js for a freelancer client. Earnings, tasks, and metrics in a clean modern UI.', categories: ['Web-Projects'], link: 'https://github.com/KareemH-1/Elevvo-Internship/tree/main/Task6-Dashboard', linkType: 'github' },
  { img: 'assets/Projects/TaskManager.png', name: 'Task Manager', description: 'Desktop productivity app built with Electron — tasks, completed views, chart.js stats, and Pomodoro timers.', categories: ['Web-Projects', 'Desktop-Applications'], link: 'https://github.com/KareemH-1/Task-Manager-App-Electron', linkType: 'github' },
  { img: 'assets/Projects/JobConnect.png', name: 'JobConnect', description: 'A job portal connecting seekers with employers. HTML/CSS/JS + PHP + MySQL. Team leader for CS283x.', categories: ['Web-Projects', 'Full-Stack'], link: 'https://github.com/MazenMDev/internship-job-portal', linkType: 'github' },
];

export const projects = [...projectsRaw].reverse();

export const projectCategories = [
  'All',
  'Web-Projects',
  'Game-Development',
  'Full-Stack',
  'Desktop-Applications',
];