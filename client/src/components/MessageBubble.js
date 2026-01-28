import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUser, FiHeart } from 'react-icons/fi';

// Prevent custom props from being passed to the DOM
const MessageContainer = styled(motion.div)`
  display: flex;
  justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const MessageWrapper = styled.div`
  max-width: 70%;
  display: flex;
  flex-direction: ${props => props.isUser ? 'row-reverse' : 'row'};
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.isUser 
    ? props.theme.colors.primary 
    : props.theme.colors.backgroundTertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.isUser 
    ? props.theme.colors.textInverse 
    : props.theme.colors.primary};
  font-size: 0.875rem;
  flex-shrink: 0;
`;

// Bubble with isError and isUser props filtered
const Bubble = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isError' && prop !== 'isUser'
})`
  background: ${props => props.isUser 
    ? props.theme.colors.primary 
    : props.theme.colors.backgroundSecondary};
  color: ${props => props.isUser 
    ? props.theme.colors.textInverse 
    : props.theme.colors.text};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.isUser 
    ? `${props.theme.borderRadius.large} ${props.theme.borderRadius.large} ${props.theme.borderRadius.small} ${props.theme.borderRadius.large}`
    : `${props.theme.borderRadius.large} ${props.theme.borderRadius.large} ${props.theme.borderRadius.large} ${props.theme.borderRadius.small}`};
  border: 1px solid ${props => props.isUser 
    ? props.theme.colors.primary 
    : props.theme.colors.border};
  word-wrap: break-word;
  line-height: 1.5;
  position: relative;

  ${props => props.isError && `
    background: ${props.theme.colors.error};
    color: ${props.theme.colors.textInverse};
    border-color: ${props.theme.colors.error};
  `}
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Timestamp = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textTertiary};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const Suggestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  margin-top: ${props => props.theme.spacing.sm};
`;

const SuggestionChip = styled.button`
  background: ${props => props.theme.colors.primaryLight};
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.full};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.textInverse};
  }
`;

const EmotionalState = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: ${props => props.theme.spacing.xs};
`;

const StateIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => {
    switch (props.state) {
      case 'positive': return props.theme.colors.success;
      case 'slightly_positive': return props.theme.colors.success;
      case 'neutral': return props.theme.colors.info;
      case 'slightly_negative': return props.theme.colors.warning;
      case 'negative': return props.theme.colors.warning;
      case 'very_negative': return props.theme.colors.error;
      default: return props.theme.colors.info;
    }
  }};
`;

const MessageBubble = ({ message, theme }) => {
  const isUser = message.type === 'user';
  const isError = message.isError;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getEmotionalStateText = (state) => {
    const stateMap = {
      'very_negative': 'Very concerned',
      'negative': 'Concerned',
      'slightly_negative': 'A bit worried',
      'neutral': 'Neutral',
      'slightly_positive': 'Hopeful',
      'positive': 'Encouraged'
    };
    return stateMap[state] || 'Neutral';
  };

  const handleSuggestionClick = (suggestion) => {
    console.log('Suggestion clicked:', suggestion);
  };

  return (
    <MessageContainer
      theme={theme}
      isUser={isUser}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <MessageWrapper theme={theme} isUser={isUser}>
        <Avatar theme={theme} isUser={isUser}>
          {isUser ? <FiUser /> : <FiHeart />}
        </Avatar>

        <MessageContent theme={theme}>
          <Bubble theme={theme} isUser={isUser} isError={isError}>
            {message.content}
          </Bubble>

          {message.suggestions && message.suggestions.length > 0 && !isUser && (
            <Suggestions theme={theme}>
              {message.suggestions.map((suggestion, index) => (
                <SuggestionChip
                  key={index}
                  theme={theme}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </SuggestionChip>
              ))}
            </Suggestions>
          )}

          {message.emotionalState && !isUser && (
            <EmotionalState theme={theme}>
              <StateIndicator theme={theme} state={message.emotionalState} />
              {getEmotionalStateText(message.emotionalState)}
            </EmotionalState>
          )}

          <Timestamp theme={theme} isUser={isUser}>
            {formatTime(message.timestamp)}
          </Timestamp>
        </MessageContent>
      </MessageWrapper>
    </MessageContainer>
  );
};

export default MessageBubble;
