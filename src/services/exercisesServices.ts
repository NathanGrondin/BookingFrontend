import {AxiosResponse, Exercise} from "../types/types.ts";
import axios from "axios";
// const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";
const API_URL = "http://localhost:3000"

export const addExercise = async (exerciseBeingAdded: Exercise): Promise<AxiosResponse> => {
    return axios.post(`${API_URL}/exercises/addExercise`, exerciseBeingAdded);

};

export const getExercises = async ()  => {
    return axios.get(`${API_URL}/exercises/getExercises`)
}
