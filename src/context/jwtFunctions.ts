import {jwtDecode} from 'jwt-decode';
import {JWTData} from "../types/types.ts";

export const decodeToken = (token: string | null): JWTData => {
    if (!token) throw new Error('missing token');
    try {
        return jwtDecode<JWTData>(token);
    } catch (error) {
        throw new Error('Unable to decode token');
    }
};

export const isTokenValid = (token: string | null): boolean => {
    const decodedToken = decodeToken(token);
    if (!decodedToken) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTime;
};

export const hasRole = (token: string, requiredRole: string[]): boolean => {
    const decodedToken = decodeToken(token);
    if (!decodedToken) return false;

    return requiredRole.includes(decodedToken.role);
};