import React from "react";
import {
  FileDown,
  Landmark,
  Building2,
  Trees,
  ShoppingBag,
  Users,
  Waves,
  Droplets,
  Dumbbell,
  Swords,
  Star,
  Sparkles,
  Armchair,
  Laptop,
  TreePalm,
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
                src="https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632130/DIFC_Zabeel_District_Residential_l5ewif.jpg"
                alt="The Residences DIFC green walkways"
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
                src="https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632125/POOL_hthava.jpg"
                alt="The Residences DIFC pool and leisure"
                className="amenity-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="amenity-tags">
          <div className="tag">
            <Landmark size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.views")}</span>
          </div>
          <div className="tag">
            <Building2 size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.architecture")}</span>
          </div>
          <div className="tag">
            <Trees size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.greenLoop")}</span>
          </div>
          <div className="tag">
            <ShoppingBag size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.retail")}</span>
          </div>
          <div className="tag">
            <Users size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.social")}</span>
          </div>
          <div className="tag">
            <Waves size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.pool")}</span>
          </div>
          <div className="tag">
            <Droplets size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.familyPool")}</span>
          </div>
          <div className="tag">
            <Dumbbell size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.clubhouse")}</span>
          </div>
          <div className="tag">
            <Swords size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.courts")}</span>
          </div>
          <div className="tag">
            <Star size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.arrival")}</span>
          </div>
          <div className="tag">
            <Sparkles size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.waterFeatures")}</span>
          </div>
          <div className="tag">
            <Armchair size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.lobby")}</span>
          </div>
          <div className="tag">
            <Laptop size={18} className="tag-icon" />
            <span className="tag-text">{t("amenities.tags.coworking")}</span>
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
