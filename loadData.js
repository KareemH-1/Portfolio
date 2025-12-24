const skills = [
    {
        "skill": "HTML",
        "level": "Advanced",
        "categories": ["Front-End", "Web-Development"],
        "experience-bar": 100,
        "icon": "devicon-html5-plain"
    },
    {
        "skill": "CSS",
        "level": "Advanced",
        "categories": ["Front-End", "Web-Development"],
        "experience-bar": 85,
        "icon": "devicon-css3-plain"
    },
    {
        "skill": "JavaScript",
        "level": "Advanced",
        "categories": ["Front-End", "Web-Development"],
        "experience-bar": 80,
        "icon": "devicon-javascript-plain"
    },
    {
        "skill": "React",
        "level": "Beginner",
        "categories": ["Front-End", "Web-Development"],
        "experience-bar": 20,
        "icon": "devicon-react-original"
    },
    {
        "skill": "Bootstrap",
        "level": "Intermediate",
        "categories": ["Front-End", "Web-Development"],
        "experience-bar": 40,
        "icon": "devicon-bootstrap-plain"
    },
    {
        "skill": "Tailwind CSS",
        "level": "Beginner",
        "categories": ["Front-End", "Web-Development"],
        "experience-bar": 20,
        "icon": "devicon-tailwindcss-plain"
    },
    {
        "skill": "C++",
        "level": "Advanced",
        "categories": ["Programming", "Game-Development"],
        "experience-bar": 80,
        "icon": "devicon-cplusplus-plain"
    },
    {
        "skill": "C#",
        "level": "Beginner",
        "categories": ["Programming", "Game-Development"],
        "experience-bar": 30,
        "icon": "devicon-csharp-plain"
    },
    {
        "skill": "Python",
        "level": "Intermediate",
        "categories": ["Programming" , "Data-Engineering"],
        "experience-bar": 70,
        "icon": "devicon-python-plain"
    },
    {
        "skill": "Numpy",
        "level": "Intermediate",
        "categories": ["Data-Engineering"],
        "experience-bar": 55,
        "icon": "devicon-numpy-plain"
    },
    {
        "skill": "Pandas",
        "level": "Intermediate",
        "categories": ["Data-Engineering"],
        "experience-bar": 50,
        "icon": "devicon-pandas-plain"
    },
    {
        "skill": "Matplotlib",
        "level": "Beginner",
        "categories": ["Data-Engineering" , "Data-Visualization"],
        "experience-bar": 30,
        "icon": "devicon-matplotlib-plain"
    },
    {
        "skill": "Git/GitHub",
        "level": "Advanced",
        "categories": ["Tools"],
        "experience-bar": 95,
        "icon": "devicon-git-plain"
    },
    {
        "skill": "Unity",
        "level": "Beginner",
        "categories": ["Tools", "Game-Development"],
        "experience-bar": 30,
        "icon": "devicon-unity-plain"
    },
    {
        "skill": "PHP",
        "level": "Advanced",
        "categories": ["Web-Development", "Back-End"],
        "experience-bar": 80,
        "icon": "devicon-php-plain"
    },
    {
        "skill": "SQL",
        "level": "Advanced",
        "categories": ["DataBase", "Back-End"],
        "experience-bar": 80,
        "icon": "devicon-mysql-plain"
    },
    {
        "skill": "Linux",
        "level": "Beginner",
        "categories": ["Other", "Tools"],
        "experience-bar": 30,
        "icon": "devicon-linux-plain"
    },
    {
        "skill": "Node.js",
        "level": "Beginner",
        "categories": ["Web-Development", "Back-End"],
        "experience-bar": 30,
        "icon": "devicon-nodejs-plain"
    },
    {
        "skill": "Express.js",
        "level": "Beginner",
        "categories": ["Web-Development", "Back-End"],
        "experience-bar": 30,
        "icon": "devicon-express-original"
    },
    {
        "skill": "MongoDB",
        "level": "Beginner",
        "categories": ["Web-Development", "Back-End", "DataBase"],
        "experience-bar": 20,
        "icon": "devicon-mongodb-plain"
    }
];

const achievements = [
    {
        "img": "assets/C++_DSA_Udemy.png",
        "name": "C++ Data Structures & Algorithms",
        "description": "Udemy course certificate of completion for data structure and algorithm + LeetCode Exercises.",
        "pdf": "assets/pdfs/C++_DSA_Udemy.pdf"
    },
    {
        "img": "assets/DataAnalysis_FreeCodeCamp.png",
        "name": "Data Analysis with Python",
        "description": "FreeCodeCamp course certificate of completion for data analysis with Python.",
        "pdf": "assets/DataAnalysis_FreeCodeCamp.png"
    },
    {
        "img": "assets/DataCamp_Intermediate_SQL.png",
        "name": "Intermediate SQL",
        "description": "SQL course, part of DataCamp's SQL track",
        "pdf": "assets/pdfs/DataCamp_Intermediate_SQL.pdf"
    },
    {
        "img": "assets/GitHub_Foundation_DataCamp.png",
        "name": "GitHub Foundations",
        "description": "GitHub course, Git/GitHub complete track",
        "pdf": "assets/pdfs/GitHub_Foundation_DataCamp.pdf"
    },
    {
        "img": "assets/2026-ECPC Q 3-Kareem Ahmed-PLACE.png",
        "name": "ECPC Participation Certificate",
        "description": "Participation certificate for the ECPC competition August 2025.",
        "pdf": "assets/pdfs/2026-ECPC Q 3-Kareem Ahmed-PLACE.pdf"
    },
    {
        "img": "assets/ITI_Ubuntu_Essentials.png",
        "name": "Ubuntu Essentials",
        "description": "Certificate for the ITI Ubuntu Essentials course.",
        "pdf": "assets/pdfs/ITI_Ubuntu_Essentials.pdf"
    },
    {
        "img": "assets/MicrosoftFoundationsCSharp.png",
        "name": "Microsoft Foundations C#",
        "description": "Certificate of completion for the Microsoft/FreeCodeCamp Foundations C# course.",
        "pdf": "assets/MicrosoftFoundationsCSharp.png"
    },
    {
        "img": "assets/ITI_Backend_PHP-SQL.png",
        "name": "Backend PHP-SQL",
        "description": "Certificate for the ITI Backend PHP-SQL course.",
        "pdf": "assets/pdfs/ITI_Backend_PHP-SQL.pdf"
    },
    {
        "img": "assets/IBM_Intro_AI.png",
        "name": "Introduction to AI",
        "description": "Certificate for the IBM Introduction to AI course.",
        "pdf": "assets/pdfs/IBM_Intro_AI.pdf"
    },
    {
        "img": "assets/Cisco_Intro_CyberSecurity.png",
        "name": "Introduction to Cyber Security",
        "description": "Certificate for the Cisco Introduction to Cyber Security course.",
        "pdf": "assets/pdfs/Cisco_Intro_CyberSecurity.pdf"
    },
    {
        "img": "assets/Kaggle-Python.png",
        "name": "Kaggle Python Certificate",
        "description": "Certificate of completion for the Kaggle Python course made by Google",
        "pdf": "assets/Kaggle-Python.png"
    }
];

const projects = [
    {
        "img": "assets/Projects/front-end-projects.png",
        "name": "Mini Front-end Projects",
        "description": "A collection of small front-end projects built with HTML, CSS, and JavaScript.",
        "categories": ["Web-Projects"],
        "link": "https://github.com/KareemH-1/Front-end-projects",
        "linkType": "github"
    },
    {
        "img": "assets/Projects/FirstReactProject.png",
        "name": "React Projects",
        "description": "A small collection of React projects created mainly for learning react. The one in the photo was from a tutorial that I followed to get a better understanding of component-based architecture, and how React works.",
        "categories": ["Web-Projects"],
        "link": "https://github.com/KareemH-1/React",
        "linkType": "github"
    },
    {
        "img": "assets/Projects/TopDownShooter.png",
        "name": "Top Down Shooter",
        "description": "A top-down shooter game built with Unity. It features fast-paced gameplay, skills, shop, clean UI, and enemy AI.",
        "categories": ["Game-Development"],
        "link": "https://mega.nz/file/mYUDQRAB#bL9UexOtVQ2_OImQW_Aqgi1dL7xNKAyCRO3nZMiu-Yo",
        "linkType": "game"
    },
    {
        "img": "assets/Projects/Pong3D.png",
        "name": "Pong3D",
        "description": "Pong game built with Unity using C#. It features two paddles controlled by the players and a ball that bounces between them. I started this project by following a tutorial then expanded on it by adding new features and improving the gameplay.",
        "categories": ["Game-Development"],
        "link": "https://github.com/KareemH-1/GameDevelopment/tree/main/Unity/Pong3D",
        "linkType": "github"
    },
    {
        "img": "assets/Projects/SpaceGame.png",
        "name": "SpaceGame",
        "description": "A Simple space shooter game built with Unity using C#. It features a player-controlled spaceship that can move left and right, shooting bullets at incoming alien invaders.",
        "categories": ["Game-Development"],
        "link": "https://github.com/KareemH-1/GameDevelopment/tree/main/Unity/SpaceGame",
        "linkType": "github"
    },
    {
        "img": "assets/Projects/WeatherApp.png",
        "name": "Weather App",
        "description": "A responsive weather application featuring real-time weather data, timezone integration, and dynamic background imagery using multiple APIs.",
        "categories": ["Web-Projects"],
        "link": "https://github.com/KareemH-1/WeatherApp",
        "linkType": "github"
    },
    {
        "img": "assets/Projects/TaskManager.png",
        "name": "Task Manager",
        "description": "A desktop application built with Electron to manage tasks and increase productivity. The application features a variety of features including adding tasks, view completed tasks, view stats using chart.js and timers.",
        "categories": ["Web-Projects", "Desktop-Applications"],
        "link": "https://github.com/KareemH-1/Task-Manager-App-Electron",
        "linkType": "github"
    },
    {
        "img": "assets/Projects/todolist.png",
        "name": "To-Do List",
        "description": "A simple to-do list application built with Node.js, Express, SQLite, and JWT. It allows users to create, read, update, and delete tasks with a clean and intuitive interface.",
        "categories": ["Web-Projects" , "Full-Stack"],
        "link": "https://github.com/KareemH-1/Todo-App-NodeJS_ExpressJS_SQLite",
        "linkType": "github"
    },
    {
        "img": "assets/Projects/JobConnect.png",
        "name": "JobConnect",
        "description": "A job portal web application that connects job seekers with employers. Built with HTML, CSS, JavaScript, PHP, and MySQL. Project for CS283x Course. I was the team leader for this project.",
        "categories": ["Web-Projects", "Full-Stack"],
        "link": "https://github.com/MazenMDev/internship-job-portal",
        "linkType": "github"
    }
];

projects.reverse();

function loadSkills() {
    const skillsContainer = document.querySelector(".skills-grid");
    skills.forEach(skill => {
        const skillElement = document.createElement("div");
        skillElement.classList.add("skill-card", "invert");
        skill.categories.forEach(category => {
            skillElement.classList.add(category);
        });
        skillElement.innerHTML = `
            <i class="${skill.icon} skill-icon"></i>
            <div class="skill-title">${skill.skill}</div>
            <div class="skill-bar">
                <div class="skill-fill" style="width: ${skill['experience-bar']}%;"></div>
            </div>
            <div class="skill-level">${skill.level}</div>
        `;
        skillsContainer.appendChild(skillElement);
    });     
}

function loadAchievements() {
    const achievementsContainer = document.querySelector(".achievements-grid");
    achievements.forEach(achievement => {
        const achievementElement = document.createElement("div");
        achievementElement.classList.add("achievement-card", "invert");
        achievementElement.innerHTML = `
            <img src="${achievement.img}" alt="${achievement.name}" loading="lazy" class="achievement-image" onclick="openImage('${achievement.img}')">
            <h3>${achievement.name}</h3>
            <p>${achievement.description}</p>
            <a href="${achievement.pdf}" target="_blank" style="text-decoration: none;">
                <button class="btn btn-secondary">
                    <i data-lucide="download"></i>
                    <span>Download</span>
                </button>
            </a>
        `;
        achievementsContainer.appendChild(achievementElement);
    });
}

function loadProjects() {
    const projectsContainer = document.querySelector(".projects-grid");
    projects.forEach(project => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project-card", "invert");
        project.categories.forEach(category => {
            projectElement.classList.add(category);
        });
        
        const icon = project.linkType === "github" ? "github" : "gamepad-2";
        const buttonText = project.linkType === "github" ? "View on GitHub" : "Play Game";
        
        projectElement.innerHTML = `
            <img src="${project.img}" alt="${project.name}" class="project-image" onclick="openImage('${project.img}')">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" style="text-decoration: none;" target="_blank">
                <button class="btn btn-secondary">
                    <i data-lucide="${icon}"></i>
                    <span>${buttonText}</span>
                </button>
            </a>
        `;
        projectsContainer.appendChild(projectElement);
    });
    if (typeof lucide !== "undefined" && lucide.createIcons) {
        lucide.createIcons();
    }

}



export { skills, achievements, projects, loadSkills, loadAchievements, loadProjects };