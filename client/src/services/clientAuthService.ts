
// src/services/clientAuthService.ts
import axios from 'axios';
import tokenService from './tokenService';

interface ClientSite {
  name: string;
  domain: string;
  logo?: string;
  adminPath?: string; // Added adminPath property to customize redirect path
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
    domain: "http://127.0.0.1:8000", // For development/testing
    logo: "/client-logos/tolatiles.png",
    adminPath: "/dashboard" // Custom React dashboard path
  },
  {
    name: "Artisan Crafts Albania",
    domain: "artisancrafts.al",
    logo: "/client-logos/artisancrafts.png",
    adminPath: "/dashboard" // Custom React dashboard path
  },
  {
    name: "Tirana Financial Group",
    domain: "tiranafinancial.al",
    logo: "/client-logos/tiranafinancial.png",
    adminPath: "/dashboard" // Custom React dashboard path
  }
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
      
      // Get the custom admin path for this client
      const adminPath = clientSite.adminPath || '/admin/';
      
      // Construct the admin redirect URL - use custom React admin if available
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