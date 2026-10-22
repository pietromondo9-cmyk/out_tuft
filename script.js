/* =========================================
   OUT TUFT — SCRIPT PRINCIPALE
   Lingue, menu mobile e galleria espandibile
   ========================================= */

const languageToggle = document.getElementById('languageToggle');
const menuToggle = document.getElementById('menuToggle');
const desktopNav = document.querySelector('.desktop-nav');
const siteHeader = document.querySelector('.site-header');

let currentLanguage = 'it';
let activeCategory = null;
let lastFocusedElement = null;

/*
  GALLERIA DEI PROGETTI

  Per aggiungere un lavoro:
  1. Carica la nuova immagine nella cartella images del repository.
  2. Aggiungi un nuovo oggetto nella lista "items" della categoria corretta.
  3. Usa il percorso esatto del file, rispettando maiuscole e minuscole.

  Esempio:
  {
    src: 'images/nuovo-lavoro.jpg',
    title: {
      it: 'Il mio nuovo lavoro',
      en: 'My new piece'
    },
    alt: {
      it: 'Descrizione della foto',
      en: 'Photo description'
    }
  }

  Non inserire immagini che non hai ancora caricato.
*/

const galleryData = [
  {
    id: 'pets',
    title: {
      it: 'I tuoi pelosi',
      en: 'Your furry friends'
    },
    description: {
      it: 'Ritratti e ricordi dedicati agli amici a quattro zampe.',
      en: 'Portraits and keepsakes dedicated to our four-legged friends.'
    },
    items: [
      {
        src: 'images/dog2.jpg',
        title: {
          it: 'Un amico speciale',
          en: 'A special friend'
        },
        alt: {
          it: 'Lavoro di tufting con cane',
          en: 'Tufting artwork featuring a dog'
        }
      }

      /*
        AGGIUNGI QUI ALTRI LAVORI DELLA STESSA CATEGORIA.

        Per esempio, dopo la prima immagine, aggiungi una virgola
        e poi un nuovo oggetto con src, title e alt.
      */
    ]
  },

  {
    id: 'anime',
    title: {
      it: 'Anime & pop culture',
      en: 'Anime & pop culture'
    },
    description: {
      it: 'Personaggi, storie e mondi che ispirano i miei lavori.',
      en: 'Characters, stories and worlds that inspire my work.'
    },
    items: [
      {
        src: 'images/rufy2.jpg',
        title: {
          it: 'Rufy',
          en: 'Luffy'
        },
        alt: {
          it: 'Progetto di tufting ispirato a Rufy',
          en: 'Tufting artwork inspired by Luffy'
        }
      }
    ]
  },

  {
    id: 'home',
    title: {
      it: 'Arredi',
      en: 'Home & interiors'
    },
    description: {
      it: 'Idee per portare texture, colore e personalità negli spazi.',
      en: 'Ideas for bringing texture, colour and personality into a space.'
    },
    items: [
      {
        src: 'images/arredo.jpg',
        title: {
          it: 'Un dettaglio per la casa',
          en: 'A detail for the home'
        },
        alt: {
          it: 'Progetto di tufting per arredo',
          en: 'Tufting artwork for the home'
        }
      }
    ]
  },

  {
    id: 'other
