const express = require('express');
const router = express.Router();

/* -------------------------------------------------------
   POST /api/wellness/start
   Start a wellness session
------------------------------------------------------- */
router.post('/start', (req, res) => {
  try {
    const { userId } = req.body;

    const sessionId = `wellness_${Date.now()}`;

    res.status(200).json({
      success: true,
      sessionId,
      role: 'assistant',
      message:
        "Hi 🌱 I'm Aura. I'm here to support your mental wellness. How are you feeling today?",
      userId: userId || null,
      startedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Wellness start error:', error);
    res.status(500).json({
      error: 'Failed to start wellness session',
      message: 'Something went wrong. Please try again.',
    });
  }
});

/* -------------------------------------------------------
   POST /api/wellness/message
   Handle chat conversation
------------------------------------------------------- */
router.post('/message', (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'message and sessionId are required',
      });
    }

    let reply =
      "I hear you 💙. Would you like to talk more about what's on your mind?";

    const text = message.toLowerCase();

    if (text.includes('stress') || text.includes('anxious')) {
      reply =
        "It sounds like you're feeling stressed 😔. Would you like to try a short breathing exercise?";
    } else if (text.includes('sad') || text.includes('low')) {
      reply =
        "I'm really sorry you're feeling this way 🤍. You're not alone, and it's okay to feel this.";
    } else if (text.includes('angry')) {
      reply =
        "Anger can be really overwhelming. Taking a pause and breathing slowly might help.";
    } else if (text.includes('happy') || text.includes('good')) {
      reply =
        "I'm glad to hear that 😊. What's been helping you feel this way?";
    }

    res.status(200).json({
      role: 'assistant',
      message: reply,
      sessionId,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Wellness message error:', error);
    res.status(500).json({
      error: 'Failed to process message',
      message: 'Please try again.',
    });
  }
});

/* -------------------------------------------------------
   GET /api/wellness/exercises
------------------------------------------------------- */
router.get('/exercises', (req, res) => {
  try {
    const exercises = {
      breathing: [
        {
          id: 'box-breathing',
          name: 'Box Breathing',
          description: 'A simple 4-4-4-4 breathing pattern to calm your mind',
          duration: '2-5 minutes',
          instructions: [
            'Breathe in slowly for 4 counts',
            'Hold your breath for 4 counts',
            'Breathe out slowly for 4 counts',
            'Hold empty for 4 counts',
            'Repeat this cycle'
          ],
          benefits: 'Reduces stress, improves focus, calms nervous system',
          culturalNote: 'Similar to pranayama practices in yoga'
        }
      ]
    };

    res.json(exercises);
  } catch (error) {
    console.error('Wellness exercises error:', error);
    res.status(500).json({
      error: 'Failed to retrieve exercises',
    });
  }
});

/* -------------------------------------------------------
   GET /api/wellness/mood-check
------------------------------------------------------- */
router.get('/mood-check', (req, res) => {
  res.json({
    message: 'Mood check questions available',
  });
});

/* -------------------------------------------------------
   POST /api/wellness/mood-check
------------------------------------------------------- */
router.post('/mood-check', (req, res) => {
  try {
    const { responses, sessionId } = req.body;

    if (!responses || !sessionId) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Both responses and sessionId are required',
      });
    }

    const analysis = analyzeMoodPatterns(responses);
    const recommendations = generateRecommendations(analysis);

    res.json({
      analysis,
      recommendations,
      sessionId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to process mood check',
    });
  }
});

/* -------------------- HELPERS -------------------- */
function analyzeMoodPatterns(responses) {
  let total = 0;
  let count = 0;

  Object.values(responses).forEach(v => {
    if (typeof v === 'number') {
      total += v;
      count++;
    }
  });

  const avg = count ? total / count : 0;

  return {
    averageScore: avg,
    moodState:
      avg <= 1
        ? 'struggling'
        : avg <= 2
        ? 'challenged'
        : avg >= 3.5
        ? 'thriving'
        : 'doing_well',
  };
}

function generateRecommendations({ moodState }) {
  return [
    {
      title: 'Self Care',
      suggestion: 'Practice breathing or mindfulness exercises daily.',
      moodState,
    }
  ];
}

module.exports = router;
