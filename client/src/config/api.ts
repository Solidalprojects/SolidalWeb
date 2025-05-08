// config/api.ts

// Base API URL - adjust this based on your Django backend location
export const API_URL = 'http://localhost:8000/api';

// API endpoints for different services
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    CURRENT_USER: '/auth/user',
  },
  USER: {
    SETTINGS: '/users/settings',
    PROFILE: '/users/profile',
  },
  DASHBOARD: {
    SUMMARY: '/dashboard/summary',
  },
  WEBSITE: {
    SECTIONS: '/website/sections',
    SECTION: (id: number) => `/website/sections/${id}`,
    PUBLISH: '/website/publish',
  },
  ANALYTICS: {
    DATA: '/analytics/data',
    VISITORS: '/analytics/visitors',
    TRAFFIC_SOURCES: '/analytics/traffic-sources',
    PAGES: '/analytics/pages',
  },
};