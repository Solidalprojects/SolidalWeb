// types/analytics.ts
export type TimeRange = 'week' | 'month' | 'year';

export interface PageAnalytics {
  path: string;
  views: number;
  avgTime: string;
  bounceRate: string;
}

export interface AnalyticsData {
  totalVisitors: number;
  visitorsDelta: string;
  pageViews: number;
  pageViewsDelta: string;
  avgSessionDuration: string;
  sessionDurationDelta: string;
  bounceRate: string;
  bounceRateDelta: string;
  topPages: PageAnalytics[];
  timeRange: TimeRange;
}