import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the base URL for your API
const BASE_URL = process.env.EXPO_PUBLIC_API_URL; // Staging API endpoint

// Function to get token from AsyncStorage
const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem("accessToken");
};

// Create an axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
  async (config) => {
    // Get the token from AsyncStorage
    const token = await getToken();

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // You could implement token refresh logic here
      // For now, we'll just clear the token and let the app handle redirection
      await AsyncStorage.removeItem("accessToken");
    }

    return Promise.reject(error);
  }
);

export default api;
