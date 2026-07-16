const mongoose = require('mongoose');

/**
 * Lead Schema
 * Represents a registered beta user/subscriber for Pixel Realms.
 */
const LeadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email address is required.'],
    unique: true, // Prevents duplicate sign-ups
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address.'
    ]
  },
  source: {
    type: String,
    default: 'Pixel Realms Landing Page'
  },
  accessKey: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending_activation', 'active', 'unsubscribed'],
    default: 'pending_activation'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Lead model
module.exports = mongoose.model('Lead', LeadSchema);
