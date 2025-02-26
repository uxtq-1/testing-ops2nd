document.addEventListener('DOMContentLoaded', function() {
console.log("DOM fully loaded and parsed.");

  // ============================
  // 1) Modal Functionality
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
  // 2) Mobile Services Toggle
  // ============================
const servicesToggle = document.getElementById('services-toggle');
const mobileServicesMenu = document.getElementById('mobile-services-menu');

if(servicesToggle && mobileServicesMenu) {
  servicesToggle.addEventListener('click', function(){
    mobileServicesMenu.classList.toggle('active');
  });
}

  // ============================
  // 3) Register Service Worker (Optional)
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
