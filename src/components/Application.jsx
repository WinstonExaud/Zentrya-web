// src/components/Application.jsx
// Minimalist app download page for Zentrya

import { Link } from "react-router-dom";

export default function Application() {
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
              to="/waitlist" 
              className="text-sm font-medium text-gray-600 hover:text-yellow-500 transition-colors"
            >
              Join iOS Waitlist
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center min-h-[calc(100vh-180px)]">
            {/* Left Side - App Preview */}
            <div className="relative">
              <div className="absolute top-6 left-6 bg-black text-white px-4 py-2 rounded-md text-xs font-medium shadow-lg z-10">
                ← Download
              </div>
              <div className="relative aspect-[3/4] bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-3xl overflow-hidden shadow-2xl">
                {/* Placeholder for app screenshot/preview image */}
                <img 
                  src="/app-preview.jpeg" 
                  alt="Zentrya App Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Side - App Info */}
            <div className="text-center md:text-left">
              {/* App Icon */}
              <div className="mb-8 flex justify-center md:justify-start">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl shadow-xl flex items-center justify-center overflow-hidden">
                  {/* Placeholder for app icon */}
                  <img 
                    src="/Z.png" 
                    alt="Zentrya Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* App Name */}
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-black">
                ZENTRYA
              </h1>
              
              {/* Subtitle */}
              <p className="text-gray-500 text-sm mb-8 uppercase tracking-wide">
                by Zentrya Ltd.
              </p>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-10">
                {/* App Store Badge */}
                <Link
                  to="/waitlist"
                className="inline-block hover:opacity-80 transition-opacity"
>
                <img
                  src="/app-store.png"
                  alt="Join the Waitlist"
                  className="h-12"
                    />
                  </Link>

                {/* Google Play Badge */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.zentrya.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-80 transition-opacity"
                >
                  <img 
                    src="/play-store.png" 
                    alt="Get it on Google Play"
                    className="h-12"
                  />
                </a>
              </div>

              {/* Description Section */}
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-xl font-bold mb-4 text-black">Description</h2>
                <div className="text-gray-600 space-y-3 text-sm leading-relaxed">
                  <p>** Your World of African Stories **</p>
                  <p>** Made for Tanzanians **</p>
                  <p className="pt-4">
                    Experience premium entertainment with Zentrya. Stream exclusive content, 
                    live events, and Tanzanian originals. Available on Android now, iOS coming soon.
                  </p>
                  <Link 
                    to="/about"
                    className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium mt-4 transition-colors"
                  >
                    LEARN MORE →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
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
              © 2026 Zentrya. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}