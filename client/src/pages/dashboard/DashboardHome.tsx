// client/src/pages/dashboard/DashboardHome.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { dashboardService } from '../../services/dashboardService';
import { DashboardSummary } from '../../types/dashboard';

interface DashboardHomeProps {
  websiteId: number;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ websiteId }) => {
  const { user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const data = await dashboardService.getDashboardSummary();
        setSummary(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [websiteId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-lg">
        <p className="font-medium">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-300">No dashboard data available</p>
      </div>
    );
  }

  const stats = [
    { name: 'Visitors', value: summary.visitors, change: '+12%', color: 'blue' },
    { name: 'Page Views', value: summary.pageViews, change: '+18%', color: 'green' },
    { name: 'Avg. Time', value: summary.avgTime, change: '-2%', color: 'red' },
    { name: 'Bounce Rate', value: summary.bounceRate, change: '-5%', color: 'green' }
  ];

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-500/20 text-green-400';
      case 'development':
        return 'bg-blue-500/20 text-blue-400';
      case 'maintenance':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'offline':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, {user?.first_name || 'Client'}</h1>
            <p className="text-gray-300 mt-1">Here's an overview of your website performance</p>
          </div>
          <div className="flex items-center">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClasses(summary.status)}`}>
              {summary.status.charAt(0).toUpperCase() + summary.status.slice(1)}
            </span>
            <a 
              href={`https://${summary.websiteUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-3 flex items-center text-blue-400 hover:text-blue-300"
            >
              <span>Visit Website</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-gray-800 rounded-lg p-6 shadow-lg transition-transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">{stat.name}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
              <span className={`text-${stat.color}-500 text-sm font-medium`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link 
          to="/dashboard/website" 
          className="bg-gray-800 rounded-lg p-6 shadow-lg transition-all hover:bg-gray-750 hover:shadow-xl"
        >
          <div className="mb-4 text-blue-500 text-3xl">🌐</div>
          <h3 className="text-lg font-semibold text-white mb-2">Manage Website</h3>
          <p className="text-gray-300 text-sm">Update content, images, and settings</p>
        </Link>
        
        <Link 
          to="/dashboard/analytics" 
          className="bg-gray-800 rounded-lg p-6 shadow-lg transition-all hover:bg-gray-750 hover:shadow-xl"
        >
          <div className="mb-4 text-green-500 text-3xl">📊</div>
          <h3 className="text-lg font-semibold text-white mb-2">View Analytics</h3>
          <p className="text-gray-300 text-sm">Track performance and user behavior</p>
        </Link>
        
        <Link 
          to="/contact" 
          className="bg-gray-800 rounded-lg p-6 shadow-lg transition-all hover:bg-gray-750 hover:shadow-xl"
        >
          <div className="mb-4 text-purple-500 text-3xl">📞</div>
          <h3 className="text-lg font-semibold text-white mb-2">Get Support</h3>
          <p className="text-gray-300 text-sm">Contact our team for assistance</p>
        </Link>
      </div>

      {/* Recent activity */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
        {summary.recentActivity && summary.recentActivity.length > 0 ? (
          <div className="space-y-4">
            {summary.recentActivity.map((activity, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-3 border-b border-gray-700 pb-4 last:border-0"
              >
                <div className={`text-2xl ${
                  activity.type === 'update' ? 'text-blue-500' : 
                  activity.type === 'visitor' ? 'text-green-500' : 'text-purple-500'
                }`}>
                  {activity.type === 'update' ? '🔄' : 
                   activity.type === 'visitor' ? '👥' : '🔔'}
                </div>
                <div>
                  <p className="text-white">{activity.description}</p>
                  <p className="text-gray-400 text-sm">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300">No recent activity</p>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;