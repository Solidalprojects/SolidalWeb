// src/services/clientAuthService.ts
import axios from 'axios';
import tokenService from './tokenService';
import tolatiles from '../assets/tolatiles.svg'

interface ClientSite {
  name: string;
  domain: string;
  logo?: string;
  adminPath?: string;
  customRedirectUrl?: string;
}

interface ClientCredentials {
  username: string;
  password: string;
  clientDomain: string;
}

interface ClientAuthResponse {
  token: string;
  redirectUrl: string;
  user?: any;
}

// List of supported client websites with their domains
export const supportedClientSites: ClientSite[] = [
  {
    name: "TolaTiles",
    domain: "https://tolatiles.com", 
    logo: tolatiles,
    customRedirectUrl: "https://tolatiles.com/admin/" // Fixed to use /admin/ path
  },
];

const clientAuthService = {
  async loginToClientSite({ username, password, clientDomain }: ClientCredentials): Promise<ClientAuthResponse> {
    try {
      // Find the selected client site configuration
      const clientSite = supportedClientSites.find(site => site.domain === clientDomain);
      if (!clientSite) {
        throw new Error(`Client site with domain ${clientDomain} not configured`);
      }
      
      // Fix: Properly construct the API endpoint
      // Remove any existing protocol from domain if it exists
      const cleanDomain = clientDomain.replace(/^https?:\/\//, '');
      const loginEndpoint = `https://${cleanDomain}/api/auth/login/`;
        
      console.log(`Attempting to login to: ${loginEndpoint}`);
      
      // Make authentication request with proper CORS headers
      const response = await axios.post(
        loginEndpoint, 
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials: false, // Set to false for cross-origin requests
          timeout: 10000 // 10 second timeout
        }
      );
      
      // Extract token and user data from response
      const { token, user } = response.data;
      
      // Store token using our token service
      tokenService.setToken(token, clientDomain);
      
      // Use the custom redirect URL
      const redirectUrl = clientSite.customRedirectUrl || `https://${cleanDomain}/admin/`;
      
      return { token, redirectUrl, user };
    } catch (error: any) {
      console.error('Client login error:', error);
      
      // Provide more specific error messages
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Unable to connect to the website. Please check if the website is accessible.');
      } else if (error.response?.status === 404) {
        throw new Error('Login endpoint not found. The website may not support this login method.');
      } else if (error.response?.status === 401) {
        throw new Error('Invalid username or password.');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied. Admin privileges may be required.');
      } else {
        throw new Error(error.response?.data?.error || error.message || 'Login failed. Please try again.');
      }
    }
  },
  
  // Get the last used client domain
  getLastClientDomain(): string | null {
    return tokenService.getLastClientDomain();
  },
  
  // Get token for client site
  getClientToken(domain: string): string | null {
    return tokenService.getToken(domain);
  },
  
  // Logout from client site
  logoutFromClientSite(domain: string): void {
    tokenService.removeToken(domain);
  }
};

export default clientAuthService;