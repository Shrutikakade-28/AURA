const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const aiService = require('../services/aiService');
const { validateMessage, sanitizeInput } = require('../middleware/validation');
const { encryptMessage, decryptMessage } = require('../utils/encryption');

/* ================= STORAGE LAYER ================= */

let conversations;

try {
  const Redis = require('ioredis');
  const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

  redis.on('error', (err) => {
    console.error('Redis error:', err);
  });

  conversations = {
    async get(key) {
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    },
    async set(key, value) {
      await redis.set(key, JSON.stringify(value));
    },
    async delete(key) {
      await redis.del(key);
    },
    async has(key) {
      const exists = await redis.exists(key);
      return exists === 1;
    },
  };
} catch {
  // Fallback: in-memory (development only)
  const map = new Map();
  conversations = {
    async get(key) {
      return map.get(key) || null;
    },
    async set(key, value) {
      map.set(key, value);
    },
    async delete(key) {
      map.delete(key);
    },
    async has(key) {
      return map.has(key);
    },
  };
}

/* ================= START SESSION ================= */

router.post('/start', async (req, res) => {
  try {
    const sessionId = uuidv4();

    await conversations.set(sessionId, []);

    res.json({
      sessionId,
      message:
        "Hi there! I'm Aura, your wellness companion. I'm here to listen, support, and help you navigate whatever you're going through. How are you feeling today?",
      emotionalState: 'neutral',
      suggestions: ['Mood check-in', 'Share your thoughts', 'Wellness tips'],
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Session start error:', err);
    res.status(500).json({
      error: 'Failed to start session',
      message: 'Something went wrong. Please try again.',
    });
  }
});

/* ================= SEND MESSAGE ================= */

router.post('/message', validateMessage, async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Both message and sessionId are required',
      });
    }

    const sanitizedMessage = sanitizeInput(message);
    const conversationHistory =
      (await conversations.get(sessionId)) || [];

    const sentimentAnalysis =
      await aiService.analyzeSentiment(sanitizedMessage);

    const crisisDetection =
      await aiService.detectCrisis(sanitizedMessage);

    const aiResponse =
      await aiService.generateResponse(
        sanitizedMessage,
        sentimentAnalysis.emotionalState,
        conversationHistory
      );

    const userMessage = {
      id: uuidv4(),
      type: 'user',
      content: encryptMessage(sanitizedMessage),
      timestamp: new Date().toISOString(),
      sentiment: sentimentAnalysis,
    };

    const botMessage = {
      id: uuidv4(),
      type: crisisDetection.isCrisis ? 'crisis' : 'bot',
      content: encryptMessage(aiResponse.message),
      timestamp: aiResponse.timestamp,
      emotionalState: aiResponse.emotionalState,
      suggestions: aiResponse.suggestions,
    };

    conversationHistory.push(userMessage, botMessage);
    await conversations.set(sessionId, conversationHistory);

    const response = {
      sessionId,
      message: aiResponse.message,
      emotionalState: aiResponse.emotionalState,
      suggestions: aiResponse.suggestions,
      timestamp: aiResponse.timestamp,
    };

    if (crisisDetection.isCrisis) {
      response.crisisDetected = true;
      response.crisisResources = {
        helpline: process.env.HELPLINE_NUMBER || '1800-599-0019',
        message:
          "I'm really concerned about what you're going through. You deserve support, and help is available right now.",
        immediateSupport: [
          'KIRAN Mental Health Helpline: 1800-599-0019',
          'iCall: 022-25521111',
        ],
      };
    }

    res.json(response);
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({
      error: 'Failed to process message',
      message: 'Something went wrong. Please try again.',
    });
  }
});

/* ================= GET HISTORY ================= */

router.get('/history/:sessionId', async (req, res) => {
  try {
    const conversationHistory =
      (await conversations.get(req.params.sessionId)) || [];

    const decryptedHistory = conversationHistory.map((msg) => ({
      ...msg,
      content: msg.content ? decryptMessage(msg.content) : '',
    }));

    res.json({ messages: decryptedHistory });
  } catch (err) {
    console.error('History retrieval error:', err);
    res.status(500).json({
      error: 'Failed to retrieve history',
      message: 'Something went wrong. Please try again.',
    });
  }
});

/* ================= DELETE HISTORY ================= */

router.delete('/history/:sessionId', async (req, res) => {
  try {
    await conversations.delete(req.params.sessionId);
    res.json({
      message: 'Conversation history deleted successfully',
      sessionId: req.params.sessionId,
    });
  } catch (err) {
    console.error('History deletion error:', err);
    res.status(500).json({
      error: 'Failed to delete history',
      message: 'Something went wrong. Please try again.',
    });
  }
});

module.exports = router;
