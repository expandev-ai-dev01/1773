import axios, { type AxiosInstance } from 'axios';

/**
 * @configuration apiConfig
 * @summary Central API configuration with environment-based URL management.
 * @type api-configuration
 * @category core-library
 */
export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_URL,
  version: import.meta.env.VITE_API_VERSION,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),

  get externalUrl(): string {
    return `${this.baseUrl}/api/${this.version}/external`;
  },

  get internalUrl(): string {
    return `${this.baseUrl}/api/${this.version}/internal`;
  },
};

/**
 * @client publicClient
 * @summary Axios client for PUBLIC API endpoints (no authentication).
 * @type http-client
 * @category core-library
 */
export const publicClient: AxiosInstance = axios.create({
  baseURL: apiConfig.externalUrl,
  timeout: apiConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * @client authenticatedClient
 * @summary Axios client for AUTHENTICATED API endpoints (requires token).
 * @type http-client
 * @category core-library
 */
export const authenticatedClient: AxiosInstance = axios.create({
  baseURL: apiConfig.internalUrl,
  timeout: apiConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authentication token
authenticatedClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling (e.g., 401 Unauthorized)
authenticatedClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
