// src/components/LandingPage.jsx
// Enhanced landing page with real backend integration - Netflix-style for Zentrya Tv Tanzania

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tv, Download, Smartphone, Users, ChevronRight, Play, Star } from "lucide-react";
import apiService from "../services/api";

// Import your hero background image
import heroBackground from "../assets/ai.jpg"; // Update this path to your actual image

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Fetch trending movies from backend
  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchTrendingMovies = async () => {
    setLoading(true);
    try {
      // Fetch trending/featured movies
      const response = await apiService.getTrendingMovies();
      
      // Handle both array and object response
      const movies = Array.isArray(response) ? response : response.movies || [];
      
      setTrendingMovies(movies.slice(0, 12)); // Show top 12
      
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      // Don't show error to users on landing page, just log it
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleGetStarted = () => {
    setEmailError("");
    
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    // Navigate to signup with email pre-filled
    // navigate(`/signup?email=${encodeURIComponent(email)}`);
    navigate(`/coming-soon`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGetStarted();
    }
  };

  return (
    <main className="min-h-screen w-full bg-black text-white font-sans">
      {/* Fixed Navbar */}
      <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 py-4 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-sm" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}>
        <div className="flex items-center gap-8">
          <div className="text-2xl md:text-3xl font-bold tracking-wider">
            <span className="text-yellow-500">ZEN</span>
            <span className="text-white">TRYA</span>
            <span className="text-yellow-500"> TV</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to="/coming-soon" 
            className="text-sm md:text-base font-medium text-white hover:text-yellow-500 transition-colors"
          >
            Sign In
          </Link>

          <Link 
            to="/coming-soon" 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-5 py-2 md:px-6 md:py-2.5 rounded-md font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/50"
          >
            Join Now
          </Link>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroBackground} 
            alt="Zentrya Tv Hero" 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image doesn't load
              e.currentTarget.style.display = 'none';
            }}
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-12 max-w-3xl">
          {/* Gold Tanzania Badge */}
          <div className="mb-4 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/50 rounded-full backdrop-blur-sm">
            <span className="text-yellow-500 font-semibold text-sm">🇹🇿 Made for Tanzania</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-yellow-100 to-yellow-500 bg-clip-text text-transparent">
              Endless Movies,
            </span>
            <br />
            <span className="text-white">
              Shows & More
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-200 mb-4 font-medium">
            Watch the best of Tanzania and Africa.
          </p>
          
          <p className="text-base md:text-lg text-gray-300 mb-8">
            Start your journey with Zentrya tv today.
          </p>

          {/* Email CTA */}
          <div className="w-full max-w-2xl">
            <p className="text-base md:text-lg mb-4 text-gray-200">
              Ready to Dive In? Enter your email to get started
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  onKeyPress={handleKeyPress}
                  className={`w-full px-5 py-4 rounded-md text-white text-base bg-black/50 backdrop-blur-sm border ${
                    emailError ? 'border-red-500' : 'border-gray-600'
                  } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all`}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-2">{emailError}</p>
                )}
              </div>
              <button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-md font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/50 whitespace-nowrap flex items-center justify-center gap-2 hover:scale-105 transform"
              >
                Get Started
                <ChevronRight size={24} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
      </section>

      {/* Trending Movies Section */}
      <section className="relative z-20 px-6 md:px-12 pb-20 -mt-32">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-4xl font-bold">
            <span className="text-yellow-500">Trending</span> Now
          </h2>
          {!loading && trendingMovies.length > 0 && (
            <Link 
              to="/coming-soon" 
              className="text-yellow-500 hover:text-yellow-400 font-semibold flex items-center gap-2 transition-colors"
            >
              Explore All
              <ChevronRight size={20} />
            </Link>
          )}
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-[2/3] rounded-lg bg-gray-800 animate-pulse" />
            ))}
          </div>
        ) : trendingMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingMovies.map((movie) => (
              <div
                key={movie.id}
                className="group relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10"
              >
                {/* Movie Poster */}
                {(movie.poster_url || movie.thumbnail_url) ? (
                  <img 
                    src={movie.poster_url || movie.thumbnail_url} 
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}
                
                {/* Fallback gradient background */}
                <div className={`w-full h-full bg-gradient-to-br from-yellow-900/30 via-black to-black flex items-center justify-center ${
                  (movie.poster_url || movie.thumbnail_url) ? 'absolute inset-0 -z-10' : ''
                }`}>
                  {!(movie.poster_url || movie.thumbnail_url) && (
                    <span className="text-yellow-500/50 text-sm text-center px-4 font-semibold">
                      {movie.title}
                    </span>
                  )}
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-sm mb-2 text-white line-clamp-2">{movie.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-yellow-500 text-sm font-semibold">
                        {movie.rating ? movie.rating.toFixed(1) : 'N/A'}
                      </span>
                    </div>
                    <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-md text-xs transition-colors flex items-center justify-center gap-2">
                      <Play size={14} fill="currentColor" />
                      Watch Now
                    </button>
                  </div>
                </div>

                {/* Top Badge */}
                {movie.is_featured && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                    FEATURED
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Coming soon! Check back for trending content.</p>
          </div>
        )}
      </section>

      {/* More Reasons to Join Section */}
      <section className="px-6 md:px-12 py-24 bg-black">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 max-w-6xl mx-auto">
          Why You’ll Love <span className="text-yellow-500">Zentrya tv</span>
        </h2>
        <p className="text-gray-400 text-lg mb-16 max-w-6xl mx-auto">
          A New Way to Experience Entertainment
        </p>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-yellow-900/20 via-black to-black rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-500/50 transition-all group hover:scale-105 transform duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/30 to-yellow-600/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Tv size={40} className="text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Entertainment, Bigger and Better</h3>
            <p className="text-gray-300 leading-relaxed">
              Watch Zentrya tv on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, and more. Bring cinema home.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-yellow-900/20 via-black to-black rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-500/50 transition-all group hover:scale-105 transform duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-yellow-500/50">
              <Download size={40} className="text-black" strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Take It With You</h3>
            <p className="text-gray-300 leading-relaxed">
              Download your favorites and watch wherever you go. No internet needed.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-br from-yellow-900/20 via-black to-black rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-500/50 transition-all group hover:scale-105 transform duration-300">
            <div className="w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Smartphone size={52} className="text-yellow-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Watch on All Your Devices</h3>
            <p className="text-gray-300 leading-relaxed">
              From phone to TV, enjoy seamless streaming wherever you are.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-gradient-to-br from-yellow-900/20 via-black to-black rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-500/50 transition-all group hover:scale-105 transform duration-300">
            <div className="w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users size={52} className="text-yellow-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Made for the Whole Family</h3>
            <p className="text-gray-300 leading-relaxed">
              Personalized profiles with parental controls, designed for family peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 md:px-12 py-24 bg-black">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 max-w-5xl mx-auto">
          Frequently Asked <span className="text-yellow-500">Questions</span>
        </h2>
        <p className="text-gray-400 text-lg mb-12 max-w-5xl mx-auto">
          Discover Zentrya tv
        </p>
        
        <div className="max-w-5xl mx-auto space-y-3">
          <details className="bg-gradient-to-r from-gray-900 to-gray-900/90 hover:from-gray-800 hover:to-gray-800/90 transition-all group rounded-lg overflow-hidden border border-gray-800 hover:border-yellow-500/30">
            <summary className="px-6 md:px-8 py-6 cursor-pointer flex items-center justify-between text-lg md:text-xl font-bold">
              <span className="text-white">What is Zentrya tv?</span>
              <span className="text-3xl md:text-4xl text-yellow-500 group-open:rotate-45 transition-transform duration-300">+</span>
            </summary>
            <div className="px-6 md:px-8 pb-6 text-gray-300 leading-relaxed space-y-4">
              <p>Zentrya tv is Tanzania’s premier streaming platform, designed to bring the best of local and international entertainment right to your fingertips. Whether you love movies, TV series, documentaries, or short films, Zentrya tv has something for everyone.</p>
              <p>Enjoy unlimited content anytime. Fresh movies and shows added weekly.</p>
            </div>
          </details>

          <details className="bg-gradient-to-r from-gray-900 to-gray-900/90 hover:from-gray-800 hover:to-gray-800/90 transition-all group rounded-lg overflow-hidden border border-gray-800 hover:border-yellow-500/30">
            <summary className="px-6 md:px-8 py-6 cursor-pointer flex items-center justify-between text-lg md:text-xl font-bold">
              <span className="text-white">How much does Zentrya tv cost?</span>
              <span className="text-3xl md:text-4xl text-yellow-500 group-open:rotate-45 transition-transform duration-300">+</span>
            </summary>
            <div className="px-6 md:px-8 pb-6 text-gray-300 leading-relaxed">
              <p>Plans range from <span className="text-yellow-500 font-semibold">TZS 2,999</span> to <span className="text-yellow-500 font-semibold">TZS 9,999</span> per month. No Commitments. Cancel Anytime.</p>
            </div>
          </details>

          <details className="bg-gradient-to-r from-gray-900 to-gray-900/90 hover:from-gray-800 hover:to-gray-800/90 transition-all group rounded-lg overflow-hidden border border-gray-800 hover:border-yellow-500/30">
            <summary className="px-6 md:px-8 py-6 cursor-pointer flex items-center justify-between text-lg md:text-xl font-bold">
              <span className="text-white">Where can I watch?</span>
              <span className="text-3xl md:text-4xl text-yellow-500 group-open:rotate-45 transition-transform duration-300">+</span>
            </summary>
            <div className="px-6 md:px-8 pb-6 text-gray-300 leading-relaxed">
              <p>Watch on smart TVs, smartphones, tablets, computers, and game consoles. Access Zentrya Tv on any internet-connected device.</p>
            </div>
          </details>

          <details className="bg-gradient-to-r from-gray-900 to-gray-900/90 hover:from-gray-800 hover:to-gray-800/90 transition-all group rounded-lg overflow-hidden border border-gray-800 hover:border-yellow-500/30">
            <summary className="px-6 md:px-8 py-6 cursor-pointer flex items-center justify-between text-lg md:text-xl font-bold">
              <span className="text-white">How do I cancel?</span>
              <span className="text-3xl md:text-4xl text-yellow-500 group-open:rotate-45 transition-transform duration-300">+</span>
            </summary>
            <div className="px-6 md:px-8 pb-6 text-gray-300 leading-relaxed">
              <p>Cancel anytime with just two clicks. No commitments, no cancellation fees. Your flexibility is our priority.</p>
            </div>
          </details>

          <details className="bg-gradient-to-r from-gray-900 to-gray-900/90 hover:from-gray-800 hover:to-gray-800/90 transition-all group rounded-lg overflow-hidden border border-gray-800 hover:border-yellow-500/30">
            <summary className="px-6 md:px-8 py-6 cursor-pointer flex items-center justify-between text-lg md:text-xl font-bold">
              <span className="text-white">What can I watch on Zentrya tv?</span>
              <span className="text-3xl md:text-4xl text-yellow-500 group-open:rotate-45 transition-transform duration-300">+</span>
            </summary>
            <div className="px-6 md:px-8 pb-6 text-gray-300 leading-relaxed">
              <p>Enjoy an extensive library featuring Tanzanian films, African cinema, Africa blockbusters, documentaries, TV series and exclusive Zentrya Tv Originals.</p>
            </div>
          </details>

          <details className="bg-gradient-to-r from-gray-900 to-gray-900/90 hover:from-gray-800 hover:to-gray-800/90 transition-all group rounded-lg overflow-hidden border border-gray-800 hover:border-yellow-500/30">
            <summary className="px-6 md:px-8 py-6 cursor-pointer flex items-center justify-between text-lg md:text-xl font-bold">
              <span className="text-white">Is Zentrya tv good for the family?</span>
              <span className="text-3xl md:text-4xl text-yellow-500 group-open:rotate-45 transition-transform duration-300">+</span>
            </summary>
            <div className="px-6 md:px-8 pb-6 text-gray-300 leading-relaxed space-y-4">
              <p>Absolutely! profiles feature PIN-protected, age-appropriate content, and a safe viewing environment.</p>
              <p>Control maturity ratings, enjoy family-friendly entertainment.</p>
            </div>
          </details>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 md:px-12 py-24 bg-gradient-to-b from-black via-gray-900 to-black text-center border-t border-yellow-500/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-yellow-500">Watch?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10">
            Tanzania Is Watching
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              onKeyPress={handleKeyPress}
              className="flex-1 px-6 py-4 rounded-md text-white text-base bg-gray-900/80 backdrop-blur-sm border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
            />
            <button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-10 py-4 rounded-md font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/50 whitespace-nowrap flex items-center justify-center gap-2 hover:scale-105 transform"
            >
              Get Started
              <ChevronRight size={24} strokeWidth={3} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-16 bg-black border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Brand */}
          <div className="mb-12">
            <div className="text-3xl font-bold mb-3">
              <span className="text-yellow-500">ZEN</span>
              <span className="text-white">TRYA</span>              <span className="text-yellow-500"> TV</span>
            </div>
            <p className="text-gray-400">The Future of Entertainment in Tanzania 🇹🇿</p>
          </div>
          
          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Company */}
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

            {/* Legal */}
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

            {/* Support */}
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

            {/* Business */}
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
    </main>
  );
}