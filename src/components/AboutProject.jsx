import React from "react";
import "./AboutProject.css";
import { ChevronsDown } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { useSettings } from "../context/SettingsContext";
import { formatArea } from "../utils/formatters";

const AboutProject = () => {
  const { t, lang } = useLanguage();
  const { areaUnit } = useSettings();
  const unitLabels = {
    sqft: t("units.sqft"),
    sqm: t("units.sqm"),
  };
  const handleScrollToMaterials = (e) => {
    e.preventDefault();
    const element = document.getElementById("materials");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="about"
      className="about-project reveal-on-scroll"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="about-project__container">
        <div className="about-project__content">
          <h2 className="about-project__title">
            {t("aboutProject.titlePrefix")}{" "}
            <span className="text-accent">
              {t("aboutProject.titleAccent")}
            </span>{" "}
            {t("aboutProject.titleSuffix")}
          </h2>

          <div className="about-project__description">
            <p>{t("aboutProject.description.0")}</p>

            <p>{t("aboutProject.description.1")}</p>
          </div>
        </div>

        <div className="about-project__info">
          <h3 className="about-project__info-title">
            {t("aboutProject.infoTitle")}
          </h3>

          <div className="about-project__info-grid">
            <div className="about-project__info-item">
              <span className="about-project__info-label">
                {t("aboutProject.labels.developer")}
              </span>
              <span className="about-project__info-value">
                {t("aboutProject.values.developer")}
                <span className="about-project__info-icon">ⓘ</span>
              </span>
            </div>

            <div className="about-project__info-item">
              <span className="about-project__info-label">
                {t("aboutProject.labels.areaFrom")}
              </span>
              <span className="about-project__info-value">
                {formatArea(968, areaUnit, lang, unitLabels)}
              </span>
            </div>

            <div className="about-project__info-item">
              <span className="about-project__info-label">
                {t("aboutProject.labels.apartments")}
              </span>
              <span className="about-project__info-value">
                {t("aboutProject.values.apartments")}
              </span>
            </div>

            <div className="about-project__info-item">
              <span className="about-project__info-label">
                {t("aboutProject.labels.penthouses")}
              </span>
              <span className="about-project__info-value">
                {t("aboutProject.values.penthouses")}
              </span>
            </div>

            <div className="about-project__info-item">
              <span className="about-project__info-label">
                {t("aboutProject.labels.paymentPlan")}
              </span>
              <span className="about-project__info-value">
                {t("aboutProject.values.paymentPlan")}
              </span>
            </div>
          </div>

          <button
            className="about-project__materials-btn"
            onClick={handleScrollToMaterials}
          >
            <span>{t("aboutProject.materials")}</span>
            <ChevronsDown size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
