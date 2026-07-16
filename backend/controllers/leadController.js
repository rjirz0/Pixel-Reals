const Lead = require('../models/Lead');

/**
 * Register a new Lead / Subscriber for Beta Access
 * POST /api/leads
 */
exports.createLead = async (req, res) => {
  try {
    const { email, source, status, accessKey } = req.body;

    // Simple email format check before querying database
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    // Save lead database record using Mongoose
    const newLead = new Lead({
      email,
      source: source || 'Pixel Realms Frontend Portal',
      accessKey: accessKey || '',
      status: status || 'pending_activation'
    });

    await newLead.save();

    console.log(`✅ [Database] Registered new lead: ${email}`);
    return res.status(201).json({
      success: true,
      message: 'Registration successful! Your spot for beta access has been secured.',
      lead: {
        id: newLead._id,
        email: newLead.email,
        timestamp: newLead.timestamp
      }
    });

  } catch (error) {
    // Handle Duplicate Key Error (MongoDB error code 11000)
    if (error.code === 11000) {
      console.warn(`⚠️ [Database] Signup attempt for already registered email.`);
      return res.status(409).json({
        success: true, // We return 200 or 409, but let them know they are already subscribed safely
        message: 'You have already registered for beta access! We have your spot reserved.'
      });
    }

    // Mongoose Validation Errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ error: messages.join(', ') });
    }

    console.error('❌ Lead Controller Error:', error);
    return res.status(500).json({
      error: 'An unexpected internal error occurred. Please try again later.'
    });
  }
};

/**
 * Retrieve All Registered Leads
 * GET /api/leads
 * This endpoint is typically locked or secured in production.
 */
exports.getAllLeads = async (req, res) => {
  try {
    // Basic password/token protection for sensitive admin queries
    const adminToken = req.headers.authorization;
    if (!adminToken || adminToken !== `Bearer ${process.env.ADMIN_SECRET_KEY || 'default_admin_key'}`) {
      return res.status(403).json({ error: 'Access denied. Unauthorized administrative request.' });
    }

    const leads = await Lead.find().sort({ timestamp: -1 });
    return res.json({ success: true, count: leads.length, leads });
  } catch (error) {
    console.error('❌ Error fetching leads:', error);
    return res.status(500).json({ error: 'Failed to retrieve registered subscribers.' });
  }
};
