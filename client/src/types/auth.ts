export interface UserType {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_client: boolean;
  is_agency_admin: boolean;
  phone?: string;
  company?: string;
  profile_image?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: UserType;
  token: string;
}