/(() => {
  'use strict';

  const langToggleDesktop = document.getElementById('language-toggle-desktop');
  const langToggleMobile = document.getElementById('language-toggle-mobile');
  const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const mobileServicesToggle = document.getElementById('mobile-services-toggle');
  const mobileServicesMenu = document.getElementById('mobile-services-menu');
  const form = document.getElementById('contact-form');
  const addressContainer = document.getElementById('address-container');
  const emailContainer = document.getElementById('email-container');
  const addAddressBtn = document.getElementById('add-address');
  const addEmailBtn = document.getElementById('add-email');
  const feedbackMessage = document.getElementById('feedback-message');
  const encryptingMsg = document.getElementById('encrypting-msg');

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

  langToggleDesktop.addEventListener('click', toggleLanguage);
  langToggleMobile.addEventListener('click', toggleLanguage);

  function setTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      themeToggleDesktop.textContent = 'Dark';
      themeToggleMobile.textContent = 'Dark';
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      themeToggleDesktop.textContent = 'Light';
      themeToggleMobile.textContent = 'Light';
      localStorage.setItem('theme', 'dark');
    }
  }

  let currentTheme = localStorage.getItem('theme') || 'dark';
  setTheme(currentTheme);

  themeToggleDesktop.addEventListener('click', () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  });

  themeToggleMobile.addEventListener('click', () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  });

  mobileServicesToggle.addEventListener('click', () => {
    const isExpanded = mobileServicesToggle.getAttribute('aria-expanded') === 'true';
    mobileServicesToggle.setAttribute('aria-expanded', String(!isExpanded));
    mobileServicesMenu.hidden = isExpanded;
  });

  function updateFloatingLabels() {
    form.querySelectorAll('input, textarea, select').forEach(input => {
      if (input.value.trim() !== '') {
        input.classList.add('has-value');
      } else {
        input.classList.remove('has-value');
      }
    });
  }

  updateFloatingLabels();
  form.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('input', updateFloatingLabels);
  });

  addAddressBtn.addEventListener('click', () => {
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

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-address';
    removeBtn.setAttribute('aria-label', currentLang === 'es' ? 'Eliminar campo de dirección' : 'Remove address field');
    removeBtn.title = removeBtn.getAttribute('aria-label');
    removeBtn.style.position = 'absolute';
    removeBtn.style.top = '8px';
    removeBtn.style.right = '8px';
    removeBtn.style.background = 'none';
    removeBtn.style.border = 'none';
    removeBtn.style.color = '#a259ff';
    removeBtn.style.fontSize = '1.2rem';
    removeBtn.style.cursor = 'pointer';
    removeBtn.textContent = '×';

    removeBtn.addEventListener('click', () => newGroup.remove());

    newGroup.appendChild(newInput);
    newGroup.appendChild(newLabel);
    newGroup.appendChild(removeBtn);
    addressContainer.appendChild(newGroup);
  });

  addEmailBtn.addEventListener('click', () => {
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

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-email';
    removeBtn.setAttribute('aria-label', currentLang === 'es' ? 'Eliminar campo de correo' : 'Remove email field');
    removeBtn.title = removeBtn.getAttribute('aria-label');
    removeBtn.style.position = 'absolute';
    removeBtn.style.top = '8px';
    removeBtn.style.right = '8px';
    removeBtn.style.background = 'none';
    removeBtn.style.border = 'none';
    removeBtn.style.color = '#a259ff';
    removeBtn.style.fontSize = '1.2rem';
    removeBtn.style.cursor = 'pointer';
    removeBtn.textContent = '×';

    removeBtn.addEventListener('click', () => newGroup.remove());

    newGroup.appendChild(newInput);
    newGroup.appendChild(newLabel);
    newGroup.appendChild(removeBtn);
    emailContainer.appendChild(newGroup);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      showFeedback(currentLang === 'es' ? 'Por favor, complete todos los campos obligatorios correctamente.' : 'Please fill out all required fields correctly.', true);
      return;
    }

    if (form['contact-hp'].value) return;

    encryptingMsg.setAttribute('aria-hidden', 'false');
    encryptingMsg.classList.add('show');

    Array.from(form.elements).forEach(el => el.disabled = true);

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error('Network response not ok');

      const result = await response.json();

      if (result.success) {
        showFeedback(currentLang === 'es'
          ? 'Gracias por su consideración y tiempo. Nos pondremos en contacto con usted lo antes posible. Su solicitud y pregunta se tratan con urgencia. ¡Que tenga un día productivo pero excepcional!'
          : 'Thank you for your consideration and time. We will contact you as soon as possible. Your request and question are treated with urgency. Have a productive but outstanding day!', false);

        form.reset();
        form.style.display = 'none';

        setTimeout(() => {
          encryptingMsg.classList.remove('show');
          encryptingMsg.setAttribute('aria-hidden', 'true');
        }, 2500);

        setTimeout(() => {
          feedbackMessage.classList.remove('show');
        }, 5000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      showFeedback(currentLang === 'es'
        ? 'Ocurrió un error durante el envío. Por favor, intente nuevamente más tarde.'
        : 'An error occurred during submission. Please try again later.', true);

      Array.from(form.elements).forEach(el => el.disabled = false);
      encryptingMsg.classList.remove('show');
      encryptingMsg.setAttribute('aria-hidden', 'true');
    }
  });

  function showFeedback(message, isError = false) {
    feedbackMessage.textContent = message;
    feedbackMessage.style.color = isError ? '#e55353' : '#a259ff';
    feedbackMessage.classList.add('show');
  }
})();
