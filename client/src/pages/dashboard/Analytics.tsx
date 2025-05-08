// pages/dashboard/Analytics.tsx
import { useState, useEffect } from 'react';
import { analyticsService } from '../../services/analyticsService';
import { AnalyticsData, TimeRange } from '../../types/analytics';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      try {
        const data = await analyticsService.getAnalytics(timeRange);
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [timeRange]);
  
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
  
  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-300 text-lg">No analytics data available</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
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
          <div className="mt-2 text-green-500 text-sm">{analyticsData.visitorsDelta}</div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-gray-400 text-sm">Page Views</h3>
          <p className="text-3xl font-bold text-white mt-2">{analyticsData.pageViews}</p>
          <div className="mt-2 text-green-500 text-sm">{analyticsData.pageViewsDelta}</div>
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
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-400">Chart will be displayed here</p>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-6">Traffic Sources</h3>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-400">Chart will be displayed here</p>
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