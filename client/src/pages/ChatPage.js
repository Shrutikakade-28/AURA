import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiTrash2, FiAlertTriangle, FiHeart, FiMessageCircle } from 'react-icons/fi';
import { useChat } from '../contexts/ChatContext';
import { useTheme } from '../contexts/ThemeContext';
import MessageBubble from '../components/MessageBubble';
import CrisisAlert from '../components/CrisisAlert';
import TypingIndicator from '../components/TypingIndicator';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  max-width: 800px;
  margin: 0 auto;
  background: ${props => props.theme.colors.background};
`;

const ChatHeader = styled.div`
  background: ${props => props.theme.colors.backgroundSecondary};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textInverse};
  font-size: 1.25rem;
`;

const HeaderText = styled.div`
  h3 {
    color: ${props => props.theme.colors.text};
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.875rem;
    margin: 0;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${props => props.theme.colors.error};
    background: ${props => props.theme.colors.backgroundTertiary};
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const EmptyState = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const EmptyTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const EmptyDescription = styled.p`
  max-width: 400px;
  line-height: 1.6;
`;

const InputContainer = styled.div`
  background: ${props => props.theme.colors.backgroundSecondary};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.lg};
`;

const InputWrapper = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: flex-end;
`;

const MessageInput = styled.textarea`
  flex: 1;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  line-height: 1.5;
  resize: none;
  min-height: 44px;
  max-height: 120px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primaryLight};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textTertiary};
  }
`;

const SendButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textInverse};
  border: none;
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  height: 44px;
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primaryHover};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ChatPage = () => {
  const { theme } = useTheme();
  const { 
    sessionId, 
    messages, 
    isLoading, 
    error, 
    emotionalState, 
    crisisDetected,
    startSession, 
    sendMessage, 
    clearHistory 
  } = useChat();
  
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [isSessionStarting, setIsSessionStarting] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Start session on component mount
  useEffect(() => {
    if (!sessionId && !isSessionStarting) {
      handleStartSession();
    }
  }, [sessionId, isSessionStarting]);

  // Focus input when session is ready
  useEffect(() => {
    if (sessionId && !isLoading) {
      inputRef.current?.focus();
    }
  }, [sessionId, isLoading]);

  const handleStartSession = async () => {
    setIsSessionStarting(true);
    try {
      await startSession();
    } catch (error) {
      console.error('Failed to start session:', error);
    } finally {
      setIsSessionStarting(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue.trim();
    setInputValue('');

    try {
      await sendMessage(message);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear the conversation history?')) {
      try {
        await clearHistory();
      } catch (error) {
        console.error('Failed to clear history:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  if (isSessionStarting) {
    return (
      <ChatContainer theme={theme}>
        <EmptyState theme={theme}>
          <EmptyIcon theme={theme}>
            <FiMessageCircle />
          </EmptyIcon>
          <EmptyTitle theme={theme}>Starting your session...</EmptyTitle>
          <EmptyDescription theme={theme}>
            Please wait while we set up your secure, anonymous chat session.
          </EmptyDescription>
        </EmptyState>
      </ChatContainer>
    );
  }

  return (
    <ChatContainer theme={theme}>
      <ChatHeader theme={theme}>
        <HeaderInfo theme={theme}>
          <Avatar theme={theme}>
            <FiHeart />
          </Avatar>
          <HeaderText theme={theme}>
            <h3>Aura</h3>
            <p>Your wellness companion • {emotionalState}</p>
          </HeaderText>
        </HeaderInfo>
        
        <HeaderActions theme={theme}>
          <ActionButton 
            theme={theme} 
            onClick={handleClearHistory}
            title="Clear conversation"
          >
            <FiTrash2 />
          </ActionButton>
        </HeaderActions>
      </ChatHeader>

      <AnimatePresence>
        {crisisDetected && (
          <CrisisAlert theme={theme} />
        )}
      </AnimatePresence>

      <MessagesContainer theme={theme}>
        {messages.length === 0 ? (
          <EmptyState theme={theme}>
            <EmptyIcon theme={theme}>
              <FiMessageCircle />
            </EmptyIcon>
            <EmptyTitle theme={theme}>Welcome to Aura</EmptyTitle>
            <EmptyDescription theme={theme}>
              I'm here to listen and support you. Share what's on your mind, 
              and I'll respond with empathy and care. Your conversation is 
              completely private and anonymous.
            </EmptyDescription>
          </EmptyState>
        ) : (
          <>
            {messages.map((message, index) => (
              <MessageBubble
                key={message.id || index}
                message={message}
                theme={theme}
              />
            ))}
            {isLoading && <TypingIndicator theme={theme} />}
            <div ref={messagesEndRef} />
          </>
        )}
      </MessagesContainer>

      <InputContainer theme={theme}>
        <InputWrapper theme={theme}>
          <MessageInput
            ref={inputRef}
            theme={theme}
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            disabled={isLoading}
            rows={1}
          />
          <SendButton
            theme={theme}
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
          >
            <FiSend />
          </SendButton>
        </InputWrapper>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatPage;
