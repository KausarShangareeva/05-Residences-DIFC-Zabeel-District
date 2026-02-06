import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Download } from "lucide-react";
import "./BrochureDownloadSection.css";
import { useLanguage } from "../i18n/LanguageContext";
import { submitLead } from "../utils/api";
import {
  buildPhonePayload,
  detectCountryFromPhone,
  formatPhoneInput,
  getPhoneMeta,
  validatePhoneNumber,
} from "../utils/phone";
import CountrySelect from "./CountrySelect";
import { countries } from "../data/countries";

const BrochureDownloadSection = forwardRef((props, ref) => {
  const { t, lang } = useLanguage();
  const defaultCountry =
    countries.find((country) => country.code === "AE") || countries[0];
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    agreeToUpdates: false,
  });

  useEffect(() => {
    setFormData((prev) =>
      prev.phone ? prev : { ...prev, phone: `${selectedCountry.dial} ` },
    );
  }, [selectedCountry]);

  useImperativeHandle(ref, () => ({
    openPopup: () => {
      setIsPopupOpen(true);
      document.body.style.overflow = "hidden";
    },
    closePopup: () => {
      setIsPopupOpen(false);
      document.body.style.overflow = "auto";
    },
  }));

  const formatTemplate = (template, vars) => {
    return String(template || "").replace(/\{(\w+)\}/g, (_, key) =>
      vars[key] === undefined ? `{${key}}` : String(vars[key]),
    );
  };

  const pluralizeRu = (count, forms) => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return forms[0];
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
      return forms[1];
    return forms[2];
  };

  const getLiveHint = (missing) => {
    if (!missing || missing <= 0) {
      return "";
    }
    if (lang === "ru") {
      if (missing === 1) {
        return "Осталась 1 цифра";
      }
      const word = pluralizeRu(missing, ["цифра", "цифры", "цифр"]);
      return `Введите ещё ${missing} ${word}`;
    }
    if (lang === "ar") {
      return missing === 1 ? "تبقى رقم واحد" : `أدخل ${missing} أرقام إضافية`;
    }
    return missing === 1 ? "1 digit left" : `Enter ${missing} more digits`;
  };

  const getPhoneErrorMessage = (validation, country) => {
    if (validation.status === "ok") {
      return "";
    }
    const meta = getPhoneMeta(country.code);
    const missing =
      validation.missing ??
      Math.max(0, (validation.min || 0) - (validation.nationalLength || 0));
    const excess =
      validation.excess ??
      Math.max(0, (validation.nationalLength || 0) - (validation.max || 0));
    const template = t(`brochure.form.phoneErrors.${validation.status}`);
    return formatTemplate(template, {
      count: missing || excess || "",
      country: country?.name || "",
      digits: meta.maxDigits,
      dial: meta.dial,
      example: meta.example,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "phone") {
      // Auto-detect country from typed country code
      const detectedCountryCode = detectCountryFromPhone(value, countries);
      let currentCountry = selectedCountry;
      if (detectedCountryCode && detectedCountryCode !== selectedCountry.code) {
        const matchedCountry = countries.find(
          (c) => c.code === detectedCountryCode,
        );
        if (matchedCountry) {
          currentCountry = matchedCountry;
          setSelectedCountry(matchedCountry);
        }
      }
      const nextValue = formatPhoneInput(value, currentCountry.code);
      setFormData((prev) => ({
        ...prev,
        phone: nextValue,
      }));
      const validation = validatePhoneNumber(nextValue, currentCountry.code);
      // Only show error immediately for tooLong, clear for other cases while typing
      if (validation.status === "tooLong") {
        setPhoneError(getPhoneErrorMessage(validation, currentCountry));
      } else {
        setPhoneError("");
      }
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhoneBlur = () => {
    setPhoneTouched(true);
    const validation = validatePhoneNumber(
      formData.phone,
      selectedCountry.code,
    );
    setPhoneError(getPhoneErrorMessage(validation, selectedCountry));
  };

  const handleCountryChange = (country) => {
    // Clear phone number when changing country from dropdown
    const nextPhone = `${country.dial} `;
    setSelectedCountry(country);
    setFormData((prev) => ({
      ...prev,
      phone: nextPhone,
    }));
    setPhoneTouched(false);
    setPhoneError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validatePhoneNumber(
      formData.phone,
      selectedCountry.code,
    );
    if (validation.status !== "ok") {
      setPhoneTouched(true);
      setPhoneError(getPhoneErrorMessage(validation, selectedCountry));
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);

    const result = await submitLead({
      fullName: formData.fullName,
      email: formData.email,
      phone: buildPhonePayload(formData.phone, selectedCountry.code),
      source: "brochure_download",
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        agreeToUpdates: false,
      });
      setPhoneTouched(false);
      setPhoneError("");
      setIsDeliveryOpen(true);
    } else {
      setSubmitStatus("error");
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = "auto";
  };

  const closeDeliveryModal = () => {
    setIsDeliveryOpen(false);
    closePopup();
    setSubmitStatus(null);
  };

  const pdfUrl = "/brochures/Bay-Villas.pdf";

  const handlePdfOpen = () => {
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
    closeDeliveryModal();
  };

  const brochureMessages = {
    en: [
      "Hi! 😊",
      "Thanks for reaching out and showing interest in Passo by Beyond.",
      "",
      "Here is the brochure with all the key details:",
      pdfUrl,
      "",
      "Let us know if you’d like recommendations based on your budget or preferences — we’re here to help.",
    ],
    ru: [
      "Здравствуйте! 😊",
      "Спасибо за ваш интерес к проекту Passo by Beyond.",
      "",
      "По ссылке ниже вы можете скачать официальную брошюру с планировками, ценами и подробной информацией:",
      pdfUrl,
      "",
      "Если появятся вопросы или нужен индивидуальный подбор — с радостью поможем.",
    ],
    ar: [
      "😊 مرحبًا!",
      "شكرًا لاهتمامك بمشروع Passo by Beyond.",
      "",
      "يمكنك تحميل الكتيّب الرسمي من الرابط أدناه:",
      pdfUrl,
      "",
      "يسعدنا مساعدتك في حال كان لديك أي استفسار.",
    ],
  };

  const getBrochureMessage = () => {
    const messages = brochureMessages[lang] || brochureMessages.en;
    return messages.join("\n");
  };

  const handleWhatsappOpen = () => {
    const phone = "971567715771";
    const text = getBrochureMessage();
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
    closeDeliveryModal();
  };

  const handleTelegramOpen = () => {
    const text = getBrochureMessage();
    window.open(
      `https://t.me/iammmhmd?text=${encodeURIComponent(text)}`,
      "_blank",
    );
    closeDeliveryModal();
  };

  const phoneMeta = getPhoneMeta(selectedCountry.code);
  const phoneValidation = validatePhoneNumber(
    formData.phone,
    selectedCountry.code,
  );
  const isPhoneValid = phoneValidation.status === "ok";
  const hasStartedTyping = phoneValidation.nationalLength > 0;
  // Calculate remaining digits needed
  const digitsRemaining = Math.max(
    0,
    (phoneValidation.min || 0) - (phoneValidation.nationalLength || 0),
  );
  // Show live hint while typing (when no error is set)
  // Also show for "mismatch" if still below minimum length
  const liveHint =
    !phoneError && hasStartedTyping && digitsRemaining > 0
      ? getLiveHint(digitsRemaining)
      : "";
  const initialHint = !hasStartedTyping
    ? t("brochure.form.phoneErrors.required")
    : "";
  // Show mismatch hint when enough digits but wrong format
  const mismatchHint =
    hasStartedTyping && !phoneError && digitsRemaining === 0 && !isPhoneValid
      ? getPhoneErrorMessage(phoneValidation, selectedCountry)
      : "";
  const agentMessage = isPhoneValid
    ? t("brochure.form.phoneValid")
    : phoneError || liveHint || mismatchHint || initialHint;
  const agentTone = isPhoneValid
    ? "success"
    : phoneError
      ? "error"
      : liveHint || mismatchHint
        ? "warning"
        : "info";
  const renderAgentMessage = (id) => (
    <div className={`agent-message agent-message--${agentTone}`} id={id}>
      <img
        className="agent-avatar"
        src="/face.jpg"
        alt="Dubai real estate consultant"
        loading="lazy"
      />
      <div className="agent-bubble">
        <p>{agentMessage}</p>
      </div>
    </div>
  );

  return (
    <section className="brochure-section" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="brochure-container">
        <div className="brochure-content">
          <div className="brochure-form-wrapper">
            <h2 className="brochure-title">
              {t("brochure.titlePrefix")}{" "}
              <span className="text-accent">{t("brochure.titleAccent")}</span>
            </h2>

            <form className="brochure-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="brochure-fullName">
                    {t("brochure.form.fullName")}
                  </label>
                  <input
                    type="text"
                    id="brochure-fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="brochure-email">
                    {t("brochure.form.email")}
                  </label>
                  <input
                    type="email"
                    id="brochure-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="brochure-phone">
                  {t("brochure.form.phone")}
                </label>
                <div
                  className={`phone-input-wrapper ${
                    phoneError ? "has-error" : ""
                  }`}
                >
                  <CountrySelect
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    searchPlaceholder={t("brochure.form.countrySearch")}
                    emptyLabel={t("brochure.form.noResults")}
                  />
                  <input
                    type="tel"
                    id="brochure-phone"
                    name="phone"
                    placeholder={phoneMeta.example}
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handlePhoneBlur}
                    inputMode="tel"
                    autoComplete="tel"
                    aria-invalid={phoneError ? "true" : "false"}
                    aria-describedby={
                      phoneError ? "brochure-phone-error" : undefined
                    }
                    required
                  />
                  {isPhoneValid && (
                    <span className="phone-valid-indicator">✓</span>
                  )}
                </div>
                {renderAgentMessage("brochure-phone-error")}
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="brochure-agreeToUpdates"
                  name="agreeToUpdates"
                  checked={formData.agreeToUpdates}
                  onChange={handleChange}
                />
                <label htmlFor="brochure-agreeToUpdates">
                  {t("brochure.form.checkboxLabel")}
                </label>
              </div>

              <p className="form-disclaimer">
                {t("brochure.disclaimer")}{" "}
                <a href="/privacy" target="_blank" rel="noreferrer">
                  {t("brochure.privacyPolicy")}
                </a>
                , {t("brochure.disclaimerMiddle")}{" "}
                <a href="/terms" target="_blank" rel="noreferrer">
                  {t("brochure.termsOfUse")}
                </a>
                .
              </p>

              {submitStatus === "success" && (
                <div className="form-success">
                  Thank you! We'll contact you soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="form-error">
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting || !isPhoneValid}
              >
                <span>
                  {isSubmitting ? "Sending..." : t("brochure.submit")}
                </span>
                {!isSubmitting && <Download size={18} />}
              </button>
              <p className="form-button-note">
                {t("brochure.form.buttonNote")}
              </p>
            </form>
          </div>

          <div className="brochure-visual">
            <div className="brochure-preview">
              <img
                src="https://res.cloudinary.com/dxp7ppipg/image/upload/v1770376408/ChatGPT_Image_Feb_6_2026_12_13_21_PM_dcwajt.png"
                alt="Bay Villas Phase 2 Dubai Islands brochure preview"
                className="brochure-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brochure Download Popup */}
      {isPopupOpen && (
        <>
          <div className="popup-overlay" onClick={closePopup}></div>
          <div className="popup-modal" dir={lang === "ar" ? "rtl" : "ltr"}>
            <button className="popup-close" onClick={closePopup}></button>
            <div className="popup-content">
              <h2 className="popup-title">
                {t("brochure.popupTitlePrefix")}{" "}
                <span className="text-accent">
                  {t("brochure.popupTitleAccent")}
                </span>
              </h2>
              <p className="popup-subtitle">{t("brochure.popupSubtitle")}</p>
              <form className="brochure-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="brochure-popup-fullName">
                      {t("brochure.form.fullName")}
                    </label>
                    <input
                      type="text"
                      id="brochure-popup-fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="brochure-popup-email">
                      {t("brochure.form.email")}
                    </label>
                    <input
                      type="email"
                      id="brochure-popup-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="brochure-popup-phone">
                    {t("brochure.form.phone")}
                  </label>
                  <div
                    className={`phone-input-wrapper ${
                      phoneError ? "has-error" : ""
                    }`}
                  >
                    <CountrySelect
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      searchPlaceholder={t("brochure.form.countrySearch")}
                      emptyLabel={t("brochure.form.noResults")}
                    />
                    <input
                      type="tel"
                      id="brochure-popup-phone"
                      name="phone"
                      placeholder={phoneMeta.example}
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handlePhoneBlur}
                      inputMode="tel"
                      autoComplete="tel"
                      aria-invalid={phoneError ? "true" : "false"}
                      aria-describedby={
                        phoneError
                          ? "brochure-brochure-popup-phone-error"
                          : undefined
                      }
                      required
                    />
                    {isPhoneValid && (
                      <span className="phone-valid-indicator">✓</span>
                    )}
                  </div>
                  {renderAgentMessage("brochure-brochure-popup-phone-error")}
                </div>

                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="brochure-popup-agreeToUpdates"
                    name="agreeToUpdates"
                    checked={formData.agreeToUpdates}
                    onChange={handleChange}
                  />
                  <label htmlFor="brochure-popup-agreeToUpdates">
                    {t("brochure.form.checkboxLabel")}
                  </label>
                </div>

                <p className="form-disclaimer">
                  {t("brochure.disclaimer")}{" "}
                  <a href="/privacy" target="_blank" rel="noreferrer">
                    {t("brochure.privacyPolicy")}
                  </a>
                  , {t("brochure.disclaimerMiddle")}{" "}
                  <a href="/terms" target="_blank" rel="noreferrer">
                    {t("brochure.termsOfUse")}
                  </a>
                  .
                </p>

                {submitStatus === "success" && (
                  <div className="form-success">
                    Thank you! We'll contact you soon.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="form-error">
                    Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-button btn-primary"
                  disabled={isSubmitting || !isPhoneValid}
                >
                  <span>
                    {isSubmitting ? "Sending..." : t("brochure.submit")}
                  </span>
                  {!isSubmitting && <Download size={18} />}
                </button>
                <p className="form-button-note">
                  {t("brochure.form.buttonNote")}
                </p>
              </form>
            </div>
          </div>
        </>
      )}

      {isDeliveryOpen && (
        <>
          <div className="delivery-overlay" onClick={closeDeliveryModal}></div>
          <div className="delivery-modal" role="dialog" aria-modal="true">
            <button className="popup-close" onClick={closeDeliveryModal}>
              X
            </button>
            <div className="delivery-content">
              <h3 className="delivery-title">{t("pdf.chooseDelivery")}</h3>
              <div className="delivery-actions">
                <button
                  type="button"
                  className="delivery-button delivery-button--pdf"
                  onClick={handlePdfOpen}
                >
                  {t("pdf.downloadPdf")}
                </button>
                <button
                  type="button"
                  className="delivery-button delivery-button--wa"
                  onClick={handleWhatsappOpen}
                >
                  WhatsApp
                </button>
                <button
                  type="button"
                  className="delivery-button delivery-button--tg"
                  onClick={handleTelegramOpen}
                >
                  Telegram
                </button>
              </div>
              <p className="delivery-fallback">{t("pdf.retryDownload")}</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
});

export default BrochureDownloadSection;
