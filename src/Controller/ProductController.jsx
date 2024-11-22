import axios from "axios";

// const baseURL = "http://localhost:8083/product";
const baseURL = "http://localhost:8080/com.myKart.product/product";

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

export const getProductByBrandName = async (brandName) => {
  try {
    const response = await axios.get(
      `${baseURL}/getProductByBrand/${brandName}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
