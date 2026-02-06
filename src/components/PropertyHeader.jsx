import React from "react";
import { Download, ChevronRight, MapPin } from "lucide-react";
import "./PropertyHeader.css";
import { useLanguage } from "../i18n/LanguageContext";

const PropertyHeader = ({ onOpenConsultation, onOpenBrochure }) => {
  const { t, lang } = useLanguage();
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="property-header" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="property-header__content">
        <div className="property-header__main">
          <h1 className="property-header__title">
            <span className="text-accent">{t("propertyHeader.titleAccent")}</span>{" "}
            {t("propertyHeader.titleBy")}
            <br />
            {t("propertyHeader.titleLocation")}
          </h1>

          <div className="property-header__tabs">
            <button
              className="property-header__tab"
              onClick={(e) => handleSmoothScroll(e, "about")}
            >
              {t("propertyHeader.tabs.about")}
            </button>
            <button
              className="property-header__tab"
              onClick={(e) => handleSmoothScroll(e, "gallery")}
            >
              {t("propertyHeader.tabs.gallery")}
            </button>
            <button
              className="property-header__tab"
              onClick={(e) => handleSmoothScroll(e, "floor-plans")}
            >
              {t("propertyHeader.tabs.floorPlans")}
            </button>
            <button
              className="property-header__tab"
              onClick={(e) => handleSmoothScroll(e, "amenities")}
            >
              {t("propertyHeader.tabs.amenities")}
            </button>
            <button
              className="property-header__tab"
              onClick={(e) => handleSmoothScroll(e, "developer")}
            >
              {t("propertyHeader.tabs.developer")}
            </button>
            <button
              className="property-header__tab"
              onClick={(e) => handleSmoothScroll(e, "location")}
            >
              {t("propertyHeader.tabs.location")}
            </button>
            <button
              className="property-header__tab"
              onClick={(e) => handleSmoothScroll(e, "materials")}
            >
              {t("propertyHeader.tabs.materials")}
            </button>
            <button
              className="property-header__tab"
              onClick={(e) => handleSmoothScroll(e, "faq")}
            >
              {t("propertyHeader.tabs.faq")}
            </button>
          </div>
        </div>

        <div className="property-header__info">
          <div className="property-header__location">
            <MapPin size={20} color="#c00000" />
            <span>{t("propertyHeader.location")}</span>
          </div>

          <div className="property-header__details">
            <div className="property-header__detail">
              <div className="property-header__detail-label">TBC</div>
              <div className="property-header__detail-value">
                {t("propertyHeader.handover")}
              </div>
            </div>
            <div className="property-header__detail">
              <div className="property-header__detail-label">TBC</div>
              <div className="property-header__detail-value">
                {t("propertyHeader.paymentPlan")}
              </div>
            </div>
          </div>

          <div className="property-header__actions">
            <button
              className="property-header__btn property-header__btn--primary"
              onClick={onOpenConsultation}
            >
              {t("propertyHeader.inquiry")}
              <ChevronRight size={20} />
            </button>
            <button
              className="property-header__btn property-header__btn--secondary"
              onClick={onOpenBrochure}
            >
              {t("propertyHeader.brochure")}
              <Download size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;
