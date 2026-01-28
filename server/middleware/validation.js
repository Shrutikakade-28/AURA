const { body, validationResult } = require('express-validator');

/**
 * Validate incoming chat messages
 */
const validateMessage = [
  body('message')
    .isString()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters')
    .trim()
    .escape(),
  
  body('sessionId')
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage('Session ID must be between 1 and 100 characters')
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
      });
    }
    next();
  }
];

/**
 * Sanitize user input to prevent XSS and other attacks
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length
};

/**
 * Validate mood check responses
 */
const validateMoodCheck = [
  body('responses')
    .isObject()
    .withMessage('Responses must be an object'),
  
  body('sessionId')
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage('Session ID must be between 1 and 100 characters')
    .trim(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
      });
    }
    next();
  }
];

/**
 * Rate limiting for sensitive endpoints
 */
const sensitiveEndpointLimiter = (req, res, next) => {
  // This would integrate with your rate limiting strategy
  // For now, we'll use a simple approach
  const clientId = req.ip;
  const now = Date.now();
  
  // In production, use Redis or a proper rate limiting service
  if (!req.app.locals.rateLimitStore) {
    req.app.locals.rateLimitStore = new Map();
  }
  
  const store = req.app.locals.rateLimitStore;
  const windowMs = 5 * 60 * 1000; // 5 minutes
  const maxRequests = 10; // 10 requests per 5 minutes for sensitive endpoints
  
  if (!store.has(clientId)) {
    store.set(clientId, { count: 1, resetTime: now + windowMs });
    return next();
  }
  
  const clientData = store.get(clientId);
  
  if (now > clientData.resetTime) {
    store.set(clientId, { count: 1, resetTime: now + windowMs });
    return next();
  }
  
  if (clientData.count >= maxRequests) {
    return res.status(429).json({
      error: 'Too many requests',
      message: 'Please wait before making another request to this sensitive endpoint.',
      retryAfter: Math.ceil((clientData.resetTime - now) / 1000),
    });
  }
  
  clientData.count++;
  next();
};

module.exports = {
  validateMessage,
  validateMoodCheck,
  sanitizeInput,
  sensitiveEndpointLimiter,
};