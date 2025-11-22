import api from "./api";

const baseURL = "/seller";

export const loginSeller = async (formData) => {
  try {
    const response = await api.post(`${baseURL}/login`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addSeller = async (formData) => {
  try {
    const response = await api.post(`${baseURL}/addSeller`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSeller = async (sellerId) => {
    try {
        const response = await api.get(`${baseURL}/get/${sellerId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};