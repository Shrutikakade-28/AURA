import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX, FiPhone, FiExternalLink } from 'react-icons/fi';

const AlertContainer = styled(motion.div)`
  background: ${props => props.theme.colors.crisisAccent};
  border: 2px solid ${props => props.theme.colors.crisisPrimary};
  border-radius: ${props => props.theme.borderRadius.large};
  margin: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.lg};
  position: relative;
`;

const AlertHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const AlertTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.crisisPrimary};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.crisisPrimary};
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.crisisSecondary};
    color: ${props => props.theme.colors.textInverse};
  }
`;

const AlertMessage = styled.p`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.6;
`;

const HelplineSection = styled.div`
  background: ${props => props.theme.colors.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const HelplineTitle = styled.h4`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const HelplineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const HelplineItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.border};
`;

const HelplineInfo = styled.div`
  flex: 1;
`;

const HelplineName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const HelplineNumber = styled.div`
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  font-size: 1.125rem;
`;

const HelplineAvailability = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const CallButton = styled.a`
  background: ${props => props.theme.colors.crisisPrimary};
  color: ${props => props.theme.colors.textInverse};
  text-decoration: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.crisisSecondary};
    transform: translateY(-1px);
  }
`;

const ResourcesSection = styled.div`
  margin-top: ${props => props.theme.spacing.md};
`;

const ResourcesTitle = styled.h4`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ResourceList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
`;

const ResourceButton = styled.button`
  background: ${props => props.theme.colors.backgroundSecondary};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  
  &:hover {
    background: ${props => props.theme.colors.primaryLight};
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const CrisisAlert = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(true);

  const helplines = [
    {
      name: 'National Suicide Prevention Helpline',
      number: '1800-599-0019',
      availability: '24/7',
      description: 'Free, confidential support'
    },
    {
      name: 'KIRAN Mental Health Helpline',
      number: '1800-599-0019',
      availability: '24/7',
      description: 'Government mental health support'
    },
    {
      name: 'iCall',
      number: '022-25521111',
      availability: 'Mon-Sat, 8 AM-10 PM',
      description: 'Professional counseling'
    }
  ];

  const resources = [
    { name: 'Safety Plan', action: 'safety-plan' },
    { name: 'Crisis Resources', action: 'crisis-resources' },
    { name: 'Emergency Steps', action: 'emergency-steps' }
  ];

  const handleResourceClick = (action) => {
    console.log('Resource clicked:', action);
    // This would typically navigate to the appropriate resource page
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <AlertContainer
        theme={theme}
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <AlertHeader theme={theme}>
          <AlertTitle theme={theme}>
            <FiAlertTriangle />
            Crisis Support Available
          </AlertTitle>
          <CloseButton 
            theme={theme} 
            onClick={() => setIsVisible(false)}
            title="Close alert"
          >
            <FiX />
          </CloseButton>
        </AlertHeader>

        <AlertMessage theme={theme}>
          I'm concerned about what you've shared. Your safety is important, and there are people who want to help. 
          Please consider reaching out to a mental health professional or crisis helpline.
        </AlertMessage>

        <HelplineSection theme={theme}>
          <HelplineTitle theme={theme}>Immediate Support</HelplineTitle>
          <HelplineList theme={theme}>
            {helplines.map((helpline, index) => (
              <HelplineItem key={index} theme={theme}>
                <HelplineInfo theme={theme}>
                  <HelplineName theme={theme}>{helpline.name}</HelplineName>
                  <HelplineNumber theme={theme}>{helpline.number}</HelplineNumber>
                  <HelplineAvailability theme={theme}>
                    {helpline.availability} • {helpline.description}
                  </HelplineAvailability>
                </HelplineInfo>
                <CallButton 
                  theme={theme} 
                  href={`tel:${helpline.number}`}
                  title={`Call ${helpline.name}`}
                >
                  <FiPhone />
                  Call
                </CallButton>
              </HelplineItem>
            ))}
          </HelplineList>
        </HelplineSection>

        <ResourcesSection theme={theme}>
          <ResourcesTitle theme={theme}>Additional Resources</ResourcesTitle>
          <ResourceList theme={theme}>
            {resources.map((resource, index) => (
              <ResourceButton
                key={index}
                theme={theme}
                onClick={() => handleResourceClick(resource.action)}
              >
                <FiExternalLink />
                {resource.name}
              </ResourceButton>
            ))}
          </ResourceList>
        </ResourcesSection>
      </AlertContainer>
    </AnimatePresence>
  );
};

export default CrisisAlert;
