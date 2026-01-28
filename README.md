# Aura - AI-Powered Confidential Wellness Chatbot

A compassionate, culturally-aware AI chatbot designed to provide emotional support and wellness resources for Indian youth.

## 🌟 Features

- **Empathetic Conversations**: Human-like, judgment-free dialogue powered by Google Vertex AI
- **Self-Help Tools**: Mindfulness exercises, breathing techniques, and mood check-ins
- **Crisis Support**: Automatic detection of high-risk situations with helpline integration
- **Privacy-First**: Anonymous usage with end-to-end encryption
- **Cultural Sensitivity**: Tailored content for Indian youth and cultural context

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Set up Environment Variables**
   - Copy `.env.example` to `.env` in both `server/` and `client/` directories
   - Add your Google Cloud credentials and configuration

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🏗️ Project Structure

```
aura-wellness-chatbot/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Main application pages
│   │   ├── services/      # API communication
│   │   ├── utils/         # Helper functions
│   │   └── styles/        # Global styles
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── middleware/       # Express middleware
│   └── utils/           # Server utilities
└── docs/                # Documentation
```

## 🔧 Technology Stack

- **Frontend**: React 18, Styled Components, Framer Motion
- **Backend**: Node.js, Express, Google Cloud AI Platform
- **AI**: Google Vertex AI, Gemini, PaLM
- **Security**: Helmet, Rate Limiting, Encryption
- **Deployment**: Google Cloud Platform

## 📱 Mobile-First Design

The application is designed with a mobile-first approach, ensuring optimal experience across all devices with responsive design principles.

## 🔒 Privacy & Security

- Anonymous user sessions
- No personal data collection
- End-to-end encryption
- Compliance with Indian privacy standards
- Secure API endpoints with rate limiting

## 🤝 Contributing

This is an MVP project focused on providing immediate value to Indian youth. Contributions are welcome for:
- Cultural content adaptation
- Additional self-help tools
- UI/UX improvements
- Security enhancements

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Crisis Resources

If you or someone you know is in immediate danger, please contact:
- National Suicide Prevention Helpline: 1800-599-0019
- KIRAN Mental Health Helpline: 1800-599-0019
- iCall: 022-25521111

*This chatbot is not a replacement for professional mental health care.*
