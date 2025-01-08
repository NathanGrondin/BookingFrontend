import axios from 'axios';
// const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";
const API_URL = "http://localhost:3000"

import {JwtPayload, User} from "../types/types.ts"

export interface SignupAxiosResponse {
    status: number;
}

export const signupUser = async (userSigningUp: User): Promise<SignupAxiosResponse> => {
    return axios.post(`${API_URL}/users/addUser`, userSigningUp);

};

export const signinUser = async (userSigningUp: User): Promise<JwtPayload> => {
    return axios.post(`${API_URL}/users/login`, userSigningUp) as Promise<JwtPayload>;
}