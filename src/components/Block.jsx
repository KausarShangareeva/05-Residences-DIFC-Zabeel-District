import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import "./Navigation.css";
import "./BrochureDownloadSection.css";
import "./Block.css";
import { useLanguage } from "../i18n/LanguageContext";
import SchemaMarkup, { buildFaqSchema } from "../utils/SchemaMarkup.jsx";
import { getFaqData } from "../utils/faqData";
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
import { Minus, Plus } from "lucide-react";

const Block = () => {
  const { t, lang } = useLanguage();
  const faqData = getFaqData(t);

  const defaultCountry =
    countries.find((country) => country.code === "AE") || countries[0];

  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [openIndex, setOpenIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    question: "",
    contactMethod: "phone",
  });

  useEffect(() => {
    setFormData((prev) =>
      prev.phone ? prev : { ...prev, phone: `${selectedCountry.dial} ` },
    );
  }, [selectedCountry]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const openPopup = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = "auto";
    setSubmitStatus(null);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

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
      return missing === 1
        ? "تبقى رقم واحد"
        : `أدخل ${missing} أرقام إضافية`;
    }
    return missing === 1
      ? "1 digit left"
      : `Enter ${missing} more digits`;
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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === "phone") {
      const detectedCountryCode = detectCountryFromPhone(value, countries);
      let currentCountry = selectedCountry;
      if (detectedCountryCode && detectedCountryCode !== selectedCountry.code) {
        const matchedCountry = countries.find(
          (country) => country.code === detectedCountryCode,
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
    const validation = validatePhoneNumber(formData.phone, selectedCountry.code);
    setPhoneError(getPhoneErrorMessage(validation, selectedCountry));
  };

  const handleCountryChange = (country) => {
    const nextPhone = `${country.dial} `;
    setSelectedCountry(country);
    setFormData((prev) => ({
      ...prev,
      phone: nextPhone,
    }));
    setPhoneTouched(false);
    setPhoneError("");
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      message: formData.question,
      source: "faq_block_form",
      contactMethod: formData.contactMethod,
    });

    setIsSubmitting(false);
    setSubmitStatus(result.success ? "success" : "error");

    if (result.success) {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        question: "",
        contactMethod: "phone",
      });
      setPhoneTouched(false);
      setPhoneError("");
    }
  };

  const phoneMeta = getPhoneMeta(selectedCountry.code);
  const phoneValidation = validatePhoneNumber(
    formData.phone,
    selectedCountry.code,
  );
  const isPhoneValid = phoneValidation.status === "ok";
  const hasStartedTyping = phoneValidation.nationalLength > 0;
  const digitsRemaining = Math.max(
    0,
    (phoneValidation.min || 0) - (phoneValidation.nationalLength || 0),
  );
  const liveHint =
    !phoneError && hasStartedTyping && digitsRemaining > 0
      ? getLiveHint(digitsRemaining)
      : "";
  const initialHint = !hasStartedTyping
    ? t("brochure.form.phoneErrors.required")
    : "";
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

  return (
    <>
      <section className="block" dir={lang === "ar" ? "rtl" : "ltr"}>
        <SchemaMarkup schemaData={buildFaqSchema(faqData)} />
        <div className="block__container">
          <div className="block__top">
            <Link to="/" className="block__back-link btn-list-property">
              <span className="block__back-icon">←</span>
              {t("block.backToProject")}
            </Link>
            <button
              type="button"
              className="block__mode-toggle btn-shortlist"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="moonsun" size={20} />
              ) : (
                <Moon className="moonsun" size={20} />
              )}
            </button>
          </div>

          <div className="block__layout">
            <div className="block__left">
              <header className="block__header">
                <p className="block__eyebrow">{t("faq.title")}</p>
                <h2 className="block__title">
                  {t("block.title")} <span>{t("block.titleAccent")}</span>
                </h2>
                <p className="block__intro">
                  {t("block.intro")}
                </p>
              </header>

              <div className="block__cta">
                <h3 className="block__cta-title">{t("block.ctaTitle")}</h3>
                <p className="block__cta-text">
                  {t("block.ctaText")}
                </p>
                <button
                  type="button"
                  className="btn-list-property"
                  onClick={openPopup}
                >
                  {t("block.ctaButton")}
                </button>
              </div>
            </div>

            <div className="block__right">
              {faqData.map((item, index) => (
                <article className="block__item" key={index}>
                  <button
                    className={`block__item-toggle ${
                      openIndex === index ? "active" : ""
                    }`}
                    onClick={() => toggleAccordion(index)}
                    type="button"
                  >
                    <span className="block__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="block__item-title">{item.question}</span>
                    <span className="block__icon">
                      {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>
                  <div
                    className={`block__answer-wrap ${
                      openIndex === index ? "open" : ""
                    }`}
                  >
                    <p className="block__answer">{item.answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {isPopupOpen && (
        <>
          <div className="popup-overlay" onClick={closePopup}></div>
          <div className="popup-modal" dir={lang === "ar" ? "rtl" : "ltr"}>
            <button className="popup-close" onClick={closePopup}></button>
            <div className="popup-content">
              <h2 className="popup-title">{t("block.popupTitle")}</h2>
              <p className="popup-subtitle">{t("block.popupSubtitle")}</p>
              <form className="brochure-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="block-fullName">
                      {t("brochure.form.fullName")}
                    </label>
                    <input
                      id="block-fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="block-email">{t("brochure.form.email")}</label>
                    <input
                      id="block-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="block-phone">{t("brochure.form.phone")}</label>
                  <div
                    className={`phone-input-wrapper ${phoneError ? "has-error" : ""}`}
                  >
                    <CountrySelect
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      searchPlaceholder={t("brochure.form.countrySearch")}
                      emptyLabel={t("brochure.form.noResults")}
                    />
                    <input
                      type="tel"
                      id="block-phone"
                      name="phone"
                      placeholder={phoneMeta.example}
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handlePhoneBlur}
                      inputMode="tel"
                      autoComplete="tel"
                      aria-invalid={phoneError ? "true" : "false"}
                      aria-describedby={phoneError ? "block-phone-error" : undefined}
                      required
                    />
                    {isPhoneValid && <span className="phone-valid-indicator">✓</span>}
                  </div>
                  <div
                    className={`agent-message agent-message--${agentTone}`}
                    id="block-phone-error"
                  >
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
                </div>

                <div className="form-group">
                  <label htmlFor="block-question">{t("block.questionLabel")}</label>
                  <textarea
                    id="block-question"
                    name="question"
                    rows="4"
                    value={formData.question}
                    onChange={handleChange}
                    placeholder={t("block.questionPlaceholder")}
                  />
                </div>

                <div className="block__contact-methods">
                  <span className="block__contact-label">{t("block.contactMethodLabel")}</span>
                  <label className="block__radio">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      checked={formData.contactMethod === "phone"}
                      onChange={handleChange}
                    />
                    <span className="block__radio-pill">{t("block.contactPhone")}</span>
                  </label>
                  <label className="block__radio">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="whatsapp"
                      checked={formData.contactMethod === "whatsapp"}
                      onChange={handleChange}
                    />
                    <span className="block__radio-pill">{t("block.contactWhatsApp")}</span>
                  </label>
                  <label className="block__radio">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="telegram"
                      checked={formData.contactMethod === "telegram"}
                      onChange={handleChange}
                    />
                    <span className="block__radio-pill">{t("block.contactTelegram")}</span>
                  </label>
                </div>

                {submitStatus === "success" && (
                  <div className="form-success">{t("block.successMessage")}</div>
                )}
                {submitStatus === "error" && (
                  <div className="form-error">
                    {t("block.errorMessage")}
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-button btn-primary"
                  disabled={isSubmitting || !isPhoneValid}
                >
                  {isSubmitting ? t("block.submitting") : t("block.submit")}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Block;
