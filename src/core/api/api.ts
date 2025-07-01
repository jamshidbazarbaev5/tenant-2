import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { refreshToken } from './auth'
import { useErrorStore } from '../store/errorStore'

interface ApiErrorResponse {
  detail?: string;
  message?: string;
  error?: string;
}

// Dynamic base URL based on current hostname
const hostname = window.location.hostname; // e.g., "customer1.bondify.uz"
const BASE_URL = `https://${hostname}/api/v1/`;

// Create API instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add _retry property to AxiosRequestConfig
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

// Helper to get tenant from domain
function getTenantFromDomain() {
  // Example: customer2.bondify.uz => customer2
  const host = window.location.hostname;
  const parts = host.split('.');
  // Adjust this logic if you have more/less subdomain levels
  if (parts.length > 2) {
    return parts[0];
  }
  return null;
}

// Request interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('access_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // Add tenant header
      const tenant = getTenantFromDomain();
      if (tenant && config.headers) {
        config.headers['X-Tenant'] = tenant;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError<ApiErrorResponse>) => {
      const originalRequest = error.config;

      // If error is 401 and not a retry
      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newToken = await refreshToken();
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          return api(originalRequest);
        } catch (refreshError) {
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      // Extract error message from response
      let errorMessage = 'Произошла ошибка';
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else {
          errorMessage = error.response.data.detail ||
              error.response.data.message ||
              error.response.data.error ||
              errorMessage;
        }
      }

      // Show error in modal
      useErrorStore.getState().setError(errorMessage);

      return Promise.reject(error);
    }
);

export default api;
