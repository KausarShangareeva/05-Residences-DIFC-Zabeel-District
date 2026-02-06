import { QRCodeSVG } from "qrcode.react";
import { useLanguage } from "../i18n/LanguageContext";

export default function QrToLinks() {
  const { lang } = useLanguage();
  // Use production URL for QR code
  const productionUrl = "https://passo-by-beyond.netlify.app";
  const url = `${productionUrl}/links?lang=${encodeURIComponent(lang)}`;

  return (
    <div
      style={{
        background: "#fff",
        padding: "1.6rem",
        borderRadius: "1.2rem",
        display: "inline-block",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <QRCodeSVG
        value={url}
        size={180}
        level="H"
        style={{ display: "block", maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
}
