import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const signup = async (email: string, password: string): Promise<void> => {
    // Basic validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u: any) => u.email === email)) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
    };

    // Store user credentials (in production, this should be hashed and stored on backend)
    users.push({
      id: newUser.id,
      email,
      password: password, // In production: hash this!
    });

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const login = async (email: string, password: string): Promise<void> => {
    // Basic validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Find user
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    // Set logged-in user
    const loggedInUser: User = {
      id: foundUser.id,
      email: foundUser.email,
    };

    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
