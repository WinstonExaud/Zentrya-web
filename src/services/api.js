// services/api.js
// 🌐 Base Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://192.168.0.102:8000';
const API_VERSION = '/api/v1';

// ⚠️ Custom Exception
export class ApiException extends Error {
  constructor(message, status = 0, detail) {
    super(message);
    this.name = 'ApiException';
    this.status = status;
    this.detail = detail || message;
  }
}

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  
  getImageUrl: (path) => {
    if (!path) return 'https://via.placeholder.com/300x450/1a1a1a/666666?text=No+Poster';
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${API_CONFIG.BASE_URL}/${cleanPath}`;
  },
};

// Transform function for profiles
function transformProfile(backendProfile) {
  return {
    id: backendProfile.id,
    name: backendProfile.name,
    avatar: backendProfile.avatar,
    isKids: backendProfile.is_kids,
    isActive: backendProfile.is_active,
    pin_enabled: backendProfile.pin_enabled || false,
  };
}

// 🔧 API Service
class ApiService {
  constructor() {
    this.baseURL = `${API_BASE_URL}${API_VERSION}`;
    this.token = null;
    this.loadToken();
  }

  // 🔑 Token Management
  loadToken() {
    try {
      const savedToken = localStorage.getItem('zentrya_token');
      this.token = savedToken;
      
      if (savedToken) {
        console.log('✅ Token loaded from storage');
      }
    } catch (error) {
      console.error('Error loading token:', error);
    }
  }

  async setToken(token) {
    this.token = token;
    
    if (token) {
      localStorage.setItem('zentrya_token', token);
      console.log('✅ Token saved');
    } else {
      await this.clearToken();
    }
  }

  async clearToken() {
    this.token = null;
    localStorage.removeItem('zentrya_token');
    localStorage.removeItem('zentrya_user');
    localStorage.removeItem('zentrya_user_type');
    console.log('🗑️ Token cleared');
  }

  async getToken() {
    if (!this.token) {
      this.loadToken();
    }
    return this.token;
  }

  // 🧾 Headers
  async createJsonHeaders(includeAuth = true) {
    const headers = { 'Content-Type': 'application/json' };
    if (includeAuth) {
      const token = await this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return headers;
  }

  // 🔁 Generic Request
  async request(endpoint, options = {}, includeAuth = true) {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`;

    try {
      const headers = await this.createJsonHeaders(includeAuth);

      const res = await fetch(url, {
        ...options,
        headers: { ...headers, ...options.headers },
      });

      const contentType = res.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await res.json()
        : await res.text();

      if (res.status === 401 || res.status === 403) {
        console.error('🚫 Unauthorized - clearing token');
        await this.clearToken();
        
        const msg = data?.detail || data?.message || 'Session expired';
        throw new ApiException(msg, res.status, data?.detail);
      }

      if (!res.ok) {
        const msg = data?.detail || data?.message || `HTTP ${res.status}`;
        throw new ApiException(msg, res.status, data?.detail);
      }

      return data;
    } catch (error) {
      if (error instanceof ApiException) {
        throw error;
      }
      throw new ApiException(
        error instanceof Error ? error.message : 'Request failed',
        0
      );
    }
  }

  // 🔹 HTTP Methods
  get(endpoint, includeAuth = true) {
    return this.request(endpoint, { method: 'GET' }, includeAuth);
  }

  post(endpoint, body, includeAuth = true) {
    return this.request(
      endpoint,
      { method: 'POST', body: JSON.stringify(body) },
      includeAuth
    );
  }

  put(endpoint, body, includeAuth = true) {
    return this.request(
      endpoint,
      { method: 'PUT', body: JSON.stringify(body) },
      includeAuth
    );
  }

  patch(endpoint, body, includeAuth = true) {
    return this.request(
      endpoint,
      { method: 'PATCH', body: JSON.stringify(body) },
      includeAuth
    );
  }

  delete(endpoint, includeAuth = true) {
    return this.request(
      endpoint,
      { method: 'DELETE' },
      includeAuth
    );
  }

  // ==================== 🔐 AUTHENTICATION ====================

  async login(emailOrPhone, password) {
    try {
      const isEmail = emailOrPhone.includes('@');
      const payload = { password };
      if (isEmail) {
        payload.email = emailOrPhone;
      } else {
        payload.phone = emailOrPhone;
      }

      const response = await this.post('/auth/client/login', payload, false);
      
      if (response.access_token) {
        await this.setToken(response.access_token);
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async signUp(signUpData) {
    try {
      const response = await this.post('/auth/client/signup', signUpData, false);
      
      if (response.access_token) {
        await this.setToken(response.access_token);
      }
      
      return response;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  async checkUserExists(emailOrPhone) {
    try {
      return await this.get(
        `/auth/client/user-exists?email_or_phone=${encodeURIComponent(emailOrPhone)}`,
        false
      );
    } catch (error) {
      console.error('Check user error:', error);
      throw error;
    }
  }

  async sendOtp(emailOrPhone) {
    try {
      return await this.post(
        '/auth/client/send-otp',
        { email_or_phone: emailOrPhone },
        false
      );
    } catch (error) {
      console.error('Send OTP error:', error);
      throw error;
    }
  }

  async verifyOtp(emailOrPhone, otp) {
    try {
      const response = await this.post(
        '/auth/client/verify-otp',
        { email_or_phone: emailOrPhone, otp },
        false
      );
      
      if (response.access_token) {
        await this.setToken(response.access_token);
      }
      
      return response;
    } catch (error) {
      console.error('Verify OTP error:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.post('/auth/client/logout', {}, true);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await this.clearToken();
    }
  }

  // ==================== 👤 USER MANAGEMENT ====================

  async getUserProfile() {
    return await this.get('/users/me');
  }

  async updateUserProfile(data) {
    return await this.patch('/users/me', data);
  }

  async changePassword(currentPassword, newPassword) {
    return await this.post(
      '/users/change-password',
      { current_password: currentPassword, new_password: newPassword }
    );
  }

  async updateEmail(newEmail, password) {
    return await this.post(
      '/users/update-email',
      { new_email: newEmail, password }
    );
  }

  async updatePhone(newPhone, password) {
    return await this.post(
      '/users/update-phone',
      { new_phone: newPhone, password }
    );
  }

  async verifyPhone(otp) {
    return await this.post(
      '/users/verify-phone',
      { otp }
    );
  }

  async getUserSettings() {
    try {
      const response = await this.get('/users/settings/list');
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch settings');
      }
      
      return response.settings;
    } catch (error) {
      console.error('Error fetching user settings:', error);
      throw this.handleError(error);
    }
  }

  async updateUserSettings(settings) {
    try {
      const response = await this.post('/users/settings/update', settings);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to update settings');
      }
      
      return response;
    } catch (error) {
      console.error('Error updating user settings:', error);
      throw this.handleError(error);
    }
  }

  async resetUserSettings() {
    try {
      const response = await this.post('/users/settings/reset');
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to reset settings');
      }
      
      return response;
    } catch (error) {
      console.error('Error resetting user settings:', error);
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      const detail = error.response.data?.detail;
      
      if (typeof detail === 'object' && detail.message) {
        return new Error(detail.message);
      } else if (typeof detail === 'string') {
        return new Error(detail);
      }
      
      return new Error(error.response.data?.message || 'An error occurred');
    } else if (error.request) {
      return new Error('No response from server. Please check your connection.');
    } else {
      return new Error(error.message || 'An unexpected error occurred');
    }
  }

  // ==================== 👥 PROFILES ====================

  async getUserProfiles() {
    try {
      const response = await this.get('/users/profile/list');
      return (response.profiles || []).map(transformProfile);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      return [{
        id: 1,
        name: 'Main Profile',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        isKids: false,
        isActive: true,
        pin_enabled: false,
      }];
    }
  }

  async getActiveProfile() {
    return await this.get('/users/profile/active');
  }

  async setActiveProfile(profileId) {
    await this.post('/users/profile/set-active', { profile_id: profileId });
  }

  async createProfile(profileData) {
    const response = await this.post('/users/profile/create', {
      name: profileData.name,
      avatar: profileData.avatar,
      is_kids: profileData.isKids,
    });
    return transformProfile(response);
  }

  async updateProfile(profileId, profileData) {
    const backendData = {};
    if (profileData.name !== undefined) backendData.name = profileData.name;
    if (profileData.avatar !== undefined) backendData.avatar = profileData.avatar;
    if (profileData.isKids !== undefined) backendData.is_kids = profileData.isKids;
    
    const response = await this.put(`/users/profile/${profileId}`, backendData);
    return transformProfile(response);
  }

  async deleteProfile(profileId) {
    await this.delete(`/users/profile/${profileId}`);
  }

  async updateActiveProfile(data) {
    return await this.patch('/users/profile/active/update', data);
  }

  async setProfilePin(pin) {
    return await this.post('/users/profile/active/set-pin', { pin });
  }

  async removeProfilePin() {
    return await this.delete('/users/profile/active/remove-pin');
  }

  async verifyProfilePin(profileId, pin) {
    return await this.post(`/users/profile/${profileId}/verify-pin`, { pin });
  }

  // ==================== 💳 PAYMENTS ====================

  async getPaymentHistory() {
    try {
      const response = await this.get('/payments/history');
      return response.payments || [];
    } catch (error) {
      console.error('Error fetching payment history:', error);
      return [];
    }
  }

  async cancelSubscription() {
    return await this.post('/subscriptions/cancel', {});
  }

  async resumeSubscription() {
    return await this.post('/subscriptions/resume', {});
  }

  async initiatePayment(paymentData) {
    try {
      const response = await this.post('/auth/client/initiate-payment', {
        phone: paymentData.phone,
        amount: paymentData.amount,
        payment_provider: paymentData.payment_provider,
        subscription_plan: paymentData.subscription_plan,
        email: paymentData.email || null,
        full_name: paymentData.full_name,
        auto_renew: paymentData.auto_renew !== undefined ? paymentData.auto_renew : true
      }, false);
      
      return response;
    } catch (error) {
      console.error('Initiate payment error:', error);
      throw error;
    }
  }

  async checkPaymentStatus(orderId) {
    try {
      const response = await this.get(
        `/auth/client/check-payment-status/${orderId}`,
        false
      );
      
      return response;
    } catch (error) {
      console.error('Check payment status error:', error);
      throw error;
    }
  }

  async completeSignup(signupData) {
    try {
      const response = await this.post('/auth/client/complete-signup', {
        full_name: signupData.full_name,
        phone: signupData.phone,
        email: signupData.email || null,
        password: signupData.password,
        display_name: signupData.display_name,
        avatar_id: signupData.avatar_id,
        subscription_plan: signupData.subscription_plan,
        subscription_amount: signupData.subscription_amount,
        subscription_currency: signupData.subscription_currency || 'TZS',
        payment_provider: signupData.payment_provider,
        payment_reference: signupData.payment_reference,
        order_id: signupData.order_id,
        auto_renew: signupData.auto_renew !== undefined ? signupData.auto_renew : true
      }, false);
      
      if (response.access_token) {
        await this.setToken(response.access_token);
      }
      
      return response;
    } catch (error) {
      console.error('Complete signup error:', error);
      throw error;
    }
  }

  async getPublicAvatars(category = null, skip = 0, limit = 50) {
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      params.append('skip', skip.toString());
      params.append('limit', limit.toString());
      
      const response = await this.get(
        `/avatars/public/list?${params.toString()}`,
        false
      );
      
      return response;
    } catch (error) {
      console.error('Get public avatars error:', error);
      throw error;
    }
  }

  // ==================== 📱 DEVICES ====================

  async getDevices() {
    try {
      const response = await this.get('/users/devices/list');
      return response.devices || [];
    } catch (error) {
      console.error('Error fetching devices:', error);
      return [];
    }
  }

  async registerDevice(deviceData) {
    return await this.post('/users/devices/register', deviceData);
  }

  async removeDevice(deviceId) {
    return await this.delete(`/users/devices/${deviceId}`);
  }

  async signOutAllDevices() {
    return await this.post('/users/devices/signout-all', {});
  }

  async updateDeviceActivity(deviceId) {
    return await this.put(`/users/devices/${deviceId}/update-activity`, {});
  }

  // ==================== 💾 DOWNLOADS ====================

  async getDownloads(status) {
    try {
      const query = status ? `?status=${status}` : '';
      const response = await this.get(`/downloads/list${query}`);
      return response.downloads || [];
    } catch (error) {
      console.error('Error fetching downloads:', error);
      return [];
    }
  }

  async createDownload(downloadData) {
    return await this.post('/downloads/create', downloadData);
  }

  async updateDownload(downloadId, updateData) {
    return await this.put(`/downloads/${downloadId}`, updateData);
  }

  async deleteDownload(downloadId) {
    return await this.delete(`/downloads/${downloadId}`);
  }

  async clearAllDownloads() {
    return await this.delete('/downloads/clear/all');
  }

  async pauseDownload(downloadId) {
    return await this.post(`/downloads/${downloadId}/pause`, {});
  }

  async resumeDownload(downloadId) {
    return await this.post(`/downloads/${downloadId}/resume`, {});
  }

  // ==================== 🎬 MOVIES ====================

  async getMovies(params = {}) {
    const query = new URLSearchParams();
    if (params.skip !== undefined) query.append('skip', params.skip.toString());
    if (params.limit !== undefined) query.append('limit', params.limit.toString());
    if (params.sort) query.append('sort', params.sort);
    if (params.is_active !== undefined) query.append('is_active', params.is_active.toString());

    return await this.get(`/movies/list?${query.toString()}`);
  }

  async getMovieById(id) {
    const response = await this.get(`/movies/${id}`);
    return 'data' in response ? response.data : response;
  }

  async searchMovies(query, limit = 20) {
    const response = await this.getMovies({ limit, is_active: true });
    return response.movies.filter((m) =>
      m.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  // ==================== 📺 SERIES ====================

  async getSeries(params = {}) {
    const query = new URLSearchParams();
    if (params.skip !== undefined) query.append('skip', params.skip.toString());
    if (params.limit !== undefined) query.append('limit', params.limit.toString());
    if (params.sort) query.append('sort', params.sort);
    if (params.is_active !== undefined) query.append('is_active', params.is_active.toString());
    if (params.is_completed !== undefined) query.append('is_completed', params.is_completed.toString());

    return await this.get(`/series/list?${query.toString()}`);
  }

  async getSeriesById(id) {
    const response = await this.get(`/series/${id}`);
    return 'data' in response ? response.data : response;
  }

  async getEpisodes(seriesId, params = {}) {
    const query = new URLSearchParams();
    if (params.season_number) query.append('season_number', params.season_number.toString());
    if (params.status) query.append('status', params.status);
    if (params.skip) query.append('skip', params.skip.toString());
    if (params.limit) query.append('limit', params.limit.toString());

    const response = await this.get(`/series/${seriesId}/episodes?${query.toString()}`);
    return 'episodes' in response ? response.episodes : [];
  }

  // ==================== 👁️ WATCH PROGRESS ====================

  async getContinueWatching() {
    try {
      return await this.get('/watch-progress/continue-watching');
    } catch (error) {
      console.error('Error fetching continue watching:', error);
      return [];
    }
  }

  async getMovieProgress(movieId) {
    try {
      return await this.get(`/watch-progress/movie/${movieId}`);
    } catch (error) {
      console.error('Error fetching movie progress:', error);
      return { current_time: 0, duration: 0, percentage_watched: 0, is_completed: false };
    }
  }

  async updateMovieProgress(movieId, progressData) {
    return await this.post(`/watch-progress/movie/${movieId}`, progressData);
  }

  async deleteMovieProgress(movieId) {
    await this.delete(`/watch-progress/movie/${movieId}`);
  }

  async getEpisodeProgress(episodeId) {
    try {
      return await this.get(`/watch-progress/episode/${episodeId}`);
    } catch (error) {
      console.error('Error fetching episode progress:', error);
      return { current_time: 0, duration: 0, percentage_watched: 0, is_completed: false };
    }
  }

  async updateEpisodeProgress(episodeId, progressData) {
    return await this.post(`/watch-progress/episode/${episodeId}`, progressData);
  }

  async deleteEpisodeProgress(episodeId) {
    await this.delete(`/watch-progress/episode/${episodeId}`);
  }

  async trackMovieView(movieId) {
    return await this.post(`/movies/${movieId}/track-view`, {});
  }

  async trackEpisodeView(episodeId) {
    return await this.post(`/episodes/${episodeId}/track-view`, {});
  }

  // ==================== ❤️ MY LIST ====================

  async getMyList() {
    try {
      return await this.get('/my-list/');
    } catch (error) {
      console.error('Error fetching my list:', error);
      return [];
    }
  }

  async addMovieToMyList(movieId) {
    return await this.post(`/my-list/movie/${movieId}`, {});
  }

  async removeMovieFromMyList(movieId) {
    return await this.delete(`/my-list/movie/${movieId}`);
  }

  async checkMovieInMyList(movieId) {
    try {
      return await this.get(`/my-list/movie/${movieId}/check`);
    } catch (error) {
      console.error('Error checking my list:', error);
      return { in_my_list: false };
    }
  }

  async addSeriesToMyList(seriesId) {
    return await this.post(`/my-list/series/${seriesId}`, {});
  }

  async removeSeriesFromMyList(seriesId) {
    return await this.delete(`/my-list/series/${seriesId}`);
  }

  async checkSeriesInMyList(seriesId) {
    try {
      return await this.get(`/my-list/series/${seriesId}/check`);
    } catch (error) {
      console.error('Error checking my list:', error);
      return { in_my_list: false };
    }
  }

  // ==================== 💳 SUBSCRIPTIONS ====================

  async getSubscription() {
    try {
      const response = await this.get('/subscriptions/active');
      return response.subscription || null;
    } catch (error) {
      console.error('Error fetching subscription:', error);
      return null;
    }
  }

  // ==================== 🔐 SESSIONS ====================

  async getActiveSessions() {
    try {
      const response = await this.get('/sessions/active');
      return response.sessions || [];
    } catch (error) {
      console.error('Error fetching active sessions:', error);
      return [];
    }
  }

  async logoutSession(sessionId) {
    return await this.delete(`/sessions/${sessionId}`);
  }

  async logoutAllSessions() {
    return await this.post('/sessions/logout-all', {});
  }

  // ==================== 📊 MY LIST (Enhanced) ====================

  async addToMyList(contentId, contentType) {
    if (contentType === 'movie') {
      return await this.addMovieToMyList(contentId);
    } else {
      return await this.addSeriesToMyList(contentId);
    }
  }

  async removeFromMyList(contentId, contentType) {
    if (contentType === 'movie') {
      return await this.removeMovieFromMyList(contentId);
    } else {
      return await this.removeSeriesFromMyList(contentId);
    }
  }

  // ==================== 📋 WAITLIST ====================

  async joinWaitlist(contactData) {
    try {
      const response = await this.post('/waitlist/join', {
        email: contactData.email || null,
        phone: contactData.phone || null
      }, false);
      
      return response; // { id, email, phone, status, position, joined_at, message }
    } catch (error) {
      console.error('Join waitlist error:', error);
      throw error;
    }
  }

  // ==================== 🎭 GENRES & CATEGORIES ====================

  async getGenres() {
    const response = await this.get('/genres/list');
    return Array.isArray(response) ? response : response.genres || [];
  }

  async getCategories() {
    const response = await this.get('/categories/list');
    return Array.isArray(response) ? response : response.categories || [];
  }
}

const apiService = new ApiService();
export default apiService;