import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // Retrieve the user's login status from local storage
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    const login = () => {
        setIsLoggedIn(true);
        // Save the user's login status to local storage
        localStorage.setItem('isLoggedIn', 'true');
    };

    const logout = () => {
        setIsLoggedIn(false);
        // Remove the user's login status from local storage
        localStorage.removeItem('isLoggedIn');
    };

    // Add useEffect to handle cleanup (optional)
    useEffect(() => {
        // Add any additional initialization logic here
        // This effect will run once when the component mounts
        return () => {
            // Add any cleanup logic here
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
