import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, User, CreditCard, Shield, Monitor, Users, 
  Eye, EyeOff, ChevronRight, Loader, CheckCircle, XCircle,
  Calendar, DollarSign, Phone, Mail, Clock, Smartphone
} from 'lucide-react';
import apiService from '../services/api';
import '../css/Account.css';

const AccountSettings = () => {
  const navigate = useNavigate();
  
  // State
  const [activeSection, setActiveSection] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // User data
  const [userData, setUserData] = useState({
    email: '',
    phone: '',
    full_name: '',
    display_name: '',
    avatar_url: '',
    member_since: '',
    email_verified: false,
    phone_verified: false
  });
  
  // Subscription data
  const [subscription, setSubscription] = useState({
    status: 'inactive',
    plan: '',
    amount: 0,
    currency: 'TZS',
    start_date: null,
    end_date: null,
    next_billing_date: null,
    payment_provider: '',
    payment_last_four: '',
    auto_renew: true
  });
  
  // Devices
  const [devices, setDevices] = useState([]);
  
  // Password form
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Load data on mount
  useEffect(() => {
    loadAccountData();
  }, []);

  // Load all account data
  const loadAccountData = async () => {
    try {
      setLoading(true);
      
      // Load user profile, subscription, and devices in parallel
      const [profileRes, subscriptionRes, devicesRes] = await Promise.all([
        apiService.getUserProfile(),
        apiService.getSubscription(),
        apiService.getActiveSessions()
      ]);

      // Set user data
      if (profileRes) {
        setUserData({
          email: profileRes.email || '',
          phone: profileRes.phone || '',
          full_name: profileRes.full_name || '',
          display_name: profileRes.display_name || profileRes.full_name || '',
          avatar_url: profileRes.avatar_url || '',
          member_since: profileRes.created_at || '',
          email_verified: profileRes.email_verified || false,
          phone_verified: profileRes.phone_verified || false
        });
      }

      // Set subscription data
      if (subscriptionRes) {
        setSubscription({
          status: subscriptionRes.subscription_status || 'inactive',
          plan: subscriptionRes.subscription_plan || '',
          amount: subscriptionRes.subscription_amount || 0,
          currency: subscriptionRes.subscription_currency || 'TZS',
          start_date: subscriptionRes.subscription_start_date,
          end_date: subscriptionRes.subscription_end_date,
          next_billing_date: subscriptionRes.next_billing_date,
          payment_provider: subscriptionRes.payment_provider || '',
          payment_last_four: subscriptionRes.payment_last_four || '',
          auto_renew: subscriptionRes.auto_renew !== false
        });
      }

      // Set devices
      if (devicesRes && Array.isArray(devicesRes)) {
        setDevices(devicesRes);
      }

    } catch (error) {
      console.error('Error loading account data:', error);
      showMessage('error', 'Failed to load account data');
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!passwordData.current_password) {
      showMessage('error', 'Please enter your current password');
      return;
    }
    
    if (passwordData.new_password.length < 8) {
      showMessage('error', 'New password must be at least 8 characters');
      return;
    }
    
    if (passwordData.new_password !== passwordData.confirm_password) {
      showMessage('error', 'New passwords do not match');
      return;
    }

    try {
      setSaving(true);
      await apiService.changePassword(
        passwordData.current_password,
        passwordData.new_password
      );
      
      showMessage('success', 'Password changed successfully');
      
      // Clear form
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
      
    } catch (error) {
      console.error('Password change error:', error);
      showMessage('error', error.response?.data?.detail || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  // Handle logout device
  const handleLogoutDevice = async (sessionId) => {
    if (!window.confirm('Are you sure you want to sign out of this device?')) {
      return;
    }

    try {
      setSaving(true);
      await apiService.logoutSession(sessionId);
      showMessage('success', 'Device signed out successfully');
      
      // Reload devices
      const devicesRes = await apiService.getActiveSessions();
      if (devicesRes && Array.isArray(devicesRes)) {
        setDevices(devicesRes);
      }
    } catch (error) {
      console.error('Logout device error:', error);
      showMessage('error', 'Failed to sign out device');
    } finally {
      setSaving(false);
    }
  };

  // Handle logout all devices
  const handleLogoutAllDevices = async () => {
    if (!window.confirm('Are you sure you want to sign out of all devices? You will be logged out.')) {
      return;
    }

    try {
      setSaving(true);
      await apiService.logoutAllSessions();
      
      // Logout current user
      localStorage.removeItem('token');
      navigate('/login');
      
    } catch (error) {
      console.error('Logout all devices error:', error);
      showMessage('error', 'Failed to sign out all devices');
      setSaving(false);
    }
  };

  // Handle cancel subscription
  const handleCancelSubscription = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription? You will have access until the end of your billing period.')) {
      return;
    }

    try {
      setSaving(true);
      await apiService.cancelSubscription();
      showMessage('success', 'Subscription canceled. You will have access until the end of your billing period.');
      
      // Reload subscription data
      const subscriptionRes = await apiService.getSubscription();
      if (subscriptionRes) {
        setSubscription({
          status: subscriptionRes.subscription_status || 'inactive',
          plan: subscriptionRes.subscription_plan || '',
          amount: subscriptionRes.subscription_amount || 0,
          currency: subscriptionRes.subscription_currency || 'TZS',
          start_date: subscriptionRes.subscription_start_date,
          end_date: subscriptionRes.subscription_end_date,
          next_billing_date: subscriptionRes.next_billing_date,
          payment_provider: subscriptionRes.payment_provider || '',
          payment_last_four: subscriptionRes.payment_last_four || '',
          auto_renew: subscriptionRes.auto_renew !== false
        });
      }
    } catch (error) {
      console.error('Cancel subscription error:', error);
      showMessage('error', 'Failed to cancel subscription');
    } finally {
      setSaving(false);
    }
  };

  // Show message
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  // Format currency
  const formatCurrency = (amount, currency = 'TZS') => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Get payment method display
  const getPaymentMethodDisplay = () => {
    const provider = subscription.payment_provider?.toLowerCase();
    const lastFour = subscription.payment_last_four;
    
    if (!provider) return 'No payment method';
    
    const methodMap = {
      'mpesa': 'M-Pesa',
      'tigopesa': 'Tigo Pesa',
      'airtel_money': 'Airtel Money',
      'halopesa': 'Halo Pesa',
      'selcom': 'Selcom'
    };
    
    const methodName = methodMap[provider] || provider.toUpperCase();
    
    if (lastFour) {
      return `${methodName} •••• ${lastFour}`;
    }
    
    return methodName;
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    const statusMap = {
      'active': 'status-badge-active',
      'canceled': 'status-badge-canceled',
      'expired': 'status-badge-expired',
      'trial': 'status-badge-trial',
      'inactive': 'status-badge-inactive'
    };
    return statusMap[status?.toLowerCase()] || 'status-badge-inactive';
  };

  // Get status text
  const getStatusText = (status) => {
    const statusMap = {
      'active': 'Active',
      'canceled': 'Canceled',
      'expired': 'Expired',
      'trial': 'Trial',
      'inactive': 'Inactive'
    };
    return statusMap[status?.toLowerCase()] || 'Inactive';
  };

  if (loading) {
    return (
      <div className="account-settings-loading">
        <Loader className="spinner" size={48} />
        <p>Loading account settings...</p>
      </div>
    );
  }

  return (
    <div className="account-settings">
      {/* Header */}
      <header className="account-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back
        </button>
        
        <div className="header-profile">
          {userData.avatar_url ? (
            <img src={userData.avatar_url} alt="Profile" />
          ) : (
            <div className="profile-placeholder">
              {userData.display_name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          )}
        </div>
      </header>

      <div className="account-container">
        {/* Sidebar */}
        <aside className="account-sidebar">
          <div 
            className={activeSection === 'overview' ? 'sidebar-item active' : 'sidebar-item'}
            onClick={() => setActiveSection('overview')}
          >
            <User size={20} />
            <span>Overview</span>
          </div>
          
          <div 
            className={activeSection === 'membership' ? 'sidebar-item active' : 'sidebar-item'}
            onClick={() => setActiveSection('membership')}
          >
            <CreditCard size={20} />
            <span>Membership</span>
          </div>
          
          <div 
            className={activeSection === 'security' ? 'sidebar-item active' : 'sidebar-item'}
            onClick={() => setActiveSection('security')}
          >
            <Shield size={20} />
            <span>Security</span>
          </div>
          
          <div 
            className={activeSection === 'devices' ? 'sidebar-item active' : 'sidebar-item'}
            onClick={() => setActiveSection('devices')}
          >
            <Monitor size={20} />
            <span>Devices</span>
          </div>
          
          <div 
            className={activeSection === 'profiles' ? 'sidebar-item active' : 'sidebar-item'}
            onClick={() => setActiveSection('profiles')}
          >
            <Users size={20} />
            <span>Profiles</span>
          </div>
        </aside>

        {/* Main Content */}
        <main className="account-main">
          <h1 className="page-title">Account Settings</h1>

          {/* Message Banner */}
          {message.text && (
            <div className={`message-banner ${message.type}`}>
              {message.type === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <XCircle size={20} />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="section-content">
              {/* Member Badge */}
              <div className="member-badge">
                <Calendar size={20} />
                <span>Member since {formatDate(userData.member_since)}</span>
              </div>

              {/* Account Details Card */}
              <div className="details-card">
                <h2>Account Details</h2>
                
                <div className="detail-row">
                  <div className="detail-label">
                    <Mail size={18} />
                    <span>Email</span>
                  </div>
                  <div className="detail-value">
                    {userData.email || 'Not provided'}
                    {userData.email_verified && (
                      <CheckCircle size={16} className="verified-icon" />
                    )}
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-label">
                    <Phone size={18} />
                    <span>Phone</span>
                  </div>
                  <div className="detail-value">
                    {userData.phone || 'Not provided'}
                    {userData.phone_verified && (
                      <CheckCircle size={16} className="verified-icon" />
                    )}
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-label">
                    <User size={18} />
                    <span>Full Name</span>
                  </div>
                  <div className="detail-value">
                    {userData.full_name || 'Not provided'}
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-label">
                    <Shield size={18} />
                    <span>Password</span>
                  </div>
                  <div className="detail-value">••••••••</div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="quick-links">
                <div className="quick-link-card" onClick={() => setActiveSection('membership')}>
                  <div className="link-icon">
                    <CreditCard size={24} />
                  </div>
                  <div className="link-content">
                    <h3>Membership & Billing</h3>
                    <p>Manage your subscription and payment</p>
                  </div>
                  <ChevronRight size={20} />
                </div>

                <div className="quick-link-card" onClick={() => setActiveSection('security')}>
                  <div className="link-icon">
                    <Shield size={24} />
                  </div>
                  <div className="link-content">
                    <h3>Security</h3>
                    <p>Update password and security settings</p>
                  </div>
                  <ChevronRight size={20} />
                </div>

                <div className="quick-link-card" onClick={() => setActiveSection('devices')}>
                  <div className="link-icon">
                    <Monitor size={24} />
                  </div>
                  <div className="link-content">
                    <h3>Manage Devices</h3>
                    <p>View and manage your active sessions</p>
                  </div>
                  <ChevronRight size={20} />
                </div>

                <div className="quick-link-card" onClick={() => setActiveSection('profiles')}>
                  <div className="link-icon">
                    <Users size={24} />
                  </div>
                  <div className="link-content">
                    <h3>Profiles</h3>
                    <p>Manage your Zentrya Tv profiles</p>
                  </div>
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          )}

          {/* Membership Section */}
          {activeSection === 'membership' && (
            <div className="section-content">
              {subscription.status === 'active' || subscription.status === 'canceled' ? (
                <div className="membership-card">
                  <div className="membership-header">
                    <h2>Subscription Details</h2>
                    <span className={`status-badge ${getStatusBadgeClass(subscription.status)}`}>
                      {getStatusText(subscription.status)}
                    </span>
                  </div>

                  {/* Plan Details */}
                  <div className="plan-badge">
                    {subscription.plan || 'Premium Plan'}
                  </div>

                  {/* Subscription Info */}
                  <div className="subscription-details">
                    <div className="detail-row">
                      <div className="detail-label">
                        <DollarSign size={18} />
                        <span>Price</span>
                      </div>
                      <div className="detail-value">
                        {formatCurrency(subscription.amount, subscription.currency)}/month
                      </div>
                    </div>

                    <div className="detail-row">
                      <div className="detail-label">
                        <Calendar size={18} />
                        <span>Started</span>
                      </div>
                      <div className="detail-value">
                        {formatDate(subscription.start_date)}
                      </div>
                    </div>

                    {subscription.status === 'active' && subscription.next_billing_date && (
                      <div className="detail-row">
                        <div className="detail-label">
                          <Clock size={18} />
                          <span>Next Billing</span>
                        </div>
                        <div className="detail-value">
                          {formatDate(subscription.next_billing_date)}
                        </div>
                      </div>
                    )}

                    {subscription.status === 'canceled' && subscription.end_date && (
                      <div className="detail-row">
                        <div className="detail-label">
                          <Clock size={18} />
                          <span>Access Until</span>
                        </div>
                        <div className="detail-value">
                          {formatDate(subscription.end_date)}
                        </div>
                      </div>
                    )}

                    <div className="detail-row">
                      <div className="detail-label">
                        <CreditCard size={18} />
                        <span>Payment Method</span>
                      </div>
                      <div className="detail-value payment-method">
                        <span className="payment-badge">
                          {getPaymentMethodDisplay()}
                        </span>
                      </div>
                    </div>

                    <div className="detail-row">
                      <div className="detail-label">
                        <span>Auto-Renew</span>
                      </div>
                      <div className="detail-value">
                        {subscription.auto_renew ? (
                          <span className="auto-renew-on">Enabled</span>
                        ) : (
                          <span className="auto-renew-off">Disabled</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="membership-actions">
                    {subscription.status === 'active' && (
                      <button 
                        className="cancel-button"
                        onClick={handleCancelSubscription}
                        disabled={saving}
                      >
                        {saving ? 'Processing...' : 'Cancel Membership'}
                      </button>
                    )}
                    
                    {subscription.status === 'canceled' && (
                      <button 
                        className="reactivate-button"
                        onClick={() => navigate('/subscribe')}
                      >
                        Reactivate Subscription
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                // No subscription
                <div className="no-subscription-card">
                  <CreditCard size={64} className="no-sub-icon" />
                  <h2>No Active Subscription</h2>
                  <p>Subscribe to Zentrya Tv Premium to access unlimited African content</p>
                  <button 
                    className="subscribe-button"
                    onClick={() => navigate('/subscribe')}
                  >
                    View Plans
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Security Section */}
          {activeSection === 'security' && (
            <div className="section-content">
              <div className="security-card">
                <h2>Change Password</h2>
                
                <form onSubmit={handleChangePassword} className="password-form">
                  <div className="form-group">
                    <label>Current password</label>
                    <div className="password-input">
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        value={passwordData.current_password}
                        onChange={(e) => setPasswordData({
                          ...passwordData,
                          current_password: e.target.value
                        })}
                        placeholder="Enter current password"
                        disabled={saving}
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPasswords({
                          ...showPasswords,
                          current: !showPasswords.current
                        })}
                      >
                        {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>New password (8+ characters)</label>
                    <div className="password-input">
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwordData.new_password}
                        onChange={(e) => setPasswordData({
                          ...passwordData,
                          new_password: e.target.value
                        })}
                        placeholder="Enter new password"
                        disabled={saving}
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPasswords({
                          ...showPasswords,
                          new: !showPasswords.new
                        })}
                      >
                        {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Confirm new password</label>
                    <div className="password-input">
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwordData.confirm_password}
                        onChange={(e) => setPasswordData({
                          ...passwordData,
                          confirm_password: e.target.value
                        })}
                        placeholder="Confirm new password"
                        disabled={saving}
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPasswords({
                          ...showPasswords,
                          confirm: !showPasswords.confirm
                        })}
                      >
                        {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="save-button"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Loader className="spinner" size={18} />
                        Saving...
                      </>
                    ) : (
                      'Save'
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Devices Section */}
          {activeSection === 'devices' && (
            <div className="section-content">
              <h2>Active Devices</h2>
              
              <div className="devices-list">
                {devices.length > 0 ? (
                  devices.map((device) => (
                    <div key={device.id} className="device-card">
                      <div className="device-icon">
                        {device.device_type === 'mobile' || device.device_type === 'tablet' ? (
                          <Smartphone size={24} />
                        ) : (
                          <Monitor size={24} />
                        )}
                      </div>
                      
                      <div className="device-info">
                        <h3>
                          {device.device_name}
                          {device.is_current && (
                            <span className="current-device-badge">This device</span>
                          )}
                        </h3>
                        <p>{device.location || 'Unknown location'}</p>
                        <p className="device-meta">
                          Last active: {formatDate(device.last_active)}
                        </p>
                      </div>
                      
                      {!device.is_current && (
                        <button
                          className="logout-device-button"
                          onClick={() => handleLogoutDevice(device.id)}
                          disabled={saving}
                        >
                          Sign out
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="no-devices">No active devices found</p>
                )}
              </div>

              {devices.length > 1 && (
                <button
                  className="logout-all-button"
                  onClick={handleLogoutAllDevices}
                  disabled={saving}
                >
                  {saving ? 'Processing...' : 'Sign out of all devices'}
                </button>
              )}
            </div>
          )}

          {/* Profiles Section */}
          {activeSection === 'profiles' && (
            <div className="section-content">
              <div className="profiles-card">
                <h2>Profiles</h2>
                <p>Manage who's watching Zentrya Tv on your account</p>
                
                <button
                  className="manage-profiles-button"
                  onClick={() => navigate('/manage-profiles')}
                >
                  <Users size={20} />
                  Manage Profiles
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AccountSettings;