// EPIC VPN - Main JavaScript
class EpicVPN {
    constructor() {
        this.isScrolled = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupMobileMenu();
        this.setupFAQAccordion();
        this.setupMobileTouchHandling();
        this.setupMobilePerformance();
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        this.setupPerformanceOptimizations();
    }

    setupEventListeners() {
        // Scroll events
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Resize events
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
        
        // DOM ready
        document.addEventListener('DOMContentLoaded', () => {
            this.setupLazyLoading();
            this.setupAnalytics();
        });

        // Performance events
        window.addEventListener('load', () => {
            this.removeLoadingScreen();
            this.setupServiceWorker();
        });
    }

    // Scroll Management
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Navbar scroll effect
        if (scrollY > 50 && !this.isScrolled) {
            document.querySelector('.navbar')?.classList.add('scrolled');
            this.isScrolled = true;
        } else if (scrollY <= 50 && this.isScrolled) {
            document.querySelector('.navbar')?.classList.remove('scrolled');
            this.isScrolled = false;
        }
    }

    // Debounce utility
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle resize events
    handleResize() {
        // Update mobile menu state
        const mobileMenu = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (window.innerWidth > 768) {
            navLinks?.classList.remove('mobile-visible');
            mobileMenu?.classList.remove('active');
        }
    }

    // Setup scroll animations
    setupScrollAnimations() {
        // Intersection Observer for animations
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

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }

    // Scroll Management
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Navbar scroll effect
        if (scrollY > 50 && !this.isScrolled) {
            document.querySelector('.navbar')?.classList.add('scrolled');
            this.isScrolled = true;
        } else if (scrollY <= 50 && this.isScrolled) {
            document.querySelector('.navbar')?.classList.remove('scrolled');
            this.isScrolled = false;
        }

        // Parallax effect for hero section
        this.handleParallax(scrollY);
    }

    handleParallax(scrollY) {
        const hero = document.querySelector('.hero');
        if (hero) {
            const speed = 0.5;
            hero.style.transform = `translateY(${scrollY * speed}px)`;
        }
    }

    // Animation Management
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.feature-card, .plan-card, .section-title');
        animatedElements.forEach(el => el.classList.add('fade-in'));
    }

    setupIntersectionObserver() {
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

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }

    // Mobile Menu
    setupMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuToggle && navLinks) {
            // Toggle mobile menu
            mobileMenuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('mobile-open');
                mobileMenuToggle.classList.toggle('active');
                
                // Change icon
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.className = navLinks.classList.contains('mobile-open') 
                        ? 'fas fa-times' 
                        : 'fas fa-bars';
                }
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = navLinks.classList.contains('mobile-open') 
                    ? 'hidden' 
                    : '';
            });
            
            // Close menu when clicking on links
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('mobile-open');
                    mobileMenuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    const icon = mobileMenuToggle.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                    }
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('mobile-open');
                    mobileMenuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    const icon = mobileMenuToggle.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                    }
                }
            });
        }
    }

    handleResize() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuToggle && navLinks) {
            if (window.innerWidth <= 768) {
                mobileMenuToggle.style.display = 'block';
                navLinks.classList.add('mobile-hidden');
                navLinks.classList.remove('mobile-open');
                document.body.style.overflow = '';
            } else {
                mobileMenuToggle.style.display = 'none';
                navLinks.classList.remove('mobile-hidden', 'mobile-open');
                document.body.style.overflow = '';
                
                // Reset icon
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        }
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Performance Optimizations
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupPerformanceOptimizations() {
        // Preload critical resources
        this.preloadResource('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', 'style');
        this.preloadResource('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap', 'style');
        
        // Add performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                }, 0);
            });
        }
    }

    preloadResource(href, as) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        document.head.appendChild(link);
    }

    // Analytics
    setupAnalytics() {
        // Track user interactions
        this.trackUserInteractions();
        
        // Track scroll depth
        this.trackScrollDepth();
        
        // Track time on page
        this.trackTimeOnPage();
    }

    trackUserInteractions() {
        const trackableElements = document.querySelectorAll('a, button, .feature-card, .plan-card');
        
        trackableElements.forEach(element => {
            element.addEventListener('click', (e) => {
                const action = element.dataset.action || element.textContent.trim();
                this.sendAnalytics('click', action, element.tagName);
            });
        });
    }

    trackScrollDepth() {
        let maxScroll = 0;
        window.addEventListener('scroll', this.debounce(() => {
            const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                    this.sendAnalytics('scroll_depth', `${maxScroll}%`);
                }
            }
        }, 100));
    }

    trackTimeOnPage() {
        const startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000);
            this.sendAnalytics('time_on_page', `${timeOnPage}s`);
        });
    }

    sendAnalytics(event, action, element = '') {
        // Send to your analytics service
        console.log('Analytics:', { event, action, element, timestamp: new Date().toISOString() });
        
        // Example: Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', event, {
                event_category: 'user_interaction',
                event_label: action,
                value: element
            });
        }
    }

    // Service Worker
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful');
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed:', error);
                });
        }
    }

    // Utility Functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    removeLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 300);
        }
    }

    // FAQ Accordion functionality
    setupFAQAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('i');
                
                // Close other open answers
                document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
                    if (otherAnswer !== answer && otherAnswer.classList.contains('active')) {
                        otherAnswer.classList.remove('active');
                        const otherIcon = otherAnswer.previousElementSibling.querySelector('i');
                        if (otherIcon) {
                            otherIcon.className = 'fas fa-chevron-down';
                        }
                    }
                });
                
                // Toggle current answer
                answer.classList.toggle('active');
                
                // Rotate icon
                if (icon) {
                    icon.className = answer.classList.contains('active') 
                        ? 'fas fa-chevron-up' 
                        : 'fas fa-chevron-down';
                }
            });
        });
    }

    // Enhanced mobile touch handling
    setupMobileTouchHandling() {
        // Add touch feedback for buttons
        const touchElements = document.querySelectorAll('.btn, .feature-card, .plan-card, .faq-question');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', () => {
                element.style.transform = '';
            });
        });
        
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    // Mobile performance optimizations
    setupMobilePerformance() {
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.documentElement.style.setProperty('--transition', 'none');
        }
        
        // Optimize for mobile devices
        if ('ontouchstart' in window) {
            document.documentElement.classList.add('touch-device');
        }
    }

    // Enhanced error handling for mobile
    handleError(error, context) {
        console.error(`Error in ${context}:`, error);
        
        // Show user-friendly error message on mobile
        if (window.innerWidth <= 768) {
            this.showNotification('An error occurred. Please try refreshing the page.', 'error');
        }
    }

    // Mobile-friendly notifications
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--${type === 'error' ? 'primary-color' : 'secondary-color'});
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            max-width: 90vw;
            width: max-content;
            animation: slideInDown 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Setup smooth scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Setup performance optimizations
    setupPerformanceOptimizations() {
        // Preload critical resources
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'style';
            document.head.appendChild(link);
        });

        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Setup lazy loading
    setupLazyLoading() {
        // This is handled in setupPerformanceOptimizations
    }

    // Setup analytics
    setupAnalytics() {
        // Google Analytics 4 setup
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.epicVPN = new EpicVPN();
});

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: 0.5rem;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    @media (max-width: 480px) {
        .notification {
            left: 1rem;
            right: 1rem;
            transform: none;
            width: auto;
        }
    }
`;

document.head.appendChild(notificationStyles);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EpicVPN;
} 