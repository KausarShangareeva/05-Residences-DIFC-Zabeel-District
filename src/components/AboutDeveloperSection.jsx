import React from "react";
import { Info } from "lucide-react";
import "./AboutDeveloperSection.css";
import { useLanguage } from "../i18n/LanguageContext";

const AboutDeveloperSection = ({ onOpenConsultation }) => {
  const { t, lang } = useLanguage();
  return (
    <section
      id="developer"
      className="about-developer-section"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="about-developer-container">
        <div className="about-developer-content">
          <div className="about-developer-text">
            <h2 className="about-developer-title">
              <span className="text-accent">
                {t("developer.titleAccent")}
              </span>{" "}
              {t("developer.titleSuffix")}
            </h2>
            <p className="about-developer-description">
              {t("developer.description")}
            </p>
          </div>

          <div className="about-developer-logo-card">
            <img
              src="/icon.svg"
              alt="Beyond developer logo"
              className="developer-logo"
              loading="lazy"
            />
            <button
              className="interest-free-badge"
              onClick={onOpenConsultation}
            >
              <span className="interest-free-text">
                {t("developer.interestFree")}
              </span>
              <Info className="info-icon" size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="about-developer-map">
        <div className="master-plan-container">
          <button className="master-plan-badge">
            <span>{t("developer.masterPlan")}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 6L8 10L4 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutDeveloperSection;
