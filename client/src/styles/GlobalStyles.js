import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    background: ${props => props.theme?.colors?.background || '#f8fafc'};
    color: ${props => props.theme?.colors?.text || '#1a202c'};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  #root {
    min-height: 100vh;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }

  h1 {
    font-size: 2.5rem;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 2rem;
    @media (max-width: 768px) {
      font-size: 1.75rem;
    }
  }

  h3 {
    font-size: 1.5rem;
    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.7;
  }

  /* Links */
  a {
    color: ${props => props.theme?.colors?.primary || '#667eea'};
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${props => props.theme?.colors?.primaryHover || '#5a67d8'};
    }
  }

  /* Buttons */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.2s ease;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  /* Form elements */
  input, textarea, select {
    font-family: inherit;
    outline: none;
    transition: all 0.2s ease;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme?.colors?.background || '#f8fafc'};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme?.colors?.border || '#e2e8f0'};
    border-radius: 4px;
    
    &:hover {
      background: ${props => props.theme?.colors?.textSecondary || '#718096'};
    }
  }

  /* Focus styles for accessibility */
  *:focus {
    outline: 2px solid ${props => props.theme?.colors?.primary || '#667eea'};
    outline-offset: 2px;
  }

  /* Animation utilities */
  .fade-in {
    animation: fadeIn 0.3s ease-in;
  }

  .slide-up {
    animation: slideUp 0.3s ease-out;
  }

  .bounce-in {
    animation: bounceIn 0.5s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Mobile-first responsive design */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
    
    body {
      padding: 0;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    * {
      border-color: currentColor;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Print styles */
  @media print {
    body {
      background: white !important;
      color: black !important;
    }
    
    .no-print {
      display: none !important;
    }
  }
`;

export default GlobalStyles;
