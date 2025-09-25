import axios from "axios";
import {
  getUserGoogleToken,
  getUserToken,
  GOOGLE_TOKEN,
} from "../utils/cacheStorage";
import { API_URL } from "@/config/constants";

const gateAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const gateAxiosFileUpload = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  timeout: 10000,
});

gateAxios.interceptors.request.use(async (config: any) => {
  const token = await getUserToken();
  const userId = await getUserGoogleToken();
  if (token) {
    try {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["userId"] = userId;
      return config;
    } catch (err) {
      await localStorage.removeItem("token");
    }
  }
});

gateAxiosFileUpload.interceptors.request.use(async (config: any) => {
  const token = await getUserToken();
  const userId = await getUserGoogleToken();
  if (token) {
    try {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["userId"] = userId;
      return config;
    } catch (err) {
      await localStorage.removeItem("token");
    }
  }
});

export { gateAxios, gateAxiosFileUpload };
