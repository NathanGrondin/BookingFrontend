export interface User {
    username: string
    password: string
    email: string | undefined

}

export interface LoginResponseData {
    token: string
}
export interface JwtPayload {
    data: LoginResponseData
}

export interface JWTData {
    exp: number;
    iat: number;
    role: string;
    userId: number;
}

export interface AuthProps {
    authenticated: boolean,
    username: string,
}
export interface Auth {
    token: string;
    username: string;
}