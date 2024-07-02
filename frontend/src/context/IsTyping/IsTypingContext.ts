import React, { createContext, useContext } from 'react';

export interface IsTyping {
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IsTypingContext = createContext<IsTyping | undefined>(undefined);

export const useIsTypingContext = () => {
  const context = useContext(IsTypingContext);

  if (!context) {
    throw new Error('useIsTypingContext must be used within IsTypingProvider');
  }

  return context;
};
