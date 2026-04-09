// ==================== HAMBURGER MENU ====================
function toggleMenu() {
    $('nav ul').toggleClass('open');
}

// ==================== AUTO-SCROLL CAROUSEL ====================
function initCarousel(selector, delay = 3000) {
    const carousel = $(selector);
    if (carousel.length === 0) return;

    let autoScroll = setInterval(() => {
        const scrollLeft = carousel.scrollLeft();
        const offsetWidth = carousel.outerWidth();
        const scrollWidth = carousel[0].scrollWidth;

        if (scrollLeft + offsetWidth >= scrollWidth) {
            carousel[0].scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            const cardWidth = carousel.find('[class*="card"]').first().outerWidth();
            carousel[0].scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
}, delay);

    carousel.on('mouseenter', () => clearInterval(autoScroll));
    carousel.on('mouseleave', () => {
        autoScroll = setInterval(() => {
            const scrollLeft = carousel.scrollLeft();
            const offsetWidth = carousel.outerWidth();
            const scrollWidth = carousel[0].scrollWidth;
            
            if (scrollLeft + offsetWidth >= scrollWidth) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                const cardWidth = carousel.find('[class*="card"]').first().outerWidth();
                carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        }, delay);
    });
}

// ==================== SCROLL FUNCTIONS ====================
function scrollCarousel(selector, direction) {
    const carousel = $(selector);
    const cardWidth = carousel.find('[class*="card"]').first().outerWidth();
    carousel.scrollBy({ 
        left: direction * cardWidth, 
        behavior: 'smooth' 
    });
}

// Alias for family carousel
function scrollFamily(direction) {
    scrollCarousel('.f-carousel', direction);
}

// ==================== INITIALIZE ON DOCUMENT READY ====================
$(document).ready(() => {
    // Initialize main carousel auto-scroll
    initCarousel('.carousel', 3000);
    
    // Initialize family carousel auto-scroll
    initCarousel('.f-carousel', 4000);
});

/* ==================== IMAGE ZOOM ==================== */
$(document).ready(function() {

    const $modal = $("#imgModal");
    const $modalImg = $("#modalImg");

    // Select all images except excluded ones
    $("img:not(.no-preview)").css("cursor", "pointer");

    $("img:not(.no-preview)").on("click", function() {
        $modal.fadeIn(200);
        $modalImg.attr("src", $(this).data("full") || $(this).attr("src"));
    });

    // Close button
    $(".close").on("click", function() {
        $modal.fadeOut(200);
    });

    // Click outside image
    $modal.on("click", function(e) {
        if ($(e.target).is("#imgModal")) {
            $modal.fadeOut(200);
        }
    });

    // ESC key
    $(document).on("keydown", function(e) {
        if (e.key === "Escape") {
            $modal.fadeOut(200);
        }
    });

});

// ==================== PROJECT CARD EXPAND ====================
$(document).ready(function() {
    // Click handler for project cards
    $('.project-card').on('click', function(e) {
        // Prevent toggle button click from expanding
        if ($(e.target).closest('.toggle-btn').length) return;
        
        const $card = $(this);
        
        if ($card.hasClass('expanded')) {
            // Collapse
            $card.removeClass('expanded');
        } else {
            // Close other expanded cards first
            $('.project-card.expanded').removeClass('expanded');
            
            // Expand this card
            $card.addClass('expanded');
        }
    });
    
    // Toggle button click
    $('.toggle-btn').on('click', function(e) {
        e.stopPropagation();
        const $card = $(this).closest('.project-card');
        $card.removeClass('expanded');
    });
});