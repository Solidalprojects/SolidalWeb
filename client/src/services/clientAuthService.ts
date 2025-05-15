
// src/services/clientAuthService.ts
import axios from 'axios';

interface ClientSite {
  name: string;
  domain: string;
  logo?: string;
}

interface ClientCredentials {
  username: string;
  password: string;
  clientDomain: string;
}

interface ClientAuthResponse {
  token: string;
  redirectUrl: string;
}

// List of supported client websites with their domains
export const supportedClientSites: ClientSite[] = [
  {
    name: "TolaTiles",
    domain: "http://127.0.0.1:8000", // For development/testing
    logo: "/client-logos/tolatiles.png"
  },
  {
    name: "Artisan Crafts Albania",
    domain: "artisancrafts.al",
    logo: "/client-logos/artisancrafts.png"
  },
  {
    name: "Tirana Financial Group",
    domain: "tiranafinancial.al",
    logo: "/client-logos/tiranafinancial.png"
  }
];

const clientAuthService = {
  async loginToClientSite({ username, password, clientDomain }: ClientCredentials): Promise<ClientAuthResponse> {
    try {
      // Get the domain without the protocol for constructing the API endpoint
      const domain = clientDomain;
      
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
      
      // Extract token from response
      const { token } = response.data;
      
      // Construct the admin redirect URL
      const redirectUrl = domain.startsWith('http://')
        ? `${domain}/admin/`
        : `https://${domain}/admin/`;
      
      return { token, redirectUrl };
    } catch (error) {
      console.error('Client login error:', error);
      throw error;
    }
  }
};

export default clientAuthService;