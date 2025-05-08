// pages/dashboard/DashboardHome.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { dashboardService } from '../../services/dashboardService';
import { DashboardSummary } from '../../types/dashboard';

const DashboardHome = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await dashboardService.getDashboardSummary();
        setSummary(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    { name: 'Visitors', value: summary?.visitors || 0, change: '+12%', color: 'blue' },
    { name: 'Page Views', value: summary?.pageViews || 0, change: '+18%', color: 'green' },
    { name: 'Avg. Time', value: summary?.avgTime || '0:00', change: '-2%', color: 'red' },
    { name: 'Bounce Rate', value: summary?.bounceRate || '0%', change: '-5%', color: 'green' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name}</h1>
        <p className="text-gray-300">Here's an overview of your website performance</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        {summary?.recentActivity && summary.recentActivity.length > 0 ? (
          <div className="space-y-4">
            {summary.recentActivity.map((activity, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-3 border-b border-gray-700 pb-4 last:border-0"
              >
                <span className="text-blue-500 text-xl">•</span>
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