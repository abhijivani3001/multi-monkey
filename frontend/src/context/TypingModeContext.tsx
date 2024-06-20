import React, { useState, useContext, createContext } from 'react';

interface TypingMode {
  mode: 'time' | 'words' | 'quote';
}

interface TypingModeContextProps {
  typingMode: TypingMode;
  setTypingMode: React.Dispatch<React.SetStateAction<TypingMode>>;
}

export const TypingModeContext = createContext<
  TypingModeContextProps | undefined
>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTypingModeContext = () => {
  const context = useContext(TypingModeContext);

  if (!context) {
    throw new Error(
      'useTypingModeContext must be used within TypingModeProvider'
    );
  }

  return context;
};

export const TypingModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [typingMode, setTypingMode] = useState<TypingMode>({ mode: 'time' });

  return (
    <TypingModeContext.Provider value={{ typingMode, setTypingMode }}>
      {children}
    </TypingModeContext.Provider>
  );
};
