import React from "react";
import { Info } from "lucide-react";
import "./AboutDeveloperSection.css";
import { useLanguage } from "../i18n/LanguageContext";

const AboutDeveloperSection = ({ onOpenConsultation }) => {
  const { t, lang } = useLanguage();
  return (
    <section
      id="developer"
      className="about-developer-section reveal-on-scroll"
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
            <div className="about-developer-logo">
              <img
                src="/favicon.svg"
                alt="The Residences"
                className="about-developer-logo__favicon"
                loading="lazy"
              />
              <div className="about-developer-logo__text">
                <span className="about-developer-logo__text-script">The</span>
                <span className="about-developer-logo__text-main">
                  RESIDENCES
                </span>
                <span className="about-developer-logo__text-sub">
                  DIFC Zabeel District
                </span>
              </div>
            </div>
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
        </div>
      </div>
    </section>
  );
};

export default AboutDeveloperSection;
