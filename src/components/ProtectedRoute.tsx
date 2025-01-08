import React from 'react';
import { Navigate } from 'react-router-dom';
import {isTokenValid, hasRole} from "../context/jwtFunctions"
interface ProtectedRouteProps {
    children: React.ReactElement;
    requiredRole: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const token = localStorage.getItem('jwt'); // Adjust if using session storage or cookies
    console.log(token)
    if (!token || !isTokenValid(token)) {
        return <Navigate to="/unauthorized" />;
    }

    if (!hasRole(token, requiredRole)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;