 // ============================
  // 1) Theme Toggle
  // ============================
const themeToggleButton = document.getElementById('theme-toggle');
const bodyElement = document.body;
const savedTheme = localStorage.getItem('theme') || 'light';

// Initialize theme
bodyElement.setAttribute('data-theme', savedTheme);
themeToggleButton.textContent = savedTheme === 'light' ? 'Dark' : 'Light';

themeToggleButton.addEventListener('click', function(){
  const currentTheme = bodyElement.getAttribute('data-theme');
  if(currentTheme === 'light'){
    bodyElement.setAttribute('data-theme', 'dark');
    themeToggleButton.textContent = 'Light';
    localStorage.setItem('theme', 'dark');
  } else {
    bodyElement.setAttribute('data-theme', 'light');
    themeToggleButton.textContent = 'Dark';
    localStorage.setItem('theme', 'light');
  }
});
