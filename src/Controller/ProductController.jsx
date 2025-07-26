import axios from "axios";

const baseURL = "http://localhost:8083/product";
// const baseURL = "http://localhost:8080/com.myKart.product/product";
// const baseURL = process.env.REACT_APP_REST_PRODUCT_ENDPOINT;

export const getProducts = async () => {
  try {
    // console.log("Base:", baseURL);
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
