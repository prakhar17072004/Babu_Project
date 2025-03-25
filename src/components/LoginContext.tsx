// LoginContext.tsx
"use client"
import React, { createContext, useState, useContext } from 'react';

interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginStatus = () => useContext(LoginContext);

export { LoginContext };