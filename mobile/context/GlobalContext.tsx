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
    onDuty: boolean;
    setOnDuty: (onDuty: boolean) => void;
    dutyClient: string,
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: PropsWithChildren) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [onDuty, setOnDuty] = useState(false);
    const [dutyClient, setDutyClient] = useState('');

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

            setOnDuty(self.on_shift != null);
            setDutyClient(self.on_shift?.client_name);

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

        setOnDuty(false);
        setDutyClient('');
    }

    if (loading) return <Text>loading...</Text>;

    return (
        <GlobalContext.Provider value={{
            user,
            isAuthenticated,
            storeSession,
            clearSession,
            onDuty,
            setOnDuty,
            dutyClient
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
