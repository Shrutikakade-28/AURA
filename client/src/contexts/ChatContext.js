import React, { createContext, useContext, useState, useCallback } from 'react';
import { chatService } from '../services/chatService';

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emotionalState, setEmotionalState] = useState('neutral');
  const [crisisDetected, setCrisisDetected] = useState(false);

  // Start a new chat session
  const startSession = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatService.startSession();
      
      if (!response || !response.sessionId || !response.message) {
        throw new Error('Invalid session response from server');
      }

      setSessionId(response.sessionId);
      setMessages([
        {
          id: Date.now(),
          type: 'bot',
          content: response.message,
          timestamp: response.timestamp || new Date().toISOString(),
          emotionalState: response.emotionalState || 'neutral',
          suggestions: response.suggestions || [],
        },
      ]);
      setEmotionalState(response.emotionalState || 'neutral');
      setCrisisDetected(false);

      return response;
    } catch (err) {
      console.error('Failed to start chat session:', err);
      setError('Unable to start chat session. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Send a user message
  const sendMessage = useCallback(
    async (content) => {
      if (!sessionId) {
        setError('No active session. Please start a new chat.');
        return;
      }
      if (!content || !content.trim()) return;

      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: content.trim(),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const response = await chatService.sendMessage(sessionId, content.trim());

        if (!response || !response.message) {
          throw new Error('Invalid response from server');
        }

        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: response.message,
          timestamp: response.timestamp || new Date().toISOString(),
          emotionalState: response.emotionalState || 'neutral',
          suggestions: response.suggestions || [],
        };

        setMessages((prev) => [...prev, botMessage]);
        setEmotionalState(response.emotionalState || 'neutral');

        if (response.crisisDetected) setCrisisDetected(true);

        return response;
      } catch (err) {
        console.error('Send message error:', err);
        setError('Failed to send message. Please try again.');

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 2,
            type: 'bot',
            content: "I'm having trouble responding right now. Please try again later.",
            timestamp: new Date().toISOString(),
            isError: true,
          },
        ]);

        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId]
  );

  // Clear all chat history
  const clearHistory = useCallback(async () => {
    if (!sessionId) return;

    try {
      await chatService.clearHistory(sessionId);
    } catch (err) {
      console.error('Failed to clear history:', err);
    } finally {
      setMessages([]);
      setEmotionalState('neutral');
      setCrisisDetected(false);
    }
  }, [sessionId]);

  // Reset everything (used when user logs out or restarts)
  const resetSession = useCallback(() => {
    setSessionId(null);
    setMessages([]);
    setEmotionalState('neutral');
    setCrisisDetected(false);
    setError(null);
    setIsLoading(false);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        sessionId,
        messages,
        isLoading,
        error,
        emotionalState,
        crisisDetected,
        startSession,
        sendMessage,
        clearHistory,
        resetSession,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within a ChatProvider');
  return context;
};
