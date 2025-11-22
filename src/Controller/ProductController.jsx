import api from "./api"; 


const baseURL = "/product";

export const getProducts = async () => {
  try {
    const response = await api.get(`${baseURL}/all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await api.get(`${baseURL}/${productId}`);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const getProductByBrandName = async (brandName) => {
  try {
    const response = await api.get(
      `${baseURL}/getProductByBrand/${brandName}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};