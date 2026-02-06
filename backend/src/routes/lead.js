const express = require('express');
const router = express.Router();
const { validateLead } = require('../utils/validateLead');
const { sendToTelegram } = require('../utils/telegram');

// POST /api/leads - Create new lead
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, message, source, contactMethod } = req.body;

    // Validate input
    const validation = validateLead({ fullName, email, phone });
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors
      });
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
