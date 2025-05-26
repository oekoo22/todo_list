# Nord ToDo-List

Diese kleine Webanwendung ist eine einfach gehaltene ToDo-Liste. Alle Aufgaben werden lokal im Browser gespeichert, sodass keine Server-Komponenten erforderlich sind.

## Funktionen
- Aufgaben anlegen, bearbeiten, erledigen und löschen
- Aufgaben werden automatisch im `localStorage` gespeichert
- Tastenkürzel: **Strg + Enter** fügt eine neue Aufgabe hinzu
- Schlichtes dunkles Design mithilfe von [Tailwind CSS](https://cdn.jsdelivr.net/npm/tailwindcss) über CDN und eigenen Anpassungen

## Projektstruktur
- `index.html` – Grundgerüst der Seite
- `style.css` – zusätzliche Styles für die Aufgaben und Buttons
- `script.js` – komplette Logik der ToDo-Liste

## Lokale Nutzung
1. Repository klonen
2. `index.html` in einem Browser öffnen (es ist kein Build-Schritt nötig)
3. Aufgaben hinzufügen und verwalten – sie bleiben auch nach einem Neuladen erhalten

Da die Styles über ein CDN geladen werden, wird eine Internetverbindung benötigt, um das Layout korrekt darzustellen.

Viel Spaß beim Organisieren deiner Aufgaben!
