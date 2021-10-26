import { apiUrl } from "./config"
import axios from 'axios'
import { getUserInfo } from "./localStorage";

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
};

export const signin = async({ email, password }) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/signin`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                email,
                password
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        return { error: error.response.data.message || error.message }
    }
}

export const register = async({ name, email, password }) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/register`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                name,
                email,
                password
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        return { error: error.response.data.message || error.message }
    }
}

export const update = async({ name, email, password }) => {
    try {
        const { _id, token } = getUserInfo()
        const response = await axios({
            url: `${apiUrl}/api/users/${_id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                name,
                email,
                password
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        return { error: error.response.data.message || error.message }
    }
}

export const createOrder = async(order) => {
    try {
        const { token } = getUserInfo()
        const response = await axios({
            url: `${apiUrl}/api/order`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: order,
        });
        if (response.statusText !== 'Created') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        return { error: error.response ? error.response.data.message : error.message }
    }
}

export const getOrder = async(id) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/order/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        return { error: error.message }
    }

}

export const getPaypalClientId = async() => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/paypal/clientid`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data.clientId;
    } catch (error) {
        return { error: error.message };
    }
};

export const payOrder = async(orderId, paymentResult) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/order/${orderId}/pay`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: paymentResult,
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        return { error: error.response ? error.response.data.message : error.message }
    }
};

export const getMyOrders = async() => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/order/mine`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        return { error: error.response ? error.response.data.message : error.message }
    }
};