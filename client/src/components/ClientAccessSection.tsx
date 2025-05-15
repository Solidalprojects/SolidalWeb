// src/components/ClientAccessSection.tsx (continued)
import { Link } from 'react-router-dom';
import { supportedClientSites } from '../services/clientAuthService';

const ClientAccessSection = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Client Access</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Quick access to your website's admin panel
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {supportedClientSites.map((site) => (
              <Link 
                key={site.domain}
                to="/client-login"
                className="bg-gray-800 hover:bg-gray-750 rounded-lg p-6 text-center transition-all transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  {site.logo ? (
                    <img src={site.logo} alt={site.name} className="h-14 mb-4" />
                  ) : (
                    <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-white">
                      {site.name.charAt(0)}
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-white mb-2">{site.name}</h3>
                  <p className="text-gray-400 text-sm">{site.domain}</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Link 
              to="/client-login" 
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Log in to your admin panel
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientAccessSection;