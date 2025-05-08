// client/src/pages/dashboard/Dashboard.tsx
import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import DashboardHome from './DashboardHome';
import WebsiteManagement from './WebsiteManagement';
import Analytics from './Analytics';
import Settings from './Settings';
import { websiteService } from '../../services/websiteService';
import { Website } from '../../types/website';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [activeWebsite, setActiveWebsite] = useState<Website | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const websitesData = await websiteService.getWebsites();
        setWebsites(websitesData);
        
        // Set first website as active if one exists
        if (websitesData.length > 0) {
          setActiveWebsite(websitesData[0]);
        }
      } catch (error) {
        console.error('Error fetching websites:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWebsites();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleWebsiteChange = (website: Website) => {
    setActiveWebsite(website);
    // Redirect to dashboard home when website changes
    navigate('/dashboard');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'grid-2' },
    { name: 'Website Management', path: '/dashboard/website', icon: 'browser' },
    { name: 'Analytics', path: '/dashboard/analytics', icon: 'chart-line' },
    { name: 'Settings', path: '/dashboard/settings', icon: 'cog' }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (websites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">No Websites Found</h2>
          <p className="text-gray-300 mb-6">
            You don't have any websites assigned to your account yet. Please contact our team to get started.
          </p>
          <Link 
            to="/contact" 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-20 left-4 z-30">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-gray-800 text-white focus:outline-none"
        >
          {sidebarOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`fixed top-16 left-0 z-20 h-screen w-64 bg-gray-800 shadow-lg transition-transform transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {user?.first_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </div>
            <div>
              <h3 className="text-white font-medium">
                {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : user?.email}
              </h3>
              <p className="text-gray-400 text-sm">{user?.is_agency_admin ? 'Admin' : 'Client'}</p>
            </div>
          </div>

          {/* Website selector */}
          {websites.length > 1 && (
            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-2">Your Website</label>
              <select
                value={activeWebsite?.id}
                onChange={(e) => {
                  const selectedId = parseInt(e.target.value);
                  const selected = websites.find(w => w.id === selectedId);
                  if (selected) handleWebsiteChange(selected);
                }}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                {websites.map(website => (
                  <option key={website.id} value={website.id}>
                    {website.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`px-4 py-3 flex items-center space-x-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className={`icon-${item.icon}`}></span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-700">
            <Link
              to="/contact"
              className="px-4 py-3 flex items-center space-x-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="icon-headset"></span>
              <span>Get Support</span>
            </Link>
            <button
              onClick={logout}
              className="mt-4 w-full px-4 py-3 flex items-center space-x-3 rounded-lg text-gray-300 hover:bg-red-700 hover:text-white transition-colors"
            >
              <span className="icon-logout"></span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`transition-all ${
        sidebarOpen ? 'md:ml-64' : 'ml-0 md:ml-64'
      }`}>
        <div className="container mx-auto px-4 py-8">
          {activeWebsite && (
            <Routes>
              <Route path="/" element={<DashboardHome websiteId={activeWebsite.id} />} />
              <Route path="/website" element={<WebsiteManagement websiteId={activeWebsite.id} />} />
              <Route path="/analytics" element={<Analytics websiteId={activeWebsite.id} />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;