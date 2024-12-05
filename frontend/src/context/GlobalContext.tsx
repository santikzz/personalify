import React, { createContext, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query"
import { fetchSelf, setAuthToken } from "@/services/api";

interface GlobalContextType {
    user: any;
    setUser: (user: any) => void;
    isAuthenticated: boolean;
    isDesktop: boolean;
    storeSession: (token: string) => void;
    clearSession: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const isDesktop = useMediaQuery("(min-width: 768px)")

    useEffect(() => {
        const checkStoredSession = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                storeSession(token);
            }
        }
        checkStoredSession();
        setLoading(false);
    }, [])

    const storeSession = async (token: string) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setAuthToken(token);
        try {
            const self = await fetchSelf();
            setUser(self);
        } catch (error) {
            console.error(error);
            localStorage.removeItem('token');
            setAuthToken(null);
            setIsAuthenticated(false);
        }
    }

    const clearSession = () => {
        setIsAuthenticated(false);
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem('token');
    }

    if (loading) return <div>loading...</div>;

    return (
        <GlobalContext.Provider value={{
            user,
            setUser,
            isAuthenticated,
            isDesktop,
            storeSession,
            clearSession,
        }}>
            {children}
        </GlobalContext.Provider>
    );

};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
}
