
export interface User {
  telegram_id: number;
  first_name: string;
  last_name?: string;
  username?: string | null;
  photo_url?: string | null;
}

export interface AuthState {
  token: string;
  expiresAt: Date | null;
  user: User | undefined;
}

export interface LoginResponse {
  success: boolean;
  is_new: boolean;
  user: User;
  access_token: string;
  expiresAt: Date | null;
}

export interface LoginCredentials {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}
