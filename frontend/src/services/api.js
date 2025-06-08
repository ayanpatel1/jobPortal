import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

export const generateQuestions = (role) =>
  axios.post(`${BASE_URL}/ai/generate`, { role });

export const saveInterview = (data) =>
  axios.post(`${BASE_URL}/interview/save`, data);

export const getUserInterview = (userId) =>
  axios.get(`${BASE_URL}/interview/user/${userId}`);
