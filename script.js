document.addEventListener('DOMContentLoaded', function() {
    // Navbar functionality
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Add scroll event listener for navbar
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Change navbar background on scroll
        if (scrollPosition > 10) {
            navbar.classList.remove('bg-transparent');
            navbar.classList.add('bg-blue-900', 'shadow-md');
        } else {
            navbar.classList.remove('bg-blue-900', 'shadow-md');
            navbar.classList.add('bg-transparent');
        }
        
        // Highlight current section in navbar
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-blue-300', 'font-bold');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-blue-300', 'font-bold');
                    }
                });
            }
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu.classList.contains('block')) {
                mobileMenu.classList.replace('block', 'hidden');
            }
        });
    });
    
    // Mobile menu toggle
    const menuButton = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuButton.addEventListener('click', function() {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.replace('hidden', 'block');
        } else {
            mobileMenu.classList.replace('block', 'hidden');
        }
    });
    
    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    const slideRightElements = document.querySelectorAll('.slide-in-right');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        function checkElement(element, className) {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('appear');
            }
        }
        
        fadeElements.forEach(element => checkElement(element, 'fade-in'));
        slideLeftElements.forEach(element => checkElement(element, 'slide-in-left'));
        slideRightElements.forEach(element => checkElement(element, 'slide-in-right'));
    }
    
    window.addEventListener('scroll', checkScroll);
    
    // Initial check for elements in viewport
    checkScroll();
    
    // Gallery slider functionality
    const galleryContainer = document.getElementById('gallery-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.querySelectorAll('.gallery-indicator');
    let currentIndex = 0;
    const totalSlides = 5; // Update this if you add more slides
    
    // Function to update the gallery position
    function updateGallery() {
        galleryContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.remove('bg-gray-300');
                indicator.classList.add('bg-blue-300');
            } else {
                indicator.classList.remove('bg-blue-300');
                indicator.classList.add('bg-gray-300');
            }
        });
    }
    
    // Add click event for next button
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateGallery();
    });
    
    // Add click event for previous button
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateGallery();
    });
    
    // Add click events for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateGallery();
        });
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateGallery();
    }, 5000);
});