export interface User {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface SweetFormData {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface SearchParams {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

