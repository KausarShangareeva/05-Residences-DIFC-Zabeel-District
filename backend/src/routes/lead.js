const express = require('express');
const router = express.Router();
const { validateLead } = require("../utils/validateLead");
const { sendToTelegram } = require("../utils/telegram");
const { getPool } = require("../db");

// POST /api/leads - Create new lead
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, message, source, contactMethod, page } =
      req.body;

    // Validate input
    const validation = validateLead({ fullName, email, phone });
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors
      });
    }

    // Persist to database (if configured)
    const db = getPool();
    if (db) {
      try {
        await db.query(
          `
          INSERT INTO leads (full_name, email, phone, message, source, contact_method, page)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          `,
          [
            fullName,
            email || null,
            phone,
            message || "",
            source || "website",
            contactMethod || "",
            page || "",
          ],
        );
      } catch (dbError) {
        console.error("Database insert error:", dbError.message);
      }
    }

    // Send to Telegram (fire-and-forget, don't block response)
    sendToTelegram({
      fullName,
      email,
      phone,
      message: message || '',
      source: source || 'website',
      contactMethod: contactMethod || ''
    }).catch(err => console.error('Telegram error:', err));

    res.status(201).json({
      success: true,
      message: 'Lead submitted successfully'
    });

  } catch (error) {
    console.error('Lead submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit lead'
    });
  }
});

module.exports = router;
