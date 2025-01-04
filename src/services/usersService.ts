import axios from 'axios';

// const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";
const API_URL = "http://localhost:3000"

export interface User {
    username: string
    password: string
    email: string

}

export const signupUser = async (userSigningUp: User): Promise<void> => {
    await axios.post(`${API_URL}/users/addUser`, userSigningUp)

};