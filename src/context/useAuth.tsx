import {useCallback, useMemo} from 'react';
import { useLocalStorage } from 'usehooks-ts'
import {Auth} from "../types/types.ts";
import {isTokenValid} from "./jwtFunctions.ts";

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

    const handleLogout = useCallback(()  => {
        removeAuth()
    }, []);

    return {setAuth, authenticated, auth, handleLogout}
};

