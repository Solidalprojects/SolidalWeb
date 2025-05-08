
// services/dashboardService.ts
import { API_ENDPOINTS } from '../config/api';
import { apiService } from './apiService';
import { DashboardSummary } from '../types/dashboard';

export const dashboardService = {
  async getDashboardSummary(): Promise<DashboardSummary> {
    return await apiService.get<DashboardSummary>(API_ENDPOINTS.DASHBOARD.SUMMARY);
  },
};