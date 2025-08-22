   document.addEventListener('DOMContentLoaded', () => {
      const themeToggle = document.getElementById('theme-toggle');
      const body = document.body;
      const themeIcon = themeToggle.querySelector('.theme-icon');

      const savedTheme = localStorage.getItem('theme') || 'light';
      body.classList.add(savedTheme + '-mode');
      updateThemeIcon(savedTheme);

      themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('light-mode') ? 'light' : 'night';
        const newTheme = currentTheme === 'light' ? 'night' : 'light';

        body.classList.remove(currentTheme + '-mode');
        body.classList.add(newTheme + '-mode');
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
      });

      function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀';
      }
    });