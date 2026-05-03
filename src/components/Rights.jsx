// src/components/CopyrightPolicy.jsx
// Copyright Policy page for Zentrya Tv

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, AlertTriangle, FileText, Mail, CheckCircle } from "lucide-react";

export default function CopyrightPolicy() {
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
            <span className="text-yellow-500"> TV</span>
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
            <Shield size={20} className="text-yellow-500" />
            <span className="text-yellow-500 font-semibold text-sm">Intellectual Property</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Copyright <span className="text-yellow-500">Policy</span>
          </h1>

          <p className="text-gray-400 text-lg mb-6">
            Last Updated: January 31, 2026
          </p>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle size={24} className="text-yellow-500 flex-shrink-0 mt-1" />
              <div className="text-left">
                <p className="text-white font-semibold mb-2">Protecting Creative Rights</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Zentrya Tv respects the intellectual property rights of others and expects users to do the same.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 md:px-12 py-12 bg-gray-900">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Ownership */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">1. Copyright Ownership</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              All content available on Zentrya Tv, including but not limited to movies, TV shows, images, text, graphics, logos, button icons, audio clips, and software, is the property of Zentrya Tv, its content suppliers, or licensors and is protected by Tanzanian and international copyright laws.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The compilation of all content on this service is the exclusive property of Zentrya Tv and protected by Tanzanian and international copyright laws.
            </p>
          </div>

          {/* Permitted Use */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">2. Permitted Use</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Subject to your compliance with these Terms of Use, Zentrya Tv grants you a limited, non-exclusive, non-transferable license to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Access and view content available on the Service</li>
              <li>Stream content for personal, non-commercial use only</li>
              <li>Download content for offline viewing where explicitly permitted</li>
            </ul>
          </div>

          {/* Prohibited Activities */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">3. Prohibited Activities</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              You may NOT:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Copy, download, reproduce, distribute, or create derivative works from our content</li>
              <li>Sell, rent, lease, or sublicense any content from the Service</li>
              <li>Remove, alter, or obscure any copyright, trademark, or proprietary notices</li>
              <li>Circumvent any digital rights management (DRM) or security features</li>
              <li>Use screen capture, recording software, or any other means to create copies</li>
              <li>Share your account or allow others to access content through your account</li>
              <li>Use content for any commercial purpose without written authorization</li>
              <li>Publicly perform or display any content from the Service</li>
            </ul>
          </div>

          {/* DMCA Notice */}
          <div className="bg-gradient-to-br from-black to-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">4. DMCA Notice</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Zentrya Tv respects the intellectual property rights of others. If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please provide our Copyright Agent with the following information:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-6">
              <li>A physical or electronic signature of the copyright owner</li>
              <li>Identification of the copyrighted work claimed to have been infringed</li>
              <li>Identification of the material that is claimed to be infringing</li>
              <li>Your contact information (address, telephone number, email)</li>
              <li>A statement of good faith belief that use is not authorized</li>
              <li>A statement of accuracy under penalty of perjury</li>
            </ul>
            
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-white font-semibold mb-2">Copyright Agent Contact:</p>
              <p className="text-gray-300 mb-1">Email: copyrights@zentrya.africa</p>
              <p className="text-gray-300 mb-1">Address: Zentrya Ltd., Dar es Salaam, Tanzania</p>
              <p className="text-gray-300">Phone: +255 741 361 767</p>
            </div>
          </div>

          {/* Counter-Notice */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">5. Counter-Notice</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you believe that content you posted was wrongly removed due to a copyright claim, you may submit a counter-notice containing:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Your physical or electronic signature</li>
              <li>Identification of the removed material</li>
              <li>A statement under penalty of perjury of good faith belief</li>
              <li>Your contact information</li>
              <li>Consent to jurisdiction of federal district court</li>
            </ul>
          </div>

          {/* Repeat Infringers */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">6. Repeat Infringers</h2>
            <p className="text-gray-300 leading-relaxed">
              Zentrya Tv will terminate the accounts of users who are repeat infringers of intellectual property rights. We reserve the right to terminate accounts of users who violate copyright laws, whether or not there is repeat infringement.
            </p>
          </div>

          {/* Trademarks */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">7. Trademarks</h2>
            <p className="text-gray-300 leading-relaxed">
              Zentrya Tv and all related logos, product and service names, designs, and slogans are trademarks of Zentrya Ltd. You may not use these marks without our prior written permission. All other names, logos, product and service names, designs, and slogans on this Service are the trademarks of their respective owners.
            </p>
          </div>

          {/* Content Licensing */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">8. Content Licensing Inquiries</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you are interested in licensing content from Zentrya Tv for commercial purposes, please contact our business development team:
            </p>
            <p className="text-gray-300 leading-relaxed">
              Email: copyrights@zentrya.africa<br />
              Visit: <Link to="/licensing" className="text-yellow-500 hover:text-yellow-400">Content Licensing Page</Link>
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-black to-gray-800 p-8 rounded-xl border border-gray-700">
            <div className="flex items-start gap-4">
              <Mail size={32} className="text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">Questions About Copyright?</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  For any questions regarding our Copyright Policy or to report copyright infringement, 
                  please contact our legal team.
                </p>
                <a 
                  href="mailto:copyrights@zentrya.africa"
                  className="inline-flex items-center gap-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 px-4 py-2 rounded-md font-semibold transition-all border border-yellow-500/20"
                >
                  Email Copyright Team
                </a>
              </div>
            </div>
          </div>

          {/* Related Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Related Legal Documents</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                to="/terms"
                className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all group"
              >
                <FileText size={24} className="text-yellow-500 mb-3" />
                <h4 className="font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                  Terms of Use
                </h4>
                <p className="text-gray-400 text-sm">
                  Complete terms governing use of Zentrya Tv
                </p>
              </Link>

              <Link 
                to="/privacy"
                className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all group"
              >
                <Shield size={24} className="text-yellow-500 mb-3" />
                <h4 className="font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                  Privacy Policy
                </h4>
                <p className="text-gray-400 text-sm">
                  How we protect your personal data
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
              <span className="text-yellow-500"> TV</span>
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

                    {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-900">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                &copy; 2026 Zentrya Tv. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="https://www.facebook.com/Zentrya Tv" className="text-gray-500 hover:text-yellow-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/Zentrya Tv" className="text-gray-500 hover:text-yellow-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/zentryatv" className="text-gray-500 hover:text-yellow-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/zentryamedia" className="text-gray-500 hover:text-yellow-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}