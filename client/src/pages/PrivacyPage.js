import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiEye, FiTrash2, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const PrivacyContainer = styled.div`
  min-height: calc(100vh - 60px);
  padding: ${props => props.theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.125rem;
  line-height: 1.6;
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

const Content = styled.div`
  background: ${props => props.theme.colors.backgroundSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.lg};
`;

const FeatureList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.md};
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.border};
`;

const FeatureIcon = styled.div`
  color: ${props => props.theme.colors.success};
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: 1.125rem;
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0;
`;

const TextContent = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.7;
  
  h3 {
    color: ${props => props.theme.colors.text};
    margin-top: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.md};
  }
  
  h4 {
    color: ${props => props.theme.colors.text};
    margin-top: ${props => props.theme.spacing.md};
    margin-bottom: ${props => props.theme.spacing.sm};
  }
  
  ul, ol {
    margin: ${props => props.theme.spacing.md} 0;
    padding-left: ${props => props.theme.spacing.lg};
  }
  
  li {
    margin-bottom: ${props => props.theme.spacing.sm};
  }
  
  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const WarningBox = styled.div`
  background: ${props => props.theme.colors.warning}20;
  border: 1px solid ${props => props.theme.colors.warning};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.md};
  margin: ${props => props.theme.spacing.lg} 0;
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
`;

const WarningIcon = styled.div`
  color: ${props => props.theme.colors.warning};
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
`;

const WarningText = styled.div`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const ContactInfo = styled.div`
  background: ${props => props.theme.colors.primaryLight};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
  margin-top: ${props => props.theme.spacing.xl};
`;

const ContactTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ContactText = styled.p`
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const PrivacyPage = () => {
  const { theme } = useTheme();

  const privacyFeatures = [
    {
      icon: <FiShield />,
      title: 'Anonymous Usage',
      description: 'No personal information is collected. You can use Aura without providing any identifying details like name, email, or phone number.'
    },
    {
      icon: <FiLock />,
      title: 'End-to-End Encryption',
      description: 'All conversations are encrypted using industry-standard encryption protocols. Your messages are protected from unauthorized access.'
    },
    {
      icon: <FiEye />,
      title: 'No Data Tracking',
      description: 'We don\'t track your browsing behavior, location, or any other personal data. Your privacy is completely protected.'
    },
    {
      icon: <FiTrash2 />,
      title: 'Session Control',
      description: 'You can delete your conversation history at any time. All data is automatically purged when you end your session.'
    }
  ];

  return (
    <PrivacyContainer theme={theme}>
      <Header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title theme={theme}>
          <FiShield />
          Privacy & Security
        </Title>
        <Subtitle theme={theme}>
          Your privacy is our top priority. Learn how we protect your data and ensure your conversations remain confidential.
        </Subtitle>
      </Header>

      <Section
        theme={theme}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <SectionTitle theme={theme}>
          <FiCheckCircle />
          Privacy Features
        </SectionTitle>
        <Content theme={theme}>
          <FeatureList theme={theme}>
            {privacyFeatures.map((feature, index) => (
              <FeatureItem
                key={index}
                theme={theme}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <FeatureIcon theme={theme}>
                  {feature.icon}
                </FeatureIcon>
                <FeatureContent theme={theme}>
                  <FeatureTitle theme={theme}>{feature.title}</FeatureTitle>
                  <FeatureDescription theme={theme}>
                    {feature.description}
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
            ))}
          </FeatureList>
        </Content>
      </Section>

      <Section
        theme={theme}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <SectionTitle theme={theme}>
          <FiLock />
          Data Protection
        </SectionTitle>
        <Content theme={theme}>
          <TextContent theme={theme}>
            <h3>What We Don't Collect</h3>
            <ul>
              <li>Personal identification information (name, email, phone number)</li>
              <li>Location data or IP addresses</li>
              <li>Browsing history or device information</li>
              <li>Social media profiles or connections</li>
              <li>Any data that could identify you personally</li>
            </ul>

            <h3>What We Do Collect (Anonymously)</h3>
            <ul>
              <li>Conversation content (encrypted and anonymized)</li>
              <li>General usage patterns for service improvement</li>
              <li>Technical logs for system maintenance</li>
            </ul>

            <h3>How We Protect Your Data</h3>
            <ul>
              <li>All data is encrypted in transit and at rest</li>
              <li>Conversations are stored temporarily and automatically deleted</li>
              <li>No third-party data sharing or selling</li>
              <li>Regular security audits and updates</li>
              <li>Compliance with Indian data protection standards</li>
            </ul>

            <WarningBox theme={theme}>
              <WarningIcon theme={theme}>
                <FiAlertCircle />
              </WarningIcon>
              <WarningText theme={theme}>
                <strong>Important:</strong> While we take every precaution to protect your privacy, 
                this service is not a replacement for professional mental health care. 
                If you're in crisis, please contact emergency services or a mental health professional.
              </WarningText>
            </WarningBox>
          </TextContent>
        </Content>
      </Section>

      <Section
        theme={theme}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <SectionTitle theme={theme}>
          <FiShield />
          Your Rights
        </SectionTitle>
        <Content theme={theme}>
          <TextContent theme={theme}>
            <h3>You Have the Right To:</h3>
            <ul>
              <li>Use the service completely anonymously</li>
              <li>Delete your conversation history at any time</li>
              <li>End your session and have all data purged</li>
              <li>Not be tracked or monitored</li>
              <li>Have your data protected according to privacy standards</li>
            </ul>

            <h3>Data Retention</h3>
            <p>
              Your conversation data is only stored temporarily during your session. 
              Once you end your session or delete your history, all data is permanently 
              removed from our systems within 24 hours.
            </p>

            <h3>Third-Party Services</h3>
            <p>
              We use Google Cloud AI services for conversation processing, but your 
              messages are encrypted and anonymized before being sent. Google cannot 
              identify you or access your personal information.
            </p>
          </TextContent>
        </Content>
      </Section>

      <ContactInfo theme={theme}>
        <ContactTitle theme={theme}>Questions About Privacy?</ContactTitle>
        <ContactText theme={theme}>
          If you have any questions about our privacy practices or data protection measures, 
          please review this page carefully. We're committed to transparency and protecting your privacy.
        </ContactText>
      </ContactInfo>
    </PrivacyContainer>
  );
};

export default PrivacyPage;
