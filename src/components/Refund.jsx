// src/components/RefundPolicy.jsx
// Refund Policy page for Zentrya

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DollarSign, CreditCard, AlertCircle, CheckCircle, XCircle, FileText } from "lucide-react";

export default function RefundPolicy() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans">
      {/* Fixed Navbar */}
      <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 py-4 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-sm" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}>
        <Link to="/" className="flex items-center gap-8">
          <div className="text-2xl md:text-3xl font-bold tracking-wider">
            <span className="text-yellow-500">ZEN</span>
            <span className="text-white">TRYA</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="text-sm md:text-base font-medium text-white hover:text-yellow-500 transition-colors"
          >
            Sign In
          </Link>

          <Link 
            to="/signup" 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-5 py-2 md:px-6 md:py-2.5 rounded-md font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/50"
          >
            Join Now
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-black to-black" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-6">
            <DollarSign size={20} className="text-yellow-500" />
            <span className="text-yellow-500 font-semibold text-sm">Billing & Refunds</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Refund <span className="text-yellow-500">Policy</span>
          </h1>

          <p className="text-gray-400 text-lg mb-6">
            Last Updated: January 31, 2026
          </p>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <CreditCard size={24} className="text-yellow-500 flex-shrink-0 mt-1" />
              <div className="text-left">
                <p className="text-white font-semibold mb-2">Transparent Billing</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Understand our cancellation and refund policies before subscribing to Zentrya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="px-6 md:px-12 py-12 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Policy Summary</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 text-center">
              <CheckCircle size={32} className="text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">Easy Cancellation</h3>
              <p className="text-gray-400 text-sm">
                Cancel anytime with no cancellation fees
              </p>
            </div>

            <div className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 text-center">
              <XCircle size={32} className="text-red-500 mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">No Partial Refunds</h3>
              <p className="text-gray-400 text-sm">
                Payments are generally non-refundable
              </p>
            </div>

            <div className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 text-center">
              <AlertCircle size={32} className="text-yellow-500 mx-auto mb-4" />
              <h3 className="font-bold text-white mb-2">Exceptions Apply</h3>
              <p className="text-gray-400 text-sm">
                Special circumstances may qualify
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="px-6 md:px-12 py-12 bg-black">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* General Policy */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">1. General Refund Policy</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              All payments made to Zentrya are <strong>non-refundable</strong> except as expressly set forth in this policy or as required by applicable law.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We do not provide refunds or credits for partial subscription periods. If you cancel your subscription, you will continue to have access to the Service through the end of your current billing period.
            </p>
          </div>

          {/* Billing Cycles */}
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">2. Billing Cycles</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Zentrya offers the following billing cycles:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
              <li><strong>Monthly:</strong> Billed every 30 days</li>
              <li><strong>Quarterly:</strong> Billed every 90 days (where available)</li>
              <li><strong>Annually:</strong> Billed every 365 days (where available)</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              Your billing cycle begins on the day you complete your subscription registration. Subsequent charges will occur on the same day of each billing period.
            </p>
          </div>

          {/* Cancellation */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">3. Cancellation Policy</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              You may cancel your Zentrya subscription at any time through your account settings or by contacting customer support.
            </p>
            
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-4">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle size={20} className="text-yellow-500" />
                How to Cancel:
              </h3>
              <ol className="list-decimal list-inside text-gray-300 space-y-2 ml-4">
                <li>Log in to your Zentrya account</li>
                <li>Go to Account Settings</li>
                <li>Navigate to Subscription</li>
                <li>Click "Cancel Subscription"</li>
                <li>Confirm your cancellation</li>
              </ol>
            </div>

            <p className="text-gray-300 leading-relaxed mb-4">
              <strong>Effective Date:</strong> Your cancellation will take effect at the end of your current billing period. You will not be charged for subsequent billing periods.
            </p>
            <p className="text-gray-300 leading-relaxed">
              <strong>Access:</strong> You will maintain full access to the Service until the end of your current paid period.
            </p>
          </div>

          {/* Free Trials */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">4. Free Trial Policy</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Zentrya may offer free trial periods to new subscribers from time to time. Free trial terms:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
              <li>Free trials are available to new subscribers only</li>
              <li>One free trial per user/household</li>
              <li>Trial length varies by promotion (typically 7-30 days)</li>
              <li>You must provide payment information to start a free trial</li>
              <li>You will be automatically charged at the end of the trial unless you cancel</li>
            </ul>
            
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold flex items-center gap-2">
                <CheckCircle size={20} />
                Cancel Before Trial Ends = No Charge
              </p>
              <p className="text-gray-300 text-sm mt-2">
                If you cancel your subscription before the free trial ends, you will not be charged.
              </p>
            </div>
          </div>

          {/* Refund Exceptions */}
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">5. Refund Exceptions</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We may issue refunds in the following circumstances:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white mb-1">Technical Issues</h4>
                  <p className="text-gray-300 text-sm">
                    If we are unable to provide the Service due to technical issues on our end for an extended period
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white mb-1">Unauthorized Charges</h4>
                  <p className="text-gray-300 text-sm">
                    If you were charged due to unauthorized use of your payment method
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white mb-1">Billing Errors</h4>
                  <p className="text-gray-300 text-sm">
                    If we made an error in billing your account
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white mb-1">Legal Requirements</h4>
                  <p className="text-gray-300 text-sm">
                    Where required by applicable law or regulation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">6. Payment Methods</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We accept the following payment methods:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
              <li><strong>Mobile Money:</strong> M-Pesa, Airtel Money, Tigo Pesa</li>
              <li><strong>Credit/Debit Cards:</strong> Visa, Mastercard</li>
              <li><strong>Bank Transfer:</strong> Direct bank transfers (where available)</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              Refunds, when applicable, will be processed to the original payment method within 7-14 business days.
            </p>
          </div>

          {/* Disputed Charges */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">7. Disputed Charges</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you believe you have been incorrectly charged, please contact us immediately at billing@zentrya.com or +255 123 456 789.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Please provide the following information:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
              <li>Your account email address</li>
              <li>Transaction date and amount</li>
              <li>Detailed description of the issue</li>
              <li>Supporting documentation (if applicable)</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              We will investigate all disputes within 5-7 business days and respond with our findings.
            </p>
          </div>

          {/* Price Changes */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">8. Price Changes</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We may change our subscription fees from time to time. We will provide you with at least 30 days' notice before any price increase takes effect.
            </p>
            <p className="text-gray-300 leading-relaxed">
              If you do not wish to accept the new pricing, you may cancel your subscription before the price change takes effect. If you do not cancel, your continued use of the Service constitutes acceptance of the new price.
            </p>
          </div>

          {/* Taxes */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">9. Taxes</h2>
            <p className="text-gray-300 leading-relaxed">
              All prices are listed inclusive of applicable Tanzanian VAT (Value Added Tax). If tax rates change, your subscription price may be adjusted accordingly. We will notify you of any tax-related price changes.
            </p>
          </div>

          {/* Contact for Refunds */}
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">10. Requesting a Refund</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              If you believe you qualify for a refund under this policy, please contact our billing support team:
            </p>
            
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <DollarSign size={20} className="text-yellow-500" />
                  <div>
                    <p className="text-white font-semibold">Email:</p>
                    <a href="mailto:billing@zentrya.com" className="text-yellow-500 hover:text-yellow-400">
                      billing@zentrya.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CreditCard size={20} className="text-yellow-500" />
                  <div>
                    <p className="text-white font-semibold">Phone:</p>
                    <a href="tel:+255123456789" className="text-yellow-500 hover:text-yellow-400">
                      +255 123 456 789
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm mt-4">
              Our billing team typically responds within 1-2 business days. Approved refunds are processed within 7-14 business days.
            </p>
          </div>

          {/* Legal Compliance */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">11. Legal Compliance</h2>
            <p className="text-gray-300 leading-relaxed">
              This Refund Policy is governed by Tanzanian consumer protection laws. Nothing in this policy limits your statutory rights as a consumer under applicable law.
            </p>
          </div>

          {/* Related Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Related Legal Documents</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                to="/terms"
                className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all group"
              >
                <FileText size={24} className="text-yellow-500 mb-3" />
                <h4 className="font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                  Terms of Use
                </h4>
                <p className="text-gray-400 text-sm">
                  Complete terms governing use of Zentrya
                </p>
              </Link>

              <Link 
                to="/contact"
                className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all group"
              >
                <AlertCircle size={24} className="text-yellow-500 mb-3" />
                <h4 className="font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                  Contact Support
                </h4>
                <p className="text-gray-400 text-sm">
                  Get help with billing and refunds
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-16 bg-black border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="text-3xl font-bold mb-3">
              <span className="text-yellow-500">ZEN</span>
              <span className="text-white">TRYA</span>
            </div>
            <p className="text-gray-400">The Future of Entertainment in Tanzania 🇹🇿</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/press" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/copyright" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    Copyright Policy
                  </Link>
                </li>
                <li>
                  <Link to="/refund" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/devices" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    Supported Devices
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">Business</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/licensing" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    Content Licensing
                  </Link>
                </li>
                <li>
                  <Link to="/advertise" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    Advertise With Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-900">
            <p className="text-gray-500 text-sm text-center">
              &copy; 2026 Zentrya. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}