// services/analyticsService.ts
import { API_ENDPOINTS } from '../config/api';
import { apiService } from './apiService';
import { AnalyticsData, TimeRange } from '../types/analytics';

export const analyticsService = {
  async getAnalytics(timeRange: TimeRange = 'month'): Promise<AnalyticsData> {
    return await apiService.get<AnalyticsData>(API_ENDPOINTS.ANALYTICS.DATA, {
      params: { timeRange },
    });
  },
};