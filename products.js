/**
 * Farm Fresh - Farmers' Marketplace
 * Products Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize products page
    initProductsPage();
});

/**
 * Initialize products page functionality
 */
function initProductsPage() {
    // Reference to products container
    const productsContainer = document.getElementById('products-container');
    const featuredProductsContainer = document.getElementById('featured-products');
    
    // Load products depending on which container exists
    if (productsContainer) {
        // Products page
        loadProducts();
        setupFilters();
        setupSorting();
        setupPagination();
        setupSearch();
    } else if (featuredProductsContainer) {
        // Home page featured products
        loadFeaturedProducts();
    }
    
    // Handle mobile filter toggle
    const filterToggle = document.querySelector('.filter-toggle-mobile');
    const filterBody = document.querySelector('.filter-body');
    
    if (filterToggle && filterBody) {
        filterToggle.addEventListener('click', function() {
            filterBody.classList.toggle('active');
        });
    }
}

/**
 * Load featured products for homepage
 */
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    
    // Clear loading spinner
    featuredContainer.innerHTML = '';
    
    // Get featured products
    const featuredProducts = window.farmFresh.products.filter(product => product.featured);
    
    // Limit to 4 products
    const productsToShow = featuredProducts.slice(0, 4);
    
    // Generate HTML for each product
    productsToShow.forEach(product => {
        featuredContainer.innerHTML += window.farmFresh.generateProductCardHtml(product);
    });
    
    // Initialize add to cart buttons
    window.farmFresh.initAddToCartButtons();
}

/**
 * Load products with filtering and pagination
 */
function loadProducts() {
    // Get container
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;
    
    // Get URL parameters for initial filtering
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    // Set initial filter state
    let currentFilters = {
        categories: categoryParam ? [categoryParam] : ['all'],
        farmingMethods: ['all'],
        priceRange: 100,
        searchTerm: ''
    };
    
    // If category is specified in URL, check the corresponding checkbox
    if (categoryParam) {
        const checkbox = document.querySelector(`input[name="category"][value="${categoryParam}"]`);
        if (checkbox) {
            checkbox.checked = true;
            document.querySelector('input[name="category"][value="all"]').checked = false;
        }
    }
    
    // Set initial sort order
    let currentSortOrder = 'featured';
    
    // Set current page
    let currentPage = 1;
    const productsPerPage = 6;
    
    // Apply filters and render products
    applyFiltersAndRender();
    
    // Set up filter application button
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // Get selected categories
            const categoryCheckboxes = document.querySelectorAll('input[name="category"]:checked');
            const selectedCategories = Array.from(categoryCheckboxes).map(cb => cb.value);
            
            // Get selected farming methods
            const farmingCheckboxes = document.querySelectorAll('input[name="farming"]:checked');
            const selectedFarmingMethods = Array.from(farmingCheckboxes).map(cb => cb.value);
            
            // Get price range
            const priceRange = document.getElementById('price-range').value;
            
            // Update current filters
            currentFilters = {
                categories: selectedCategories.length > 0 ? selectedCategories : ['all'],
                farmingMethods: selectedFarmingMethods.length > 0 ? selectedFarmingMethods : ['all'],
                priceRange: priceRange,
                searchTerm: currentFilters.searchTerm
            };
            
            // Reset to first page
            currentPage = 1;
            
            // Apply filters and render
            applyFiltersAndRender();
        });
    }
    
    // Set up reset filters button
    const resetFiltersBtn = document.getElementById('reset-filters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            // Reset checkboxes
            document.querySelector('input[name="category"][value="all"]').checked = true;
            document.querySelectorAll('input[name="category"]').forEach(cb => {
                if (cb.value !== 'all') cb.checked = false;
            });
            
            document.querySelector('input[name="farming"][value="all"]').checked = true;
            document.querySelectorAll('input[name="farming"]').forEach(cb => {
                if (cb.value !== 'all') cb.checked = false;
            });
            
            // Reset price range
            const priceRangeInput = document.getElementById('price-range');
            const priceRangeValue = document.getElementById('price-range-value');
            if (priceRangeInput && priceRangeValue) {
                priceRangeInput.value = 100;
                priceRangeValue.textContent = '$100';
            }
            
            // Reset search
            const searchInput = document.getElementById('product-search');
            if (searchInput) searchInput.value = '';
            
            // Reset filters
            currentFilters = {
                categories: ['all'],
                farmingMethods: ['all'],
                priceRange: 100,
                searchTerm: ''
            };
            
            // Reset to first page
            currentPage = 1;
            
            // Reset sort order
            currentSortOrder = 'featured';
            const sortSelect = document.getElementById('sort-options');
            if (sortSelect) sortSelect.value = 'featured';
            
            // Apply filters and render
            applyFiltersAndRender();
        });
    }
    
    // Function to apply filters and render products
    function applyFiltersAndRender() {
        // Clear loading spinner
        productsContainer.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i></div>';
        
        // Simulate loading delay
        setTimeout(() => {
            // Filter products
            let filteredProducts = window.farmFresh.products.filter(product => {
                // Check category
                const categoryMatch = currentFilters.categories.includes('all') || 
                                     currentFilters.categories.includes(product.category);
                
                // Check farming method
                const farmingMatch = currentFilters.farmingMethods.includes('all') || 
                                    currentFilters.farmingMethods.includes(product.farmingMethod);
                
                // Check price
                const priceMatch = product.price <= currentFilters.priceRange;
                
                // Check search term
                const searchMatch = currentFilters.searchTerm === '' || 
                                  product.name.toLowerCase().includes(currentFilters.searchTerm.toLowerCase()) ||
                                  product.description.toLowerCase().includes(currentFilters.searchTerm.toLowerCase()) ||
                                  product.category.toLowerCase().includes(currentFilters.searchTerm.toLowerCase());
                
                return categoryMatch && farmingMatch && priceMatch && searchMatch;
            });
            
            // Sort products
            filteredProducts = sortProducts(filteredProducts, currentSortOrder);
            
            // Update product count
            const productCountEl = document.getElementById('product-count');
            if (productCountEl) {
                productCountEl.textContent = filteredProducts.length;
            }
            
            // Calculate pagination
            const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
            const startIndex = (currentPage - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
            
            // Update pagination UI
            updatePaginationUI(totalPages);
            
            // Clear container
            productsContainer.innerHTML = '';
            
            // Show message if no products match filters
            if (filteredProducts.length === 0) {
                productsContainer.innerHTML = `
                    <div class="no-products-message">
                        <p>No products match your current filters. Try adjusting your criteria.</p>
                    </div>
                `;
                return;
            }
            
            // Render paginated products
            paginatedProducts.forEach(product => {
                productsContainer.innerHTML += window.farmFresh.generateProductCardHtml(product);
            });
            
            // Initialize add to cart buttons
            window.farmFresh.initAddToCartButtons();
        }, 500);
    }
    
    // Function to update pagination UI
    function updatePaginationUI(totalPages) {
        const currentPageEl = document.getElementById('current-page');
        const totalPagesEl = document.getElementById('total-pages');
        const prevBtn = document.querySelector('.pagination-btn.prev');
        const nextBtn = document.querySelector('.pagination-btn.next');
        
        if (currentPageEl) currentPageEl.textContent = currentPage;
        if (totalPagesEl) totalPagesEl.textContent = totalPages;
        
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
            prevBtn.addEventListener('click', function() {
                if (currentPage > 1) {
                    currentPage--;
                    applyFiltersAndRender();
                    scrollToTop();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
            nextBtn.addEventListener('click', function() {
                if (currentPage < totalPages) {
                    currentPage++;
                    applyFiltersAndRender();
                    scrollToTop();
                }
            });
        }
    }
    
    // Function to sort products
    function sortProducts(products, sortOrder) {
        switch(sortOrder) {
            case 'price-low':
                return [...products].sort((a, b) => a.price - b.price);
            case 'price-high':
                return [...products].sort((a, b) => b.price - a.price);
            case 'name-az':
                return [...products].sort((a, b) => a.name.localeCompare(b.name));
            case 'name-za':
                return [...products].sort((a, b) => b.name.localeCompare(a.name));
            case 'featured':
            default:
                return [...products].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }
    }
    
    // Helper function to scroll to top of products
    function scrollToTop() {
        const productsSection = document.querySelector('.products-page');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Setup filters
    function setupFilters() {
        // Price range slider
        const priceRangeInput = document.getElementById('price-range');
        const priceRangeValue = document.getElementById('price-range-value');
        
        if (priceRangeInput && priceRangeValue) {
            priceRangeInput.addEventListener('input', function() {
                priceRangeValue.textContent = '$' + this.value;
            });
        }
        
        // Category exclusivity (if "All Products" is checked, uncheck others)
        const allCategoryCheckbox = document.querySelector('input[name="category"][value="all"]');
        const categoryCheckboxes = document.querySelectorAll('input[name="category"]:not([value="all"])');
        
        if (allCategoryCheckbox && categoryCheckboxes.length > 0) {
            allCategoryCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    categoryCheckboxes.forEach(cb => cb.checked = false);
                }
            });
            
            categoryCheckboxes.forEach(cb => {
                cb.addEventListener('change', function() {
                    if (this.checked) {
                        allCategoryCheckbox.checked = false;
                    } else if (![...categoryCheckboxes].some(cb => cb.checked)) {
                        allCategoryCheckbox.checked = true;
                    }
                });
            });
        }
        
        // Farming method exclusivity
        const allFarmingCheckbox = document.querySelector('input[name="farming"][value="all"]');
        const farmingCheckboxes = document.querySelectorAll('input[name="farming"]:not([value="all"])');
        
        if (allFarmingCheckbox && farmingCheckboxes.length > 0) {
            allFarmingCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    farmingCheckboxes.forEach(cb => cb.checked = false);
                }
            });
            
            farmingCheckboxes.forEach(cb => {
                cb.addEventListener('change', function() {
                    if (this.checked) {
                        allFarmingCheckbox.checked = false;
                    } else if (![...farmingCheckboxes].some(cb => cb.checked)) {
                        allFarmingCheckbox.checked = true;
                    }
                });
            });
        }
    }
    
    // Setup sorting
    function setupSorting() {
        const sortSelect = document.getElementById('sort-options');
        
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                currentSortOrder = this.value;
                applyFiltersAndRender();
            });
        }
    }
    
    // Setup pagination
    function setupPagination() {
        // Event listeners are added in updatePaginationUI function
    }
    
    // Setup search
    function setupSearch() {
        const searchInput = document.getElementById('product-search');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput && searchBtn) {
            // Search button click
            searchBtn.addEventListener('click', function() {
                currentFilters.searchTerm = searchInput.value;
                currentPage = 1;
                applyFiltersAndRender();
            });
            
            // Enter key press
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    currentFilters.searchTerm = searchInput.value;
                    currentPage = 1;
                    applyFiltersAndRender();
                }
            });
        }
    }
}
