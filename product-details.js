/**
 * Farm Fresh - Farmers' Marketplace
 * Product Details Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize product details page
    initProductDetailsPage();
});

/**
 * Initialize product details page functionality
 */
function initProductDetailsPage() {
    // Get the product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        // Redirect to products page if no ID is specified
        window.location.href = 'products.html';
        return;
    }
    
    // Load product details
    loadProductDetails(productId);
    
    // Set up tabs
    setupTabs();
    
    // Set up review rating selector
    setupRatingSelector();
}

/**
 * Load product details
 */
function loadProductDetails(productId) {
    // Get product by ID
    const product = window.farmFresh.getProductById(parseInt(productId));
    
    if (!product) {
        // Show error if product not found
        document.getElementById('product-details').innerHTML = `
            <div class="error-message">
                <h2>Product Not Found</h2>
                <p>Sorry, the product you are looking for does not exist.</p>
                <a href="products.html" class="btn btn-primary">Browse Products</a>
            </div>
        `;
        return;
    }
    
    // Add to recently viewed
    window.farmFresh.addToRecentlyViewed(product.id);
    
    // Update page title
    document.title = `${product.name} - Farm Fresh Marketplace`;
    
    // Update breadcrumb
    const breadcrumbName = document.getElementById('breadcrumb-product-name');
    if (breadcrumbName) {
        breadcrumbName.textContent = product.name;
    }
    
    // Render product details
    const productDetailsContainer = document.getElementById('product-details');
    if (productDetailsContainer) {
        productDetailsContainer.innerHTML = generateProductDetailsHtml(product);
    }
    
    // Load tab content
    loadTabContent(product);
    
    // Load related products
    loadRelatedProducts(product);
    
    // Load recently viewed products
    loadRecentlyViewedProducts();
    
    // Set up quantity selector
    setupQuantitySelector();
    
    // Set up add to cart button
    setupAddToCart(product.id);
    
    // Set up wishlist button
    setupWishlistButton();
    
    // Set up thumbnail gallery
    setupThumbnailGallery();
}

/**
 * Generate HTML for product details
 */
function generateProductDetailsHtml(product) {
    // Create list of thumbnail images
    const thumbnailImages = [
        product.image,
        product.image.replace('500x500', '500x501'), // simulate different images
        product.image.replace('500x500', '501x500'),
    ];
    
    // Generate availability class and text
    let availabilityClass = 'in-stock';
    let availabilityText = 'In Stock';
    
    if (!product.inStock) {
        availabilityClass = 'out-of-stock';
        availabilityText = 'Out of Stock';
    }
    
    return `
        <div class="product-gallery">
            <div class="main-image">
                <img src="${product.image}" alt="${product.name}" id="main-product-image">
            </div>
            <div class="thumbnail-container">
                ${thumbnailImages.map((img, index) => `
                    <div class="thumbnail ${index === 0 ? 'active' : ''}" data-image="${img}">
                        <img src="${img}" alt="${product.name} ${index + 1}">
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="product-details">
            <div class="product-details-header">
                <div class="product-details-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <h1 class="product-details-title">${product.name}</h1>
                <div class="product-details-rating">
                    ${window.farmFresh.generateRatingStars(product.rating)}
                    <span class="rating-text">${product.rating.toFixed(1)} (${product.ratingCount} Reviews)</span>
                </div>
            </div>
            
            <div class="product-details-price">
                <span class="details-current-price">${window.farmFresh.formatCurrency(product.price)}</span>
                ${product.oldPrice ? `<span class="details-old-price">${window.farmFresh.formatCurrency(product.oldPrice)}</span>` : ''}
            </div>
            
            <div class="product-details-availability ${availabilityClass}">
                <span class="availability-dot"></span>
                <span>${availabilityText}</span>
            </div>
            
            <div class="product-details-description">
                <p>${product.description}</p>
            </div>
            
            <div class="product-details-info">
                <div class="info-item">
                    <span class="info-label">Farm:</span>
                    <span>${product.farm}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Farming Method:</span>
                    <span>${product.farmingMethod === 'organic' ? 'Organic' : 'Conventional'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Weight:</span>
                    <span>${product.weight}</span>
                </div>
            </div>
            
            <div class="quantity-selector">
                <button class="quantity-btn minus" aria-label="Decrease quantity">
                    <i class="fas fa-minus"></i>
                </button>
                <input type="number" class="quantity-input" value="1" min="1" max="99" aria-label="Quantity">
                <button class="quantity-btn plus" aria-label="Increase quantity">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            
            <div class="product-details-actions">
                <button class="btn btn-primary add-to-cart" ${!product.inStock ? 'disabled' : ''}>
                    <i class="fas fa-shopping-basket"></i> ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button class="add-to-wishlist" aria-label="Add to wishlist">
                    <i class="far fa-heart"></i>
                </button>
            </div>
        </div>
    `;
}

/**
 * Load tab content
 */
function loadTabContent(product) {
    // Description tab
    const descriptionPanel = document.getElementById('description-panel');
    if (descriptionPanel) {
        descriptionPanel.innerHTML = `
            <div class="product-long-description">
                <p>${product.longDescription || product.description}</p>
            </div>
        `;
    }
    
    // Nutrition tab
    const nutritionPanel = document.getElementById('nutrition-panel');
    if (nutritionPanel && product.nutritionInfo) {
        let nutritionHtml = '<div class="nutrition-info">';
        
        for (const [key, value] of Object.entries(product.nutritionInfo)) {
            // Format the key for display (capitalize first letter, replace underscores with spaces)
            const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
            
            nutritionHtml += `
                <div class="nutrition-item">
                    <span class="nutrition-label">${formattedKey}:</span>
                    <span class="nutrition-value">${value}</span>
                </div>
            `;
        }
        
        nutritionHtml += '</div>';
        nutritionPanel.innerHTML = nutritionHtml;
    } else if (nutritionPanel) {
        nutritionPanel.innerHTML = '<p>Nutrition information not available for this product.</p>';
    }
    
    // Reviews tab
    const reviewsPanel = document.getElementById('reviews-panel');
    if (reviewsPanel) {
        let reviewsHtml = '';
        
        if (product.reviews && product.reviews.length > 0) {
            reviewsHtml += '<div class="reviews-container">';
            
            product.reviews.forEach(review => {
                reviewsHtml += `
                    <div class="review">
                        <div class="review-header">
                            <span class="reviewer-name">${review.name}</span>
                            <span class="review-date">${review.date}</span>
                        </div>
                        <div class="review-rating">
                            ${generateRatingStarsForReview(review.rating)}
                        </div>
                        <p class="review-text">${review.text}</p>
                    </div>
                `;
            });
            
            reviewsHtml += '</div>';
        } else {
            reviewsHtml += '<p>No reviews yet. Be the first to review this product!</p>';
        }
        
        // Insert before the review form
        const reviewForm = reviewsPanel.querySelector('.review-form-container');
        if (reviewForm) {
            reviewForm.insertAdjacentHTML('beforebegin', reviewsHtml);
        } else {
            reviewsPanel.innerHTML = reviewsHtml;
        }
        
        // Remove loading spinner
        const spinner = reviewsPanel.querySelector('.loading-spinner');
        if (spinner) {
            spinner.remove();
        }
    }
}

/**
 * Generate rating stars for review
 */
function generateRatingStarsForReview(rating) {
    let starsHtml = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    
    return starsHtml;
}

/**
 * Load related products
 */
function loadRelatedProducts(product) {
    const relatedProductsContainer = document.getElementById('related-products');
    if (!relatedProductsContainer) return;
    
    // Get products in the same category
    const relatedProducts = window.farmFresh.products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);
    
    if (relatedProducts.length === 0) {
        relatedProductsContainer.innerHTML = '<p>No related products found.</p>';
        return;
    }
    
    // Clear container
    relatedProductsContainer.innerHTML = '';
    
    // Add related products
    relatedProducts.forEach(relatedProduct => {
        relatedProductsContainer.innerHTML += window.farmFresh.generateProductCardHtml(relatedProduct);
    });
    
    // Initialize add to cart buttons
    window.farmFresh.initAddToCartButtons();
}

/**
 * Load recently viewed products
 */
function loadRecentlyViewedProducts() {
    const recentlyViewedContainer = document.getElementById('recently-viewed');
    if (!recentlyViewedContainer) return;
    
    // Get recently viewed product IDs from localStorage
    const recentlyViewed = localStorage.getItem('farmFreshRecentlyViewed');
    
    if (!recentlyViewed || JSON.parse(recentlyViewed).length <= 1) {
        // Hide section if no recently viewed products
        const recentlyViewedSection = document.querySelector('.recently-viewed');
        if (recentlyViewedSection) {
            recentlyViewedSection.style.display = 'none';
        }
        return;
    }
    
    // Get product objects
    const recentlyViewedProducts = JSON.parse(recentlyViewed)
        .slice(1) // Skip the current product
        .map(id => window.farmFresh.getProductById(parseInt(id)))
        .filter(product => product); // Filter out any null values
    
    if (recentlyViewedProducts.length === 0) {
        // Hide section if no valid products
        const recentlyViewedSection = document.querySelector('.recently-viewed');
        if (recentlyViewedSection) {
            recentlyViewedSection.style.display = 'none';
        }
        return;
    }
    
    // Clear container
    recentlyViewedContainer.innerHTML = '';
    
    // Add recently viewed products
    recentlyViewedProducts.forEach(product => {
        recentlyViewedContainer.innerHTML += window.farmFresh.generateProductCardHtml(product);
    });
    
    // Initialize add to cart buttons
    window.farmFresh.initAddToCartButtons();
}

/**
 * Set up tabs
 */
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Show corresponding panel
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-panel`).classList.add('active');
        });
    });
}

/**
 * Set up quantity selector
 */
function setupQuantitySelector() {
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            value = Math.max(1, value - 1);
            quantityInput.value = value;
        });
        
        plusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            value = Math.min(99, value + 1);
            quantityInput.value = value;
        });
        
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            
            if (isNaN(value) || value < 1) {
                value = 1;
            } else if (value > 99) {
                value = 99;
            }
            
            this.value = value;
        });
    }
}

/**
 * Set up add to cart button
 */
function setupAddToCart(productId) {
    const addToCartBtn = document.querySelector('.add-to-cart');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            if (this.hasAttribute('disabled')) return;
            
            const quantityInput = document.querySelector('.quantity-input');
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
            
            window.farmFresh.addToCart(productId, quantity);
        });
    }
}

/**
 * Set up wishlist button
 */
function setupWishlistButton() {
    const wishlistBtn = document.querySelector('.add-to-wishlist');
    
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                window.farmFresh.showNotification('Added to wishlist!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                window.farmFresh.showNotification('Removed from wishlist!');
            }
        });
    }
}

/**
 * Set up thumbnail gallery
 */
function setupThumbnailGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Update main image
                const imageUrl = this.getAttribute('data-image');
                mainImage.src = imageUrl;
                
                // Update active state
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
}

/**
 * Set up rating selector for review form
 */
function setupRatingSelector() {
    const ratingStars = document.querySelectorAll('.rating-selector i');
    const ratingInput = document.getElementById('review-rating');
    
    if (ratingStars.length > 0 && ratingInput) {
        ratingStars.forEach(star => {
            // Hover effect
            star.addEventListener('mouseover', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                
                ratingStars.forEach(s => {
                    const starRating = parseInt(s.getAttribute('data-rating'));
                    
                    if (starRating <= rating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
            
            // Click to select
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                ratingInput.value = rating;
            });
        });
        
        // Reset on mouseout if no rating selected
        const ratingSelector = document.querySelector('.rating-selector');
        
        if (ratingSelector) {
            ratingSelector.addEventListener('mouseout', function() {
                const currentRating = parseInt(ratingInput.value);
                
                ratingStars.forEach(s => {
                    const starRating = parseInt(s.getAttribute('data-rating'));
                    
                    if (starRating <= currentRating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
        }
    }
    
    // Handle review form submission
    const reviewForm = document.getElementById('review-form');
    
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('review-name');
            const ratingInput = document.getElementById('review-rating');
            const textInput = document.getElementById('review-text');
            
            if (nameInput && ratingInput && textInput) {
                const name = nameInput.value;
                const rating = parseInt(ratingInput.value);
                const text = textInput.value;
                
                if (name && rating > 0 && text) {
                    // Create a new review
                    const newReview = {
                        name,
                        rating,
                        text,
                        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                    };
                    
                    // Add the review to the reviews container
                    const reviewsContainer = document.querySelector('.reviews-container');
                    
                    if (reviewsContainer) {
                        // Add to existing container
                        reviewsContainer.insertAdjacentHTML('afterbegin', `
                            <div class="review">
                                <div class="review-header">
                                    <span class="reviewer-name">${newReview.name}</span>
                                    <span class="review-date">${newReview.date}</span>
                                </div>
                                <div class="review-rating">
                                    ${generateRatingStarsForReview(newReview.rating)}
                                </div>
                                <p class="review-text">${newReview.text}</p>
                            </div>
                        `);
                    } else {
                        // Create new container
                        const reviewsPanel = document.getElementById('reviews-panel');
                        const reviewForm = reviewsPanel.querySelector('.review-form-container');
                        
                        if (reviewForm) {
                            reviewForm.insertAdjacentHTML('beforebegin', `
                                <div class="reviews-container">
                                    <div class="review">
                                        <div class="review-header">
                                            <span class="reviewer-name">${newReview.name}</span>
                                            <span class="review-date">${newReview.date}</span>
                                        </div>
                                        <div class="review-rating">
                                            ${generateRatingStarsForReview(newReview.rating)}
                                        </div>
                                        <p class="review-text">${newReview.text}</p>
                                    </div>
                                </div>
                            `);
                        }
                    }
                    
                    // Clear form
                    nameInput.value = '';
                    ratingInput.value = '0';
                    textInput.value = '';
                    
                    // Reset stars
                    ratingStars.forEach(s => {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    });
                    
                    // Show success message
                    window.farmFresh.showNotification('Your review has been submitted. Thank you!');
                }
            }
        });
    }
}
