// client/src/api/topics.js (Final Refinement)

import axios from "axios";

// Set the base URL for the backend API
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/topics`,
});

// CRUD functions (Now accept a config parameter)
export const fetchTopics = (config) => API.get("/", config); // Pass config here
export const createTopic = (newTopic, config) =>
  API.post("/", newTopic, config);
export const updateTopic = (id, updatedTopic, config) =>
  API.put(`/${id}`, updatedTopic, config);
export const deleteTopic = (id, config) => API.delete(`/${id}`, config);

export default API;
