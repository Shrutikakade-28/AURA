import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiActivity, FiHeart, FiWind, FiCheckCircle, FiPlay, FiPause } from 'react-icons/fi';
import { FaBrain } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { wellnessService } from '../services/wellnessService';

const WellnessContainer = styled.div`
  min-height: calc(100vh - 60px);
  padding: ${props => props.theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.xl};
  flex-wrap: wrap;
`;

const Tab = styled.button`
  background: ${props => props.active 
    ? props.theme.colors.primary 
    : props.theme.colors.backgroundSecondary};
  color: ${props => props.active 
    ? props.theme.colors.textInverse 
    : props.theme.colors.text};
  border: 2px solid ${props => props.active 
    ? props.theme.colors.primary 
    : props.theme.colors.border};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.large};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  
  &:hover {
    background: ${props => props.active 
      ? props.theme.colors.primaryHover 
      : props.theme.colors.primaryLight};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Content = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const ExerciseCard = styled(motion.div)`
  background: ${props => props.theme.colors.backgroundSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.lg};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const ExerciseHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ExerciseIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius.large};
  background: ${props => props.theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
`;

const ExerciseInfo = styled.div`
  flex: 1;
`;

const ExerciseTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ExerciseDuration = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const ExerciseDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.6;
`;

const ExerciseInstructions = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const InstructionTitle = styled.h4`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const InstructionList = styled.ol`
  color: ${props => props.theme.colors.textSecondary};
  padding-left: ${props => props.theme.spacing.lg};
  line-height: 1.6;
`;

const InstructionItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ExerciseBenefits = styled.div`
  background: ${props => props.theme.colors.backgroundTertiary};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const BenefitsTitle = styled.h4`
  color: ${props => props.theme.colors.text};
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const BenefitsText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  margin: 0;
`;

const StartButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textInverse};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  justify-content: center;
  
  &:hover {
    background: ${props => props.theme.colors.primaryHover};
    transform: translateY(-1px);
  }
`;

const WellnessPage = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('breathing');
  const [exercises, setExercises] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      setLoading(true);
      const data = await wellnessService.getExercises();
      setExercises(data);
    } catch (error) {
      console.error('Failed to load exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case 'breathing': return <FiWind />;
      case 'mindfulness': return <FaBrain />;
      case 'grounding': return <FiActivity />;
      default: return <FiHeart />;
    }
  };

  const getExerciseIcon = (type) => {
    switch (type) {
      case 'breathing': return <FiWind />;
      case 'mindfulness': return <FaBrain />;
      case 'grounding': return <FiActivity />;
      default: return <FiHeart />;
    }
  };

  const handleStartExercise = (exercise) => {
    console.log('Starting exercise:', exercise.name);
    // This would typically open a guided exercise interface
  };

  if (loading) {
    return (
      <WellnessContainer theme={theme}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading wellness exercises...</p>
        </div>
      </WellnessContainer>
    );
  }

  const tabs = [
    { id: 'breathing', label: 'Breathing', icon: getTabIcon('breathing') },
    { id: 'mindfulness', label: 'Mindfulness', icon: getTabIcon('mindfulness') },
    { id: 'grounding', label: 'Grounding', icon: getTabIcon('grounding') }
  ];

  const currentExercises = exercises?.[activeTab] || [];

  return (
    <WellnessContainer theme={theme}>
      <Header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title theme={theme}>Wellness Tools</Title>
        <Subtitle theme={theme}>
          Discover mindfulness exercises, breathing techniques, and grounding practices 
          designed specifically for Indian youth to support your mental wellbeing.
        </Subtitle>
      </Header>

      <Tabs theme={theme}>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            theme={theme}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </Tab>
        ))}
      </Tabs>

      <Content
        theme={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {currentExercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <ExerciseHeader theme={theme}>
              <ExerciseIcon theme={theme}>
                {getExerciseIcon(activeTab)}
              </ExerciseIcon>
              <ExerciseInfo theme={theme}>
                <ExerciseTitle theme={theme}>{exercise.name}</ExerciseTitle>
                <ExerciseDuration theme={theme}>{exercise.duration}</ExerciseDuration>
              </ExerciseInfo>
            </ExerciseHeader>

            <ExerciseDescription theme={theme}>
              {exercise.description}
            </ExerciseDescription>

            <ExerciseInstructions theme={theme}>
              <InstructionTitle theme={theme}>How to do it:</InstructionTitle>
              <InstructionList theme={theme}>
                {exercise.instructions.map((instruction, idx) => (
                  <InstructionItem key={idx} theme={theme}>
                    {instruction}
                  </InstructionItem>
                ))}
              </InstructionList>
            </ExerciseInstructions>

            <ExerciseBenefits theme={theme}>
              <BenefitsTitle theme={theme}>Benefits:</BenefitsTitle>
              <BenefitsText theme={theme}>{exercise.benefits}</BenefitsText>
              {exercise.culturalNote && (
                <>
                  <BenefitsTitle theme={theme} style={{ marginTop: '0.5rem' }}>
                    Cultural Note:
                  </BenefitsTitle>
                  <BenefitsText theme={theme}>{exercise.culturalNote}</BenefitsText>
                </>
              )}
            </ExerciseBenefits>

            <StartButton
              theme={theme}
              onClick={() => handleStartExercise(exercise)}
            >
              <FiPlay />
              Start Exercise
            </StartButton>
          </ExerciseCard>
        ))}
      </Content>
    </WellnessContainer>
  );
};

export default WellnessPage;
