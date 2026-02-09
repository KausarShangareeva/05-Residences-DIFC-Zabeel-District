import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import "./AdviceSection.css";
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

const AdviceSection = forwardRef((props, ref) => {
  const { t, lang } = useLanguage();
  const getDefaultCountryCode = () => {
    if (typeof navigator !== "undefined") {
      const locale = navigator.language || "";
      const match = locale.match(/-([A-Z]{2})$/i);
      if (match) {
        return match[1].toUpperCase();
      }
    }
    return lang === "ru" ? "RU" : "AE";
  };
  const [selectedCountry, setSelectedCountry] = useState(() => {
    const defaultCountryCode = getDefaultCountryCode();
    return (
      countries.find((country) => country.code === defaultCountryCode) ||
      countries[0]
    );
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
    const template = t(`advice.form.phoneErrors.${validation.status}`);
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
      message: "",
      source: "consultation_form",
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
      setTimeout(() => {
        closePopup();
        setSubmitStatus(null);
      }, 2000);
    } else {
      setSubmitStatus("error");
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = "auto";
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
    ? t("advice.form.phoneErrors.required")
    : "";
  // Show mismatch hint when enough digits but wrong format
  const mismatchHint =
    hasStartedTyping && !phoneError && digitsRemaining === 0 && !isPhoneValid
      ? getPhoneErrorMessage(phoneValidation, selectedCountry)
      : "";
  const agentMessage = isPhoneValid
    ? t("advice.form.phoneValid")
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
    <section
      className="advice-section reveal-on-scroll"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="advice-container">
        <div className="advice-content">
          <div className="advice-form-wrapper">
            <h2 className="advice-title">
              {t("advice.titlePrefix")}{" "}
              <span className="text-accent">{t("advice.titleAccent")}</span>
              {t("advice.titleSuffix")}
            </h2>
            <p className="form-trust-line">{t("advice.subtitle")}</p>

            <form className="advice-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="advice-fullName">
                    {t("advice.form.fullName")}
                  </label>
                  <input
                    type="text"
                    id="advice-fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="advice-email">{t("advice.form.email")}</label>
                  <input
                    type="email"
                    id="advice-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="advice-phone">{t("advice.form.phone")}</label>
                <div
                  className={`phone-input-wrapper ${
                    phoneError ? "has-error" : ""
                  }`}
                >
                  <CountrySelect
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    searchPlaceholder={t("advice.form.countrySearch")}
                    emptyLabel={t("advice.form.noResults")}
                  />
                  <input
                    type="tel"
                    id="advice-phone"
                    name="phone"
                    placeholder={phoneMeta.example}
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handlePhoneBlur}
                    inputMode="tel"
                    autoComplete="tel"
                    aria-invalid={phoneError ? "true" : "false"}
                    aria-describedby={
                      phoneError ? "advice-phone-error" : undefined
                    }
                    required
                  />
                  {isPhoneValid && (
                    <span className="phone-valid-indicator">✓</span>
                  )}
                </div>
                {renderAgentMessage("advice-phone-error")}
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="advice-agreeToUpdates"
                  name="agreeToUpdates"
                  checked={formData.agreeToUpdates}
                  onChange={handleChange}
                />
                <label htmlFor="advice-agreeToUpdates">
                  {t("advice.form.checkboxLabel")}
                </label>
              </div>

              <p className="form-disclaimer">
                {t("advice.disclaimerPrefix")}{" "}
                <a href="/privacy" target="_blank" rel="noreferrer">
                  {t("advice.disclaimerPrivacy")}
                </a>
                , {t("advice.disclaimerMiddle")}{" "}
                <a href="/terms" target="_blank" rel="noreferrer">
                  {t("advice.disclaimerTerms")}
                </a>
                .
              </p>

              {submitStatus === "success" && (
                <div className="form-success">{t("advice.form.success")}</div>
              )}
              {submitStatus === "error" && (
                <div className="form-error">{t("advice.form.error")}</div>
              )}

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting || !isPhoneValid}
              >
                {isSubmitting ? t("advice.form.sending") : t("advice.submit")}
              </button>
            </form>
          </div>

          <div className="advice-visual">
            <div className="visual-content">
              <div className="visual-brand">
                <div className="visual-brand__logo">
                  <span className="visual-brand__script">The</span>
                  <span className="visual-brand__main">RESIDENCES</span>
                  <span className="visual-brand__sub">
                    DIFC Zabeel District
                  </span>
                </div>
                <div className="visual-brand__soon">COMING SOON</div>
              </div>
              <div className="quote-mark">"</div>
              <p className="testimonial-text">{t("advice.testimonial")}</p>
              <div className="contact-phone">
                <a
                  href="https://api.whatsapp.com/send/?phone=971567715771&text=Hello%21+I+am+interested+in+The+Residences+DIFC+Zabeel+District&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("navigation.phone")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Popup */}
      {isPopupOpen && (
        <>
          <div className="popup-overlay" onClick={closePopup}></div>
          <div className="popup-modal" dir={lang === "ar" ? "rtl" : "ltr"}>
            <button className="popup-close" onClick={closePopup}></button>
            <div className="popup-content">
              <h2 className="popup-title">
                {t("advice.titlePrefix")}{" "}
                <span className="text-accent">{t("advice.titleAccent")}</span>
                {t("advice.titleSuffix")}
              </h2>
              <p className="popup-subtitle">{t("advice.subtitle")}</p>
              <form className="advice-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="advice-popup-fullName">
                      {t("advice.form.fullName")}
                    </label>
                    <input
                      type="text"
                      id="advice-popup-fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="advice-popup-email">
                      {t("advice.form.email")}
                    </label>
                    <input
                      type="email"
                      id="advice-popup-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="advice-popup-phone">
                    {t("advice.form.phone")}
                  </label>
                  <div
                    className={`phone-input-wrapper ${
                      phoneError ? "has-error" : ""
                    }`}
                  >
                    <CountrySelect
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      searchPlaceholder={t("advice.form.countrySearch")}
                      emptyLabel={t("advice.form.noResults")}
                    />
                    <input
                      type="tel"
                      id="advice-popup-phone"
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
                          ? "advice-advice-popup-phone-error"
                          : undefined
                      }
                      required
                    />
                    {isPhoneValid && (
                      <span className="phone-valid-indicator">✓</span>
                    )}
                  </div>
                  {renderAgentMessage("advice-advice-popup-phone-error")}
                </div>

                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="advice-popup-agreeToUpdates"
                    name="agreeToUpdates"
                    checked={formData.agreeToUpdates}
                    onChange={handleChange}
                  />
                  <label htmlFor="advice-popup-agreeToUpdates">
                    {t("advice.form.checkboxLabel")}
                  </label>
                </div>

                <p className="form-disclaimer">
                  {t("advice.disclaimerPrefix")}{" "}
                  <a href="/privacy" target="_blank" rel="noreferrer">
                    {t("advice.disclaimerPrivacy")}
                  </a>
                  , {t("advice.disclaimerMiddle")}{" "}
                  <a href="/terms" target="_blank" rel="noreferrer">
                    {t("advice.disclaimerTerms")}
                  </a>
                  .
                </p>

                {submitStatus === "success" && (
                  <div className="form-success">{t("advice.form.success")}</div>
                )}
                {submitStatus === "error" && (
                  <div className="form-error">{t("advice.form.error")}</div>
                )}

                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting || !isPhoneValid}
                >
                  {isSubmitting ? t("advice.form.sending") : t("advice.submit")}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </section>
  );
});

export default AdviceSection;
