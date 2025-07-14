import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes'; // adjust in production

// Token will be passed from AuthContext (in CHUNK 9)
const getConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

export const getNotes = async (token, query = '') =>
  axios.get(`${API_URL}?${query}`, getConfig(token));

export const createNote = async (data, token) =>
  axios.post(API_URL, data, getConfig(token));

export const updateNote = async (id, data, token) =>
  axios.put(`${API_URL}/${id}`, data, getConfig(token));

export const deleteNote = async (id, token) =>
  axios.delete(`${API_URL}/${id}`, getConfig(token));
