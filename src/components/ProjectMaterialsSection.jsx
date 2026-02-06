import React from "react";
import "./ProjectMaterialsSection.css";
import { Download } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const ProjectMaterialsSection = ({ onOpenBrochure }) => {
  const { t, lang } = useLanguage();
  const baseMaterials = [
    {
      id: 1,
      title: "Brochure",
      image:
        "https://res.cloudinary.com/dxp7ppipg/image/upload/v1767973063/ChatGPT_Image_Jan_9_2026_04_29_01_PM_tuxxft.png",
      fileType: "PDF",
      fileSize: "125.33 Mb",
      link: "#",
    },
    {
      id: 2,
      title: "Floor Plans",
      image:
        "https://res.cloudinary.com/dxp7ppipg/image/upload/v1767973063/ChatGPT_Image_Jan_9_2026_04_31_54_PM_ykcoiq.png",
      fileType: "PDF",
      fileSize: "11.1 Mb",
      link: "#",
    },
    {
      id: 3,
      title: "Master Plan",
      image:
        "https://res.cloudinary.com/dxp7ppipg/image/upload/v1767973064/ChatGPT_Image_Jan_9_2026_04_36_20_PM_jnfxsp.png",
      fileType: "PDF",
      fileSize: "0.9 Mb",
      link: "#",
    },
  ];

  const materialsData = t("materials.items");
  const localizedMaterials = Array.isArray(materialsData) ? materialsData : [];
  const materials = baseMaterials.map((material, index) => ({
    ...material,
    ...localizedMaterials[index],
  }));

  return (
    <section
      id="materials"
      className="project-materials-section"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="project-materials-container">
        <h2 className="project-materials-title">
          {t("materials.titlePrefix")} {" "}
          <span className="text-accent">{t("materials.titleAccent")}</span>
        </h2>

        <div className="project-materials-grid">
          {materials.map((material) => (
            <div
              onClick={onOpenBrochure}
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
