require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const { configureSecurity } = require('./middleware/security');
const { apiLimiter } = require('./middleware/rateLimiter');

// Import modular API Routes
const leadRoutes = require('./routes/leadRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Enable trust proxy so express-rate-limit can correctly identify client IPs behind reverse proxies
app.set('trust proxy', 1);

// 1. Establish database connection with MongoDB Atlas using Mongoose
connectDB();

// 2. Configure robust cybersecurity headers, Clickjacking defenses, and CORS
configureSecurity(app);

// 3. Body parsers (allows our backend to read incoming JSON requests safely)
// We set a safe size limit to prevent heavy payload/DoS attacks
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 4. Mount secure API endpoints
// Apply general API rate limiting to all requests under /api
app.use('/api', apiLimiter);

// Mount modular router endpoints
app.use('/api/leads', leadRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 5. Serve static files (For deployment integration - e.g. when building frontend to public folder)
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist');
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// 6. Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('❌ [Server Error]:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'An unexpected server error occurred.'
  });
});

// 7. Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 [Server] Production Backend running on port ${PORT}`);
  console.log(`🔒 [Security] Helmet, CORS, and Rate Limiting active.`);
});
