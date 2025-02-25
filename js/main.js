document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded and parsed.");

  // ============================
  // 1) Theme Toggle
  // ============================
  const themeToggleButton = document.getElementById('theme-toggle');
  const bodyElement = document.body;
  const savedTheme = localStorage.getItem('theme') || 'light';

  // Initialize theme
  bodyElement.setAttribute('data-theme', savedTheme);
  if(themeToggleButton) {
    // Display initial button text (optional)
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
  }

  // ============================
  // 2) Language Toggle
  // ============================
const languageToggleButton = document.getElementById('language-toggle');
let currentLanguage = localStorage.getItem('language') || 'en';

// Set the initial language and update the button text
document.body.setAttribute('lang', currentLanguage);
if (languageToggleButton) {
  languageToggleButton.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
}

// Function to update all translations
function updateLanguage() {
  // Update label texts
  document.querySelectorAll('label').forEach(label => {
    const newText = label.getAttribute(`data-${currentLanguage}`);
    if (newText) {
      label.textContent = newText;
    }
  });
  
  // Update input placeholders
  document.querySelectorAll('input').forEach(input => {
    const newPlaceholder = input.getAttribute(`data-${currentLanguage}-placeholder`);
    if (newPlaceholder) {
      input.placeholder = newPlaceholder;
    }
  });
}

// Initial call to update the language
updateLanguage();

// Language toggle functionality
if (languageToggleButton) {
  languageToggleButton.addEventListener('click', () => {
    // Toggle the language variable
    currentLanguage = (currentLanguage === 'en') ? 'es' : 'en';
    // Update language settings on the page
    document.body.setAttribute('lang', currentLanguage);
    languageToggleButton.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
    updateLanguage();
    // Save the selection
    localStorage.setItem('language', currentLanguage);
  });
}

  // ============================
  // 3) Modal Functionality
  // ============================
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const closeModalButtons = document.querySelectorAll('[data-close]');
  const floatingIcons = document.querySelectorAll('.floating-icon');

  // Open modals
  floatingIcons.forEach((icon) => {
    icon.addEventListener('click', function(){
      const modalId = icon.getAttribute('data-modal');
      const modalElement = document.getElementById(modalId);
      if(modalElement){
        modalElement.classList.add('active');
        modalElement.focus();
      }
    });
  });

  // Close modals
  closeModalButtons.forEach((btn) => {
    btn.addEventListener('click', function(){
      const parentOverlay = btn.closest('.modal-overlay');
      if(parentOverlay){
        parentOverlay.classList.remove('active');
      }
    });
  });

  // Close modal by clicking outside or pressing ESC
  modalOverlays.forEach((overlay) => {
    overlay.addEventListener('click', function(e){
      if(e.target === overlay){
        overlay.classList.remove('active');
      }
    });
    overlay.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){
        overlay.classList.remove('active');
      }
    });
  });

   // ============================
  // 4) Mobile Services Toggle
  // ============================
  const servicesToggle = document.getElementById('services-toggle');
  const mobileServicesMenu = document.getElementById('mobile-services-menu');

  if(servicesToggle && mobileServicesMenu) {
    servicesToggle.addEventListener('click', function(){
      mobileServicesMenu.classList.toggle('active');
    });
  }

  // ============================
  // 5) Register Service Worker (Optional)
  // ============================
  if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration.scope);
      })
      .catch((err) => {
        console.error('SW registration failed:', err);
      });
    });
  }
});
