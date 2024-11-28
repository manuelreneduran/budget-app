import axios from "axios";

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true, // Important for sending cookies cross-origin
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add request interceptor for logging or adding additional headers
api.interceptors.request.use(
  (config) => {
    // You can modify config before request is sent
    // For example, adding an auth token if needed
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors globally
    if (error.response?.status === 401) {
      // Redirect to login or refresh token logic
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
