// pages/dashboard/Dashboard.tsx
import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import DashboardHome from './DashboardHome';
import WebsiteManagement from './WebsiteManagement';
import Analytics from './Analytics';
import Settings from './Settings';

const Dashboard = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
              {user?.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-white font-medium">{user?.name}</h3>
              <p className="text-gray-400 text-sm">Client</p>
            </div>
          </div>

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
            >
              <span className="icon-headset"></span>
              <span>Get Support</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`transition-all ${
        sidebarOpen ? 'md:ml-64' : 'ml-0 md:ml-64'
      }`}>
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/website" element={<WebsiteManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;