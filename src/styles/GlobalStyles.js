// Global Styles - Inject CSS into the document
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700&family=Montserrat:wght@300;400;500;600;700;800;900&family=Zain:wght@300;400;700;800;900&display=swap");

@font-face {
  font-family: "Eugusto";
  src: url("/fonts/Eugusto Free Font.otf") format("opentype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Tangerine";
  src: url("/fonts/IurY6Y5j_oScZZow4VOBDg.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Tangerine";
  src: url("/fonts/Iurd6Y5j_oScZZow4VO5srNpjA.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}


:root {
  /* Font Size Base */
  font-size: 62.5%; /* 1rem = 10px */

  /* Colors */
  --primary-color: #c7a45a; /* antique gold */
  --primary-dark: #a57d33; /* deep gold */
  --secondary-color: #6d7b88; /* slate steel */
  --accent-color: #e0c27c; /* warm champagne */
  --currency-color: #c7a45a;

  --text-button: #1b1612;
  --text-primary: #2a2622;
  --text-secondary: #6a635b;
  --text-light: rgba(255, 255, 255, 0.92);
  --text-muted: rgba(255, 255, 255, 0.7);

  --bg-white: #f6f1ea;
  --bg-light: #fbf7f2;
  --bg-alt: #efe6dc;
  --bg-dark: #1a1613;
  --bg-card: #f3ede6;

  /* Popup colors */
  --popup-bg: #f7f2ec;
  --popup-text: #2a2622;
  --popup-subtext: #6a635b;
  --popup-muted: #8f877f;
  --popup-disclaimer: #9a928a;
  --popup-field-bg: #fcf9f5;
  --popup-field-border: #d9cfc3;
  --popup-field-placeholder: #a79f95;
  --popup-checkbox: #a79f95;
  --popup-border: #c7a45a;
  --popup-link: #6a635b;

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #c7a45a 0%, #6d7b88 100%);
  --gradient-overlay: rgba(251, 247, 242, 0.94);
  --gradient-card: rgba(255, 255, 255, 0.12);

  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --spacing-2xl: 4rem;
  --spacing-3xl: 5rem;

  /* Border Radius */
  --radius-sm: 0.8rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
  --radius-xl: 2.5rem;
  --radius-full: 5rem;

  /* Shadows */
  --shadow-sm: 0 0.2rem 1rem rgba(38, 34, 30, 0.08);
  --shadow-md: 0 0.5rem 2rem rgba(38, 34, 30, 0.12);
  --shadow-lg: 0 1rem 3rem rgba(38, 34, 30, 0.14);
  --shadow-xl: 0 2rem 4rem rgba(38, 34, 30, 0.18);

  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;

  /* Font Sizes */
  --font-xs: 0.9rem;
  --font-sm: 1rem;
  --font-base: 1.1rem;
  --font-md: 1.2rem;
  --font-lg: 1.3rem;
  --font-xl: 1.5rem;
  --font-2xl: 1.8rem;
  --font-3xl: 2.5rem;
  --font-4xl: 3.5rem;

  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Heights */
  --line-height-tight: 1.1;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.6;
  --line-height-loose: 1.8;

  /* Max Width */
  --max-width-container: 120rem;
  --max-width-content: 90rem;
  --max-width-form: 60rem;

  /* Z-index */
  --z-dropdown: 100;
  --z-sticky: 500;
  --z-fixed: 1000;
  --z-modal: 2000;
  --z-tooltip: 3000;

  /* Borders */
  --border-thin: 0.1rem solid #e0d6cc;
  --border-medium: 0.2rem solid #e0d6cc;
  --border-focus: 0.2rem solid var(--primary-color);

  /* Logo filters */
  --logo-filter-nav: none;
  --logo-filter-footer: brightness(0) invert(1);
  --logo-filter-brand: none;
}

/* Dark Mode */
[data-theme="dark"] {
  /* Colors */
  --primary-color: #d6b36a; /* royal gold */
  --primary-dark: #b3873b; /* rich gold */
  --secondary-color: #556575; /* graphite blue */
  --accent-color: #e8cf98; /* champagne */
  --currency-color: #d6b36a;

  --text-primary: #f6f1e9;
  --text-secondary: #cfc5b9;
  --text-light: rgba(255, 255, 255, 0.92);
  --text-muted: rgba(255, 255, 255, 0.6);

  --bg-white: #0f0c0a;
  --bg-light: #161210;
  --bg-alt: #1b1613;
  --bg-dark: #090706;
  --bg-card: #14100e;

  /* Popup colors */
  --popup-bg: #14100e;
  --popup-text: #f6f1e9;
  --popup-subtext: #cfc5b9;
  --popup-muted: #a89f93;
  --popup-disclaimer: #9b9185;
  --popup-field-bg: #1b1613;
  --popup-field-border: #2a221c;
  --popup-field-placeholder: #a89f93;
  --popup-checkbox: #a89f93;
  --popup-border: #d6b36a;
  --popup-link: #cfc5b9;

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #d6b36a 0%, #556575 100%);
  --gradient-overlay: rgba(15, 12, 10, 0.94);
  --gradient-card: rgba(20, 16, 14, 0.85);

  /* Shadows */
  --shadow-sm: 0 0.2rem 1rem rgba(0, 0, 0, 0.5);
  --shadow-md: 0 0.5rem 2rem rgba(0, 0, 0, 0.65);
  --shadow-lg: 0 1rem 3rem rgba(0, 0, 0, 0.75);
  --shadow-xl: 0 2rem 4rem rgba(0, 0, 0, 0.85);

  /* Borders */
  --border-thin: 0.1rem solid #2a221c;
  --border-medium: 0.2rem solid #2a221c;

  /* Logo filters */
  --logo-filter-nav: brightness(0) invert(1);
  --logo-filter-brand: brightness(0) invert(1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Montserrat", "Eugusto", "Zain", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: var(--font-base);
  line-height: var(--line-height-normal);
  color: var(--text-primary);
}

/* Typography */
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  font-weight: var(--font-semibold);
  line-height: var(--line-height-tight);
}

h1 {
  font-size: var(--font-4xl);
}

h2 {
  font-size: var(--font-3xl);
}

h3 {
  font-size: var(--font-2xl);
}

h4 {
  font-size: var(--font-xl);
}

p {
  margin: 0;
  line-height: var(--line-height-relaxed);
}

a {
  text-decoration: none;
  color: inherit;
  transition: color var(--transition-normal);
}

/* Buttons */
button {
  cursor: pointer;
  border: none;
  font-family: inherit;
  transition: all var(--transition-normal);
}

/* Inputs */
input,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
  outline: none;
}

/* Lists */
ul,
ol {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Images */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Utility Classes */
.container {
  max-width: var(--max-width-container);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.section-padding {
  padding: var(--spacing-3xl) var(--spacing-lg);
}

.text-center {
  text-align: center;
}

.text-gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-accent {
  color: var(--primary-color);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-10rem);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

.slide-in {
  animation: slideIn 0.6s ease-out;
}
`;
