import { ArrowUp, MessageCircle } from "lucide-react";
import "./FloatingActions.css";
import { useLanguage } from "../i18n/LanguageContext";

const FloatingActions = () => {
  const { t, lang } = useLanguage();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="fab"
      aria-label={t("fab.label")}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <button
        type="button"
        className="fab__btn fab__btn--up"
        onClick={handleScrollTop}
        aria-label={t("fab.toTop")}
      >
        <ArrowUp size={18} />
      </button>
      <a
        className="fab__btn fab__btn--wa"
        href="https://api.whatsapp.com/send/?phone=971567715771&text=Hello%21+I+am+interested+in+Passo+by+Beyond&type=phone_number&app_absent=0"
        target="_blank"
        rel="noreferrer"
        aria-label={t("fab.whatsapp")}
      >
        <MessageCircle size={18} />
        <span>{t("fab.whatsapp")}</span>
      </a>
    </div>
  );
};

export default FloatingActions;
