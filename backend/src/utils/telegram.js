const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendToTelegram({
  fullName,
  email,
  phone,
  message,
  source,
  contactMethod,
}) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram credentials not configured");
    return { success: false, error: "Telegram not configured" };
  }

  const contactMethodLabels = {
    phone: "📞 Телефон",
    whatsapp: "💬 WhatsApp",
    telegram: "✈️ Telegram",
  };

  const text = `
🏠 <b>New Lead - Passo by Beyond</b>

👤 <b>Name:</b> ${escapeHtml(fullName)}
📧 <b>Email:</b> ${escapeHtml(email)}
📱 <b>Phone:</b> ${escapeHtml(phone)}
${contactMethod ? `🔔 <b>Способ связи:</b> ${contactMethodLabels[contactMethod] || escapeHtml(contactMethod)}` : ""}
${message ? `💬 <b>Message:</b> ${escapeHtml(message)}` : ""}
📍 <b>Source:</b> ${escapeHtml(source)}
🕐 <b>Time:</b> ${new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" })}
  `.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      },
    );

    const data = await response.json();

    if (!data.ok) {
      return { success: false, error: data.description };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

module.exports = { sendToTelegram };
