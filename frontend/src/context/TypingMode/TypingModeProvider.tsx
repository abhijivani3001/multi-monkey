import { useState } from 'react';
import { TypingModeContext } from './TypingModeContext';
import { ITypingMode, ITypingModeTypes } from '@/interfaces/score';
import { typingModes } from '@/constants/typingMode.constant';

export const TypingModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [typingMode, setTypingMode] = useState<ITypingMode>({
    type: typingModes.TIME_MODE as unknown as ITypingModeTypes,
    value: 15,
    enableNumbers: false,       // Default to true for numbers
    enablePunctuation: false,   // Default to true for punctuation
  });

  return (
    <TypingModeContext.Provider value={{ typingMode, setTypingMode }}>
      {children}
    </TypingModeContext.Provider>
  );
};
