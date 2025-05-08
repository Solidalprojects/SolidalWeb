// types/dashboard.ts
export interface DashboardSummary {
  websiteUrl: string;
  websiteName: string;
  status: 'online' | 'maintenance' | 'offline';
  visitors: number;
  pageViews: number;
  avgTime: string;
  bounceRate: string;
  recentActivity: {
    id: number;
    description: string;
    date: string;
    type: 'update' | 'visitor' | 'system';
  }[];
}