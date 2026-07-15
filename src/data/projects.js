const projectsRaw = [
  { img: 'assets/Projects/front-end-projects.png', name: 'Mini web Projects', description: 'A collection of small front-end projects built with HTML, CSS, and JavaScript.', categories: ['Web-Projects'], link: 'https://github.com/KareemH-1/Front-end-projects', linkType: 'github' },
  { img: 'assets/Projects/TopDownShooter.png', name: 'Top Down Shooter', description: 'A top-down shooter game built with Unity. It features fast-paced gameplay, skills, shop, clean UI, and enemy AI.', categories: ['Game-Development'], link: 'https://mega.nz/file/mYUDQRAB#bL9UexOtVQ2_OImQW_Aqgi1dL7xNKAyCRO3nZMiu-Yo', linkType: 'game' },
  { img: 'assets/Projects/Pong3D.png', name: 'Pong3D', description: 'Pong game built with Unity using C#. Two paddles, a ball, expanded with new features beyond the tutorial baseline.', categories: ['Game-Development'], link: 'https://github.com/KareemH-1/GameDevelopment/tree/main/Unity/Pong3D', linkType: 'github' },
  { img: 'assets/Projects/SpaceGame.png', name: 'SpaceGame', description: 'A simple space shooter built with Unity in C#. Player-controlled spaceship vs incoming alien invaders.', categories: ['Game-Development'], link: 'https://github.com/KareemH-1/GameDevelopment/tree/main/Unity/SpaceGame', linkType: 'github' },
  { img: 'assets/Projects/WeatherApp.png', name: 'Weather App', description: 'A responsive weather app with real-time data, timezone integration, and dynamic background imagery.', categories: ['Web-Projects'], link: 'https://github.com/KareemH-1/WeatherApp', linkType: 'github' },
  { img: 'assets/Projects/dashboard.png', name: 'Freelancer Dashboard', description: 'A dashboard built with React and Chart.js for a freelancer client. Earnings, tasks, and metrics in a clean modern UI.', categories: ['Web-Projects'], link: 'https://github.com/KareemH-1/Elevvo-Internship/tree/main/Task6-Dashboard', linkType: 'github' },
  { img: 'assets/Projects/TaskManager.png', name: 'Task Manager', description: 'Desktop productivity app built with Electron — tasks, completed views, chart.js stats, and Pomodoro timers.', categories: ['Web-Projects', 'Desktop-Applications'], link: 'https://github.com/KareemH-1/Task-Manager-App-Electron', linkType: 'github' },
  { img: 'assets/Projects/JobConnect.png', name: 'JobConnect', description: 'A job portal connecting seekers with employers. HTML/CSS/JS + PHP + MySQL. Team leader for CS283x.', categories: ['Web-Projects', 'Full-Stack'], link: 'https://github.com/MazenMDev/internship-job-portal', linkType: 'github' },
  {
  img: 'assets/Projects/Multimedia_Project.png',
  name: 'Arcane',
  description: 'A complex 2D action-adventure game built entirely in C# and Windows Forms, implementing object-oriented game architecture, real-time combat, enemy AI, RPG mechanics, persistent save systems, and custom multimedia components without external game engines.',
  categories: ['Game-Development'],
  link: 'https://github.com/KareemH-1/MultiMedia_GameProject',
  linkType: 'github'
},
  { img: 'assets/Projects/MSA_QA.png', name: 'MSA_QA', description: 'Enterprise-style quality assurance platform built with React, PHP, MySQL, REST APIs, MVC architecture, and design patterns, featuring role-based workflows, analytics dashboards, surveys, and appeals management.', categories: ['Web-Projects', 'Full-Stack'], link: 'https://github.com/KareemH-1/MSA-Quality-System', linkType: 'github' },
  {
  img: 'assets/Projects/healthcare_pipeline.png',
  name: 'Healthcare Fraud Detection',
  description: 'A distributed cloud-based healthcare fraud detection system using Azure, Apache Kafka, FastAPI, SQL Server, and machine learning to analyze insurance claims in real time through scalable event-driven microservices.',
  categories: ['Data-Engineering', 'Cloud', 'AI/ML'],
  link: 'https://github.com/omnyaayman/HelathCare-Fraud-Detection/tree/System-branch',
  linkType: 'github'
  },
  
];

export const projects = [...projectsRaw].reverse();

export const projectCategories = [
  'All',
  'Web-Projects',
  'Game-Development',
  'Full-Stack',
  'Data-Engineering',
  'Desktop-Applications',
];