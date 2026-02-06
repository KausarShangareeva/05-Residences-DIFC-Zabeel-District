const API_URL =
  import.meta.env.VITE_API_URL || "https://zero4-passo-by-beyond.onrender.com";

export async function submitLead({ fullName, email, phone, message, source, contactMethod }) {
  try {
    const response = await fetch(`${API_URL}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        phone,
        message: message || "",
        page: source || window.location.href,
        source: source || window.location.href,
        contactMethod: contactMethod || "",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        errors: data.errors || [
          { message: data.message || "Submission failed" },
        ],
      };
    }

    return { success: true };
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      errors: [{ message: "Network error. Please try again." }],
    };
  }
}
