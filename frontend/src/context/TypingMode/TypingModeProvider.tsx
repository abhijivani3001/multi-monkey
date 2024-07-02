import { useState } from 'react';
import { TypingMode, TypingModeContext } from './TypingModeContext';

export const TypingModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [typingMode, setTypingMode] = useState<TypingMode>({
    mode: 'time',
    value: 15,
  });

  return (
    <TypingModeContext.Provider value={{ typingMode, setTypingMode }}>
      {children}
    </TypingModeContext.Provider>
  );
};
