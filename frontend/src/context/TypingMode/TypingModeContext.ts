import React, { useContext, createContext } from 'react';

export interface TypingMode {
  mode: 'time' | 'words' | 'quote';
  value: number | string;
}

export interface TypingModeContextProps {
  typingMode: TypingMode;
  setTypingMode: React.Dispatch<React.SetStateAction<TypingMode>>;
}

export const TypingModeContext = createContext<
  TypingModeContextProps | undefined
>(undefined);

export const useTypingModeContext = () => {
  const context = useContext(TypingModeContext);

  if (!context) {
    throw new Error(
      'useTypingModeContext must be used within TypingModeProvider'
    );
  }

  return context;
};
