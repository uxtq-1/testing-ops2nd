// At the bottom of js/main.js

document.addEventListener('DOMContentLoaded', () => {
  const floatingFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

  function toggleLabel(e) {
    const target = e.target;
    if (target.value.trim() !== '') {
      target.classList.add('filled');
    } else {
      target.classList.remove('filled');
    }
  }

  floatingFields.forEach(field => {
    if (field.value.trim() !== '') {
      field.classList.add('filled');
    }
    field.addEventListener('input', toggleLabel);
  });
});
