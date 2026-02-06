// src/components/Press.jsx
// Press & Media page for Zentrya - Press releases, media kit, news coverage

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Newspaper,
  Download,
  Mail,
  Phone,
  Globe,
  Calendar,
  Award,
  TrendingUp,
  Users,
  Image as ImageIcon,
  FileText,
  Video,
  Mic,
  ExternalLink,
  ChevronRight,
  CheckCircle,
  Send
} from "lucide-react";

export default function Press() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    organization: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { number: "50K+", label: "Active Users", icon: Users },
    { number: "10K+", label: "Content Library", icon: Video },
    { number: "2024", label: "Founded", icon: Calendar },
    { number: "TZ", label: "Tanzania Based", icon: Globe }
  ];

  const pressReleases = [
    {
      id: 1,
      category: "launch",
      title: "Zentrya Launches Tanzania's Premier Streaming Platform",
      date: "December 1, 2024",
      excerpt: "Revolutionary streaming service brings world-class entertainment to Tanzanian audiences with focus on local content and affordable access.",
      image: null,
      featured: true
    },
    {
      id: 2,
      category: "product",
      title: "Zentrya Introduces Mobile Apps for iOS and Android",
      date: "January 15, 2025",
      excerpt: "New mobile applications make streaming accessible across Tanzania with optimized data usage and offline download capabilities.",
      image: null,
      featured: true
    },
    {
      id: 3,
      category: "partnership",
      title: "Zentrya Partners with Leading African Content Creators",
      date: "November 20, 2024",
      excerpt: "Strategic partnerships announced to bring exclusive African cinema and original content to the platform.",
      image: null,
      featured: false
    },
    {
      id: 4,
      category: "expansion",
      title: "Zentrya Announces Regional Expansion Plans for East Africa",
      date: "October 10, 2024",
      excerpt: "Platform set to expand across Kenya, Uganda, and Rwanda in 2025, bringing Tanzanian innovation to the region.",
      image: null,
      featured: false
    },
    {
      id: 5,
      category: "milestone",
      title: "Zentrya Reaches 50,000 Active Users in First Quarter",
      date: "September 5, 2024",
      excerpt: "Rapid growth demonstrates strong demand for locally-focused streaming services in Tanzania.",
      image: null,
      featured: false
    },
    {
      id: 6,
      category: "product",
      title: "Zentrya Launches Family Profiles and Parental Controls",
      date: "August 15, 2024",
      excerpt: "New features enable safer viewing for children with customizable content restrictions and individual family profiles.",
      image: null,
      featured: false
    }
  ];

  const mediaKitItems = [
    {
      title: "Company Logo Pack",
      description: "Zentrya logos in various formats (PNG, SVG, EPS)",
      icon: ImageIcon,
      size: "2.5 MB",
      type: "ZIP"
    },
    {
      title: "Brand Guidelines",
      description: "Complete brand identity guidelines and usage rules",
      icon: FileText,
      size: "8.4 MB",
      type: "PDF"
    },
    {
      title: "Product Screenshots",
      description: "High-resolution screenshots of our platform",
      icon: ImageIcon,
      size: "15.2 MB",
      type: "ZIP"
    },
    {
      title: "Founder Photos",
      description: "Professional headshots and team photos",
      icon: ImageIcon,
      size: "12.8 MB",
      type: "ZIP"
    },
    {
      title: "Press Kit PDF",
      description: "Comprehensive company overview and fact sheet",
      icon: FileText,
      size: "3.1 MB",
      type: "PDF"
    },
    {
      title: "Video Assets",
      description: "Platform demos and promotional videos",
      icon: Video,
      size: "125 MB",
      type: "ZIP"
    }
  ];

  const mediaCoverage = [
    {
      outlet: "The Citizen Tanzania",
      title: "Zentrya: The Tanzanian Startup Revolutionizing Entertainment",
      date: "November 25, 2024",
      link: "#",
      logo: null
    },
    {
      outlet: "Daily News Tanzania",
      title: "Local Streaming Platform Zentrya Challenges Global Giants",
      date: "October 18, 2024",
      link: "#",
      logo: null
    },
    {
      outlet: "TechCrunch Africa",
      title: "Tanzania's Zentrya Raises Interest in Local Streaming Market",
      date: "September 30, 2024",
      link: "#",
      logo: null
    },
    {
      outlet: "East African Business",
      title: "How Zentrya is Building the Netflix of East Africa",
      date: "August 22, 2024",
      link: "#",
      logo: null
    }
  ];

  const awards = [
    {
      title: "Best Startup of the Year",
      organization: "Tanzania Tech Awards",
      year: "2024",
      icon: Award
    },
    {
      title: "Innovation in Entertainment",
      organization: "East Africa Digital Summit",
      year: "2024",
      icon: TrendingUp
    },
    {
      title: "Best Mobile App Experience",
      organization: "Tanzania App Awards",
      year: "2025",
      icon: Award
    }
  ];

  const categories = [
    { id: "all", name: "All News" },
    { id: "launch", name: "Launch" },
    { id: "product", name: "Product" },
    { id: "partnership", name: "Partnership" },
    { id: "expansion", name: "Expansion" },
    { id: "milestone", name: "Milestone" }
  ];

  const filteredReleases = selectedCategory === "all" 
    ? pressReleases 
    : pressReleases.filter(release => release.category === selectedCategory);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log("Press Inquiry:", contactForm);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

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
      <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-black to-black" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212, 160, 23, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-6">
            <Newspaper size={20} className="text-yellow-500" />
            <span className="text-yellow-500 font-semibold text-sm">Press & Media</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-yellow-100 to-yellow-500 bg-clip-text text-transparent">
              Zentrya in the
            </span>
            <br />
            <span className="text-white">News</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get the latest updates, press releases, and media resources about Tanzania's 
            leading streaming platform.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="#releases"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-md font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/50 flex items-center justify-center gap-2 hover:scale-105 transform"
            >
              Latest News
              <ChevronRight size={24} />
            </a>
            <a 
              href="#media-kit"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
            >
              <Download size={20} />
              Media Kit
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 md:px-12 py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-full mb-4">
                  <Icon size={32} className="text-yellow-500" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Press Releases Section */}
      <section id="releases" className="px-6 md:px-12 py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Press <span className="text-yellow-500">Releases</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Latest announcements and company news
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === category.id
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Releases */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {filteredReleases.filter(r => r.featured).map((release) => (
              <div 
                key={release.id}
                className="bg-gradient-to-br from-black to-gray-800 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden group"
              >
                {/* Image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-yellow-500/20 to-black flex items-center justify-center">
                  <Newspaper size={60} className="text-yellow-500/40" />
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-bold rounded-full uppercase">
                      {release.category}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500 text-sm">
                      <Calendar size={14} />
                      {release.date}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-yellow-500 transition-colors">
                    {release.title}
                  </h3>

                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {release.excerpt}
                  </p>

                  <button className="inline-flex items-center gap-2 text-yellow-500 font-semibold hover:text-yellow-400 transition-colors">
                    Read Full Release
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Other Releases */}
          <div className="space-y-4">
            {filteredReleases.filter(r => !r.featured).map((release) => (
              <div 
                key={release.id}
                className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-bold rounded-full uppercase">
                        {release.category}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500 text-sm">
                        <Calendar size={14} />
                        {release.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-yellow-500 transition-colors">
                      {release.title}
                    </h3>
                    <p className="text-gray-400">
                      {release.excerpt}
                    </p>
                  </div>

                  <button className="inline-flex items-center gap-2 text-yellow-500 font-semibold hover:text-yellow-400 transition-colors whitespace-nowrap">
                    Read More
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit Section */}
      <section id="media-kit" className="px-6 md:px-12 py-24 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Media <span className="text-yellow-500">Kit</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Download our brand assets, logos, and press materials
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaKitItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                      <Icon size={24} className="text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1 text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{item.type}</span>
                        <span>•</span>
                        <span>{item.size}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 px-4 py-3 rounded-md font-semibold transition-all flex items-center justify-center gap-2 border border-yellow-500/20 hover:border-yellow-500/40">
                    <Download size={18} />
                    Download
                  </button>
                </div>
              );
            })}
          </div>

          {/* Download All Button */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-10 py-4 rounded-md font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/50 inline-flex items-center gap-2">
              <Download size={24} />
              Download Complete Media Kit
            </button>
          </div>
        </div>
      </section>

      {/* Media Coverage Section */}
      <section className="px-6 md:px-12 py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Media <span className="text-yellow-500">Coverage</span>
            </h2>
            <p className="text-gray-400 text-lg">
              What the press is saying about Zentrya
            </p>
          </div>

          <div className="space-y-6">
            {mediaCoverage.map((coverage, index) => (
              <a
                key={index}
                href={coverage.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all group"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-yellow-500 font-bold">{coverage.outlet}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-500 text-sm">{coverage.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-500 transition-colors mb-2">
                      {coverage.title}
                    </h3>
                  </div>

                  <ExternalLink size={24} className="text-gray-600 group-hover:text-yellow-500 transition-colors flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="px-6 md:px-12 py-24 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Awards & <span className="text-yellow-500">Recognition</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Honored to be recognized for our innovation and impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {awards.map((award, index) => {
              const Icon = award.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-black to-gray-800 p-8 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all text-center group"
                >
                  <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500/20 transition-colors">
                    <Icon size={40} className="text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{award.title}</h3>
                  <p className="text-gray-400 mb-1">{award.organization}</p>
                  <p className="text-yellow-500 font-semibold">{award.year}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Press Contact Section */}
      <section className="px-6 md:px-12 py-24 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Press <span className="text-yellow-500">Contact</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                For press inquiries, interviews, or media requests, please reach out to our 
                communications team. We're happy to provide additional information and resources.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Email</h3>
                    <a href="mailto:press@zentrya.com" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                      press@zentrya.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Phone</h3>
                    <a href="tel:+255123456789" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                      +255 123 456 789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mic size={24} className="text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Media Inquiries</h3>
                    <p className="text-gray-400">
                      Available for interviews, podcasts, and speaking engagements
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-white">Send an Inquiry</h3>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm">Name *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm">Email *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm">Organization *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.organization}
                      onChange={(e) => setContactForm({...contactForm, organization: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Media outlet"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm">Phone</label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="+255 XXX XXX XXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2 text-sm">Subject *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Brief subject line"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2 text-sm">Message *</label>
                  <textarea
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-md font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/50 flex items-center justify-center gap-2"
                >
                  {submitted ? (
                    <>
                      <CheckCircle size={20} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>
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
                &copy; 2025 Zentrya. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-gray-500 hover:text-yellow-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-yellow-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-yellow-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-yellow-500 transition-colors">
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