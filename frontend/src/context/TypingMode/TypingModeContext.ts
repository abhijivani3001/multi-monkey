import { ITypingMode } from '@/interfaces/score';
import React, { useContext, createContext } from 'react';

export interface ITypingModeContext {
  typingMode: ITypingMode;
  setTypingMode: React.Dispatch<React.SetStateAction<ITypingMode>>;
}

// Create the context
export const TypingModeContext = createContext<ITypingModeContext | undefined>(
  undefined
);

// Hook to use the TypingModeContext
export const useTypingModeContext = () => {
  const context = useContext(TypingModeContext);

  // Ensure that this hook is used within the TypingModeProvider
  if (!context) {
    throw new Error(
      'useTypingModeContext must be used within TypingModeProvider'
    );
  }

  return context;
};
