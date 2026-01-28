require('dotenv').config();

/**
 * Aura AI Service
 * - Real OpenAI chat (mental health support)
 * - Optional Google Cloud
 * - Crisis detection
 * - Safe fallback
 */

class AIService {
  constructor() {
    this.useGoogleCloud = false;

    /* -------------------------------------------------- */
    /* OPTIONAL GOOGLE CLOUD (SAFE TO IGNORE)              */
    /* -------------------------------------------------- */
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      try {
        const { PredictionServiceClient } = require('@google-cloud/aiplatform');
        const { LanguageServiceClient } = require('@google-cloud/language');

        this.predictionClient = new PredictionServiceClient();
        this.textClient = new LanguageServiceClient();
        this.useGoogleCloud = true;

        console.log('✅ Google Cloud AI initialized');
      } catch (err) {
        console.log('⚠️ Google Cloud init failed, skipping');
        this.useGoogleCloud = false;
      }
    }

    /* -------------------------------------------------- */
    /* OPENAI (THIS IS THE IMPORTANT FIX)                  */
    /* -------------------------------------------------- */
    if (process.env.OPENAI_API_KEY) {
      try {
        const OpenAI = require('openai').default; // ✅ FIX
        this.openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
        console.log('✅ OpenAI initialized successfully');
      } catch (err) {
        console.error('❌ OpenAI init failed:', err.message);
      }
    } else {
      console.warn('⚠️ OPENAI_API_KEY missing in .env');
    }
  }

  /* -------------------------------------------------- */
  /* SENTIMENT ANALYSIS                                  */
  /* -------------------------------------------------- */
  async analyzeSentiment(text) {
    const negative = [
      'sad', 'depressed', 'anxious', 'lonely', 'hopeless',
      'suicide', 'kill', 'die', 'worthless', 'tired'
    ];
    const positive = ['happy', 'hope', 'good', 'better', 'relieved'];

    const t = text.toLowerCase();
    let score = 0;

    positive.forEach(w => t.includes(w) && score++);
    negative.forEach(w => t.includes(w) && score--);

    let emotionalState = 'neutral';
    if (score <= -3) emotionalState = 'very_negative';
    else if (score <= -1) emotionalState = 'negative';
    else if (score >= 2) emotionalState = 'positive';

    return {
      score,
      magnitude: Math.abs(score),
      emotionalState,
      confidence: Math.abs(score),
    };
  }

  /* -------------------------------------------------- */
  /* CRISIS DETECTION                                    */
  /* -------------------------------------------------- */
  async detectCrisis(text) {
    const keywords = [
      'suicide',
      'kill myself',
      'end my life',
      'no reason to live',
      'better off dead'
    ];

    const lower = text.toLowerCase();
    const keywordMatch = keywords.some(k => lower.includes(k));
    const sentiment = await this.analyzeSentiment(text);

    return {
      isCrisis: keywordMatch || sentiment.emotionalState === 'very_negative',
      confidence: keywordMatch ? 0.9 : sentiment.confidence,
      sentiment,
    };
  }

  /* -------------------------------------------------- */
  /* MAIN AI RESPONSE                                    */
  /* -------------------------------------------------- */
  async generateResponse(userMessage, emotionalState, history = []) {
    if (!this.openai) {
      return this.getFallbackResponse(emotionalState);
    }

    try {
      const messages = [
        {
          role: 'system',
          content: `
You are Aura, a warm, empathetic mental health support AI for Indian youth.
Rules:
- Be supportive and validating
- Do NOT diagnose or prescribe
- Encourage healthy coping
- If user is distressed, respond gently
- If crisis signs appear, suggest reaching out for help
          `.trim(),
        },

        ...history.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content,
        })),

        { role: 'user', content: userMessage },
      ];

      console.log('🧠 Sending to OpenAI:', userMessage);

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 250,
      });

      const reply = completion.choices[0].message.content;

      return {
        message: reply.trim(),
        emotionalState,
        suggestions: this.generateSuggestions(emotionalState),
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      console.error('❌ OpenAI error:', err.message);
      return this.getFallbackResponse(emotionalState);
    }
  }

  /* -------------------------------------------------- */
  /* SUGGESTIONS                                         */
  /* -------------------------------------------------- */
  generateSuggestions(state) {
    const map = {
      very_negative: [
        'Try slow breathing',
        'Reach out to someone you trust',
        'Crisis helpline'
      ],
      negative: [
        'Grounding exercise',
        'Short walk',
        'Journaling'
      ],
      neutral: ['Daily reflection'],
      positive: ['Celebrate progress'],
    };
    return map[state] || [];
  }

  /* -------------------------------------------------- */
  /* SAFE FALLBACK                                       */
  /* -------------------------------------------------- */
  getFallbackResponse(state) {
    return {
      message:
        "I'm really glad you reached out. I'm here with you — do you want to tell me a little more about what you're feeling?",
      emotionalState: state,
      suggestions: this.generateSuggestions(state),
      timestamp: new Date().toISOString(),
    };
  }
}

module.exports = new AIService();
