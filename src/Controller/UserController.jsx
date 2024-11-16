import axios from "axios";

const baseURL = 'http://localhost:8081/user';

export const loginUser = async (formData) => {
    try {
        const request = {
            requestBody: formData
        }
        const response = await axios.post(`${baseURL}/login`, request);
        return response;
    } catch (error) {
        throw error;
    }
}

export const addUser = async (formData) => {
    try {
        const request = {
            requestBody: formData
        }
        const response = await axios.post(`${baseURL}/addUser`, request);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getUser = async (UserId) => {
    try {
        const response = await axios.get(`${baseURL}/getUser/${UserId}`, {});
        return response;
    } catch (error) {
        throw error;
    }
}


export const updateProfile = async (UserId, updateType, formData) => {
    try {
        const request = {
            context: {
                userId: UserId,
                updateType: updateType
            },
            requestBody: formData
        }
        // console.log("Update Request:", request)
        const response = await axios.post(`${baseURL}/update`, request)
        // console.log("Response", response)
        return response;
    } catch (error) {
        throw error;
    }
}