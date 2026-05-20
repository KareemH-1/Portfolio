export const skills = [
  { skill: 'HTML', level: 'Advanced', categories: ['Front-End', 'Web-Development'], experience: 100, icon: 'devicon-html5-plain' },
  { skill: 'CSS', level: 'Advanced', categories: ['Front-End', 'Web-Development'], experience: 85, icon: 'devicon-css3-plain' },
  { skill: 'JavaScript', level: 'Advanced', categories: ['Programming' , 'Front-End', 'Web-Development'], experience: 80, icon: 'devicon-javascript-plain' },
  { skill: 'React', level: 'Beginner', categories: ['Front-End', 'Web-Development'], experience: 20, icon: 'devicon-react-original' },
  { skill: 'Bootstrap', level: 'Intermediate', categories: ['Front-End', 'Web-Development'], experience: 40, icon: 'devicon-bootstrap-plain' },
  { skill: 'Tailwind CSS', level: 'Beginner', categories: ['Front-End', 'Web-Development'], experience: 20, icon: 'devicon-tailwindcss-plain' },
  { skill: 'C++', level: 'Advanced', categories: ['Programming', 'Game-Development'], experience: 80, icon: 'devicon-cplusplus-plain' },
  { skill: 'C#', level: 'Beginner', categories: ['Programming', 'Game-Development'], experience: 30, icon: 'devicon-csharp-plain' },
  { skill: 'Python', level: 'Intermediate', categories: ['Programming', 'Data-Engineering'], experience: 70, icon: 'devicon-python-plain' },
  { skill: 'PHP', level: 'Intermediate', categories: ['Programming' , 'Web-Development'], experience: 70, icon: 'devicon-php-plain' },
  { skill: 'Numpy', level: 'Intermediate', categories: ['Data-Engineering'], experience: 55, icon: 'devicon-numpy-plain' },
  { skill: 'Pandas', level: 'Intermediate', categories: ['Data-Engineering'], experience: 50, icon: 'devicon-pandas-plain' },
  { skill: 'Matplotlib', level: 'Beginner', categories: ['Data-Engineering', 'Data-Visualization'], experience: 30, icon: 'devicon-matplotlib-plain' },
  { skill: 'Git/GitHub', level: 'Advanced', categories: ['Tools'], experience: 95, icon: 'devicon-git-plain' },
  { skill: 'Unity', level: 'Beginner', categories: ['Tools', 'Game-Development'], experience: 30, icon: 'devicon-unity-plain' },
  { skill: 'PHP', level: 'Advanced', categories: ['Web-Development', 'Back-End'], experience: 80, icon: 'devicon-php-plain' },
  { skill: 'SQL', level: 'Advanced', categories: ['DataBase', 'Back-End'], experience: 80, icon: 'devicon-mysql-plain' },
  { skill: 'Linux', level: 'Beginner', categories: ['Other', 'Tools'], experience: 30, icon: 'devicon-linux-plain' },
  { skill: 'Node.js', level: 'Beginner', categories: ['Web-Development', 'Back-End'], experience: 30, icon: 'devicon-nodejs-plain' },
  { skill: 'Express.js', level: 'Beginner', categories: ['Web-Development', 'Back-End'], experience: 30, icon: 'devicon-express-original' },
  { skill: 'MongoDB', level: 'Beginner', categories: ['Web-Development', 'Back-End', 'DataBase'], experience: 20, icon: 'devicon-mongodb-plain' },
];

export const skillCategories = [
  'All',
  'Front-End',
  'Back-End',
  'Programming',
  'Data-Engineering',
  'Game-Development',
  'DataBase',
  'Tools',
];

export const languages = skills.filter((s) => s.categories.includes('Programming'));

export const skillsByExperience = [...skills].sort((a, b) => b.experience - a.experience);
9
export const skillNames = skills.map((s) => s.skill);