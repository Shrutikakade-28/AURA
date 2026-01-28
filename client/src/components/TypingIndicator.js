import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';

const bounce = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
`;

const TypingContainer = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TypingWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.backgroundTertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  font-size: 0.875rem;
  flex-shrink: 0;
`;

const TypingBubble = styled.div`
  background: ${props => props.theme.colors.backgroundSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.large} ${props => props.theme.borderRadius.large} ${props => props.theme.borderRadius.large} ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.textSecondary};
  animation: ${bounce} 1.4s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
`;

const TypingIndicator = ({ theme }) => {
  return (
    <TypingContainer
      theme={theme}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <TypingWrapper theme={theme}>
        <Avatar theme={theme}>
          <FiHeart />
        </Avatar>
        
        <TypingBubble theme={theme}>
          <Dot theme={theme} delay={0} />
          <Dot theme={theme} delay={0.2} />
          <Dot theme={theme} delay={0.4} />
        </TypingBubble>
      </TypingWrapper>
    </TypingContainer>
  );
};

export default TypingIndicator;
