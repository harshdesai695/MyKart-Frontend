import axios from "axios";

const baseURL = "http://localhost:8083/product";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${baseURL}/getAll`, {});
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${baseURL}/getProduct/${productId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
