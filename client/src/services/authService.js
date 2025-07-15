import axios from 'axios';

// ✅ Load base URL from env
const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  console.error('❌ VITE_API_BASE_URL is missing in .env');
}

const API_URL = `${baseURL}/auth`;

// ✅ Optional: Pre-configured axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Login function
export const login = async (data) => {
  try {
    const res = await api.post('/login', data);
    return res.data;
  } catch (err) {
    console.error('❌ Login error:', err?.response || err);
    throw err;
  }
};

// ✅ Register function
export const register = async (data) => {
  try {
    const res = await api.post('/register', data);
    return res.data;
  } catch (err) {
    console.error('❌ Register error:', err?.response || err);
    throw err;
  }
};
