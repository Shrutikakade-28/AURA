import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { ChatProvider } from './contexts/ChatContext';
// Components
import Header from './components/Header';
import ChatPage from './pages/ChatPage';
import WellnessPage from './pages/WellnessPage';
import CrisisPage from './pages/CrisisPage';
import OnboardingPage from './pages/OnboardingPage';
import PrivacyPage from './pages/PrivacyPage';

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: background 0.3s ease, color 0.3s ease;
`;

const MainContent = styled.main`
  padding-top: 60px;
  min-height: calc(100vh - 60px);
`;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const pageTransition = {
  duration: 0.35,
  ease: 'easeInOut'
};

function App() {
  const location = useLocation();

  return (
    // ✅ WRAP EVERYTHING
    <ChatProvider>
      <AppContainer>
        <Header />
        <MainContent>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <motion.div {...motionProps}>
                  <OnboardingPage />
                </motion.div>
              } />

              <Route path="/chat" element={
                <motion.div {...motionProps}>
                  <ChatPage />
                </motion.div>
              } />

              <Route path="/wellness" element={
                <motion.div {...motionProps}>
                  <WellnessPage />
                </motion.div>
              } />

              <Route path="/crisis" element={
                <motion.div {...motionProps}>
                  <CrisisPage />
                </motion.div>
              } />

              <Route path="/privacy" element={
                <motion.div {...motionProps}>
                  <PrivacyPage />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </MainContent>
      </AppContainer>
    </ChatProvider>
  );
}

// helper to keep JSX clean
const motionProps = {
  variants: pageVariants,
  initial: "initial",
  animate: "animate",
  exit: "exit",
  transition: pageTransition
};

export default App;
