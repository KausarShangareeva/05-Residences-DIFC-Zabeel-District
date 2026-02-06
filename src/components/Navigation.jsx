import { useState, useEffect, useRef } from "react";
import "./Navigation.css";
import {
  Building2,
  FileText,
  HelpCircle,
  Image,
  Info,
  Layers,
  MapPin,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { useLanguage } from "../i18n/LanguageContext";
import { useSettings } from "../context/SettingsContext";

const Navigation = ({ onOpenConsultation }) => {
  const { t, lang, setLang } = useLanguage();
  const { currency, setCurrency, areaUnit, setAreaUnit } = useSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangPopupOpen, setIsLangPopupOpen] = useState(false);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const initialOffsetRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });
  const [isBottomPinned, setIsBottomPinned] = useState(false);
  const [bottomHeight, setBottomHeight] = useState(0);
  const [topHeight, setTopHeight] = useState(0);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const calculateInitialOffset = () => {
      if (topRef.current && bottomRef.current) {
        const topRect = topRef.current.getBoundingClientRect();
        const bottomRect = bottomRef.current.getBoundingClientRect();
        setTopHeight(topRect.height);
        setBottomHeight(bottomRect.height);
        // Store the initial offset only once (top header height)
        if (initialOffsetRef.current === null) {
          initialOffsetRef.current = topRect.height;
        }
      }
    };

    // Calculate after a short delay to ensure page is loaded
    const timer = setTimeout(calculateInitialOffset, 100);
    window.addEventListener("resize", calculateInitialOffset);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateInitialOffset);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (initialOffsetRef.current === null) return;
      // Pin when scrolled past top header
      setIsBottomPinned(window.scrollY >= initialOffsetRef.current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setSelectedLang(lang);
  }, [lang]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const [selectedLang, setSelectedLang] = useState(() => lang);
  const [tempLang, setTempLang] = useState("en");
  const [tempCurrency, setTempCurrency] = useState(currency);
  const [tempAreaUnit, setTempAreaUnit] = useState(areaUnit);
  const [activeSelect, setActiveSelect] = useState(null);
  const [isMobileSettingsOpen, setIsMobileSettingsOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const isMobile = window.innerWidth <= 1000;
      const headerOffset = isMobile ? topHeight + 10 : bottomHeight + 5;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const toggleLangPopup = () => {
    setIsLangPopupOpen(!isLangPopupOpen);
    // Reset temporary selections when opening
    if (!isLangPopupOpen) {
      setTempLang(selectedLang);
      setTempCurrency(currency);
      setTempAreaUnit(areaUnit);
      setActiveSelect(null);
    }
  };

  const handleSave = () => {
    setSelectedLang(tempLang);
    setLang(tempLang);
    setCurrency(tempCurrency);
    setAreaUnit(tempAreaUnit);
    setIsLangPopupOpen(false);
    setActiveSelect(null);
  };

  const toggleMobileSettings = () => {
    const nextOpen = !isMobileSettingsOpen;
    setIsMobileSettingsOpen(nextOpen);
    if (nextOpen) {
      setTempLang(selectedLang);
      setTempCurrency(currency);
      setTempAreaUnit(areaUnit);
    }
  };

  const handleMobileApply = () => {
    setSelectedLang(tempLang);
    setLang(tempLang);
    setCurrency(tempCurrency);
    setAreaUnit(tempAreaUnit);
    setIsMobileSettingsOpen(false);
  };

  const toggleSelect = (selectName) => {
    setActiveSelect((prev) => (prev === selectName ? null : selectName));
  };

  const languages = [
    { code: "EN", name: "English", value: "en", countryCode: "GB" },
    { code: "AR", name: "العربية", value: "ar", countryCode: "AE" },
    { code: "RU", name: "Русский", value: "ru", countryCode: "RU" },
  ];

  const currencies = ["AED", "USD", "EUR"];

  return (
    <header className="header" dir="ltr">
      {/* Top Header */}
      <div className="header__top" ref={topRef}>
        <div className="header-top__container">
          {/* Logo */}
          <div className="header-top__logo">
            <a href="/" className="header-logo__link">
              <img
                src="/icon.svg"
                alt="Passo by Beyond"
                className="header-logo__img"
              />
            </a>
          </div>

          {/* Actions */}
          <div className="header-top__actions">
            <div className="header-actions__phone">
              <a
                href="https://api.whatsapp.com/send/?phone=97144286151&text=Hello%21+I+am+interested+in+Passo+by+Beyond&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
              >
                {t("navigation.phone")}
              </a>
            </div>

            <div className="header-actions__langs">
              <div className="header-langs__line" onClick={toggleLangPopup}>
                <ReactCountryFlag
                  countryCode={
                    languages.find((l) => l.value === selectedLang)?.countryCode
                  }
                  svg
                  className="flag"
                  aria-label={
                    languages.find((l) => l.value === selectedLang)?.name
                  }
                />
                <span className="language">{selectedLang.toUpperCase()}</span>
                <span className="separator">/</span>
                <span className="currency">{currency}</span>
              </div>
            </div>

            <div className="header-actions__btn header-actions__consultation">
              <button
                onClick={onOpenConsultation}
                className="btn-list-property"
              >
                {t("navigation.cta")}
              </button>
            </div>

            <div className="header-actions__shortlist">
              <button
                onClick={toggleTheme}
                className="btn-shortlist"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="moonsun" size={20} />
                ) : (
                  <Moon className="moonsun" size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Burger Menu Button */}
          <button
            className={`header-menu__burger ${isMenuOpen ? "opened" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="header-menu__burger-line"></span>
            <span className="header-menu__burger-line"></span>
            <span className="header-menu__burger-line"></span>
          </button>
        </div>
      </div>
      <div
        className="header__top-spacer"
        style={{ height: topHeight }}
        aria-hidden="true"
      ></div>

      {/* Bottom Header - Main Navigation */}
      <div
        className={`header__bottom ${isMenuOpen ? "opened" : ""} ${
          isBottomPinned ? "pinned" : ""
        }`}
        ref={bottomRef}
      >
        <div className="header-bottom__container">
          <nav className="header-menu">
            <div className="header-menu__mobile-title">
              {t("navigation.mobileTitle")}
            </div>
            <ul className="header-menu__list">
              <li className="header-menu__item">
                <a
                  href="#about"
                  className="header-menu__link"
                  onClick={(e) => handleSmoothScroll(e, "about")}
                >
                  <Info size={18} className="header-menu__icon" />
                  {t("navigation.about")}
                </a>
              </li>
              <li className="header-menu__item">
                <a
                  href="#gallery"
                  className="header-menu__link"
                  onClick={(e) => handleSmoothScroll(e, "gallery")}
                >
                  <Image size={18} className="header-menu__icon" />
                  {t("navigation.gallery")}
                </a>
              </li>
              <li className="header-menu__item">
                <a
                  href="#floor-plans"
                  className="header-menu__link"
                  onClick={(e) => handleSmoothScroll(e, "floor-plans")}
                >
                  <Layers size={18} className="header-menu__icon" />
                  {t("navigation.floorPlans")}
                </a>
              </li>
              <li className="header-menu__item">
                <a
                  href="#amenities"
                  className="header-menu__link"
                  onClick={(e) => handleSmoothScroll(e, "amenities")}
                >
                  <Sparkles size={18} className="header-menu__icon" />
                  {t("navigation.amenities")}
                </a>
              </li>
              <li className="header-menu__item">
                <a
                  href="#developer"
                  className="header-menu__link"
                  onClick={(e) => handleSmoothScroll(e, "developer")}
                >
                  <Building2 size={18} className="header-menu__icon" />
                  {t("navigation.developer")}
                </a>
              </li>
              <li className="header-menu__item">
                <a
                  href="#location"
                  className="header-menu__link"
                  onClick={(e) => handleSmoothScroll(e, "location")}
                >
                  <MapPin size={18} className="header-menu__icon" />
                  {t("navigation.location")}
                </a>
              </li>
              <li className="header-menu__item">
                <a
                  href="#materials"
                  className="header-menu__link"
                  onClick={(e) => handleSmoothScroll(e, "materials")}
                >
                  <FileText size={18} className="header-menu__icon" />
                  {t("navigation.materials")}
                </a>
              </li>
              <li className="header-menu__item">
                <a
                  href="#faq"
                  className="header-menu__link"
                  onClick={(e) => handleSmoothScroll(e, "faq")}
                >
                  <HelpCircle size={18} className="header-menu__icon" />
                  {t("navigation.faq")}
                </a>
              </li>
            </ul>

            <span className="header-menu__separator" aria-hidden="true"></span>

            <div className="header-menu__mobile-settings">
              <div className="header-menu__mobile-divider">
                <span>{t("navigation.settingsTitle")}</span>
              </div>
              <button
                type="button"
                className={`header-menu__settings-toggle ${
                  isMobileSettingsOpen ? "open" : ""
                }`}
                onClick={toggleMobileSettings}
              >
                <span>{t("navigation.settingsToggle")}</span>
                <span className="header-menu__settings-arrow">▼</span>
              </button>

              <div
                className={`header-menu__settings-panel ${
                  isMobileSettingsOpen ? "open" : ""
                }`}
              >
                <div className="header-menu__settings-group">
                  <div className="header-menu__settings-label">
                    {t("navigation.languageLabel")}
                  </div>
                  <div className="header-menu__settings-options">
                    {languages.map((lang) => (
                      <button
                        key={lang.value}
                        type="button"
                        className={`header-menu__settings-option ${
                          tempLang === lang.value ? "active" : ""
                        }`}
                        onClick={() => setTempLang(lang.value)}
                      >
                        <ReactCountryFlag
                          countryCode={lang.countryCode}
                          svg
                          className="flag"
                          aria-label={lang.name}
                        />{" "}
                        {lang.code}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="header-menu__settings-group">
                  <div className="header-menu__settings-label">
                    {t("navigation.currencyLabel")}
                  </div>
                  <div className="header-menu__settings-options">
                    {currencies.map((currency) => (
                      <button
                        key={currency}
                        type="button"
                        className={`header-menu__settings-option ${
                          tempCurrency === currency ? "active" : ""
                        }`}
                        onClick={() => setTempCurrency(currency)}
                      >
                        {currency}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="header-menu__settings-group">
                  <div className="header-menu__settings-label">
                    {t("navigation.areaLabel")}
                  </div>
                  <div className="header-menu__settings-options">
                    <button
                      type="button"
                      className={`header-menu__settings-option ${
                        tempAreaUnit === "ft" ? "active" : ""
                      }`}
                      onClick={() => setTempAreaUnit("ft")}
                    >
                      SQ FT
                    </button>
                    <button
                      type="button"
                      className={`header-menu__settings-option ${
                        tempAreaUnit === "m" ? "active" : ""
                      }`}
                      onClick={() => setTempAreaUnit("m")}
                    >
                      SQ M
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="header-menu__settings-apply"
                  onClick={handleMobileApply}
                >
                  {t("navigation.apply")}
                </button>
              </div>
            </div>

            {/* Mobile Buttons */}
            <span className="header-menu__separator" aria-hidden="true"></span>

            <div className="header-menu__mobile-btns">
              <div className="header-menu__mobile-divider header-menu__mobile-divider--contacts">
                <span>{t("navigation.contacts")}</span>
              </div>
              <a
                href="https://api.whatsapp.com/send/?phone=97144286151&text=Hello%21+I+am+interested+in+Passo+by+Beyond&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
                className="header-menu__phone"
              >
                +971 4 428 6151
              </a>
              <button
                onClick={onOpenConsultation}
                className="header-menu__primary-btn header-menu__consultation"
              >
                {t("navigation.cta")}
              </button>
            </div>
          </nav>
        </div>
      </div>
      <div
        className={`header__bottom-spacer ${isBottomPinned ? "active" : ""}`}
        style={{ height: bottomHeight }}
        aria-hidden="true"
      ></div>

      {/* Language/Currency Popup — outside .header__top to avoid backdrop-filter stacking context */}
      <div
        className={`header-langs__pop-up ${isLangPopupOpen ? "opened" : ""}`}
      >
        {/* Area Switch */}
        <div className="header-langs__select-switch">
          <button
            type="button"
            className={tempAreaUnit === "ft" ? "selected" : ""}
            onClick={() => setTempAreaUnit("ft")}
          >
            SQ FT
          </button>
          <button
            type="button"
            className={tempAreaUnit === "m" ? "selected" : ""}
            onClick={() => setTempAreaUnit("m")}
          >
            SQ M
          </button>
        </div>

        {/* Language Select */}
        <div
          className={`header-langs__select ${
            activeSelect === "lang" ? "active" : ""
          }`}
        >
          <div className="header-langs__select-title">
            {t("navigation.languageLabel")}
          </div>
          <div
            className="header-langs__select-current"
            onClick={() => toggleSelect("lang")}
          >
            <ReactCountryFlag
              countryCode={
                languages.find((l) => l.value === tempLang)?.countryCode
              }
              svg
              className="flag"
            />
            <span className="code">
              {languages.find((l) => l.value === tempLang)?.code}
            </span>
            <span className="separator"> — </span>
            <span className="name">
              {languages.find((l) => l.value === tempLang)?.name}
            </span>
          </div>
          <div className="header-langs__select-options">
            <ul>
              {languages.map((l) => (
                <li
                  key={l.value}
                  className={tempLang === l.value ? "selected" : ""}
                  onClick={() => {
                    setTempLang(l.value);
                    setActiveSelect(null);
                  }}
                >
                  <ReactCountryFlag
                    countryCode={l.countryCode}
                    svg
                    className="flag"
                  />
                  <span className="code">{l.code}</span>
                  <span className="separator"> — </span>
                  <span className="name">{l.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Currency Select */}
        <div
          className={`header-langs__select ${
            activeSelect === "currency" ? "active" : ""
          }`}
        >
          <div className="header-langs__select-title">
            {t("navigation.currencyLabel")}
          </div>
          <div
            className="header-langs__select-current"
            onClick={() => toggleSelect("currency")}
          >
            {tempCurrency}
          </div>
          <div className="header-langs__select-options">
            <ul>
              {currencies.map((c) => (
                <li
                  key={c}
                  className={tempCurrency === c ? "selected" : ""}
                  onClick={() => {
                    setTempCurrency(c);
                    setActiveSelect(null);
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="button"
          className="header-langs__btn-save"
          onClick={handleSave}
        >
          {t("navigation.apply")}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div className="header-overlay" onClick={toggleMenu}></div>
      )}

      {/* Language Popup Overlay */}
      {isLangPopupOpen && (
        <div className="header-overlay" onClick={toggleLangPopup}></div>
      )}
    </header>
  );
};

export default Navigation;
