// Continuous typing animation
function typeWriter(text, element, speed, callback) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i+1) + '<span class="cursor">|</span>';
            i++;
            setTimeout(typing, speed);
        } else {
            element.innerHTML = text.substring(0, i);
            if (callback) callback();
        }
    }
    typing();
}

function startTypingAnimation() {
    const text = "Hi, I'm FirstName LastName";
    const typingElement = document.querySelector('.hero h1');
    
    function loopAnimation() {
        typeWriter(text, typingElement, 100, () => {
            setTimeout(() => {
                typingElement.innerHTML = ''; // Clear text
                setTimeout(loopAnimation, 500); // Restart after pause
            }, 2000); // Pause at end
        });
    }
    
    loopAnimation();
}

document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation
    const text = "Hi, I'm FirstName LastName";
    const typingElement = document.querySelector('.typing-text');
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingElement.innerHTML = text.substring(0, i+1) + '<span class="cursor">|</span>';
            i++;
            setTimeout(typeWriter, 100);
        } else {
            typingElement.innerHTML = text.substring(0, i) + '<span class="cursor"></span>';
        }
    }
    
    typeWriter();
    
    // Smooth scrolling for navigation links
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
    
    // Add shadow to navbar on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 10) {
            nav.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
        } else {
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
});