import { useState } from "react";
import { Link } from "react-router-dom";
import "./Questions.css";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { getFaqData } from "../utils/faqData";

//SCHEMA MARKUP JSON LD
import SchemaMarkup from "../utils/SchemaMarkup.jsx";
import { buildFaqSchema } from "../utils/SchemaMarkup.jsx";

const Questions = () => {
  const { t, lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = getFaqData(t);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div id="faq" className="faq-container" dir={lang === "ar" ? "rtl" : "ltr"}>
      <SchemaMarkup schemaData={buildFaqSchema(faqData)} />
      <h2 className="faq-title">
        <span className="text-accent">{t("faq.title")}</span>
      </h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${openIndex === index ? "active" : ""}`}
              onClick={() => toggleAccordion(index)}
            >
              <span>{item.question}</span>
              <span className="faq-icon">
                {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
              </span>
            </button>
            <div className={`faq-answer ${openIndex === index ? "open" : ""}`}>
              <div className="faq-answer-content">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="faq-read-more">
        <Link to="/block" target="_blank" rel="noopener noreferrer" className="btn-list-property">
          {t("faq.readMore")}
        </Link>
      </div>
    </div>
  );
};

export default Questions;
