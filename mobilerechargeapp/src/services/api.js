const API_URL = 'http://localhost:3000/api';

const getToken = () => localStorage.getItem('token');

export const authAPI = {
  signup: async (data) => {
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Signup failed');
      return result;
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  login: async (data) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Login failed');
      return result;
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  getMe: async () => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to get user data');
      return result;
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  }
};

export const plansAPI = {
  getOperators: async () => {
    try {
      const res = await fetch(`${API_URL}/plans`);
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to get operators');
      return result;
    } catch (error) {
      console.error('Operators API error:', error);
      // Return fallback data
      return {
        operators: [
          { id: 'airtel', name: 'Airtel', color: 'from-red-500 to-red-600' },
          { id: 'jio', name: 'Jio', color: 'from-blue-500 to-blue-600' },
          { id: 'vi', name: 'Vi', color: 'from-purple-500 to-purple-600' },
          { id: 'bsnl', name: 'BSNL', color: 'from-yellow-500 to-orange-600' }
        ]
      };
    }
  },

  getPlansByOperator: async (operator) => {
    try {
      const res = await fetch(`${API_URL}/plans/${operator}`);
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to get plans');
      return result;
    } catch (error) {
      console.error('Plans API error:', error);
      throw new Error(error.message || 'Network error');
    }
  }
};

export const rechargeAPI = {
  create: async (data) => {
    try {
      const res = await fetch(`${API_URL}/recharge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Recharge failed');
      return result;
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  },

  getAll: async () => {
    try {
      const res = await fetch(`${API_URL}/recharge`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to get recharges');
      return result;
    } catch (error) {
      console.error('Recharge API error:', error);
      return { recharges: [] };
    }
  },

  getStats: async () => {
    try {
      const res = await fetch(`${API_URL}/recharge/stats`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to get stats');
      return result;
    } catch (error) {
      console.error('Stats API error:', error);
      return { totalSpent: 0, totalRecharges: 0, latestPlan: null };
    }
  }
};
