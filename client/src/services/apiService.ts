// src/services/apiService.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_URL } from '../config/api';
import { ApiResponse, ApiError } from '../types/api';
import tokenService from './tokenService';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cross-domain cookie handling
});

// Add a request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get domain from current host or use local domain for testing
    const currentDomain = window.location.origin.includes('localhost') || 
                           window.location.origin.includes('127.0.0.1')
      ? 'http://127.0.0.1:8000' // Local development server
      : window.location.origin;
      
    // Get token based on the current domain
    const token = tokenService.getToken(currentDomain) || tokenService.getToken();
    
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login
      const currentDomain = window.location.origin.includes('localhost') || 
                            window.location.origin.includes('127.0.0.1')
        ? 'http://127.0.0.1:8000' // Local development server
        : window.location.origin;
      
      tokenService.removeToken(currentDomain);
      tokenService.removeToken(); // Also remove main token
      
      // Determine which login page to redirect to
      const isClientSite = tokenService.getLastClientDomain() === currentDomain;
      if (isClientSite) {
        window.location.href = '/client-login';
      } else {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await apiClient.get(url, config);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiError;
      }
      throw { status: 500, message: 'Unknown error occurred' };
    }
  },

  async post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await apiClient.post(url, data, config);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiError;
      }
      throw { status: 500, message: 'Unknown error occurred' };
    }
  },

  async put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await apiClient.put(url, data, config);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiError;
      }
      throw { status: 500, message: 'Unknown error occurred' };
    }
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await apiClient.delete(url, config);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiError;
      }
      throw { status: 500, message: 'Unknown error occurred' };
    }
  },
  
  // Special method for calling APIs on a client domain
  createClientApiInstance(domain: string) {
    const clientApiClient = axios.create({
      baseURL: domain.startsWith('http://') ? domain : `https://${domain}`,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    
    // Set up auth interceptor for this client
    tokenService.setupAuthInterceptor(clientApiClient, domain);
    
    return clientApiClient;
  }
};