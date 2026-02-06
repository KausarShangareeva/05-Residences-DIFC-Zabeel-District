function validateLead({ fullName, email, phone }) {
  const errors = [];

  // Validate fullName
  if (!fullName || typeof fullName !== 'string') {
    errors.push({ field: 'fullName', message: 'Full name is required' });
  } else if (fullName.trim().length < 2) {
    errors.push({ field: 'fullName', message: 'Full name must be at least 2 characters' });
  } else if (fullName.trim().length > 100) {
    errors.push({ field: 'fullName', message: 'Full name must be less than 100 characters' });
  }

  // Validate email (optional)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && typeof email === 'string') {
    if (!emailRegex.test(email.trim())) {
      errors.push({ field: 'email', message: 'Invalid email format' });
    }
  }

  // Validate phone
  const phoneRegex = /^[\d\s+()-]{7,20}$/;
  if (!phone || typeof phone !== 'string') {
    errors.push({ field: 'phone', message: 'Phone number is required' });
  } else if (!phoneRegex.test(phone.trim())) {
    errors.push({ field: 'phone', message: 'Invalid phone number format' });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = { validateLead };
