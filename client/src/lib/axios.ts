import axios, { AxiosHeaders } from "axios";
import { HOST_SERVER } from "../config";
import { useAuthStore } from "../store/auth";

const authApi = axios.create({
  baseURL: HOST_SERVER,
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token != null) {
    config.headers = new AxiosHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  return config;
});

export default authApi;
