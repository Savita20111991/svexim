
import React, { createContext, useContext, ReactNode } from 'react';

interface LanguageContextType {
  // We keep a simplified interface for backward compatibility if any components rely on it
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <LanguageContext.Provider value={{ isTranslating: false }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
