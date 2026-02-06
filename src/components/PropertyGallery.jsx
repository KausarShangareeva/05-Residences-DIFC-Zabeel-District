import React, { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import "./PropertyGallery.css";

const PropertyGallery = () => {
  const { lang } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://metropolitan.realestate/wp-content/uploads/2025/08/main-2.webp?_gl=1*1ousvds*_up*MQ..*_ga*MTY4NDI2MTY4My4xNzcwMzgwNjk5*_ga_EDLBN60YJR*czE3NzAzODA2OTkkbzEkZzAkdDE3NzAzODA2OTkkajYwJGwwJGgxMjUzNjk2MzA1",
    "https://metropolitan.realestate/wp-content/uploads/2025/08/Passo_Project-Brochure-32.jpg",
    "https://metropolitan.realestate/wp-content/uploads/2025/08/Passo_Project-Brochure-33.webp",
    "https://metropolitan.realestate/wp-content/uploads/2025/08/Passo_Project-Brochure-40.webp",
    "https://metropolitan.realestate/wp-content/uploads/2025/08/Passo_Project-Brochure-45.webp",
    "https://metropolitan.realestate/wp-content/uploads/2025/08/Passo_Project-Brochure-52.webp",
    "https://metropolitan.realestate/wp-content/uploads/2025/08/Passo_Project-Brochure-56.webp",
    "https://metropolitan.realestate/wp-content/uploads/2025/08/Passo_Project-Brochure-57.webp",
    "https://metropolitan.realestate/wp-content/uploads/2025/08/Passo_Project-Brochure-58-1.webp",
    "https://metropolitan.realestate/wp-content/uploads/2025/08/Passo_Project-Brochure-64.webp",
    "https://metropolitan.realestate/wp-content/uploads/2025/08/Passo_Project-Brochure-72.webp",
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
      className="property-gallery"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="gallery-grid">
        {/* Main large image */}
        <div className="gallery-main" onClick={() => openLightbox(0)}>
          <img src={images[0]} alt="Passo by Beyond Palm Jumeirah waterfront view" loading="lazy" />
        </div>

        {/* Top right images */}
        <div className="gallery-top-right">
          <div className="gallery-item" onClick={() => openLightbox(1)}>
            <img src={images[1]} alt="Passo by Beyond luxury pool area" loading="lazy" />
          </div>
          <div className="gallery-item" onClick={() => openLightbox(2)}>
            <img src={images[2]} alt="Passo by Beyond modern interior design" loading="lazy" />
          </div>
        </div>

        {/* Bottom right images */}
        <div className="gallery-bottom-right">
          <div className="gallery-item" onClick={() => openLightbox(3)}>
            <img src={images[3]} alt="Passo by Beyond residence entrance" loading="lazy" />
          </div>
          <div
            className="gallery-item gallery-item-more"
            onClick={() => openLightbox(4)}
          >
            <img src={images[4]} alt="Passo by Beyond exterior architecture" loading="lazy" />
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
              alt={`Passo by Beyond ${currentImageIndex + 1}`}
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
