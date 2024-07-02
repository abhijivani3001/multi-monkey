import { IUser } from '@/interfaces/user';
import { createContext, useContext } from 'react';

export interface Auth {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const AuthContext = createContext<Auth>({
  isAuth: false,
  setIsAuth: () => {},
  user: null,
  setUser: () => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }

  return context;
};
