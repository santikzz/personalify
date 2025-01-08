import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { router } from "expo-router";
import { Text } from "react-native";
import { fetchSelf, setAuthToken } from "@/services/api";

interface GlobalContextType {
    user: any;
    isAuthenticated: boolean;
    storeSession: (token: string) => void;
    clearSession: () => void;
    lastClient: any,
    setLastClient: (lastClient: any) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: PropsWithChildren) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [lastClient, setLastClient] = useState<any | null>(null);

    useEffect(() => {
        const checkStoredSession = async () => {
            const token = await SecureStore.getItemAsync('token');
            console.log('STORED TOKEN:', token);
            if (token) {
                storeSession(token);
            }
            setLoading(false);
        }
        checkStoredSession();
    }, [])

    const storeSession = async (token: string) => {
        await SecureStore.setItemAsync('token', token);
        setAuthToken(token);
        try {
            const self = await fetchSelf();
            setUser(self);
            setIsAuthenticated(true);
            router.replace('/(tabs)');
        } catch (error) {
            clearSession();
        }
    }

    const clearSession = () => {
        setIsAuthenticated(false);
        SecureStore.deleteItemAsync('token');
        setAuthToken(null);
        setUser(null);
        router.replace('/login');
    }

    if (loading) return <Text>loading...</Text>;

    return (
        <GlobalContext.Provider value={{
            user,
            isAuthenticated,
            storeSession,
            clearSession,
            lastClient,
            setLastClient,
        }}>
            {children}
        </GlobalContext.Provider>
    );

};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a <GlobalProvider>');
    }
    return context;
}
