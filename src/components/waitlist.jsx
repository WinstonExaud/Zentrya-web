// src/components/Waitlist.jsx
// iOS Waitlist signup page for Zentrya Tv

import { useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../services/api";
import { Bell, CheckCircle, Phone, ArrowLeft } from "lucide-react";

export default function Waitlist() {
  const [phone, setPhone] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-format phone number
  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    // Remove all non-digit characters except +
    value = value.replace(/[^\d+]/g, '');
    
    // Auto-add +255 if user starts with 0
    if (value.startsWith('0')) {
      value = '+255' + value.substring(1);
    }
    // Ensure +255 prefix
    else if (!value.startsWith('+255') && value.length > 0 && !value.startsWith('+')) {
      value = '+255' + value;
    }
    
    setPhone(value);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate phone number is provided
    if (!phone) {
      setError("Please provide your phone number");
      return;
    }

    // Validate phone format
    if (!phone.match(/^\+255[67]\d{8}$/)) {
      setError("Please enter a valid Tanzanian phone number (+255XXXXXXXXX)");
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.joinWaitlist({
        phone: phone,
        email: null
      });

      console.log("✅ iOS Waitlist response:", response);
      setSubscribed(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
        setPhone("");
      }, 5000);

    } catch (err) {
      console.error("❌ iOS Waitlist error:", err);
      setError(err.message || err.detail || "Failed to join iOS waitlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold tracking-wider">
              <span className="text-yellow-500">ZEN</span>
              <span className="text-black">TRYA</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link 
              to="/application" 
              className="text-sm font-medium text-gray-600 hover:text-yellow-500 transition-colors"
            >
              Back to App
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/application"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-yellow-500 mb-12 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Downloads</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8">
              <Bell size={48} className="text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Join iOS Waitlist
            </h1>
            <p className="text-gray-600 text-lg">
              Be the first to know when Zentrya tv launches on the App Store
            </p>
          </div>

          {/* Waitlist Form */}
          {!subscribed ? (
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200">
              <form onSubmit={handleSubscribe} className="space-y-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+255XXXXXXXXX"
                      value={phone}
                      onChange={(e) => {
                        handlePhoneChange(e);
                        setError("");
                      }}
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-100 transition-all"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    We'll send you a notification when the iOS app is ready
                  </p>
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={loading || !phone}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Joining Waitlist...</span>
                    </>
                  ) : (
                    <>
                      <Bell size={24} />
                      <span>Join Waitlist</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-start gap-4 text-sm text-gray-600">
                  <div className="flex-shrink-0 w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">What happens next?</p>
                    <p>We'll send you an SMS notification as soon as Zentrya tv is available on the App Store. You'll be among the first to download it!</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-900 mb-3">
                You're on the List!
              </h2>
              <p className="text-green-700 mb-8">
                We'll notify you via SMS when the iOS app launches. Thank you for your interest!
              </p>
              <Link
                to="/application"
                className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-semibold transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Downloads</span>
              </Link>
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              Already have Android? 
              <Link to="/application" className="text-yellow-600 hover:text-yellow-700 font-medium ml-2">
                Download Now
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo */}
            <div className="text-xl font-bold tracking-wider">
              <span className="text-yellow-500">ZEN</span>
              <span className="text-black">TRYA</span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <Link to="/about" className="text-gray-600 hover:text-yellow-500 transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-yellow-500 transition-colors">
                Contact
              </Link>
              <Link to="/help" className="text-gray-600 hover:text-yellow-500 transition-colors">
                Help
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-yellow-500 transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-gray-600 hover:text-yellow-500 transition-colors">
                Privacy
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © 2026 Zentrya Tv. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}