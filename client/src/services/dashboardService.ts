// client/src/services/dashboardService.ts
import { API_ENDPOINTS } from '../config/api';
import { apiService } from './apiService';
import { DashboardSummary } from '../types/dashboard';
import axios from 'axios';
import { API_URL } from '../config/api';

export const dashboardService = {
  async getDashboardSummary(): Promise<DashboardSummary> {
    try {
      const response = await axios.get(
        `${API_URL}${API_ENDPOINTS.DASHBOARD.SUMMARY}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Get dashboard summary error:', error);
      throw error;
    }
  },
};