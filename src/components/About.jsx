// src/components/About.jsx
// About Us page for Zentrya - Netflix-style with Tanzania focus

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Users, 
  Globe, 
  Award, 
  Target, 
  Zap,
  Film,
  Smartphone,
  Shield,
  TrendingUp,
  ChevronRight,
  PlayCircle,
  Mail,
  MapPin,
  Phone,
  Tv,
  Star,
  Sparkles
} from "lucide-react";
import aboutBg from "../assets/couple.jpg";

export default function About() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const contentFocus = [
    {
      icon: Film,
      title: "Tanzanian Cinema",
      description: "Original Swahili films, Bongo movies, and local documentaries celebrating our rich cultural heritage."
    },
    {
      icon: Globe,
      title: "African Stories",
      description: "Pan-African content from Nollywood, Kenya, South Africa, and across the continent."
    },
    {
      icon: Sparkles,
      title: "Exclusive Originals",
      description: "Zentrya Original productions featuring Tanzanian talent and stories that matter to us."
    }
  ];

  const techFeatures = [
    {
      icon: Smartphone,
      title: "Mobile First Design",
      description: "Built for Tanzanian mobile networks with adaptive streaming and offline downloads"
    },
    {
      icon: Zap,
      title: "Lightning Fast CDN",
      description: "Global content delivery network ensures instant playback across Tanzania"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and secure payments with 99.9% uptime guarantee"
    },
    {
      icon: Tv,
      title: "Multi-Device Support",
      description: "Stream on phones, tablets, computers, and smart TVs with seamless syncing"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans">
      {/* Fixed Navbar */}
      <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 py-4 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}>
        <Link to="/" className="flex items-center gap-8">
          <div className="text-2xl md:text-3xl font-bold tracking-wider">
            <span className="text-yellow-500">ZEN</span>
            <span className="text-white">TRYA</span>
          </div>
        </Link>

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
      <section className="relative pt-32 pb-24 px-6 md:px-12 overflow-hidden min-h-[70vh] flex items-center">
        {/* Background Image with Overlays */}
        <div className="absolute inset-0">
          <img 
            src={aboutBg} 
            alt="Zentrya streaming platform" 
            className="w-full h-full object-cover"
          />
          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/10 via-transparent to-black" />
        </div>

        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.08) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />

        <div className="relative max-w-5xl mx-auto text-center z-10">
    

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-white via-yellow-100 to-yellow-400 bg-clip-text text-transparent mb-2">
              Premium Entertainment
            </span>
            <span className="block text-white">Built for Tanzania</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Zentrya brings world-class streaming to Tanzania with African stories, global blockbusters, 
            and cutting-edge technology designed for our audience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/coming-soon"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-10 py-4 rounded-lg font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/50 flex items-center justify-center gap-2 hover:scale-105 transform"
            >
              Start Watching
              <PlayCircle size={24} />
            </Link>
            <a 
              href="#mission"
              className="bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all border border-white/30 flex items-center justify-center gap-2"
            >
              Learn More
              <ChevronRight size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Who Zentrya Is Section */}
      <section className="px-6 md:px-12 py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Who <span className="text-yellow-500">Zentrya</span> Is
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                <span className="text-yellow-500 font-semibold">Zentrya</span> is a next-generation 
                streaming platform built to empower storytellers, delight audiences, and redefine 
                entertainment across Africa and beyond.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                It combines cutting-edge streaming technology with a curated library of films, series, 
                and original content — all delivered with superior performance and a user-first experience.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                Zentrya's mission is to make high-quality entertainment universally accessible, locally 
                relevant, and technologically seamless — whether on mobile data, home Wi-Fi, or 
                low-bandwidth environments.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">2025</div>
                  <div className="text-sm text-gray-400">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">99.9%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-yellow-500/30 shadow-2xl shadow-yellow-500/20">
                <div className="w-full h-full bg-gradient-to-br from-yellow-900/30 via-gray-900 to-black flex items-center justify-center">
                  <div className="text-center p-8">
                    <Film size={80} className="text-yellow-500 mx-auto mb-6 opacity-50" />
                    <p className="text-gray-400 italic text-lg">
                      "Your World of African Stories,<br /> Delivered Seamlessly."
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" className="px-6 md:px-12 py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Mission & <span className="text-yellow-500">Vision</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-6" />
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Driving the future of entertainment across East Africa
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-yellow-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black p-10 rounded-2xl border border-yellow-500/30 hover:border-yellow-500/50 transition-all">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target size={32} className="text-yellow-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  To provide every Tanzanian with affordable, accessible, and high-quality entertainment 
                  that celebrates African culture while connecting them to the world's best content. 
                  We're democratizing premium streaming across East Africa.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-yellow-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black p-10 rounded-2xl border border-yellow-500/30 hover:border-yellow-500/50 transition-all">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe size={32} className="text-yellow-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  To become East Africa's leading streaming platform, expanding across Tanzania, Kenya, 
                  Uganda, Rwanda, and beyond. We envision a future where African stories dominate global 
                  screens and Zentrya serves as the gateway to world-class entertainment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Focus Section */}
      <section className="px-6 md:px-12 py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Content <span className="text-yellow-500">Focus</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-6" />
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              A perfect blend of African heritage and global entertainment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentFocus.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all" />
                  <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-yellow-500/40 transition-all group-hover:scale-105 transform duration-300">
                    <div className="w-14 h-14 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-yellow-500/20 transition-colors">
                      <Icon size={28} className="text-yellow-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="px-6 md:px-12 py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powered by <span className="text-yellow-500">Technology</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-6" />
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Enterprise-grade infrastructure built for serious streaming
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {techFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all" />
                  <div className="relative bg-gradient-to-br from-gray-800 to-black p-8 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-14 h-14 bg-yellow-500/10 rounded-lg flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                        <Icon size={28} className="text-yellow-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tech Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl border border-gray-800 text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">HD</div>
              <div className="text-sm text-gray-400">HD Quality</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl border border-gray-800 text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">5+</div>
              <div className="text-sm text-gray-400">Devices Supported</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl border border-gray-800 text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">CDN</div>
              <div className="text-sm text-gray-400">Global Delivery</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl border border-gray-800 text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">24/7</div>
              <div className="text-sm text-gray-400">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Legal Section */}
      <section className="px-6 md:px-12 py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get in <span className="text-yellow-500">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-6" />
            <p className="text-gray-400 text-lg">
              Questions? We're here to help
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all text-center group">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500/20 transition-colors">
                <Mail size={28} className="text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Email Us</h3>
              <p className="text-gray-400 text-sm mb-3">We respond within 24 hours</p>
              <a href="mailto:support@zentrya.africa" className="text-yellow-500 hover:text-yellow-400 transition-colors font-medium">
                support@zentrya.africa
              </a>
            </div>

            {/* Location */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all text-center group">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500/20 transition-colors">
                <MapPin size={28} className="text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Visit Us</h3>
              <p className="text-gray-400 text-sm mb-3">Headquarters</p>
              <p className="text-yellow-500 font-medium">
                Dar es Salaam, Tanzania
              </p>
            </div>

            {/* Phone */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all text-center group">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500/20 transition-colors">
                <Phone size={28} className="text-yellow-500" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">Call Us</h3>
              <p className="text-gray-400 text-sm mb-3">Mon-Fri, 9AM-6PM EAT</p>
              <a href="tel:+255123456789" className="text-yellow-500 hover:text-yellow-400 transition-colors font-medium">
                +255 741 361 767
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Start <span className="text-yellow-500">Streaming?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of Tanzanians enjoying premium entertainment. Start your journey today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/coming-soon"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-10 py-4 rounded-lg font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/50 flex items-center justify-center gap-2 hover:scale-105 transform"
            >
              Get Started
              <ChevronRight size={24} strokeWidth={3} />
            </Link>
            <Link 
              to="/coming-soon"
              className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
            >
              View Plans
            </Link>
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
              <span className="text-white">TRYA</span>
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
                  <Link to="/coming-soon" className="text-gray-400 hover:text-yellow-500 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/coming-soon" className="text-gray-400 hover:text-yellow-500 transition-colors">
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
                &copy; 2026 Zentrya. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="https://www.facebook.com/zentrya" className="text-gray-500 hover:text-yellow-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/zentrya" className="text-gray-500 hover:text-yellow-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/zentrya_" className="text-gray-500 hover:text-yellow-500 transition-colors">
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