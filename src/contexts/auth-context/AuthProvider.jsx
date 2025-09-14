import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../../Firebase.init';
const AuthProvider = ({ children }) => {
    const [user , setUser] = useState(null);
    const [observerLoading , setObserverLoading] = useState(true);

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth);
    }

    const updateUserProfile = (info) => {
        return updateProfile(auth.currentUser , info);
    }

    useEffect(() => {
        setObserverLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setObserverLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const userInfo = {
        register,
        logIn,
        logOut,
        user,
        observerLoading,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;