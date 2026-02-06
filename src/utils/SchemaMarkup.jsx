import { Helmet } from "react-helmet-async";

function stripHtml(text = "") {
  return text.replace(/<[^>]*>/g, "").trim();
}

function buildFaqSchema(questions = []) {
  const mainEntity = questions.map((item) => ({
    "@type": "Question",
    name: stripHtml(item.question),
    acceptedAnswer: {
      "@type": "Answer",
      text: stripHtml(item.answer),
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

const SchemaMarkup = ({ schemaData }) => {
  if (!schemaData || !schemaData.mainEntity || !schemaData.mainEntity.length) {
    return null;
  }

  const jsonLd = JSON.stringify(schemaData, null, 2);
  return (
    <Helmet>
      <script type="application/ld+json">{jsonLd}</script>
    </Helmet>
  );
};

export { buildFaqSchema };
export default SchemaMarkup;
