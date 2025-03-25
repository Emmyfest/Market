/**
 * Farm Fresh - Farmers' Marketplace
 * Shopping Cart JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart page
    initCartPage();
});

/**
 * Initialize cart page functionality
 */
function initCartPage() {
    loadCartContents();
    setupCartFunctionality();
    setupCheckout();
}

/**
 * Load cart contents
 */
function loadCartContents() {
    const cartContentContainer = document.getElementById('cart-content');
    const cartActionsContainer = document.getElementById('cart-actions');
    const orderSummaryContainer = document.getElementById('order-summary');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    
    if (!cartContentContainer) return;
    
    // Get cart from localStorage
    const cart = window.farmFresh.getCart();
    
    // Update cart count in header
    window.farmFresh.updateCartCount();
    
    // Check if cart is empty
    if (!cart.items || cart.items.length === 0) {
        // Show empty cart message
        cartContentContainer.innerHTML = '';
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        if (cartActionsContainer) cartActionsContainer.style.display = 'none';
        if (orderSummaryContainer) orderSummaryContainer.style.display = 'none';
        return;
    }
    
    // Show cart content
    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    if (cartActionsContainer) cartActionsContainer.style.display = 'flex';
    if (orderSummaryContainer) orderSummaryContainer.style.display = 'block';
    
    // Populate cart table
    cartContentContainer.innerHTML = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${cart.items.map(item => generateCartItemHtml(item)).join('')}
            </tbody>
        </table>
    `;
    
    // Update order summary
    updateOrderSummary(cart);
}

/**
 * Generate HTML for cart item
 */
function generateCartItemHtml(item) {
    const product = window.farmFresh.getProductById(item.id);
    const itemTotal = item.price * item.quantity;
    
    return `
        <tr data-product-id="${item.id}">
            <td data-label="Product" class="cart-product-cell">
                <div class="cart-product">
                    <div class="cart-product-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-product-details">
                        <h3 class="cart-product-title">
                            <a href="product-details.html?id=${item.id}">${item.name}</a>
                        </h3>
                        <div class="cart-product-variant">
                            ${product && product.farmingMethod === 'organic' ? 'Organic' : 'Conventional'}
                        </div>
                    </div>
                </div>
            </td>
            <td data-label="Price">${window.farmFresh.formatCurrency(item.price)}</td>
            <td data-label="Quantity">
                <div class="cart-quantity">
                    <button class="cart-quantity-btn minus" aria-label="Decrease quantity">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" max="99">
                    <button class="cart-quantity-btn plus" aria-label="Increase quantity">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </td>
            <td data-label="Total" class="cart-price">${window.farmFresh.formatCurrency(itemTotal)}</td>
            <td>
                <button class="cart-remove" aria-label="Remove item">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
    `;
}

/**
 * Update order summary
 */
function updateOrderSummary(cart) {
    const subtotalEl = document.getElementById('subtotal-price');
    const shippingEl = document.getElementById('shipping-cost');
    const taxEl = document.getElementById('tax-amount');
    const discountEl = document.getElementById('discount-amount');
    const discountContainer = document.getElementById('discount-container');
    const totalEl = document.getElementById('total-price');
    const reviewTotalEl = document.getElementById('review-total-price');
    
    // Calculate values
    const subtotal = cart.subtotal || calculateSubtotal(cart.items);
    const shipping = subtotal >= 50 ? 0 : 5.99;
    const tax = subtotal * 0.07; // 7% tax
    let discount = 0;
    
    // Check for promo code
    const promoCode = localStorage.getItem('farmFreshPromoCode');
    if (promoCode) {
        if (promoCode === 'FRESH20') {
            discount = subtotal * 0.2; // 20% off
        } else if (promoCode === 'FREESHIP') {
            shipping = 0;
        }
    }
    
    const total = subtotal + shipping + tax - discount;
    
    // Update elements
    if (subtotalEl) subtotalEl.textContent = window.farmFresh.formatCurrency(subtotal);
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : window.farmFresh.formatCurrency(shipping);
    if (taxEl) taxEl.textContent = window.farmFresh.formatCurrency(tax);
    
    if (discount > 0) {
        if (discountEl) discountEl.textContent = `-${window.farmFresh.formatCurrency(discount)}`;
        if (discountContainer) discountContainer.style.display = 'flex';
    } else {
        if (discountContainer) discountContainer.style.display = 'none';
    }
    
    if (totalEl) totalEl.textContent = window.farmFresh.formatCurrency(total);
    if (reviewTotalEl) reviewTotalEl.textContent = window.farmFresh.formatCurrency(total);
    
    // Save cart with calculated values
    cart.subtotal = subtotal;
    cart.shipping = shipping;
    cart.tax = tax;
    cart.discount = discount;
    cart.total = total;
    
    window.farmFresh.saveCart(cart);
}

/**
 * Calculate subtotal of cart items
 */
function calculateSubtotal(items) {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Set up cart functionality
 */
function setupCartFunctionality() {
    // Handle quantity buttons
    setupQuantityButtons();
    
    // Handle remove buttons
    setupRemoveButtons();
    
    // Handle update cart button
    setupUpdateCart();
    
    // Handle promo code
    setupPromoCode();
}

/**
 * Set up quantity buttons
 */
function setupQuantityButtons() {
    const cartContent = document.getElementById('cart-content');
    
    if (!cartContent) return;
    
    // Using event delegation for quantity buttons
    cartContent.addEventListener('click', function(e) {
        // Check if clicked element is a quantity button
        if (e.target.closest('.cart-quantity-btn')) {
            const button = e.target.closest('.cart-quantity-btn');
            const isMinusButton = button.classList.contains('minus');
            const row = button.closest('tr');
            const productId = row.getAttribute('data-product-id');
            const quantityInput = row.querySelector('.cart-quantity-input');
            
            let quantity = parseInt(quantityInput.value);
            
            if (isMinusButton) {
                quantity = Math.max(1, quantity - 1);
            } else {
                quantity = Math.min(99, quantity + 1);
            }
            
            quantityInput.value = quantity;
            
            // Update cart item quantity
            updateCartItemQuantity(productId, quantity);
        }
    });
    
    // Handle manual input of quantity
    cartContent.addEventListener('change', function(e) {
        if (e.target.classList.contains('cart-quantity-input')) {
            const input = e.target;
            const row = input.closest('tr');
            const productId = row.getAttribute('data-product-id');
            
            let quantity = parseInt(input.value);
            
            if (isNaN(quantity) || quantity < 1) {
                quantity = 1;
                input.value = 1;
            } else if (quantity > 99) {
                quantity = 99;
                input.value = 99;
            }
            
            // Update cart item quantity
            updateCartItemQuantity(productId, quantity);
        }
    });
}

/**
 * Update cart item quantity
 */
function updateCartItemQuantity(productId, quantity) {
    const cart = window.farmFresh.getCart();
    const item = cart.items.find(item => item.id === parseInt(productId));
    
    if (item) {
        item.quantity = quantity;
        
        // Update subtotal
        cart.subtotal = calculateSubtotal(cart.items);
        
        // Save updated cart
        window.farmFresh.saveCart(cart);
        
        // Update order summary
        updateOrderSummary(cart);
    }
}

/**
 * Set up remove buttons
 */
function setupRemoveButtons() {
    const cartContent = document.getElementById('cart-content');
    
    if (!cartContent) return;
    
    // Using event delegation for remove buttons
    cartContent.addEventListener('click', function(e) {
        if (e.target.closest('.cart-remove')) {
            const button = e.target.closest('.cart-remove');
            const row = button.closest('tr');
            const productId = row.getAttribute('data-product-id');
            
            removeCartItem(productId);
        }
    });
}

/**
 * Remove item from cart
 */
function removeCartItem(productId) {
    const cart = window.farmFresh.getCart();
    
    // Filter out the item to remove
    cart.items = cart.items.filter(item => item.id !== parseInt(productId));
    
    // Update subtotal
    cart.subtotal = calculateSubtotal(cart.items);
    
    // Save updated cart
    window.farmFresh.saveCart(cart);
    
    // Reload cart contents
    loadCartContents();
    
    // Show notification
    window.farmFresh.showNotification('Item removed from cart');
}

/**
 * Set up update cart button
 */
function setupUpdateCart() {
    const updateCartBtn = document.getElementById('update-cart-btn');
    
    if (updateCartBtn) {
        updateCartBtn.addEventListener('click', function() {
            const cart = window.farmFresh.getCart();
            
            // Update order summary
            updateOrderSummary(cart);
            
            // Show notification
            window.farmFresh.showNotification('Cart updated');
        });
    }
}

/**
 * Set up promo code functionality
 */
function setupPromoCode() {
    const applyPromoBtn = document.getElementById('apply-promo');
    const promoInput = document.getElementById('promo-code');
    
    if (applyPromoBtn && promoInput) {
        // Check if a promo code is already applied
        const existingPromo = localStorage.getItem('farmFreshPromoCode');
        if (existingPromo) {
            promoInput.value = existingPromo;
            updateOrderSummary(window.farmFresh.getCart());
        }
        
        applyPromoBtn.addEventListener('click', function() {
            const promoCode = promoInput.value.trim().toUpperCase();
            
            if (promoCode) {
                // Check if promo code is valid
                if (promoCode === 'FRESH20' || promoCode === 'FREESHIP') {
                    // Save promo code
                    localStorage.setItem('farmFreshPromoCode', promoCode);
                    
                    // Update order summary
                    updateOrderSummary(window.farmFresh.getCart());
                    
                    // Show success message
                    window.farmFresh.showNotification('Promo code applied successfully');
                } else {
                    // Show error message
                    window.farmFresh.showNotification('Invalid promo code', 'error');
                }
            }
        });
    }
}

/**
 * Set up checkout functionality
 */
function setupCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const checkoutForm = document.getElementById('checkout-form');
    const successModal = document.getElementById('success-modal');
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');
    
    if (checkoutBtn && checkoutModal) {
        // Open checkout modal
        checkoutBtn.addEventListener('click', function() {
            checkoutModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
        });
    }
    
    if (closeModalBtn && checkoutModal) {
        // Close checkout modal
        closeModalBtn.addEventListener('click', function() {
            checkoutModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
        
        // Close modal when clicking outside
        checkoutModal.addEventListener('click', function(e) {
            if (e.target === checkoutModal) {
                checkoutModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    if (checkoutForm && successModal) {
        // Handle checkout form submission
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide checkout modal
            checkoutModal.classList.remove('active');
            
            // Generate random order number
            const orderNumber = `#FMF${Math.floor(Math.random() * 9000000) + 1000000}`;
            document.getElementById('order-number').textContent = orderNumber;
            
            // Show success modal
            successModal.classList.add('active');
            
            // Clear cart
            window.farmFresh.saveCart({ items: [], subtotal: 0 });
            window.farmFresh.updateCartCount();
            
            // Remove promo code
            localStorage.removeItem('farmFreshPromoCode');
        });
    }
    
    if (continueShoppingBtn && successModal) {
        // Close success modal and redirect to products page
        continueShoppingBtn.addEventListener('click', function() {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
            window.location.href = 'products.html';
        });
    }
    
    // Handle payment method selection
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const creditCardFields = document.getElementById('credit-card-fields');
    
    if (paymentOptions.length > 0 && creditCardFields) {
        paymentOptions.forEach(option => {
            option.addEventListener('change', function() {
                if (this.value === 'credit-card') {
                    creditCardFields.style.display = 'block';
                } else {
                    creditCardFields.style.display = 'none';
                }
            });
        });
    }
}
