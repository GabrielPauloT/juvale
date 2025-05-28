import axios from "axios";
import Cookies from "js-cookie";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = Cookies.get("auth_token");
      if (token?.length) {
        if (token && config.url !== "/auth") {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } else {
        console.error("Failed to get cookie");
      }
    } catch (error) {
      console.error("Error fetching cookie", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
