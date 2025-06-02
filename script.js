// Nordic Lanka Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuButton.querySelector('i');
    
    mobileMenuButton.addEventListener('click', function() {
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.classList.add('bg-white/95', 'backdrop-blur-sm');
        } else {
            navbar.classList.remove('bg-white/95', 'backdrop-blur-sm');
        }
        
        lastScrollY = currentScrollY;
    });

    // Form submission
    const bookingForm = document.getElementById('booking-form');
    const successToast = document.getElementById('success-toast');
    const errorToast = document.getElementById('error-toast');
    const errorMessage = document.getElementById('error-message');

    // Toast functions
    function showToast(toastElement, duration = 5000) {
        toastElement.classList.remove('hidden', 'translate-x-full');
        toastElement.classList.add('translate-x-0');
        
        setTimeout(() => {
            hideToast(toastElement);
        }, duration);
    }

    function hideToast(toastElement) {
        toastElement.classList.remove('translate-x-0');
        toastElement.classList.add('translate-x-full');
        
        setTimeout(() => {
            toastElement.classList.add('hidden');
        }, 300);
    }

    // Form validation
    function validateForm(formData) {
        const errors = [];
        
        if (!formData.get('name') || formData.get('name').trim().length < 2) {
            errors.push('Please enter a valid name (at least 2 characters)');
        }
        
        if (!formData.get('email') || !isValidEmail(formData.get('email'))) {
            errors.push('Please enter a valid email address');
        }
        
        if (!formData.get('phone') || formData.get('phone').trim().length < 8) {
            errors.push('Please enter a valid phone number');
        }
        
        if (!formData.get('service')) {
            errors.push('Please select a service type');
        }
        
        return errors;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Form submission handler
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            errorMessage.textContent = errors[0];
            showToast(errorToast);
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            bookingForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Show success message
            showToast(successToast);
            
            // Optional: Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 2000);
    });

    // Add click handlers for CTA buttons
    const ctaButtons = document.querySelectorAll('a[href="#booking"], a[href="#contact"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add entrance animations
    function addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                }
            });
        }, observerOptions);

        // Observe sections for animations
        const animatedElements = document.querySelectorAll('section');
        animatedElements.forEach(element => {
            element.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
            observer.observe(element);
        });
    }

    // Initialize animations
    addScrollAnimations();

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.hover\\:shadow-xl');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effect to buttons
    const buttons = document.querySelectorAll('button, a[class*="bg-nordic-teal"]');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Close toasts when clicked
    [successToast, errorToast].forEach(toast => {
        toast.addEventListener('click', function() {
            hideToast(this);
        });
    });

    // Auto-hide toasts after 5 seconds
    document.addEventListener('click', function(e) {
        if (e.target.closest('#success-toast') || e.target.closest('#error-toast')) {
            return;
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
        
        // Close toasts with Escape key
        if (e.key === 'Escape') {
            if (!successToast.classList.contains('hidden')) {
                hideToast(successToast);
            }
            if (!errorToast.classList.contains('hidden')) {
                hideToast(errorToast);
            }
        }
    });

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    // Ensure proper focus indicators
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focus-visible');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focus-visible');
        });
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
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

    // Optimized scroll handler
    //const optimizedScrollHandler = debounce(function() {
        //const currentScrollY = window.scrollY;
        
        //if (currentScrollY > 50) {
       //     navbar.classList.add('bg-white/95', 'backdrop-blur-sm');
        //} else {
        //    navbar.classList.remove('bg-white/95', 'backdrop-blur-sm');
       // }
  //  }, 10);

   // window.addEventListener('scroll', optimizedScrollHandler);

  //  console.log('Nordic Lanka website initialized successfully!');
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .focus-visible {
        outline: 2px solid #0d9488;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);