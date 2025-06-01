// Enhanced Typing Animation Class
class TypeMaster {
  constructor(element, options = {}) {
    this.element = element;
    this.text = element.dataset.animateText || element.textContent.trim();
    this.options = {
      typingSpeed: 100,
      eraseSpeed: 30,
      pauseBeforeErase: 1500,
      pauseBeforeRetry: 500,
      loop: true,
      ...options
    };
    this.currentText = '';
    this.isDeleting = false;
    this.init();
  }

  init() {
    this.element.textContent = '';
    this.cursor = document.createElement('span');
    this.cursor.className = 'typing-cursor';
    this.element.appendChild(this.cursor);
    this.animate();
  }

  animate() {
    const speed = this.isDeleting ? this.options.eraseSpeed : this.options.typingSpeed;
    
    if (!this.isDeleting) {
      // Typing phase
      this.currentText = this.text.substring(0, this.currentText.length + 1);
      this.updateDisplay();
      
      if (this.currentText === this.text) {
        setTimeout(() => {
          this.isDeleting = true;
          this.animate();
        }, this.options.pauseBeforeErase);
        return;
      }
    } else {
      // Deleting phase (one character at a time)
      this.currentText = this.currentText.substring(0, this.currentText.length - 1);
      this.updateDisplay();
      
      if (this.currentText === '') {
        setTimeout(() => {
          this.isDeleting = false;
          if (this.options.loop) this.animate();
        }, this.options.pauseBeforeRetry);
        return;
      }
    }
    
    setTimeout(() => this.animate(), speed);
  }

  updateDisplay() {
    this.element.innerHTML = this.currentText + 
      (this.options.cursor !== false ? '<span class="cursor">|</span>' : '');
  }
}

// Initialize all animations
function initAnimations() {
  // Hero animation (continuous loop)
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    new TypeMaster(heroTitle, {
      typingSpeed: 100,
      eraseSpeed: 30,
      pauseBeforeErase: 1500,
      pauseBeforeRetry: 500
    });
  }

  // Section headings (animate once)
  document.querySelectorAll('[data-animate-type]').forEach(el => {
    new TypeMaster(el, {
      loop: true,
      typingSpeed: 80,
      cursor: false
    });
  });
}

// Video Background Handler
function initVideoBackground() {
  const video = document.querySelector('.video-background');
  const overlay = document.querySelector('.video-overlay');
  
  if (!video || !overlay) return;

  // Fallback for mobile or unsupported browsers
  if (window.innerWidth < 768 || !video.canPlayType('video/mp4')) {
    video.style.display = 'none';
    overlay.style.background = 'url(assets/images/background-fallback.jpg) center/cover no-repeat';
    return;
  }

  // Try to play video
  const playPromise = video.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      video.style.display = 'none';
      overlay.style.background = 'url(assets/images/background-fallback.jpg) center/cover no-repeat';
    });
  }
}

// Set active page in navigation
function setActiveNavLink() {
  const currentPage = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-center a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('current-page');
    }
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initVideoBackground();
  initAnimations();
  setActiveNavLink();
  initSmoothScrolling();
});