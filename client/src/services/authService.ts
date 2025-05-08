// client/src/services/authService.ts
import { API_ENDPOINTS, API_URL } from '../config/api';
import { apiService } from './apiService';
import { UserType, AuthResponse } from '../types/auth';
import axios from 'axios';

const authService = {
  async login(email: string, password: string): Promise<UserType> {
    try {
      const response = await axios.post(`${API_URL}${API_ENDPOINTS.AUTH.LOGIN}`, { email, password });
      const authData = response.data;
      localStorage.setItem('token', authData.token);
      return authData.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async signup(name: string, email: string, password: string): Promise<UserType> {
    try {
      // Split name into first_name and last_name if space exists
      let first_name = name;
      let last_name = '';
      
      if (name.includes(' ')) {
        const nameParts = name.split(' ');
        first_name = nameParts[0];
        last_name = nameParts.slice(1).join(' ');
      }
      
      const response = await axios.post(`${API_URL}${API_ENDPOINTS.AUTH.SIGNUP}`, {
        username: email,
        email,
        password,
        password2: password,
        first_name,
        last_name
      });
      
      const authData = response.data;
      localStorage.setItem('token', authData.token);
      return authData.user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await axios.post(
        `${API_URL}${API_ENDPOINTS.AUTH.LOGOUT}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
    }
  },

  async getCurrentUser(): Promise<UserType | null> {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      const response = await axios.get(
        `${API_URL}${API_ENDPOINTS.AUTH.CURRENT_USER}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      localStorage.removeItem('token');
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};

export default authService;