// src/services/clientAuthService.ts
import axios from 'axios';
import tokenService from './tokenService';
import tolatiles from '../assets/tolatiles.svg'
interface ClientSite {
  name: string;
  domain: string;
  logo?: string;
  adminPath?: string; // Added adminPath property to customize redirect path
  customRedirectUrl?: string; // Add new property for fully custom redirect URLs
}

interface ClientCredentials {
  username: string;
  password: string;
  clientDomain: string;
}

interface ClientAuthResponse {
  token: string;
  redirectUrl: string;
  user?: any; // Adding user data for additional context
}

// List of supported client websites with their domains
export const supportedClientSites: ClientSite[] = [
  {
    name: "TolaTiles",
    domain: "http://tolatiles.com", // For development/testing
    logo: tolatiles,
    customRedirectUrl: "http://tolatiles.com/auth/dashboard" // Custom fully-qualified URL
  },
];

const clientAuthService = {
  async loginToClientSite({ username, password, clientDomain }: ClientCredentials): Promise<ClientAuthResponse> {
    try {
      // Get the domain without the protocol for constructing the API endpoint
      const domain = clientDomain;
      
      // Find the selected client site configuration
      const clientSite = supportedClientSites.find(site => site.domain === domain);
      if (!clientSite) {
        throw new Error(`Client site with domain ${domain} not configured`);
      }
      
      // Determine the proper API endpoint based on the domain
      // This handles both the localhost testing case and production domains
      const loginEndpoint = domain.startsWith('http://') 
        ? `${domain}/api/auth/login/` 
        : `https://${domain}/api/auth/login/`;
        
      console.log(`Attempting to login to: ${loginEndpoint}`);
      
      // Make authentication request to the client's website API
      const response = await axios.post(
        loginEndpoint, 
        { username, password }
      );
      
      // Extract token and user data from response
      const { token, user } = response.data;
      
      // Store token using our token service
      tokenService.setToken(token, domain);
      
      // Determine the redirect URL
      
      // If there's a custom redirect URL defined, use that
      if (clientSite.customRedirectUrl) {
        return { token, redirectUrl: clientSite.customRedirectUrl, user };
      }
      
      // Otherwise use the admin path logic
      const adminPath = clientSite.adminPath || '/admin/';
      
      // Construct the admin redirect URL
      // If we're in same-origin scenario, we can use a relative path
      // Otherwise, use the full domain
      const isSameOrigin = window.location.origin === domain || 
                         (domain.startsWith('http://127.0.0.1') && window.location.origin.includes('localhost'));
      
      let redirectUrl;
      
      if (isSameOrigin) {
        // If we're on the same origin, we can just use the admin path
        redirectUrl = adminPath;
      } else {
        // Otherwise construct the full URL
        redirectUrl = domain.startsWith('http://')
          ? `${domain}${adminPath}`
          : `https://${domain}${adminPath}`;
      }
      
      return { token, redirectUrl, user };
    } catch (error) {
      console.error('Client login error:', error);
      throw error;
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