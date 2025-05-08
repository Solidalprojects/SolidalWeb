// client/src/config/api.ts

// Base API URL - adjust this based on your Django backend location
export const API_URL = 'http://localhost:8000/api';

// API endpoints for different services
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login/',
    SIGNUP: '/auth/signup/',
    LOGOUT: '/auth/logout/',
    CURRENT_USER: '/auth/user/',
  },
  USER: {
    SETTINGS: '/auth/user/settings/',
    PROFILE: '/auth/user/profile/',
  },
  DASHBOARD: {
    SUMMARY: '/dashboard/summary/',
  },
  WEBSITE: {
    LIST: '/websites/',
    DETAIL: (id: number) => `/websites/${id}/`,
    SECTIONS: (websiteId: number) => `/websites/${websiteId}/sections/`,
    SECTION: (websiteId: number, sectionId: number) => `/websites/${websiteId}/sections/${sectionId}/`,
  },
  ANALYTICS: {
    DATA: '/analytics/data/',
  },
};