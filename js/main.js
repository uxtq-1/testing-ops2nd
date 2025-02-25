document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded and parsed.");

  // ========== 1) Theme Toggle ==========
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
      console.log("Theme toggled to:", newTheme);
    });
  } else {
    console.warn("Theme toggle button (#theme-toggle) not found.");
  }

  // ========== 2) Language Toggle ==========
  const languageToggleButton = document.getElementById('language-toggle');
  let currentLanguage = localStorage.getItem('language') || 'en';
  document.body.setAttribute('lang', currentLanguage);

  function updateLanguage() {
    // Update all elements with data-en or data-es attributes
    document.querySelectorAll('[data-en], [data-es]').forEach(el => {
      // Skip the language toggle button so we can manage its text separately
      if (el === languageToggleButton) return;
      const translatedText = el.getAttribute(`data-${currentLanguage}`);
      if (translatedText !== null) {
        el.textContent = translatedText;
      }
    });
    // Update placeholders for inputs and textareas
    document.querySelectorAll('[data-en-placeholder], [data-es-placeholder]').forEach(el => {
      const translatedPlaceholder = el.getAttribute(`data-${currentLanguage}-placeholder`);
      if (translatedPlaceholder !== null) {
        el.placeholder = translatedPlaceholder;
      }
    });
    console.log("Language updated to:", currentLanguage);
  }
  updateLanguage();

  if (languageToggleButton) {
    languageToggleButton.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
    languageToggleButton.addEventListener('click', function() {
      currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
      document.body.setAttribute('lang', currentLanguage);
      languageToggleButton.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
      localStorage.setItem('language', currentLanguage);
      updateLanguage();
      console.log("Language toggled to:", currentLanguage);
    });
  } else {
    console.warn("Language toggle button (#language-toggle) not found.");
  }

  // ========== 3) Modal Functionality ==========
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const closeModalButtons = document.querySelectorAll('[data-close]');
  const floatingIcons = document.querySelectorAll('.floating-icon');

  // Open modal when clicking a floating icon
  floatingIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const modalId = icon.getAttribute('data-modal');
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        modalElement.classList.add('active');
        console.log("Opened modal:", modalId);
        // For accessibility: set focus to first focusable element inside modal
        const focusable = modalElement.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable) {
          focusable.focus();
        }
      } else {
        console.warn("Modal with ID", modalId, "not found.");
      }
    });
  });

  // Close modals via close buttons
  closeModalButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const parentOverlay = btn.closest('.modal-overlay');
      if (parentOverlay) {
        parentOverlay.classList.remove('active');
        console.log("Closed modal via close button.");
      }
    });
  });

  // Close modal by clicking outside content or pressing ESC
  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        console.log("Closed modal by clicking outside.");
      }
    });
    overlay.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        overlay.classList.remove('active');
        console.log("Closed modal with Escape key.");
      }
    });
  });

  // ========== 4) Mobile Services Toggle ==========
  const servicesToggle = document.getElementById('servicesToggle');
  const mobileServicesMenu = document.getElementById('mobile-services-menu');
  if (servicesToggle && mobileServicesMenu) {
    servicesToggle.addEventListener('click', function() {
      mobileServicesMenu.classList.toggle('active');
      console.log("Mobile services menu toggled.");
    });
  } else {
    console.warn("Mobile services toggle button (#servicesToggle) or menu (#mobile-services-menu) not found.");
  }

  // ========== 5) Service Worker Registration ==========
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch(err => {
          console.error("Service Worker registration failed:", err);
        });
    });
  }
});
