import { useState } from 'react';
import { ScoresContext } from './ScoresContext';
import { IScore } from '@/interfaces/score';

export const ScoresProvider = ({ children }: { children: React.ReactNode }) => {
  const [scores, setScores] = useState<IScore[]>([]);

  return (
    <ScoresContext.Provider value={{ scores, setScores }}>
      {children}
    </ScoresContext.Provider>
  );
};
