import "./App.css";

//STYLES
import { GlobalStyles } from "./styles/GlobalStyles";
import { useEffect, useRef, lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "./i18n/LanguageContext";

//COMPONENTS
// import Navigation from "./components/Navigation";
import PropertyHero from "./components/PropertyHero";
import PropertyHeader from "./components/PropertyHeader";
import AboutProject from "./components/AboutProject";
const PropertyGallery = lazy(() => import("./components/PropertyGallery"));
const FloorPlansSection = lazy(() => import("./components/FloorPlansSection"));
const AdviceSection = lazy(() => import("./components/AdviceSection"));
const AmenitiesSection = lazy(() => import("./components/AmenitiesSection"));
const AboutDeveloperSection = lazy(
  () => import("./components/AboutDeveloperSection"),
);
const BrochureDownloadSection = lazy(
  () => import("./components/BrochureDownloadSection"),
);
const LocationSection = lazy(() => import("./components/LocationSection"));
const ProjectMaterialsSection = lazy(
  () => import("./components/ProjectMaterialsSection"),
);
const Questions = lazy(() => import("./components/Questions"));
const Footer = lazy(() => import("./components/Footer"));
const TermsAndConditions = lazy(() => import("./components/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const FloatingActions = lazy(() => import("./components/FloatingActions"));
const AppLanding = lazy(() => import("./components/AppLanding"));
const LinksPage = lazy(() => import("./components/LinksPage"));
const Block = lazy(() => import("./components/Block"));

function App() {
  const { t, lang } = useLanguage();
  const location = useLocation();
  const adviceSectionRef = useRef(null);
  const brochureSectionRef = useRef(null);
  const SITE_URL = "https://difc-zabeel.netlify.app";
  const canonicalUrl = `${SITE_URL}${location.pathname}`;
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "The Residences DIFC",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    telephone: "+971 4 428 6151",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Zabeel District, DIFC",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  };

  const handleOpenConsultation = () => {
    if (adviceSectionRef.current) {
      adviceSectionRef.current.openPopup();
    }
  };

  const handleOpenBrochure = (pdfUrl) => {
    if (brochureSectionRef.current) {
      brochureSectionRef.current.openPopup(pdfUrl);
    }
  };

  useEffect(() => {
    const supportsIO = "IntersectionObserver" in window;
    const revealAll = (nodes) => nodes.forEach((el) => el.classList.add("is-visible"));

    if (!supportsIO) {
      revealAll(Array.from(document.querySelectorAll(".reveal-on-scroll")));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    const markVisible = (el) => {
      if (!el.classList.contains("is-visible")) {
        el.classList.add("is-visible");
      }
      observer.unobserve(el);
    };

    const observeNodes = (nodes) => {
      nodes.forEach((el) => {
        if (!el.classList.contains("is-visible")) {
          observer.observe(el);
        }
      });
    };

    const initialNodes = Array.from(document.querySelectorAll(".reveal-on-scroll"));
    observeNodes(initialNodes);

    let rafId = null;
    const checkInView = () => {
      const nodes = Array.from(
        document.querySelectorAll(".reveal-on-scroll:not(.is-visible)"),
      );
      nodes.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
          markVisible(el);
        }
      });
    };

    const scheduleCheck = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        checkInView();
      });
    };

    checkInView();

    const mutationObserver = new MutationObserver((mutations) => {
      const added = [];
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.classList?.contains("reveal-on-scroll")) {
            added.push(node);
          }
          if (node.querySelectorAll) {
            node.querySelectorAll(".reveal-on-scroll").forEach((child) => {
              added.push(child);
            });
          }
        });
      });
      if (added.length) {
        observeNodes(added);
        scheduleCheck();
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck);

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
    };
  }, [location.pathname]);

  return (
    <div className="App">
      <Helmet>
        <html lang={lang} />
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={`${canonicalUrl}?lang=en`} />
        <link rel="alternate" hrefLang="ru" href={`${canonicalUrl}?lang=ru`} />
        <link rel="alternate" hrefLang="ar" href={`${canonicalUrl}?lang=ar`} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

        {/* Стандарт Open Graph (Facebook, WhatsApp, Telegram, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t("meta.title")} />
        <meta property="og:description" content={t("meta.description")} />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="The Residences DIFC" />
        <meta
          property="og:locale"
          content={lang === "ar" ? "ar_AE" : lang === "ru" ? "ru_RU" : "en_GB"}
        />

        {/* Специфично для Twitter (X ) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("meta.title")} />
        <meta name="twitter:description" content={t("meta.description")} />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.jpg`} />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      <GlobalStyles />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* <Navigation onOpenConsultation={handleOpenConsultation} /> */}
              <main id="main-content">
                <PropertyHero
                  onOpenBrochure={handleOpenBrochure}
                  onOpenConsultation={handleOpenConsultation}
                />
                <PropertyHeader
                  onOpenConsultation={handleOpenConsultation}
                  onOpenBrochure={handleOpenBrochure}
                />
                <AboutProject />
                <Suspense fallback={null}>
                  <PropertyGallery />
                </Suspense>
                <Suspense fallback={null}>
                  <FloorPlansSection
                    onOpenBrochure={handleOpenBrochure}
                    onOpenConsultation={handleOpenConsultation}
                  />
                </Suspense>
                <Suspense fallback={null}>
                  <AdviceSection ref={adviceSectionRef} />
                </Suspense>
                <Suspense fallback={null}>
                  <AmenitiesSection onOpenBrochure={handleOpenBrochure} />
                </Suspense>
                <Suspense fallback={null}>
                  <AboutDeveloperSection
                    onOpenConsultation={handleOpenConsultation}
                  />
                </Suspense>
                <Suspense fallback={null}>
                  <BrochureDownloadSection ref={brochureSectionRef} />
                </Suspense>
                <Suspense fallback={null}>
                  <LocationSection onOpenBrochure={handleOpenBrochure} />
                </Suspense>
                <Suspense fallback={null}>
                  <ProjectMaterialsSection onOpenBrochure={handleOpenBrochure} />
                </Suspense>
                <Suspense fallback={null}>
                  <Questions />
                </Suspense>
                <Suspense fallback={null}>
                  <FloatingActions />
                </Suspense>
                <Suspense fallback={null}>
                  <AppLanding />
                </Suspense>
              </main>
              <Suspense fallback={null}>
                <Footer />
              </Suspense>
            </>
          }
        />
        <Route
          path="/terms"
          element={
            <>
              <main>
                <Suspense fallback={null}>
                  <TermsAndConditions />
                </Suspense>
              </main>
              <Suspense fallback={null}>
                <Footer />
              </Suspense>
            </>
          }
        />
        <Route
          path="/privacy"
          element={
            <>
              <main>
                <Suspense fallback={null}>
                  <PrivacyPolicy />
                </Suspense>
              </main>
              <Suspense fallback={null}>
                <Footer />
              </Suspense>
            </>
          }
        />
        <Route
          path="/block"
          element={
            <>
              <main>
                <Suspense fallback={null}>
                  <Block />
                </Suspense>
              </main>
              <Suspense fallback={null}>
                <Footer />
              </Suspense>
            </>
          }
        />
        <Route
          path="/links"
          element={
            <Suspense fallback={null}>
              <LinksPage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
