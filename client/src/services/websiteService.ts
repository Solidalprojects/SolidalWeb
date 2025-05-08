// services/websiteService.ts
import { API_ENDPOINTS } from '../config/api';
import { apiService } from './apiService';
import { WebsiteSection } from '../types/website';

export const websiteService = {
  async getWebsiteSections(): Promise<WebsiteSection[]> {
    return await apiService.get<WebsiteSection[]>(API_ENDPOINTS.WEBSITE.SECTIONS);
  },

  async getWebsiteSection(id: number): Promise<WebsiteSection> {
    return await apiService.get<WebsiteSection>(API_ENDPOINTS.WEBSITE.SECTION(id));
  },

  async updateWebsiteSection(id: number, section: WebsiteSection): Promise<WebsiteSection> {
    return await apiService.put<WebsiteSection>(API_ENDPOINTS.WEBSITE.SECTION(id), section);
  },
};