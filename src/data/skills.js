export const skills = [
  { skill: 'HTML', level: 'Advanced', categories: ['Front-End', 'Web-Development'], experience: 100, icon: 'devicon-html5-plain' },
  { skill: 'CSS', level: 'Advanced', categories: ['Front-End', 'Web-Development'], experience: 85, icon: 'devicon-css3-plain' },
  { skill: 'JavaScript', level: 'Advanced', categories: ['Programming' , 'Front-End', 'Web-Development'], experience: 80, icon: 'devicon-javascript-plain' },
  { skill: 'React', level: 'Advanced', categories: ['Front-End', 'Web-Development'], experience: 75, icon: 'devicon-react-original' },
  { skill: 'Bootstrap', level: 'Intermediate', categories: ['Front-End', 'Web-Development'], experience: 40, icon: 'devicon-bootstrap-plain' },
  { skill: 'Tailwind CSS', level: 'Beginner', categories: ['Front-End', 'Web-Development'], experience: 20, icon: 'devicon-tailwindcss-plain' },
  { skill: 'C++', level: 'Advanced', categories: ['Programming', 'Game-Development'], experience: 80, icon: 'devicon-cplusplus-plain' },
  { skill: 'C#', level: 'Advanced', categories: ['Programming', 'Game-Development'], experience: 80, icon: 'devicon-csharp-plain' },
  { skill: 'Windows Forms using C#', level: 'Intermediate', categories: ['Desktop-Development'], experience: 70, icon: 'devicon-csharp-plain' },
  { skill: 'ElectronJS', level: 'Intermediate', categories: ['Desktop-Development'], experience: 70, icon: 'devicon-electron-plain' },
  { skill: 'Python', level: 'Intermediate', categories: ['Programming', 'Data-Engineering' , 'Data-Science'], experience: 70, icon: 'devicon-python-plain' },
  { skill: 'PHP', level: 'Intermediate', categories: ['Programming' , 'Web-Development'], experience: 70, icon: 'devicon-php-plain' },
  { skill: 'Numpy', level: 'Intermediate', categories: ['Data-Engineering' , 'Data-Science'], experience: 55, icon: 'devicon-numpy-plain' },
  { skill: 'Apache Spark', level: 'Beginner', categories: ['Data-Engineering'], experience: 25, icon: 'devicon-apachespark-plain' },
  { skill: 'Apache Airflow', level: 'Intermediate', categories: ['Data-Engineering'], experience: 55, icon: 'devicon-apacheairflow-plain' },
  { skill: 'Apache Kafka', level: 'Beginner', categories: ['Data-Engineering'], experience: 25, icon: 'devicon-apachekafka-plain' },
  { skill: 'Scikit-learn', level: 'Intermediate', categories: ['Data-Science' , 'Machine-Learning'], experience: 55, icon: 'devicon-scikitlearn-plain' },
  { skill: 'Pandas', level: 'Intermediate', categories: ['Data-Engineering' , 'Data-Science'], experience: 50, icon: 'devicon-pandas-plain' },
  { skill: 'Matplotlib', level: 'Intermediate', categories: ['Data-Engineering', 'Data-Visualization' , 'Data-Science'], experience: 70, icon: 'devicon-matplotlib-plain' },
  { skill: 'Seaborn', level: 'Intermediate', categories: ['Data-Engineering', 'Data-Visualization' , 'Data-Science'], experience: 70, icon: 'devicon-matplotlib-plain' },
  { skill: 'Git/GitHub', level: 'Advanced', categories: ['Tools' , 'Version-Control' , 'DevOps'], experience: 95, icon: 'devicon-git-plain' },
  { skill: 'Unity', level: 'Intermediate', categories: ['Tools', 'Game-Development'], experience: 60, icon: 'devicon-unity-plain' },
  { skill: 'SQL', level: 'Advanced', categories: ['DataBase'], experience: 80, icon: 'devicon-microsoftsqlserver-plain' },
  { skill: 'MongoDB', level: 'Beginner', categories: ['DataBase'], experience: 20, icon: 'devicon-mongodb-plain' },
  { skill: 'MySQL', level: 'Advanced', categories: [ 'DataBase'], experience: 80, icon: 'devicon-mysql-plain' },
  { skill: 'PostgreSQL', level: 'Advanced', categories: ['DataBase'], experience: 80, icon: 'devicon-postgresql-plain' },
  { skill: 'Linux', level: 'Beginner', categories: ['Other', 'Tools'], experience: 30, icon: 'devicon-linux-plain' },
  { skill: 'Bash Scripting', level: 'Beginner', categories: ['Programming','Other', 'Tools'], experience: 30, icon: 'devicon-bash-plain' },
  { skill: 'Node.js', level: 'Beginner', categories: ['Web-Development', 'Back-End'], experience: 30, icon: 'devicon-nodejs-plain' },
  { skill: 'Express.js', level: 'Beginner', categories: ['Web-Development', 'Back-End'], experience: 30, icon: 'devicon-express-original' },
  { skill: 'FastAPI', level: 'Intermediate', categories: ['Web-Development', 'Back-End'], experience: 60, icon: 'devicon-fastapi-plain' },
  { skill: 'Azure Cloud', level: 'Intermediate', categories: ['Cloud', 'DevOps'], experience: 60, icon: 'devicon-azure-plain' },
  { skill: 'Docker', level: 'Intermediate', categories: ['Data-Engineering' , 'Cloud', 'DevOps'], experience: 60, icon: 'devicon-docker-plain' },
  { skill: 'ML/DL', level: 'Intermediate', categories: ['Data-Science', 'Machine-Learning'], experience: 50, icon: 'devicon-tensorflow-plain' },
];

export const skillCategories = [
  'All',
  'Front-End',
  'Back-End',
  'Programming',
  'Data-Engineering',
  'Desktop-Development',
  'Game-Development',
  'DataBase',
  'Data-Science',
  'Machine-Learning',
  'Data-Visualization',
  'Web-Development',
  'DevOps',
  'Cloud',
  'Other',
  'Tools',
  'Version-Control'
];

export const languages = skills.filter((s) => s.categories.includes('Programming'));

export const skillsByExperience = [...skills].sort((a, b) => b.experience - a.experience);

export const skillNames = skills.map((s) => s.skill);