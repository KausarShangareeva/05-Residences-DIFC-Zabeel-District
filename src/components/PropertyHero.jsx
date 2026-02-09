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
    <div
      className={`property-hero ${heroLoaded ? "hero-loaded" : ""}`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="property-hero__nav-shell">
        <Navigation onOpenConsultation={onOpenConsultation} />
      </div>
      {/* Hero Image */}
      <div className="property-hero__image-container">
        <img
          src="https://res.cloudinary.com/dxp7ppipg/image/upload/f_auto,q_auto,w_1600/v1770632125/POOL_hthava.jpg"
          srcSet="
            https://res.cloudinary.com/dxp7ppipg/image/upload/f_auto,q_auto,w_768/v1770632125/POOL_hthava.jpg 768w,
            https://res.cloudinary.com/dxp7ppipg/image/upload/f_auto,q_auto,w_1200/v1770632125/POOL_hthava.jpg 1200w,
            https://res.cloudinary.com/dxp7ppipg/image/upload/f_auto,q_auto,w_1600/v1770632125/POOL_hthava.jpg 1600w,
            https://res.cloudinary.com/dxp7ppipg/image/upload/f_auto,q_auto,w_1920/v1770632125/POOL_hthava.jpg 1920w
          "
          sizes="(max-width: 1024px) 100vw, 100vw"
          alt={t("propertyHero.altAerial")}
          className="property-hero__image"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        {/* Overlay gradient */}
        <div className="property-hero__overlay"></div>

        <div className="property-hero__center">
          <h1
            className="property-hero__title"
            aria-label={`${t("propertyHero.titleScript")} ${t("propertyHero.titleMain")}`}
          >
            <span className="property-hero__title-script">
              {t("propertyHero.titleScript")}
            </span>
            <span className="property-hero__title-main">
              {t("propertyHero.titleMain")}
            </span>
          </h1>
          <p className="property-hero__subtitle">
            <span className="property-hero__subtitle-lead">
              {t("propertyHero.subtitleLead")}
            </span>
            <span className="property-hero__subtitle-trail">
              {t("propertyHero.subtitleTrail")}
            </span>
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
