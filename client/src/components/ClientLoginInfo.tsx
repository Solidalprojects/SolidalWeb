// src/components/ClientLoginInfo.tsx
import { supportedClientSites } from '../services/clientAuthService';

const ClientLoginInfo = () => {
  // Test credentials for each client site (for demonstration purposes)
  const testCredentials = {
    'tolatiles.al': {
      username: 'admin',
      password: 'password123'
    },
    'artisancrafts.al': {
      username: 'artisanadmin',
      password: 'crafts123'
    },
    'tiranafinancial.al': {
      username: 'financeadmin',
      password: 'finance123'
    }
    // Make sure all domains in supportedClientSites have an entry here
  };

  return (
    <div className="bg-blue-600/10 border border-blue-500 rounded-lg p-4 mb-6">
      <h3 className="text-blue-400 font-semibold mb-2">Demo Credentials</h3>
      <p className="text-gray-300 text-sm mb-3">
        For demonstration purposes, you can use the following credentials to test the login functionality:
      </p>
      <div className="space-y-3">
        {supportedClientSites.map((site) => {
          // Check if we have credentials for this domain
          const credentials = testCredentials[site.domain as keyof typeof testCredentials];
          
          // Skip domains without credentials
          if (!credentials) {
            return null;
          }
          
          return (
            <div key={site.domain} className="bg-gray-700/50 p-3 rounded-lg">
              <h4 className="text-white font-medium mb-1">{site.name}</h4>
              <p className="text-gray-400 text-sm">Username: <span className="text-white">{credentials.username}</span></p>
              <p className="text-gray-400 text-sm">Password: <span className="text-white">{credentials.password}</span></p>
            </div>
          );
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-blue-500/30 text-sm text-gray-400">
        <p>
          Note: In a production environment, client credentials would be provided to the website owner directly.
        </p>
      </div>
    </div>
  );
};

export default ClientLoginInfo;