import axios from "axios";

const baseURL = "http://localhost:8085/userActivity";
// const baseURL = "http://localhost:8080/com.myKart.userActivity/userActivity";
// const baseURL = process.env.REACT_APP_REST_USERACTIVITY_ENDPOINT;

export const addToWithList = async (userId, productId) => {
  try {
    const response = await axios.get(
      `${baseURL}/addWishList/${userId}/${productId}`,
      {}
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addToCartList = async (userId, productId) => {
  try {
    const response = await axios.get(
      `${baseURL}/addCartList/${userId}/${productId}`,
      {}
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getWishList = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/getWishList/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCartList = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/getCartList/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromCartList = async (userId, productId) => {
  try {
    const response = await axios.get(
      `${baseURL}/deleteCartList/${userId}/${productId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromWishList = async (userId, productId) => {
  try {
    const response = await axios.get(
      `${baseURL}/deleteWishList/${userId}/${productId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
