import {useMemo} from 'react';

export interface AuthProps {
    authenticated: boolean,
    username: string,
}

export const useAuth = () : AuthProps  => {

    const authenticated : boolean = useMemo(() => {
        return Boolean(localStorage.getItem('jwt') || false)
    }, []);

    const username : string = useMemo(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user') || "")
            return user.username
        }
        catch {
            return ""
        }
    }, [])

    return {authenticated, username}
};

