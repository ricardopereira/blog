// Function to enable dark mode
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'true');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.checked = true;
    }
}

// Function to disable dark mode
function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'false');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.checked = false;
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        if (darkModeToggle.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved dark mode preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Initialize dark mode based on saved preference
    if (darkMode) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    // Add event listener to the toggle button
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', toggleDarkMode);
    }
}); 