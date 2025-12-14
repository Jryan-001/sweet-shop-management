import axios from 'axios';
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  Sweet, 
  SweetFormData,
  SearchParams 
} from '../types';

const API_BASE_URL = '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



// Auth API
export const authAPI = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },
};

// Sweets API
export const sweetsAPI = {
  getAll: async (): Promise<Sweet[]> => {
    const response = await api.get<Sweet[]>('/sweets');
    return response.data;
  },

  search: async (params: SearchParams): Promise<Sweet[]> => {
    const response = await api.get<Sweet[]>('/sweets/search', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Sweet> => {
    const response = await api.get<Sweet>(`/sweets/${id}`);
    return response.data;
  },

  create: async (data: SweetFormData): Promise<Sweet> => {
    const response = await api.post<Sweet>('/sweets', data);
    return response.data;
  },

  update: async (id: string, data: Partial<SweetFormData>): Promise<Sweet> => {
    const response = await api.put<Sweet>(`/sweets/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/sweets/${id}`);
  },

  purchase: async (id: string): Promise<Sweet> => {
    const response = await api.post<Sweet>(`/sweets/${id}/purchase`);
    return response.data;
  },

  restock: async (id: string, quantity: number): Promise<Sweet> => {
    const response = await api.post<Sweet>(`/sweets/${id}/restock`, { quantity });
    return response.data;
  },
};

export default api;

