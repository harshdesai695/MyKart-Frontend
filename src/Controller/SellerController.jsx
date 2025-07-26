import axios from "axios";

const baseURL = "http://localhost:8086/seller";

export const getSellerDetails = async (sellerId) => {
  try {
    const response = await axios.get(`${baseURL}/getSeller/${sellerId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}