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
  if (themeToggleButton) {
    themeToggleButton.textContent = savedTheme === 'light' ? 'Dark' : 'Light';

    themeToggleButton.addEventListener('click', function(){
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

  // ============================
  // 2) Language Toggle
  // ============================
  const languageToggleButton = document.getElementById('language-toggle');
  let currentLanguage = localStorage.getItem('language') || 'en';

  // Set the initial language attribute and button label
  document.body.setAttribute('lang', currentLanguage);
  if (languageToggleButton) {
    languageToggleButton.textContent = currentLanguage === 'en' ? 'ES' : 'EN';

    // Function to update language on all elements
    function updateLanguage() {
      // Update text content for elements with data-en or data-es attributes
      document.querySelectorAll('[data-en], [data-es]').forEach(el => {
        const translatedText = el.getAttribute(`data-${currentLanguage}`);
        if (translatedText !== null) {
          el.textContent = translatedText;
        }
      });
      // Update placeholder text for elements with data-en-placeholder or data-es-placeholder attributes
      document.querySelectorAll('[data-en-placeholder], [data-es-placeholder]').forEach(el => {
        const translatedPlaceholder = el.getAttribute(`data-${currentLanguage}-placeholder`);
        if (translatedPlaceholder !== null) {
          el.placeholder = translatedPlaceholder;
        }
      });
    }

    // Initial language update
    updateLanguage();

    // Toggle language on button click
    languageToggleButton.addEventListener('click', () => {
      // Toggle language: if currently 'en', change to 'es'; else 'en'
      currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
      document.body.setAttribute('lang', currentLanguage);
      languageToggleButton.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
      updateLanguage();
      localStorage.setItem('language', currentLanguage);
      console.log('Language toggled to:', currentLanguage);
    });
  }

  // ============================
  // 3) Modal Functionality
  // ============================
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const closeModalButtons = document.querySelectorAll('[data-close]');
  const floatingIcons = document.querySelectorAll('.floating-icon');

  // Open modals
  floatingIcons.forEach(icon => {
    icon.addEventListener('click', function(){
      const modalId = icon.getAttribute('data-modal');
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        modalElement.classList.add('active');
        modalElement.focus();
      }
    });
  });

  // Close modals via button click
  closeModalButtons.forEach(btn => {
    btn.addEventListener('click', function(){
      const parentOverlay = btn.closest('.modal-overlay');
      if (parentOverlay) {
        parentOverlay.classList.remove('active');
      }
    });
  });

  // Close modal by clicking outside or pressing ESC
  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', function(e){
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
    overlay.addEventListener('keydown', function(e){
      if (e.key === 'Escape') {
        overlay.classList.remove('active');
      }
    });
  });

  // ============================
  // 4) Mobile Services Toggle
  // ============================
  const servicesToggle = document.getElementById('services-toggle');
  const mobileServicesMenu = document.getElementById('mobile-services-menu');

  if (servicesToggle && mobileServicesMenu) {
    servicesToggle.addEventListener('click', function(){
      mobileServicesMenu.classList.toggle('active');
    });
  }

  // ============================
  // 5) Register Service Worker (Optional)
  // ============================
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered:', registration.scope);
        })
        .catch(err => {
          console.error('Service Worker registration failed:', err);
        });
    });
  }
});
