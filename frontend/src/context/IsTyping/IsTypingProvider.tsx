import React, { useState } from 'react';
import { IsTypingContext } from './IsTypingContext';

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
