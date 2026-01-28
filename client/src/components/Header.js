import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon, FiHeart, FiShield } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndex.fixed};
  background: ${props => props.theme.colors.backgroundSecondary};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: 0 ${props => props.theme.spacing.lg};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  font-weight: 700;
  font-size: 1.25rem;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const LogoIcon = styled(FiHeart)`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.backgroundSecondary};
    border-bottom: 1px solid ${props => props.theme.colors.border};
    flex-direction: column;
    padding: ${props => props.theme.spacing.lg};
    gap: ${props => props.theme.spacing.md};
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primaryLight};
  }
  
  &.active {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primaryLight};
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const ThemeToggle = styled.button`
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
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primaryLight};
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: all 0.2s ease;
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &:hover {
    background: ${props => props.theme.colors.backgroundTertiary};
  }
`;

const PrivacyBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.success};
  font-size: 0.875rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Header = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <HeaderContainer
      theme={theme}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Logo to="/" theme={theme}>
        <LogoIcon theme={theme} />
        Aura
      </Logo>

      <Nav theme={theme} isOpen={isMobileMenuOpen}>
        <NavLink
          to="/chat"
          theme={theme}
          className={isActive('/chat') ? 'active' : ''}
          onClick={closeMobileMenu}
        >
          Chat
        </NavLink>
        <NavLink
          to="/wellness"
          theme={theme}
          className={isActive('/wellness') ? 'active' : ''}
          onClick={closeMobileMenu}
        >
          Wellness
        </NavLink>
        <NavLink
          to="/crisis"
          theme={theme}
          className={isActive('/crisis') ? 'active' : ''}
          onClick={closeMobileMenu}
        >
          Crisis Support
        </NavLink>
        <NavLink
          to="/privacy"
          theme={theme}
          className={isActive('/privacy') ? 'active' : ''}
          onClick={closeMobileMenu}
        >
          Privacy
        </NavLink>
      </Nav>

      <Controls theme={theme}>
        <PrivacyBadge theme={theme}>
          <FiShield />
          Anonymous & Secure
        </PrivacyBadge>
        
        <ThemeToggle theme={theme} onClick={toggleTheme}>
          {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
        </ThemeToggle>

        <MobileMenuButton theme={theme} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </MobileMenuButton>
      </Controls>
    </HeaderContainer>
  );
};

export default Header;
