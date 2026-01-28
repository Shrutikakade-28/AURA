import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiPhone, FiExternalLink, FiShield, FiUsers, FiHeart, FiCheckCircle } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import { crisisService } from '../services/crisiService';

const CrisisContainer = styled.div`
  min-height: calc(100vh - 60px);
  padding: ${props => props.theme.spacing.xl};
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.crisisPrimary};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const EmergencyAlert = styled(motion.div)`
  background: ${props => props.theme.colors.crisisAccent};
  border: 2px solid ${props => props.theme.colors.crisisPrimary};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const EmergencyTitle = styled.h2`
  color: ${props => props.theme.colors.crisisPrimary};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
`;

const EmergencyMessage = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.125rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.6;
`;

const EmergencyButton = styled.a`
  background: ${props => props.theme.colors.crisisPrimary};
  color: ${props => props.theme.colors.textInverse};
  text-decoration: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.large};
  font-weight: 600;
  font-size: 1.125rem;
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.crisisSecondary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const Section = styled(motion.div)`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const HelplineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const HelplineCard = styled(motion.div)`
  background: ${props => props.theme.colors.backgroundSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.lg};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.large};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const HelplineHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const HelplineName = styled.h3`
  color: ${props => props.theme.colors.text};
  margin: 0;
  font-size: 1.125rem;
`;

const HelplineNumber = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const HelplineDetails = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.5;
`;

const CallButton = styled.a`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textInverse};
  text-decoration: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all 0.2s ease;
  width: 100%;
  justify-content: center;
  
  &:hover {
    background: ${props => props.theme.colors.primaryHover};
    transform: translateY(-1px);
  }
`;

const StepsList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.md};
`;

const StepCard = styled(motion.div)`
  background: ${props => props.theme.colors.backgroundSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
`;

const StepNumber = styled.div`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textInverse};
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: 1.125rem;
`;

const StepDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0;
`;

const PriorityBadge = styled.span`
  background: ${props => {
    switch (props.priority) {
      case 'critical': return props.theme.colors.error;
      case 'high': return props.theme.colors.warning;
      case 'medium': return props.theme.colors.info;
      default: return props.theme.colors.success;
    }
  }};
  color: ${props => props.theme.colors.textInverse};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const ResourceCard = styled(motion.div)`
  background: ${props => props.theme.colors.backgroundSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const ResourceIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ResourceTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ResourceDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ResourceButton = styled.button`
  background: ${props => props.theme.colors.primaryLight};
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  justify-content: center;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.textInverse};
  }
`;

const CrisisPage = () => {
  const { theme } = useTheme();
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      setLoading(true);
      const data = await crisisService.getResources();
      setResources(data);
    } catch (error) {
      console.error('Failed to load crisis resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResourceClick = (type) => {
    console.log('Resource clicked:', type);
    // This would typically navigate to the appropriate resource
  };

  if (loading) {
    return (
      <CrisisContainer theme={theme}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading crisis resources...</p>
        </div>
      </CrisisContainer>
    );
  }

  return (
    <CrisisContainer theme={theme}>
      <Header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title theme={theme}>
          <FiAlertTriangle />
          Crisis Support
        </Title>
        <Subtitle theme={theme}>
          If you're in immediate danger or having thoughts of self-harm, please reach out for help. 
          You're not alone, and there are people who want to support you.
        </Subtitle>
      </Header>

      <EmergencyAlert
        theme={theme}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <EmergencyTitle theme={theme}>
          <FiAlertTriangle />
          Need Immediate Help?
        </EmergencyTitle>
        <EmergencyMessage theme={theme}>
          If you're in crisis or having thoughts of self-harm, please call a helpline immediately. 
          These services are available 24/7 and are completely confidential.
        </EmergencyMessage>
        <EmergencyButton 
          theme={theme} 
          href="tel:1800-599-0019"
        >
          <FiPhone />
          Call National Helpline: 1800-599-0019
        </EmergencyButton>
      </EmergencyAlert>

      <Section
        theme={theme}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <SectionTitle theme={theme}>
          <FiPhone />
          Crisis Helplines
        </SectionTitle>
        <HelplineGrid theme={theme}>
          {resources?.helplines?.map((helpline, index) => (
            <HelplineCard
              key={index}
              theme={theme}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <HelplineHeader theme={theme}>
                <HelplineName theme={theme}>{helpline.name}</HelplineName>
                <PriorityBadge theme={theme} priority="high">24/7</PriorityBadge>
              </HelplineHeader>
              <HelplineNumber theme={theme}>{helpline.number}</HelplineNumber>
              <HelplineDetails theme={theme}>
                <div><strong>Available:</strong> {helpline.available}</div>
                <div><strong>Languages:</strong> {helpline.language}</div>
                <div>{helpline.description}</div>
              </HelplineDetails>
              <CallButton 
                theme={theme} 
                href={`tel:${helpline.number}`}
              >
                <FiPhone />
                Call Now
              </CallButton>
            </HelplineCard>
          ))}
        </HelplineGrid>
      </Section>

      <Section
        theme={theme}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <SectionTitle theme={theme}>
          <FiShield />
          Emergency Steps
        </SectionTitle>
        <StepsList theme={theme}>
          {resources?.emergencySteps?.map((step, index) => (
            <StepCard
              key={index}
              theme={theme}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <StepNumber theme={theme}>{step.step}</StepNumber>
              <StepContent theme={theme}>
                <StepTitle theme={theme}>{step.title}</StepTitle>
                <StepDescription theme={theme}>{step.description}</StepDescription>
              </StepContent>
            </StepCard>
          ))}
        </StepsList>
      </Section>

      <Section
        theme={theme}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <SectionTitle theme={theme}>
          <FiUsers />
          Additional Resources
        </SectionTitle>
        <ResourcesGrid theme={theme}>
          <ResourceCard
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <ResourceIcon theme={theme}>
              <FiShield />
            </ResourceIcon>
            <ResourceTitle theme={theme}>Safety Plan</ResourceTitle>
            <ResourceDescription theme={theme}>
              Create a personalized safety plan to help you through difficult moments
            </ResourceDescription>
            <ResourceButton 
              theme={theme}
              onClick={() => handleResourceClick('safety-plan')}
            >
              <FiExternalLink />
              Create Safety Plan
            </ResourceButton>
          </ResourceCard>

          <ResourceCard
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <ResourceIcon theme={theme}>
              <FiHeart />
            </ResourceIcon>
            <ResourceTitle theme={theme}>Self-Help Strategies</ResourceTitle>
            <ResourceDescription theme={theme}>
              Immediate techniques to help you cope during difficult times
            </ResourceDescription>
            <ResourceButton 
              theme={theme}
              onClick={() => handleResourceClick('self-help')}
            >
              <FiExternalLink />
              View Strategies
            </ResourceButton>
          </ResourceCard>

          <ResourceCard
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <ResourceIcon theme={theme}>
              <FiUsers />
            </ResourceIcon>
            <ResourceTitle theme={theme}>Online Resources</ResourceTitle>
            <ResourceDescription theme={theme}>
              Professional counseling and support organizations
            </ResourceDescription>
            <ResourceButton 
              theme={theme}
              onClick={() => handleResourceClick('online-resources')}
            >
              <FiExternalLink />
              Browse Resources
            </ResourceButton>
          </ResourceCard>
        </ResourcesGrid>
      </Section>
    </CrisisContainer>
  );
};

export default CrisisPage;
