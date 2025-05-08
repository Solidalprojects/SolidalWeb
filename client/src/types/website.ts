// client/src/types/website.ts
export interface Website {
  id: number;
  name: string;
  domain: string;
  status: 'development' | 'live' | 'maintenance' | 'offline';
  created_at: string;
  updated_at: string;
  description?: string;
  is_active: boolean;
}

export interface WebsiteSection {
  id: number;
  name: string;
  key: string;
  content: Record<string, string | number | boolean>;
  order: number;
}