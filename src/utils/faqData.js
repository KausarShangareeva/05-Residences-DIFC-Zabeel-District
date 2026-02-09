const fallbackFaqData = [
  {
    question: "Who is the developer of The Residences DIFC Zabeel District?",
    answer:
      "The Residences DIFC is a landmark project developed directly by DIFC (Dubai International Financial Centre), the government-backed entity governing the region's leading financial hub. This ensures the highest standards of construction, regulatory compliance, and long-term value preservation for investors.",
    isOpen: true,
  },
  {
    question: "Where exactly is The Residences DIFC Zabeel District located?",
    answer:
      "The project is located in the newly announced Zabeel District, an elite expansion of the Dubai International Financial Centre (DIFC). It sits at the intersection of Dubai's financial core and the lush Zabeel area, offering direct access to Zabeel Boulevard and seamless connectivity to Sheikh Zayed Road and Downtown Dubai.",
  },
  {
    question: "What makes The Residences DIFC a unique investment opportunity?",
    answer:
      "It is the first-ever residential project within the visionary DIFC Zabeel District (DIFC 2.0). With a $27 billion expansion plan for the district, early investors benefit from limited supply in a high-demand corporate zone, projected rental yields of 6-8%, and significant capital appreciation as the financial hub doubles in size.",
  },
  {
    question: "What types of apartments are available in The Residences DIFC?",
    answer:
      "The development offers a premium collection of luxury 1, 2, 3, and 4-bedroom apartments, as well as exclusive 3BR and 4BR duplex penthouses. Each unit features generous surface areas (starting from 846 sq.ft for 1BR), fully equipped kitchens, and high-end finishes reflecting the prestige of the DIFC brand.",
  },
  {
    question:
      "What are the starting prices for The Residences DIFC Zabeel District?",
    answer:
      "Starting prices for 1-bedroom apartments begin at approximately AED 2,600,000. Prices vary based on unit type, floor level, and view. Given the prime location and government-backed developer status, these residences represent a high-value asset in Dubai's luxury real estate market.",
  },
  {
    question: "What is the payment plan for The Residences DIFC?",
    answer:
      "The project offers an attractive 70/30 payment plan: 20% down payment (+4% DLD fee) at the time of booking, 50% during the construction phase, and the final 30% upon completion in Q4 2029. The final installment can be financed through local banks for both residents and non-residents.",
  },
  {
    question: "When is the expected handover date for The Residences DIFC?",
    answer:
      "The anticipated completion and handover date for The Residences DIFC Zabeel District is scheduled for the fourth quarter (Q4) of 2029. This timeline aligns with the broader infrastructure development of the DIFC 2.0 expansion.",
  },
  {
    question:
      "What amenities are available to residents of The Residences DIFC?",
    answer:
      "Residents enjoy world-class facilities including adult and children's swimming pools, a state-of-the-art fitness center, sports fields, children's play areas, a clubhouse, a dedicated games room, BBQ zones, and 24/7 concierge and security services, all designed to cater to a high-flying professional lifestyle.",
  },
  {
    question: "Is The Residences DIFC a freehold property for foreigners?",
    answer:
      "Yes, The Residences DIFC is located in a designated freehold area. Foreign investors and expats of all nationalities can own property here with 100% ownership rights, making it an ideal choice for international investors looking for a secure asset in Dubai.",
  },
  {
    question:
      "Can I get a UAE Golden Visa by investing in The Residences DIFC?",
    answer:
      "Absolutely. Since the starting prices exceed AED 2,000,000, purchasing a property in The Residences DIFC qualifies you for the 10-year UAE Golden Visa. This provides long-term residency for the investor and their family, along with numerous benefits like the Esaad privilege card.",
  },
  {
    question:
      "How will the DIFC 2.0 expansion affect property values in Zabeel District?",
    answer:
      "The DIFC expansion is set to bring over 42,000 new companies and thousands of high-net-worth professionals to the area. This massive influx of corporate demand, combined with the limited residential supply within the district itself, is expected to drive both rental rates and property valuations significantly higher by the time of handover.",
  },
];

const getFaqData = (t) => {
  const localizedFaq = t("faq.questions");
  return Array.isArray(localizedFaq) && localizedFaq.length
    ? localizedFaq
    : fallbackFaqData;
};

export { getFaqData };
