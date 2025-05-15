// src/services/authService.ts
import { API_ENDPOINTS, API_URL } from '../config/api';
import tokenService from './tokenService';
import { UserType } from '../types/auth';
import axios from 'axios';

const authService = {
  async login(email: string, password: string): Promise<UserType> {
    try {
      const response = await axios.post(`${API_URL}${API_ENDPOINTS.AUTH.LOGIN}`, { email, password });
      const authData = response.data;
      
      // Store token for main app
      tokenService.setToken(authData.token);
      
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
      
      // Store token for main app
      tokenService.setToken(authData.token);
      
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
        { headers: { Authorization: `Bearer ${tokenService.getToken()}` } }
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Remove main app token
      tokenService.removeToken();
      
      // Also remove token for current domain if we're on a client site
      const currentDomain = window.location.origin.includes('localhost') || 
                           window.location.origin.includes('127.0.0.1')
        ? 'http://127.0.0.1:8000' // Local development server
        : window.location.origin;
      
      tokenService.removeToken(currentDomain);
    }
  },

  async getCurrentUser(): Promise<UserType | null> {
    const token = tokenService.getToken();
    if (!token) return null;
    
    try {
      const response = await axios.get(
        `${API_URL}${API_ENDPOINTS.AUTH.CURRENT_USER}`,
        { headers: { Authorization: `Token ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      tokenService.removeToken();
      return null;
    }
  },

  isAuthenticated(): boolean {
    // Check for either main token or client site token
    const mainToken = tokenService.getToken();
    
    // Also check for client site token if we're on a client site
    const currentDomain = window.location.origin.includes('localhost') || 
                         window.location.origin.includes('127.0.0.1')
      ? 'http://127.0.0.1:8000' // Local development server
      : window.location.origin;
    
    const clientToken = tokenService.getToken(currentDomain);
    
    return !!(mainToken || clientToken);
  },
};

export default authService;