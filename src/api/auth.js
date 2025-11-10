// client/src/api/auth.js (NEW FILE)

import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/user`,
});

export const signIn = (formData) => API.post("/signin", formData);
export const signUp = (formData) => API.post("/signup", formData);
