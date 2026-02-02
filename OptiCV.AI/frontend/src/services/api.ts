import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust the base URL as needed
    headers: {
        'Content-Type': 'application/json',
    },
});

// User authentication
export const login = async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
};

export const register = async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
};

// CV management
export const createCV = async (cvData) => {
    const response = await apiClient.post('/cv', cvData);
    return response.data;
};

export const getCVs = async () => {
    const response = await apiClient.get('/cv');
    return response.data;
};

// Subscription management
export const getSubscriptions = async () => {
    const response = await apiClient.get('/subscription');
    return response.data;
};

// Payment processing
export const processPayment = async (paymentData) => {
    const response = await apiClient.post('/payment', paymentData);
    return response.data;
};