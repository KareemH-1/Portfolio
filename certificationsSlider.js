let currentSlide = 0;
let totalSlides = 0;

function createCertificationSlides(achievements) {
  const slider = document.querySelector('.certifications-slider');
  if (!slider || !achievements || achievements.length === 0) return;
  
  slider.innerHTML = '';
  
  achievements.forEach((cert, index) => {
    const slide = document.createElement('div');
    slide.className = `certification-slide ${index === 0 ? 'active' : ''}`;
    
    const isPdf = cert.pdf && cert.pdf !== cert.img;
    
    slide.innerHTML = `
      <img src="${cert.img}" alt="${cert.name}" class="certification-image" onclick="openModal('${cert.img}')">
      <h3>${cert.name}</h3>
      <p>${cert.description}</p>
      ${isPdf ? `<a href="${cert.pdf}" target="_blank" class="btn btn-primary">
        <i data-lucide="file-text"></i>
        <span>View Certificate</span>
      </a>` : ''}
    `;
    
    slider.appendChild(slide);
  });
  
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  initializeSlider();
}

function initializeSlider() {
  const slides = document.querySelectorAll('.certification-slide');
  totalSlides = slides.length;
  
  if (totalSlides === 0) return;
  
  const dotsContainer = document.querySelector('.slider-dots');
  if (!dotsContainer) return;
  
  dotsContainer.innerHTML = '';
  
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'slider-dot';
    if (i === 0) dot.classList.add('active');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  }
  
  showSlide(0);
}

function showSlide(index) {
  const slides = document.querySelectorAll('.certification-slide');
  const dots = document.querySelectorAll('.slider-dot');
  
  if (slides.length === 0) return;
  
  if (index >= totalSlides) currentSlide = 0;
  else if (index < 0) currentSlide = totalSlides - 1;
  else currentSlide = index;
  
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === currentSlide) {
      slide.classList.add('active');
    }
  });
  
  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === currentSlide) {
      dot.classList.add('active');
    }
  });
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
}

function goToSlide(index) {
  showSlide(index);
}

function openModal(imageSrc) {
  const modal = document.querySelector('.image-modal');
  const modalImage = document.querySelector('.modal-image');
  
  if (modal && modalImage) {
    modalImage.src = imageSrc;
    modal.classList.add('show');
  }
}

if (typeof window !== 'undefined') {
  window.changeSlide = changeSlide;
  window.goToSlide = goToSlide;
  window.createCertificationSlides = createCertificationSlides;
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (typeof achievements !== 'undefined') {
      createCertificationSlides(achievements);
    }
  }, 1000);
});