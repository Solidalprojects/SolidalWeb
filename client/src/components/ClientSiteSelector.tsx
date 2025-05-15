// src/components/ClientSiteSelector.tsx
import { supportedClientSites } from '../services/clientAuthService';

interface ClientSiteSelectorProps {
  selectedDomain: string;
  onSelect: (domain: string) => void;
}

const ClientSiteSelector = ({ selectedDomain, onSelect }: ClientSiteSelectorProps) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-3">
        Select Your Website
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {supportedClientSites.map((site) => (
          <div
            key={site.domain}
            onClick={() => onSelect(site.domain)}
            className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all ${
              selectedDomain === site.domain
                ? 'bg-blue-600/20 border border-blue-500'
                : 'bg-gray-700/50 border border-gray-600 hover:bg-gray-700'
            }`}
          >
            {site.logo ? (
              <img
                src={site.logo}
                alt={site.name}
                className="h-12 mb-2 object-contain"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mb-2 text-xl font-bold">
                {site.name.charAt(0)}
              </div>
            )}
            <span className="text-sm text-white font-medium">{site.name}</span>
            <span className="text-xs text-gray-400">{site.domain}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientSiteSelector;