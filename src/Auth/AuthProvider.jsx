import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Initialize state from LocalStorage (User ID) and Cookie (Check if token exists)
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [isLoggedIn, setIsLoggedIn] = useState(userId != null);

    // Helper to set cookie
    const setCookie = (name, value, hours) => {
        let expires = "";
        if (hours) {
            const date = new Date();
            date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    };

    // Helper to remove cookie
    const removeCookie = (name) => {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:01:00 GMT;';
    };

    const login = (newUserId, token) => {
        // 1. Store User ID in LocalStorage (for persistence/UI)
        localStorage.setItem('userId', newUserId);
        setUserId(newUserId);
        
        // 2. Store Token in Cookie (10 hours to match backend validity)
        if(token) {
            setCookie('jwtToken', token, 10);
        }

        setIsLoggedIn(true);
    };

    const logout = () => {
        // 1. Clear LocalStorage
        localStorage.removeItem('userId');
        setUserId(null);

        // 2. Clear Cookie
        removeCookie('jwtToken');

        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ userId, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;