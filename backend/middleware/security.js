const helmet = require('helmet');
const cors = require('cors');

/**
 * Configure Security Middleware for Express
 * @param {express.Application} app - The Express application instance
 */
const configureSecurity = (app) => {
  // 1. Helmet helps secure Express apps by setting various HTTP headers.
  // It shields the server from common attacks like Clickjacking, XSS, and sniffing.
  app.use(helmet());

  // 2. CORS (Cross-Origin Resource Sharing) Configuration
  // Ensures only authorized websites (like your GitHub Pages frontend) can communicate with your backend.
  const allowedOrigin = process.env.CORS_ORIGIN || '*';

  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or local development)
      if (!origin) return callback(null, true);
      
      if (allowedOrigin === '*' || origin === allowedOrigin || allowedOrigin.split(',').includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by Cross-Origin Resource Sharing (CORS) Security Policy'));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));

  // 3. Custom Security Headers & JSON parsing protection
  app.use((req, res, next) => {
    // Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    // Enable Browser XSS filtering
    res.setHeader('X-XSS-Protection', '1; mode=block');
    // Prevent rendering within frames (Clickjacking defense)
    res.setHeader('X-Frame-Options', 'DENY');
    next();
  });
};

module.exports = {
  configureSecurity
};
