// client/src/pages/dashboard/Analytics.tsx
import { useState, useEffect } from 'react';
import { analyticsService } from '../../services/analyticsService';
import { AnalyticsData, TimeRange } from '../../types/analytics';

interface AnalyticsProps {
  websiteId: number;
}

const Analytics: React.FC<AnalyticsProps> = ({ websiteId }) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await analyticsService.getAnalytics(websiteId, timeRange);
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setError('Failed to load analytics data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [websiteId, timeRange]);
  
  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
  };
  
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
  
  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-300 text-lg">No analytics data available</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-white">Website Analytics</h1>
        
        <div className="flex space-x-2">
          {(['week', 'month', 'year'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => handleTimeRangeChange(range)}
              className={`px-4 py-2 rounded-lg ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm">Total Visitors</h3>
          <p className="text-3xl font-bold text-white mt-2">{analyticsData.totalVisitors}</p>
          <div className={`mt-2 text-${analyticsData.visitorsDelta.startsWith('+') ? 'green' : 'red'}-500 text-sm`}>
            {analyticsData.visitorsDelta}
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm">Page Views</h3>
          <p className="text-3xl font-bold text-white mt-2">{analyticsData.pageViews}</p>
          <div className={`mt-2 text-${analyticsData.pageViewsDelta.startsWith('+') ? 'green' : 'red'}-500 text-sm`}>
            {analyticsData.pageViewsDelta}
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm">Avg. Session Duration</h3>
          <p className="text-3xl font-bold text-white mt-2">{analyticsData.avgSessionDuration}</p>
          <div className={`mt-2 text-${analyticsData.sessionDurationDelta.startsWith('+') ? 'green' : 'red'}-500 text-sm`}>
            {analyticsData.sessionDurationDelta}
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm">Bounce Rate</h3>
          <p className="text-3xl font-bold text-white mt-2">{analyticsData.bounceRate}</p>
          <div className={`mt-2 text-${analyticsData.bounceRateDelta.startsWith('-') ? 'green' : 'red'}-500 text-sm`}>
            {analyticsData.bounceRateDelta}
          </div>
        </div>
      </div>
      
      {/* Charts placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-6">Visitors Over Time</h3>
          <div className="h-64 flex flex-col items-center justify-center">
            <p className="text-gray-400 mb-4">Interactive charts will be implemented soon</p>
            <div className="w-full h-40 bg-gray-700/50 rounded-lg flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-6">Traffic Sources</h3>
          <div className="h-64 flex flex-col items-center justify-center">
            <p className="text-gray-400 mb-4">Interactive charts will be implemented soon</p>
            <div className="w-full h-40 bg-gray-700/50 rounded-lg flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top pages table */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-6">Top Pages</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-gray-400">Page</th>
                <th className="py-3 px-4 text-gray-400">Views</th>
                <th className="py-3 px-4 text-gray-400">Avg. Time</th>
                <th className="py-3 px-4 text-gray-400">Bounce Rate</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.topPages.map((page, index) => (
                <tr key={index} className="border-b border-gray-700 last:border-0">
                  <td className="py-3 px-4 text-white">{page.path}</td>
                  <td className="py-3 px-4 text-white">{page.views}</td>
                  <td className="py-3 px-4 text-white">{page.avgTime}</td>
                  <td className="py-3 px-4 text-white">{page.bounceRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;