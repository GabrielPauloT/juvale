import axios from "axios";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    // try {
    //   const response = await fetch("/api/get-cookie?key=auth_token");
    //   if (response.ok) {
    //     const data = await response.json();
    //     const token = data.value;
    //     if (token && config.url !== "/auth/login") {
    //       config.headers.Authorization = `Bearer ${token}`;
    //     }
    //   } else {
    //     console.error("Failed to get cookie");
    //   }
    // } catch (error) {
    //   console.error("Error fetching cookie", error);
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
