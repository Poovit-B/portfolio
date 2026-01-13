// API service for external calls

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

/**
 * Generic fetch wrapper with error handling
 */
export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = 10000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Send contact form data
 */
export async function sendContactForm(data: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean }> {
  // Replace with actual API endpoint
  return fetchApi('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

