
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import * as firebaseService from '../services/firebaseService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUserStatus = useCallback(async () => {
    try {
      // Since there's no login, we just get the default mock user
      const currentUser = await firebaseService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Failed to get mock user.", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUserStatus();
  }, [checkUserStatus]);

  const value = { user, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
