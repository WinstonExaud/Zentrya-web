import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Check, Info, Loader, ChevronRight, Shield, CreditCard, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import toast from 'react-hot-toast';

// Payment providers
const PAYMENT_PROVIDERS = [
  { id: 'airtel', name: 'Airtel Money', logo: '/assets/payment/airtel.png' },
  { id: 'mpesa', name: 'M-Pesa (Vodacom)', logo: '/assets/payment/mpesa.png' },
  { id: 'halopesa', name: 'HaloPesa', logo: '/assets/payment/halopesa.png' },
  { id: 'tigopesa', name: 'Tigo Pesa', logo: '/assets/payment/tigopesa.png' }
];

// Plans
const SUBSCRIPTION_PLANS = [
  {
    id: 'mobile',
    name: 'Mobile',
    price: 4999,
    features: ['Watch on phone & tablet', 'Unlimited movies & TV shows', '480p quality']
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 7999,
    features: ['Watch on any device', 'HD quality', 'Download on 1 device']
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 12999,
    popular: true,
    features: ['Watch on 2 devices', 'Full HD quality', 'Download on 2 devices', 'Ad-free']
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 17999,
    features: ['Watch on 4 devices', '4K Ultra HD + HDR', 'Download on 4 devices', 'Spatial audio']
  }
];

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const searchParams = new URLSearchParams(location.search);
  const prefilledEmail = searchParams.get('email') || '';

  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [avatars, setAvatars] = useState([]);
  const [loadingAvatars, setLoadingAvatars] = useState(false);
  
  const [formData, setFormData] = useState({
    contactInfo: prefilledEmail,
    isPhone: false,
    fullName: '',
    phone: '',
    email: prefilledEmail,
    password: '',
    confirmPassword: '',
    selectedPlan: 'standard',
    paymentProvider: '',
    paymentPhone: '',
    autoRenew: true,
    paymentReference: '',
    orderId: '',
    transactionId: '',
    displayName: '',
    selectedAvatarId: null,
    selectedAvatarUrl: null,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentPollInterval, setPaymentPollInterval] = useState(null);

  useEffect(() => {
    if (currentStep === 5 && avatars.length === 0) {
      fetchAvatars();
    }
  }, [currentStep]);

  useEffect(() => {
    return () => {
      if (paymentPollInterval) clearInterval(paymentPollInterval);
    };
  }, [paymentPollInterval]);

  const fetchAvatars = async () => {
    setLoadingAvatars(true);
    try {
      const response = await apiService.getPublicAvatars();
      const avatarList = response.avatars || [];
      setAvatars(avatarList);
      
      if (avatarList.length > 0) {
        setFormData(prev => ({ 
          ...prev, 
          selectedAvatarId: avatarList[0].id,
          selectedAvatarUrl: avatarList[0].avatar_url
        }));
      }
    } catch (error) {
      console.error('Failed to fetch avatars:', error);
      toast.error('Failed to load avatars');
    } finally {
      setLoadingAvatars(false);
    }
  };

  const validateEmail = (email) => {
    if (!email) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const validatePhone = (phone) => {
    if (!phone) return false;
    const clean = phone.replace(/\s/g, '').replace(/-/g, '');
    return /^(\+?255|0)[67]\d{8}$/.test(clean);
  };
  
  const formatPhoneNumber = (value) => {
    let digits = value.replace(/\D/g, '');
    if (digits.startsWith('0')) digits = '255' + digits.slice(1);
    if (!digits.startsWith('255') && digits.length > 0) digits = '255' + digits;
    return digits.length > 0 ? '+' + digits.slice(0, 12) : '';
  };

  const normalizePhoneForBackend = (phone) => {
    if (!phone) return '';
    return phone.replace(/\s/g, '').replace(/-/g, '');
  };

  const handleContactInfoChange = (e) => {
    const value = e.target.value;
    let isPhoneInput = false;
    
    if (value.includes('@')) {
      isPhoneInput = false;
    } else if (/^[\d+]/.test(value)) {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length >= 6) isPhoneInput = true;
    }
    
    const formattedValue = isPhoneInput ? formatPhoneNumber(value) : value;
    
    setFormData(prev => ({
      ...prev,
      contactInfo: formattedValue,
      isPhone: isPhoneInput,
      // Autofill the corresponding field in step 2
      ...(isPhoneInput ? { phone: formattedValue } : { email: formattedValue })
    }));
    
    if (errors.contactInfo) setErrors(prev => ({ ...prev, contactInfo: '' }));
    if (apiError) setApiError('');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;
    
    if (name === 'phone' || name === 'paymentPhone') {
      newValue = formatPhoneNumber(value);
    }
    
    if (name === 'displayName' && value.length > 20) return;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (apiError) setApiError('');
  };

  const handleAvatarSelect = (avatar) => {
    setFormData(prev => ({
      ...prev,
      selectedAvatarId: avatar.id,
      selectedAvatarUrl: avatar.avatar_url
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.contactInfo) {
      newErrors.contactInfo = 'Email or phone number is required';
    } else if (formData.isPhone) {
      if (!validatePhone(formData.contactInfo)) {
        newErrors.contactInfo = 'Please enter a valid Tanzanian phone number';
      }
    } else {
      if (!validateEmail(formData.contactInfo)) {
        newErrors.contactInfo = 'Please enter a valid email address';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid Tanzanian phone number';
    }
    
    // Make email validation only if it's provided
    if (formData.email && formData.email.trim() !== '') {
      if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (formData.password.length > 60) {
      newErrors.password = 'Password must be less than 60 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep4 = () => {
    const newErrors = {};
    
    if (!formData.paymentProvider) {
      newErrors.paymentProvider = 'Please select a payment method';
    }
    
    if (!formData.paymentPhone) {
      newErrors.paymentPhone = 'Phone number is required for payment';
    } else if (!validatePhone(formData.paymentPhone)) {
      newErrors.paymentPhone = 'Please enter a valid Tanzanian phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep5 = () => {
    const newErrors = {};
    
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    } else if (formData.displayName.trim().length < 2) {
      newErrors.displayName = 'Display name must be at least 2 characters';
    }
    
    if (!formData.selectedAvatarId) {
      newErrors.selectedAvatarId = 'Please select an avatar';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkUserExists = async () => {
    try {
      setLoading(true);
      setApiError('');
      
      const checkValue = formData.isPhone 
        ? normalizePhoneForBackend(formData.contactInfo)
        : formData.contactInfo;
      
      const result = await apiService.checkUserExists(checkValue);
      setLoading(false);
      
      if (result.exists) {
        const fieldType = formData.isPhone ? 'phone number' : 'email';
        setApiError(`An account with this ${fieldType} already exists.`);
        toast.error('Account exists. Please sign in instead.');
        return true;
      }
      
      return false;
      
    } catch (error) {
      setLoading(false);
      console.error('Check user error:', error);
      toast.error('Unable to verify account. Please try again.');
      setApiError('Unable to verify account. Please try again.');
      return true;
    }
  };

  // Add this function to check if email or phone already exists
  const checkFieldExists = async (field, value) => {
    if (!value) return false;
    
    try {
      setLoading(true);
      const result = await apiService.checkUserExists(value);
      setLoading(false);
      return result.exists;
    } catch (error) {
      setLoading(false);
      console.error('Check field error:', error);
      return false;
    }
  };

  const initiatePayment = async () => {
    try {
      setProcessingPayment(true);
      setPaymentStatus('pending');
      setApiError('');
      
      const selectedPlan = SUBSCRIPTION_PLANS.find(p => p.id === formData.selectedPlan);
      
      const paymentData = {
        phone: normalizePhoneForBackend(formData.paymentPhone),
        amount: selectedPlan.price,
        payment_provider: formData.paymentProvider,
        subscription_plan: formData.selectedPlan,
        email: formData.email || null,
        full_name: formData.fullName,
        auto_renew: formData.autoRenew
      };
      
      const response = await apiService.initiatePayment(paymentData);
      
      setFormData(prev => ({
        ...prev,
        paymentReference: response.payment_reference,
        orderId: response.order_id
      }));
      
      toast.success('Payment request sent! Check your phone.');
      
      startPaymentStatusPolling(response.order_id);
      
      return response;
      
    } catch (error) {
      setProcessingPayment(false);
      setPaymentStatus('failed');
      console.error('Payment error:', error);
      toast.error(error.message || 'Failed to initiate payment');
      setApiError(error.message || 'Failed to initiate payment');
      throw error;
    }
  };

  const startPaymentStatusPolling = (orderId) => {
    let attempts = 0;
    const maxAttempts = 60;
    
    const intervalId = setInterval(async () => {
      attempts++;
      
      try {
        const status = await apiService.checkPaymentStatus(orderId);
        
        if (status.payment_status === 'completed' || status.payment_status === 'success') {
          clearInterval(intervalId);
          setPaymentStatus('success');
          setProcessingPayment(false);
          
          if (status.transaction_id) {
            setFormData(prev => ({ ...prev, transactionId: status.transaction_id }));
          }
          
          toast.success('Payment successful! 🎉');
          
          setTimeout(() => setCurrentStep(5), 2000);
          
        } else if (status.payment_status === 'failed' || status.payment_status === 'cancelled') {
          clearInterval(intervalId);
          setPaymentStatus('failed');
          setProcessingPayment(false);
          toast.error('Payment failed. Please try again.');
          
        } else if (attempts >= maxAttempts) {
          clearInterval(intervalId);
          setPaymentStatus('failed');
          setProcessingPayment(false);
          toast.error('Payment timeout. Contact support if charged.');
        }
      } catch (error) {
        if (attempts >= maxAttempts) {
          clearInterval(intervalId);
          setPaymentStatus('failed');
          setProcessingPayment(false);
          toast.error('Unable to verify payment.');
        }
      }
    }, 5000);
    
    setPaymentPollInterval(intervalId);
  };

  const completeSignup = async () => {
    try {
      setLoading(true);
      setApiError('');
      
      const selectedPlan = SUBSCRIPTION_PLANS.find(p => p.id === formData.selectedPlan);
      
      const signupData = {
        full_name: formData.fullName.trim(),
        phone: normalizePhoneForBackend(formData.phone),
        email: formData.email ? formData.email.trim() : null,
        password: formData.password,
        display_name: formData.displayName.trim(),
        avatar_id: formData.selectedAvatarId,
        subscription_plan: formData.selectedPlan,
        subscription_amount: selectedPlan.price,
        subscription_currency: 'TZS',
        payment_provider: formData.paymentProvider,
        payment_reference: formData.paymentReference,
        order_id: formData.orderId,
        auto_renew: formData.autoRenew
      };
      
      const result = await apiService.completeSignup(signupData);
      
      if (!result.access_token) {
        throw new Error('Signup failed - no token received');
      }
      
      toast.success(`Welcome to Zentrya Tv, ${formData.displayName}! 🎉`);
      
      try {
        await login(formData.phone, formData.password);
      } catch (loginError) {
        console.error('Auto-login failed:', loginError);
      }
      
      setTimeout(() => {
        navigate('/browse', { 
          state: { 
            welcomeMessage: `Welcome to Zentrya Tv, ${formData.displayName}! 🎉`,
            newUser: true 
          } 
        });
      }, 1500);
      
    } catch (error) {
      setLoading(false);
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to complete signup');
      setApiError(error.message || 'Failed to complete signup');
    }
  };

  const handleNext = async () => {
    try {
      if (currentStep === 1) {
        if (!validateStep1()) {
          toast.error('Please fix the errors');
          return;
        }
        
        const userExists = await checkUserExists();
        if (userExists) {
          toast.error('Account exists. Redirecting to login...');
          setTimeout(() => navigate('/login'), 2000);
          return;
        }
        
        // Autofill the main field in step 2
        if (formData.isPhone) {
          setFormData(prev => ({ 
            ...prev, 
            phone: formData.contactInfo,
            // Also set payment phone for convenience
            paymentPhone: formData.contactInfo
          }));
        } else {
          setFormData(prev => ({ 
            ...prev, 
            email: formData.contactInfo 
          }));
        }
        
        setCurrentStep(2);
      }
      else if (currentStep === 2) {
        if (!validateStep2()) {
          toast.error('Please fill all required fields');
          return;
        }
        
        // Check if email exists if provided
        if (formData.email && formData.email.trim() !== '') {
          const emailExists = await checkFieldExists('email', formData.email);
          if (emailExists) {
            toast.error('Email already exists. Please use a different email.');
            setApiError('Email already exists. Please use a different email or remove it.');
            return;
          }
        }
        
        // Check if phone exists
        if (formData.phone) {
          const phoneExists = await checkFieldExists('phone', formData.phone);
          if (phoneExists) {
            toast.error('Phone number already exists. Please use a different number.');
            setApiError('Phone number already exists. Please use a different number.');
            return;
          }
        }
        
        setCurrentStep(3);
      }
      else if (currentStep === 3) {
        // Make sure payment phone is filled if phone is available
        setFormData(prev => ({ 
          ...prev, 
          paymentPhone: prev.paymentPhone || prev.phone 
        }));
        setCurrentStep(4);
      }
      else if (currentStep === 4) {
        if (!validateStep4()) {
          toast.error('Please select payment method and enter phone');
          return;
        }
        await initiatePayment();
      }
      else if (currentStep === 5) {
        if (!validateStep5()) {
          toast.error('Please select avatar and enter display name');
          return;
        }
        await completeSignup();
      }
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error('An error occurred');
    }
  };
  
  const handleBack = () => {
    setApiError('');
    if (currentStep > 1 && !processingPayment && paymentStatus !== 'success') {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const renderProgressBar = () => {
    const progress = (currentStep / 5) * 100;
    return (
      <div className="w-full bg-gray-200 h-1 mb-8">
        <div 
          className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
        Ready to watch? Enter your email or phone.
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Create or restart your membership
      </p>
      
      {apiError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 text-sm">{apiError}</p>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={formData.contactInfo}
            onChange={handleContactInfoChange}
            placeholder="Email or phone number"
            style={{
              color: '#000000',
              backgroundColor: '#ffffff',
              fontSize: '16px',
              lineHeight: '1.5'
            }}
            className={`w-full px-4 py-4 border-2 ${
              errors.contactInfo ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
            disabled={loading}
            autoFocus
            autoComplete="off"
          />
          {errors.contactInfo && (
            <p className="text-red-500 text-sm mt-2">{errors.contactInfo}</p>
          )}
        </div>
        
        <button
          onClick={handleNext}
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-4 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader size={20} className="animate-spin" />
              Checking...
            </>
          ) : (
            <>
              Get Started
              <ChevronRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
        Create your account
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Just a few more steps and you're done!
      </p>
      
      {apiError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 text-sm">{apiError}</p>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full name"
            style={{
              color: '#000000',
              backgroundColor: '#ffffff',
              fontSize: '16px',
              lineHeight: '1.5'
            }}
            className={`w-full px-4 py-4 border-2 ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
            disabled={loading}
            autoFocus
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-2">{errors.fullName}</p>}
        </div>
        
        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone number (required)"
            style={{
              color: '#000000',
              backgroundColor: '#ffffff',
              fontSize: '16px',
              lineHeight: '1.5'
            }}
            className={`w-full px-4 py-4 border-2 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
            disabled={loading}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
          {formData.contactInfo && formData.isPhone && (
            <p className="text-xs text-gray-500 mt-1">
              Prefilled from previous step. You can change it.
            </p>
          )}
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email (optional)"
            style={{
              color: '#000000',
              backgroundColor: '#ffffff',
              fontSize: '16px',
              lineHeight: '1.5'
            }}
            className={`w-full px-4 py-4 border-2 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
            disabled={loading}
          />
          {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
          {formData.contactInfo && !formData.isPhone && (
            <p className="text-xs text-gray-500 mt-1">
              Prefilled from previous step. You can remove or change it.
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Email is optional but recommended for password recovery.
          </p>
        </div>
        
        <div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create password"
              style={{
                color: '#000000',
                backgroundColor: '#ffffff',
                fontSize: '16px',
                lineHeight: '1.5'
              }}
              className={`w-full px-4 py-4 pr-12 border-2 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
        </div>
        
        <div>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm password"
              style={{
                color: '#000000',
                backgroundColor: '#ffffff',
                fontSize: '16px',
                lineHeight: '1.5'
              }}
              className={`w-full px-4 py-4 pr-12 border-2 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>}
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
          <p className="text-yellow-800 font-medium mb-1">Important:</p>
          <p className="text-yellow-700">
            If email or phone already exists, you'll be prompted to use a different one.
          </p>
        </div>
        
        <button
          onClick={handleNext}
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-4 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader size={20} className="animate-spin" />
              Checking availability...
            </>
          ) : (
            'Next'
          )}
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 text-center">
        Choose the plan that's right for you
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Watch on any device. Change your plan anytime.
      </p>
      
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setFormData(prev => ({ ...prev, selectedPlan: plan.id }))}
            className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all ${
              formData.selectedPlan === plan.id
                ? 'border-yellow-500 bg-yellow-50 scale-105'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            } ${plan.popular ? 'ring-2 ring-yellow-400' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                Most Popular
              </div>
            )}
            
            {formData.selectedPlan === plan.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                <Check size={16} className="text-black" />
              </div>
            )}
            
            <h3 className="text-xl font-bold mb-2 text-gray-900">{plan.name}</h3>
            <p className="text-3xl font-bold mb-4 text-gray-900">
              TZS {plan.price.toLocaleString()}
              <span className="text-sm font-normal text-gray-600">/mo</span>
            </p>
            
            <div className="space-y-3">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check size={16} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleNext}
        className="w-full max-w-md mx-auto block bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-4 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all"
      >
        Continue to Payment
      </button>
    </div>
  );

  const renderStep4 = () => {
    const selectedPlan = SUBSCRIPTION_PLANS.find(p => p.id === formData.selectedPlan);
    
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Complete your payment
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Secure payment powered by Selcom
        </p>
        
        {paymentStatus === 'pending' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <Loader size={20} className="animate-spin text-blue-600 mt-1" />
            <div>
              <p className="text-blue-900 font-semibold">Payment request sent!</p>
              <p className="text-blue-700 text-sm">Check your phone to complete payment...</p>
            </div>
          </div>
        )}
        
        {paymentStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <Check size={20} className="text-green-600 mt-1" />
            <div>
              <p className="text-green-900 font-semibold">Payment successful! 🎉</p>
              <p className="text-green-700 text-sm">Redirecting...</p>
            </div>
          </div>
        )}
        
        {paymentStatus === 'failed' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">Payment failed. Please try again.</p>
          </div>
        )}
        
        {apiError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">{apiError}</p>
          </div>
        )}
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">{selectedPlan?.name} Plan</span>
              <span className="font-semibold text-gray-900">TZS {selectedPlan?.price.toLocaleString()}/mo</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-yellow-600">TZS {selectedPlan?.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Select Payment Method
          </label>
          <div className="grid grid-cols-2 gap-4">
            {PAYMENT_PROVIDERS.map((provider) => (
              <div
                key={provider.id}
                onClick={() => !processingPayment && setFormData(prev => ({ ...prev, paymentProvider: provider.id }))}
                className={`cursor-pointer border-2 rounded-lg p-4 transition-all bg-white ${
                  formData.paymentProvider === provider.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${processingPayment ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={provider.logo} 
                    alt={provider.name}
                    className="w-12 h-12 object-contain"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <p className="font-semibold text-gray-900">{provider.name}</p>
                </div>
                {formData.paymentProvider === provider.id && (
                  <Check size={16} className="text-yellow-600 mt-2" />
                )}
              </div>
            ))}
          </div>
          {errors.paymentProvider && (
            <p className="text-red-500 text-sm mt-2">{errors.paymentProvider}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Payment Phone Number
          </label>
          <input
            type="tel"
            name="paymentPhone"
            value={formData.paymentPhone}
            onChange={handleInputChange}
            placeholder="+255..."
            style={{
              color: '#000000',
              backgroundColor: '#ffffff',
              fontSize: '16px',
              lineHeight: '1.5'
            }}
            className={`w-full px-4 py-4 border-2 ${
              errors.paymentPhone ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
            disabled={processingPayment}
          />
          {errors.paymentPhone && (
            <p className="text-red-500 text-sm mt-2">{errors.paymentPhone}</p>
          )}
          <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
            <Info size={14} />
            You will receive a payment prompt on this number
          </p>
          {formData.phone && formData.paymentPhone === formData.phone && (
            <p className="text-xs text-gray-500 mt-1">
              Using your registered phone number. You can change it.
            </p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative mt-1">
              <input
                type="checkbox"
                name="autoRenew"
                checked={formData.autoRenew}
                onChange={handleInputChange}
                className="sr-only"
                disabled={processingPayment}
              />
              <div className={`w-5 h-5 border-2 rounded ${
                formData.autoRenew
                  ? 'border-yellow-500 bg-yellow-500'
                  : 'border-gray-300 bg-white'
              }`}>
                {formData.autoRenew && <Check size={16} className="text-black" />}
              </div>
            </div>
            <div>
              <span className="text-gray-900 font-medium">Enable auto-renewal</span>
              <p className="text-sm text-gray-600">
                Your subscription will automatically renew each month. Cancel anytime.
              </p>
            </div>
          </label>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-start gap-3">
          <Shield size={20} className="text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Secure Payment</p>
            <p>Your payment information is encrypted and secure.</p>
          </div>
        </div>
        
        <button
          onClick={handleNext}
          disabled={processingPayment || paymentStatus === 'success'}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-4 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {processingPayment ? (
            <>
              <Loader size={20} className="animate-spin" />
              Processing...
            </>
          ) : paymentStatus === 'success' ? (
            <>
              <Check size={20} />
              Complete
            </>
          ) : (
            <>
              <CreditCard size={20} />
              Pay TZS {selectedPlan?.price.toLocaleString()}
            </>
          )}
        </button>
      </div>
    );
  };

  const renderStep5 = () => (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
        Who's watching?
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Create your profile
      </p>
      
      {apiError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 text-sm">{apiError}</p>
        </div>
      )}
      
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Choose your avatar
        </label>
        {loadingAvatars ? (
          <div className="flex items-center justify-center py-12">
            <Loader size={32} className="animate-spin text-yellow-500" />
          </div>
        ) : avatars.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No avatars available</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                onClick={() => !loading && handleAvatarSelect(avatar)}
                className={`relative cursor-pointer rounded-lg overflow-hidden border-4 transition-all ${
                  formData.selectedAvatarId === avatar.id
                    ? 'border-yellow-500 scale-105'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img 
                  src={avatar.avatar_url || avatar.thumbnail_url} 
                  alt={avatar.name}
                  className="w-full aspect-square object-cover bg-gray-100"
                />
                {formData.selectedAvatarId === avatar.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Check size={24} className="text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {errors.selectedAvatarId && (
          <p className="text-red-500 text-sm mt-2">{errors.selectedAvatarId}</p>
        )}
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Display Name
        </label>
        <input
          type="text"
          name="displayName"
          value={formData.displayName}
          onChange={handleInputChange}
          placeholder="Enter your display name"
          maxLength={20}
          style={{
            color: '#000000',
            backgroundColor: '#ffffff',
            fontSize: '16px',
            lineHeight: '1.5'
          }}
          className={`w-full px-4 py-4 border-2 ${
            errors.displayName ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500`}
          disabled={loading}
          autoFocus
        />
        {errors.displayName && (
          <p className="text-red-500 text-sm mt-2">{errors.displayName}</p>
        )}
        <p className="text-sm text-gray-600 mt-2">
          {formData.displayName.length}/20 characters
        </p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-700">
        By clicking "Start Watching", you agree to our Terms of Use and Privacy Policy.
      </div>
      
      <button
        onClick={handleNext}
        disabled={loading}
        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-4 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader size={20} className="animate-spin" />
            Creating...
          </>
        ) : (
          <>
            Start Watching
            <ChevronRight size={20} />
          </>
        )}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="text-2xl md:text-3xl font-bold tracking-wider cursor-pointer"
            onClick={() => navigate('/')}
          >
            <span className="text-yellow-500">ZEN</span>
            <span className="text-black">TRYA</span>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="text-black font-semibold hover:text-yellow-600 transition-colors"
          >
            Sign In
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {currentStep > 1 && !processingPayment && paymentStatus !== 'success' && (
          <button 
            onClick={handleBack}
            className="text-black hover:text-yellow-600 font-semibold mb-6 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        )}
        
        <div className="mb-8">
          {renderProgressBar()}
          <p className="text-center text-sm text-gray-600 font-medium">
            Step {currentStep} of 5
          </p>
        </div>
        
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </div>

      <footer className="border-t border-gray-200 py-8 px-6 md:px-12 mt-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-600 text-sm mb-4">
            Questions? Call +255-XXX-XXX-XXX
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
            <a href="/faq" className="hover:text-yellow-600">FAQ</a>
            <a href="/help" className="hover:text-yellow-600">Help Center</a>
            <a href="/terms" className="hover:text-yellow-600">Terms of Use</a>
            <a href="/privacy" className="hover:text-yellow-600">Privacy</a>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            🇹🇿 The Future of Entertainment in Tanzania
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;