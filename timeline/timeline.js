import { projectsTimeline } from './timelineData.js';

const timelineRoot = document.getElementById('timeline-root');
const timelineProgress = document.getElementById('timeline-line-progress');
const timelineSection = document.getElementById('timeline-section');
const timelinePrev = document.getElementById('timeline-prev');
const timelineNext = document.getElementById('timeline-next');
const timelineCurrentProject = document.getElementById('timeline-current-project');
const timelineTotalProjects = document.getElementById('timeline-total-projects');
const timelineJumpButtons = document.getElementById('timeline-jump-buttons');
const compactTimelineMedia = window.matchMedia('(max-width: 900px)');

const parseProjectDate = (value) => {
  const [year, month = '01'] = value.split('-');
  return new Date(Number(year), Number(month) - 1, 1);
};

const formatProjectDate = (value) => {
  const parsed = parseProjectDate(value);
  return parsed.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric'
  });
};

const sortedTimeline = [...projectsTimeline].sort(
  (a, b) => parseProjectDate(a.date) - parseProjectDate(b.date)
);

const getTimelineItems = () => [...timelineRoot.querySelectorAll('.timeline-item')];

const getCurrentProjectIndex = () => {
  const items = getTimelineItems();
  if (!items.length) return 0;

  if (compactTimelineMedia.matches) {
    const viewportCenterY = window.innerHeight / 2;
    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const distance = Math.abs(cardCenter - viewportCenterY);

      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });

    return bestIndex;
  }

  const sectionRect = timelineSection.getBoundingClientRect();
  const viewportCenterX = sectionRect.left + sectionRect.width / 2;
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  items.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const distance = Math.abs(cardCenter - viewportCenterX);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return bestIndex;
};

const scrollToProject = (index) => {
  const items = getTimelineItems();
  const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
  const targetItem = items[clampedIndex];
  if (!targetItem) return;

  if (compactTimelineMedia.matches) {
    targetItem.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    return;
  }

  const targetLeft = targetItem.offsetLeft - 22;
  timelineSection.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
};

const updatePaginationStatus = () => {
  const total = sortedTimeline.length;
  const currentIndex = getCurrentProjectIndex();
  const current = total > 0 ? currentIndex + 1 : 0;

  if (timelineTotalProjects) timelineTotalProjects.textContent = String(total);
  if (timelineCurrentProject) timelineCurrentProject.textContent = String(current);

  if (timelineJumpButtons) {
    [...timelineJumpButtons.querySelectorAll('.timeline-jump-btn')].forEach((button, index) => {
      button.classList.toggle('active', index === currentIndex);
      button.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
    });
  }
};

let paginationFrame = null;
const queuePaginationStatusUpdate = () => {
  if (paginationFrame) return;

  paginationFrame = requestAnimationFrame(() => {
    paginationFrame = null;
    updatePaginationStatus();
  });
};

const initJumpButtons = () => {
  if (!timelineJumpButtons) return;

  const buttons = sortedTimeline.map((project, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'timeline-jump-btn';
    button.textContent = String(index + 1);
    button.title = project.name;
    button.setAttribute('aria-label', `Jump to project ${index + 1}: ${project.name}`);
    button.addEventListener('click', () => {
      scrollToProject(index);
      queuePaginationStatusUpdate();
    });
    return button;
  });

  timelineJumpButtons.replaceChildren(...buttons);
};

const createTimelineCard = (project, index) => {
  const linkLabel = project.linkType === 'game' ? 'Play / Download' : 'View on GitHub';
  const sideClass = index % 2 === 0 ? 'top' : 'bottom';
  const edgeClass = index === 0 ? 'first' : index === sortedTimeline.length - 1 ? 'last' : '';
  const isFirstCard = index === 0;
  const imageLoading = isFirstCard ? 'eager' : 'lazy';
  const fetchPriority = isFirstCard ? 'high' : 'auto';
  const dateLabel = formatProjectDate(project.date);
  const sideDateNoteMarkup = project.dateNote
    ? `<p class="timeline-side-date-note">${project.dateNote}</p>`
    : '';

  const linkMarkup = project.link
    ? `<a class="timeline-link" href="${project.link}" target="_blank" rel="noopener noreferrer">${linkLabel}</a>`
    : '';

  const item = document.createElement('article');
  item.className = `timeline-item ${sideClass} ${edgeClass}`.trim();
  item.style.setProperty('--reveal-delay', `${Math.min(index * 45, 320)}ms`);
  item.innerHTML = `
    <div class="timeline-card" data-tilt-card>
      <h2 class="timeline-title">${project.name}</h2>
      <img src="${project.image}" alt="${project.name}" class="timeline-image" loading="${imageLoading}" fetchpriority="${fetchPriority}" decoding="async">
      <p class="timeline-description">${project.description}</p>
      <div class="timeline-meta">
        ${project.categories.map((category) => `<span class="timeline-tag">${category}</span>`).join('')}
      </div>
      ${linkMarkup}
    </div>
    <div class="timeline-spine" aria-hidden="true">
      <div class="timeline-dot"></div>
    </div>
    <div class="timeline-date-panel" aria-label="Project timeline date">
      <p class="timeline-side-date">${dateLabel}</p>
      ${sideDateNoteMarkup}
    </div>
  `;

  return item;
};

const renderTimeline = () => {
  const nodes = sortedTimeline.map(createTimelineCard);
  timelineRoot.replaceChildren(...nodes);
  initJumpButtons();
  updatePaginationStatus();
};

const animateTimelineOnScroll = () => {
  if (!timelineSection) return;

  const items = [...document.querySelectorAll('.timeline-item')];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.42, root: timelineSection }
  );

  items.forEach((item) => observer.observe(item));

  const updateLineProgress = () => {
    const scrollable = timelineSection.scrollWidth - timelineSection.clientWidth;
    if (scrollable <= 0) {
      timelineProgress.style.width = '100%';
      return;
    }

    const progressRatio = Math.max(0, Math.min(1, timelineSection.scrollLeft / scrollable));
    timelineProgress.style.width = `${progressRatio * 100}%`;
  };

  updateLineProgress();
  timelineSection.addEventListener('scroll', updateLineProgress, { passive: true });
  timelineSection.addEventListener('scroll', queuePaginationStatusUpdate, { passive: true });
  window.addEventListener('scroll', queuePaginationStatusUpdate, { passive: true });
  window.addEventListener('resize', updateLineProgress);
  window.addEventListener('resize', queuePaginationStatusUpdate);
};

const initTimelineControls = () => {
  if (!timelineSection) return;

  const isHorizontalMode = () => {
    if (compactTimelineMedia.matches) return false;
    return timelineSection.scrollWidth > timelineSection.clientWidth + 1;
  };

  const getStep = () => Math.max(260, Math.floor(timelineSection.clientWidth * 0.75));

  if (timelinePrev) {
    timelinePrev.addEventListener('click', () => {
      if (!isHorizontalMode()) return;
      timelineSection.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });
  }

  if (timelineNext) {
    timelineNext.addEventListener('click', () => {
      if (!isHorizontalMode()) return;
      timelineSection.scrollBy({ left: getStep(), behavior: 'smooth' });
    });
  }

  const wheelState = {
    frame: null,
    deltaBuffer: 0
  };

  const flushWheelScroll = () => {
    timelineSection.scrollLeft += wheelState.deltaBuffer;
    wheelState.deltaBuffer = 0;
    wheelState.frame = null;
  };

  timelineSection.addEventListener('wheel', (event) => {
    if (!isHorizontalMode()) return;

    event.preventDefault();
    const wheelDelta = event.deltaY !== 0 ? event.deltaY : event.deltaX;
    if (wheelDelta === 0) return;

    const deltaMultiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? timelineSection.clientWidth : 1;
    wheelState.deltaBuffer += wheelDelta * deltaMultiplier;

    if (!wheelState.frame) {
      wheelState.frame = requestAnimationFrame(flushWheelScroll);
    }
  }, { passive: false });

  let isDragging = false;
  let dragStartX = 0;
  let dragStartScroll = 0;

  timelineSection.addEventListener('mousedown', (event) => {
    if (!isHorizontalMode()) return;
    isDragging = true;
    dragStartX = event.clientX;
    dragStartScroll = timelineSection.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  timelineSection.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  timelineSection.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    event.preventDefault();
    const dragDistance = event.clientX - dragStartX;
    timelineSection.scrollLeft = dragStartScroll - dragDistance * 1.2;
  });

  window.addEventListener('keydown', (event) => {
    if (!isHorizontalMode()) return;

    if (event.key === 'ArrowRight') {
      timelineSection.scrollBy({ left: getStep(), behavior: 'smooth' });
    }

    if (event.key === 'ArrowLeft') {
      timelineSection.scrollBy({ left: -getStep(), behavior: 'smooth' });
    }
  });

  const updateControlState = () => {
    const enabled = isHorizontalMode();
    if (timelinePrev) timelinePrev.disabled = !enabled;
    if (timelineNext) timelineNext.disabled = !enabled;
    queuePaginationStatusUpdate();
  };

  compactTimelineMedia.addEventListener('change', updateControlState);
  window.addEventListener('resize', updateControlState);
  updateControlState();
};

renderTimeline();
animateTimelineOnScroll();
initTimelineControls();
