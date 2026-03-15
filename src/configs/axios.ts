import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

type QueueItem = {
  resolve: (token: string | null) => void;
  reject: (err: Error | null) => void;
};
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_BACKEND,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function processQueue(error: Error | null, token: string | null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401 && !err.config._retry) {
      if (isRefreshing)
        return new Promise((resolve, reject) =>
          failedQueue.push({ resolve, reject }),
        );
      isRefreshing = true;
      try {
        // const { accessToken } = await authApi.refresh();
        // useAuthStore.getState().setAccessToken(accessToken);
        // processQueue(null, accessToken);
        err.config._retry = true;
        return api(err.config);
      } catch {
        processQueue(new Error("Refresh failed"), null);
        useAuthStore.getState().logout();
        window.location.href = "/login";
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  },
);
