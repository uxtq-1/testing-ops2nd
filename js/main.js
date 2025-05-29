(() => {
  'use strict';

  // Element selectors
  const selectors = {
    langToggleDesktop: document.getElementById('language-toggle-desktop'),
    langToggleMobile: document.getElementById('mobile-language-toggle'),
    themeToggleDesktop: document.getElementById('theme-toggle-desktop'),
    themeToggleMobile: document.getElementById('mobile-theme-toggle'),
    mobileServicesToggle: document.getElementById('mobile-services-toggle'),
    mobileServicesMenu: document.getElementById('mobile-services-menu'),
    contactForm: document.getElementById('contact-form'),
    joinForm: document.getElementById('join-form'),
    addressContainer: document.getElementById('address-container'),
    emailContainer: document.getElementById('email-container'),
    addAddressBtn: document.getElementById('add-address'),
    addEmailBtn: document.getElementById('add-email'),
    feedbackMessage: document.getElementById('feedback-message'),
    encryptingMsg: document.getElementById('encrypting-msg'),
    recaptchaPlaceholder: document.getElementById('recaptcha-placeholder')
  };

  // Language handling
  function setLanguageTexts(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = lang === 'es' ? el.getAttribute('data-es') : el.getAttribute('data-en');
    });
  }

  let currentLang = localStorage.getItem('language') || 'en';
  setLanguageTexts(currentLang);

  function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    localStorage.setItem('language', currentLang);
    setLanguageTexts(currentLang);
  }

  if (selectors.langToggleDesktop) selectors.langToggleDesktop.addEventListener('click', toggleLanguage);
  if (selectors.langToggleMobile) selectors.langToggleMobile.addEventListener('click', toggleLanguage);

  // Theme handling
  function setTheme(theme) {
    if (theme === 'light') {
      document.body.setAttribute('data-theme', 'light');
      if (selectors.themeToggleDesktop) selectors.themeToggleDesktop.textContent = 'Dark';
      if (selectors.themeToggleMobile) selectors.themeToggleMobile.textContent = 'Dark';
      localStorage.setItem('theme', 'light');
    } else {
      document.body.setAttribute('data-theme', 'dark');
      if (selectors.themeToggleDesktop) selectors.themeToggleDesktop.textContent = 'Light';
      if (selectors.themeToggleMobile) selectors.themeToggleMobile.textContent = 'Light';
      localStorage.setItem('theme', 'dark');
    }
  }

  let currentTheme = localStorage.getItem('theme') || 'dark';
  setTheme(currentTheme);

  if (selectors.themeToggleDesktop) {
    selectors.themeToggleDesktop.addEventListener('click', () => {
      setTheme(currentTheme === 'light' ? 'dark' : 'light');
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    });
  }
  if (selectors.themeToggleMobile) {
    selectors.themeToggleMobile.addEventListener('click', () => {
      setTheme(currentTheme === 'light' ? 'dark' : 'light');
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    });
  }

  // Mobile services menu
  if (selectors.mobileServicesToggle && selectors.mobileServicesMenu) {
    selectors.mobileServicesToggle.addEventListener('click', () => {
      const isExpanded = selectors.mobileServicesToggle.getAttribute('aria-expanded') === 'true';
      selectors.mobileServicesToggle.setAttribute('aria-expanded', String(!isExpanded));
      selectors.mobileServicesMenu.classList.toggle('active');
    });
  }

  // Floating labels for forms
  function updateFloatingLabels(form) {
    if (!form) return;
    form.querySelectorAll('input, textarea, select').forEach(input => {
      input.classList.toggle('has-value', input.value.trim() !== '');
    });
  }

  [selectors.contactForm, selectors.joinForm].forEach(form => {
    if (form) {
      updateFloatingLabels(form);
      form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', () => updateFloatingLabels(form));
      });
    }
  });

  // Dynamic address fields
  if (selectors.addAddressBtn && selectors.addressContainer) {
    selectors.addAddressBtn.addEventListener('click', () => {
      const newGroup = document.createElement('div');
      newGroup.className = 'form-group address-group';
      newGroup.style.position = 'relative';

      const newInput = document.createElement('input');
      newInput.type = 'text';
      newInput.name = 'contact-address[]';
      newInput.placeholder = ' ';
      newInput.required = true;

      const newLabel = document.createElement('label');
      newLabel.textContent = currentLang === 'es' ? 'Ingrese su dirección' : 'Place your address';
      newLabel.setAttribute('data-en', 'Place your address');
      newLabel.setAttribute('data-es', 'Ingrese su dirección');

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'remove-address';
      removeBtn.setAttribute('aria-label', currentLang === 'es' ? 'Eliminar campo de dirección' : 'Remove address field');
      removeBtn.title = removeBtn.getAttribute('aria-label');
      removeBtn.style.cssText = 'position:absolute;top:8px;right:8px;background:none;border:none;color:#a259ff;font-size:1.2rem;cursor:pointer';
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', () => newGroup.remove());

      newGroup.append(newInput, newLabel, removeBtn);
      selectors.addressContainer.appendChild(newGroup);
    });
  }

  // Dynamic email fields
  if (selectors.addEmailBtn && selectors.emailContainer) {
    selectors.addEmailBtn.addEventListener('click', () => {
      const newGroup = document.createElement('div');
      newGroup.className = 'form-group email-group';
      newGroup.style.position = 'relative';

      const newInput = document.createElement('input');
      newInput.type = 'email';
      newInput.name = 'contact-email[]';
      newInput.placeholder = ' ';
      newInput.required = true;

      const newLabel = document.createElement('label');
      newLabel.textContent = currentLang === 'es' ? 'Ingrese su correo' : 'Place your email';
      newLabel.setAttribute('data-en', 'Place your email');
      newLabel.setAttribute('data-es', 'Ingrese su correo');

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'remove-email';
      removeBtn.setAttribute('aria-label', currentLang === 'es' ? 'Eliminar campo de correo' : 'Remove email field');
      removeBtn.title = removeBtn.getAttribute('aria-label');
      removeBtn.style.cssText = 'position:absolute;top:8px;right:8px;background:none;border:none;color:#a259ff;font-size:1.2rem;cursor:pointer';
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', () => newGroup.remove());

      newGroup.append(newInput, newLabel, removeBtn);
      selectors.emailContainer.appendChild(newGroup);
    });
  }

  // Form validation and submission
  if (selectors.contactForm) {
    selectors.contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!selectors.contactForm.checkValidity()) {
        showFeedback(currentLang === 'es' ? 'Por favor, complete todos los campos obligatorios correctamente.' : 'Please fill out all required fields correctly.', true);
        return;
      }

      if (selectors.contactForm['contact-hp'].value) return; // Honeypot check

      // reCAPTCHA v3 integration
      if (typeof grecaptcha !== 'undefined' && selectors.recaptchaPlaceholder) {
        try {
          const token = await grecaptcha.execute('YOUR_RECAPTCHA_SITE_KEY', { action: 'submit_contact' });
          selectors.contactForm.querySelector('input[name="g-recaptcha-response"]').value = token;
        } catch (error) {
          showFeedback(currentLang === 'es' ? 'Error de verificación de reCAPTCHA. Intente nuevamente.' : 'reCAPTCHA verification failed. Please try again.', true);
          return;
        }
      }

      selectors.encryptingMsg?.setAttribute('aria-hidden', 'false');
      selectors.encryptingMsg?.classList.add('show');
      Array.from(selectors.contactForm.elements).forEach(el => el.disabled = true);

      const formData = new FormData(selectors.contactForm);
      formData.append('csrf_token', generateCSRFToken()); // CSRF token

      try {
        const response = await fetch(selectors.contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) throw new Error('Network response not ok');

        const result = await response.json();
        if (result.success) {
          showFeedback(currentLang === 'es'
            ? 'Gracias por su consideración. Nos pondremos en contacto pronto.'
            : 'Thank you for your submission. We will contact you soon.', false);
          selectors.contactForm.reset();
          selectors.contactForm.style.display = 'none';
          setTimeout(() => {
            selectors.encryptingMsg?.classList.remove('show');
            selectors.encryptingMsg?.setAttribute('aria-hidden', 'true');
          }, 2500);
          setTimeout(() => selectors.feedbackMessage?.classList.remove('show'), 5000);
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (error) {
        showFeedback(currentLang === 'es'
          ? 'Error durante el envío. Intente nuevamente.'
          : 'Submission error. Please try again.', true);
        Array.from(selectors.contactForm.elements).forEach(el => el.disabled = false);
        selectors.encryptingMsg?.classList.remove('show');
        selectors.encryptingMsg?.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Join form submission
  if (selectors.joinForm) {
    selectors.joinForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      // Similar logic as contact form, with reCAPTCHA and CSRF
    });
  }

  // Feedback display
  function showFeedback(message, isError = false) {
    if (selectors.feedbackMessage) {
      selectors.feedbackMessage.textContent = message;
      selectors.feedbackMessage.style.color = isError ? '#e55353' : '#a259ff';
      selectors.feedbackMessage.classList.add('show');
    }
  }

  // CSRF token generator (simplified, server-side validation required)
  function generateCSRFToken() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
})();
