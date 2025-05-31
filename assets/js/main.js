// Enhanced typing animation function with loop capability
function typeWriter(element, text, speed = 100, delay = 0, keepCursor = false, onComplete = null) {
    setTimeout(() => {
        let i = 0;
        
        function typing() {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i+1) + 
                                 (keepCursor ? '<span class="cursor">|</span>' : '');
                i++;
                setTimeout(typing, speed);
            } else {
                element.innerHTML = text;
                if (onComplete) onComplete();
            }
        }
        
        // Only clear if we're starting fresh
        if (i === 0) element.innerHTML = '';
        typing();
    }, delay);
}

// Continuous looping animation for hero section
function startHeroAnimation() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    let isDeleting = false;
    let currentText = '';
    let i = 0;
    const speed = 100;
    const pauseTime = 2000;
    
    function typeLoop() {
        const fullText = text;
        
        if (isDeleting) {
            currentText = fullText.substring(0, currentText.length - 1);
        } else {
            currentText = fullText.substring(0, currentText.length + 1);
        }
        
        heroTitle.innerHTML = currentText + '<span class="cursor">|</span>';
        
        let typeSpeed = speed;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && currentText === fullText) {
            typeSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            i++;
            typeSpeed = 500;
        }
        
        setTimeout(typeLoop, typeSpeed);
    }
    
    typeLoop();
}

// Initialize all page animations
function initPageAnimations() {
    // Hero animation (looping)
    startHeroAnimation();
    
    // About page animations
    const aboutTitle = document.querySelector('#about h2');
    if (aboutTitle) {
        typeWriter(aboutTitle, aboutTitle.textContent, 100, 300);
    }

    // Tech stack title animation
    const techTitle = document.querySelector('#tech h2');
    if (techTitle) {
        typeWriter(techTitle, techTitle.textContent, 100, 600);
    }

    // Projects page animation
    const projectsTitle = document.querySelector('#projects h2');
    if (projectsTitle) {
        typeWriter(projectsTitle, projectsTitle.textContent, 100, 300);
    }

    // Contact page animation
    const contactTitle = document.querySelector('#connect h2');
    if (contactTitle) {
        typeWriter(contactTitle, contactTitle.textContent, 100, 300);
    }
}

// Navigation and UI interactions
function initUIInteractions() {
    // Set active page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-center a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('current-page');
        }
    });
    
    // Smooth scrolling for anchor links
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
    
    // Dynamic navbar shadow
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 10) {
            nav.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        } else {
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPageAnimations();
    initUIInteractions();
    
    // Only run hero animation on home page
    if (document.querySelector('.hero')) {
        startHeroAnimation();
    }
});