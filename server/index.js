/* -------------------- SERVER SETUP -------------------- */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const chatRoutes = require('./routes/chat');
const wellnessRoutes = require('./routes/wellness');
const crisisRoutes = require('./routes/crisis');

const app = express();
const PORT = process.env.PORT || 5000;

/* 🔥 Trust proxy for express-rate-limit behind proxies */
app.set('trust proxy', 1);

/* -------------------- SECURITY (CSP FIXED) -------------------- */
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],

        connectSrc: [
          "'self'",
          'http://localhost:5000',
          'http://localhost:3000'
        ],

        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://fonts.googleapis.com'
        ],

        fontSrc: [
          "'self'",
          'https://fonts.gstatic.com',
          'data:'
        ],

        scriptSrc: ["'self'", 'https:'],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  })
);

/* -------------------- GLOBAL RATE LIMITER -------------------- */
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

/* -------------------- GENERAL MIDDLEWARE -------------------- */
app.use(compression());
app.use(morgan('combined'));

app.use(
  cors({
    origin: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(',')
      : ['http://localhost:5173'],
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* -------------------- HEALTH CHECK -------------------- */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

/* -------------------- API ROUTES -------------------- */
app.use('/api/chat', chatRoutes);
app.use('/api/wellness', wellnessRoutes);
app.use('/api/crisis', crisisRoutes);

/* -------------------- ERROR HANDLING -------------------- */
app.use((err, req, res, next) => {
  console.error('Error:', err);

  if (
    err.type === 'entity.parse.failed' ||
    (err instanceof SyntaxError && err.status === 400 && 'body' in err)
  ) {
    return res.status(400).json({
      error: 'Invalid JSON',
      message: 'Please check your request body',
    });
  }

  res.status(500).json({
    error: 'Internal server error',
    message:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Something went wrong',
  });
});

/* -------------------- 404 HANDLER -------------------- */
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: 'The requested resource was not found',
  });
});

/* -------------------- SERVER START -------------------- */
app.listen(PORT, () => {
  console.log(`🚀 Aura server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(
    `🔒 Security: ${
      process.env.NODE_ENV === 'production' ? 'Production' : 'Development'
    }`
  );
});

module.exports = app;
