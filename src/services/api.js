const API_URL = 'http://localhost:3000/api';

const getToken = () => localStorage.getItem('token');

export const authAPI = {
  signup: async (data) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  login: async (data) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  getMe: async () => {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  }
};

export const plansAPI = {
  getOperators: async () => {
    const res = await fetch(`${API_URL}/plans`);
    return res.json();
  },

  getPlansByOperator: async (operator) => {
    const res = await fetch(`${API_URL}/plans/${operator}`);
    return res.json();
  }
};

export const rechargeAPI = {
  create: async (data) => {
    const res = await fetch(`${API_URL}/recharge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  getAll: async () => {
    const res = await fetch(`${API_URL}/recharge`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  },

  getStats: async () => {
    const res = await fetch(`${API_URL}/recharge/stats`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  }
};
