import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiHeart, FiShield, FiUsers, FiMessageCircle, FiArrowRight, FiCheck } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import { chatService } from '../services/chatService'; // Make sure this exists

const OnboardingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primaryLight} 0%, 
    ${props => props.theme.colors.background} 100%);
`;

const Content = styled(motion.div)`
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const LogoIcon = styled(FiHeart)`
  color: ${props => props.theme.colors.primary};
  font-size: 3rem;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xl};
  line-height: 1.6;
`;

const Features = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Feature = styled(motion.div)`
  background: ${props => props.theme.colors.backgroundSecondary};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.large};
  border: 1px solid ${props => props.theme.colors.border};
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const FeatureIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const PrivacyNotice = styled(motion.div)`
  background: ${props => props.theme.colors.backgroundSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: left;
`;

const PrivacyTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.success};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const PrivacyList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PrivacyItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled(motion.button)`
  background: ${props => props.variant === 'primary' 
    ? props.theme.colors.primary 
    : props.theme.colors.backgroundSecondary};
  color: ${props => props.variant === 'primary' 
    ? props.theme.colors.textInverse 
    : props.theme.colors.text};
  border: 2px solid ${props => props.variant === 'primary' 
    ? props.theme.colors.primary 
    : props.theme.colors.border};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.large};
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  min-width: 200px;
  justify-content: center;
  
  &:hover {
    background: ${props => props.variant === 'primary' 
      ? props.theme.colors.primaryHover 
      : props.theme.colors.backgroundTertiary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const OnboardingPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);

  const handleStartChat = async () => {
    setIsStarting(true);
    try {
      const conversation = await chatService.startConversation(); // Start a conversation
      console.log('Conversation started:', conversation);

      // Store conversation ID for chat page
      localStorage.setItem('conversationId', conversation.id);

      navigate('/chat');
    } catch (error) {
      console.error('Failed to start chat:', error);
      alert('Failed to start chat. Please try again.');
      setIsStarting(false);
    }
  };

  const handleLearnMore = () => {
    navigate('/privacy');
  };

  const features = [
    {
      icon: <FiMessageCircle />,
      title: 'Empathetic Conversations',
      description: 'AI-powered support that understands your feelings and provides compassionate responses tailored for Indian youth.'
    },
    {
      icon: <FiHeart />,
      title: 'Wellness Tools',
      description: 'Access mindfulness exercises, breathing techniques, and mood check-ins designed for your cultural context.'
    },
    {
      icon: <FiShield />,
      title: 'Privacy First',
      description: 'Anonymous usage with end-to-end encryption. Your conversations are private and secure.'
    },
    {
      icon: <FiUsers />,
      title: 'Crisis Support',
      description: 'Automatic detection of high-risk situations with immediate access to Indian helplines and resources.'
    }
  ];

  const privacyPoints = [
    'No personal information is collected or stored',
    'All conversations are encrypted and anonymous',
    'No data is shared with third parties',
    'You can delete your conversation history anytime',
    'Compliant with Indian privacy standards'
  ];

  return (
    <OnboardingContainer theme={theme}>
      <Content
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Logo
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <LogoIcon theme={theme} />
          <Title theme={theme}>Aura</Title>
        </Logo>

        <Subtitle theme={theme}>
          Your confidential AI wellness companion for emotional support and mental health resources
        </Subtitle>

        <Features
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <Feature
              key={index}
              theme={theme}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <FeatureIcon theme={theme}>
                {feature.icon}
              </FeatureIcon>
              <FeatureTitle theme={theme}>
                {feature.title}
              </FeatureTitle>
              <FeatureDescription theme={theme}>
                {feature.description}
              </FeatureDescription>
            </Feature>
          ))}
        </Features>

        <PrivacyNotice
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <PrivacyTitle theme={theme}>
            <FiShield />
            Your Privacy is Protected
          </PrivacyTitle>
          <PrivacyList>
            {privacyPoints.map((point, index) => (
              <PrivacyItem key={index} theme={theme}>
                <FiCheck size={16} color={theme.colors.success} />
                {point}
              </PrivacyItem>
            ))}
          </PrivacyList>
        </PrivacyNotice>

        <ButtonGroup
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Button
            theme={theme}
            variant="primary"
            onClick={handleStartChat}
            disabled={isStarting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isStarting ? 'Starting...' : 'Start Chatting'}
            <FiArrowRight />
          </Button>
          
          <Button
            theme={theme}
            variant="secondary"
            onClick={handleLearnMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </Button>
        </ButtonGroup>
      </Content>
    </OnboardingContainer>
  );
};

export default OnboardingPage;
