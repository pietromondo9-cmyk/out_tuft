
/* OUT TUFT — Gallerie, lingue e menu mobile */

const languageToggle = document.getElementById('languageToggle');
const menuToggle = document.getElementById('menuToggle');
const desktopNav = document.querySelector('.desktop-nav');
const galleryModal = document.getElementById('galleryModal');
const galleryModalTitle = document.getElementById('galleryModalTitle');
const galleryModalClose = document.getElementById('galleryModalClose');
const modalProjectGrid = document.getElementById('modalProjectGrid');
const imageLightbox = document.getElementById('imageLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

let currentLanguage = 'it';
let activeCategory = null;
let lastFocusedElement = null;

const galleryData = [
  {
    id: 'pets',
    title: { it: 'I tuoi pelosi', en: 'Your furry friends' },
    items: [
      {
        src: 'images/dog2.jpg',
        title: { it: 'Un amico speciale', en: 'A special friend' },
        alt: { it: 'Lavoro di tufting con cane', en: 'Tufting artwork featuring a dog' }
      }
    ]
  },
  {
    id: 'anime',
    title: { it: 'Anime & pop culture', en: 'Anime & pop culture' },
    items: [
      {
        src: 'images/rufy2.jpg',
        title: { it: 'Rufy', en: 'Luffy' },
        alt: { it: 'Progetto di tufting ispirato a Rufy', en: 'Tufting artwork inspired by Luffy' }
      }
    ]
  },
  {
    id: 'home',
    title: { it: 'Arredi', en: 'Home & interiors' },
    items: [
      {
        src: 'images/arredo.jpg',
        title: { it: 'Un dettaglio per la casa', en: 'A detail for the home' },
        alt: { it: 'Progetto di tufting per arredo', en: 'Tufting artwork for the home' }
      }
    ]
  },
  {
    id: 'other',
    title: { it: 'Altre ispirazioni', en: 'Other inspirations' },
    items: [
      {
        src: 'images/piccolo-principe.jpg',
        title: { it: 'Il Piccolo Principe', en: 'The Little Prince' },
        alt: { it: 'Progetto ispirato al Piccolo Principe', en: 'Artwork inspired by The Little Prince' }
      }
    ]
  }
];

/* Cambio lingua */

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;

  document.querySelectorAll('[data-it][data-en]').forEach(element => {
    element.innerHTML = element.dataset[language];
  });

  if (languageToggle) {
    languageToggle.textContent = language === 'it' ? 'EN ↗' : 'IT ↗';
  }

  if (activeCategory) {
    galleryModalTitle.textContent = activeCategory.title[language];
    renderCategory(activeCategory);
  }
}

languageToggle?.addEventListener('click', () => {
  setLanguage(currentLanguage === 'it' ? 'en' : 'it');
});

/* Apertura delle schede */

function openCategory(category, card) {
  activeCategory = category;
  lastFocusedElement = card;

  galleryModalTitle.textContent = category.title[currentLanguage];
  renderCategory(category);

  galleryModal.classList.add('is-open');
  galleryModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  galleryModalClose.focus();
}

function closeCategory() {
  galleryModal.classList.remove('is-open');
  galleryModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  activeCategory = null;

  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll('[data-gallery-category]').forEach(card => {
  function openCard() {
    const category = galleryData.find(
      item => item.id === card.dataset.galleryCategory
    );

    if (category) openCategory(category, card);
  }

  card.addEventListener('click', openCard);

  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCard();
    }
  });
});

galleryModalClose?.addEventListener('click', closeCategory);

galleryModal?.addEventListener('click', event => {
  if (event.target === galleryModal) closeCategory();
});

/* Immagini dentro la galleria */

function renderCategory(category) {
  modalProjectGrid.innerHTML = '';

  category.items.forEach(item => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'modal-project';
    button.setAttribute('aria-label', item.title[currentLanguage]);

    const image = document.createElement('img');
    image.src = item.src;
    image.alt = item.alt[currentLanguage];
    image.loading = 'lazy';

    const caption = document.createElement('p');
    caption.textContent = item.title[currentLanguage];

    button.append(image, caption);
    button.addEventListener('click', () => openLightbox(item));

    modalProjectGrid.appendChild(button);
  });
}

/* Immagine ingrandita */

function openLightbox(item) {
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt[currentLanguage];
  lightboxCaption.textContent = item.title[currentLanguage];

  imageLightbox.classList.add('is-open');
  imageLightbox.setAttribute('aria-hidden', 'false');
  lightboxClose.focus();
}

function closeLightbox() {
  imageLightbox.classList.remove('is-open');
  imageLightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

lightboxClose?.addEventListener('click', closeLightbox);

imageLightbox?.addEventListener('click', event => {
  if (event.target === imageLightbox) closeLightbox();
});

/* Tasto Esc: chiude prima l'immagine, poi la galleria */

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;

  if (imageLightbox.classList.contains('is-open')) {
    closeLightbox();
  } else if (galleryModal.classList.contains('is-open')) {
    closeCategory();
  }
});

/* Menu mobile */

let mobileNav = null;

if (desktopNav && menuToggle) {
  mobileNav = document.createElement('nav');
  mobileNav.className = 'mobile-nav';
  mobileNav.setAttribute('aria-label', 'Navigazione mobile');

  desktopNav.querySelectorAll('a').forEach(link => {
    mobileNav.appendChild(link.cloneNode(true));
  });

  document.querySelector('.site-header')?.after(mobileNav);

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Chiudi il menu' : 'Apri il menu'
    );
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* Anno nel footer */

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

/* Avvio */

setLanguage('it');
