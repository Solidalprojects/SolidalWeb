// client/src/services/websiteService.ts
import { API_ENDPOINTS } from '../config/api';
import axios from 'axios';
import { API_URL } from '../config/api';
import { WebsiteSection, Website } from '../types/website';

export const websiteService = {
  async getWebsites(): Promise<Website[]> {
    try {
      const response = await axios.get(
        `${API_URL}${API_ENDPOINTS.WEBSITE.LIST}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return response.data.results || [];
    } catch (error) {
      console.error('Get websites error:', error);
      throw error;
    }
  },

  async getWebsiteSections(websiteId: number): Promise<WebsiteSection[]> {
    try {
      const response = await axios.get(
        `${API_URL}${API_ENDPOINTS.WEBSITE.SECTIONS(websiteId)}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return response.data.results || [];
    } catch (error) {
      console.error('Get website sections error:', error);
      throw error;
    }
  },

  async getWebsiteSection(websiteId: number, sectionId: number): Promise<WebsiteSection> {
    try {
      const response = await axios.get(
        `${API_URL}${API_ENDPOINTS.WEBSITE.SECTION(websiteId, sectionId)}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Get website section error:', error);
      throw error;
    }
  },

  async updateWebsiteSection(websiteId: number, sectionId: number, section: WebsiteSection): Promise<WebsiteSection> {
    try {
      const response = await axios.put(
        `${API_URL}${API_ENDPOINTS.WEBSITE.SECTION(websiteId, sectionId)}`,
        section,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Update website section error:', error);
      throw error;
    }
  },
};