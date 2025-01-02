import { useCallback, useEffect, useReducer } from "react";
import * as SecureStore from 'expo-secure-store';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
    initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
    return useReducer(
        (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
        initialValue
    ) as UseStateHook<T>;
}

export const setStorageItemAsync = async (key: string, value: string | null) => {
    if (value == null) {
        await SecureStore.deleteItemAsync(key);
    } else {
        await SecureStore.setItemAsync(key, value);
    }
}

export function useStorageState(key: string): UseStateHook<string> {
    // PUBLIC
    const [state, setState] = useAsyncState<string>();

    // GET
    useEffect(() => {
        SecureStore.getItemAsync(key).then(value => {
            setState(value);
        });
    }, [key]);

    // SET
    const setValue = useCallback(
        (value: string | null) => {
            setState(value);
            setStorageItemAsync(key, value);
        },
        [key]
    );

    return [state, setState];
}