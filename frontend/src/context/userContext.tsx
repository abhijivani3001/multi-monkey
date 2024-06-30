import { createContext, useContext } from 'react';

interface AuthContextValue {
  isAuthenticated: boolean;
  user: any;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: any) => void;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext({
  isAuthenticated: false,
  user: undefined,
  setIsAuthenticated: () => {},
  setUser: () => {},
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
