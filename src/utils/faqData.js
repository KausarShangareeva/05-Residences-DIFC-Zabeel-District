const fallbackFaqData = [
  {
    question: "Who is the developer of Passo by Beyond?",
    answer:
      "Passo is developed by Beyond, a premium Dubai-based developer known for delivering luxury waterfront residences with exceptional design, quality craftsmanship, and resort-style living experiences on Palm Jumeirah.",
    isOpen: true,
  },
  {
    question: "Where is Passo by Beyond located?",
    answer:
      "Passo by Beyond is located on Palm Jumeirah, Dubai's iconic man-made island and one of the world's most prestigious waterfront addresses. The development offers direct beach access, stunning Arabian Gulf views, and is just minutes from Dubai Marina, JBR, and major business districts.",
  },
  {
    question: "What types of properties are available in Passo by Beyond?",
    answer:
      "Passo by Beyond offers a curated selection of luxury villas and townhouses with spacious layouts, premium finishes, private gardens, and resort-style amenities. The properties feature modern coastal architecture with floor-to-ceiling windows and high-end specifications throughout.",
  },
  {
    question: "When will the construction of Passo by Beyond be completed?",
    answer:
      "The expected handover date for Passo by Beyond is Q4 2028. The exact completion date may be confirmed by the developer and depends on construction progress. Beyond has a strong track record of delivering landmark projects on schedule.",
  },
  {
    question: "What payment plans are available for Passo by Beyond?",
    answer:
      "Beyond offers a flexible payment plan for Passo. The typical structure includes a down payment at booking, installments during construction, and a final payment upon handover. This construction-linked payment plan makes ownership more accessible. Contact us for the latest payment plan details.",
  },
  {
    question: "How much do properties in Passo by Beyond cost?",
    answer:
      "Prices for Passo by Beyond vary depending on property type and size. Contact our team for the latest pricing and availability. Palm Jumeirah properties are positioned as premium luxury offerings with strong value appreciation potential.",
  },
  {
    question: "Can a foreigner buy property in Passo by Beyond?",
    answer:
      "Yes, Passo by Beyond is freehold property open to all nationalities under Dubai's freehold property regulations. Foreign nationals can purchase and fully own properties in this development without restriction. Palm Jumeirah is a designated freehold area where foreigners are permitted to buy, own, and sell property freely.",
  },
  {
    question: "Can I obtain residency status if I buy property in Passo by Beyond?",
    answer:
      "Yes, purchasing property in Passo by Beyond can qualify you for UAE residency visas. For properties worth AED 750,000+, you can obtain a 2-year renewable investor visa. For investments of AED 2 million+, you qualify for a 10-year Golden Visa. The property must be in your name with a title deed, and you can sponsor your spouse and children.",
  },
  {
    question: "What visa can I get if I buy property in Passo by Beyond?",
    answer:
      "Based on your investment level, you can obtain: (1) 2-Year Investor Visa for properties worth AED 750,000+ - renewable every 2 years, allows family sponsorship; (2) 10-Year Golden Visa for properties worth AED 2 million+ - long-term residency with no minimum stay requirement, includes family sponsorship and extended travel flexibility.",
  },
  {
    question: "Are properties in Passo by Beyond a good investment?",
    answer:
      "Yes, Passo by Beyond presents strong investment potential due to several factors: (1) Prime Palm Jumeirah location with limited supply, (2) Premium quality by Beyond developer, (3) High rental demand for luxury beachfront properties, (4) Strong historical appreciation on Palm Jumeirah, (5) Resort-style amenities and private beach access, (6) Excellent connectivity to major Dubai hubs.",
  },
  {
    question: "Will Passo by Beyond be a good place to live in Dubai?",
    answer:
      "Passo by Beyond offers exceptional quality of life combining island tranquility with urban convenience. Residents enjoy private beach access, sky pools, cascading pools, wellness facilities, a piano cafe, kids club, fitness center, smart home technology, EV charging, and 24/7 concierge services. Located on Palm Jumeirah, it provides the perfect balance of luxury beachfront living and connectivity to Dubai's key destinations.",
  },
];

const getFaqData = (t) => {
  const localizedFaq = t("faq.questions");
  return Array.isArray(localizedFaq) && localizedFaq.length
    ? localizedFaq
    : fallbackFaqData;
};

export { getFaqData };
