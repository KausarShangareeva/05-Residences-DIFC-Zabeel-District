import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import "./Navigation.css";
import "./TermsAndConditions.css";
import { useLanguage } from "../i18n/LanguageContext";

const TermsAndConditions = () => {
  const { t, lang } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const sections = [
    {
      index: "01",
      title: t("termsAndConditions.section1Title"),
      text: t("termsAndConditions.section1Text"),
    },
    {
      index: "02",
      title: t("termsAndConditions.section2Title"),
      text: t("termsAndConditions.section2Text"),
    },
    {
      index: "03",
      title: t("termsAndConditions.section3Title"),
      text: t("termsAndConditions.section3Text"),
    },
    {
      index: "04",
      title: t("termsAndConditions.section4Title"),
      text: t("termsAndConditions.section4Text"),
    },
    {
      index: "05",
      title: t("termsAndConditions.section5Title"),
      text: t("termsAndConditions.section5Text"),
    },
    {
      index: "06",
      title: t("termsAndConditions.section6Title"),
      text: t("termsAndConditions.section6Text"),
    },
    {
      index: "07",
      title: t("termsAndConditions.section7Title"),
      text: t("termsAndConditions.section7Text"),
    },
  ];

  return (
    <section id="terms" className="terms" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="terms__container">
        <div className="terms__top">
          <Link to="/" className="terms__back-link btn-list-property">
            <span className="terms__back-icon">←</span>
            {t("termsAndConditions.backToProject")}
          </Link>
          <button
            type="button"
            className="terms__mode-toggle btn-shortlist"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="moonsun" size={20} />
            ) : (
              <Moon className="moonsun" size={20} />
            )}
          </button>
        </div>
        <header className="terms__header">
          <p className="terms__eyebrow">{t("termsAndConditions.eyebrow")}</p>
          <h2 className="terms__title">
            {t("termsAndConditions.termsTitle")}
          </h2>
          <p className="terms__intro">
            {t("termsAndConditions.termsIntro")}
          </p>
        </header>

        <div className="terms__grid">
          {sections.map((section) => (
            <article className="terms__card" key={section.index}>
              <div className="terms__card-header">
                <span className="terms__index">{section.index}</span>
                <h3 className="terms__card-title">{section.title}</h3>
              </div>
              <p>{section.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
