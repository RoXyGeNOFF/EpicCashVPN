// EPIC CASH VPN - Main JavaScript
class EpicVPN {
    constructor() {
        this.currentLanguage = 'en';
        this.isScrolled = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeLanguage();
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
        const savedLang = localStorage.getItem('epic_vpn_lang') || 'en';
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
                'pricing.max_speed': 'Максимальная скорость',
                'pricing.devices5': 'До 5 устройств',
                'pricing.devices10': 'До 10 устройств',
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
                'cta.desc': 'Зарегистрируйтесь и получите 2 недели бесплатного доступа к EPIC VPN для полной анонимности',
                'cta.get': 'Получить бесплатный доступ',
                'epic-cash.title': 'EPIC CASH',
                'epic-cash.desc': 'Конфиденциальная валюта для вашей финансовой свободы.',
                'epic-cash.learn': 'Узнать больше',
                'about-us.title': 'О нас',
                'about-us.desc': 'Мы ценим свободу выбора и действий, финансовую свободу и конфиденциальность личной жизни, поэтому EpicVPN предоставляет вам качественный, надежный, быстрый, удобный и дешевый VPN-сервис с локациями во многих странах мира.',
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
                'footer.copyright': '© 2024 EPIC VPN. Все права защищены. Политика конфиденциальности | Условия | Использование cookie',
                'pricing.price1m': '799₽',
                'pricing.price3m': '639₽',
                'pricing.price6m': '499₽',
                'pricing.price1y': '350₽',
                'pricing.premium': 'Премиум 1 Год',
                'pricing.price_premium': '2900₽',
                'pricing.premium_badge': 'Premium',
                'pricing.dedicated_ip_premium': 'Выделенный IP адрес',
                'pricing.unlim_devices_premium': 'Безлимитные устройства',
                'pricing.priority_support_premium': 'Приоритетная поддержка',
                'pricing.exclusive_locations': 'Эксклюзивные локации по запросу',
                
                // FAQ Page
                'faq.title': 'Часто задаваемые вопросы',
                'faq.subtitle': 'Найдите ответы на популярные вопросы о EPIC CASH VPN',
                'faq.what_vpn': 'Что такое VPN и зачем он нужен?',
                'faq.what_vpn_desc': 'VPN (Virtual Private Network) - это технология, которая создает защищенное соединение между вашим устройством и интернетом. VPN обеспечивает:',
                'faq.what_vpn_list1': 'Анонимность в интернете',
                'faq.what_vpn_list2': 'Защиту от слежки и хакеров',
                'faq.what_vpn_list3': 'Обход географических ограничений',
                'faq.what_vpn_list4': 'Безопасность при использовании публичных Wi-Fi',
                'faq.how_works': 'Как работает EPIC CASH VPN?',
                'faq.how_works_desc': 'EPIC CASH VPN работает следующим образом:',
                'faq.how_works_list1': 'Ваш трафик шифруется на устройстве',
                'faq.how_works_list2': 'Зашифрованные данные отправляются на наши сервера',
                'faq.how_works_list3': 'Сервер расшифровывает данные и отправляет их в интернет',
                'faq.how_works_list4': 'Ответы возвращаются через тот же защищенный канал',
                'faq.devices': 'На каких устройствах работает VPN?',
                'faq.devices_desc': 'EPIC CASH VPN поддерживает все популярные платформы:',
                'faq.devices_list1': 'Windows 10/11',
                'faq.devices_list2': 'macOS',
                'faq.devices_list3': 'Linux',
                'faq.devices_list4': 'Android',
                'faq.devices_list5': 'iOS',
                'faq.simultaneous': 'Сколько устройств можно подключить одновременно?',
                'faq.simultaneous_desc': 'Количество устройств зависит от выбранного тарифа:',
                'faq.simultaneous_list1': '1 месяц: до 5 устройств',
                'faq.simultaneous_list2': '3 месяца: до 5 устройств',
                'faq.simultaneous_list3': '6 месяцев: до 10 устройств',
                'faq.simultaneous_list4': '1 год: безлимитные устройства',
                'faq.speed': 'Влияет ли VPN на скорость интернета?',
                'faq.speed_desc': 'EPIC CASH VPN оптимизирован для минимального влияния на скорость:',
                'faq.speed_list1': 'Сервера в 94 странах для быстрого подключения',
                'faq.speed_list2': 'Современные протоколы шифрования',
                'faq.speed_list3': 'Оптимизированная инфраструктура',
                'faq.speed_list4': 'В среднем снижение скорости составляет менее 10%',
                'faq.security': 'Безопасны ли ваши сервера?',
                'faq.security_desc': 'Да, безопасность - наш приоритет:',
                'faq.security_list1': '256-битное AES шифрование',
                'faq.security_list2': 'Сервера в странах с сильными законами о конфиденциальности',
                'faq.security_list3': 'Отсутствие логирования пользовательской активности',
                'faq.security_list4': 'Регулярные аудиты безопасности',
                'faq.security_list5': 'Защита от утечек DNS и WebRTC',
                'faq.torrents': 'Можно ли использовать VPN для торрентов?',
                'faq.torrents_desc': 'Да, EPIC CASH VPN поддерживает P2P трафик:',
                'faq.torrents_list1': 'Специальные сервера для торрентов',
                'faq.torrents_list2': 'Безлимитный трафик',
                'faq.torrents_list3': 'Высокая скорость для загрузки',
                'faq.torrents_list4': 'Анонимность при использовании',
                'faq.torrents_important': 'Важно: Используйте только легальный контент.',
                'faq.connection': 'Что делать, если VPN не подключается?',
                'faq.connection_desc': 'Попробуйте следующие шаги:',
                'faq.connection_list1': 'Перезапустите приложение VPN',
                'faq.connection_list2': 'Проверьте интернет-соединение',
                'faq.connection_list3': 'Попробуйте другой сервер',
                'faq.connection_list4': 'Очистите кэш браузера',
                'faq.connection_list5': 'Обратитесь в поддержку',
                'faq.trial': 'Есть ли пробный период?',
                'faq.trial_desc': 'Да! Мы предлагаем:',
                'faq.trial_list1': '2 недели бесплатного доступа при регистрации',
                'faq.trial_list2': 'Полный функционал без ограничений',
                'faq.trial_list3': 'Возможность протестировать все сервера',
                'faq.trial_list4': 'Поддержку 24/7',
                'faq.trial_start': 'Начните прямо сейчас:',
                'faq.payment': 'Как происходит оплата?',
                'faq.payment_desc': 'Мы принимаем различные способы оплаты:',
                'faq.payment_list1': 'Криптовалюты (Bitcoin, Ethereum, USDT)',
                'faq.payment_list2': 'Банковские карты',
                'faq.payment_list3': 'Электронные кошельки',
                'faq.payment_list4': 'Мобильные платежи',
                'faq.payment_secure': 'Все платежи защищены и анонимны.',
                'faq.refund': 'Можно ли получить возврат средств?',
                'faq.refund_desc': 'Да, у нас есть политика возврата:',
                'faq.refund_list1': '30 дней гарантии возврата для всех тарифов',
                'faq.refund_list2': 'Без вопросов и условий',
                'faq.refund_list3': 'Полный возврат средств',
                'faq.refund_list4': 'Быстрое рассмотрение заявок',
                'faq.support': 'Как связаться с поддержкой?',
                'faq.support_desc': 'Наша поддержка доступна 24/7:',
                'faq.support_list1': 'Telegram:',
                'faq.support_list2': 'Email: support@epiccashvpn.com',
                'faq.support_list3': 'Чат на сайте: доступен в правом нижнем углу',
                'faq.support_list4': 'FAQ: эта страница',
                'faq.support_time': 'Среднее время ответа: менее 5 минут',
                'faq.cta_title': 'Не нашли ответ на свой вопрос?',
                'faq.cta_desc': 'Наша команда поддержки готова помочь вам 24/7',
                'faq.cta_support': 'Написать в поддержку',
                'faq.cta_home': 'Вернуться на главную',
                
                // About Page
                'about.title': 'О EPIC CASH VPN',
                'about.subtitle': 'Мы создаем безопасное и анонимное будущее интернета',
                'about.mission_title': 'Наша миссия',
                'about.mission_desc1': 'EPIC CASH VPN был создан с простой, но важной миссией - обеспечить каждому человеку право на приватность и свободу в цифровом мире.',
                'about.mission_desc2': 'В эпоху массовой слежки, цензуры и киберугроз мы предоставляем надежный щит для защиты ваших данных и обеспечения анонимности в интернете.',
                'about.values_title': 'Наши ценности',
                'about.privacy_title': 'Приватность',
                'about.privacy_desc': 'Мы верим, что каждый человек имеет право на приватность. Ваши данные принадлежат только вам.',
                'about.security_title': 'Безопасность',
                'about.security_desc': 'Используем передовые технологии шифрования для защиты вашей информации от любых угроз.',
                'about.freedom_title': 'Свобода',
                'about.freedom_desc': 'Интернет должен быть свободным и доступным для всех, без географических ограничений.',
                'about.trust_title': 'Доверие',
                'about.trust_desc': 'Строим долгосрочные отношения с клиентами, основанные на прозрачности и надежности.',
                'about.story_title': 'Наша история',
                'about.story_desc1': 'EPIC CASH VPN начался как небольшой проект группы энтузиастов, обеспокоенных растущими угрозами цифровой приватности.',
                'about.story_desc2': 'За прошедшие годы мы выросли в надежный VPN сервис, которому доверяют пользователи по всему миру. Наша команда постоянно работает над улучшением технологий и расширением возможностей.',
                'about.story_desc3': 'Сегодня мы гордимся тем, что помогаем людям защищать свою приватность и получать доступ к свободному интернету.',
                'about.team_title': 'Наша команда',
                'about.team_desc': 'Опытные специалисты в области кибербезопасности и сетевых технологий',
                'about.ceo_name': 'Алексей Петров',
                'about.ceo_role': 'CEO & Основатель',
                'about.ceo_bio': '10+ лет опыта в кибербезопасности. Специалист по сетевым протоколам и криптографии.',
                'about.cto_name': 'Мария Сидорова',
                'about.cto_role': 'CTO',
                'about.cto_bio': 'Эксперт по инфраструктуре и масштабированию. Отвечает за техническую архитектуру.',
                'about.security_name': 'Дмитрий Козлов',
                'about.security_role': 'Head of Security',
                'about.security_bio': 'Специалист по информационной безопасности. Проводит регулярные аудиты безопасности.',
                'about.support_name': 'Анна Волкова',
                'about.support_role': 'Head of Support',
                'about.support_bio': 'Обеспечивает качественную поддержку клиентов 24/7. Эксперт по VPN технологиям.',
                'about.stats_countries': 'Страны',
                'about.stats_users': 'Пользователей',
                'about.stats_uptime': 'Время работы',
                'about.stats_support': 'Поддержка',
                'about.cta_title': 'Присоединяйтесь к нам',
                'about.cta_desc': 'Станьте частью сообщества, которое ценит приватность и свободу в интернете',
                'about.cta_start': 'Начать бесплатно',
                'about.cta_home': 'Вернуться на главную',
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
                'pricing.max_speed': 'Maximum speed',
                'pricing.devices5': 'Up to 5 devices',
                'pricing.devices10': 'Up to 10 devices',
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
                'cta.desc': 'Sign up and get 2 weeks of free access to EPIC VPN for complete anonymity',
                'cta.get': 'Get Free Access',
                'epic-cash.title': 'EPIC CASH',
                'epic-cash.desc': 'Confidential currency for your financial freedom.',
                'epic-cash.learn': 'Learn More',
                'about-us.title': 'About Us',
                'about-us.desc': 'We value freedom of choice and action, financial freedom and privacy of personal life, so EpicVPN provides you with a high-quality, reliable, fast, convenient and cheap VPN service with locations in many countries around the world.',
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
                'footer.copyright': '© 2024 EPIC VPN. All rights reserved. Privacy Policy | Terms | Cookie Usage',
                'pricing.price1m': '$7.99',
                'pricing.price3m': '$6.4',
                'pricing.price6m': '$4.99',
                'pricing.price1y': '$3.5',
                'pricing.premium': 'Premium 1 Year',
                'pricing.price_premium': '$29',
                'pricing.premium_badge': 'Premium',
                'pricing.dedicated_ip_premium': 'Dedicated IP address',
                'pricing.unlim_devices_premium': 'Unlimited devices',
                'pricing.priority_support_premium': 'Priority support',
                'pricing.exclusive_locations': 'Exclusive locations on request',
                
                // FAQ Page
                'faq.title': 'Frequently Asked Questions',
                'faq.subtitle': 'Find answers to popular questions about EPIC CASH VPN',
                'faq.what_vpn': 'What is VPN and why do you need it?',
                'faq.what_vpn_desc': 'VPN (Virtual Private Network) is a technology that creates a secure connection between your device and the internet. VPN provides:',
                'faq.what_vpn_list1': 'Online anonymity',
                'faq.what_vpn_list2': 'Protection from surveillance and hackers',
                'faq.what_vpn_list3': 'Bypass geographic restrictions',
                'faq.what_vpn_list4': 'Security when using public Wi-Fi',
                'faq.how_works': 'How does EPIC CASH VPN work?',
                'faq.how_works_desc': 'EPIC CASH VPN works as follows:',
                'faq.how_works_list1': 'Your traffic is encrypted on the device',
                'faq.how_works_list2': 'Encrypted data is sent to our servers',
                'faq.how_works_list3': 'Server decrypts data and sends it to the internet',
                'faq.how_works_list4': 'Responses return through the same secure channel',
                'faq.devices': 'On which devices does VPN work?',
                'faq.devices_desc': 'EPIC CASH VPN supports all popular platforms:',
                'faq.devices_list1': 'Windows 10/11',
                'faq.devices_list2': 'macOS',
                'faq.devices_list3': 'Linux',
                'faq.devices_list4': 'Android',
                'faq.devices_list5': 'iOS',
                'faq.simultaneous': 'How many devices can be connected simultaneously?',
                'faq.simultaneous_desc': 'The number of devices depends on the selected plan:',
                'faq.simultaneous_list1': '1 month: up to 5 devices',
                'faq.simultaneous_list2': '3 months: up to 5 devices',
                'faq.simultaneous_list3': '6 months: up to 10 devices',
                'faq.simultaneous_list4': '1 year: unlimited devices',
                'faq.speed': 'Does VPN affect internet speed?',
                'faq.speed_desc': 'EPIC CASH VPN is optimized for minimal impact on speed:',
                'faq.speed_list1': 'Servers in 94 countries for fast connection',
                'faq.speed_list2': 'Modern encryption protocols',
                'faq.speed_list3': 'Optimized infrastructure',
                'faq.speed_list4': 'Average speed reduction is less than 10%',
                'faq.security': 'Are your servers secure?',
                'faq.security_desc': 'Yes, security is our priority:',
                'faq.security_list1': '256-bit AES encryption',
                'faq.security_list2': 'Servers in countries with strong privacy laws',
                'faq.security_list3': 'No logging of user activity',
                'faq.security_list4': 'Regular security audits',
                'faq.security_list5': 'Protection from DNS and WebRTC leaks',
                'faq.torrents': 'Can VPN be used for torrents?',
                'faq.torrents_desc': 'Yes, EPIC CASH VPN supports P2P traffic:',
                'faq.torrents_list1': 'Special servers for torrents',
                'faq.torrents_list2': 'Unlimited traffic',
                'faq.torrents_list3': 'High speed for downloading',
                'faq.torrents_list4': 'Anonymity when using',
                'faq.torrents_important': 'Important: Use only legal content.',
                'faq.connection': 'What to do if VPN doesn\'t connect?',
                'faq.connection_desc': 'Try the following steps:',
                'faq.connection_list1': 'Restart VPN application',
                'faq.connection_list2': 'Check internet connection',
                'faq.connection_list3': 'Try another server',
                'faq.connection_list4': 'Clear browser cache',
                'faq.connection_list5': 'Contact support',
                'faq.trial': 'Is there a trial period?',
                'faq.trial_desc': 'Yes! We offer:',
                'faq.trial_list1': '2 weeks of free access when registering',
                'faq.trial_list2': 'Full functionality without restrictions',
                'faq.trial_list3': 'Ability to test all servers',
                'faq.trial_list4': '24/7 support',
                'faq.trial_start': 'Start right now:',
                'faq.payment': 'How does payment work?',
                'faq.payment_desc': 'We accept various payment methods:',
                'faq.payment_list1': 'Cryptocurrencies (Bitcoin, Ethereum, USDT)',
                'faq.payment_list2': 'Bank cards',
                'faq.payment_list3': 'Electronic wallets',
                'faq.payment_list4': 'Mobile payments',
                'faq.payment_secure': 'All payments are secure and anonymous.',
                'faq.refund': 'Can I get a refund?',
                'faq.refund_desc': 'Yes, we have a refund policy:',
                'faq.refund_list1': '30-day refund guarantee for all plans',
                'faq.refund_list2': 'No questions or conditions',
                'faq.refund_list3': 'Full refund',
                'faq.refund_list4': 'Fast application processing',
                'faq.support': 'How to contact support?',
                'faq.support_desc': 'Our support is available 24/7:',
                'faq.support_list1': 'Telegram:',
                'faq.support_list2': 'Email: support@epiccashvpn.com',
                'faq.support_list3': 'Chat on website: available in bottom right corner',
                'faq.support_list4': 'FAQ: this page',
                'faq.support_time': 'Average response time: less than 5 minutes',
                'faq.cta_title': 'Didn\'t find an answer to your question?',
                'faq.cta_desc': 'Our support team is ready to help you 24/7',
                'faq.cta_support': 'Write to support',
                'faq.cta_home': 'Return to home',
                
                // About Page
                'about.title': 'About EPIC CASH VPN',
                'about.subtitle': 'We create a secure and anonymous future of the internet',
                'about.mission_title': 'Our Mission',
                'about.mission_desc1': 'EPIC CASH VPN was created with a simple but important mission - to ensure every person\'s right to privacy and freedom in the digital world.',
                'about.mission_desc2': 'In an era of mass surveillance, censorship, and cyber threats, we provide a reliable shield to protect your data and ensure anonymity on the internet.',
                'about.values_title': 'Our Values',
                'about.privacy_title': 'Privacy',
                'about.privacy_desc': 'We believe that every person has the right to privacy. Your data belongs only to you.',
                'about.security_title': 'Security',
                'about.security_desc': 'We use advanced encryption technologies to protect your information from any threats.',
                'about.freedom_title': 'Freedom',
                'about.freedom_desc': 'The internet should be free and accessible to everyone, without geographic restrictions.',
                'about.trust_title': 'Trust',
                'about.trust_desc': 'We build long-term relationships with clients based on transparency and reliability.',
                'about.story_title': 'Our Story',
                'about.story_desc1': 'EPIC CASH VPN started as a small project by a group of enthusiasts concerned about growing digital privacy threats.',
                'about.story_desc2': 'Over the years, we have grown into a reliable VPN service trusted by users worldwide. Our team constantly works to improve technologies and expand capabilities.',
                'about.story_desc3': 'Today we are proud to help people protect their privacy and access the free internet.',
                'about.team_title': 'Our Team',
                'about.team_desc': 'Experienced specialists in cybersecurity and network technologies',
                'about.ceo_name': 'Alexey Petrov',
                'about.ceo_role': 'CEO & Founder',
                'about.ceo_bio': '10+ years of experience in cybersecurity. Specialist in network protocols and cryptography.',
                'about.cto_name': 'Maria Sidorova',
                'about.cto_role': 'CTO',
                'about.cto_bio': 'Infrastructure and scaling expert. Responsible for technical architecture.',
                'about.security_name': 'Dmitry Kozlov',
                'about.security_role': 'Head of Security',
                'about.security_bio': 'Information security specialist. Conducts regular security audits.',
                'about.support_name': 'Anna Volkova',
                'about.support_role': 'Head of Support',
                'about.support_bio': 'Provides quality client support 24/7. Expert in VPN technologies.',
                'about.stats_countries': 'Countries',
                'about.stats_users': 'Users',
                'about.stats_uptime': 'Uptime',
                'about.stats_support': 'Support',
                'about.cta_title': 'Join Us',
                'about.cta_desc': 'Become part of a community that values privacy and freedom on the internet',
                'about.cta_start': 'Start for Free',
                'about.cta_home': 'Return to home',
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