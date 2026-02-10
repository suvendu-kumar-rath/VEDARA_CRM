// Production API Service Layer
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.vedaraspace.com/api/';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
  }

  // Get auth token from localStorage
  getToken() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      return userData.token;
    }
    return null;
  }

  // Generic request handler
  async request(endpoint, options = {}) {
    const token = this.getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // Auth APIs
  async login(email, password) {
    // Unified login endpoint for admin, lead, designer
    return this.request('admin/loginforall', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // User Management APIs yes
  async createUser(userData) {
    return this.request('admin/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUsers() {
    return this.request('admin/users', {
      method: 'GET',
    });
  }

  async updateUser(userId, userData) {
    return this.request(`admin/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(userId) {
    return this.request(`admin/users/${userId}`, {
      method: 'DELETE',
    });
  }

  // Employee APIs
  async getEmployees() {
    return this.request('admin/employees', {
      method: 'GET',
    });
  }

  // Lead APIs
  async createLead(leadData) {
    return this.request('admin/leads', {
      method: 'POST',
      body: JSON.stringify(leadData),
    });
  }

  async getLeads(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = `admin/leads${queryParams ? `?${queryParams}` : ''}`;
    return this.request(endpoint, { method: 'GET' });
  }

  async updateLead(leadId, leadData) {
    return this.request(`admin/leads/${leadId}`, {
      method: 'PUT',
      body: JSON.stringify(leadData),
    });
  }

  async deleteLead(leadId) {
    return this.request(`admin/leads/${leadId}`, {
      method: 'DELETE',
    });
  }

  async convertLeadToClient(leadId, clientData) {
    return this.request(`admin/leads/${leadId}/convert`, {
      method: 'POST',
      body: JSON.stringify(clientData),
    });
  }

  // Client APIs
  async getClients(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = `admin/clients${queryParams ? `?${queryParams}` : ''}`;
    return this.request(endpoint, { method: 'GET' });
  }

  async createClient(clientData) {
    return this.request('admin/clients', {
      method: 'POST',
      body: JSON.stringify(clientData),
    });
  }

  async updateClient(clientId, clientData) {
    return this.request(`admin/clients/${clientId}`, {
      method: 'PUT',
      body: JSON.stringify(clientData),
    });
  }

  async deleteClient(clientId) {
    return this.request(`admin/clients/${clientId}`, {
      method: 'DELETE',
    });
  }

  // Quotation APIs
  async getQuotations(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = `admin/quotations${queryParams ? `?${queryParams}` : ''}`;
    return this.request(endpoint, { method: 'GET' });
  }

  async createQuotation(quotationData) {
    return this.request('admin/quotations', {
      method: 'POST',
      body: JSON.stringify(quotationData),
    });
  }

  async updateQuotation(quotationId, quotationData) {
    return this.request(`admin/quotations/${quotationId}`, {
      method: 'PUT',
      body: JSON.stringify(quotationData),
    });
  }

  async deleteQuotation(quotationId) {
    return this.request(`admin/quotations/${quotationId}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
