// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize weather widget
    initWeatherWidget();
    
    // Initialize map
    initMap();
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('.fade-in').forEach((element) => {
        observer.observe(element);
    });
}

// Weather Widget
async function initWeatherWidget() {
    const weatherSection = document.querySelector('.weather-section');
    // Weather API integration will be added here
    // Using Singapore coordinates: 1.3521° N, 103.8198° E
}

// Interactive Map
function initMap() {
    const mapSection = document.querySelector('.map-section');
    // Map integration will be added here (Google Maps or Mapbox)
}

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Performance Optimizations
document.addEventListener('scroll', debounce(handleScroll, 16));

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

function handleScroll() {
    // Scroll-based animations and updates
}
