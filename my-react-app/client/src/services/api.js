// api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Update with your backend API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllContent = async () => {
  const response = await api.get('/content');
  return response.data;
};

export const createContent = async (contentData) => {
  const response = await api.post('/content', contentData);
  return response.data;
};

export const updateContent = async (contentId, contentData) => {
  const response = await api.put(`/content/${contentId}`, contentData);
  return response.data;
};

export const deleteContent = async (contentId) => {
  const response = await api.delete(`/content/${contentId}`);
  return response.data;
};
