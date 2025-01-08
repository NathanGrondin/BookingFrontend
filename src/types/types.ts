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
