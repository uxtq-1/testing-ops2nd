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

    themeToggleButton.addEventListener('click', function() {
      const currentTheme = bodyElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      bodyElement.setAttribute('data-theme', newTheme);
      themeToggleButton.textContent = newTheme === 'light' ? 'Dark' : 'Light';
      localStorage.setItem('theme', newTheme);
    });
  }

  // ============================
  // 2) Language Toggle
  // ============================
  const languageToggleButton = document.getElementById('language-toggle');
  let currentLanguage = localStorage.getItem('language') || 'en';

  // Set the initial language attribute
  document.body.setAttribute('lang', currentLanguage);
  
  // Function to update language on all elements (except the language toggle itself)
  function updateLanguage() {
    // Update text content for elements with data-en or data-es attributes
    document.querySelectorAll('[data-en], [data-es]').forEach(el => {
      // Avoid overwriting the language toggle button's text (we handle it separately)
      if (el === languageToggleButton) return;
      const translatedText = el.getAttribute(`data-${currentLanguage}`);
      if (translatedText !== null) {
        el.textContent = translatedText;
      }
    });
    // Update placeholder text for inputs and textareas
    document.querySelectorAll('[data-en-placeholder], [data-es-placeholder]').forEach(el => {
      const translatedPlaceholder = el.getAttribute(`data-${currentLanguage}-placeholder`);
      if (translatedPlaceholder !== null) {
        el.placeholder = translatedPlaceholder;
      }
    });
  }
  
  updateLanguage();
  
  if (languageToggleButton) {
    // Set initial toggle button text to the opposite language
    languageToggleButton.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
    languageToggleButton.addEventListener('click', function() {
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

  // Open modals when clicking floating icons
  floatingIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const modalId = icon.getAttribute('data-modal');
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        modalElement.classList.add('active');
        // Optionally set focus on a focusable element inside the modal for accessibility
        const focusable = modalElement.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable) {
          focusable.focus();
        }
      }
    });
  });

  // Close modals via close buttons
  closeModalButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const parentOverlay = btn.closest('.modal-overlay');
      if (parentOverlay) {
        parentOverlay.classList.remove('active');
      }
    });
  });

  // Close modal by clicking outside the modal content or pressing ESC
  modalOverlays.forEach(overlay => {
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
  // 4) Mobile Services Toggle
  // ============================
  const servicesToggle = document.getElementById('servicesToggle');
  const mobileServicesMenu = document.getElementById('mobile-services-menu');

  if (servicesToggle && mobileServicesMenu) {
    servicesToggle.addEventListener('click', function() {
      mobileServicesMenu.classList.toggle('active');
    });
  }

  // ============================
  // 5) Register Service Worker (Optional)
  // ============================
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
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
