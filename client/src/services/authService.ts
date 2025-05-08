// services/authService.ts
import { API_ENDPOINTS } from '../config/api';
import { apiService } from './apiService';
import { UserType, AuthResponse } from '../types/auth';

const authService = {
  async login(email: string, password: string): Promise<UserType> {
    const credentials = { email, password };
    const response = await apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    localStorage.setItem('token', response.token);
    return response.user;
  },

  async signup(name: string, email: string, password: string): Promise<UserType> {
    const credentials = { name, email, password };
    const response = await apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGNUP, credentials);
    localStorage.setItem('token', response.token);
    return response.user;
  },

  async logout(): Promise<void> {
    try {
      await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      localStorage.removeItem('token');
    }
  },

  async getCurrentUser(): Promise<UserType | null> {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      return await apiService.get<UserType>(API_ENDPOINTS.AUTH.CURRENT_USER);
    } catch (error) {
      localStorage.removeItem('token');
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};

export default authService;