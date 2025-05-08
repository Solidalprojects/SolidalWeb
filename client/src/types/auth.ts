// types/auth.ts
export interface UserType {
  id: number;
  name: string;
  email: string;
  role: 'client' | 'admin';
  createdAt: string;
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