// Dark mode support - matches Blowfish theme approach
(function() {
  const sitePreference = document.documentElement.getAttribute('data-default-appearance') || 'light';
  const userPreference = localStorage.getItem('appearance');
  const autoAppearance = document.documentElement.getAttribute('data-auto-appearance') === 'true';

  // Initial dark mode check
  function applyDarkMode() {
    let isDark = false;
    
    if (userPreference === 'dark') {
      isDark = true;
    } else if (userPreference === 'light') {
      isDark = false;
    } else if (autoAppearance) {
      isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      isDark = sitePreference === 'dark';
    }
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  // Apply on load
  applyDarkMode();

  // Listen for system preference changes (if auto is enabled)
  if (autoAppearance && window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      if (userPreference === null) {
        if (event.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    });
  }

  // Toggle function for manual switching
  window.toggleDarkMode = function() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('appearance', isDark ? 'dark' : 'light');
  };

  // Listen for toggle button clicks
  document.addEventListener('DOMContentLoaded', function() {
    const switcher = document.getElementById('appearance-switcher');
    if (switcher) {
      switcher.addEventListener('click', window.toggleDarkMode);
    }
    
    // Right-click to reset to system preference
    if (switcher) {
      switcher.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        localStorage.removeItem('appearance');
        applyDarkMode();
      });
    }
  });
})();
