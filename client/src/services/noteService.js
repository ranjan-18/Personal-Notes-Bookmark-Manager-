import axios from 'axios';

// ✅ Use Vite environment variable or fallback for local testing
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_URL = `${baseURL}/notes`;

// ✅ Helper to attach Authorization header
const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// ✅ GET all notes (with optional search query)
export const getNotes = async (token, query = '') => {
  try {
    const res = await axios.get(`${API_URL}?${query}`, getConfig(token));
    return res.data;
  } catch (err) {
    console.error('❌ Error fetching notes:', err.response?.data || err.message);
    throw err;
  }
};

// ✅ CREATE a new note
export const createNote = async (data, token) => {
  try {
    const res = await axios.post(API_URL, data, getConfig(token));
    return res.data;
  } catch (err) {
    console.error('❌ Error creating note:', err.response?.data || err.message);
    throw err;
  }
};

// ✅ UPDATE a note by ID
export const updateNote = async (id, data, token) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, data, getConfig(token));
    return res.data;
  } catch (err) {
    console.error('❌ Error updating note:', err.response?.data || err.message);
    throw err;
  }
};

// ✅ DELETE a note by ID
export const deleteNote = async (id, token) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`, getConfig(token));
    return res.data;
  } catch (err) {
    console.error('❌ Error deleting note:', err.response?.data || err.message);
    throw err;
  }
};
