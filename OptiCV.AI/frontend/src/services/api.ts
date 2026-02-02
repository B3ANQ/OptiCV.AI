import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface Credentials {
  email: string;
  password: string;
}

interface UserData extends Credentials {
  firstName?: string;
  lastName?: string;
}

interface CVData {
  name: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  skills: string;
}

interface PaymentData {
  amount: number;
  currency: string;
}

// User authentication
export const login = async (credentials: Credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

export const register = async (userData: UserData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

// CV management
export const createCV = async (cvData: CVData) => {
  const response = await apiClient.post('/cv/generate', cvData);
  return response.data;
};

export const getCVs = async () => {
  const response = await apiClient.get('/cv');
  return response.data;
};

// User profile
export const getUserProfile = async () => {
  const response = await apiClient.get('/user/profile');
  return response.data;
};

export const updateUserProfile = async (userData: Partial<UserData>) => {
  const response = await apiClient.put('/user/profile', userData);
  return response.data;
};

// Subscriptions
export const getSubscriptions = async () => {
  const response = await apiClient.get('/subscription/status');
  return response.data;
};

// Payment processing
export const processPayment = async (paymentData: PaymentData) => {
  const response = await apiClient.post('/payment/create-payment-intent', paymentData);
  return response.data;
};

export default apiClient;