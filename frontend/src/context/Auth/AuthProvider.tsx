import React, { useState } from 'react';
import { IUser } from '@/interfaces/user';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
