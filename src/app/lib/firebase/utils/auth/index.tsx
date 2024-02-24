"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, getRedirectResult, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirebaseApp } from '../../config';

interface AuthContextState {
  currentUser: FirebaseUser | null | undefined;
}

interface ReactNodeProps {
  children: React.ReactNode;
}

const FirebaseAuthContext = createContext<AuthContextState>({
  currentUser: undefined,
});

const FirebaseAuthProvider: React.FC<ReactNodeProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null | undefined>(undefined);
  const firebaseApp = getFirebaseApp();
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (!user) {
        getRedirectResult(auth).then((result) => {
          if (result?.user) {
            setCurrentUser(result.user);
          }
        }).catch((error) => {
          console.error("Error getting redirect result:", error);
        });
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <FirebaseAuthContext.Provider value={{ currentUser }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export { FirebaseAuthContext, FirebaseAuthProvider };

export const useFirebaseAuthContext = () => useContext(FirebaseAuthContext);
