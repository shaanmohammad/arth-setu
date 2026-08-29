# Arth Setu — Hackathon Project Plan

## Top-Level Overview

**Goal:** Build a simple, student-friendly web application that helps SC beneficiaries discover the right government credit/education loan scheme, understand why it suits them, calculate their EMI, and locate the nearest Channel Partner.

**Tech Stack:**
- Frontend: HTML, CSS, Vanilla JS (single HTML file or small set of files)
- Backend: Python + Flask (minimal — 1 API endpoint)
- AI: Groq API (called from Flask to explain the recommended scheme)
- Map: Leaflet.js + OpenStreetMap (no API key required)
- Languages: English + Hindi (static JS translation object with a toggle button)

**Approach:** Single-page application with 4 clearly separated sections — Hero/Landing, Scheme Recommender, EMI Calculator, Partner Locator Map. The Flask backend serves the static frontend files and exposes one endpoint for the Groq explanation call.

**Out of Scope:**
- User authentication or database
- Real/live partner data or NPA filtering
- Mobile app
- Any AI beyond the Groq explanation step

---

## Sub-Tasks

---

### Sub-Task 1 — Project Scaffold & Flask Backend

**Status:** `[x] done`

**Intent:**
Set up the project folder structure, create the Flask app, install dependencies, and wire up the single `/api/explain` endpoint. This is the foundation everything else runs on.

**Expected Outcomes:**
- A working Flask server that serves `index.html` from a `static/` or `templates/` folder
- A `/api/explain` POST endpoint that accepts JSON `{ scheme, income, projectCost, projectType }`, calls Groq API, and returns `{ explanation: "..." }`
- A `.env` file pattern for storing the `GROQ_API_KEY` (not committed)
- A `requirements.txt` with `flask`, `groq`, `python-dotenv`

**Todo List:**
1. Create folder structure:
   ```
   arth-setu/
     app.py
     requirements.txt
     .env              (gitignored)
     templates/
       index.html
     static/
       style.css
       app.js
       data/
         partners.json
   ```
2. Write `app.py`:
   - Load `GROQ_API_KEY` from `.env` using `python-dotenv`
   - Serve `index.html` at route `/`
   - POST `/api/explain`: build a short Groq prompt using the scheme name + user inputs, call `groq.chat.completions.create`, return the explanation as JSON
3. Write the Groq prompt template — instruct it to explain in 3–4 simple sentences why the recommended scheme suits the user, avoid jargon, use plain English (and note that Hindi translation is handled on the frontend separately)
4. Create `requirements.txt` with: `flask`, `groq`, `python-dotenv`
5. Test endpoint with a manual curl/Postman call

**Relevant Context:**
- Groq Python SDK: `from groq import Groq; client = Groq(api_key=...)`
- Model to use: `llama3-8b-8192` (fast, free-tier friendly)
- Keep Flask error handling minimal — just return a 500 with `{ error: "..." }` if Groq fails

---

### Sub-Task 2 — Landing Page & Global Layout

**Status:** `[x] done`

**Intent:**
Build the `index.html` shell — the hero section, navigation links to each section, the EN/HI language toggle, and the global CSS styling. This gives the app its visual identity and navigation structure.

**Expected Outcomes:**
- A clean, single-page layout with a sticky navbar containing section links and a language toggle button (EN | हिं)
- A hero section with the app name "Arth Setu", a tagline, and a "Check Your Scheme" CTA button that scrolls to the recommender
- Four named anchor sections: `#recommender`, `#calculator`, `#locator`
- A JS translation object in `app.js` covering all UI strings in English and Hindi; toggling the button swaps all `data-i18n` attribute elements
- Mobile-responsive layout using CSS flexbox/grid (basic)

**Todo List:**
1. Write the full HTML skeleton in `templates/index.html` with all 4 sections stubbed out (content filled in later sub-tasks)
2. Add a `<nav>` with links to each section and a `<button id="lang-toggle">EN | हिं</button>`
3. Write the hero section HTML (app name, tagline, CTA button)
4. Write `static/style.css` — color scheme (government blue/orange accent), font (system-safe), card styles, button styles, responsive breakpoints
5. In `static/app.js`, create the `translations` object `{ en: {...}, hi: {...} }` covering all UI labels and add `applyLanguage(lang)` function that queries all `[data-i18n]` elements and sets their text
6. Wire the toggle button to call `applyLanguage` and persist the choice in `localStorage`

**Relevant Context:**
- Use `data-i18n="key"` attributes on every user-visible text element
- Keep Hindi translations to the most important labels — full paragraph translations are not required
- No external CSS framework — keep it plain CSS to stay simple

---

### Sub-Task 3 — Smart Scheme Recommender

**Status:** `[x] done`

**Intent:**
Build the form-based scheme recommender. A rule-based JS function maps user inputs to the correct scheme, displays a result card, then calls the Flask `/api/explain` endpoint to fetch and display a Groq-generated plain-language explanation.

**Expected Outcomes:**
- A form with 4 inputs: Project Type (dropdown: Business/Education/Agriculture), Estimated Cost (number), Annual Family Income (number), Education Status (checkbox: is this for education?)
- On submit, a JS rule engine determines the scheme:
  - Education Status checked → **Educational Loan Scheme** (up to ₹20 lakh, 8% p.a.)
  - Cost ≤ ₹1,40,000 AND income ≤ ₹5,00,000 → **Micro Finance Scheme**
  - Cost > ₹1,40,000 AND cost ≤ ₹50,00,000 AND income ≤ ₹5,00,000 → **Term Loan Scheme**
  - Otherwise → **Not Eligible** message
- A result card appears showing: scheme name, max loan limit, interest rate, moratorium period, coverage percentage
- Below the card, a loading spinner appears while the `/api/explain` call is in flight, then the Groq explanation text is rendered

**Todo List:**
1. Write the recommender section HTML in `index.html` — form fields, submit button, result card placeholder, explanation placeholder
2. Add `data-i18n` attributes to all form labels and result card labels
3. Write `recommendScheme(inputs)` function in `app.js` — pure if/else logic returning a scheme object `{ name, maxLoan, rate, moratorium, coverage }`
4. Write the scheme data constants at the top of `app.js` (3 scheme objects with all their fields)
5. On form submit: call `recommendScheme`, render the result card, show spinner, POST to `/api/explain`, render explanation, hide spinner
6. Handle the `/api/explain` error case — show a fallback message "Explanation unavailable. Please try again."
7. Add translations for all scheme names and field labels to the `translations` object

**Relevant Context:**
- Scheme rules sourced directly from the problem statement
- Micro Finance: up to ₹1.40 lakh, ~6.5% p.a., moratorium 3 months
- Term Loan: up to ₹50 lakh, ~8% p.a., moratorium 6 months
- Educational Loan: up to ₹20 lakh, ~8% p.a., moratorium 12 months (or course duration + 1 year)
- The scheme object returned by the rule engine is also what gets sent to `/api/explain`

---

### Sub-Task 4 — EMI Financial Calculator

**Status:** `[x] done`

**Intent:**
Build an interactive EMI calculator that accounts for scheme-specific moratorium periods. Users enter loan amount, annual interest rate, tenure, and moratorium months — the calculator shows monthly EMI and a simple repayment summary.

**Expected Outcomes:**
- A form with: Loan Amount (₹), Annual Interest Rate (%), Loan Tenure (months), Moratorium Period (months)
- A "Calculate" button that instantly (no server call) computes and displays:
  - Monthly EMI amount
  - Total interest payable
  - Total repayment amount
- Moratorium handling: during the moratorium period, only simple interest accrues; EMI starts after the moratorium ends on the combined principal + accrued interest
- All values formatted as Indian Rupees (₹ with Indian number formatting)

**Todo List:**
1. Write the calculator section HTML in `index.html` — 4 input fields, calculate button, results display area
2. Add `data-i18n` attributes to all labels
3. Write `calculateEMI(principal, annualRate, tenureMonths, moratoriumMonths)` in `app.js`:
   - Compute interest accrued during moratorium: `accruedInterest = principal * (annualRate/1200) * moratoriumMonths`
   - Adjusted principal: `P = principal + accruedInterest`
   - Remaining tenure: `n = tenureMonths - moratoriumMonths`
   - Standard EMI formula: `EMI = P * r * (1+r)^n / ((1+r)^n - 1)` where `r = annualRate/1200`
   - Return `{ emi, totalPayable, totalInterest }`
4. Render results in a styled results card
5. Add a "Pre-fill from Recommender" convenience button that copies the recommended loan amount and interest rate into the calculator fields (only shown after a scheme is recommended)
6. Add translations for all calculator labels

**Relevant Context:**
- No server call needed — pure JS math
- Indian number formatting: use `toLocaleString('en-IN')` 

---

### Sub-Task 5 — Geo-Spatial Partner Locator

**Status:** `[x] done`

**Intent:**
Display a Leaflet.js map showing mock Channel Partner locations. The user can filter by partner type (SCA / Bank / NBFC-MFI) and the map updates markers accordingly.

**Expected Outcomes:**
- A Leaflet map centered on India (zoom ~5) rendered in the `#locator` section
- ~10 hardcoded mock partners in `static/data/partners.json`, each with: `name`, `type` (SCA/PSB/RRB/NBFC-MFI), `lat`, `lng`, `address`, `loanCategories` (array), `phone`
- Each partner shown as a map marker; clicking the marker opens a popup with name, type, address, loan categories, and phone
- A filter bar above the map with buttons: All | SCA | Bank | NBFC-MFI — clicking filters visible markers
- A partner list panel below (or beside) the map showing the same filtered partners as cards

**Todo List:**
1. Create `static/data/partners.json` with 10 mock partners spread across different Indian states, covering all 4 partner types
2. Write the locator section HTML — map container `<div id="map">`, filter buttons, partner list container
3. Add Leaflet.js CDN links (`leaflet.css` and `leaflet.js`) in `index.html` `<head>`
4. In `app.js`, write `initMap()` — initialize Leaflet map, fetch `partners.json`, plot all markers with popups
5. Write `filterPartners(type)` — removes all markers, re-plots only matching type (or all if `type === 'all'`)
6. Render partner cards in the list panel from the same filtered data
7. Add `data-i18n` attributes to filter button labels and card field labels
8. Add translations for partner type labels and section headings

**Relevant Context:**
- Leaflet CDN: `https://unpkg.com/leaflet@1.9.4/dist/leaflet.css` and `leaflet.js`
- Use `L.marker([lat, lng]).bindPopup(html).addTo(map)` pattern
- India center coordinates: `[20.5937, 78.9629]`
- Mock partner locations should cover major cities: Delhi, Mumbai, Chennai, Kolkata, Hyderabad, Jaipur, Lucknow, Bhopal

---

### Sub-Task 6 — Integration, Polish & Final Wiring

**Status:** `[x] done`

**Intent:**
Connect all sections together, ensure the language toggle works across every section, add smooth scroll behavior, and do a final pass on visual consistency and usability.

**Expected Outcomes:**
- Language toggle correctly translates all sections including dynamically rendered content (scheme result card, explanation, partner cards)
- "Pre-fill from Recommender" button in the calculator works end-to-end
- Smooth scroll navigation from navbar links
- A simple footer with project name and hackathon credit
- The app runs correctly with `flask run` — one command start

**Todo List:**
1. Audit all dynamically rendered HTML (scheme card, explanation, partner cards) — ensure they apply the current language on render
2. Add `scroll-behavior: smooth` to CSS and verify navbar anchor links work
3. Add footer HTML with app name, tagline, and "Built for Hackathon" note
4. Add translations for footer and any missed strings
5. Write a `README.md` with setup instructions: `pip install -r requirements.txt`, set `GROQ_API_KEY` in `.env`, `flask run`
6. Final visual check — consistent spacing, button hover states, mobile layout on narrow viewport

**Relevant Context:**
- Dynamic content must call `applyLanguage(currentLang)` after rendering to pick up `data-i18n` attributes
- Keep the README short — just environment setup and run command
