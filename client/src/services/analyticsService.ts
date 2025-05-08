// client/src/services/analyticsService.ts
import { API_ENDPOINTS } from '../config/api';
import axios from 'axios';
import { API_URL } from '../config/api';
import { AnalyticsData, TimeRange } from '../types/analytics';

export const analyticsService = {
  async getAnalytics(websiteId: number, timeRange: TimeRange = 'month'): Promise<AnalyticsData> {
    try {
      const response = await axios.get(
        `${API_URL}${API_ENDPOINTS.ANALYTICS.DATA}`,
        {
          params: { website_id: websiteId, time_range: timeRange },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Get analytics error:', error);
      throw error;
    }
  },
};