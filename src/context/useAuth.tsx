import {useCallback, useMemo} from 'react';
import { useLocalStorage } from 'usehooks-ts'
import {Auth, JWTData} from "../types/types.ts";
import {isTokenValid, decodeToken, hasRole} from "./jwtFunctions.ts";

export const useAuth = ()  => {

    const [auth, setAuth, removeAuth] = useLocalStorage<Auth | undefined>('auth', undefined)

    const authenticated : boolean = useMemo(() => {
        try {
            if (!auth) {
                return false
            }
            return isTokenValid(auth.token)
        }
        catch (error) {
            console.error(error)
            return false
        }

    }, [auth]);

    const isAdmin : boolean = useMemo(() => {
        try {
            if (!auth) {
                return false
            }
            return hasRole(auth.token, ['admin'])
        }
        catch (error) {
            console.error(error)
            return false
        }

    }, [auth])

    const handleLogout = useCallback(()  => {
        removeAuth()
    }, []);

    const getTokenInfo = useCallback(() : JWTData => {
        if (!auth || !auth.token) {
            throw new Error('User is not authenticated')
        }
        return decodeToken(auth.token)
    }, [auth])



    return {setAuth, authenticated, auth, isAdmin, handleLogout, getTokenInfo}
};

