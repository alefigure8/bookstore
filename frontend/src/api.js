import { apiUrl } from "./config"
import axios from 'axios'

export const getProduct = async(id) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/products/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.statusText !== 'OK') { //Si hay error, este mensaje es el que se envía a productScreen
            throw new Error(response.data.message);
        }

        return response.data;


    } catch (error) {
        console.log(error);
        return { error: error.response.data.message || error.message };
    }
}