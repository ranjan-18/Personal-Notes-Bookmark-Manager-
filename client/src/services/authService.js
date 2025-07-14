import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

export const register = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
};
