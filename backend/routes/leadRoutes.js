const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { leadLimiter } = require('../middleware/rateLimiter');

// POST /api/leads - Create/register a new subscriber (rate limited)
router.post('/', leadLimiter, leadController.createLead);

// GET /api/leads - View all subscribers (administrative/secured endpoint)
router.get('/', leadController.getAllLeads);

module.exports = router;
