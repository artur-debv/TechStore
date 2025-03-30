import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from "../services/FirebaseConfig"; 
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [unsubscribe, setUnsubscribe] = useState(null);

  useEffect(() => {
    const unsubscribeFn = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    setUnsubscribe(() => unsubscribeFn);


    return () => {
      unsubscribeFn();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, unsubscribe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
