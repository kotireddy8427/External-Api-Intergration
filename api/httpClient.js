// Reusable Axios HTTP client for React apps
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";
const API_KEY = process.env.REACT_APP_API_KEY || "";
const TIMEOUT = 10000; // 10 seconds
const IS_DEV = process.env.NODE_ENV === "development";

// Create Axios instance
const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    Authorization: API_KEY ? `Bearer ${API_KEY}` : undefined,
    "Content-Type": "application/json",
  },
});

// Request interceptor: log method, URL, timestamp (dev only)
httpClient.interceptors.request.use((config) => {
  if (IS_DEV) {
    console.log(
      `[HTTP] ${config.method?.toUpperCase()} ${
        config.url
      } @ ${new Date().toISOString()}`
    );
    config.metadata = { start: Date.now() };
  }
  return config;
});

// Response interceptor: log status and duration (dev only)
httpClient.interceptors.response.use(
  (response) => {
    if (IS_DEV && response.config.metadata) {
      const duration = Date.now() - response.config.metadata.start;
      console.log(`[HTTP] ${response.status} (${duration}ms)`);
    }
    return response;
  },
  async (error) => {
    const config = error.config;
    // Retry on transient network errors (up to 3 times)
    if (config && (!config.__retryCount || config.__retryCount < 3)) {
      const shouldRetry =
        error.code === "ECONNABORTED" ||
        error.message?.includes("Network Error");
      if (shouldRetry) {
        config.__retryCount = (config.__retryCount || 0) + 1;
        if (IS_DEV) {
          console.log(`[HTTP] Retry #${config.__retryCount} for ${config.url}`);
        }
        await new Promise((res) => setTimeout(res, 500 * config.__retryCount));
        return httpClient(config);
      }
    }
    if (IS_DEV && config?.metadata) {
      const duration = Date.now() - config.metadata.start;
      console.log(`[HTTP] ERROR (${duration}ms):`, error.message);
    }
    return Promise.reject(error);
  }
);

export default httpClient;
