import api from "./api";


const baseURL = "/user";
const baseURLAddress = "/user/address";

export const loginUser = async (formData) => {
  try {
    const response = await api.post(`${baseURL}/login`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (formData) => {
  try {
    const response = await api.post(`${baseURL}/addUser`, formData);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const getUser = async (UserId) => {
  try {
    const response = await api.get(`${baseURL}/getUser/${UserId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (UserId, updateType, formData) => {
  try {
    const request = {
      context: {
        userId: UserId,
        updateType: updateType,
      },
      requestBody: formData,
    };
    const response = await api.post(`${baseURL}/update`, request);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserAddress = async (UserId) => {
  try {
    const response = await api.get(`${baseURLAddress}/get/${UserId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserAddress = async (address) => {
  try {
    const response = await api.delete(`${baseURLAddress}/delete/${address.addressId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUserAddress = async (address, userId) => {
  try {
    const response = await api.post(`${baseURLAddress}/add/${userId}`, address);
    return response.data;
  } catch (error) {
    throw error;
  }
};