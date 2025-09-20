import axios from "axios";

const baseURL = "http://localhost:8081/user";
const baseURLAddress = "http://localhost:8081/user/address";
// const baseURL = "http://localhost:8080/com.myKart.user/user";
// const baseURL = process.env.REACT_APP_REST_USER_ENDPOINT;

export const loginUser = async (formData) => {
  try {
    // const request = {
    //   requestBody: formData,
    // };
    const response = await axios.post(`${baseURL}/login`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (formData) => {
  try {
    const request = {
      requestBody: formData,
    };
    const response = await axios.post(`${baseURL}/addUser`, request);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (UserId) => {
  try {
    const response = await axios.get(`${baseURL}/getUser/${UserId}`, {});
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
    // console.log("Update Request:", request)
    const response = await axios.post(`${baseURL}/update`, request);
    // console.log("Response", response)
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserAddress = async (UserId) => {
  try {
    const response = await axios.get(
      `${baseURLAddress}/get/${UserId}`,
      {}
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserAddress = async (address) => {
  try {
    const response = await axios.delete(`${baseURLAddress}/delete/${address.addressId}`,)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUserAddress = async (address,userId) => {
  try {
    // const request = {
    //   requestBody: address,
    // };
    const response = await axios.post(`${baseURLAddress}/add/${userId}`, address);
    return response.data;
  } catch (error) {
    throw error;
  }
};
