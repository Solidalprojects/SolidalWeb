// Update to src/services/clientAuthService.ts
import axios from 'axios';

interface ClientSite {
  name: string;
  domain: string;
  logo?: string;
}

interface ClientCredentials {
  username: string; // Changed from email to username
  password: string;
  clientDomain: string;
}

interface ClientAuthResponse {
  token: string;
  redirectUrl: string;
}

// List of supported client websites
export const supportedClientSites: ClientSite[] = [
  {
    name: "TolaTiles",
    domain: "http://127.0.0.1:8000/",
    logo: "/client-logos/tolatiles.png" // You'll need to add these logo files to your assets
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
  // Add more client sites as needed
];

const clientAuthService = {
  async loginToClientSite({ username, password, clientDomain }: ClientCredentials): Promise<ClientAuthResponse> {
    try {
      // Make authentication request to the client's website API with username instead of email
      const response = await axios.post(
        `https://${clientDomain}/api/auth/login/`, 
        { username, password } // Changed from email to username
      );
      
      // Extract token and construct redirect URL
      const { token } = response.data;
      const redirectUrl = `https://${clientDomain}/admin`;
      
      return { token, redirectUrl };
    } catch (error) {
      console.error('Client login error:', error);
      throw error;
    }
  }
};

export default clientAuthService;