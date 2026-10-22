# Out Tuft — sito vetrina

Sito statico bilingue (italiano/inglese) per Out Tuft, con direzione artistica editoriale, palette materica e forme astratte. Include home, galleria, about, commissioni e link Instagram. Tutte le grafiche della galleria sono segnaposto modificabili.

## File
- `index.html` — contenuti e struttura
- `styles.css` — grafica responsive
- `script.js` — selettore lingua e menu mobile

## Anteprima sul computer
Apri `index.html` con il browser. Non serve installare software.

## Pubblicazione gratuita con Cloudflare Pages (metodo semplice con GitHub)

1. Crea un account gratuito su GitHub: https://github.com/
2. Crea un nuovo repository, per esempio `out-tuft-site`. Se vuoi, rendilo pubblico.
3. Carica nel repository i tre file `index.html`, `styles.css` e `script.js` (puoi anche caricare direttamente il contenuto della cartella).
4. Crea un account Cloudflare gratuito: https://dash.cloudflare.com/
5. Nel pannello Cloudflare vai su **Workers & Pages** → **Create** → **Pages** → collega GitHub.
6. Seleziona il repository `out-tuft-site`.
7. Per un sito HTML semplice, scegli distribuzione tramite repository Git. Se chiede le impostazioni di build:
   - Framework preset: `None`
   - Build command: lascia vuoto
   - Build output directory: `/` oppure la directory radice del progetto, secondo il modulo mostrato.
8. Avvia il deploy. Al termine Cloudflare mostrerà un indirizzo `https://...pages.dev`.

Le etichette dei menu possono cambiare. Se l'interfaccia non corrisponde, consulta la guida ufficiale:
https://developers.cloudflare.com/pages/get-started/git-integration/

## Dominio
L'indirizzo `pages.dev` è gratuito. Un dominio personalizzato come `outtuft.it` in genere richiede un acquisto annuale; non è incluso nel budget di 0 €. Se in futuro possiedi un dominio, puoi aggiungerlo da **Workers & Pages → il progetto → Custom domains**.

## Prima di pubblicare
- Le grafiche della galleria sono segnaposto CSS, non fotografie di prodotti reali.
- Controlla il collegamento Instagram `https://www.instagram.com/out_tuft/`.
- Se cambi nome o account Instagram, aggiorna `index.html`.
- Il sito non contiene un modulo che raccoglie dati: le richieste vengono indirizzate a Instagram.
- I font sono caricati da Google Fonts se c'è connessione; in assenza usa font di sistema.


## Nota sul tono del sito
Il testo presenta Out Tuft come hobby creativo personale, non come servizio continuativo. La disponibilità per eventuali richieste è descritta come occasionale e legata al tempo libero. La formulazione del sito non determina da sola gli obblighi fiscali: se le vendite diventano abituali, verifica la situazione con un commercialista o una fonte ufficiale.


## Versione 5 — direzione grafica alternativa
Palette più decisa (blu elettrico, rosso pomodoro, giallo burro, rosa e lavanda) e font display Syne + Space Grotesk, con DM Mono per le etichette. Il sito resta bilingue e presenta Out Tuft come hobby personale con disponibilità occasionale.
