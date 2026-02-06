const fallbackFaqData = [
  {
    question: "Who is the developer of Bay Villas Phase 2?",
    answer:
      "The project is developed by Nakheel, a leading Dubai master developer known for delivering iconic waterfront and island communities with premium design and high-quality construction.",
    isOpen: true,
  },
  {
    question: "Where is Bay Villas Phase 2 located?",
    answer:
      "Bay Villas Phase 2 is located on Island B of Dubai Islands, a prime waterfront and beachfront community. Dubai Islands is a prestigious 17 sq km master development spanning five islands with over 50km of waterfront, 20km of pristine beaches, and extensive landscaped parks. The location offers easy access to Dubai mainland, Dubai International Airport (DXB), Downtown Dubai, and DIFC, all within 15-20 minutes drive.",
  },
  {
    question: "What types of properties are available in Bay Villas Phase 2?",
    answer:
      "Bay Villas Phase 2 offers a diverse range of luxury properties including 3-4 bedroom townhouses, 4 bedroom garden villas, 5 bedroom waterfront villas, and 6 bedroom beachfront villas. The properties feature spacious layouts ranging from 3,409 to 14,134 sq.ft, with modern coastal architecture, floor-to-ceiling windows, private gardens, and premium finishes throughout.",
  },
  {
    question: "When will the construction of Bay Villas Phase 2 be completed?",
    answer:
      "The expected handover date for Bay Villas Phase 2 is Q2 2027 (approximately mid-2027). However, the exact completion date may be confirmed by the developer post-launch and depends on construction progress. Nakheel has a strong track record of delivering landmark projects on schedule.",
  },
  {
    question: "What payment plans are available to property buyers in Bay Villas Phase 2?",
    answer:
      "Nakheel offers a flexible 80/20 payment plan for Bay Villas Phase 2. The typical structure includes: 20% down payment at booking, 60% during construction in installments, and 20% upon handover. This construction-linked payment plan with low initial down payment makes ownership more accessible. For the 2-year investor visa, properties can be mortgaged with at least 50% down payment.",
  },
  {
    question: "How much do townhouses and villas in Bay Villas Phase 2 cost?",
    answer:
      "Starting prices for Bay Villas Phase 2 begin at AED 4,000,000 (approximately USD 1,089,000) for 3-bedroom townhouses. 4-bedroom townhouses start from AED 5.2 million, 4-bedroom garden villas from AED 8.7 million, and 5-bedroom waterfront villas from AED 13.8 million. Prices are positioned competitively below comparable developments like Palm Jebel Ali, offering excellent value for waterfront living.",
  },
  {
    question: "Can a foreigner buy property in Bay Villas Phase 2?",
    answer:
      "Yes, Bay Villas Phase 2 is freehold property open to all nationalities under Dubai's freehold property regulations. Foreign nationals can purchase and fully own properties in this development without restriction. Dubai Islands is a designated freehold area where foreigners are permitted to buy, own, and sell property freely.",
  },
  {
    question: "Can I obtain residency status if I buy property in Bay Villas Phase 2?",
    answer:
      "Yes, purchasing property in Bay Villas Phase 2 can qualify you for UAE residency visas. For properties worth AED 750,000+, you can obtain a 2-year renewable investor visa. For investments of AED 2 million+, you qualify for a 10-year Golden Visa. The property must be in your name with a title deed, and you can sponsor your spouse and children. Requirements include proof of income (minimum AED 10,000/month), health insurance, and medical fitness certificate.",
  },
  {
    question: "What visa can I get if I buy property in Bay Villas Phase 2?",
    answer:
      "Based on your investment level, you can obtain: (1) 2-Year Investor Visa for properties worth AED 750,000+ - renewable every 2 years, allows family sponsorship; (2) 10-Year Golden Visa for properties worth AED 2 million+ - long-term residency with no minimum stay requirement, includes family sponsorship and extended travel flexibility. Both visa types provide residency status, Emirates ID, and the right to live and work in the UAE.",
  },
  {
    question: "Are townhouses and villas in Bay Villas Phase 2 a good investment?",
    answer:
      "Yes, Bay Villas Phase 2 presents strong investment potential due to several factors: (1) Limited supply of waterfront villas with private beach access in Dubai, (2) Competitive pricing below Palm Jumeirah and Palm Jebel Ali creating upside potential, (3) High rental demand for resort-style properties with strong ROI potential, (4) Dubai Islands' rapid development as a luxury destination, (5) Nakheel's reputation for quality and value appreciation, (6) Excellent location with direct beach access and proximity to major Dubai hubs.",
  },
  {
    question: "Will Bay Villas Phase 2 be a good place to live in Dubai?",
    answer:
      "Bay Villas Phase 2 offers exceptional quality of life combining island tranquility with urban convenience. Residents enjoy direct beach access, swimmable beaches, landscaped gardens, resort-style pools, fitness centers, children's play areas, BBQ facilities, and 24/7 security. The community features modern architecture with spacious layouts, floor-to-ceiling windows, and private gardens. Located just 15-20 minutes from Dubai International Airport, Downtown Dubai, and major business districts, it provides the perfect balance of peaceful waterfront living and connectivity.",
  },
  {
    question: "What are the benefits of living on Dubai Islands?",
    answer:
      "Dubai Islands offers a unique lifestyle with 17 sq km spanning five interconnected islands featuring: 50km of pristine waterfront, 20km of beaches, extensive green spaces and parks, luxury resorts and beach clubs, upcoming Dubai Islands Mall (larger than Dubai Mall), 9 marinas with 1,300 berths capacity, golf courses with Arabian Gulf views, waterfront dining and entertainment, schools and healthcare facilities, and seamless connectivity to Dubai mainland via Infinity Bridge. It represents a visionary blend of natural beauty, premium amenities, and modern island living.",
  },
];

const getFaqData = (t) => {
  const localizedFaq = t("faq.questions");
  return Array.isArray(localizedFaq) && localizedFaq.length
    ? localizedFaq
    : fallbackFaqData;
};

export { getFaqData };
