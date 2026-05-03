// src/components/NotFound.jsx
// 404 Page Not Found for Zentrya Tv - Creative error page with helpful navigation

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Home,
  Search,
  Film,
  Tv,
  ArrowLeft,
  MapPin,
  AlertCircle,
  Compass,
  HelpCircle,
  Phone,
  Mail,
  Play
} from "lucide-react";
import aboutBg from "../assets/404.jpg";

export default function NotFound() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const quickLinks = [
    {
      icon: Home,
      title: "Home",
      description: "Back to main page",
      link: "/",
      color: "yellow"
    },
    {
      icon: Film,
      title: "Movies",
      description: "Browse all movies",
      link: "/movies",
      color: "yellow"
    },
    {
      icon: Tv,
      title: "TV Shows",
      description: "Explore series",
      link: "/shows",
      color: "yellow"
    },
    {
      icon: Search,
      title: "Search",
      description: "Find what you need",
      link: "/search",
      color: "yellow"
    }
  ];

  const helpfulResources = [
    {
      icon: HelpCircle,
      title: "Help Center",
      description: "Browse FAQs and guides",
      link: "/help"
    },
    {
      icon: Phone,
      title: "Contact Support",
      description: "Get help from our team",
      link: "/contact"
    },
    {
      icon: Compass,
      title: "Site Map",
      description: "Explore all pages",
      link: "/sitemap"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans overflow-x-hidden">
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
            to="/help" 
            className="text-sm md:text-base font-medium text-white hover:text-yellow-500 transition-colors"
          >
            Help
          </Link>

          <Link 
            to="/" 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-5 py-2 md:px-6 md:py-2.5 rounded-md font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/50"
          >
            Go Home
          </Link>
        </div>
      </nav>

      {/* Hero Section - 404 Message */}
      {/* Hero Section with Background Image */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 overflow-hidden min-h-[70vh] flex items-center">
        {/* Background Image with Overlays */}
        <div className="absolute inset-0">
          <img 
            src={aboutBg} 
            alt="Zentrya Tv streaming platform" 
            className="w-full h-full object-cover"
          />
          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/10 via-transparent to-black" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* 404 Icon */}
          <div className="mb-8 inline-block">
            <div className="w-32 h-32 bg-yellow-500/10 rounded-full flex items-center justify-center border-4 border-yellow-500/20 animate-bounce">
              <AlertCircle size={64} className="text-yellow-500" />
            </div>
          </div>

          {/* 404 Number */}
          <h1 className="text-9xl md:text-[12rem] font-bold mb-6 leading-none">
            <span className="bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              404
            </span>
          </h1>

          {/* Error Message */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Oops! Page Not Found
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have wandered off into the Tanzanian sunset. 
            Let's get you back on track!
          </p>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => navigate(-1)}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-lg font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/50 inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
            <Link
              to="/"
              className="bg-gray-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-gray-700 transition-all border border-gray-700 inline-flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Home Page
            </Link>
          </div>

          {/* Fun Message */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
            <MapPin size={20} className="text-yellow-500" />
            <span className="text-yellow-500 font-semibold">Lost? We'll help you find your way!</span>
          </div>
        </div>
      </section>

      {/* Error Code Section */}
      <section className="px-6 md:px-12 py-16 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-xl border border-gray-800">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle size={24} className="text-yellow-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Technical Details</h3>
                <p className="text-gray-400 mb-4">
                  If you believe this is an error on our end, please report it to our support team.
                </p>
                <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">Error Code:</span>
                    <span className="text-yellow-500 font-mono font-semibold">404_PAGE_NOT_FOUND</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">Requested URL:</span>
                    <span className="text-white font-mono text-sm">{window.location.pathname}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">Timestamp:</span>
                    <span className="text-white font-mono text-sm">{new Date().toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 font-semibold text-sm"
                  >
                    <Mail size={16} />
                    Report This Issue
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-16 bg-black border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold mb-2">
                <span className="text-yellow-500">ZEN</span>
                <span className="text-white">TRYA</span>
              </div>
              <p className="text-gray-400">The Future of Entertainment in Tanzania 🇹🇿</p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/about" className="text-gray-400 hover:text-yellow-500 transition-colors">
                About
              </Link>
              <Link to="/help" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Help Center
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Contact
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Privacy
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-900 text-center">
            <p className="text-gray-500 text-sm">
              &copy; 2026 Zentrya Tv. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}