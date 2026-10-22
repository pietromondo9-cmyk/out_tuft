
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
    title: { it: 'Animali', en: 'Pets' },
    projects: [
      {
        title: { it: 'Dog Rug', en: 'Dog Rug' },
        image: 'images/dog2.jpg',
        alt: { it: 'Tappeto con cane', en: 'Dog rug' }
      }
    ]
  },
  {
    id: 'anime',
    title: { it: 'Anime', en: 'Anime' },
    projects: [
      {
        title: { it: 'Rufy', en: 'Luffy' },
        image: 'images/rufy2.jpg',
        alt: { it: 'Progetto ispirato a Rufy', en: 'Luffy-inspired project' }
      },
      {
        title: { it: 'Brook', en: 'Brook' },
        image: 'images/brook.jpg',
        alt: { it: 'Progetto ispirato a Brook', en: 'Brook-inspired project' }
      },
      {
        title: { it: 'Zapdos', en: 'Zapdos' },
        image: 'images/zapdos.PNG',
        alt: { it: 'Progetto ispirato a Zapdos', en: 'Zapdos-inspired project' }
      }
    ]
  },
  {
    id: 'home',
    title: { it: 'Arredamento', en: 'Home & interiors' },
    projects: [
      {
        title: { it: 'Arredo', en: 'Interior design' },
        image: 'images/arredo.jpg',
        alt: { it: 'Progetto per arredamento', en: 'Interior design project' }
      }
    ]
  },
  {
    id: 'other',
    title: { it: 'Altro', en: 'Other inspirations' },
    projects: [
      {
        title: { it: 'Il Piccolo Principe', en: 'The Little Prince' },
        image: 'images/piccolo-principe.jpg',
        alt: { it: 'Progetto ispirato al Piccolo Principe', en: 'Little Prince-inspired project' }
      },
      {
        title: { it: 'Platone', en: 'Plato' },
        image: 'images/platone.jpg',
        alt: { it: 'Progetto ispirato a Platone', en: 'Plato-inspired project' }
      },
      {
        title: { it: 'Bitcoin', en: 'Bitcoin' },
        image: 'images/btc-logo.jpg',
        alt: { it: 'Progetto con simbolo Bitcoin', en: 'Bitcoin symbol project' }
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

/* Apertura e chiusura categorie */

function openCategory(category, card) {
  activeCategory = category;
  lastFocusedElement = card;

  galleryModalTitle.textContent = category.title[currentLanguage];
  renderCategory(category);

  galleryModal.classList.add('is-open');
  galleryModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  galleryModalClose?.focus();
}

function closeCategory() {
  galleryModal.classList.remove('is-open');
  galleryModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  activeCategory = null;

  lastFocusedElement?.focus();
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

/* Progetti della categoria */

function renderCategory(category) {
  if (!modalProjectGrid) return;

  modalProjectGrid.innerHTML = '';

  category.projects.forEach(project => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'modal-project';
    button.setAttribute('aria-label', project.title[currentLanguage]);

    const image = document.createElement('img');
    image.src = project.image;
    image.alt = project.alt[currentLanguage];
    image.loading = 'lazy';

    const caption = document.createElement('p');
    caption.textContent = project.title[currentLanguage];

    button.append(image, caption);
    button.addEventListener('click', () => openLightbox(project));

    modalProjectGrid.appendChild(button);
  });
}

/* Immagine ingrandita */

function openLightbox(project) {
  lightboxImage.src = project.image;
  lightboxImage.alt = project.alt[currentLanguage];
  lightboxCaption.textContent = project.title[currentLanguage];

  imageLightbox.classList.add('is-open');
  imageLightbox.setAttribute('aria-hidden', 'false');
  lightboxClose?.focus();
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

/* Tasto Esc */

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;

  if (imageLightbox?.classList.contains('is-open')) {
    closeLightbox();
  } else if (galleryModal?.classList.contains('is-open')) {
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
