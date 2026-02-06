// FloorPlansSection.jsx
import React, { useState } from "react";
import { Download } from "lucide-react";
import "./FloorPlansSection.css";
import { useLanguage } from "../i18n/LanguageContext";
import { useSettings } from "../context/SettingsContext";
import {
  formatArea,
  formatPriceParts,
  formatPriceRangeParts,
} from "../utils/formatters";
import { floorPlansBase } from "../data/floorPlansBase";

const FloorPlansSection = ({ onOpenBrochure, onOpenConsultation }) => {
  const { t, lang } = useLanguage();
  const { currency, areaUnit, setCurrency, setAreaUnit } = useSettings();
  const [openIndex, setOpenIndex] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);

  const image =
    "https://metropolitan.realestate/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2024/02/Bay-Villas-3tau3-768x747.jpg.webp";

  const propertiesData = t("floorPlans.properties");
  const properties = Array.isArray(propertiesData) ? propertiesData : [];
  const baseById = new Map(floorPlansBase.map((item) => [item.id, item]));
  const unitLabels = {
    sqft: t("units.sqft"),
    sqm: t("units.sqm"),
  };
  const areaPrefix = t("floorPlans.areaFromPrefix");

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderPriceParts = (parts) =>
    parts.map((part, idx) =>
      part.type === "currency" ? (
        <span key={idx} className="price-currency">
          {part.value}
        </span>
      ) : (
        <span key={idx}>{part.value}</span>
      ),
    );

  return (
    <section
      id="floor-plans"
      className="floor-plans-section"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="floor-plans-container">
        <div className="floor-plans-heading">
          <h2 className="floor-plans-title">
            {t("floorPlans.titlePrefix")}{" "}
            <span className="text-accent">{t("floorPlans.titleAccent")}</span>
          </h2>
          <div className="floor-plans-controls">
            <div className="floor-plans-toggle">
              {["AED", "USD", "EUR"].map((curr) => (
                <button
                  key={curr}
                  type="button"
                  className={`floor-plans-toggle__btn ${
                    currency === curr ? "active" : ""
                  }`}
                  onClick={() => setCurrency(curr)}
                >
                  {curr}
                </button>
              ))}
            </div>
            <div className="floor-plans-toggle">
              <button
                type="button"
                className={`floor-plans-toggle__btn ${
                  areaUnit === "ft" ? "active" : ""
                }`}
                onClick={() => setAreaUnit("ft")}
              >
                SQ FT
              </button>
              <button
                type="button"
                className={`floor-plans-toggle__btn ${
                  areaUnit === "m" ? "active" : ""
                }`}
                onClick={() => setAreaUnit("m")}
              >
                SQ M
              </button>
            </div>
          </div>
        </div>

        <div className="floor-plans-header">
          <span className="header-label">
            {t("floorPlans.headers.propertyType")}
          </span>
          <span className="header-label">
            {t("floorPlans.headers.livingArea")}
          </span>
          <span className="header-label">
            {t("floorPlans.headers.startingPrice")}
          </span>
        </div>

        <div className="floor-plans-list">
          {properties.map((property, index) => {
            const base = baseById.get(property.id);
            const areaValue = base?.areaSqft
              ? `${areaPrefix} ${formatArea(base.areaSqft, areaUnit, lang, unitLabels)}`
              : property.area;
            const priceValue =
              base && base.priceAed !== null
                ? base.priceAedMax
                  ? (() => {
                      const { minParts, maxParts } = formatPriceRangeParts(
                        base.priceAed,
                        base.priceAedMax,
                        currency,
                        lang,
                      );
                      return (
                        <span className="price-range">
                          {renderPriceParts(minParts)} –{" "}
                          {renderPriceParts(maxParts)}
                        </span>
                      );
                    })()
                  : (() => {
                      const parts = formatPriceParts(
                        base.priceAed,
                        currency,
                        lang,
                      );
                      return (
                        <span className="price-single">
                          {renderPriceParts(parts)}
                        </span>
                      );
                    })()
                : base
                  ? t("floorPlans.askPrice")
                  : property.price;
            const details = base?.detailsSqft;

            return (
              <div key={property.id} className="floor-plan-item">
                <button
                  className="floor-plan-header"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={openIndex === index}
                >
                  <div className="floor-plan-info">
                    <h3 className="property-type">{property.type}</h3>
                    <span className="property-area">{areaValue}</span>
                    <span className="property-price">{priceValue}</span>
                  </div>
                  <div
                    className={`accordion-icon ${
                      openIndex === index ? "open" : ""
                    }`}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                <div
                  className={`floor-plan-content ${
                    openIndex === index ? "open" : ""
                  }`}
                >
                  {details && (
                    <div className="floor-plan-details">
                      <div className="floor-plan-images">
                        {(property.images || [image]).map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`${property.type} Passo by Beyond floor plan ${idx + 1}`}
                            className="floor-plan-image"
                            onClick={() => setZoomedImage(img)}
                            loading="lazy"
                          />
                        ))}
                      </div>

                      <div className="floor-plan-specs">
                        <h4 className="specs-title">
                          {t("floorPlans.areaTitle")}
                        </h4>
                        <div className="spec-row">
                          <span className="spec-label">
                            {t("floorPlans.labels.groundFloor")}
                          </span>
                          <span className="spec-value">
                            {formatArea(
                              details.groundFloor,
                              areaUnit,
                              lang,
                              unitLabels,
                            )}
                          </span>
                        </div>
                      <div className="spec-row">
                        <span className="spec-label">
                          {t("floorPlans.labels.firstFloor")}
                        </span>
                        <span className="spec-value">
                          {formatArea(
                            details.firstFloor,
                            areaUnit,
                            lang,
                            unitLabels,
                          )}
                        </span>
                      </div>
                      {details.thirdFloor && (
                        <div className="spec-row">
                          <span className="spec-label">
                            {t("floorPlans.labels.thirdFloor")}
                          </span>
                          <span className="spec-value">
                            {formatArea(
                              details.thirdFloor,
                              areaUnit,
                              lang,
                              unitLabels,
                            )}
                          </span>
                        </div>
                      )}
                      {details.garage && (
                        <div className="spec-row">
                          <span className="spec-label">
                            {t("floorPlans.labels.garageCovered")}
                          </span>
                          <span className="spec-value">
                            {formatArea(
                              details.garage,
                              areaUnit,
                              lang,
                              unitLabels,
                            )}
                          </span>
                        </div>
                      )}
                        <div className="spec-row">
                          <span className="spec-label">
                            {t("floorPlans.labels.floorPlans")}
                          </span>
                          <button
                            type="button"
                            className="download-link"
                            onClick={onOpenBrochure}
                          >
                            {t("floorPlans.labels.download")}
                          </button>
                        </div>
                        <button
                          className="register-button"
                          onClick={onOpenConsultation}
                        >
                          {t("floorPlans.labels.register")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="floor-plans-disclaimer">{t("floorPlans.disclaimer")}</p>

        <button className="download-all-button" onClick={onOpenBrochure}>
          {t("floorPlans.downloadAll")}
          <Download size={20} />
        </button>
      </div>

      {zoomedImage && (
        <div className="floor-plan-lightbox" onClick={() => setZoomedImage(null)}>
          <button
            className="lightbox-close"
            onClick={() => setZoomedImage(null)}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={zoomedImage}
            alt="Floor plan enlarged"
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default FloorPlansSection;
