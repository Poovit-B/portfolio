// API service for backend calls
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// ==================
// Types
// ==================
export interface DashboardStats {
  summary: {
    totalViews: number;
    uniqueVisitors: number;
    totalClicks: number;
    avgViewsPerDay: number;
  };
  viewsByPage: { path: string; count: string }[];
  viewsByDay: { date: string; count: string }[];
  topClicks: { elementId: string; elementText: string; count: string }[];
  browserStats: { browser: string; count: string }[];
  deviceStats: { device: string; count: string }[];
  recentVisitors: {
    id: string;
    path: string;
    browser: string;
    os: string;
    device: string;
    createdAt: string;
  }[];
}

export interface RealTimeStats {
  activeVisitors: number;
  recentPages: { path: string; count: string }[];
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// ==================
// Helper Functions
// ==================
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Request failed");
  }

  return data;
}

// ==================
// Auth API
// ==================
export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetchApi<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem("token", response.token);
    return response;
  },

  async register(
    email: string,
    password: string,
    name: string
  ): Promise<AuthResponse> {
    const response = await fetchApi<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
    return response;
  },

  async getMe() {
    return fetchApi<{ user: AuthResponse["user"] }>("/api/auth/me");
  },

  logout() {
    localStorage.removeItem("token");
  },

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  },
};

// ==================
// Analytics API
// ==================
export const analyticsApi = {
  async getDashboard(days: number = 30): Promise<DashboardStats> {
    return fetchApi<DashboardStats>(`/api/analytics/dashboard?days=${days}`);
  },

  async getRealTime(): Promise<RealTimeStats> {
    return fetchApi<RealTimeStats>("/api/analytics/realtime");
  },

  // Public tracking - no auth required
  async trackPageView(path: string, sessionId?: string) {
    return fetch(`${API_BASE_URL}/api/analytics/track/pageview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, sessionId }),
    }).catch(() => {}); // Ignore errors
  },

  async trackClick(data: {
    elementId: string;
    elementText?: string;
    elementType?: string;
    path: string;
    href?: string;
    sessionId?: string;
  }) {
    return fetch(`${API_BASE_URL}/api/analytics/track/click`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => {}); // Ignore errors
  },
};

// ==================
// Contact API
// ==================
export const contactApi = {
  async send(data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) {
    return fetchApi<{ success: boolean; id: string }>("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getAll(page: number = 1) {
    return fetchApi<{ messages: Message[]; pagination: any }>(
      `/api/contact?page=${page}`
    );
  },

  async getUnreadCount() {
    return fetchApi<{ unreadCount: number }>("/api/contact/unread");
  },

  async markAsRead(id: string) {
    return fetchApi<Message>(`/api/contact/${id}/read`, { method: "PATCH" });
  },
};

// ==================
// Health API
// ==================
export const healthApi = {
  async check() {
    return fetchApi<{ status: string; timestamp: string; uptime: number }>(
      "/api/health"
    );
  },
};
