# Arth Setu — Financial Scheme Guide

A student-friendly single-page web application that helps SC beneficiaries discover the right government credit or education loan scheme, understand why it suits them, calculate their EMI, and locate the nearest Channel Partner.

---

## Prerequisites

- Python 3.8 or higher
- pip

---

## Setup

1. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

2. **Configure your Groq API key**

   Copy the example env file and add your key:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set:

   ```
   GROQ_API_KEY=your_key_here
   ```

   Get a free key at: https://console.groq.com

3. **Run the app**

   ```bash
   flask run
   ```

   Or directly:

   ```bash
   python app.py
   ```

4. **Open in browser**

   ```
   http://localhost:5000
   ```

---

## Features

### Smart Scheme Recommender
Enter your project type, estimated cost, annual family income, and whether the loan is for education. A rule-based engine instantly matches you to the right government scheme (Micro Finance, Term Loan, or Educational Loan). A plain-language AI explanation is then fetched via Groq to help you understand why the scheme fits.

### EMI Financial Calculator
Enter loan amount, interest rate, tenure, and moratorium period. The calculator instantly shows your monthly EMI, total interest payable, and total repayment amount — accounting correctly for the moratorium period where only simple interest accrues. A "Pre-fill from Recommender" button copies scheme details straight into the calculator.

### Channel Partner Locator
An interactive map (Leaflet.js + OpenStreetMap) displays mock Channel Partners across India. Filter by partner type (SCA, PSB, RRB, NBFC-MFI) to see relevant markers and partner cards with address, phone, and loan categories.

### English / Hindi Language Toggle
All UI labels can be switched between English and Hindi at any time using the **EN | हिं** button in the navbar. The choice is persisted in `localStorage`.

---

## Project Structure

```
arth-setu/
  app.py                  Flask app — serves the frontend and /api/explain
  requirements.txt        Python dependencies
  .env.example            Template for environment variables
  templates/
    index.html            Single-page frontend
  static/
    style.css             Global stylesheet
    app.js                All frontend logic (i18n, recommender, calculator, map)
    data/
      partners.json       Mock Channel Partner data
```

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | HTML, CSS, Vanilla JavaScript     |
| Backend    | Python + Flask                    |
| AI         | Groq API (llama3-8b-8192)         |
| Map        | Leaflet.js + OpenStreetMap        |
| Languages  | English + Hindi (JS translations) |
