/* ===================================
   AL-SAFWA TRAVEL - JAVASCRIPT
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initScrollAnimations();
    initSmoothScroll();
    initFormValidation();
    initModal();
    initTestimonialsCarousel();
    initGalleryLightbox();
    initFloatingButtons();
});

/* ===================================
   NAVIGATION
   =================================== */
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

/* ===================================
   SCROLL EFFECTS
   =================================== */
function initScrollEffects() {
    const header = document.getElementById('header');

    function onScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Check initial state
}

/* ===================================
   SCROLL ANIMATIONS (Custom AOS)
   =================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    function checkElements() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                // Apply delay if specified
                const delay = element.getAttribute('data-aos-delay');
                if (delay) {
                    setTimeout(() => {
                        element.classList.add('aos-animate');
                    }, parseInt(delay));
                } else {
                    element.classList.add('aos-animate');
                }
            }
        });
    }

    // Check on scroll
    window.addEventListener('scroll', checkElements);

    // Check on load
    checkElements();

    // Recheck after a short delay (for images loading)
    setTimeout(checkElements, 200);
}

/* ===================================
   SMOOTH SCROLL
   =================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===================================
   FORM VALIDATION
   =================================== */
function initFormValidation() {
    const form = document.getElementById('registerForm');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const packageSelect = document.getElementById('package').value;
        const departure = document.getElementById('departure').value;

        // Validation
        let isValid = true;
        let errorMessage = '';

        if (!name) {
            isValid = false;
            errorMessage = 'Nama lengkap harus diisi';
        } else if (!isValidEmail(email)) {
            isValid = false;
            errorMessage = 'Email tidak valid';
        } else if (!isValidPhone(phone)) {
            isValid = false;
            errorMessage = 'Nomor WhatsApp tidak valid';
        } else if (!packageSelect) {
            isValid = false;
            errorMessage = 'Silakan pilih paket umroh';
        } else if (!departure) {
            isValid = false;
            errorMessage = 'Silakan pilih bulan keberangkatan';
        }

        if (!isValid) {
            showError(errorMessage);
            return;
        }

        // Show success modal
        const modal = document.getElementById('successModal');
        modal.classList.add('active');

        // Reset form
        form.reset();
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[0-9+]{10,14}$/;
    return re.test(phone.replace(/\s/g, ''));
}

function showError(message) {
    // Create error toast
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.innerHTML = `
        <span class="toast-icon">⚠️</span>
        <span class="toast-message">${message}</span>
    `;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #ef4444;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 10px 40px rgba(239, 68, 68, 0.3);
        z-index: 3000;
        animation: slideUp 0.3s ease;
    `;

    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add toast animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
    }
`;
document.head.appendChild(style);

/* ===================================
   MODAL
   =================================== */
function initModal() {
    const modal = document.getElementById('successModal');
    const closeBtn = document.getElementById('closeModal');

    if (!modal || !closeBtn) return;

    // Close modal on button click
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

/* ===================================
   PARALLAX EFFECT (Optional)
   =================================== */
function initParallax() {
    const hero = document.querySelector('.hero');

    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}

// Uncomment to enable parallax
// initParallax();

/* ===================================
   COUNTER ANIMATION
   =================================== */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

// Initialize counters when they come into view
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function checkCounters() {
        if (hasAnimated) return;

        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            hasAnimated = true;
            counters.forEach(counter => {
                const text = counter.textContent;
                const target = parseFloat(text.replace(/[^0-9.]/g, ''));
                const suffix = text.replace(/[0-9.]/g, '');

                animateCounter(counter, target, 1500);

                // Add suffix back after animation
                setTimeout(() => {
                    counter.textContent = target + suffix;
                }, 1600);
            });
        }
    }

    window.addEventListener('scroll', checkCounters);
    checkCounters();
}

// Initialize counters
document.addEventListener('DOMContentLoaded', initCounters);

/* ===================================
   TESTIMONIALS CAROUSEL
   =================================== */
function initTestimonialsCarousel() {
    const carousel = document.getElementById('testimonialsCarousel');
    if (!carousel) return;

    const track = carousel.querySelector('.testimonials-track');
    const slides = Array.from(track.querySelectorAll('[data-slide]'));
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    let current = 0;
    let autoPlay = null;

    // initialize slides
    function render() {
        slides.forEach((s, i) => {
            s.style.display = i === current ? 'block' : 'none';
            s.setAttribute('aria-hidden', i === current ? 'false' : 'true');
        });
        updateDots();
    }

    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        slides.forEach((_, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = i === current ? 'active' : '';
            btn.setAttribute('aria-label', 'Slide ' + (i + 1));
            btn.addEventListener('click', () => {
                current = i;
                render();
                resetAuto();
            });
            dotsContainer.appendChild(btn);
        });
    }

    function prev() {
        current = (current - 1 + slides.length) % slides.length;
        render();
        resetAuto();
    }

    function next() {
        current = (current + 1) % slides.length;
        render();
    }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAuto(); });

    function startAuto() {
        autoPlay = setInterval(() => { next(); }, 6000);
    }

    function resetAuto() {
        if (autoPlay) clearInterval(autoPlay);
        startAuto();
    }

    render();
    startAuto();
}

/* ===================================
   GALLERY LIGHTBOX
   =================================== */
function initGalleryLightbox() {
    const items = document.querySelectorAll('.gallery-item img');
    if (!items.length) return;

    function open(src, alt) {
        const overlay = document.createElement('div');
        overlay.className = 'gallery-lightbox';
        overlay.innerHTML = `
            <div class="gallery-lightbox-inner">
                <button class="gl-close" aria-label="Tutup">×</button>
                <img src="${src}" alt="${alt || ''}">
                <div class="gl-caption">${alt || ''}</div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Close handlers
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.classList.contains('gl-close')) {
                overlay.remove();
            }
        });
        document.addEventListener('keydown', function onKey(e) {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', onKey);
            }
        });
    }

    items.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => open(img.src, img.alt));
    });
}

/* ===================================
   FLOATING BUTTONS (Back to Top)
   =================================== */
function initFloatingButtons() {
    const back = document.getElementById('backToTop');
    if (!back) return;

    function onScroll() {
        if (window.scrollY > 300) {
            back.style.opacity = '1';
            back.style.pointerEvents = 'auto';
        } else {
            back.style.opacity = '0';
            back.style.pointerEvents = 'none';
        }
    }

    back.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // init state
    back.style.transition = 'opacity 250ms ease';
    back.style.opacity = '0';
    back.style.pointerEvents = 'none';
    window.addEventListener('scroll', onScroll);
    onScroll();
}
