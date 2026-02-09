import React from "react";
import "./ProjectMaterialsSection.css";
import { Download } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const ProjectMaterialsSection = ({ onOpenBrochure }) => {
  const { t, lang } = useLanguage();
  const baseMaterials = [
    {
      id: 1,
      title: "Floor Plan",
      image:
        "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770648729/The_Residences_DIFC_Zabeel_District_floor_plan_kbbeeo.png",
      fileType: "PDF",
      fileSize: "0.6 Mb",
      link: "/brochures/The-Residences-By-DIFC-Floor-Plan.pdf",
    },
    {
      id: 2,
      title: "Payment Plan",
      image:
        "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770648729/The_Residences_DIFC_Zabeel_District_payment_plan_a1b5qt.png",
      fileType: "PDF",
      fileSize: "5 Mb",
      link: "/brochures/The-Residences-by-DIFC-Payment-Plan.pdf",
    },
    {
      id: 3,
      title: "Brochure",
      image:
        "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770648728/The_Residences_DIFC_Zabeel_District_brochure_fbbruy.png",
      fileType: "PDF",
      fileSize: "9 Mb",
      link: "/brochures/The-Residences-by-DIFC-Masterplan-Presentation-Updated.pdf",
    },
    {
      id: 4,
      title: "Factsheet",
      image:
        "https://res.cloudinary.com/dxp7ppipg/image/upload/v1770648729/The_Residences_DIFC_Zabeel_District_fact_sheet_zmolje.png",
      fileType: "PDF",
      fileSize: "1 Mb",
      link: "/brochures/The-Residences-DIFC-Zabeel-District-Factsheet-Feb-2026.pdf",
    },
  ];

  const materialsData = t("materials.items");
  const localizedMaterials = Array.isArray(materialsData) ? materialsData : [];
  const materials = baseMaterials.map((material, index) => {
    const localized = localizedMaterials[index] || {};
    const fileSize =
      localized.fileSize && !String(localized.fileSize).includes("—")
        ? localized.fileSize
        : material.fileSize;
    const link =
      localized.link && localized.link !== "#" ? localized.link : material.link;

    return {
      ...material,
      ...localized,
      fileSize,
      link,
    };
  });

  return (
    <section
      id="materials"
      className="project-materials-section reveal-on-scroll"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="project-materials-container">
        <h2 className="project-materials-title">
          {t("materials.titlePrefix")}{" "}
          <span className="text-accent">{t("materials.titleAccent")}</span>
        </h2>

        <div className="project-materials-grid">
          {materials.map((material) => (
            <div
              onClick={() => onOpenBrochure(material.link)}
              key={material.id}
              className="material-card"
            >
              <div className="material-image-wrapper">
                <img
                  src={material.image}
                  alt={material.title}
                  className="material-image"
                  loading="lazy"
                />
              </div>

              <div className="material-info">
                <h3 className={`material-title ${material.highlighted}`}>
                  {material.title}
                  <Download size={20} />
                </h3>
                <p className="material-meta">
                  {material.fileType} {material.fileSize}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectMaterialsSection;
