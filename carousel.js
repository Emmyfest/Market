/**
 * Farm Fresh - Farmers' Marketplace
 * Carousel/Slideshow JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    initCarousel();
});

/**
 * Initialize carousel functionality
 */
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    
    let currentSlide = 0;
    let slideInterval;
    
    // Show first slide
    showSlide(0);
    
    // Start auto-sliding
    startSlideInterval();
    
    // Add event listeners for controls
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            navigate(-1);
            startSlideInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            navigate(1);
            startSlideInterval();
        });
    }
    
    // Add event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            clearInterval(slideInterval);
            showSlide(index);
            startSlideInterval();
        });
    });
    
    // Add touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    // Functions
    function showSlide(index) {
        // Handle index bounds
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Update current slide index
        currentSlide = index;
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        slides[index].classList.add('active');
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }
    
    function navigate(direction) {
        showSlide(currentSlide + direction);
    }
    
    function startSlideInterval() {
        // Auto-advance every 5 seconds
        slideInterval = setInterval(() => {
            navigate(1);
        }, 5000);
    }
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum pixels required for a swipe
        
        if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right (prev)
            clearInterval(slideInterval);
            navigate(-1);
            startSlideInterval();
        } else if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left (next)
            clearInterval(slideInterval);
            navigate(1);
            startSlideInterval();
        }
    }
    
    // Pause auto-sliding when mouse hovers over carousel
    carousel.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    // Resume auto-sliding when mouse leaves carousel
    carousel.addEventListener('mouseleave', function() {
        startSlideInterval();
    });
}
