const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check user's preference in localStorage
const savedMode = localStorage.getItem('darkMode');

if (savedMode === 'enabled') {
    body.classList.add('dark-mode');
    toggleButton.textContent = '☀️ Light Mode';
} else if (savedMode === 'disabled') {
    body.classList.remove('dark-mode');
    toggleButton.textContent = '🌙 Dark Mode';
} else {
    // No saved preference, check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        toggleButton.textContent = '☀️ Light Mode';
    } else {
        toggleButton.textContent = '🌙 Dark Mode';
    }
}

// Toggle dark mode
toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        toggleButton.textContent = '☀️ Light Mode';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        toggleButton.textContent = '🌙 Dark Mode';
    }
});
