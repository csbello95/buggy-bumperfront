import { API_URL } from "../Constants";
import axios from "axios";

export const checkLogin = async (login) => {
    const endpoint = `/users/login`;
    const response = await axios.post(`${API_URL}${endpoint}`,login);
    if (response.data.auth) {
        return(response.data.auth)
    }else{
        alert(response.data.message);
        return response.data.auth;
    }
}

