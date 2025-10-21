import { StatusCodes } from '@/constants/httpStatusCode';
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { useAuth } from '@/middleware/auth';
import type { ToastServiceMethods } from 'primevue/toastservice';
const { removeToken } = useAuth();

// Toast service to hold the toast instance
let toastService: ToastServiceMethods | null = null;

export const setToastService = (toast: ToastServiceMethods) => {
  toastService = toast;
};

const createClient = (): AxiosInstance => {


  const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor can be added here
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle Bad Request 400
      if (error.response?.status === StatusCodes.BAD_REQUEST) {
        if (toastService) {
          toastService.add({
            severity: 'error', summary: 'Bad Request', detail: error.response?.data?.message, life: 2500, group: 'br'
          });
        }
      }
      // Handle common errors (e.g., 401 Unauthorized)
      else if (error.response?.status === StatusCodes.UNAUTHORIZED) {
        // Handle unauthorized
        removeToken();
        if (toastService) {
          toastService.add({
            severity: 'error', summary: 'Unauthorized', detail: error.response?.data?.message, life: 2500, group: 'br'
          });
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export const httpClient = createClient();

export type ApiResponse<T> = {
  data: T;
  status: number;
  statusText: string;
};

export const apiRequest = async <T>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  const response = await httpClient.request<T>(config);
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};
