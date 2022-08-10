document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-item').forEach(faqDropdown => {
    faqDropdown.addEventListener('click', () => {
      faqDropdown.classList.toggle('faq-item--active');
    });
  });
});