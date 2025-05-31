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
      loop: false,
      typingSpeed: 80,
      cursor: false
    });
  });
}

// Video Background Handler
function initVideoBackground() {
    const video = document.querySelector('.video-background');
    if (window.innerWidth < 768 || !video.canPlayType('video/mp4')) {
        video.style.display = 'none';
        document.querySelector('.video-container').style.background = 
            'url(assets/images/background-fallback.jpg) center/cover no-repeat';
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initVideoBackground();
  initAnimations();
  
  // Set active page in navigation
  const currentPage = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-center a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('current-page');
    }
  });
});