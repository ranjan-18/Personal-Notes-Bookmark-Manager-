import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/bookmarks`;

const getConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

export const getBookmarks = async (token, query = '') =>
  axios.get(`${API_URL}?${query}`, getConfig(token));

export const createBookmark = async (data, token) =>
  axios.post(API_URL, data, getConfig(token));

export const updateBookmark = async (id, data, token) =>
  axios.put(`${API_URL}/${id}`, data, getConfig(token));

export const deleteBookmark = async (id, token) =>
  axios.delete(`${API_URL}/${id}`, getConfig(token));
