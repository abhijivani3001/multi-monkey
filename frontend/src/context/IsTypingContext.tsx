import React, { createContext, useContext, useState } from 'react';

interface IsTyping {
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
}

export const IsTypingContext = createContext<IsTyping | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useIsTypingContext = () => {
  const context = useContext(IsTypingContext);

  if (!context) {
    throw new Error(
      'useIsTypingContext must be used within IsTypingContextProvider'
    );
  }

  return context;
};

export const IsTypingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);

  return (
    <IsTypingContext.Provider value={{ isTyping, setIsTyping }}>
      {children}
    </IsTypingContext.Provider>
  );
};
