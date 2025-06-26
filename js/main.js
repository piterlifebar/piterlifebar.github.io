// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainMenu = document.querySelector('.main-menu');
const reserveButtons = document.querySelectorAll('.reserve-btn');
const modalOverlay = document.getElementById('modal-overlay');
const closeModal = document.querySelector('.close-modal');
const phoneInputs = document.querySelectorAll('input[type="tel"]');

// Mobile Menu Toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mainMenu.classList.toggle('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        
        if (mainMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Modal Functionality
reserveButtons.forEach(button => {
    if (!button.closest('form')) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
});

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close modal when clicking outside
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Phone number formatting
phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '');
    });
});

// Form submission handling
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form validation
        const phoneInput = form.querySelector('input[type="tel"]');
        const selectInput = form.querySelector('select');
        
        let isValid = true;
        
        if (selectInput.value === "") {
            selectInput.style.borderColor = 'red';
            isValid = false;
        } else {
            selectInput.style.borderColor = '#333';
        }
        
        if (phoneInput.value.replace(/\D/g, '').length < 10) {
            phoneInput.style.borderColor = 'red';
            isValid = false;
        } else {
            phoneInput.style.borderColor = '#333';
        }
        
        if (isValid) {
            // In a real application, this would send data to the server
            // For now, just show a success message and reset the form
            alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
            form.reset();
            
            // Close modal if form is in modal
            if (form.closest('.modal-content')) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Lazy load images for better performance
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
});

// Animation for elements when they come into view
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.event-card, .bar-card, .special-card');
    
    if ('IntersectionObserver' in window) {
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    elementObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => elementObserver.observe(element));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('animated');
        });
    }
});


setInterval(() => {
    const items = document.querySelectorAll('.main-menu li a');
    const index = Math.floor(Math.random() * items.length);
    items.forEach((el, i) => el.classList.toggle('active', i === index));
}, 3000);
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const mainMenuEl = document.querySelector('.main-menu');

if (mobileToggle && mainMenuEl) {
    mobileToggle.addEventListener('click', () => {
        mainMenuEl.classList.toggle('active');
        mobileToggle.classList.toggle('open');
    });
}
