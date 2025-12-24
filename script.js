import { skills, achievements, projects, loadSkills, loadAchievements, loadProjects } from './loadData.js';
import { addPagination } from './addPagination.js';

//my picture clicking easter egg
let ct = 0;
const count = () =>{
  ct++;
  if(ct === 3){
    alert("Would you stop clicking on me?");
  }
  else if( ct === 4){
    alert("Really? I'm serious");  
  }
  else if( ct === 5){
    alert("Last warning!");
  }
  else if (ct === 6){
    alert("That's it! No more clicking!");
    let img = document.querySelectorAll(".myPicture");
    img.forEach(picture => {
      picture.src = "";
    });
  }
}

let skillsPagination, achievementsPagination, projectsPagination;
const filterProjects = (category) => {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    if (category === "All" || card.classList.contains(category)) {
      card.style.display = 'flex';
      card.style.animation = 'fadeIn 0.5s ease-in-out';
    } else {
      card.style.display = 'none';
    }
  });
   projectsPagination.updateFilter(project => 
      category === "All" || project.categories.includes(category)
  );
};

const filterSkills = (category) => {
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    if (category === "All" || card.classList.contains(category)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
  skillsPagination.updateFilter(skill => 
      category === "All" || skill.categories.includes(category)
  );
};

window.count = count;
window.filterProjects = filterProjects;
window.filterSkills = filterSkills;

function initializeFilters() {
  let projectCategory = ["All"];
  projects.forEach(project => {
    project.categories.forEach(category => {
      if (!projectCategory.includes(category)) {
        projectCategory.push(category);
      }
    });
  });

  const projectFilter = document.getElementById("project-category");
  if (projectFilter) {
    projectCategory.forEach(category => {
      const button = document.createElement("button");
      button.textContent = category === "All" ? "All" : category.replace("-", " ");
      button.classList.add("project-filter-button");
      
      if (category === "All") {
        button.classList.add("project-button-active");
      }
      
      button.addEventListener('click', () => {
        document.querySelectorAll('.project-filter-button').forEach(btn => {
          btn.classList.remove("project-button-active");
        });
        
        button.classList.add("project-button-active");
        filterProjects(category);
      });
      
      projectFilter.appendChild(button);
    });
  }

  let skillCategory = ["All"];
  skills.forEach(skill => {
    skill.categories.forEach(category => {
      if (!skillCategory.includes(category)) {
        skillCategory.push(category);
      }
    });
  });

  const skillFilter = document.getElementById("Skill-filter");
  if (skillFilter) {
    skillCategory.forEach(category => {
      const button = document.createElement("button");
      button.textContent = category;
      button.classList.add("skill-filter-button");
      
      if (category === "All") {
        button.classList.add("skill-button-active");
      }
      
      button.addEventListener('click', () => {
        document.querySelectorAll('.skill-filter-button').forEach(btn => {
          btn.classList.remove("skill-button-active");
        });
        
        button.classList.add("skill-button-active");
        filterSkills(category);
      });
      
      skillFilter.appendChild(button);
    });
  }
}

//Inverted cursor - initialize after DOM loaded
function initializeCursor() {
  const customCursor = document.querySelector('.custom-cursor');
  
  document.addEventListener('mousemove', function(e) {
    if (customCursor) {
      customCursor.style.left = e.pageX + 'px';
      customCursor.style.top = e.pageY + 'px';
    }
  });

  document.querySelectorAll('.invert').forEach(function(elem) {
    elem.addEventListener('mouseenter', function() {
      document.body.style.cursor = 'none';
      if (customCursor) customCursor.style.display = 'block';
    });
    elem.addEventListener('mouseleave', function() {
      document.body.style.cursor = '';
      if (customCursor) customCursor.style.display = 'none';
    });
    elem.addEventListener('mousedown', function() {
      elem.classList.add('active');
      if (customCursor) customCursor.classList.add('active');
    });
    elem.addEventListener('mouseup', function() {
      elem.classList.remove('active');
      if (customCursor) customCursor.classList.remove('active');
    });
    elem.addEventListener('mouseleave', function() {
      if (customCursor) customCursor.classList.remove('active');
    });
  });
}

//-------------------------Onload
window.onload = () => {
    lucide.createIcons();
    const savedTheme = localStorage.getItem("theme");
    const isLight = savedTheme === "light";
    if (savedTheme) {
      document.body.classList.toggle("light", isLight);
      const themeToggleIcon = document.getElementById("theme-toggle");
      themeToggleIcon.setAttribute("data-lucide", isLight ? "sun" : "moon");
      updateGithubStats(isLight);
    }
    const asideHidden = localStorage.getItem("aside-hidden") === "true";
    if (asideHidden) {
      const asideElement = document.querySelector("aside");
      asideElement.classList.add("hidden");
      document.body.classList.add("aside-hidden");
      const menuButton = document.getElementById("menu-icon");
      if (menuButton) {
        menuButton.setAttribute("data-lucide", "menu");
        lucide.createIcons();
      }
    }
    skillsPagination = addPagination({
      containerSelector: '.skills-grid',
      itemSelector: '.skill-card',
      items: skills,
      itemsPerPage: 15,
      renderItem: skill => {
        const skillElement = document.createElement('div');
        skillElement.classList.add('skill-card', 'invert');
        skill.categories.forEach(category => skillElement.classList.add(category));
        skillElement.innerHTML = `
          <i class="${skill.icon} skill-icon"></i>
          <div class="skill-title">${skill.skill}</div>
          <div class="skill-bar">
            <div class="skill-fill" style="width: ${skill['experience-bar']}%;"></div>
          </div>
          <div class="skill-level">${skill.level}</div>
        `;
        return skillElement;
      }
    });

    achievementsPagination = addPagination({
      containerSelector: '.achievements-grid',
      itemSelector: '.achievement-card',
      items: achievements,
      itemsPerPage: 9,
      renderItem: achievement => {
        const achievementElement = document.createElement('div');
        achievementElement.classList.add('achievement-card', 'invert');
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
        return achievementElement;
      }
    });

    projectsPagination = addPagination({
      containerSelector: '.projects-grid',
      itemSelector: '.project-card',
      items: projects,
      itemsPerPage: 9,
      renderItem: project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-card', 'invert');
        project.categories.forEach(category => projectElement.classList.add(category));
        const icon = project.linkType === 'github' ? 'github' : 'gamepad-2';
        const buttonText = project.linkType === 'github' ? 'View on GitHub' : 'Play Game';
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
        return projectElement;
      }
    });
    navItem();
    initTypewriter();
    createParticles();
    init3DTilt();
    initInteractiveSidebar();
    initializeFilters();
    initializeCursor();
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
const toggleTheme = () => {
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

window.toggleTheme = toggleTheme;

//change card colors depending on the theme
const updateGithubStats = (isLight) => {
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
  if (githubStatsCards[0]) {
    githubStatsCards[0].src = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true&count_private=true&bg_color=${colors.bg_color}&title_color=${colors.title_color}&text_color=${colors.text_color}&icon_color=${colors.icon_color}`;
  }
  
  // Top Languages
  if (githubStatsCards[1]) {
    githubStatsCards[1].src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&hide_border=true&langs_count=8&bg_color=${colors.bg_color}&title_color=${colors.title_color}&text_color=${colors.text_color}`;
  }
  
  // GitHub Streak
  if (githubStatsCards[2]) {
    githubStatsCards[2].src = `https://streak-stats.demolab.com/?user=${username}&theme=dark&hide_border=true&background=${colors.bg_color}&ring=${colors.title_color}&fire=${colors.icon_color}&currStreakLabel=${colors.text_color}&sideLabels=${colors.text_color}&currStreakNum=${colors.currStreakNum}&sideNums=${colors.sideNums}`;
  }
  
  // Profile Summary Card
  if (githubStatsCards[3]) {
    githubStatsCards[3].src = `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=transparent&bg_color=${colors.bg_color}&title_color=${colors.title_color}&text_color=${colors.text_color}&icon_color=${colors.icon_color}&hide_border=true`;
  }
  //contributions
  const contributionGraph = document.querySelector('.contribution-graph .stat-card');
  contributionGraph.src = `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github-compact&hide_border=true&area=true&bg_color=${colors.bg_color}&color=${colors.text_color}&line=${colors.title_color}&point=${colors.icon_color}`;
};
window.updateGithubStats = updateGithubStats;


//-----------------------------------------------------
// Nav item highlight
const navItem = () => {
    const navItems = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');

    function highlightNavItem() {
        const scrollPosition = window.scrollY + 100;
        let currentSection = null;
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.id;
            }
        });
        
        navItems.forEach(item => item.style.opacity = '0.6');
        
        let navIndex = -1;
        switch(currentSection) {
            case 'Home':
                navIndex = 0;
                break;
            case 'About':
                navIndex = 1;
                break;
            case 'GitHub':
                navIndex = 2;
                break;
            case 'Skills':
            case 'Achievements':
                navIndex = 3;
                break;
            case 'Projects':
                navIndex = 4;
                break;
            case 'Contact':
                navIndex = 5;
                break;
        }
        
        if (navIndex >= 0 && navItems[navIndex]) {
            navItems[navIndex].style.opacity = '1';
        }
    }

    highlightNavItem();
    window.addEventListener('scroll', highlightNavItem);
    
    initializeSkillBars();
}
window.navItem = navItem;

function initializeSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    
    skillFills.forEach(fill => {
        const targetWidth = fill.style.width;
        fill.style.setProperty('--target-width', targetWidth);
        fill.style.width = '0%';
        
        setTimeout(() => {
            fill.style.width = targetWidth;
        }, 100);
    });

}


//-------------------------------------------------
//open image popup
function openImage(imageSrc) {

    const container = document.createElement('div');
    container.className = 'image-modal';
    container.innerHTML = `
        <div class="modal-overlay" onclick="closeImageModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <img src="${imageSrc}" alt="Certificate" class="modal-image">
                <button class="modal-close" onclick="closeImageModal()">
                    <i data-lucide="x"></i>
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(container);

    lucide.createIcons();
    
    document.body.style.overflow = 'hidden';
    
    container.classList.add('show');
}

function closeImageModal() {
    const container = document.querySelector('.image-modal');
    if (container) {
        container.classList.remove('show');

        setTimeout(() => {
            container.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Expose to window for onclick handlers
window.openImage = openImage;
window.closeImageModal = closeImageModal;

// Close the container with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});


//change typewriter text
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    const cursor = document.querySelector('.cursor');
    
    if (!typewriterElement) return;
    
    const texts = [
        "Web Developer", 
        "Software Developer",
        "Problem Solver",
        "CS Student",
        "Game Developer"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (!isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                setTimeout(() => {
                    isDeleting = true;
                    typeWriter();
                }, 2000);
                return;
            }
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }
        
        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeWriter, typingSpeed);
    }
    
    setTimeout(() => {
        typeWriter();
    }, 1000);
}


//create particles
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = window.innerWidth > 768 ? 30 : 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = window.innerWidth > 768 ? `${Math.random() * 5 + 2}px` : `${Math.random() * 4 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (6 + Math.random() * 4) + 's';
        
        container.appendChild(particle);
    }
}

// 3D Card Tilt Effect
// Inspired by: https://github.com/micku7zu/vanilla-tilt.js
// Tutorial reference: https://www.youtube.com/watch?v=XK7T3mY1V-w 
function init3DTilt() {
    const cards = document.querySelectorAll('.skill-card, .achievement-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * -10;
    const rotateY = (x - centerX) / centerX * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
}

// SideBar 
function initInteractiveSidebar() {
    const sidebarItems = document.querySelectorAll('.sidebar-item[data-section]');
    const sections = document.querySelectorAll('section');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            const targetElement = document.getElementById(section);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    function updateActiveState() {
        if (!document.body.classList.contains('aside-hidden')) return;
        
        const scrollPosition = window.scrollY + 100;
        let currentSection = null;
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.id;
            }
        });
        
        sidebarItems.forEach(item => {
            item.classList.remove('active');
            const itemSection = item.dataset.section;
            if (itemSection === currentSection) {
                item.classList.add('active');
            } else if (itemSection === 'Skills' && currentSection === 'Achievements') {
                item.classList.add('active');
            }
        });
    }
    
    function updateSidebarThemeIcon() {
        const sidebarThemeIcon = document.getElementById('sidebar-theme-icon');
        if (sidebarThemeIcon) {
            const isLight = document.body.classList.contains('light');
            sidebarThemeIcon.setAttribute('data-lucide', isLight ? 'sun' : 'moon');
            lucide.createIcons();
        }
    }
    
    window.addEventListener('scroll', updateActiveState);
    
    const observer = new MutationObserver(() => {
        updateSidebarThemeIcon();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    updateActiveState();
    updateSidebarThemeIcon();
}

//Scroll to top button
function scrollToTop() {
    window.scrollTo({ top: 0 });
}

// Expose to window for onclick handler
window.scrollToTop = scrollToTop;
