const toggle = document.getElementById('languageToggle');
const menuToggle = document.getElementById('menuToggle');
let currentLanguage = 'it';

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-it][data-en]').forEach((element) => {
    const value = element.getAttribute(`data-${language}`);
    if (value !== null) element.innerHTML = value;
  });
  toggle.textContent = language === 'it' ? 'EN ↗' : 'IT ↗';
  document.title = language === 'it'
    ? 'Out Tuft — Un hobby di tufting'
    : 'Out Tuft — A tufting hobby';
}
toggle.addEventListener('click', () => setLanguage(currentLanguage === 'it' ? 'en' : 'it'));
document.getElementById('year').textContent = new Date().getFullYear();

const nav = document.querySelector('.desktop-nav');
const mobileNav = nav.cloneNode(true);
mobileNav.classList.add('mobile-nav');
mobileNav.id = 'mobileNav';
document.querySelector('.site-header').insertAdjacentElement('afterend', mobileNav);
menuToggle.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));
