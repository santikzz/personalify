import { useCallback, useState } from "react"

export const useRandomPassword = () => {

    const generatePassword = useCallback((length: number): string => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
        const password = Array.from({ length }, () => {
            charset.charAt(Math.floor(Math.random() * charset.length));
        }).join('');
        return password;
    }, []);

    const [password, setPassword] = useState<string>('');

    const createPassword = (length: number): void => {
        const newPassword = generatePassword(length);
        setPassword(newPassword);
    };

    return { password, createPassword };
}