const express = require('express');
const router = express.Router();

/**
 * GET /api/crisis/resources
 * Get crisis support resources
 */
router.get('/resources', (req, res) => {
  try {
    const resources = {
      helplines: [
        {
          name: 'National Suicide Prevention Helpline',
          number: '1800-599-0019',
          available: '24/7',
          language: 'Hindi, English, and regional languages',
          description: 'Free, confidential support for anyone in emotional distress or suicidal crisis'
        },
        {
          name: 'KIRAN Mental Health Helpline',
          number: '1800-599-0019',
          available: '24/7',
          language: 'Hindi, English, and regional languages',
          description: 'Government helpline for mental health support and crisis intervention'
        },
        {
          name: 'iCall',
          number: '022-25521111',
          available: 'Monday to Saturday, 8 AM to 10 PM',
          language: 'Hindi, English, Marathi, Gujarati, Bengali, Assamese, Punjabi, Oriya, Telugu, Tamil, Malayalam, Kannada',
          description: 'Professional counseling service by TISS Mumbai'
        },
        {
          name: 'Sneha',
          number: '044-24640050',
          available: '24/7',
          language: 'Tamil, English, Hindi',
          description: 'Chennai-based suicide prevention helpline'
        },
        {
          name: 'Aasra',
          number: '9820466726',
          available: '24/7',
          language: 'Hindi, English, Gujarati',
          description: 'Mumbai-based crisis intervention center'
        }
      ],
      onlineResources: [
        {
          name: 'YourDOST',
          website: 'https://yourdost.com',
          description: 'Online counseling platform with trained psychologists',
          type: 'Professional counseling',
          cost: 'Paid service with some free resources'
        },
        {
          name: 'Mindroot Foundation',
          website: 'https://mindroot.org',
          description: 'Mental health awareness and support organization',
          type: 'Support groups and resources',
          cost: 'Free resources available'
        },
        {
          name: 'The Live Love Laugh Foundation',
          website: 'https://thelivelovelaughfoundation.org',
          description: 'Mental health awareness and destigmatization',
          type: 'Educational resources',
          cost: 'Free resources'
        }
      ],
      emergencySteps: [
        {
          step: 1,
          title: 'Immediate Safety',
          description: 'If you\'re having thoughts of self-harm, please reach out to someone immediately - a friend, family member, or helpline.',
          priority: 'critical'
        },
        {
          step: 2,
          title: 'Remove Means',
          description: 'If possible, remove any means of self-harm from your immediate environment.',
          priority: 'high'
        },
        {
          step: 3,
          title: 'Stay with Someone',
          description: 'Don\'t be alone right now. Stay with a trusted person or in a public place.',
          priority: 'high'
        },
        {
          step: 4,
          title: 'Professional Help',
          description: 'Contact a mental health professional or visit the nearest emergency room.',
          priority: 'high'
        }
      ],
      selfHelpStrategies: [
        {
          title: 'Grounding Techniques',
          description: 'Use the 5-4-3-2-1 technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.',
          immediate: true
        },
        {
          title: 'Breathing Exercise',
          description: 'Try box breathing: Inhale for 4, hold for 4, exhale for 4, hold for 4. Repeat.',
          immediate: true
        },
        {
          title: 'Reach Out',
          description: 'Text or call someone you trust. You don\'t have to explain everything, just say you need support.',
          immediate: true
        },
        {
          title: 'Safe Environment',
          description: 'Go to a safe, comfortable place. This could be your room, a friend\'s house, or a public place with people.',
          immediate: true
        }
      ]
    };

    res.json(resources);

  } catch (error) {
    console.error('Crisis resources error:', error);
    res.status(500).json({
      error: 'Failed to retrieve crisis resources',
      message: 'Something went wrong. Please try again.',
    });
  }
});

/**
 * POST /api/crisis/assess
 * Assess crisis level and provide appropriate response
 */
router.post('/assess', (req, res) => {
  try {
    const { message, emotionalState, sessionId } = req.body;
    
    if (!message) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Message is required for crisis assessment',
      });
    }

    const assessment = assessCrisisLevel(message, emotionalState);
    const response = generateCrisisResponse(assessment);

    res.json({
      assessment: assessment,
      response: response,
      timestamp: new Date().toISOString(),
      sessionId: sessionId,
    });

  } catch (error) {
    console.error('Crisis assessment error:', error);
    res.status(500).json({
      error: 'Failed to assess crisis level',
      message: 'Something went wrong. Please try again.',
    });
  }
});

/**
 * GET /api/crisis/safety-plan
 * Get a personalized safety plan template
 */
router.get('/safety-plan', (req, res) => {
  try {
    const safetyPlan = {
      title: 'Personal Safety Plan',
      description: 'A safety plan helps you prepare for difficult moments and know what to do when you\'re struggling.',
      sections: [
        {
          title: 'Warning Signs',
          description: 'What are the early warning signs that you\'re starting to feel overwhelmed or distressed?',
          examples: [
            'Feeling very tired or exhausted',
            'Having trouble sleeping',
            'Feeling irritable or angry',
            'Withdrawing from friends and family',
            'Changes in eating habits',
            'Difficulty concentrating'
          ],
          prompt: 'List your personal warning signs:'
        },
        {
          title: 'Coping Strategies',
          description: 'What activities or strategies help you feel better when you\'re struggling?',
          examples: [
            'Listening to music',
            'Going for a walk',
            'Talking to a friend',
            'Doing breathing exercises',
            'Watching a favorite show',
            'Reading a book'
          ],
          prompt: 'List your personal coping strategies:'
        },
        {
          title: 'Support People',
          description: 'Who are the people you can reach out to when you need support?',
          examples: [
            'Close friends',
            'Family members',
            'Teachers or mentors',
            'Counselors or therapists',
            'Religious or spiritual leaders'
          ],
          prompt: 'List people you can contact for support:'
        },
        {
          title: 'Professional Resources',
          description: 'What professional resources are available to you?',
          examples: [
            'School counselor',
            'Mental health professional',
            'Crisis helplines',
            'Emergency services',
            'Local mental health center'
          ],
          prompt: 'List professional resources available to you:'
        },
        {
          title: 'Safe Environments',
          description: 'Where are the places you feel safe and comfortable?',
          examples: [
            'Your room',
            'A friend\'s house',
            'A library or quiet place',
            'A park or outdoor space',
            'A place of worship'
          ],
          prompt: 'List safe places you can go:'
        },
        {
          title: 'Reasons to Live',
          description: 'What are the things that give your life meaning and purpose?',
          examples: [
            'Family and friends',
            'Future goals and dreams',
            'Pets or animals',
            'Hobbies and interests',
            'Helping others',
            'Spiritual or religious beliefs'
          ],
          prompt: 'List your reasons for living:'
        }
      ],
      instructions: [
        'Take your time filling out each section',
        'Be honest and specific',
        'Keep this plan easily accessible',
        'Review and update it regularly',
        'Share it with a trusted person if you feel comfortable'
      ]
    };

    res.json(safetyPlan);

  } catch (error) {
    console.error('Safety plan error:', error);
    res.status(500).json({
      error: 'Failed to retrieve safety plan',
      message: 'Something went wrong. Please try again.',
    });
  }
});

/**
 * Assess crisis level based on message content and emotional state
 */
function assessCrisisLevel(message, emotionalState) {
  const crisisKeywords = [
    'suicide', 'kill myself', 'end it all', 'not worth living',
    'harm myself', 'hurt myself', 'self harm', 'cut myself',
    'overdose', 'take pills', 'jump off', 'hang myself',
    'no point', 'better off dead', 'world without me',
    'want to die', 'end my life', 'suicidal'
  ];
  
  const highRiskKeywords = [
    'plan', 'method', 'tonight', 'today', 'soon',
    'final', 'last time', 'goodbye', 'farewell'
  ];
  
  const messageLower = message.toLowerCase();
  
  // Check for crisis keywords
  const hasCrisisKeywords = crisisKeywords.some(keyword => messageLower.includes(keyword));
  const hasHighRiskKeywords = highRiskKeywords.some(keyword => messageLower.includes(keyword));
  
  // Determine crisis level
  let crisisLevel = 'low';
  let confidence = 0;
  
  if (hasCrisisKeywords && hasHighRiskKeywords) {
    crisisLevel = 'critical';
    confidence = 0.95;
  } else if (hasCrisisKeywords) {
    crisisLevel = 'high';
    confidence = 0.85;
  } else if (emotionalState === 'very_negative') {
    crisisLevel = 'moderate';
    confidence = 0.6;
  } else if (emotionalState === 'negative') {
    crisisLevel = 'low';
    confidence = 0.4;
  }
  
  return {
    level: crisisLevel,
    confidence: confidence,
    indicators: {
      crisisKeywords: hasCrisisKeywords,
      highRiskKeywords: hasHighRiskKeywords,
      emotionalState: emotionalState
    }
  };
}

/**
 * Generate appropriate crisis response based on assessment
 */
function generateCrisisResponse(assessment) {
  const { level, confidence } = assessment;
  
  switch (level) {
    case 'critical':
      return {
        immediate: true,
        message: 'I\'m very concerned about what you\'ve shared. Your safety is the most important thing right now. Please reach out for immediate help.',
        actions: [
          'Call a crisis helpline immediately: 1800-599-0019',
          'Go to the nearest emergency room',
          'Stay with someone you trust',
          'Remove any means of self-harm from your environment'
        ],
        priority: 'critical',
        followUp: 'Please let someone know you\'re safe after getting help.'
      };
      
    case 'high':
      return {
        immediate: true,
        message: 'I\'m worried about you. It sounds like you\'re going through an extremely difficult time. Please consider reaching out for professional support.',
        actions: [
          'Call a mental health helpline: 1800-599-0019',
          'Contact a trusted friend or family member',
          'Consider speaking with a counselor or therapist',
          'Use grounding techniques to stay present'
        ],
        priority: 'high',
        followUp: 'You don\'t have to face this alone. There are people who want to help.'
      };
      
    case 'moderate':
      return {
        immediate: false,
        message: 'I can see you\'re really struggling right now. It\'s okay to not be okay, and it\'s important to take care of yourself.',
        actions: [
          'Try some breathing exercises or grounding techniques',
          'Reach out to a friend or family member',
          'Consider professional support if these feelings persist',
          'Focus on basic self-care: rest, nutrition, gentle movement'
        ],
        priority: 'medium',
        followUp: 'These feelings are temporary, even when they don\'t feel that way.'
      };
      
    default:
      return {
        immediate: false,
        message: 'Thank you for sharing how you\'re feeling. It takes courage to be open about your struggles.',
        actions: [
          'Continue using self-help tools and techniques',
          'Stay connected with supportive people',
          'Monitor your mood and reach out if things get worse'
        ],
        priority: 'low',
        followUp: 'Remember, seeking help is a sign of strength, not weakness.'
      };
  }
}

module.exports = router;
