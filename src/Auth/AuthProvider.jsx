// AuthProvider.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    // const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwt'));
    const [isLoggedIn, setIsLoggedIn] = useState(userId != null);

    const login = (userId) => {
        localStorage.setItem('userId', userId);
        setUserId(userId);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('userId');
        // localStorage.removeItem('jwt');
        setUserId(null);
        setIsLoggedIn(false);
    };

    // const jwt = (token) => {
    //     localStorage.setItem('jwt', token);
    //     setJwtToken(token);
    // }

    return (
        <AuthContext.Provider value={{ userId, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
