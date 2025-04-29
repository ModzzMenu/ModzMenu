/**
 * Funkcja inicjalizująca
 */
document.addEventListener('DOMContentLoaded', function() {
    // Inicjalizacja tooltipów
    initTooltips();
    
    // Inicjalizacja animowanych liczników
    initCounters();
    
    // Obsługa ciasteczek
    initCookieConsent();
    
    // Detekcja systemu operacyjnego
    detectOS();
    
    // Smooth scroll dla anchorów
    initSmoothScroll();
    
    // Inicjalizacja progress baru
    initProgressBar();
    
    // Inicjalizacja efektu gwiazd
    createStars();
    
    // Inicjalizacja menu mobilnego
    initMobileMenu();
    
    // Inicjalizacja filmów YouTube
    initYouTubeEmbeds();
    
    // Inicjalizacja FAQ
    initFAQ();
    
    // Inicjalizacja karuzeli opinii
    initTestimonials();
});

/**
 * Tooltipy dla elementów z atrybutem data-tooltip
 */
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        const tooltipText = el.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'hidden absolute z-50 bg-gray-800 text-white text-sm px-3 py-1 rounded whitespace-nowrap';
        tooltip.textContent = tooltipText;
        el.appendChild(tooltip);
        
        el.addEventListener('mouseenter', () => {
            tooltip.classList.remove('hidden');
            positionTooltip(el, tooltip);
        });
        
        el.addEventListener('mouseleave', () => {
            tooltip.classList.add('hidden');
        });
    });
    
    function positionTooltip(el, tooltip) {
        const rect = el.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    }
}

/**
 * Animowane liczniki dla elementów z klasą .counter
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = +counter.getAttribute('data-duration') || 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        // Uruchom po pojawieniu się w viewport
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        
        observer.observe(counter);
    });
}

/**
 * Powiadomienie o ciasteczkach
 */
function initCookieConsent() {
    if (!localStorage.getItem('cookiesAccepted')) {
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex flex-col md:flex-row items-center justify-between z-50';
        cookieBanner.innerHTML = `
            <p class="mb-2 md:mb-0">Ta strona używa ciasteczek dla lepszego działania. Klikając "Akceptuj", zgadzasz się na ich użycie.</p>
            <button id="acceptCookies" class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">Akceptuj</button>
        `;
        document.body.appendChild(cookieBanner);
        
        document.getElementById('acceptCookies').addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.remove();
        });
    }
}

/**
 * Detekcja systemu operacyjnego
 */
function detectOS() {
    const userAgent = navigator.userAgent;
    let os = 'unknown';
    
    if (userAgent.includes('Windows')) os = 'windows';
    if (userAgent.includes('Mac')) os = 'macos';
    if (userAgent.includes('Linux')) os = 'linux';
    
    document.documentElement.setAttribute('data-os', os);
}

/**
 * Płynne przewijanie do anchorów
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 20,
                    behavior: 'smooth'
                });
                
                // Zamknij menu mobilne po kliknięciu
                if (window.innerWidth <= 768) {
                    document.querySelector('nav').classList.add('hidden');
                    document.querySelector('nav').classList.remove('active');
                }
            }
        });
    });
}

/**
 * Funkcja do kopiowania do schowka
 */
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = element.textContent;
        element.textContent = 'Skopiowano!';
        setTimeout(() => {
            element.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Błąd kopiowania: ', err);
    });
}

/**
 * Progress bar podczas przewijania
 */
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollProgress + '%';
        });
    }
}

/**
 * Efekt gwiazd w tle
 */
function createStars() {
    const bg = document.getElementById('bg');
    if (bg) {
        const starsCount = 100;
        
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Losowe pozycje i rozmiary
            const size = Math.random() * 3;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = 5 + Math.random() * 10 + 's';
            const delay = Math.random() * 5 + 's';
            const opacity = 0.2 + Math.random() * 0.8;
            
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.animationDuration = duration;
            star.style.animationDelay = delay;
            star.style.setProperty('--duration', duration);
            star.style.setProperty('--opacity', opacity);
            
            bg.appendChild(star);
        }
    }
}

/**
 * Menu mobilne
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('hidden');
            nav.classList.toggle('active');
        });
    }
}

/**
 * Inicjalizacja filmów YouTube
 */
function initYouTubeEmbeds() {
    // Inicjalizacja miniatur YouTube
    document.querySelectorAll('.youtube-embed').forEach(embed => {
        const videoId = embed.getAttribute('data-id');
        embed.innerHTML = `
            <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" 
                 alt="${embed.getAttribute('data-title')}" 
                 class="w-full h-full object-cover">
        `;
    });

    // Obsługa modala
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalTitle = document.getElementById('modalTitle');
    const closeModal = document.getElementById('closeModal');

    if (videoModal && modalVideo && modalTitle && closeModal) {
        document.querySelectorAll('.play-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const container = e.currentTarget.closest('.video-container');
                const videoId = container.querySelector('.youtube-embed').getAttribute('data-id');
                const title = container.querySelector('.youtube-embed').getAttribute('data-title');
                
                modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                modalTitle.textContent = title;
                videoModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
        });

        closeModal.addEventListener('click', () => {
            modalVideo.src = '';
            videoModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                modalVideo.src = '';
                videoModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

/**
 * Inicjalizacja FAQ
 */
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Zamknij wszystkie inne odpowiedzi
            document.querySelectorAll('.faq-answer').forEach(item => {
                if (item !== answer) {
                    item.style.maxHeight = null;
                    item.previousElementSibling.querySelector('i').classList.remove('fa-chevron-up');
                    item.previousElementSibling.querySelector('i').classList.add('fa-chevron-down');
                }
            });
            
            // Przełącz aktualną odpowiedź
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });
}

/**
 * Inicjalizacja karuzeli opinii
 */
function initTestimonials() {
    const track = document.querySelector('.testimonials-track');
    if (track) {
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    }
}

// Dodatkowe funkcje utility
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Kliknięcie w logo przewija do góry
document.getElementById('logo')?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Efekt hover na podglądzie menu
const menuPreview = document.getElementById('menuPreview');
if (menuPreview) {
    menuPreview.addEventListener('mouseenter', () => {
        menuPreview.style.transform = 'scale(1.05) translateY(-5px)';
    });
    
    menuPreview.addEventListener('mouseleave', () => {
        menuPreview.style.transform = 'scale(1) translateY(0)';
    });
}