// src/services/tokenService.ts
/**
 * Service for managing authentication tokens for main app and client sites
 */

// Store token with optional domain-specific prefix
export const setToken = (token: string, domain?: string): void => {
  if (domain) {
    // Normalize domain for storage key
    const normalizedDomain = domain.replace(/[^a-zA-Z0-9]/g, '_');
    localStorage.setItem(`client_token_${normalizedDomain}`, token);
    localStorage.setItem('last_client_domain', domain);
  } else {
    // Main app token
    localStorage.setItem('token', token);
  }
};

// Get token for specific domain or main app
export const getToken = (domain?: string): string | null => {
  if (domain) {
    const normalizedDomain = domain.replace(/[^a-zA-Z0-9]/g, '_');
    return localStorage.getItem(`client_token_${normalizedDomain}`);
  }
  return localStorage.getItem('token');
};

// Remove token for specific domain or main app
export const removeToken = (domain?: string): void => {
  if (domain) {
    const normalizedDomain = domain.replace(/[^a-zA-Z0-9]/g, '_');
    localStorage.removeItem(`client_token_${normalizedDomain}`);
    if (localStorage.getItem('last_client_domain') === domain) {
      localStorage.removeItem('last_client_domain');
    }
  } else {
    localStorage.removeItem('token');
  }
};

// Get the last used client domain
export const getLastClientDomain = (): string | null => {
  return localStorage.getItem('last_client_domain');
};

// Set up axios interceptor to add token to requests
export const setupAuthInterceptor = (axios: any, domain?: string): void => {
  axios.interceptors.request.use(
    (config: any) => {
      const token = getToken(domain);
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }
      return config;
    },
    (error: any) => Promise.reject(error)
  );
};

export default {
  setToken,
  getToken,
  removeToken,
  getLastClientDomain,
  setupAuthInterceptor
};