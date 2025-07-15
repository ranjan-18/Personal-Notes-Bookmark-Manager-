import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  console.error('❌ VITE_API_BASE_URL is missing in .env');
}

const API_URL = `${baseURL}/auth`;


export const login = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
};

export const register = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};
