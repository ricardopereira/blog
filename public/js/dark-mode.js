// Apply dark mode class to body if documentElement has dark-mode-preload
// This runs after body is available but before DOMContentLoaded
if (document.documentElement.classList.contains('dark-mode-preload')) {
    if (document.body) {
        document.body.classList.add('dark-mode');
    } else {
        // Fallback: wait for body to be available
        const observer = new MutationObserver(function(mutations, obs) {
            if (document.body) {
                document.body.classList.add('dark-mode');
                obs.disconnect();
            }
        });
        observer.observe(document.documentElement, {childList: true, subtree: true});
    }
}

// Function to enable dark mode
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
    updateToggleState(true);
}

// Function to disable dark mode
function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
    updateToggleState(false);
}

// Update toggle checkbox state
function updateToggleState(isDark) {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle && darkModeToggle.checked !== isDark) {
        darkModeToggle.checked = isDark;
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    if (isDarkMode) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

// Check if should use dark mode
function shouldUseDarkMode() {
    const savedTheme = localStorage.getItem('darkMode');
    
    // If user has explicitly set a preference, use it
    if (savedTheme !== null) {
        return savedTheme === 'true';
    }
    
    // Otherwise, use system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    // Remove preload class to enable transitions
    document.documentElement.classList.remove('dark-mode-preload');
    
    // Set initial state based on current body class (already set by IIFE)
    const isDarkMode = document.body.classList.contains('dark-mode');
    updateToggleState(isDarkMode);
    
    // Add event listener to the toggle button
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', toggleDarkMode);
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // Only update if user hasn't set a manual preference
            if (localStorage.getItem('darkMode') === null) {
                if (e.matches) {
                    enableDarkMode();
                } else {
                    disableDarkMode();
                }
            }
        });
    }
}); 