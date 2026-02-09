import React, { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import "./PropertyGallery.css";

const PropertyGallery = () => {
  const { lang } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632142/ARRIVAL_2_eecob5.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632141/DIFC_Zabeel_District_AI_Campus_hiegfe.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632133/ARRIVAL_-_VALET_mwowj3.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632135/EXTERIOR_2_s0911g.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632134/EXTERIOR_1_t7pmzw.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632132/DIFC_Zabeel_District_Masterplan_Daytime_nfdpsd.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632130/DIFC_Zabeel_District_Residential_l5ewif.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632131/DIFC_Zabeel_District_Offices_cjal4v.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632129/POOL_V1_ka6esc.https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632125/POOL_hthava.jpgjpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632126/2BR_CLOSET_lm2u6x.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632126/DUPLEX_DAY_tpejly.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632125/EXTERIOR_HERO_SHOT_jjoo0w.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632125/POOL_hthava.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632124/KIDS_POOL_jrq1bb.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632124/EXTERIOR_HERO_SHOT_-_BURJ_KHALIFA_VIEW_wkws2j.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632122/DIFC_Zabeel_District_Art_Pavilion_Academy_01_dcaphi.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632121/TYPICAL_UNIT_-_MASTER_BATHROOM_pkae2z.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632120/1_BR_BEDROOM_z6ynya.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632120/DUPLEX_NIGHT_x9qkm5.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632120/2BR_LIVING_ROOM_baeuzj.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632120/TYPICAL_UNIT_-_POWDER_ROOM_detmmj.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632120/TYPICAL_UNIT_-_POWDER_ROOM_detmmj.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632120/3BR_LIVING_ROOM_nm3ha4.jpg",
    "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770632120/1BR_LIVING_ROOM_zcakko.jpg",
  ];

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e) => {
    if (!lightboxOpen) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage(e);
    if (e.key === "ArrowLeft") prevImage(e);
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div
      id="gallery"
      className="property-gallery reveal-on-scroll"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="gallery-grid">
        {/* Main large image */}
        <div className="gallery-main" onClick={() => openLightbox(0)}>
          <img
            src={images[0]}
            alt="DIFC Zabeel District, Dubai Palm Jumeirah waterfront view"
            loading="lazy"
          />
        </div>

        {/* Top right images */}
        <div className="gallery-top-right">
          <div className="gallery-item" onClick={() => openLightbox(1)}>
            <img
              src={images[1]}
              alt="DIFC Zabeel District, Dubai luxury pool area"
              loading="lazy"
            />
          </div>
          <div className="gallery-item" onClick={() => openLightbox(2)}>
            <img
              src={images[2]}
              alt="DIFC Zabeel District, Dubai modern interior design"
              loading="lazy"
            />
          </div>
        </div>

        {/* Bottom right images */}
        <div className="gallery-bottom-right">
          <div className="gallery-item" onClick={() => openLightbox(3)}>
            <img
              src={images[3]}
              alt="DIFC Zabeel District, Dubai residence entrance"
              loading="lazy"
            />
          </div>
          <div
            className="gallery-item gallery-item-more"
            onClick={() => openLightbox(4)}
          >
            <img
              src={images[4]}
              alt="DIFC Zabeel District, Dubai exterior architecture"
              loading="lazy"
            />
            <div className="gallery-overlay">
              <span className="gallery-button">
                Gallery
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7.5 15L12.5 10L7.5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button
            className="lightbox-arrow lightbox-arrow-left"
            onClick={prevImage}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M20 24L12 16L20 8"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentImageIndex]}
              alt={`DIFC Zabeel District, Dubai ${currentImageIndex + 1}`}
            />
            <div className="lightbox-counter">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          <button
            className="lightbox-arrow lightbox-arrow-right"
            onClick={nextImage}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M12 8L20 16L12 24"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;
