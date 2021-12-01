import { API_URL } from "../Constants";
import axios from "axios";

export const addRental = async (rentalData) => {
    const endpoint = "/rentals/create";
    const response = await axios.post(`${API_URL}${endpoint}`,rentalData);
    if (response) {
        return response;
    }else{
        console.log(response);
    }
}