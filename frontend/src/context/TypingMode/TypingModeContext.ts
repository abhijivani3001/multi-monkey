import { ITypingMode } from '@/interfaces/score';
import React, { useContext, createContext } from 'react';

export interface ITypingModeContext {
  typingMode: ITypingMode;
  setTypingMode: React.Dispatch<React.SetStateAction<ITypingMode>>;
}

export const TypingModeContext = createContext<ITypingModeContext | undefined>(
  undefined
);

export const useTypingModeContext = () => {
  const context = useContext(TypingModeContext);

  if (!context) {
    throw new Error(
      'useTypingModeContext must be used within TypingModeProvider'
    );
  }

  return context;
};
