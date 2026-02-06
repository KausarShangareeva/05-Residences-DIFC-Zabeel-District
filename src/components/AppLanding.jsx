import "./AppLanding.css";
import QrToLinks from "./QrToLinks";
import { useLanguage } from "../i18n/LanguageContext";

const AppLanding = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="app-landing" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="content-wrapper">
        <div className="text-section">
          <h2 className="main-title">
            {t("appLanding.titleLine1")} <br /> {t("appLanding.titleLine2")}
          </h2>

          <p className="description">{t("appLanding.description")}</p>

          <div className="download-section">
            <h3 className="download-title">{t("appLanding.contactTitle")}</h3>

            <div className="download-buttons">
              <a
                href="https://t.me/iammmhmd"
                target="_blank"
                rel="noopener noreferrer"
                className="store-button telegram-button"
                aria-label="Contact us on Telegram"
              >
                <svg
                  className="button-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.248-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.098.155.23.171.324.016.094.036.308.02.474z" />
                </svg>
                <span className="button-text">Telegram</span>
              </a>

              <a
                href="https://api.whatsapp.com/send/?phone=971567715771&text=Hello%21+I+am+interested+in+Passo+by+Beyond&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="store-button whatsapp-button"
              >
                <svg
                  className="button-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="button-text">WhatsApp</span>
              </a>

              <a
                href="/brochures/Passo-by-Beyond.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="store-button catalog-button"
              >
                <svg
                  className="button-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span className="button-text">{t("appLanding.catalog")}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="phone-section">
          <div className="qr-section">
            <p className="qr-label">{t("appLanding.qrLabel")}</p>
            <QrToLinks />
          </div>

          <img
            src="/Screen.png"
            alt={t("appLanding.phoneAlt")}
            className="phone-image"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default AppLanding;
