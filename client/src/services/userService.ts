// services/userService.ts
import { API_ENDPOINTS } from '../config/api';
import { apiService } from './apiService';
import { UserSettings } from '../types/user';

export const userService = {
  async getUserSettings(): Promise<UserSettings> {
    return await apiService.get<UserSettings>(API_ENDPOINTS.USER.SETTINGS);
  },

  async updateUserSettings(settings: UserSettings): Promise<UserSettings> {
    return await apiService.put<UserSettings>(API_ENDPOINTS.USER.SETTINGS, settings);
  },
};
