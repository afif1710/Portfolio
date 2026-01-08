import React, { createContext, useContext } from 'react';

const AccessibilityContext = createContext(null);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  // Feature removed: keep a stable API so older components don't crash.
  const value = {
    reducedMotion: false,
    toggleReducedMotion: () => {},
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
