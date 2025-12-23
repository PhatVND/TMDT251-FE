const API_BASE_URL = "http://localhost:8080/api";

interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export const apiCall = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: Record<string, any>
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const result: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `Request failed: ${response.status}`);
    }

    return result.data as T;
  } catch (error) {
    console.error(`API Error [${method} ${endpoint}]:`, error);
    throw error;
  }
};

export default {
  post: <T>(endpoint: string, data: Record<string, any>) =>
    apiCall<T>('POST', endpoint, data),
  get: <T>(endpoint: string) =>
    apiCall<T>('GET', endpoint),
  put: <T>(endpoint: string, data: Record<string, any>) =>
    apiCall<T>('PUT', endpoint, data),
  delete: <T>(endpoint: string) =>
    apiCall<T>('DELETE', endpoint),
};
