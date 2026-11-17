import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred while communicating with the server.';
    return Promise.reject(new Error(message));
  }
);

export const apiClient = {
  // Projects
  getProjects: async (params = {}) => {
    try {
      const res = await api.get('/projects', { params: { published: true, ...params } });
      return res.data?.items || res.data || [];
    } catch (err) {
      console.warn('API getProjects failed, falling back:', err.message);
      return null;
    }
  },

  getProjectBySlug: async (slug) => {
    try {
      const res = await api.get(`/projects/${slug}`);
      return res.data;
    } catch (err) {
      console.warn(`API getProjectBySlug(${slug}) failed:`, err.message);
      return null;
    }
  },

  // Services
  getServices: async (params = {}) => {
    try {
      const res = await api.get('/services', { params: { published: true, ...params } });
      return res.data?.items || res.data || [];
    } catch (err) {
      console.warn('API getServices failed, falling back:', err.message);
      return null;
    }
  },

  getServiceBySlug: async (slug) => {
    try {
      const res = await api.get(`/services/${slug}`);
      return res.data;
    } catch (err) {
      console.warn(`API getServiceBySlug(${slug}) failed:`, err.message);
      return null;
    }
  },

  // Team
  getTeam: async (params = {}) => {
    try {
      const res = await api.get('/team', { params: { published: true, ...params } });
      return res.data?.items || res.data || [];
    } catch (err) {
      console.warn('API getTeam failed, falling back:', err.message);
      return null;
    }
  },

  // Blog
  getBlogPosts: async (params = {}) => {
    try {
      const res = await api.get('/blog', { params: { published: true, ...params } });
      return res.data?.items || res.data || [];
    } catch (err) {
      console.warn('API getBlogPosts failed, falling back:', err.message);
      return null;
    }
  },

  getBlogPostBySlug: async (slug) => {
    try {
      const res = await api.get(`/blog/${slug}`);
      return res.data;
    } catch (err) {
      console.warn(`API getBlogPostBySlug(${slug}) failed:`, err.message);
      return null;
    }
  },

  // Site Settings
  getSettings: async () => {
    try {
      const res = await api.get('/settings');
      return res.data;
    } catch (err) {
      console.warn('API getSettings failed, falling back:', err.message);
      return null;
    }
  },

  // Website Pages
  getPage: async (slug) => {
    try {
      const res = await api.get(`/pages/${slug}`);
      return res.data;
    } catch (err) {
      console.warn(`API getPage(${slug}) failed:`, err.message);
      return null;
    }
  },

  // Submit Inquiry (Contact & Quote)
  submitInquiry: async (inquiryData) => {
    const res = await api.post('/inquiries', inquiryData);
    return res.data || res;
  },
};

export default apiClient;

