import axios from 'axios';
import {AxiosResponse, Set} from "../types/types.ts";
// const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";
const API_URL = "http://localhost:3000"

export const addSet = async (setBeingAdded: Set): Promise<AxiosResponse> => {
    return axios.post(`${API_URL}/sets/addUserSets`, setBeingAdded);

};

export const getUserExerciseSummary = async (userId: number) => {
    return axios.get(`${API_URL}/sets/getUserSets`, {
        params: {userId}
    })
}
export function calculateMax(lift: Set): number {
    return lift.weight * (1 + (lift.reps - 1) / 30);
}

export const getHighscores = async () => {
    return axios.get(`${API_URL}/sets/getHighscores`)
}

