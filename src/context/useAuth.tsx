import {useCallback, useMemo} from 'react';
import { useLocalStorage } from 'usehooks-ts'
import {Auth} from "../types/types.ts";
import {isTokenValid} from "./jwtFunctions.ts";

export const useAuth = ()  => {

    const [auth, setAuth, removeAuth] = useLocalStorage<Auth | undefined>('auth', undefined)

    const authenticated : boolean = useMemo(() => {
        if (!auth) {
            return false
        }
        return isTokenValid(auth.token)
    }, [auth]);

    const handleLogout = useCallback(()  => {
        removeAuth()
    }, []);

    return {setAuth, authenticated, auth, handleLogout}
};

