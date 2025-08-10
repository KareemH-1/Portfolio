
window.onload = () => {
    lucide.createIcons();
    const savedTheme = localStorage.getItem("theme");
    const isLight = savedTheme === "light";
    
    if (savedTheme) {
        document.body.classList.toggle("light", isLight);
        themeToggleIcon = document.getElementById("theme-toggle");
        themeToggleIcon.setAttribute("data-lucide", isLight ? "sun" : "moon");
        
        updateGithubStats(isLight);
    }
    
    const asideHidden = localStorage.getItem("aside-hidden") === "true";
    if (asideHidden) {
        asideElement = document.querySelector("aside");
        asideElement.classList.add("hidden");
        document.body.classList.add("aside-hidden");
        const menuButton = document.getElementById("menu-icon");
        if (menuButton) {
            menuButton.setAttribute("data-lucide", "menu");
            lucide.createIcons();
        }
    }
    
    navItem();
};


//Aside toggle
let asideElement = document.querySelector("aside");
document.body.addEventListener("click", (e) => {
  let menuButton = document.getElementById("menu-icon");
  if (!menuButton) return;

  if (e.target.closest("#menu-icon")) {
    asideElement.classList.toggle("hidden");
    localStorage.setItem(
        "aside-hidden",
        asideElement.classList.contains("hidden") ? "true" : "false"
    );
    document.body.classList.toggle("aside-hidden", asideElement.classList.contains("hidden"));

    menuButton.setAttribute(
      "data-lucide",
      asideElement.classList.contains("hidden") ? "menu" : "x"
    );

    lucide.createIcons();
  }
});


//Theme toggle
toggleTheme = () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  
  localStorage.setItem(
    "theme",
    isLight ? "light" : "dark"
  );
  
  const themeToggleIcon = document.getElementById("theme-toggle");
  themeToggleIcon.setAttribute(
    "data-lucide",
    isLight ? "sun" : "moon"
  );
  
  updateGithubStats(isLight);
  
  lucide.createIcons();
};

//change card colors depending on the theme
updateGithubStats = (isLight) => {
  const username = "kareemH-1";
  
  const colors = isLight ? {
    bg_color: "FFFFFF",
    title_color: "2563EB", 
    text_color: "1B1B1B",
    icon_color: "7C3AED",
    ring: "2563EB",
    fire: "7C3AED",
    currStreakLabel: "1B1B1B",
    sideLabels: "1B1B1B",
    currStreakNum: "059669",
    sideNums: "059669"
  } : {
    bg_color: "2A2A2A",
    title_color: "F8B400",
    text_color: "FFFFFF", 
    icon_color: "E63946",
    ring: "F8B400",
    fire: "E63946",
    currStreakLabel: "FFFFFF",
    sideLabels: "FFFFFF",
    currStreakNum: "4ECDC4",
    sideNums: "4ECDC4"
  };

  const githubStatsCards = document.querySelectorAll('.github-stats-grid .stat-card');
  
  // GitHub Stats
  githubStatsCards[0].src = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true&count_private=true&bg_color=${colors.bg_color}&title_color=${colors.title_color}&text_color=${colors.text_color}&icon_color=${colors.icon_color}`;
  
  // Top Languages
  githubStatsCards[1].src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&hide_border=true&langs_count=8&bg_color=${colors.bg_color}&title_color=${colors.title_color}&text_color=${colors.text_color}`;
  
  // GitHub Streak
  githubStatsCards[2].src = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&hide_border=true&background=${colors.bg_color}&ring=${colors.ring}&fire=${colors.fire}&currStreakLabel=${colors.currStreakLabel}&sideLabels=${colors.sideLabels}&currStreakNum=${colors.currStreakNum}&sideNums=${colors.sideNums}`;
  
  // Commit Stats
  githubStatsCards[3].src = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true&count_private=true&show=commits,prs,issues,contributions&bg_color=${colors.bg_color}&title_color=${colors.title_color}&text_color=${colors.text_color}&icon_color=${colors.icon_color}`;
  //contributions
  const contributionGraph = document.querySelector('.contribution-graph .stat-card');
  contributionGraph.src = `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github-compact&hide_border=true&area=true&bg_color=${colors.bg_color}&color=${colors.text_color}&line=${colors.title_color}&point=${colors.icon_color}`;
};



// Nav item highlight
navItem = () => {
    const navItems = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');

    function highlightNavItem() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navItems.forEach(item => item.style.opacity = '0.6');
                if (navItems[index]) {
                    navItems[index].style.opacity = '1';
                }
            }
        });
    }

    highlightNavItem();
    window.addEventListener('scroll', highlightNavItem);
}
