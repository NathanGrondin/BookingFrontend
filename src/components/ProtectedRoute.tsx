import React from 'react';
import { Navigate } from 'react-router-dom';
import {hasRole} from "../context/jwtFunctions"
import {useAuth} from "../context/useAuth.tsx";

interface ProtectedRouteProps {
    children: React.ReactElement;
    requiredRole: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const {auth, authenticated} = useAuth();

    if (!auth || authenticated || !hasRole(auth.token, requiredRole)) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;