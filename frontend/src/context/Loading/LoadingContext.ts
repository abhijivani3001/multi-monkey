import { ILoading } from '@/interfaces/loading';
import { createContext, useContext } from 'react';

export const LoadingContext = createContext<ILoading | undefined>(undefined);

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoadingContext must be used within LoadingProvider');
  }

  return context;
};
