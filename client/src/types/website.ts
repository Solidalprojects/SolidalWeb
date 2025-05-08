// types/website.ts
export interface WebsiteSection {
  id: number;
  name: string;
  key: string;
  content: Record<string, string | number | boolean>;
}

// types/api.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}