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
            cursor: true,
            ...options
        };
        this.currentText = '';
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.element.textContent = '';
        if (this.options.cursor) {
            this.cursor = document.createElement('span');
            this.cursor.className = 'typing-cursor';
            this.cursor.textContent = '|';
            this.element.appendChild(this.cursor);
        }
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
            // Deleting phase
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
        this.element.innerHTML = this.currentText;
        if (this.options.cursor) {
            this.element.appendChild(this.cursor);
        }
    }
}

// Initialize all animations
function initAnimations() {
    // Hero animation
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        new TypeMaster(heroTitle, {
            typingSpeed: 100,
            eraseSpeed: 30,
            pauseBeforeErase: 1500,
            pauseBeforeRetry: 500,
            loop: true
        });
    }

    // Section headings
    document.querySelectorAll('[data-animate-type], .section-header h2').forEach(el => {
        new TypeMaster(el, {
            loop: true,
            typingSpeed: 80,
            cursor: true
        });
    });
}

// Set active page in navigation
function setActiveNavLink() {
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-center a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === 'index.html' && linkPage === './')) {
            link.classList.add('current-page');
        }
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    setActiveNavLink();
    
    // Add padding to body to account for fixed header
    const headerHeight = document.querySelector('header').offsetHeight;
    document.body.style.paddingTop = `${headerHeight}px`;
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
});