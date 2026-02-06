import { useState, useEffect } from "react";
import "./PropertyHero.css";
import { Printer, Share2, Home } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import Navigation from "./Navigation";

const PropertyHero = ({ onOpenBrochure, onOpenConsultation }) => {
  const { t, lang } = useLanguage();
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareData = {
      title: t("propertyHero.shareTitle"),
      text: t("propertyHero.shareText"),
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // User dismissed share sheet
      }
      return;
    }

    if (navigator.clipboard && url) {
      try {
        await navigator.clipboard.writeText(url);
        window.alert(t("propertyHero.shareCopied"));
        return;
      } catch (error) {
        // fall through
      }
    }

    if (url) {
      window.prompt(t("propertyHero.sharePrompt"), url);
    }
  };
  return (
    <div className={`property-hero ${heroLoaded ? "hero-loaded" : ""}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="property-hero__nav-shell">
        <Navigation onOpenConsultation={onOpenConsultation} />
      </div>
      {/* Hero Image */}
      <div className="property-hero__image-container">
        <picture>
          {/* 
      Для мобильных устройств (ширина до 768px):
      - w_800: ширина 800px
      - q_auto:eco: автоматическое качество (эко-режим)
      - f_auto: автоматический выбор формата (WebP/AVIF)
    */}
          <source
            media="(max-width: 768px)"
            srcset="https://res.cloudinary.com/dxp7ppipg/image/upload/w_800,q_auto:eco,f_auto/v1770374815/beyond-passo-palm-jumeirah_upscayl_1x_upscayl-lite-4x_bfjx95.png"
          />

          {/* 
      Для планшетов (ширина до 1280px ):
      - w_1280: ширина 1280px
    */}
          <source
            media="(max-width: 1280px)"
            srcset="https://res.cloudinary.com/dxp7ppipg/image/upload/w_1280,q_auto:eco,f_auto/v1770374815/beyond-passo-palm-jumeirah_upscayl_1x_upscayl-lite-4x_bfjx95.png"
          />

          {/* 
      Изображение по умолчанию для больших экранов (десктопы ):
      - w_1920: ширина 1920px
    */}
          <img
            src="https://res.cloudinary.com/dxp7ppipg/image/upload/w_1920,q_auto:eco,f_auto/v1770374815/beyond-passo-palm-jumeirah_upscayl_1x_upscayl-lite-4x_bfjx95.png"
            alt={t("propertyHero.altAerial")}
            className="property-hero__image"
            loading="lazy"
            width="1920"
            height="1080"
          />
        </picture>

        {/* Overlay gradient */}
        <div className="property-hero__overlay"></div>

        <div className="property-hero__center">
          <h1
            className="property-hero__title"
            aria-label={t("propertyHero.title")}
          >
            <img
              src="/icon.svg"
              alt={t("propertyHero.title")}
              className="property-hero__title-logo"
            />
          </h1>
          <p className="property-hero-minititle">by Beyond</p>
          <p className="property-hero__subtitle">
            {t("propertyHero.subtitle")}
          </p>
          <div className="property-hero__stats">
            <div className="property-hero__stat">
              <div className="property-hero__stat-label">
                {t("propertyHero.stats.startingPrice.label")}
              </div>
              <div className="property-hero__stat-value">
                {t("propertyHero.stats.startingPrice.value")}
                <span>{t("propertyHero.stats.startingPrice.subvalue")}</span>
              </div>
            </div>
            <div className="property-hero__stat">
              <div className="property-hero__stat-label">
                {t("propertyHero.stats.units.label")}
              </div>
              <div className="property-hero__stat-value">
                {t("propertyHero.stats.units.value")}
                <span>{t("propertyHero.stats.units.subvalue")}</span>
              </div>
            </div>
            <div className="property-hero__stat">
              <div className="property-hero__stat-label">
                {t("propertyHero.stats.handover.label")}
              </div>
              <div className="property-hero__stat-value">
                {t("propertyHero.stats.handover.value")}
                <span>{t("propertyHero.stats.handover.subvalue")}</span>
              </div>
            </div>
            <div className="property-hero__stat">
              <div className="property-hero__stat-label">
                {t("propertyHero.stats.paymentPlan.label")}
              </div>
              <div className="property-hero__stat-value">
                {t("propertyHero.stats.paymentPlan.value")}
                <span>{t("propertyHero.stats.paymentPlan.subvalue")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Top Navigation */}
        <div className="property-hero__nav">
          <div className="property-hero__actions">
            <button
              className="property-hero__action-btn"
              type="button"
              onClick={onOpenBrochure}
            >
              <Printer size={18} />
              <span>{t("propertyHero.save")}</span>
            </button>
            <button
              className="property-hero__action-btn"
              type="button"
              onClick={handleShare}
            >
              <Share2 size={18} />
              <span>{t("propertyHero.share")}</span>
            </button>
          </div>
        </div>
        {/* Property Type Tags */}
        {/* <div className="property-hero__tags">
          <button className="property-hero__tag">
            <Home size={16} />
            <span>{t("propertyHero.townhouses")}</span>
          </button>
          <button className="property-hero__tag property-hero__tag--active">
            <Home size={16} />
            <span>{t("propertyHero.villas")}</span>
          </button>
        </div> */}
        {/* Beyond Logo */}
        {/* <div className="property-hero__logo">
          <div className="property-hero__logo-text">BEYOND</div>
        </div> */}
      </div>
    </div>
  );
};

export default PropertyHero;
