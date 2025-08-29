// EPIC CASH VPN - Main JavaScript
class EpicVPN {
    constructor() {
        this.currentLanguage = 'ru';
        this.isScrolled = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeLanguage();
        this.setupScrollAnimations();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        this.setupPerformanceOptimizations();
    }

    setupEventListeners() {
        // Language switcher
        document.getElementById('lang-ru')?.addEventListener('click', () => this.setLanguage('ru'));
        document.getElementById('lang-en')?.addEventListener('click', () => this.setLanguage('en'));

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

    // Language Management
    initializeLanguage() {
        const savedLang = localStorage.getItem('epic_vpn_lang') || 'ru';
        this.setLanguage(savedLang);
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('epic_vpn_lang', lang);
        
        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.id === `lang-${lang}`) {
                btn.classList.add('active');
            }
        });

        // Update content
        this.updateContent(lang);
        
        // Update document language
        document.documentElement.lang = lang;
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }

    updateContent(lang) {
        const translations = this.getTranslations();
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else if (el.tagName === 'IMG') {
                    el.alt = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
    }

    getTranslations() {
        return {
            ru: {
                'nav.start': 'Начать бесплатно',
                'nav.main': 'Главная',
                'nav.features': 'Преимущества',
                'nav.pricing': 'Тарифы',
                'nav.contacts': 'Контакты',
                'hero.title': 'Ваша анонимность и свобода в интернете',
                'hero.subtitle': 'Безопасный, быстрый и удобный VPN для полной защиты ваших данных',
                'hero.try': 'Попробовать бесплатно',
                'features.title': 'Преимущества EPIC CASH VPN',
                'features.strong': 'Сильное шифрование',
                'features.strong_desc': '256-битное шифрование защищает ваши данные от взлома и слежки',
                'features.speed': 'Высокая скорость',
                'features.speed_desc': 'Сервера в 94 странах обеспечивают молниеносное подключение',
                'features.global': 'Глобальный доступ',
                'features.global_desc': 'Открывайте сайты и сервисы по всему миру без ограничений',
                'features.anon': 'Анонимность',
                'features.anon_desc': 'Ваши действия в интернете остаются конфиденциальными',
                'pricing.title': 'Тарифные планы',
                'pricing.1m': '1 месяц',
                'pricing.3m': '3 месяца',
                'pricing.6m': '6 месяцев',
                'pricing.1y': '1 год',
                'pricing.per_month': '/мес',
                'pricing.unlim': 'Безлимитный трафик',
                'pricing.instant': 'Мгновенное подключение',
                'pricing.devices5': 'До 5 устройств',
                'pricing.support': 'Поддержка 24/7',
                'pricing.choose': 'Выбрать',
                'pricing.save20': 'Экономия 20%',
                'pricing.all1m': 'Все из тарифа "1 месяц"',
                'pricing.priority': 'Приоритетная поддержка',
                'pricing.more_servers': 'Больше серверов',
                'pricing.moneyback': 'Гарантия возврата',
                'pricing.save40': 'Экономия 40%',
                'pricing.all3m': 'Все из тарифа "3 месяца"',
                'pricing.devices10': 'До 10 устройств',
                'pricing.stats': 'Расширенная статистика',
                'pricing.manager': 'Персональный менеджер',
                'pricing.save60': 'Экономия 60%',
                'pricing.all6m': 'Все из тарифа "6 месяцев"',
                'pricing.dedicated_ip': 'Выделенный IP-адрес',
                'pricing.unlim_devices': 'Безлимитные устройства',
                'pricing.bonus': 'Эксклюзивные бонусы',
                'cta.title': 'Начните защищать свои данные уже сегодня',
                'cta.desc': 'Зарегистрируйтесь и получите 2 недели бесплатного доступа к EPIC CASH VPN для полной анонимности',
                'cta.get': 'Получить бесплатный доступ',
                'footer.company': 'Компания',
                'footer.main': 'Главная',
                'footer.features': 'Преимущества',
                'footer.pricing': 'Тарифы',
                'footer.contacts': 'Контакты',
                'footer.support': 'Поддержка',
                'footer.chat': 'Чат',
                'footer.faq': 'FAQ',
                'footer.refund': 'Политика возврата',
                'footer.reviews': 'Отзывы',
                'footer.resources': 'Ресурсы',
                'footer.about': 'О нас',
                'footer.blog': 'Блог',
                'footer.news': 'Новости',
                'footer.partners': 'Партнеры',
                'footer.email': 'Электронная почта',
                'footer.contactus': 'Связаться с нами',
                'footer.feedback': 'Обратная связь',
                'footer.chat_support': 'Поддержка в чате',
                'footer.copyright': '© 2024 EPIC CASH VPN. Все права защищены. Политика конфиденциальности | Условия | Использование cookie',
                'pricing.price1m': '699₽',
                'pricing.price3m': '559₽',
                'pricing.price6m': '419₽',
                'pricing.price1y': '279₽',
            },
            en: {
                'nav.start': 'Start for Free',
                'nav.main': 'Home',
                'nav.features': 'Benefits',
                'nav.pricing': 'Pricing',
                'nav.contacts': 'Contacts',
                'hero.title': 'Your Privacy and Freedom Online',
                'hero.subtitle': 'A secure, fast, and convenient VPN for total data protection',
                'hero.try': 'Try for Free',
                'features.title': 'EPIC CASH VPN Benefits',
                'features.strong': 'Strong Encryption',
                'features.strong_desc': '256-bit encryption protects your data from hacking and surveillance',
                'features.speed': 'High Speed',
                'features.speed_desc': 'Servers in 94 countries ensure lightning-fast connection',
                'features.global': 'Global Access',
                'features.global_desc': 'Access websites and services worldwide without restrictions',
                'features.anon': 'Anonymity',
                'features.anon_desc': 'Your online activity remains confidential',
                'pricing.title': 'Pricing Plans',
                'pricing.1m': '1 Month',
                'pricing.3m': '3 Months',
                'pricing.6m': '6 Months',
                'pricing.1y': '1 Year',
                'pricing.per_month': '/mo',
                'pricing.unlim': 'Unlimited traffic',
                'pricing.instant': 'Instant connection',
                'pricing.devices5': 'Up to 5 devices',
                'pricing.support': '24/7 support',
                'pricing.choose': 'Choose',
                'pricing.save20': 'Save 20%',
                'pricing.all1m': 'All from "1 Month" plan',
                'pricing.priority': 'Priority support',
                'pricing.more_servers': 'More servers',
                'pricing.moneyback': 'Money-back guarantee',
                'pricing.save40': 'Save 40%',
                'pricing.all3m': 'All from "3 Months" plan',
                'pricing.devices10': 'Up to 10 devices',
                'pricing.stats': 'Advanced statistics',
                'pricing.manager': 'Personal manager',
                'pricing.save60': 'Save 60%',
                'pricing.all6m': 'All from "6 Months" plan',
                'pricing.dedicated_ip': 'Dedicated IP address',
                'pricing.unlim_devices': 'Unlimited devices',
                'pricing.bonus': 'Exclusive bonuses',
                'cta.title': 'Start protecting your data today',
                'cta.desc': 'Sign up and get 2 weeks of free access to EPIC CASH VPN for complete anonymity',
                'cta.get': 'Get Free Access',
                'footer.company': 'Company',
                'footer.main': 'Home',
                'footer.features': 'Benefits',
                'footer.pricing': 'Pricing',
                'footer.contacts': 'Contacts',
                'footer.support': 'Support',
                'footer.chat': 'Chat',
                'footer.faq': 'FAQ',
                'footer.refund': 'Refund Policy',
                'footer.reviews': 'Reviews',
                'footer.resources': 'Resources',
                'footer.about': 'About Us',
                'footer.blog': 'Blog',
                'footer.news': 'News',
                'footer.partners': 'Partners',
                'footer.email': 'Email',
                'footer.contactus': 'Contact Us',
                'footer.feedback': 'Feedback',
                'footer.chat_support': 'Chat Support',
                'footer.copyright': '© 2024 EPIC CASH VPN. All rights reserved. Privacy Policy | Terms | Cookie Usage',
                'pricing.price1m': '$9.99',
                'pricing.price3m': '$7.99',
                'pricing.price6m': '$5.99',
                'pricing.price1y': '$3.99',
            }
        };
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
        const mobileMenuToggle = document.createElement('button');
        mobileMenuToggle.className = 'mobile-menu-toggle';
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuToggle.style.display = 'none';
        
        const navContent = document.querySelector('.nav-content');
        if (navContent) {
            navContent.appendChild(mobileMenuToggle);
        }

        // Show mobile menu on small screens
        this.handleResize();
        
        mobileMenuToggle.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('mobile-open');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    handleResize() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (window.innerWidth <= 768) {
            mobileMenuToggle.style.display = 'block';
            navLinks.classList.add('mobile-hidden');
        } else {
            mobileMenuToggle.style.display = 'none';
            navLinks.classList.remove('mobile-hidden', 'mobile-open');
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

    // Error Handling
    handleError(error, context) {
        console.error(`Error in ${context}:`, error);
        
        // Send error to analytics
        this.sendAnalytics('error', error.message, context);
        
        // Show user-friendly error message
        this.showNotification('Произошла ошибка. Попробуйте обновить страницу.', 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.epicVPN = new EpicVPN();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EpicVPN;
} 