"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<any>(null);

export const useAuth = () => {
    return useContext(AuthContext);
}


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;