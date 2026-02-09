import React, { useState, useRef, useEffect } from "react";
import "./Footer.css";
import { useLanguage } from "../i18n/LanguageContext";
import { useSettings } from "../context/SettingsContext";

const Footer = () => {
  const { t, lang, setLang } = useLanguage();
  const { currency, setCurrency, areaUnit, setAreaUnit } = useSettings();
  const [selectedLanguage, setSelectedLanguage] = useState(() => lang);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const languageRef = useRef(null);
  const currencyRef = useRef(null);

  const languages = [
    { code: "EN", value: "en" },
    { code: "AR", value: "ar" },
    { code: "RU", value: "ru" },
  ];
  const currencies = ["AED", "USD", "EUR"];

  const addressText = t("footer.address");
  const addressParts = addressText.split(", ");
  const addressLineOne = addressParts[0] || addressText;
  const addressLineTwo =
    addressParts.length > 1 ? addressParts.slice(1).join(", ") : "";

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageDropdownOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setCurrencyDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedLanguage(lang);
  }, [lang]);

  const handleLanguageSelect = (nextLang) => {
    setSelectedLanguage(nextLang);
    setLang(nextLang);
    setLanguageDropdownOpen(false);
  };

  const handleCurrencySelect = (curr) => {
    setCurrency(curr);
    setCurrencyDropdownOpen(false);
  };

  return (
    <footer className="footer" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="footer-container">
        <div className="footer-content">
          {/* Left Section - Logo and Address */}
          <div className="footer-left">
            <a href="/" className="footer-logo">
              <img
                src="/favicon.svg"
                alt="The Residences"
                className="footer-logo__favicon"
                loading="lazy"
              />
              <span className="footer-logo__text">
                <span className="footer-logo__text-script">The</span>
                <span className="footer-logo__text-main">RESIDENCES</span>
                <span className="footer-logo__text-sub">
                  DIFC Zabeel District
                </span>
              </span>
            </a>
            <address className="footer-address">
              {addressLineOne}
              {addressLineTwo && (
                <>
                  <br />
                  {addressLineTwo}
                </>
              )}
            </address>

            {/* Social Media Icons */}
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="YouTube">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Follow us on Telegram">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Section - Awards and Ratings */}
          <div className="footer-right">
            {/* Row 1: Language, Area Units, Currency */}
            <div className="footer-controls">
              {/* Language Dropdown */}
              <div className="dropdown-wrapper" ref={languageRef}>
                <button
                  className="control-btn dropdown"
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                >
                  {selectedLanguage.toUpperCase()}{" "}
                  <span
                    className={`dropdown-arrow ${
                      languageDropdownOpen ? "open" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {languageDropdownOpen && (
                  <div className="dropdown-menu">
                    {languages.map((langOption) => (
                      <button
                        key={langOption.value}
                        className={`dropdown-item ${
                          selectedLanguage === langOption.value ? "active" : ""
                        }`}
                        onClick={() =>
                          handleLanguageSelect(langOption.value)
                        }
                      >
                        {langOption.code}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Unit Toggle */}
              <div className="control-btn-group">
                <button
                  className={`control-btn ${
                    areaUnit === "ft" ? "active" : ""
                  }`}
                  onClick={() => setAreaUnit("ft")}
                >
                  SQ FT
                </button>
                <button
                  className={`control-btn ${
                    areaUnit === "m" ? "active" : ""
                  }`}
                  onClick={() => setAreaUnit("m")}
                >
                  SQ M
                </button>
              </div>

              {/* Currency Dropdown */}
              <div className="dropdown-wrapper" ref={currencyRef}>
                <button
                  className="control-btn dropdown"
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                >
                  {currency}{" "}
                  <span
                    className={`dropdown-arrow ${
                      currencyDropdownOpen ? "open" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {currencyDropdownOpen && (
                  <div className="dropdown-menu">
                    {currencies.map((curr) => (
                      <button
                        key={curr}
                        className={`dropdown-item ${
                          currency === curr ? "active" : ""
                        }`}
                        onClick={() => handleCurrencySelect(curr)}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Row 2: Awards and Ratings removed */}
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="footer-disclaimer">
          <p>{t("footer.disclaimer")}</p>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-links">
            <a href="/terms" target="_blank" rel="noreferrer">
              {t("footer.termsConditions")}
            </a>
            <span className="footer-separator">|</span>
            <a href="/privacy" target="_blank" rel="noreferrer">
              {t("footer.privacyPolicy")}
            </a>
          </div>
          <p className="footer-copyright">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
