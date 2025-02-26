// ============================
  // 2) Language Toggle
  // ============================
  const languageToggleButton = document.getElementById('language-toggle');
let currentLanguage = localStorage.getItem('language') || 'en';

document.body.setAttribute('lang', currentLanguage);
languageToggleButton.textContent = (currentLanguage === 'en') ? 'ES' : 'EN';

function updateLanguage(){
  const translationElements = document.querySelectorAll('[data-en]');
  translationElements.forEach((element) => {
    element.textContent = (currentLanguage === 'en')
      ? element.getAttribute('data-en')
      : element.getAttribute('data-es');
  });
}

updateLanguage();

languageToggleButton.addEventListener('click', function(){
  currentLanguage = (currentLanguage === 'en') ? 'es' : 'en';
  languageToggleButton.textContent = (currentLanguage === 'en') ? 'ES' : 'EN';
  document.body.setAttribute('lang', currentLanguage);
  updateLanguage();
  localStorage.setItem('language', currentLanguage);
});
