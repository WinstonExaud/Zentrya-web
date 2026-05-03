import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

// Import your background image
import loginBackground from '../assets/admin-bg.jpg'; // You'll add this

const Login = () => {
  const navigate = useNavigate();
  const { login, sendOtp, verifyOtp, error: authError, clearError } = useAuth();
  
  const [loginMode, setLoginMode] = useState('password'); // 'password' or 'otp'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: '',
    rememberMe: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (authError) {
      clearError();
    }
  };

  const validateEmail = (email) => {
    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    // Tanzanian phone number validation (starts with +255, 255, or 0, followed by 9 digits)
    const phoneRegex = /^(\+?255|0)?[67]\d{8}$/;
    
    return emailRegex.test(email) || phoneRegex.test(email);
  };

  const normalizePhoneNumber = (phone) => {
    // Normalize phone number to +255 format
    if (phone.startsWith('0')) {
      return '+255' + phone.slice(1);
    } else if (phone.startsWith('255')) {
      return '+' + phone;
    } else if (phone.startsWith('+255')) {
      return phone;
    }
    return phone;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Please enter a valid email or phone number.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email or phone number.';
    }
    
    if (loginMode === 'password') {
      if (!formData.password) {
        newErrors.password = 'Your password must contain between 4 and 60 characters.';
      } else if (formData.password.length < 4 || formData.password.length > 60) {
        newErrors.password = 'Your password must contain between 4 and 60 characters.';
      }
    } else if (loginMode === 'otp' && otpSent) {
      if (!formData.otp) {
        newErrors.otp = 'Please enter the verification code.';
      } else if (formData.otp.length !== 6) {
        newErrors.otp = 'Verification code must be 6 digits.';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    // Validate email/phone first
    if (!formData.email) {
      setErrors({ email: 'Please enter a valid email or phone number.' });
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Please enter a valid email or phone number.' });
      return;
    }

    setIsLoading(true);
    setErrors({});
    clearError();

    try {
      // Normalize phone number if needed
      const emailOrPhone = formData.email.includes('@') 
        ? formData.email 
        : normalizePhoneNumber(formData.email);

      console.log('Sending OTP to:', emailOrPhone);
      await sendOtp(emailOrPhone);
      
      setOtpSent(true);
      toast.success('Verification code sent successfully!');
      
      // Start resend timer (60 seconds)
      setResendTimer(60);
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      console.log('✅ OTP sent successfully');
    } catch (error) {
      console.error('❌ Failed to send OTP:', error);
      toast.error(error.message || 'Failed to send OTP. Please try again.');
      setErrors({ email: error.message || 'Failed to send OTP. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    if (resendTimer === 0) {
      handleSendOTP({ preventDefault: () => {} });
    }
  };

  const handlePasswordLogin = async () => {
    setIsLoading(true);
    setErrors({});
    clearError();

    try {
      // Normalize phone number if needed
      const emailOrPhone = formData.email.includes('@') 
        ? formData.email 
        : normalizePhoneNumber(formData.email);

      console.log('🔐 Logging in with password:', emailOrPhone);
      await login(emailOrPhone, formData.password);
      
      console.log('✅ Login successful');
      toast.success('Welcome back to Zentrya Tv! 🎬');
      
      // Navigate to profile selection or home
      navigate('/profiles');
    } catch (error) {
      console.error('❌ Login failed:', error);
      toast.error(error.message || 'Login failed. Please check your credentials.');
      setErrors({ 
        password: error.message || 'Login failed. Please check your credentials.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpLogin = async () => {
    setIsLoading(true);
    setErrors({});
    clearError();

    try {
      // Normalize phone number if needed
      const emailOrPhone = formData.email.includes('@') 
        ? formData.email 
        : normalizePhoneNumber(formData.email);

      console.log('🔐 Verifying OTP for:', emailOrPhone);
      await verifyOtp(emailOrPhone, formData.otp);
      
      console.log('✅ OTP verified successfully');
      toast.success('Welcome back to Zentrya Tv! 🎬');
      
      // Navigate to profile selection or home
      navigate('/profiles');
    } catch (error) {
      console.error('❌ OTP verification failed:', error);
      toast.error(error.message || 'Invalid verification code. Please try again.');
      setErrors({ 
        otp: error.message || 'Invalid verification code. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loginMode === 'otp' && !otpSent) {
      await handleSendOTP(e);
      return;
    }

    if (!validateForm()) {
      return;
    }

    if (loginMode === 'password') {
      await handlePasswordLogin();
    } else if (loginMode === 'otp' && otpSent) {
      await handleOtpLogin();
    }
  };

  const toggleLoginMode = () => {
    setLoginMode(prev => prev === 'password' ? 'otp' : 'password');
    setOtpSent(false);
    setFormData(prev => ({ ...prev, password: '', otp: '' }));
    setErrors({});
    clearError();
    setResendTimer(0);
  };

  const handleBackToEmail = () => {
    setOtpSent(false);
    setFormData(prev => ({ ...prev, otp: '' }));
    setErrors({});
    clearError();
  };

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden">
      {/* Background Image with Overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src={loginBackground} 
          alt="Zentrya Tv Background" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90" />
      </div>

      {/* Header with Logo */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="text-2xl md:text-3xl font-bold tracking-wider cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-yellow-500">ZEN</span>
          <span className="text-white">TRYA</span>
        </div>
      </header>

      {/* Login Card - Centered */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-8">
        <div className="w-full max-w-md">
          {/* Glassmorphism Card */}
          <div className="bg-black/70 backdrop-blur-xl border border-yellow-500/20 rounded-2xl shadow-2xl shadow-yellow-500/10 p-8 md:p-12">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Sign In
              </span>
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Global Error Message */}
              {authError && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-red-400 text-sm text-center">{authError}</p>
                </div>
              )}

              {/* Email/Phone Input */}
              <div className="space-y-2">
                {loginMode === 'otp' && otpSent && (
                  <button
                    type="button"
                    className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors text-sm mb-3"
                    onClick={handleBackToEmail}
                    disabled={isLoading}
                  >
                    <ArrowLeft size={16} />
                    <span>Change email or phone</span>
                  </button>
                )}
                
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={loginMode === 'otp' ? 'Email or mobile number (e.g., +255712345678)' : 'Email or mobile number'}
                  className={`w-full px-4 py-3 bg-gray-900/50 border ${
                    errors.email ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all backdrop-blur-sm ${
                    loginMode === 'otp' && otpSent ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={loginMode === 'otp' && otpSent || isLoading}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Input - Only shown in password mode */}
              {loginMode === 'password' && (
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className={`w-full px-4 py-3 pr-12 bg-gray-900/50 border ${
                        errors.password ? 'border-red-500' : 'border-gray-700'
                      } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all backdrop-blur-sm`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                  )}
                </div>
              )}

              {/* OTP Input - Only shown in OTP mode after code is sent */}
              {loginMode === 'otp' && otpSent && (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="Enter 6-digit verification code"
                    maxLength="6"
                    className={`w-full px-4 py-3 bg-gray-900/50 border ${
                      errors.otp ? 'border-red-500' : 'border-gray-700'
                    } rounded-lg text-white placeholder-gray-400 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all backdrop-blur-sm`}
                    disabled={isLoading}
                  />
                  {errors.otp && (
                    <p className="text-red-400 text-sm text-center">{errors.otp}</p>
                  )}
                  
                  {/* Resend OTP */}
                  <div className="text-center">
                    {resendTimer > 0 ? (
                      <p className="text-gray-400 text-sm">Resend code in {resendTimer}s</p>
                    ) : (
                      <button
                        type="button"
                        className="text-yellow-500 hover:text-yellow-400 transition-colors text-sm font-medium"
                        onClick={handleResendOTP}
                        disabled={isLoading}
                      >
                        Resend verification code
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Sign In Button */}
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-3 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </span>
                ) : (
                  loginMode === 'otp' && !otpSent ? 'Send Verification Code' : 'Sign In'
                )}
              </button>

              {/* OR Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-black/70 text-gray-400">OR</span>
                </div>
              </div>

              {/* Toggle Sign-In Mode Button */}
              <button 
                type="button" 
                className="w-full bg-gray-800/50 text-white font-semibold py-3 rounded-lg hover:bg-gray-700/50 transition-all border border-gray-700 backdrop-blur-sm"
                onClick={toggleLoginMode}
                disabled={isLoading}
              >
                {loginMode === 'password' ? 'Use a Sign-In Code' : 'Use Password Instead'}
              </button>

              {/* Forgot Password Link - Only show in password mode */}
              {loginMode === 'password' && (
                <div className="text-center">
                  <a 
                    href="/forgot-password" 
                    className="text-yellow-500 hover:text-yellow-400 transition-colors text-sm font-medium"
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="sr-only"
                      disabled={isLoading}
                    />
                    <div className={`w-5 h-5 border-2 rounded ${
                      formData.rememberMe 
                        ? 'border-yellow-500 bg-yellow-500' 
                        : 'border-gray-600 bg-gray-900/50'
                    } transition-all`}>
                      {formData.rememberMe && (
                        <svg className="w-full h-full text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="ml-3 text-gray-300 text-sm group-hover:text-white transition-colors">
                    Remember me
                  </span>
                </label>
              </div>

              {/* Sign Up Prompt */}
              <div className="text-center pt-4">
                <span className="text-gray-400">New to Zentrya Tv? </span>
                <a 
                  href="/signup" 
                  className="text-yellow-500 hover:text-yellow-400 transition-colors font-semibold"
                >
                  Sign up now.
                </a>
              </div>

              {/* reCAPTCHA Notice */}
              <div className="text-center pt-4">
                <p className="text-gray-500 text-xs">
                  This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
                  <button type="button" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                    Learn more.
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Additional Info Below Card */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm mb-4">
              🇹🇿 The Future of Entertainment in Tanzania
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-6 md:px-12 py-8 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-400 text-sm mb-4">Questions? Contact us.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <a href="/faq" className="text-gray-400 hover:text-yellow-500 transition-colors">FAQ</a>
            <a href="/help" className="text-gray-400 hover:text-yellow-500 transition-colors">Help Center</a>
            <a href="/terms" className="text-gray-400 hover:text-yellow-500 transition-colors">Terms of Use</a>
            <a href="/privacy" className="text-gray-400 hover:text-yellow-500 transition-colors">Privacy</a>
            <a href="/cookies" className="text-gray-400 hover:text-yellow-500 transition-colors">Cookie Preferences</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;