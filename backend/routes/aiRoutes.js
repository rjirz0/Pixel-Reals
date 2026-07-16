const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { apiLimiter } = require('../middleware/rateLimiter');

// POST /api/ai/generate - Call Gemini API securely (rate limited)
router.post('/generate', apiLimiter, aiController.generateAIContent);

module.exports = router;
