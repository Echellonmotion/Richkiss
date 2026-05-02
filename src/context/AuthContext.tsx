import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ 
  isAuthenticated: false, 
  loading: true, 
  login: () => false, 
  logout: () => {} 
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // In a real production app, this should be handled server-side
  // or via Firebase Auth. For this request, we use a fixed password concept.
  const ADMIN_PASSWORD = "RichkissAdmin2026"; 

  useEffect(() => {
    const session = localStorage.getItem('richkiss_admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('richkiss_admin_session', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('richkiss_admin_session');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
