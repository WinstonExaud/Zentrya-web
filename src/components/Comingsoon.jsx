// src/components/Upcoming.jsx
// Coming Soon page - Web streaming not available yet

import { Link } from "react-router-dom";
import { Download, Smartphone, Apple, ArrowRight, Sparkles } from "lucide-react";

export default function Upcoming() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold tracking-wider">
              <span className="text-yellow-500">ZEN</span>
              <span className="text-white">TRYA</span>       
              <span className="text-yellow-500"> TV</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link 
              to="/" 
              className="text-sm font-medium text-gray-400 hover:text-yellow-500 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/application" 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-5 py-2 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/50"
            >
              Download App
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-500/10 backdrop-blur-md border border-yellow-500/30 rounded-full mb-8 shadow-lg">
              <Sparkles size={20} className="text-yellow-400" />
              <span className="text-yellow-400 font-bold text-sm tracking-wide">COMING SOON</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-gradient mb-3">
                Feature Unavailable
              </span>
              <span className="block text-white">Coming Soon</span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              This feature is not available yet. Download our mobile app to start streaming premium content now.
            </p>


            {/* Alternative Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/"
                className="text-gray-400 hover:text-yellow-500 font-medium transition-colors flex items-center gap-2"
              >
                <ArrowRight size={20} className="rotate-180" />
                <span>Back to Home</span>
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-yellow-500 font-medium transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-900 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo */}
            <div className="text-xl font-bold tracking-wider">
              <span className="text-yellow-500">ZEN</span>
              <span className="text-white">TRYA</span>       
              <span className="text-yellow-500"> TV</span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <Link to="/about" className="text-gray-400 hover:text-yellow-500 transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Contact
              </Link>
              <Link to="/help" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Help
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-yellow-500 transition-colors">
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

      {/* Gradient Animation */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </div>
  );
}