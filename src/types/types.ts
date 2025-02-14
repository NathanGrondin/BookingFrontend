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

export interface AxiosResponse {
    status: number;
}

export interface Auth {
    token: string;
    username: string;
}

export interface Set {
    id: number | undefined
    userid: number
    exerciseid: number
    reps: number
    weight: number
    date: number
}

export interface UserExerciseSummary {
    estimatedMax: number,
    estimatedMaxDate: number,
    sets: Set[],
}

export interface Exercise {
    id: number | undefined,
    name: string
}
