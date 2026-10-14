const projectsRaw = [
  {
    img: "assets/Projects/TopDownShooter.png",
    name: "Top Down Shooter",
    description:
      "A top-down shooter game built with Unity. It features fast-paced gameplay, skills, shop, clean UI, and enemy AI.",
    categories: ["Game-Development"],
    link: "https://mega.nz/file/mYUDQRAB#bL9UexOtVQ2_OImQW_Aqgi1dL7xNKAyCRO3nZMiu-Yo",
    linkType: "game",
  },
  {
    img: "assets/Projects/Pong3D.png",
    name: "Pong3D",
    description:
      "Pong game built with Unity using C#. Two paddles, a ball, expanded with new features beyond the tutorial baseline.",
    categories: ["Game-Development"],
    link: "https://github.com/KareemH-1/GameDevelopment/tree/main/Unity/Pong3D",
    linkType: "github",
  },
  {
    img: "assets/Projects/SpaceGame.png",
    name: "SpaceGame",
    description:
      "A simple space shooter built with Unity in C#. Player-controlled spaceship vs incoming alien invaders.",
    categories: ["Game-Development"],
    link: "https://github.com/KareemH-1/GameDevelopment/tree/main/Unity/SpaceGame",
    linkType: "github",
  },
  {
    img: "assets/Projects/WeatherApp.png",
    name: "Weather App",
    description:
      "A responsive weather app with real-time data, timezone integration, and dynamic background imagery.",
    categories: ["Web-Projects"],
    link: "https://github.com/KareemH-1/WeatherApp",
    linkType: "github",
  },
  {
    img: "assets/Projects/TaskManager.png",
    name: "Task Manager",
    description:
      "Desktop productivity app built with Electron — tasks, completed views, chart.js stats, and Pomodoro timers.",
    categories: ["Web-Projects", "Desktop-Applications"],
    link: "https://github.com/KareemH-1/Task-Manager-App-Electron",
    linkType: "github",
  },
  {
    img: "assets/Projects/JobConnect.png",
    name: "JobConnect",
    description:
      "A job portal connecting seekers with employers. HTML/CSS/JS + PHP + MySQL. Team leader for CS283x.",
    categories: ["Web-Projects", "Full-Stack"],
    link: "https://github.com/MazenMDev/internship-job-portal",
    linkType: "github",
  },
  {
    img: "assets/Projects/Multimedia_Project.png",
    name: "Arcane",
    description:
      "A complex 2D action-adventure game built entirely in C# and Windows Forms, implementing object-oriented game architecture, real-time combat, enemy AI, RPG mechanics, persistent save systems, and custom multimedia components without external game engines.",
    categories: ["Game-Development"],
    link: "https://github.com/KareemH-1/MultiMedia_GameProject",
    linkType: "github",
  },
  {
    img: "assets/Projects/Retail_Product_Recognition.png",
    name: "Retail Product Recognition",
    description: "A computer vision project built to recognize and classify products in a retail environment.",
    categories: ["AI/ML"],
    link: "https://github.com/KareemH-1/Retail-Product-Recognition-System",
    linkType: "github",
  },
  {
    img: "assets/Projects/GestureDesk.jpeg",
    name: "GestureDesk",
    description: "A gesture recognition system that allows users to control their computer using hand gestures.",
    categories: ["AI/ML"],
    link: "https://github.com/KareemH-1/GestureDesk",
    linkType: "github",
  },
  {
    img: "assets/Projects/MSA_QA.png",
    name: "MSA_QA",
    description:
      "Enterprise-style quality assurance platform built with React, PHP, MySQL, REST APIs, MVC architecture, and design patterns, featuring role-based workflows, analytics dashboards, surveys, and appeals management.",
    categories: ["Web-Projects", "Full-Stack"],
    link: "https://github.com/KareemH-1/MSA-Quality-System",
    linkType: "github",
  },
  {
    img: "assets/Projects/SheetAutomationTool.png",
    name: "Google Sheets Automation Tool",
    description:" A tool that automates data entry and manipulation in Google Sheets, enabling users to streamline repetitive tasks and improve productivity.",
    categories: ["Web-Projects", "Full-Stack"],
    link: "https://github.com/KareemH-1/SheetAutomationTool",
    linkType: "github",
  },
  {
    img: "assets/Projects/healthcare_pipeline.png",
    name: "Healthcare Fraud Detection",
    description:
      "A distributed cloud-based healthcare fraud detection system using Azure, Apache Kafka, FastAPI, SQL Server, and machine learning to analyze insurance claims in real time through scalable event-driven microservices.",
    categories: ["Data-Engineering", "Cloud", "AI/ML"],
    link: "https://github.com/omnyaayman/HelathCare-Fraud-Detection/tree/System-branch",
    linkType: "github",
  },
];

export const projects = [...projectsRaw].reverse();

export const projectCategories = [
  "All",
  "Web-Projects",
  "Game-Development",
  "Full-Stack",
  "AI/ML",
  "Cloud",
  "Data-Engineering",
  "Desktop-Applications",
];
