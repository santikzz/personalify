import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '@/context/GlobalContext';

interface ProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useGlobalContext();
    return (isAuthenticated ? children : <Navigate to="/login" replace />);
};