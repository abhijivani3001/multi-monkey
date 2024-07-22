import { IScore } from '@/interfaces/score';
import { createContext, useContext } from 'react';

export interface IScoresContext {
  scores: IScore[];
  setScores: React.Dispatch<React.SetStateAction<IScore[]>>;
}

export const ScoresContext = createContext<IScoresContext>({
  scores: [],
  setScores: () => {},
});

export const useScoresContext = () => {
  const context = useContext(ScoresContext);

  if (!context) {
    throw new Error('useScoreContext must be used within ScoreProvider');
  }

  return context;
};
