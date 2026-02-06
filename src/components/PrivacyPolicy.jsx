import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import "./Navigation.css";
import "./PrivacyPolicy.css";
import { useLanguage } from "../i18n/LanguageContext";

const PrivacyPolicy = () => {
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
      index: "02",
      title: t("privacyPolicy.section2Title"),
      intro: t("privacyPolicy.section2Intro"),
      list: t("privacyPolicy.section2List"),
    },
    {
      index: "03",
      title: t("privacyPolicy.section3Title"),
      intro: t("privacyPolicy.section3Intro"),
      list: t("privacyPolicy.section3List"),
      extra: t("privacyPolicy.cookiesNote"),
    },
    {
      index: "04",
      title: t("privacyPolicy.section4Title"),
      intro: t("privacyPolicy.section4Intro"),
      list: t("privacyPolicy.section4List"),
    },
    {
      index: "05",
      title: t("privacyPolicy.section5Title"),
      text: t("privacyPolicy.section5Text"),
    },
    {
      index: "06",
      title: t("privacyPolicy.section6Title"),
      intro: t("privacyPolicy.section6Intro"),
      list: t("privacyPolicy.section6List"),
    },
    {
      index: "07",
      title: t("privacyPolicy.section7Title"),
      text: t("privacyPolicy.section7Text"),
    },
    {
      index: "08",
      title: t("privacyPolicy.section8Title"),
      text: t("privacyPolicy.section8Text"),
      email: t("privacyPolicy.contactEmail"),
    },
  ];

  return (
    <section id="privacy" className="privacy" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="privacy__container">
        <div className="privacy__top">
          <Link to="/" className="privacy__back-link btn-list-property">
            <span className="privacy__back-icon">←</span>
            {t("privacyPolicy.backToProject")}
          </Link>
          <button
            type="button"
            className="privacy__mode-toggle btn-shortlist"
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

        <header className="privacy__header">
          <p className="privacy__eyebrow">{t("privacyPolicy.eyebrow")}</p>
          <h2 className="privacy__title">{t("privacyPolicy.privacyTitle")}</h2>
          <p className="privacy__intro">{t("privacyPolicy.section1Text")}</p>
        </header>

        <div className="privacy__grid">
          {sections.map((section) => (
            <article className="privacy__card" key={section.index}>
              <div className="privacy__card-header">
                <span className="privacy__index">{section.index}</span>
                <h3 className="privacy__card-title">{section.title}</h3>
              </div>
              {section.text && <p>{section.text}</p>}
              {section.intro && <p>{section.intro}</p>}
              {Array.isArray(section.list) && (
                <ul className="privacy__list">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.extra && <p>{section.extra}</p>}
              {section.email && (
                <p className="privacy__contact">
                  <a href={`mailto:${section.email}`}>{section.email}</a>
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
