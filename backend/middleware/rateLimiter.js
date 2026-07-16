const rateLimit = require('express-rate-limit');

/**
 * Lead Submission Rate Limiter
 * Limits requests from a single IP to protect against spam submissions or automated bots.
 */
const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 10, // Limit each IP to 10 signups per window
  message: {
    error: 'Too many submissions from this IP address. Please try again after 15 minutes.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/**
 * General API Rate Limiter
 * Limits general API inquiries to protect overall server performance.
 */
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 60, // Limit each IP to 60 general requests per minute
  message: {
    error: 'Too many requests. Please slow down and try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  leadLimiter,
  apiLimiter
};
