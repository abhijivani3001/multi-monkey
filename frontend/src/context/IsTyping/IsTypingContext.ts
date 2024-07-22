import React, { createContext, useContext } from 'react';

export interface IIsTypingContext {
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IsTypingContext = createContext<IIsTypingContext | undefined>(
  undefined
);

export const useIsTypingContext = () => {
  const context = useContext(IsTypingContext);

  if (!context) {
    throw new Error('useIsTypingContext must be used within IsTypingProvider');
  }

  return context;
};
