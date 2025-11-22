import api from "./api";


const baseURL = "/userActivity";

export const getCartList = async (userId) => {
  try {
    const response = await api.get(`${baseURL}/getCartList/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getWishList = async (userId) => {
  try {
    const response = await api.get(`${baseURL}/getWishList/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteFromCartList = async (userId, productId) => {
  try {
    const response = await api.delete(`${baseURL}/cart/delete/${userId}/${productId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteFromWishList = async (userId, productId) => {
  try {
    const response = await api.delete(`${baseURL}/wishlist/delete/${userId}/${productId}`);
    return response;
  } catch (error) {
    throw error;
  }
};


export const addToCartList = async (userId, productId) => {
    try {
        const response = await api.get(`${baseURL}/addCartList/${userId}/${productId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const addToWithList = async (userId, productId) => {
    try {
        const response = await api.get(`${baseURL}/addWishList/${userId}/${productId}`);
        return response;
    } catch (error) {
        throw error;
    }
}