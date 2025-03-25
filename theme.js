/**
 * Farm Fresh - Farmers' Marketplace
 * Theme Toggle JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
});

/**
 * Initialize theme functionality
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    
    if (!themeToggle) return;
    
    // Load saved theme preference or use system preference
    const savedTheme = localStorage.getItem('farmFreshTheme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.checked = false;
    }
    
    // Add theme toggle event listener
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('farmFreshTheme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('farmFreshTheme', 'light');
        }
    });
}
