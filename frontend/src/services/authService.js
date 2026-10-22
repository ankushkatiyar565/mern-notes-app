import axios from "axios"

const BASE_URL =    import.meta.env.VITE_API_URL || "http://localhost:3000"
const AUTH_URL = `${BASE_URL}/api/auth`;

export const registerUser = async (userdata)=>{
    const response = await axios.post(`${AUTH_URL}/register`,userdata) 
    return response.data
}

export const loginuser = async(credentials)=>{
    const response = await axios.post(`${AUTH_URL}/login`,credentials)
    return response.data
}