import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/bookmarks`;

export const createBookmark = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const getBookmarks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
