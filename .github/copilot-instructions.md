
---

# 🤖 Copilot Instructions — Nota Spese
agisci come senior engenner.
Sto costruendo un'applicazione per registrare le spese della mia famiglia.
L'applicazione dovrà:

- poter inserire le spese
. avere una lista di spese inserite con la possiblità di fare dei filtri
- poter mostrare dei grafici riassuntivi
- poter gestire le categorie di spesa con la possibilità di inserire, modificare o eliminare.
- poter fare login e logout.
- Dal punto di vista tecnico l'applicazione usa Angular 21 con Material sul Frontend (verificato in `frontend/package.json`). Come backend utilizzo Supabase che gestisce le chiamate e dove ho già creato il database che si chiama spese.
- L'applicazione viene poi deploiata su netlify.
- Il repository è github.

Queste linee guida definiscono **regole architetturali, stilistiche e di sviluppo** per garantire coerenza, scalabilità e qualità del codice.

Devono essere seguite rigorosamente.

---

# 🔴 REGOLE VINCOLANTI (STRICT RULES)

* Usare SEMPRE approccio **mobile-first**
* NON usare mai CSS desktop-first
* Usare SOLO **SCSS**, evitare file `.css`
* NON usare stili inline
* Usare SOLO **Angular standalone components**
* NON usare NgModules
* NON duplicare logica di layout nelle feature
* Tutta la logica di layout deve stare in `/layout`
* NON manipolare il DOM direttamente (no `ElementRef`, salvo casi eccezionali)
* NON usare `!important`

---

# 🧱 ARCHITETTURA

Struttura obbligatoria:

```
app/
├── core/        # servizi globali, interceptor, guard
├── shared/      # componenti riutilizzabili (UI)
├── layout/      # shell, header, sidebar (responsiveness)
├── features/    # logica applicativa
├── models/      # tipi globali
└── routes/      # routing
```

---

# 🧩 STRUTTURA FEATURE

Ogni feature deve seguire questo pattern:

```
features/nome-feature/
  nome-feature.ts
  nome-feature.html
  nome-feature.scss
  components/
    sotto-componente/
```

### Regole:

* Componenti piccoli e focalizzati
* Nessuna logica di layout dentro le feature
* Evitare componenti monolitici

---

# 📱 RESPONSIVE DESIGN

## Regole

* Mobile è il default (senza media query)
* Usare i breakpoint centralizzati
* NON definire breakpoint hardcoded nei componenti

## Breakpoints

```scss
@include respond(tablet) { ... }
@include respond(desktop) { ... }
```

---

## ✅ Pattern corretto

```scss
.card {
  width: 100%;

  @include respond(tablet) {
    width: 50%;
  }

  @include respond(desktop) {
    width: 33%;
  }
}
```

---

# 🧠 LAYOUT

## Regole

* Esiste un solo layout globale (`Shell`)
* Header e Sidebar sono definiti SOLO in `/layout`
* Le feature NON devono gestire layout
* Tutte le pagine passano da `<router-outlet>`

## Comportamento

* Mobile:

  * sidebar nascosta (overlay)
  * attivata con hamburger menu
* Desktop:

  * sidebar visibile (side)
* Padding contenuto:

  * mobile: 16px
  * tablet: 24px
  * desktop: 32px

---

# 🎨 STILI (SCSS)

## Struttura

```
styles/
├── abstracts/   # variabili, mixin, breakpoints
├── base/        # reset, typography
├── layout/      # grid e container
├── components/  # UI condivisa
```

---

## Variabili (design tokens)

```scss
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;

$color-primary: #3b82f6;
$color-bg: #f9fafb;
$color-text: #111827;
```

---

# ⚙️ ANGULAR PATTERNS

* Usare `inject()` invece del constructor injection
* Usare **signals** per stato locale
* Usare servizi per stato condiviso
* Evitare logica nei template
* Usare `OnPush` (quando applicabile)

---

# ❌ ANTI-PATTERN (DA EVITARE)

* CSS globale non controllato
* Uso di `!important`
* Breakpoint duplicati
* Logica di layout dentro le feature
* Accesso diretto al DOM
* Componenti troppo grandi
* Mixing CSS e SCSS

---

# 🎯 OBIETTIVO

Il codice deve essere:

* Scalabile
* Leggibile
* Coerente
* Mobile-first
* Facile da estendere

---

# 📌 NOTA

Quando generi codice:

* Segui SEMPRE queste regole
* Preferisci semplicità e chiarezza
* Mantieni coerenza con la struttura esistente

---

---

## 🧠 Nota finale (importante)

Questa versione è:

* più **prescrittiva** (meno interpretazione)
* più **utile per Copilot**
* allineata a quello che hai già implementato (shell incluso)

Se vuoi fare un ulteriore upgrade, il prossimo passo è:
👉 aggiungere esempi reali del tuo codice (es. shell, una feature)

Così Copilot smette completamente di “inventare”.

---

## Risultato scansione progetto

- **Angular:** rilevata versione `^21.x` (confermata in `frontend/package.json`).
- **Standalone components:** presenti e usati diffusamente (`standalone: true`).
- **NgModule:** non rilevati nel codice (coerente con l'uso di componenti standalone).
- **SCSS:** i componenti usano `styleUrls` con file `.scss`; non sono stati trovati file `.css` nelle sorgenti.
- **`inject()` vs constructor:** uso di `inject()` in più punti (es. `auth.guard.ts`, `shell.ts`).
- **Signals:** usati in alcuni servizi/componenti (`signal(...)`).
- **`ElementRef`:** non rilevato (buona pratica rispettata).
- **`OnPush`:** trovata almeno una occorrenza; valutare di applicarlo dove possibile per performance.

**Raccomandazioni rapide:** aggiungere un breve checklist CI/linter che verifichi `style` `.scss`, assenza di `NgModule`, e l'uso di `inject()`/`signals` quando appropriato.

