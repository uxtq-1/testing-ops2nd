document.addEventListener('DOMContentLoaded', function() {

  // ============================
  // 1) Theme Toggle (Desktop & Mobile)
  // ============================
  const themeToggleButton = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  const bodyElement = document.body;
  const savedTheme = localStorage.getItem('theme') || 'light';

  // Initialize theme
  bodyElement.setAttribute('data-theme', savedTheme);
  if (themeToggleButton) {
    themeToggleButton.textContent = savedTheme === 'light' ? 'Dark' : 'Light';
    themeToggleButton.addEventListener('click', function() {
      const currentTheme = bodyElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        bodyElement.setAttribute('data-theme', 'dark');
        themeToggleButton.textContent = 'Light';
        localStorage.setItem('theme', 'dark');
      } else {
        bodyElement.setAttribute('data-theme', 'light');
        themeToggleButton.textContent = 'Dark';
        localStorage.setItem('theme', 'light');
      }
    });
  }
  // Similarly for mobile theme toggle
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', function() {
      const currentTheme = bodyElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        bodyElement.setAttribute('data-theme', 'dark');
        themeToggleMobile.textContent = 'Light';
        localStorage.setItem('theme', 'dark');
      } else {
        bodyElement.setAttribute('data-theme', 'light');
        themeToggleMobile.textContent = 'Dark';
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // ============================
  // 2) Language Toggle (Desktop & Mobile)
  // ============================
const languageToggleButton = document.getElementById('language-toggle');
let currentLanguage = localStorage.getItem('language') || 'en';

// Set initial language
document.body.setAttribute('lang', currentLanguage);
if (languageToggleButton) {
  // Button label: show "EN" when default and "ES" when switched
  languageToggleButton.textContent = (currentLanguage === 'en') ? 'EN' : 'ES';

  // Helper function to update translations
  function updateLanguage() {
    const translationElements = document.querySelectorAll('[data-en]');
    translationElements.forEach((element) => {
      element.textContent = (currentLanguage === 'en')
        ? element.getAttribute('data-en')
        : element.getAttribute('data-es');
    });
  }

  updateLanguage();

  languageToggleButton.addEventListener('click', function () {
    // Toggle language
    currentLanguage = (currentLanguage === 'en') ? 'es' : 'en';
    // Update the button label: show "EN" if the language is "en", otherwise "ES"
    languageToggleButton.textContent = (currentLanguage === 'en') ? 'EN' : 'ES';
    document.body.setAttribute('lang', currentLanguage);
    updateLanguage();
    localStorage.setItem('language', currentLanguage);
  });
}

  // ============================
  // 3) Modal Functionality (for Floating Icons)
  // ============================
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const closeModalButtons = document.querySelectorAll('[data-close]');
  const floatingIcons = document.querySelectorAll('.floating-icon');

  floatingIcons.forEach((icon) => {
    icon.addEventListener('click', function() {
      const modalId = icon.getAttribute('data-modal');
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        modalElement.classList.add('active');
        modalElement.focus();
      }
    });
  });
  closeModalButtons.forEach((btn) => {
    btn.addEventListener('click', function() {
      const parentOverlay = btn.closest('.modal-overlay');
      if (parentOverlay) {
        parentOverlay.classList.remove('active');
      }
    });
  });
  modalOverlays.forEach((overlay) => {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
    overlay.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        overlay.classList.remove('active');
      }
    });
  });

  // ============================
  // 4) Mobile Services Menu Toggle (Hamburger Button)
  // ============================
  const servicesToggle = document.getElementById('servicesToggle');
  const mobileServicesMenu = document.getElementById('mobileServicesMenu');

  if (servicesToggle && mobileServicesMenu) {
    servicesToggle.addEventListener('click', function() {
      mobileServicesMenu.classList.toggle('active');
    });
  }
});
