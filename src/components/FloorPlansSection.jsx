import React from "react";
import { Download } from "lucide-react";
import "./FloorPlansSection.css";
import { useLanguage } from "../i18n/LanguageContext";
import { useSettings } from "../context/SettingsContext";
import { formatArea } from "../utils/formatters";
import { floorPlansBase } from "../data/floorPlansBase";

const FloorPlansSection = ({ onOpenBrochure, onOpenConsultation }) => {
  const { t, lang } = useLanguage();
  const { areaUnit, setAreaUnit } = useSettings();

  const propertiesData = t("floorPlans.properties");
  const properties = Array.isArray(propertiesData) ? propertiesData : [];
  const baseById = new Map(floorPlansBase.map((item) => [item.id, item]));
  const unitLabels = {
    sqft: t("units.sqft"),
    sqm: t("units.sqm"),
  };

  return (
    <section
      id="floor-plans"
      className="floor-plans-section reveal-on-scroll"
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
        <div className="fp-table">
          <div className="fp-table-header">
            <span className="fp-th">
              {t("floorPlans.headers.propertyType")}
            </span>
            <span className="fp-th">{t("floorPlans.headers.units")}</span>
            <span className="fp-th">{t("floorPlans.headers.livingArea")}</span>
          </div>

          <div className="fp-table-body">
            {properties.map((property) => {
              const base = baseById.get(property.id);
              const areaValue = base?.areaSqft
                ? formatArea(base.areaSqft, areaUnit, lang, unitLabels)
                : property.area;
              const unitCount = base?.units ?? "—";

              return (
                <div key={property.id} className="fp-table-row">
                  <span className="fp-td fp-td-type">{property.type}</span>
                  <span
                    className="fp-td fp-td-units"
                    data-label={t("floorPlans.headers.units")}
                  >
                    {unitCount}
                  </span>
                  <span
                    className="fp-td fp-td-area"
                    data-label={t("floorPlans.headers.livingArea")}
                  >
                    {areaValue}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {/* <p className="floor-plans-disclaimer">{t("floorPlans.disclaimer")}</p> */}{" "}
        <div className="fp-actions">
          <button
            className="fp-action-btn fp-action-primary"
            onClick={onOpenBrochure}
          >
            {t("floorPlans.downloadAll")}
            <Download size={18} />
          </button>
          <button
            className="fp-action-btn fp-action-secondary"
            onClick={onOpenConsultation}
          >
            {t("floorPlans.labels.register")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FloorPlansSection;
