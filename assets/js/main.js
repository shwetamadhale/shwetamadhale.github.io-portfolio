// Smooth Typing Animation Class
class TypeMaster {
  constructor(element, options = {}) {
    this.element = element;
    this.text = element.dataset.animateText || element.textContent.trim();
    this.options = {
      typingSpeed: 100,
      eraseSpeed: 50,
      pauseBeforeErase: 2000,
      pauseBeforeRetry: 500,
      loop: true,
      ...options
    };
    this.init();
  }

  init() {
    this.element.textContent = '';
    this.cursor = document.createElement('span');
    this.cursor.className = 'typing-cursor';
    this.element.appendChild(this.cursor);
    this.animate();
    this.currentText = '';

  }

  animate() {
    if (!this.isDeleting) {
      // Typing phase
      this.currentText = this.text.substring(0, (this.currentText?.length || 0) + 1);
      this.element.insertBefore(
        document.createTextNode(this.currentText.slice(-1)), 
        this.cursor
      );
      
      if (this.currentText === this.text) {
        setTimeout(() => {
          this.isDeleting = true;
          this.animate();
        }, this.options.pauseBeforeErase);
        return;
      }
    } else {
      // Deleting phase
      this.element.removeChild(this.element.childNodes[this.element.childNodes.length - 2]);
      this.currentText = this.currentText.slice(0, -1);
      
      if (this.currentText === '') {
        setTimeout(() => {
          this.isDeleting = false;
          if (this.options.loop) this.animate();
        }, this.options.pauseBeforeRetry);
        return;
      }
    }
    
    setTimeout(() => this.animate(), this.isDeleting ? this.options.eraseSpeed : this.options.typingSpeed);
  }
}

// Initialize animations
function initAnimations() {
  // Hero title (continuous loop)
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    heroTitle.dataset.animateText = heroTitle.textContent.trim();
    new TypeMaster(heroTitle, {
      typingSpeed: 100,
      eraseSpeed: 30,
      pauseBeforeErase: 1500,
      pauseBeforeRetry: 300
    });
  }

  // Section headings (animate once)
  document.querySelectorAll('[data-animate-type]').forEach(el => {
    new TypeMaster(el, {
      loop: false,
      typingSpeed: 80,
      pauseBeforeErase: 0
    });
  });
}

function initVideoBackground() {
  const video = document.getElementById('bg-video');
  
  // Check if video can play
  const canPlay = video.canPlayType('video/mp4');
  
  // Fallback for mobile or unsupported browsers
  if (window.innerWidth < 768 || !canPlay) {
    video.style.display = 'none';
    document.querySelector('.video-overlay').style.background = 
      'url(assets/images/background-fallback.jpg) center/cover no-repeat';
    return;
  }

  // Try to play video
  const playPromise = video.play();
  
  // Handle auto-play restrictions
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      video.style.display = 'none';
      document.querySelector('.video-overlay').style.background = 
        'url(assets/images/background-fallback.jpg) center/cover no-repeat';
    });
  }
}

// Call this in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    initVideoBackground();
    initAnimations();
  
  // Navigation active state
  document.querySelectorAll('.nav-center a').forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('current-page');
    }
  });
});