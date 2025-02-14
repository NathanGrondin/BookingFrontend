import axios from 'axios';
// const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";
const API_URL = "http://localhost:3000"

import {AxiosResponse, JwtPayload, User} from "../types/types.ts"

export const signupUser = async (userSigningUp: User): Promise<AxiosResponse> => {
    return axios.post(`${API_URL}/users/addUser`, userSigningUp);

};

export const signinUser = async (userSigningUp: User): Promise<JwtPayload> => {
    return axios.post(`${API_URL}/users/login`, userSigningUp);
}



