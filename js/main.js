document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded and parsed.");

  /* =====================================================
     1. THEME TOGGLE (Desktop & Mobile)
     ===================================================== */
  // Get desktop and mobile theme toggle buttons
  const themeToggleButton = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const bodyElement = document.body;
  const savedTheme = localStorage.getItem('theme') || 'light';

  // Initialize the theme
  bodyElement.setAttribute('data-theme', savedTheme);

  // Update the text for both desktop and mobile toggle buttons
  function updateThemeButtons(theme) {
    if(themeToggleButton) themeToggleButton.textContent = theme === 'light' ? 'Dark' : 'Light';
    if(themeToggleMobile) themeToggleMobile.textContent = theme === 'light' ? 'Dark' : 'Light';
  }
  updateThemeButtons(savedTheme);

  // Desktop theme toggle event listener
  if(themeToggleButton){
    themeToggleButton.addEventListener('click', function(){
      const currentTheme = bodyElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      bodyElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeButtons(newTheme);
    });
  }

  // Mobile theme toggle event listener
  if(themeToggleMobile){
    themeToggleMobile.addEventListener('click', function(){
      const currentTheme = bodyElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      bodyElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeButtons(newTheme);
    });
  }

  /* =====================================================
     2. LANGUAGE TOGGLE (Desktop & Mobile)
     ===================================================== */
  // Get desktop and mobile language toggle buttons
  const languageToggleButton = document.getElementById('language-toggle');
  const languageToggleMobile = document.getElementById('language-toggle-mobile');
  let currentLanguage = localStorage.getItem('language') || 'en';
  
  // Set initial language attribute on the body element
  document.body.setAttribute('lang', currentLanguage);

  // Update toggle button text for language selection
  function updateLanguageButtons() {
    if(languageToggleButton) languageToggleButton.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
    if(languageToggleMobile) languageToggleMobile.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
  }
  // Update all elements with language data attributes
  function updateLanguage(){
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = (currentLanguage === 'en')
        ? el.getAttribute('data-en')
        : el.getAttribute('data-es');
    });
  }
  updateLanguageButtons();
  updateLanguage();

  // Desktop language toggle event listener
  if(languageToggleButton){
    languageToggleButton.addEventListener('click', function(){
      currentLanguage = (currentLanguage === 'en') ? 'es' : 'en';
      document.body.setAttribute('lang', currentLanguage);
      updateLanguageButtons();
      updateLanguage();
      localStorage.setItem('language', currentLanguage);
    });
  }
  // Mobile language toggle event listener
  if(languageToggleMobile){
    languageToggleMobile.addEventListener('click', function(){
      currentLanguage = (currentLanguage === 'en') ? 'es' : 'en';
      document.body.setAttribute('lang', currentLanguage);
      updateLanguageButtons();
      updateLanguage();
      localStorage.setItem('language', currentLanguage);
    });
  }

  /* =====================================================
     3. MODAL FUNCTIONALITY
     ===================================================== */
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const closeModalButtons = document.querySelectorAll('[data-close]');
  const floatingIcons = document.querySelectorAll('.floating-icon');

  // Open modals when clicking on floating icons
  floatingIcons.forEach(icon => {
    icon.addEventListener('click', function(){
      const modalId = icon.getAttribute('data-modal');
      const modalElement = document.getElementById(modalId);
      if(modalElement){
        modalElement.classList.add('active');
        modalElement.focus();
      }
    });
  });

  // Close modals when clicking on close buttons
  closeModalButtons.forEach(btn => {
    btn.addEventListener('click', function(){
      const parentOverlay = btn.closest('.modal-overlay');
      if(parentOverlay){
        parentOverlay.classList.remove('active');
      }
    });
  });

  // Close modal when clicking outside modal content or pressing ESC
  modalOverlays.forEach(overlay => {
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

  /* =====================================================
     4. MOBILE SERVICES MENU TOGGLE WITH ICON UPDATE
     ===================================================== */
  const servicesToggle = document.getElementById('services-toggle');
  const mobileServicesMenu = document.getElementById('mobile-services-menu');
  
  if(servicesToggle && mobileServicesMenu){
    servicesToggle.addEventListener('click', function(){
      mobileServicesMenu.classList.toggle('active');
      // Toggle the icon between left and right chevron
      const iconEl = servicesToggle.querySelector('i');
      if(mobileServicesMenu.classList.contains('active')){
        iconEl.classList.remove('fa-chevron-left');
        iconEl.classList.add('fa-chevron-right');
      } else {
        iconEl.classList.remove('fa-chevron-right');
        iconEl.classList.add('fa-chevron-left');
      }
    });
  }

  /* =====================================================
     5. SERVICE WORKER REGISTRATION
     ===================================================== */
  if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered:', registration.scope);
      })
      .catch(err => {
        console.error('SW registration failed:', err);
      });
    });
  }
});
