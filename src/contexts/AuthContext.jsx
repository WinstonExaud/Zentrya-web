// contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiService, { ApiException } from '../services/api';

// 🎯 Create Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentProfile, setCurrentProfileState] = useState(null);

  // 🔄 Initialize auth state on app load
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        
        // Try to restore session from storage
        const savedToken = localStorage.getItem('zentrya_token');
        const savedUser = localStorage.getItem('zentrya_user');

        console.log('🔍 Checking persisted session...');
        console.log('Token exists:', !!savedToken);
        console.log('User exists:', !!savedUser);

        if (savedToken && savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            
            // Set token in API service first
            apiService.setToken(savedToken);
            
            // Try to verify token is still valid
            try {
              setToken(savedToken);
              setUser(parsedUser);
              setCurrentProfileState(null); // Always reset profile on app start
              
              console.log('✅ Session restored:', parsedUser.email || parsedUser.phone);
              console.log('ℹ️ Profile NOT restored - user must select profile');
            } catch (apiError) {
              console.warn('⚠️ Token might be expired, clearing session...', apiError);
              
              // Token invalid - clear session
              localStorage.removeItem('zentrya_token');
              localStorage.removeItem('zentrya_user');
              localStorage.removeItem('zentrya_user_type');
              localStorage.removeItem('zentrya_current_profile');
              apiService.setToken(null);
              setToken(null);
              setUser(null);
            }
          } catch (e) {
            console.warn('⚠️ Failed to parse saved data:', e);
            // Clear invalid data
            localStorage.removeItem('zentrya_token');
            localStorage.removeItem('zentrya_user');
            localStorage.removeItem('zentrya_user_type');
            localStorage.removeItem('zentrya_current_profile');
          }
        } else {
          console.log('ℹ️ No persisted session found');
        }
      } catch (err) {
        console.error('❌ Error initializing auth:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // 🔐 Login with email OR phone and password
  const login = useCallback(async (emailOrPhone, password) => {
    setError(null);

    try {
      console.log('🔐 Attempting login with:', emailOrPhone);

      // Use the unified login endpoint
      const response = await apiService.login(emailOrPhone, password);

      // Save token and user
      localStorage.setItem('zentrya_token', response.access_token);
      localStorage.setItem('zentrya_user', JSON.stringify(response.user));
      localStorage.setItem('zentrya_user_type', response.user.role || 'client');

      // Set token in API service
      apiService.setToken(response.access_token);

      // Update state
      setToken(response.access_token);
      setUser(response.user);
      
      console.log('✅ Login successful:', response.user.email || response.user.phone);
    } catch (err) {
      let errorMessage = 'Login failed';
      
      if (err instanceof ApiException) {
        // Parse validation errors if present
        if (Array.isArray(err.detail)) {
          errorMessage = err.detail.map((e) => e.msg || 'Validation error').join(', ');
        } else {
          errorMessage = err.detail || 'Login failed';
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      console.error('❌ Login error:', errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // 👤 Sign Up
  const signUp = useCallback(async (signUpData) => {
    setError(null);

    try {
      console.log('📝 Signing up user:', signUpData.email || signUpData.phone);
      
      const response = await apiService.signUp(signUpData);

      // Save token and user
      localStorage.setItem('zentrya_token', response.access_token);
      localStorage.setItem('zentrya_user', JSON.stringify(response.user));
      localStorage.setItem('zentrya_user_type', response.user.role || 'client');

      // Set token in API service
      apiService.setToken(response.access_token);

      // Update state
      setToken(response.access_token);
      setUser(response.user);
      
      console.log('✅ Sign up successful:', response.user.email || response.user.phone);
    } catch (err) {
      let errorMessage = 'Sign up failed';
      
      if (err instanceof ApiException) {
        if (Array.isArray(err.detail)) {
          errorMessage = err.detail.map((e) => e.msg || 'Validation error').join(', ');
        } else {
          errorMessage = err.detail || 'Sign up failed';
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      console.error('❌ Sign up error:', errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // 📱 Send OTP
  const sendOtp = useCallback(async (emailOrPhone) => {
    setError(null);

    try {
      await apiService.sendOtp(emailOrPhone);
      console.log('📱 OTP sent to:', emailOrPhone);
    } catch (err) {
      let errorMessage = 'Failed to send OTP';
      
      if (err instanceof ApiException) {
        if (Array.isArray(err.detail)) {
          errorMessage = err.detail.map((e) => e.msg || 'Validation error').join(', ');
        } else {
          errorMessage = err.detail || 'Failed to send OTP';
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      console.error('❌ Send OTP error:', errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // ✅ Verify OTP and login
  const verifyOtp = useCallback(async (emailOrPhone, otp) => {
    setError(null);

    try {
      const response = await apiService.verifyOtp(emailOrPhone, otp);

      // Save token and user
      localStorage.setItem('zentrya_token', response.access_token);
      localStorage.setItem('zentrya_user', JSON.stringify(response.user));
      localStorage.setItem('zentrya_user_type', response.user.role || 'client');

      // Set token in API service
      apiService.setToken(response.access_token);

      // Update state
      setToken(response.access_token);
      setUser(response.user);
      
      console.log('✅ OTP verified:', response.user.email || response.user.phone);
    } catch (err) {
      let errorMessage = 'OTP verification failed';
      
      if (err instanceof ApiException) {
        if (Array.isArray(err.detail)) {
          errorMessage = err.detail.map((e) => e.msg || 'Validation error').join(', ');
        } else {
          errorMessage = err.detail || 'OTP verification failed';
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      console.error('❌ OTP verification error:', errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // 🚪 Logout
  const logout = useCallback(async () => {
    try {
      // Call logout endpoint if available
      try {
        await apiService.logout();
      } catch (err) {
        console.warn('⚠️ Logout API call failed:', err);
        // Continue with local logout even if API fails
      }
    } finally {
      // Clear local data
      localStorage.removeItem('zentrya_token');
      localStorage.removeItem('zentrya_user');
      localStorage.removeItem('zentrya_user_type');
      localStorage.removeItem('zentrya_current_profile');
      
      apiService.setToken(null);
      
      setToken(null);
      setUser(null);
      setCurrentProfileState(null);
      setError(null);
      
      console.log('🚪 Logged out successfully');
    }
  }, []);

  // 👤 Set Current Profile (session only - not persisted)
  const setCurrentProfile = useCallback((profile) => {
    try {
      // Only store in memory, NOT in localStorage
      setCurrentProfileState(profile);
      
      if (profile) {
        console.log('✅ Profile set (session only):', profile.name);
      } else {
        console.log('✅ Profile cleared');
      }
    } catch (err) {
      console.error('❌ Error setting profile:', err);
      throw err;
    }
  }, []);

  // 👤 Get Current Profile (from memory only)
  const getCurrentProfile = useCallback(() => {
    return currentProfile;
  }, [currentProfile]);

  // 👤 Clear Current Profile
  const clearCurrentProfile = useCallback(() => {
    try {
      // Remove from localStorage if it exists
      localStorage.removeItem('zentrya_current_profile');
      setCurrentProfileState(null);
      console.log('✅ Profile cleared');
    } catch (err) {
      console.error('❌ Error clearing profile:', err);
    }
  }, []);

  // 🔄 Refresh user data from storage
  const refreshUser = useCallback(() => {
    try {
      const savedUser = localStorage.getItem('zentrya_user');
      
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        console.log('✅ User data refreshed');
      }
    } catch (err) {
      console.error('❌ Error refreshing user:', err);
    }
  }, []);

  // 🗑️ Clear error
  const clearError = useCallback(() => setError(null), []);

  // Compute derived state
  const isLoggedIn = !!token && !!user;
  const userType = user?.role || null;

  const value = {
    user,
    token,
    loading,
    error,
    isLoggedIn,
    userType,
    currentProfile,
    login,
    signUp,
    sendOtp,
    verifyOtp,
    logout,
    clearError,
    refreshUser,
    setCurrentProfile,
    getCurrentProfile,
    clearCurrentProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 🎣 Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};