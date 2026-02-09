import React from "react";
import { CarFront } from "lucide-react";
import "./LocationSection.css";
import { FileDown } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const LocationSection = ({ onOpenBrochure }) => {
  const { t, lang } = useLanguage();
  const entertainmentData = t("location.entertainmentPlaces");
  const clinicsData = t("location.clinicsPlaces");
  const schoolsData = t("location.schoolsPlaces");

  const entertainmentPlaces = Array.isArray(entertainmentData)
    ? entertainmentData
    : [];
  const clinicsPlaces = Array.isArray(clinicsData) ? clinicsData : [];
  const schoolsPlaces = Array.isArray(schoolsData) ? schoolsData : [];

  return (
    <div
      id="location"
      className="location-section"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="location-content">
        <div className="location-top">
          <div className="location-left">
            <h2>
              <span className="text-accent">{t("location.title")}</span>
            </h2>
            <p className="location-description">{t("location.description")}</p>
          </div>

          <div className="location-info">
            <h3 className="info-title">{t("location.aboutTitle")}</h3>
            <div className="info-item">
              <span className="info-label">{t("location.labels.style")}</span>
              <span className="info-value">{t("location.values.style")}</span>
            </div>
            <div className="info-item">
              <span className="info-label">
                {t("location.labels.focalPoint")}
              </span>
              <span className="info-value">
                {t("location.values.focalPoint")}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">
                {t("location.labels.masterPlan")}
              </span>
              <button onClick={onOpenBrochure} className="info-link">
                {t("location.values.download")}
                <FileDown size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="location-categories">
          <div className="category">
            <h3>{t("location.categories.entertainment")}</h3>
            <span className="category-line"></span>
            <div className="category-list">
              {entertainmentPlaces.map((item, index) => (
                <div key={index} className="category-item">
                  <div className="item-time">
                    <CarFront className="car-icon" size={18} />
                    <span>{item.time}</span>
                  </div>
                  <span className="item-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="category">
            <h3>{t("location.categories.clinics")}</h3>
            <span className="category-line"></span>
            <div className="category-list">
              {clinicsPlaces.map((item, index) => (
                <div key={index} className="category-item">
                  <div className="item-time">
                    <CarFront className="car-icon" size={18} />
                    <span>{item.time}</span>
                  </div>
                  <span className="item-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="category">
            <h3>{t("location.categories.schools")}</h3>
            <span className="category-line"></span>
            <div className="category-list">
              {schoolsPlaces.map((item, index) => (
                <div key={index} className="category-item">
                  <div className="item-time">
                    <CarFront className="car-icon" size={18} />
                    <span>{item.time}</span>
                  </div>
                  <span className="item-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="location-map-container">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=55.2826346%2C25.2173735%2C55.3026346%2C25.2373735&layer=mapnik&marker=25.2273735%2C55.2926346"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="DIFC Zabeel District Location"
        ></iframe>
      </div>
    </div>
  );
};

export default LocationSection;
