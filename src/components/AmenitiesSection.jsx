import React from "react";
import {
  FileDown,
  Waves,
  Droplets,
  BookOpen,
  Music,
  Baby,
  Dumbbell,
  TreePalm,
  BellRing,
  PlugZap,
  Smartphone,
  Star,
} from "lucide-react";
import "./AmenitiesSection.css";
import { useLanguage } from "../i18n/LanguageContext";

const AmenitiesSection = ({ onOpenBrochure }) => {
  const { t, lang } = useLanguage();
  return (
    <section
      id="amenities"
      className="amenities-section"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="amenities-container">
        <h2 className="amenities-title">
          {t("amenities.titlePrefix")}{" "}
          <span className="text-accent">{t("amenities.titleAccent")}</span>
        </h2>

        <div className="amenities-grid">
          {/* Left Column - Private Beach */}
          <div className="amenity-card">
            <div className="amenity-icon-circle">
              <TreePalm size={28} strokeWidth={1} className="amenity-icon" />
            </div>
            <h3 className="amenity-heading">
              {t("amenities.cards.beach.title")}
            </h3>
            <p className="amenity-description">
              {t("amenities.cards.beach.description")}
            </p>
            <div className="amenity-image-wrapper">
              <img
                src="https://metropolitan.realestate/wp-content/uploads/2024/02/Bay-Villas-1-768x433.jpg"
                alt="Bay Villas Phase 2 aerial view Dubai Islands"
                className="amenity-image"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column - Wellness & Leisure */}
          <div className="amenity-card">
            <div className="amenity-icon-circle">
              <Star size={28} strokeWidth={1} className="amenity-icon" />
            </div>
            <h3 className="amenity-heading">
              {t("amenities.cards.community.title")}
            </h3>
            <p className="amenity-description">
              {t("amenities.cards.community.description")}
            </p>
            <div className="amenity-image-wrapper">
              <img
                src="https://metropolitan.realestate/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2024/02/Bay-Villas-2-768x433.jpg.webp"
                alt="Bay Villas Phase 2 pool and waterfront view"
                className="amenity-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="amenity-tags">
          <div className="tag">
            <Waves size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.skyPool")}</span>
          </div>
          <div className="tag">
            <Droplets size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.cascadingPools")}</span>
          </div>
          <div className="tag">
            <BookOpen size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.socialClub")}</span>
          </div>
          <div className="tag">
            <Music size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.pianoCafe")}</span>
          </div>
          <div className="tag">
            <Baby size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.kidsClub")}</span>
          </div>
          <div className="tag">
            <Dumbbell size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.fitness")}</span>
          </div>
          <div className="tag">
            <TreePalm size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.wellness")}</span>
          </div>
          <div className="tag">
            <BellRing size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.concierge")}</span>
          </div>
          <div className="tag">
            <PlugZap size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.evCharging")}</span>
          </div>
          <div className="tag">
            <Smartphone size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.smartHome")}</span>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="amenity-buttons">
          <button className="amenity-btn btn-primary" onClick={onOpenBrochure}>
            <FileDown size={20} />
            {t("amenities.downloadBrochure")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
