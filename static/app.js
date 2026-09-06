// ============================================================
//  Arth Setu — Frontend JS
// ============================================================

// ----- Scheme Data (loaded from schemes.json) -----
let SCHEMES = {};
let schemesReady = false;

fetch('/static/data/schemes.json')
  .then(r => r.json())
  .then(data => { SCHEMES = data; schemesReady = true; });

// ----- Translation Dictionary -----
const translations = {
  en: {
    // Navbar
    nav_recommender: 'Scheme Finder',
    nav_calculator:  'EMI Calculator',
    nav_locator:     'Partner Locator',

    // Hero
    hero_title:   'Arth Setu',
    hero_tagline: 'Bridging beneficiaries with the right financial scheme',
    hero_cta:     'Check Your Scheme',

    // Recommender section
    recommender_heading: 'Smart Scheme Recommender',
    recommender_sub:     "Answer a few questions and we'll match you to the right government credit scheme.",

    // Calculator section
    calculator_heading: 'EMI Financial Calculator',
    calculator_sub:     'Estimate your monthly repayment including moratorium period.',

    // Locator section
    locator_sub:     'Find the nearest bank, SCA, or NBFC-MFI in your area.',

    // Shared
    coming_soon: 'Coming soon…',
    calculate_btn:    'Calculate EMI',
    submit_btn:       'Find My Scheme',
    prefill_btn:      'Go to EMI Calculator ↓',
    calc_moratorium_error: 'Moratorium period cannot exceed loan tenure.',
    calc_moratorium_note:  'EMI starts after the moratorium period ends.',

    // Form labels — Recommender
    label_project_type:      'Project Type',
    label_project_cost:      'Estimated Project Cost (₹)',
    label_annual_income:     'Annual Family Income (₹)',
    label_education_status:  'Is this for education?',
    opt_business:            'Business',
    opt_education:           'Education',
    opt_agriculture:         'Agriculture',

    // Form labels — Calculator
    label_loan_amount:       'Loan Amount (₹)',
    label_interest_rate:     'Annual Interest Rate (%)',
    label_tenure:            'Loan Tenure (months)',
    label_moratorium:        'Moratorium Period (months)',

    // Result card labels
    scheme_name:             'Recommended Scheme',
    scheme_max_loan:         'Max Loan Amount',
    scheme_rate:             'Interest Rate (p.a.)',
    scheme_moratorium:       'Moratorium Period',
    scheme_coverage:         'Coverage',
    result_emi:              'Monthly EMI',
    result_total_interest:   'Total Interest',
    result_total_payable:    'Total Payable',

    // Scheme names
    scheme_micro:      'Micro Finance Scheme',
    scheme_aajeevika:  'Aajeevika Micro-Finance Yojana',
    scheme_udyam:      'Udyam Nidhi Yojana',
    scheme_term:       'Term Loan Scheme',
    scheme_education:  'Educational Loan Scheme',
    not_eligible:      'Not Eligible',

    // Partner locator filters
    filter_all:      'All',
    filter_sca:      'SCA',
    filter_psb:      'PSB',
    filter_rrb:      'RRB',
    filter_nbfc:     'NBFC-MFI',
    partner_type:    'Type',
    partner_address: 'Address',
    partner_phone:   'Phone',
    partner_loans:   'Loan Categories',
    locator_heading: 'Find a Channel Partner Near You',  // single definition — earlier duplicate removed

    // Footer
    footer_text:   'Arth Setu',
    footer_credit: 'Built for Hackathon',
    footer_tagline: 'Bridging Beneficiaries with the Right Financial Scheme',
    footer_source:  'Schemes data sourced from NSFDC & NABARD guidelines',

    // Recommender result area
    why_this_scheme:     'Why this scheme?',
    not_eligible_msg:    'Sorry, based on the details provided you do not qualify for any scheme under this programme.',
    not_eligible_title:  'No Scheme Match Found',
    not_eligible_hint:   'Try adjusting your project cost or income, or explore a different project type.',

    // City fallback
    city_fallback_label: 'Enter your city for distance sorting:',
    city_fallback_btn:   'Set Location',

    // Sticky context bar
    context_bar_label: 'Recommended:',

    // Dynamic unit suffixes (used in result card + context bar)
    unit_months:       'months',
    unit_mo_moratorium:'mo. moratorium',
    unit_max:          'max',
    unit_pa:           'p.a.',

    // Explanation area
    explanation_loading: 'Fetching explanation…',
    explanation_error:   'Explanation unavailable. Please try again.',

    // Validation errors — Recommender
    err_cost_required:  'Please enter the estimated project cost.',
    err_cost_positive:  'Project cost must be greater than ₹0.',
    err_income_required:'Please enter your annual family income.',
    err_income_positive:'Annual income must be greater than ₹0.',

    // Validation errors — Calculator
    err_loan_required:       'Please enter the loan amount.',
    err_loan_positive:       'Loan amount must be greater than ₹0.',
    err_rate_required:       'Please enter the annual interest rate.',
    err_rate_positive:       'Interest rate must be greater than 0%.',
    err_tenure_required:     'Please enter the loan tenure.',
    err_tenure_positive:     'Loan tenure must be at least 1 month.',
    err_moratorium_negative: 'Moratorium period cannot be negative.',

    // Feature strip
    feature1_title: 'Match Your Scheme',
    feature1_desc:  'Answer 3 questions, get your best-fit government loan',
    feature2_title: 'Calculate EMI',
    feature2_desc:  'Estimate monthly repayments with moratorium support',
    feature3_title: 'Find Partners',
    feature3_desc:  'Locate the nearest bank or MFI accepting applications',

    // Section eyebrows
    eyebrow_recommender: 'Smart Matching',
    eyebrow_calculator:  'Financial Planning',
    eyebrow_locator:     'Channel Network',

    // Partner cards / map popups
    partner_accepting:     'Accepting Applications',
    partner_not_accepting: 'Not Accepting Applications',
    partner_nearest:     'Nearest to you',
    partner_distance_km: 'Distance',
    partner_schemes_label: 'Schemes',
    partner_away:        'away',
    partner_empty:       'No partners found for this filter.',
    partner_load_error:  'Could not load partner data.',
    partner_view_all:    'View all {n} partners',
    partner_show_less:   'Show less',
    partner_rank:        '#{n} Nearest',
    partner_open_now:    'Open',
    partner_closed_now:  'Closed',
    partner_km_away:     '{n} km away',
    partner_top3_label:  'Top 3 Nearest Partners',

    // Location status
    loc_fetching:    '📡 Detecting your location…',
    loc_sorted:      '📍 Sorted by your current location (nearest first)',
    loc_unavailable: '📍 Location unavailable — partners in default order',
    loc_your_location: 'Your location',

    // Input placeholders
    placeholder_cost:       'e.g. 100000',
    placeholder_income:     'e.g. 300000',
    placeholder_loan:       'e.g. 500000',
    placeholder_rate:       'e.g. 8',
    placeholder_tenure:     'e.g. 60',
    placeholder_moratorium: '0',
    placeholder_city:       'e.g. Mumbai',

    // Hero image alt
    hero_img_alt: 'Students, entrepreneurs and farmers benefiting from government schemes',

    // result card
    result_total_interest: 'Total Interest Payable',
    result_total_payable:  'Total Repayment Amount',
  },

  hi: {
    // Navbar
    nav_recommender: 'योजना खोजें',
    nav_calculator:  'ईएमआई कैलकुलेटर',
    nav_locator:     'भागीदार खोजक',

    // Hero
    hero_title:   'अर्थ सेतु',
    hero_tagline: 'लाभार्थियों को सही वित्तीय योजना से जोड़ना',
    hero_cta:     'अपनी योजना जाँचें',

    // Recommender section
    recommender_heading: 'स्मार्ट योजना सिफारिशकर्ता',
    recommender_sub:     'कुछ सवालों के जवाब दें और हम आपके लिए सही सरकारी ऋण योजना ढूंढेंगे।',

    // Calculator section
    calculator_heading: 'ईएमआई वित्तीय कैलकुलेटर',
    calculator_sub:     'मोरेटोरियम अवधि सहित मासिक किस्त का अनुमान लगाएं।',

    // Locator section
    locator_sub:     'अपने क्षेत्र में निकटतम बैंक, एससीए या एनबीएफसी-एमएफआई खोजें।',

    // Shared
    coming_soon:   'जल्द आ रहा है…',
    calculate_btn: 'ईएमआई गणना करें',
    submit_btn:    'मेरी योजना खोजें',
    prefill_btn:   'सिफारिश से भरें',
    calc_moratorium_error: 'मोरेटोरियम अवधि ऋण अवधि से अधिक नहीं हो सकती।',
    calc_moratorium_note:  'ईएमआई मोरेटोरियम अवधि समाप्त होने के बाद शुरू होती है।',

    // Form labels — Recommender
    label_project_type:      'परियोजना प्रकार',
    label_project_cost:      'अनुमानित परियोजना लागत (₹)',
    label_annual_income:     'वार्षिक पारिवारिक आय (₹)',
    label_education_status:  'क्या यह शिक्षा के लिए है?',
    opt_business:            'व्यवसाय',
    opt_education:           'शिक्षा',
    opt_agriculture:         'कृषि',

    // Form labels — Calculator
    label_loan_amount:   'ऋण राशि (₹)',
    label_interest_rate: 'वार्षिक ब्याज दर (%)',
    label_tenure:        'ऋण अवधि (महीने)',
    label_moratorium:    'मोरेटोरियम अवधि (महीने)',

    // Result card labels
    scheme_name:           'अनुशंसित योजना',
    scheme_max_loan:       'अधिकतम ऋण राशि',
    scheme_rate:           'ब्याज दर (प्रति वर्ष)',
    scheme_moratorium:     'मोरेटोरियम अवधि',
    scheme_coverage:       'कवरेज',
    result_emi:            'मासिक ईएमआई',
    result_total_interest: 'कुल ब्याज',
    result_total_payable:  'कुल देय राशि',

    // Scheme names
    scheme_micro:      'माइक्रो फाइनेंस योजना',
    scheme_aajeevika:  'आजीविका माइक्रो-फाइनेंस योजना',
    scheme_udyam:      'उद्यम निधि योजना',
    scheme_term:       'टर्म लोन योजना',
    scheme_education:  'शैक्षिक ऋण योजना',
    not_eligible:      'पात्र नहीं',

    // Partner locator filters
    filter_all:      'सभी',
    filter_sca:      'एससीए',
    filter_psb:      'पीएसबी',
    filter_rrb:      'आरआरबी',
    filter_nbfc:     'एनबीएफसी-एमएफआई',
    partner_type:    'प्रकार',
    partner_address: 'पता',
    partner_phone:   'फोन',
    partner_loans:   'ऋण श्रेणियाँ',
    locator_heading: 'अपने निकटतम चैनल भागीदार खोजें',  // single definition — earlier duplicate removed

    // Footer
    footer_text:   'अर्थ सेतु',
    footer_credit: 'हैकाथॉन के लिए निर्मित',
    footer_tagline: 'लाभार्थियों को सही वित्तीय योजना से जोड़ना',
    footer_source:  'योजना डेटा NSFDC और NABARD दिशानिर्देशों से',

    // Recommender result area
    why_this_scheme:     'यह योजना क्यों?',
    not_eligible_msg:    'क्षमा करें, दिए गए विवरण के आधार पर आप इस कार्यक्रम की किसी भी योजना के लिए पात्र नहीं हैं।',
    not_eligible_title:  'कोई योजना नहीं मिली',
    not_eligible_hint:   'अपनी परियोजना लागत या आय समायोजित करें, या कोई अलग परियोजना प्रकार आज़माएं।',

    // City fallback
    city_fallback_label: 'दूरी क्रमबद्ध करने के लिए अपना शहर दर्ज करें:',
    city_fallback_btn:   'स्थान सेट करें',

    // Sticky context bar
    context_bar_label: 'अनुशंसित:',

    // Dynamic unit suffixes (used in result card + context bar)
    unit_months:       'महीने',
    unit_mo_moratorium:'मो. मोरेटोरियम',
    unit_max:          'अधिकतम',
    unit_pa:           'प्रति वर्ष',

    // Explanation area
    explanation_loading: 'स्पष्टीकरण लोड हो रहा है…',
    explanation_error:   'स्पष्टीकरण अनुपलब्ध। कृपया पुनः प्रयास करें।',

    // Validation errors — Recommender
    err_cost_required:  'कृपया अनुमानित परियोजना लागत दर्ज करें।',
    err_cost_positive:  'परियोजना लागत ₹0 से अधिक होनी चाहिए।',
    err_income_required:'कृपया अपनी वार्षिक पारिवारिक आय दर्ज करें।',
    err_income_positive:'वार्षिक आय ₹0 से अधिक होनी चाहिए।',

    // Validation errors — Calculator
    err_loan_required:       'कृपया ऋण राशि दर्ज करें।',
    err_loan_positive:       'ऋण राशि ₹0 से अधिक होनी चाहिए।',
    err_rate_required:       'कृपया वार्षिक ब्याज दर दर्ज करें।',
    err_rate_positive:       'ब्याज दर 0% से अधिक होनी चाहिए।',
    err_tenure_required:     'कृपया ऋण अवधि दर्ज करें।',
    err_tenure_positive:     'ऋण अवधि कम से कम 1 महीना होनी चाहिए।',
    err_moratorium_negative: 'मोरेटोरियम अवधि नकारात्मक नहीं हो सकती।',

    // Feature strip
    feature1_title: 'अपनी योजना खोजें',
    feature1_desc:  '3 सवालों के जवाब दें, सबसे उपयुक्त सरकारी ऋण पाएं',
    feature2_title: 'ईएमआई गणना करें',
    feature2_desc:  'मोरेटोरियम सहित मासिक किस्त का अनुमान लगाएं',
    feature3_title: 'भागीदार खोजें',
    feature3_desc:  'निकटतम बैंक या एमएफआई जो आवेदन स्वीकार कर रहा हो',

    // Section eyebrows
    eyebrow_recommender: 'स्मार्ट मिलान',
    eyebrow_calculator:  'वित्तीय योजना',
    eyebrow_locator:     'चैनल नेटवर्क',

    // Partner cards / map popups
    partner_accepting:     'आवेदन स्वीकार कर रहे हैं',
    partner_not_accepting: 'आवेदन स्वीकार नहीं एप्लीकेशन',
    partner_nearest:       'आपके सबसे निकट',
    partner_distance_km:   'दूरी',
    partner_schemes_label: 'योजनाएं',
    partner_away:          'दूर',
    partner_empty:         'इस फ़िल्टर के लिए कोई भागीदार नहीं मिला।',
    partner_load_error:    'भागीदार डेटा लोड नहीं हो सका।',
    partner_view_all:      'सभी {n} भागीदार देखें',
    partner_show_less:     'कम दिखाएं',
    partner_rank:          '#{n} निकटतम',
    partner_open_now:      'खुला',
    partner_closed_now:    'बंद',
    partner_km_away:       '{n} किमी दूर',
    partner_top3_label:    'शीर्ष 3 निकटतम भागीदार',

    // Location status
    loc_fetching:    '📡 आपका स्थान पता लगाया जा रहा है…',
    loc_sorted:      '📍 आपके वर्तमान स्थान के अनुसार क्रमबद्ध (निकटतम पहले)',
    loc_unavailable: '📍 स्थान अनुपलब्ध — भागीदार डिफ़ॉल्ट क्रम में',
    loc_your_location: 'आपका स्थान',

    // Input placeholders
    placeholder_cost:       'जैसे 100000',
    placeholder_income:     'जैसे 300000',
    placeholder_loan:       'जैसे 500000',
    placeholder_rate:       'जैसे 8',
    placeholder_tenure:     'जैसे 60',
    placeholder_moratorium: '0',
    placeholder_city:       'जैसे मुंबई',

    // Hero image alt
    hero_img_alt: 'छात्र, उद्यमी और किसान सरकारी योजनाओं से लाभान्वित',

    // result card
    result_total_interest: 'कुल देय ब्याज',
    result_total_payable:  'कुल पुनर्भुगतान राशि',
  },
};

// ----- Partner Locator -----
let map = null;
let markers = [];
let allPartners = [];
let currentTypeFilter = 'all';   // institution-type chip selection
let userCoords = null;           // { lat, lng } from geolocation, null if unavailable

// Haversine distance in km between two lat/lng pairs
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// schemeId: filter to partners supporting this scheme (null = no scheme filter)
// typeFilter: institution type chip ('all', 'SCA', 'PSB', etc.)
function renderPartners(typeFilter, schemeId) {
  currentTypeFilter = typeFilter ?? currentTypeFilter;
  const activeScheme = schemeId !== undefined ? schemeId : (currentScheme ? currentScheme.id : null);

  // Remove existing markers from map
  markers.forEach(m => m.remove());
  markers = [];

  let filtered = allPartners;

  // Layer 1 — scheme filter (from recommendation)
  if (activeScheme) {
    filtered = filtered.filter(p => p.schemeIds.includes(activeScheme));
  }

  // Layer 2 — institution type chip
  if (currentTypeFilter !== 'all') {
    filtered = filtered.filter(p => p.type === currentTypeFilter);
  }

  // Sort by distance if we have user coords
  if (userCoords) {
    filtered = filtered.map(p => ({
      ...p,
      distKm: haversineKm(userCoords.lat, userCoords.lng, p.lat, p.lng),
    })).sort((a, b) => a.distKm - b.distKm);
  }

  // Guard: map must be initialized before adding markers
  if (!map) return;

  const nearestIcon = L.divIcon({
    className: '',
    html: '<div class="map-marker-nearest">★</div>',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -34],
  });

  const defaultIcon = L.divIcon({
    className: '',
    html: '<div class="map-marker-default">●</div>',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -26],
  });

  // Place user location dot if coords available
  const t0 = translations[currentLang];
  if (userCoords) {
    const userIcon = L.divIcon({
      className: '',
      html: '<div class="map-marker-user">◉</div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
    L.marker([userCoords.lat, userCoords.lng], { icon: userIcon, zIndexOffset: 2000 })
      .bindTooltip(t0.loc_your_location, { permanent: false })
      .addTo(map);
  }

  // Add markers — filtered[0] is nearest when userCoords is set
  filtered.forEach((partner, idx) => {
    const isNearest = userCoords && idx === 0;
    const schemeTags = partner.schemeIds.map(id => `<span class="loan-tag">${id}</span>`).join(' ');
    const statusBadge = partner.acceptingApplications
      ? `<span class="status-badge status-badge--open">${t0.partner_accepting}</span>`
      : `<span class="status-badge status-badge--closed">${t0.partner_not_accepting}</span>`;
    const distLine = partner.distKm != null
      ? `<b>${t0.partner_distance_km}:</b> ${partner.distKm < 10 ? partner.distKm.toFixed(1) : Math.round(partner.distKm)} km<br/>`
      : '';
    const nearestLabel = isNearest ? `<div class="popup-nearest-label">📍 ${t0.partner_nearest}</div>` : '';
    const popupHtml = `
      <div class="partner-popup">
        ${nearestLabel}
        <strong>${partner.name}</strong><br/>
        <span class="popup-type popup-type--${partner.type.replace('-','').toLowerCase()}">${partner.type}</span>
        &nbsp;${statusBadge}<br/>
        📍 ${partner.city}<br/>
        ${distLine}
        📞 ${partner.phone}<br/>
        <b>${t0.partner_schemes_label}:</b> ${schemeTags}
      </div>`;
    const marker = L.marker([partner.lat, partner.lng], {
      icon: isNearest ? nearestIcon : defaultIcon,
      zIndexOffset: isNearest ? 1000 : 0,
    }).bindPopup(popupHtml).addTo(map);
    markers.push(marker);

    // Pan to nearest and open its popup automatically
    if (isNearest) {
      map.setView([partner.lat, partner.lng], 8, { animate: true });
      marker.openPopup();
    }
  });

  // Render partner cards
  const listEl = document.getElementById('partner-list');
  if (!listEl) return;

  const t1 = translations[currentLang];
  if (filtered.length === 0) {
    listEl.innerHTML = `<p class="partner-empty">${t1.partner_empty}</p>`;
    return;
  }

  function fmtDist(p) {
    if (p.distKm == null) return '';
    const d = p.distKm < 10 ? p.distKm.toFixed(1) : Math.round(p.distKm);
    return t1.partner_km_away.replace('{n}', d);
  }

  // All cards use the same featured design; rank badge only shown for top 3
  function buildCard(p, rank) {
    const typeSlug  = p.type.replace('-','').toLowerCase();
    const isOpen    = p.acceptingApplications;
    const dist      = fmtDist(p);
    const rankBadge = rank <= 3
      ? `<div class="pcard-rank">${t1.partner_rank.replace('{n}', rank)}</div>`
      : '';
    return `
    <div class="pcard-featured pcard-featured--${typeSlug}${isOpen ? '' : ' pcard-featured--closed'}">
      ${rankBadge}
      <div class="pcard-top">
        <div class="pcard-name">${p.name}</div>
        <span class="partner-badge partner-badge--${typeSlug}">${p.type}</span>
      </div>
      <div class="pcard-meta">
        <span class="pcard-meta-item">📍 ${p.city}</span>
        ${dist ? `<span class="pcard-dist">${dist}</span>` : ''}
      </div>
      <div class="pcard-status pcard-status--${isOpen ? 'open' : 'closed'}">
        ${isOpen
          ? `<span class="pcard-dot pcard-dot--open"></span>${t1.partner_accepting}`
          : `<span class="pcard-dot pcard-dot--closed"></span>${t1.partner_not_accepting}`}
      </div>
      <div class="pcard-phone">📞 ${p.phone}</div>
      <div class="pcard-schemes">
        <span class="loan-tag-label">${t1.partner_schemes_label}</span>
        ${p.schemeIds.map(id => `<span class="loan-tag">${id}</span>`).join('')}
      </div>
    </div>`;
  }

  const top3 = filtered.slice(0, 3);
  const rest  = filtered.slice(3);

  // Always show top 3
  const featuredHtml = `
    <div class="partner-section-label">${t1.partner_top3_label}</div>
    <div class="partner-featured-row">
      ${top3.map((p, i) => buildCard(p, i + 1)).join('')}
    </div>`;

  // Rest hidden behind expand button — same card style, no rank badge
  const restHtml = rest.length > 0 ? `
    <div class="partner-expand-bar">
      <button class="partner-expand-btn" id="partner-expand-btn">
        ${t1.partner_view_all.replace('{n}', filtered.length)}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div class="partner-rest hidden" id="partner-rest">
      <div class="partner-featured-row">
        ${rest.map((p, i) => buildCard(p, i + 4)).join('')}
      </div>
      <div class="partner-expand-bar">
        <button class="partner-expand-btn partner-expand-btn--less" id="partner-collapse-btn">
          ${t1.partner_show_less}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 10l4-4 4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>` : '';

  listEl.innerHTML = featuredHtml + restHtml;

  // Wire expand / collapse buttons
  const expandBtn   = document.getElementById('partner-expand-btn');
  const collapseBtn = document.getElementById('partner-collapse-btn');
  const restPanel   = document.getElementById('partner-rest');
  if (expandBtn && restPanel) {
    expandBtn.addEventListener('click', () => {
      restPanel.classList.remove('hidden');
      expandBtn.closest('.partner-expand-bar').classList.add('hidden');
      // Animate newly visible cards
      restPanel.querySelectorAll('.pcard-featured').forEach((card, i) => {
        card.style.transitionDelay = (i * 80) + 'ms';
        requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('card-visible')));
      });
      restPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
  if (collapseBtn && restPanel) {
    collapseBtn.addEventListener('click', () => {
      restPanel.classList.add('hidden');
      if (expandBtn) expandBtn.closest('.partner-expand-bar').classList.remove('hidden');
    });
  }

  // Apply current language so newly rendered data-i18n elements get translated
  applyLanguage(currentLang);

  // Animate top-3 featured cards
  animatePartnerCards();
}

function setLocationStatus(state) {
  // state: 'fetching' | 'sorted' | 'unavailable'
  const el = document.getElementById('location-status');
  if (!el) return;
  const t = translations[currentLang];
  const msgs = {
    fetching:    { text: t.loc_fetching,    cls: 'loc-fetching'   },
    sorted:      { text: t.loc_sorted,      cls: 'loc-sorted'     },
    unavailable: { text: t.loc_unavailable, cls: 'loc-unavailable'},
  };
  const m = msgs[state];
  if (!m) return;
  el.textContent  = m.text;
  el.className    = 'location-status ' + m.cls;
  el.classList.remove('hidden');
}

function initMap() {
  if (map) return;  // already initialised
  map = L.map('map').setView([20.5937, 78.9629], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  // Show "fetching" immediately so the user knows location is being requested
  setLocationStatus('fetching');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        userCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        document.getElementById('city-fallback-row').classList.add('hidden');
        setLocationStatus('sorted');
        // Re-render preserving current scheme + type filters — pass no explicit schemeId
        // so renderPartners derives it from currentScheme (already set if recommendation happened)
        renderPartners(currentTypeFilter);
      },
      () => {
        // Permission denied — show city fallback and update status
        setLocationStatus('unavailable');
        document.getElementById('city-fallback-row').classList.remove('hidden');
      },
      { timeout: 8000, maximumAge: 60000 }
    );
  } else {
    setLocationStatus('unavailable');
    document.getElementById('city-fallback-row').classList.remove('hidden');
  }

  fetch('/static/data/partners.json')
    .then(res => res.json())
    .then(data => {
      allPartners = data;
      // Render preserving whatever filters/scheme are already active.
      // Do NOT pass schemeId=null — let renderPartners derive it from currentScheme.
      renderPartners(currentTypeFilter);
    })
    .catch(() => {
      const listEl = document.getElementById('partner-list');
      if (listEl) listEl.innerHTML = `<p class="partner-empty">${translations[currentLang].partner_load_error}</p>`;
    });
}

// ----- EMI Calculator -----
/**
 * Calculates EMI accounting for a moratorium period.
 * During moratorium, simple interest accrues on the principal;
 * EMI then runs on the adjusted principal for the remaining tenure.
 *
 * @param {number} principal        - Loan amount in ₹
 * @param {number} annualRate       - Annual interest rate in %
 * @param {number} tenureMonths     - Total loan tenure in months
 * @param {number} moratoriumMonths - Moratorium period in months (default 0)
 * @returns {{ emi: number, totalPayable: number, totalInterest: number } | { error: string }}
 */
function calculateEMI(principal, annualRate, tenureMonths, moratoriumMonths) {
  const n = tenureMonths - moratoriumMonths;
  if (n <= 0) {
    return { error: 'moratorium_exceeds_tenure' };
  }

  const r = annualRate / 1200;  // monthly rate

  // Simple interest accrues during moratorium
  const accruedInterest = principal * r * moratoriumMonths;
  const P = principal + accruedInterest;  // adjusted principal

  let emi;
  if (r === 0) {
    // Zero-interest edge case
    emi = P / n;
  } else {
    const factor = Math.pow(1 + r, n);
    emi = (P * r * factor) / (factor - 1);
  }

  const totalPayable = emi * n;
  const totalInterest = totalPayable - principal;

  return { emi, totalPayable, totalInterest };
}

// ----- Rule Engine -----
/**
 * Returns a scheme object or null (not eligible).
 * @param {{ projectType: string, cost: number, income: number }} inputs
 */
function recommendScheme({ projectType, cost, income }) {
  const type = projectType.toLowerCase();

  // Helper: checks a scheme's cost bounds, income limit, and projectType eligibility.
  // minProjectCost is optional (defaults to 0); all other fields are required.
  function matches(scheme) {
    if (!scheme) return false;
    if (!scheme.eligibility.projectType.includes(type)) return false;
    if (income > scheme.eligibility.maxAnnualIncome) return false;
    const min = scheme.minProjectCost || 0;
    return cost >= min && cost <= scheme.maxProjectCost;
  }

  // 1. Education → always its own branch regardless of cost
  if (matches(SCHEMES.edu)) return SCHEMES.edu;

  // 2. Micro (business/agri, cost ≤ ₹1.25L loan cap / ₹1.40L project cap)
  if (matches(SCHEMES.micro)) return SCHEMES.micro;

  // 3. Aajeevika (business/agri, same cost bracket as micro but higher-rate programme)
  //    Reached only if micro did not match — both share the same caps so in practice
  //    micro always wins this band. Aajeevika is kept for completeness / future selector.
  if (matches(SCHEMES.aajeevika)) return SCHEMES.aajeevika;

  // 4. Udyam Nidhi (business/agri, ₹1.25L < cost ≤ ₹5L)
  if (matches(SCHEMES.udyam)) return SCHEMES.udyam;

  // 5. Term Loan (business/agri, ₹5L < cost ≤ ₹50L)
  if (matches(SCHEMES.term)) return SCHEMES.term;

  return null;
}

// Maps scheme.id → translation key for the scheme's display name
const schemeNameKey = {
  micro:      'scheme_micro',
  aajeevika:  'scheme_aajeevika',
  udyam:      'scheme_udyam',
  term:       'scheme_term',
  edu:        'scheme_education',
};

// ----- Active recommended scheme (set on form submit) -----
let currentScheme = null;
let currentExplanation = { en: '', hi: '' };  // both languages stored after Groq responds

// ----- Language State -----
let currentLang = localStorage.getItem('arth-setu-lang') || 'en';

// ----- applyLanguage -----
function applyLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // Handle attribute translations (e.g. data-i18n-attr="alt:hero_img_alt")
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const pairs = el.getAttribute('data-i18n-attr').split(',');
    pairs.forEach(pair => {
      const [attr, key] = pair.trim().split(':');
      if (attr && key && dict[key] !== undefined) {
        el.setAttribute(attr, dict[key]);
      }
    });
  });

  // Hero title: manually render with accent span to preserve orange colour
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && dict.hero_title) {
    const parts = dict.hero_title.split(' ');
    const first = parts.slice(0, -1).join(' ');
    const last  = parts[parts.length - 1];
    heroTitle.innerHTML = first + ' <span class="hero-title-accent">' + last + '</span>';
  }

  // Update the lang toggle button label
  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.textContent = lang === 'en' ? 'EN | हिं' : 'HI | EN';
  }

  // Swap explanation text if a bilingual explanation is already loaded
  const explanationEl = document.getElementById('explanation-text');
  if (explanationEl && (currentExplanation.en || currentExplanation.hi)) {
    const text = currentExplanation[lang] || currentExplanation.en || currentExplanation.hi;
    if (text) explanationEl.textContent = text;
  }

  // Re-render dynamic result-card and context-bar fields if a scheme is active
  if (currentScheme) {
    const schemeName = dict[schemeNameKey[currentScheme.id]] || currentScheme.name;
    const schemeNameEl = document.getElementById('result-scheme-name');
    if (schemeNameEl) schemeNameEl.textContent = schemeName;

    const rateEl = document.getElementById('result-rate');
    if (rateEl) rateEl.textContent = currentScheme.rate + '% ' + dict.unit_pa;

    const moraEl = document.getElementById('result-moratorium');
    if (moraEl) moraEl.textContent = currentScheme.moratoriumMonths + ' ' + dict.unit_months;

    const ctxNameEl = document.getElementById('ctx-scheme-name');
    if (ctxNameEl) ctxNameEl.textContent = schemeName;

    const ctxRateEl = document.getElementById('ctx-rate');
    if (ctxRateEl) ctxRateEl.textContent = currentScheme.rate + '% ' + dict.unit_pa;

    const ctxMaxEl = document.getElementById('ctx-max-loan');
    if (ctxMaxEl) {
      const loanFmt = '₹' + currentScheme.maxLoan.toLocaleString('en-IN');
      ctxMaxEl.textContent = loanFmt + ' ' + dict.unit_max;
    }

    const ctxMoraEl = document.getElementById('ctx-moratorium');
    if (ctxMoraEl) ctxMoraEl.textContent = currentScheme.moratoriumMonths + ' ' + dict.unit_mo_moratorium;
  }

  // Update input placeholders
  const placeholderMap = {
    'project-cost':        dict.placeholder_cost,
    'annual-income':       dict.placeholder_income,
    'calc-loan-amount':    dict.placeholder_loan,
    'calc-interest-rate':  dict.placeholder_rate,
    'calc-tenure':         dict.placeholder_tenure,
    'calc-moratorium':     dict.placeholder_moratorium,
    'city-fallback-input': dict.placeholder_city,
  };
  Object.entries(placeholderMap).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.placeholder = val;
  });

  // Update hero image alt
  const heroImg = document.querySelector('.hero-image');
  if (heroImg && dict.hero_img_alt) heroImg.alt = dict.hero_img_alt;

  // Re-render location status bar if visible
  const locEl = document.getElementById('location-status');
  if (locEl && !locEl.classList.contains('hidden')) {
    const cls = [...locEl.classList].find(c => c.startsWith('loc-') && c !== 'location-status');
    if (cls === 'loc-fetching')    setLocationStatus('fetching');
    else if (cls === 'loc-sorted') setLocationStatus('sorted');
    else                           setLocationStatus('unavailable');
  }

  // Update <html lang> attribute for accessibility
  document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
}

// ----- Scroll-reveal helper -----
function initScrollReveal() {
  // Mark elements that should animate on scroll
  const revealSelectors = [
    '.section-eyebrow',
    '.section-title-row',
    '.section-sub',
    '.scheme-form',
    '.section-inner h2',
    '#feature-strip .feature-cards',
    '.partner-filter-bar',
    '#map',
    '#footer p',
  ];

  // Attach .reveal class to each target
  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', (i * 80) + 'ms');
    });
  });

  // Feature cards get their own stagger
  document.querySelectorAll('.feature-card').forEach((el, i) => {
    el.style.setProperty('--reveal-delay', (i * 120) + 'ms');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.12 });

  // Observe reveal elements
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Observe feature cards separately
  document.querySelectorAll('.feature-card').forEach(el => {
    el.classList.add('reveal'); // reuse same visible logic
    observer.observe(el);
  });
}

// Stagger-animate the top-3 featured cards (rest panel is hidden until expanded)
function animatePartnerCards() {
  // Select only the first .partner-featured-row (the always-visible top-3 row)
  const topRow = document.querySelector('#partner-list .partner-featured-row');
  if (!topRow) return;
  topRow.querySelectorAll('.pcard-featured').forEach((card, i) => {
    card.style.transitionDelay = (i * 100) + 'ms';
    requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('card-visible')));
  });
}

// ----- Language Toggle -----
document.addEventListener('DOMContentLoaded', () => {
  // ----- Partner Locator Init -----
  initMap();

  // ----- Scroll-reveal -----
  initScrollReveal();

  // ----- Filter Bar -----
  document.querySelectorAll('.btn-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Pass the new type filter; scheme filter is derived from currentScheme inside renderPartners
      renderPartners(btn.getAttribute('data-filter'));
    });
  });

  // ----- City Fallback for Partner Distance -----
  const cityInput  = document.getElementById('city-fallback-input');
  const cityButton = document.getElementById('city-fallback-btn');
  if (cityButton && cityInput) {
    cityButton.addEventListener('click', () => {
      const typed = cityInput.value.trim().toLowerCase();
      if (!typed) return;
      // Find a partner whose city matches the typed name (case-insensitive)
      const match = allPartners.find(p => p.city.toLowerCase() === typed);
      if (match) {
        userCoords = { lat: match.lat, lng: match.lng };
        cityInput.classList.remove('input-error');
        document.getElementById('city-fallback-msg').textContent = '';
        setLocationStatus('sorted');
        renderPartners(currentTypeFilter);
      } else {
        cityInput.classList.add('input-error');
        document.getElementById('city-fallback-msg').textContent =
          currentLang === 'hi'
            ? 'शहर नहीं मिला। उपलब्ध: ' + allPartners.map(p => p.city).join(', ')
            : 'City not found. Available: ' + allPartners.map(p => p.city).join(', ');
      }
    });
    // Also submit on Enter key
    cityInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); cityButton.click(); }
    });
  }

  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = currentLang === 'en' ? 'hi' : 'en';
      localStorage.setItem('arth-setu-lang', next);
      applyLanguage(next);
      // Re-render partner cards so dynamic text (badges, distance, status) switches language
      if (allPartners.length > 0) renderPartners(currentTypeFilter);
    });
  }

  // Apply saved (or default) language on load
  applyLanguage(currentLang);

  // ----- Recommender Form Submit -----
  const form = document.getElementById('recommender-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const projectType  = document.getElementById('project-type').value;
      const costRaw      = document.getElementById('project-cost').value.trim();
      const incomeRaw    = document.getElementById('annual-income').value.trim();
      const cost         = parseFloat(costRaw);
      const income       = parseFloat(incomeRaw);

      const t = translations[currentLang];

      // --- Per-field validation ---
      let hasError = false;

      const errCost   = document.getElementById('err-project-cost');
      const errIncome = document.getElementById('err-annual-income');
      const errBanner = document.getElementById('recommender-error');

      // Reset previous errors
      [errCost, errIncome].forEach(el => { el.textContent = ''; el.classList.add('hidden'); el.closest('.form-group').querySelector('input').classList.remove('input-error'); });
      errBanner.classList.add('hidden');

      if (costRaw === '' || isNaN(cost)) {
        errCost.textContent = t.err_cost_required;
        errCost.classList.remove('hidden');
        document.getElementById('project-cost').classList.add('input-error');
        hasError = true;
      } else if (cost <= 0) {
        errCost.textContent = t.err_cost_positive;
        errCost.classList.remove('hidden');
        document.getElementById('project-cost').classList.add('input-error');
        hasError = true;
      }

      if (incomeRaw === '' || isNaN(income)) {
        errIncome.textContent = t.err_income_required;
        errIncome.classList.remove('hidden');
        document.getElementById('annual-income').classList.add('input-error');
        hasError = true;
      } else if (income <= 0) {
        errIncome.textContent = t.err_income_positive;
        errIncome.classList.remove('hidden');
        document.getElementById('annual-income').classList.add('input-error');
        hasError = true;
      }

      if (hasError) return;

      // Guard: schemes.json must be loaded before the rule engine can work
      if (!schemesReady) {
        errBanner.textContent = currentLang === 'hi'
          ? 'डेटा लोड हो रहा है, कृपया एक क्षण रुकें और पुनः प्रयास करें।'
          : 'Still loading scheme data — please wait a moment and try again.';
        errBanner.classList.remove('hidden');
        return;
      }

      const resultCard    = document.getElementById('scheme-result');
      const notEligible   = document.getElementById('not-eligible-msg');
      const prefillBtn    = document.getElementById('prefill-btn');
      const spinner       = document.getElementById('explanation-spinner');
      const explanationEl = document.getElementById('explanation-text');

      const scheme = recommendScheme({ projectType, cost, income });

      if (!scheme) {
        // Not eligible — show message, hide result card AND context bar
        notEligible.classList.remove('hidden');
        resultCard.classList.add('hidden');
        prefillBtn.classList.add('hidden');
        currentScheme = null;
        document.getElementById('scheme-context-bar').classList.add('hidden');
        renderPartners(currentTypeFilter, null);   // reset partner list to unfiltered
        return;
      }

      // Scheme found — populate and show result card
      currentScheme = scheme;
      notEligible.classList.add('hidden');

      const tNow = translations[currentLang];
      document.getElementById('result-scheme-name').textContent = tNow[schemeNameKey[scheme.id]] || scheme.name;
      document.getElementById('result-max-loan').textContent    = '₹' + scheme.maxLoan.toLocaleString('en-IN');
      document.getElementById('result-rate').textContent        = scheme.rate + '% ' + tNow.unit_pa;
      document.getElementById('result-moratorium').textContent  = scheme.moratoriumMonths + ' ' + tNow.unit_months;
      document.getElementById('result-coverage').textContent    = scheme.coveragePercent + '%';
      document.getElementById('result-description').textContent = scheme.description;

      // --- Auto-fill EMI Calculator (Module 1 → Module 2) ---
      // Moratorium is INCLUDED within total tenure (e.g. 36-month scheme: 3 mo moratorium + 33 mo EMI)
      const loanAmount = Math.min(cost, scheme.maxLoan);
      document.getElementById('calc-loan-amount').value   = loanAmount;
      document.getElementById('calc-interest-rate').value = scheme.rate;
      document.getElementById('calc-tenure').value        = scheme.tenureMonths;      // total loan life
      document.getElementById('calc-moratorium').value    = scheme.moratoriumMonths;  // subset of tenure

      // --- Update sticky context bar (Module 1 → cross-section) ---
      const loanFmt = '₹' + scheme.maxLoan.toLocaleString('en-IN');
      document.getElementById('ctx-scheme-name').textContent = tNow[schemeNameKey[scheme.id]] || scheme.name;
      document.getElementById('ctx-max-loan').textContent    = loanFmt + ' ' + tNow.unit_max;
      document.getElementById('ctx-rate').textContent        = scheme.rate + '% ' + tNow.unit_pa;
      document.getElementById('ctx-moratorium').textContent  = scheme.moratoriumMonths + ' ' + tNow.unit_mo_moratorium;
      document.getElementById('scheme-context-bar').classList.remove('hidden');

      // --- Re-render partner locator to filter by recommended scheme (Module 1 → Module 3) ---
      renderPartners(currentTypeFilter, scheme.id);
      // Reset type filter chips to 'All' so the scheme filter is the only active filter
      document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
      const allChip = document.querySelector('.btn-filter[data-filter="all"]');
      if (allChip) allChip.classList.add('active');

      explanationEl.textContent = '';
      currentExplanation = { en: '', hi: '' };  // clear stale bilingual cache
      spinner.classList.remove('hidden');
      resultCard.classList.remove('hidden');
      prefillBtn.classList.add('hidden');

      // Call /api/explain
      try {
        const response = await fetch('/api/explain', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({
            schemeId:    scheme.id,
            income:      income,
            projectCost: cost,
            projectType: projectType,
          }),
        });

        if (!response.ok) throw new Error('Server error');
        const data = await response.json();
        spinner.classList.add('hidden');
        if (data.en && data.hi) {
          // Bilingual response — store both, display the current language
          currentExplanation = { en: data.en, hi: data.hi };
          explanationEl.textContent = currentExplanation[currentLang] || data.en;
        } else {
          // Fallback: single explanation (old format or partial)
          const text = data.en || data.explanation || translations[currentLang].explanation_error;
          currentExplanation = { en: text, hi: text };
          explanationEl.textContent = text;
        }
      } catch (_) {
        spinner.classList.add('hidden');
        currentExplanation = { en: '', hi: '' };
        explanationEl.textContent = translations[currentLang].explanation_error;
      }

      prefillBtn.classList.remove('hidden');

      // Re-apply language so any data-i18n in the card picks up current lang
      applyLanguage(currentLang);
    });
  }

  // ----- Calculator Form Submit -----
  const calcForm = document.getElementById('calc-form');
  if (calcForm) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const errorEl   = document.getElementById('calc-error');
      const resultsEl = document.getElementById('calc-results');
      const t         = translations[currentLang];

      const loanRaw       = document.getElementById('calc-loan-amount').value.trim();
      const rateRaw       = document.getElementById('calc-interest-rate').value.trim();
      const tenureRaw     = document.getElementById('calc-tenure').value.trim();
      const moratoriumRaw = document.getElementById('calc-moratorium').value.trim();

      const principal        = parseFloat(loanRaw);
      const annualRate       = parseFloat(rateRaw);
      const tenureMonths     = parseFloat(tenureRaw);
      const moratoriumMonths = moratoriumRaw === '' ? 0 : parseFloat(moratoriumRaw);

      // --- Per-field validation, collect all errors then show as a list ---
      const errors = [];

      if (loanRaw === '' || isNaN(principal)) {
        errors.push(t.err_loan_required);
        document.getElementById('calc-loan-amount').classList.add('input-error');
      } else if (principal <= 0) {
        errors.push(t.err_loan_positive);
        document.getElementById('calc-loan-amount').classList.add('input-error');
      } else {
        document.getElementById('calc-loan-amount').classList.remove('input-error');
      }

      if (rateRaw === '' || isNaN(annualRate)) {
        errors.push(t.err_rate_required);
        document.getElementById('calc-interest-rate').classList.add('input-error');
      } else if (annualRate <= 0) {
        errors.push(t.err_rate_positive);
        document.getElementById('calc-interest-rate').classList.add('input-error');
      } else {
        document.getElementById('calc-interest-rate').classList.remove('input-error');
      }

      if (tenureRaw === '' || isNaN(tenureMonths)) {
        errors.push(t.err_tenure_required);
        document.getElementById('calc-tenure').classList.add('input-error');
      } else if (tenureMonths <= 0) {
        errors.push(t.err_tenure_positive);
        document.getElementById('calc-tenure').classList.add('input-error');
      } else {
        document.getElementById('calc-tenure').classList.remove('input-error');
      }

      if (!isNaN(moratoriumMonths) && moratoriumMonths < 0) {
        errors.push(t.err_moratorium_negative);
        document.getElementById('calc-moratorium').classList.add('input-error');
      } else {
        document.getElementById('calc-moratorium').classList.remove('input-error');
      }

      if (errors.length > 0) {
        errorEl.innerHTML = errors.map(msg => `<div>⚠ ${msg}</div>`).join('');
        errorEl.classList.remove('hidden');
        resultsEl.classList.add('hidden');
        return;
      }

      errorEl.classList.add('hidden');
      ['calc-loan-amount', 'calc-interest-rate', 'calc-tenure', 'calc-moratorium'].forEach(id => {
        document.getElementById(id).classList.remove('input-error');
      });

      const result = calculateEMI(principal, annualRate, tenureMonths, moratoriumMonths);

      if (result.error) {
        errorEl.innerHTML = `<div>⚠ ${t.calc_moratorium_error}</div>`;
        errorEl.classList.remove('hidden');
        resultsEl.classList.add('hidden');
        return;
      }

      // Clear any previous error
      errorEl.classList.add('hidden');

      const fmt = (val) => val.toLocaleString('en-IN', {
        style:                 'currency',
        currency:              'INR',
        maximumFractionDigits: 0,
      });

      document.getElementById('result-emi-value').textContent           = fmt(result.emi);
      document.getElementById('result-total-interest-value').textContent = fmt(result.totalInterest);
      document.getElementById('result-total-payable-value').textContent  = fmt(result.totalPayable);

      // Show moratorium note only when moratorium > 0
      const noteEl = document.getElementById('calc-moratorium-note');
      if (noteEl) {
        noteEl.classList.toggle('hidden', moratoriumMonths === 0);
      }

      resultsEl.classList.remove('hidden');
    });
  }

  // ----- "Go to EMI Calculator" scroll button -----
  const prefillBtn = document.getElementById('prefill-btn');
  if (prefillBtn) {
    prefillBtn.addEventListener('click', () => {
      document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ----- "Go to Recommended Scheme" scroll button -----
  const findMySchemeBtn = document.getElementById('findMyScheme-btn');
  if (findMySchemeBtn) {
    findMySchemeBtn.addEventListener('click', () => {
      document.getElementById('calc-results').classList.add('hidden')
      document.getElementById('scheme-result').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ----- Hamburger menu -----
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close menu when a nav link is tapped
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
      });
    });

    // Close menu when clicking outside the navbar
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#navbar')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
      }
    });
  }
});
