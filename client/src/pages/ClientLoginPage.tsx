// src/pages/ClientLoginPage.tsx
import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import clientAuthService, { supportedClientSites } from '../services/clientAuthService';
import ClientSiteSelector from '../components/ClientSiteSelector';
import ClientLoginInfo from '../components/ClientLoginInfo';

const ClientLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [clientDomain, setClientDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for domain in URL parameters
    const searchParams = new URLSearchParams(location.search);
    const domainParam = searchParams.get('domain');
    
    // Set domain from URL param, or last used domain, or default to first one
    if (domainParam && supportedClientSites.some(site => site.domain === domainParam)) {
      setClientDomain(domainParam);
    } else {
      const lastUsedDomain = clientAuthService.getLastClientDomain();
      if (lastUsedDomain && supportedClientSites.some(site => site.domain === lastUsedDomain)) {
        setClientDomain(lastUsedDomain);
      } else if (supportedClientSites.length > 0) {
        setClientDomain(supportedClientSites[0].domain);
      }
    }
    
    // If we have state with username from a previous redirect, use it
    const state = location.state as { username?: string } | null;
    if (state?.username) {
      setUsername(state.username);
    }
  }, [location]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!username || !password || !clientDomain) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      // Show what's being submitted (for development only)
      console.log(`Attempting login to ${clientDomain} with username: ${username}`);
      
      const { token, redirectUrl, user } = await clientAuthService.loginToClientSite({
        username,
        password,
        clientDomain
      });
      
      // Show success animation before redirecting
      setLoginSuccess(true);
      
      console.log(`Login successful, redirecting to: ${redirectUrl}`);
      
      // Check if we need to redirect to an external site or navigate within this app
      // Determine if redirectUrl is a full URL (starts with http or https)
      const isExternalUrl = redirectUrl.startsWith('http://') || redirectUrl.startsWith('https://');
      
      // Redirect after a short delay
      setTimeout(() => {
        if (isExternalUrl) {
          // For external URLs, use window.location.href
          window.location.href = redirectUrl;
        } else {
          // For internal paths, use React Router navigation
          navigate(redirectUrl);
        }
      }, 1000);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err?.response?.data?.error || err?.response?.data?.message || 'Login failed. Please check your credentials and try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-12 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg">
        {/* Success overlay */}
        {loginSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90 z-20 rounded-2xl animate-fade-in">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Login Successful!</h3>
              <p className="text-gray-300">Redirecting to your dashboard...</p>
            </div>
          </div>
        )}
        
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">Client Dashboard Login</h2>
          <p className="mt-2 text-sm text-gray-300">
            Log in to access your website's dashboard
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          <ClientSiteSelector 
            selectedDomain={clientDomain}
            onSelect={setClientDomain}
          />
          
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="admin"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg focus:outline-none ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-blue-600/20'
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Log in to Dashboard'
            )}
          </button>
        </form>
        
        {/* Demo credentials info component - only show in development */}
        {process.env.NODE_ENV !== 'production' && <ClientLoginInfo />}
      </div>
    </div>
  );
};

export default ClientLoginPage;