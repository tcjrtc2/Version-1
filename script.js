// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle with accessibility
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    const isExpanded = mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Update ARIA attributes for accessibility
    mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    mobileMenu.setAttribute('aria-hidden', !isExpanded);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    });
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations with enhanced options
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will contact you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Parallax effect for hero section
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// Add floating animation to elements
const floatingElements = document.querySelectorAll('.floating-badge');
floatingElements.forEach((element, index) => {
    element.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
});

// Add CSS for floating animation if not already present
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) scale(1);
        }
        50% {
            transform: translateY(-10px) scale(1);
        }
    }
`;
document.head.appendChild(style);

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
};

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                stat.textContent = '0' + (text.includes('+') ? '+' : text.includes('%') ? '%' : '');
                
                setTimeout(() => {
                    animateCounter(stat, number);
                }, 200);
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add timeline progress animation
const timelineProgress = document.querySelector('.timeline-progress');
if (timelineProgress) {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timelineProgress.style.animation = 'progressLine 1.5s ease 0.5s forwards';
            }
        });
    }, { threshold: 0.3 });
    
    const processSection = document.querySelector('.process-section');
    if (processSection) {
        timelineObserver.observe(processSection);
    }
}

// Prevent form submission with invalid data
const formInputs = document.querySelectorAll('input, textarea, select');
formInputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.classList.add('error');
    });
    
    input.addEventListener('input', () => {
        input.classList.remove('error');
    });
});

// Add CSS for error state
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    .error {
        border-color: #ef4444 !important;
    }
    
    .error:focus {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .nav-link.active {
        color: #FFC107;
    }
`;
document.head.appendChild(errorStyle);

// Add page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 768) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }, 250);
});

// ===== CINEMATIC SMOOTH SCROLL =====
class CinematicScroll {
    constructor() {
        this.scrollY = window.pageYOffset;
        this.targetScrollY = window.pageYOffset;
        this.ease = 0.08;
        this.isEnabled = window.innerWidth > 768; // Only enable on desktop
        
        if (this.isEnabled) {
            this.init();
        }
    }

    init() {
        // Disable native smooth scroll when cinematic scroll is active
        document.documentElement.style.scrollBehavior = 'auto';
        
        this.update();
        this.initScrollTriggers();
    }

    update() {
        if (!this.isEnabled) return;
        
        this.scrollY += (this.targetScrollY - this.scrollY) * this.ease;
        
        // Apply parallax effects
        this.applyParallax();
        
        requestAnimationFrame(() => this.update());
    }

    applyParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const rect = element.getBoundingClientRect();
            const scrolled = this.scrollY;
            
            // Calculate parallax offset
            const offsetY = -(scrolled * speed);
            element.style.transform = `translateY(${offsetY}px)`;
        });
    }

    initScrollTriggers() {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            this.targetScrollY = window.pageYOffset;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.scrollY = this.targetScrollY;
            }, 100);
        }, { passive: true });
    }
}

// Initialize cinematic scroll (desktop only)
if (window.innerWidth > 768) {
    const cinematicScroll = new CinematicScroll();
}

// ===== CINEMATIC PAGE TRANSITIONS =====
class PageTransition {
    constructor() {
        this.overlay = this.createOverlay();
        this.init();
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.innerHTML = `
            <div class="transition-curtain curtain-left"></div>
            <div class="transition-curtain curtain-right"></div>
            <div class="transition-logo">
                <img src="IMG_0878.JPG" alt="ATAJ Services">
            </div>
        `;
        document.body.appendChild(overlay);
        return overlay;
    }

    init() {
        // Add to existing navigation code
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const target = link.getAttribute('href');
                if (target && target !== '#') {
                    e.preventDefault();
                    this.transitionTo(target);
                }
            });
        });
    }

    transitionTo(target) {
        this.overlay.classList.add('active');
        
        setTimeout(() => {
            const element = document.querySelector(target);
            if (element) {
                const offsetTop = element.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 600);

        setTimeout(() => {
            this.overlay.classList.remove('active');
        }, 1200);
    }
}

// Initialize page transitions
const pageTransition = new PageTransition();

// ===== STAGGERED SECTION REVEALS =====
const cinematicObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add in-view class to section
            entry.target.classList.add('in-view');
            
            // Stagger child elements
            const staggerItems = entry.target.querySelectorAll('.stagger-item');
            staggerItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('revealed');
                }, index * 100);
            });
            
            // Optionally unobserve after animation
            cinematicObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all sections for cinematic reveals
document.querySelectorAll('section').forEach(section => {
    cinematicObserver.observe(section);
});

console.log('ATAJ Services website loaded successfully!');
