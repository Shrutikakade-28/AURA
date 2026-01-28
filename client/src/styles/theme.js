export const lightTheme = {
  colors: {
    // Primary colors
    primary: '#667eea',
    primaryHover: '#5a67d8',
    primaryLight: '#e6f3ff',
    
    // Secondary colors
    secondary: '#f093fb',
    secondaryHover: '#f5576c',
    
    // Background colors
    background: '#f8fafc',
    backgroundSecondary: '#ffffff',
    backgroundTertiary: '#f1f5f9',
    
    // Text colors
    text: '#1a202c',
    textSecondary: '#718096',
    textTertiary: '#a0aec0',
    textInverse: '#ffffff',
    
    // Status colors
    success: '#48bb78',
    warning: '#ed8936',
    error: '#f56565',
    info: '#4299e1',
    
    // Border colors
    border: '#e2e8f0',
    borderLight: '#f7fafc',
    borderDark: '#cbd5e0',
    
    // Chat specific colors
    chatUser: '#667eea',
    chatBot: '#f1f5f9',
    chatUserText: '#ffffff',
    chatBotText: '#1a202c',
    
    // Wellness colors
    wellnessPrimary: '#48bb78',
    wellnessSecondary: '#68d391',
    wellnessAccent: '#9ae6b4',
    
    // Crisis colors
    crisisPrimary: '#f56565',
    crisisSecondary: '#fc8181',
    crisisAccent: '#fed7d7',
  },
  
  shadows: {
    small: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xlarge: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    xlarge: '16px',
    full: '50%',
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },
  
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
  
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    // Primary colors
    primary: '#818cf8',
    primaryHover: '#6366f1',
    primaryLight: '#1e1b4b',
    
    // Secondary colors
    secondary: '#f472b6',
    secondaryHover: '#ec4899',
    
    // Background colors
    background: '#0f172a',
    backgroundSecondary: '#1e293b',
    backgroundTertiary: '#334155',
    
    // Text colors
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',
    textInverse: '#0f172a',
    
    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Border colors
    border: '#334155',
    borderLight: '#475569',
    borderDark: '#1e293b',
    
    // Chat specific colors
    chatUser: '#818cf8',
    chatBot: '#334155',
    chatUserText: '#ffffff',
    chatBotText: '#f1f5f9',
    
    // Wellness colors
    wellnessPrimary: '#10b981',
    wellnessSecondary: '#34d399',
    wellnessAccent: '#6ee7b7',
    
    // Crisis colors
    crisisPrimary: '#ef4444',
    crisisSecondary: '#f87171',
    crisisAccent: '#fecaca',
  },
  
  shadows: {
    small: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
    xlarge: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
  },
};
const theme = lightTheme;
export default theme;