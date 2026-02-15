# 🏙️ The Residences DIFC — Zabeel District

Welcome to **The Residences DIFC** — a luxury real estate landing page for a premium residential development in the heart of **Dubai International Financial Centre**, Zabeel District.
This project features **multilingual support**, **dark mode**, **dynamic pricing**, and a **full-stack lead generation system** with PostgreSQL and Telegram.

---

## 🔗 Demo

Check out the project live: [The Residences DIFC](https://difc-zabeel.netlify.app/)

---

## 🚀 Features

- 🌍 **3 languages** — English, Arabic (RTL), Russian with real-time switching
- 🌙 **Dark / Light mode** — theme toggle with localStorage persistence
- 💰 **Currency conversion** — AED, USD, EUR with dynamic price display
- 📐 **Area unit toggle** — switch between sq. ft and sq. m
- 📸 **Property gallery** — lazy-loaded images via Cloudinary CDN
- 🏠 **Interactive floor plans** — 5 apartment types with pricing & area details
- 📝 **Lead capture form** — consultation booking with international phone validation
- 📱 **Fully responsive** — mobile-first design with scroll animations
- 🔍 **SEO optimized** — GA4, Open Graph, Twitter Cards, JSON-LD schema, sitemap
- 💬 **WhatsApp integration** — floating action button for instant contact
- 🗄️ **PostgreSQL backend** — persistent lead storage with Telegram notifications

---

## 📦 Tech Stack

### Frontend

- **React 19** — UI library
- **Vite** — build tool
- **React Router** — client-side routing
- **Styled-Components** — global theming & dark mode
- **CSS Modules** — component-level styling
- **libphonenumber-js** — international phone validation
- **Lucide React** — icon library
- **React Helmet Async** — SEO meta tags
- **QRCode.react** — QR code generation

### Backend

- **Express.js** — REST API server
- **PostgreSQL** — lead data storage
- **express-validator** — server-side form validation
- **Telegram Bot API** — instant lead notifications

### Deployment

- **Netlify** — frontend hosting
- **Render.com** — backend hosting
- **Cloudinary** — image CDN with responsive srcSet

---

## 📂 Project Structure

```
📂 src/
  📂 components/
    Navigation.jsx          # Sticky header, language/currency popup
    PropertyHero.jsx        # Full-screen hero with key stats
    PropertyHeader.jsx      # Property info & investment highlights
    AboutProject.jsx        # AED 100B ecosystem description
    PropertyGallery.jsx     # Lazy-loaded image gallery
    FloorPlansSection.jsx   # 5 unit types with pricing
    AdviceSection.jsx       # Contact form with phone validation
    AmenitiesSection.jsx    # Pools, fitness, sports, concierge
    AboutDeveloperSection.jsx # DIFC Developments info
    BrochureDownloadSection.jsx # PDF materials with modal popup
    LocationSection.jsx     # Map & location details
    ProjectMaterialsSection.jsx # Downloadable resources
    Questions.jsx           # FAQ accordion
    FloatingActions.jsx     # WhatsApp & scroll-to-top
    Footer.jsx              # Footer with links & settings
    LinksPage.jsx           # QR code links page
    CountrySelect.jsx       # Country dropdown for phone input
    Button.jsx              # Reusable button component
  📂 context/
    SettingsContext.jsx      # Currency & area unit state
  📂 i18n/
    LanguageContext.jsx      # i18n provider (EN/RU/AR)
    📂 locales/
      en.json / ar.json / ru.json
  📂 data/
    floorPlansBase.js        # 5 apartment types with pricing
    countries.js             # Country list for phone input
  📂 utils/
    api.js                   # API client for lead submission
    phone.js                 # Phone validation & formatting
    formatters.js            # Price & area formatters
    faqData.js               # FAQ content
    SchemaMarkup.jsx         # JSON-LD structured data
  📂 styles/
    GlobalStyles.js          # Theme variables & global CSS
  App.jsx                    # Main router with scroll reveal
  main.jsx                   # Entry point

📂 backend/
  📂 src/
    server.js                # Express app setup
    db.js                    # PostgreSQL connection & table init
    📂 routes/
      lead.js                # POST /api/leads endpoint
    📂 utils/
      telegram.js            # Telegram bot notifications
      validateLead.js        # Server-side validation
```

---

## 🏢 Apartment Types

| Type             | Area        | Units | Starting Price |
| ---------------- | ----------- | ----- | -------------- |
| 1 BR             | 846 sq.ft   | 247   | AED 2.6M       |
| 2 BR             | 1,460 sq.ft | 164   | —              |
| 3 BR             | 1,898 sq.ft | 40    | —              |
| 4 BR             | 3,437 sq.ft | 6     | —              |
| Duplex Penthouse | 4,489 sq.ft | 6     | —              |

**Total: 463 luxury apartments** · Handover: Q4 2029

---

## 🎨 Themes & Design

| Theme | Icon | Description                          |
| ----- | ---- | ------------------------------------ |
| Light | ☀️   | Warm beige with antique gold accents |
| Dark  | 🌙   | Deep tones with champagne highlights |

**Color Palette:**

| Color        | Hex       | Usage                     |
| ------------ | --------- | ------------------------- |
| Antique Gold | `#9a742e` | Primary buttons & accents |
| Slate Steel  | `#6d7b88` | Secondary elements        |
| Champagne    | `#e0c27c` | Highlights & hover states |
| Warm Beige   | `#f6f1ea` | Light mode background     |

**Typography:** Montserrat · Cormorant Garamond · Eugusto · Tangerine · Zain (Arabic)

---

## 🧠 How It Works

1. **Explore the property** — browse hero section, gallery, amenities, and floor plans
2. **Switch language** — choose English, Arabic, or Russian
3. **Change currency** — view prices in AED, USD, or EUR
4. **Toggle area units** — switch between sq. ft and sq. m
5. **View floor plans** — explore 5 apartment types with detailed specs
6. **Book a consultation** — fill in the form with phone validation
7. **Download brochure** — request PDF materials via modal popup
8. **Contact via WhatsApp** — tap the floating button
9. **Leads are saved** — to PostgreSQL and sent to Telegram instantly

---

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project
cd 05-Residences-DIFC-Zabeel-District

# Install frontend dependencies
npm install

# Start frontend dev server
npm run dev

# (Optional) Start backend server
cd backend
npm install
npm run dev
```

---

## 📄 Pages

| Route      | Description            |
| ---------- | ---------------------- |
| `/`        | Main landing page      |
| `/terms`   | Terms and Conditions   |
| `/privacy` | Privacy Policy         |
| `/block`   | Building block details |
| `/links`   | QR code links page     |
