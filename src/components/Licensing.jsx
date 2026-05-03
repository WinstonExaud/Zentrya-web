// src/components/Licensing.jsx
// Content Licensing page for Zentrya Tv - Partner with us for content distribution
// Production-ready with Formspree integration

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Film,
  Tv,
  Globe,
  Users,
  TrendingUp,
  Shield,
  DollarSign,
  Award,
  Zap,
  CheckCircle,
  Send,
  FileText,
  Star,
  Target,
  Handshake,
  BarChart3,
  Video,
  Music,
  Sparkles,
  Loader2
} from "lucide-react";
import aboutBg from "../assets/license.jpg";

export default function Licensing() {
  const [scrolled, setScrolled] = useState(false);
  const [licensingForm, setLicensingForm] = useState({
    // Content Provider Info
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    
    // Licensing Details
    contentType: "",
    catalogSize: "",
    territories: "",
    exclusivity: "",
    
    // Additional Info
    description: "",
    targetLaunch: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const benefits = [
    {
      icon: Globe,
      title: "Wide Reach",
      description: "Access to 50,000+ active users across Tanzania and growing East African market"
    },
    {
      icon: DollarSign,
      title: "Fair Revenue Share",
      description: "Competitive revenue-sharing models that reward quality content"
    },
    {
      icon: TrendingUp,
      title: "Growth Potential",
      description: "Rapidly expanding platform with aggressive growth targets across the region"
    },
    {
      icon: Shield,
      title: "Content Protection",
      description: "Industry-standard DRM and content protection measures"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Detailed performance metrics and audience analytics"
    },
    {
      icon: Zap,
      title: "Fast Deployment",
      description: "Quick onboarding and content deployment process"
    }
  ];

  const contentTypes = [
    {
      icon: Film,
      title: "Feature Films",
      description: "Tanzanian cinema, African films, and international movies",
      examples: ["Blockbusters", "Independent Films", "Documentaries"]
    },
    {
      icon: Tv,
      title: "TV Series & Shows",
      description: "Original series, episodic content, and reality shows",
      examples: ["Drama Series", "Comedy Shows", "Reality TV"]
    },
    {
      icon: Video,
      title: "Short-Form Content",
      description: "Web series, short films, and digital-first content",
      examples: ["Web Series", "Short Films", "Digital Originals"]
    },
    {
      icon: Music,
      title: "Music & Concerts",
      description: "Music videos, concerts, and live performances",
      examples: ["Music Videos", "Live Concerts", "Festivals"]
    }
  ];

  const partnershipModels = [
    {
      title: "Revenue Share",
      description: "Earn based on viewership and engagement",
      features: [
        "Percentage-based revenue split",
        "Monthly payouts",
        "Transparent reporting",
        "Performance bonuses"
      ],
      icon: DollarSign,
      popular: true
    },
    {
      title: "Licensing Fee",
      description: "Fixed licensing fee for content rights",
      features: [
        "Upfront payment",
        "Territorial rights",
        "Flexible terms",
        "Volume discounts"
      ],
      icon: FileText,
      popular: false
    },
    {
      title: "Hybrid Model",
      description: "Combination of upfront fee and revenue share",
      features: [
        "Guaranteed minimum",
        "Upside potential",
        "Risk sharing",
        "Long-term partnership"
      ],
      icon: Handshake,
      popular: false
    }
  ];

  const requirements = [
    {
      title: "Content Quality",
      items: [
        "HD minimum resolution (1080p preferred, 4K supported)",
        "Professional production standards",
        "Clear audio with proper mixing",
        "Color-corrected and properly mastered"
      ]
    },
    {
      title: "Rights & Clearances",
      items: [
        "Clear chain of title documentation",
        "Music rights and clearances",
        "Talent releases and permissions",
        "Distribution rights for Tanzania/East Africa"
      ]
    },
    {
      title: "Metadata & Assets",
      items: [
        "Complete metadata (titles, descriptions, cast)",
        "High-quality promotional images",
        "Trailers and preview clips",
        "Subtitles/closed captions (if applicable)"
      ]
    },
    {
      title: "Technical Specifications",
      items: [
        "Accepted formats: MP4, MOV, ProRes",
        "Video codec: H.264 or H.265",
        "Audio: AAC, 48kHz minimum",
        "Delivery via secure FTP or cloud storage"
      ]
    }
  ];

  const process = [
    {
      step: "1",
      title: "Initial Contact",
      description: "Submit your licensing application with content details and company information"
    },
    {
      step: "2",
      title: "Content Review",
      description: "Our team reviews your content catalog and evaluates fit for our platform"
    },
    {
      step: "3",
      title: "Terms Discussion",
      description: "Negotiate licensing terms, revenue models, and partnership structure"
    },
    {
      step: "4",
      title: "Agreement Signing",
      description: "Finalize contracts and legal documentation for content distribution"
    },
    {
      step: "5",
      title: "Content Onboarding",
      description: "Upload content, metadata, and assets to our platform"
    },
    {
      step: "6",
      title: "Go Live",
      description: "Launch your content to our growing audience across Tanzania"
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("https://formspree.io/f/xlgwrzrd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...licensingForm,
          _subject: `New Licensing Application from ${licensingForm.companyName}`,
          _replyto: licensingForm.email,
          formType: "Content Licensing Application"
        })
      });

      if (response.ok) {
        setSubmitted(true);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
          setLicensingForm({
            companyName: "",
            contactName: "",
            email: "",
            phone: "",
            website: "",
            contentType: "",
            catalogSize: "",
            territories: "",
            exclusivity: "",
            description: "",
            targetLaunch: ""
          });
        }, 5000);
      } else {
        setError("There was an error submitting your application. Please try again or contact us directly at info@zentrya.africa");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setError("There was an error submitting your application. Please try again or contact us directly at info@zentrya.africa");
    } finally {
      setLoading(false);
    }
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
            <span className="text-yellow-500"> TV</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link 
            to="/upcoming" 
            className="text-sm md:text-base font-medium text-white hover:text-yellow-500 transition-colors"
          >
            Sign In
          </Link>

          <Link 
            to="/application" 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-5 py-2 md:px-6 md:py-2.5 rounded-md font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/50"
          >
            Download App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
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

        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.08) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-6">
            <Film size={20} className="text-yellow-500" />
            <span className="text-yellow-500 font-semibold text-sm">CONTENT LICENSING</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-yellow-100 to-yellow-500 bg-clip-text text-transparent">
              Partner With Zentrya Tv
            </span>
            <br />
            <span className="text-white">Distribute Your Content</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Reach millions of viewers across Tanzania and East Africa. License your films, 
            series, and original content to Africa's fastest-growing streaming platform.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="#apply"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-md font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/50 flex items-center justify-center gap-2 hover:scale-105 transform"
            >
              Apply for Licensing
              <Send size={24} />
            </a>
            <a 
              href="#contact"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
            >
              Contact Team
            </a>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="px-6 md:px-12 py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why <span className="text-yellow-500">Partner</span> With Us?
            </h2>
            <p className="text-gray-400 text-lg">
              Join Africa's fastest-growing streaming ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-black to-gray-800 p-8 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all"
                >
                  <div className="w-14 h-14 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={28} className="text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Types Section */}
      <section className="px-6 md:px-12 py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Content <span className="text-yellow-500">We Accept</span>
            </h2>
            <p className="text-gray-400 text-lg">
              We're looking for diverse, high-quality content across all genres
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {contentTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={28} className="text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-white">{type.title}</h3>
                      <p className="text-gray-400 mb-4">{type.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((example, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-sm rounded-full border border-yellow-500/20"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Models Section */}
      <section className="px-6 md:px-12 py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Partnership <span className="text-yellow-500">Models</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Flexible licensing options tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {partnershipModels.map((model, index) => {
              const Icon = model.icon;
              return (
                <div 
                  key={index}
                  className={`bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border transition-all relative ${
                    model.popular 
                      ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/20' 
                      : 'border-gray-800 hover:border-yellow-500/30'
                  }`}
                >
                  {model.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="px-4 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full flex items-center gap-1">
                        <Star size={12} fill="currentColor" />
                        POPULAR
                      </span>
                    </div>
                  )}

                  <div className="w-14 h-14 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={28} className="text-yellow-500" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2 text-white">{model.title}</h3>
                  <p className="text-gray-400 mb-6">{model.description}</p>

                  <ul className="space-y-3">
                    {model.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <CheckCircle size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="px-6 md:px-12 py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Content <span className="text-yellow-500">Requirements</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Technical and legal specifications for content submission
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {requirements.map((req, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-black to-gray-800 p-8 rounded-xl border border-gray-700"
              >
                <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                  <CheckCircle size={24} className="text-yellow-500" />
                  {req.title}
                </h3>
                <ul className="space-y-2">
                  {req.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-400">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-6 md:px-12 py-24 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Licensing <span className="text-yellow-500">Process</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Simple, transparent steps from application to launch
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-yellow-500/30 hidden md:block" />

            <div className="space-y-8">
              {process.map((step, index) => (
                <div key={index} className="relative flex gap-8 items-start">
                  {/* Step Number */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center font-bold text-2xl text-black shadow-lg shadow-yellow-500/50 relative z-10">
                    {step.step}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all">
                    <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="px-6 md:px-12 py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Apply for <span className="text-yellow-500">Licensing</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Start your partnership journey with Zentrya Tv today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-900 to-black p-8 md:p-10 rounded-xl border border-gray-800">
            {/* Company Information */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <Sparkles size={24} className="text-yellow-500" />
                Company Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={licensingForm.companyName}
                    onChange={(e) => setLicensingForm({...licensingForm, companyName: e.target.value})}
                    disabled={loading || submitted}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Contact Person *</label>
                  <input
                    type="text"
                    name="contactName"
                    required
                    value={licensingForm.contactName}
                    onChange={(e) => setLicensingForm({...licensingForm, contactName: e.target.value})}
                    disabled={loading || submitted}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                    placeholder="Full name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={licensingForm.email}
                    onChange={(e) => setLicensingForm({...licensingForm, email: e.target.value})}
                    disabled={loading || submitted}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                    placeholder="company@example.com"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={licensingForm.phone}
                    onChange={(e) => setLicensingForm({...licensingForm, phone: e.target.value})}
                    disabled={loading || submitted}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                    placeholder="+255 XXX XXX XXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  value={licensingForm.website}
                  onChange={(e) => setLicensingForm({...licensingForm, website: e.target.value})}
                  disabled={loading || submitted}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                  placeholder="https://yourcompany.com"
                />
              </div>
            </div>

            {/* Licensing Details */}
            <div className="mb-8 pt-8 border-t border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <Film size={24} className="text-yellow-500" />
                Licensing Details
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Content Type *</label>
                  <select
                    name="contentType"
                    required
                    value={licensingForm.contentType}
                    onChange={(e) => setLicensingForm({...licensingForm, contentType: e.target.value})}
                    disabled={loading || submitted}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                  >
                    <option value="">Select Type</option>
                    <option value="feature-films">Feature Films</option>
                    <option value="tv-series">TV Series</option>
                    <option value="documentaries">Documentaries</option>
                    <option value="short-form">Short-Form Content</option>
                    <option value="music">Music & Concerts</option>
                    <option value="mixed">Mixed Content</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Catalog Size *</label>
                  <select
                    name="catalogSize"
                    required
                    value={licensingForm.catalogSize}
                    onChange={(e) => setLicensingForm({...licensingForm, catalogSize: e.target.value})}
                    disabled={loading || submitted}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                  >
                    <option value="">Select Size</option>
                    <option value="1-10">1-10 titles</option>
                    <option value="11-50">11-50 titles</option>
                    <option value="51-100">51-100 titles</option>
                    <option value="101-500">101-500 titles</option>
                    <option value="500+">500+ titles</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Territories *</label>
                  <select
                    name="territories"
                    required
                    value={licensingForm.territories}
                    onChange={(e) => setLicensingForm({...licensingForm, territories: e.target.value})}
                    disabled={loading || submitted}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                  >
                    <option value="">Select Territory</option>
                    <option value="tanzania">Tanzania Only</option>
                    <option value="east-africa">East Africa</option>
                    <option value="africa">All Africa</option>
                    <option value="worldwide">Worldwide</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Exclusivity *</label>
                  <select
                    name="exclusivity"
                    required
                    value={licensingForm.exclusivity}
                    onChange={(e) => setLicensingForm({...licensingForm, exclusivity: e.target.value})}
                    disabled={loading || submitted}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                  >
                    <option value="">Select Option</option>
                    <option value="exclusive">Exclusive</option>
                    <option value="non-exclusive">Non-Exclusive</option>
                    <option value="flexible">Flexible/Negotiable</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Target Launch Date</label>
                <input
                  type="date"
                  name="targetLaunch"
                  value={licensingForm.targetLaunch}
                  onChange={(e) => setLicensingForm({...licensingForm, targetLaunch: e.target.value})}
                  disabled={loading || submitted}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-8 pt-8 border-t border-gray-800">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <Target size={24} className="text-yellow-500" />
                Additional Information
              </h3>

              <div>
                <label className="block text-white font-semibold mb-2">Tell Us About Your Content *</label>
                <textarea
                  name="description"
                  required
                  value={licensingForm.description}
                  onChange={(e) => setLicensingForm({...licensingForm, description: e.target.value})}
                  disabled={loading || submitted}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                  placeholder="Describe your content library, target audience, unique selling points, and why you want to partner with Zentrya Tv..."
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || submitted}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-md font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  Submitting...
                </>
              ) : submitted ? (
                <>
                  <CheckCircle size={24} />
                  Application Submitted Successfully!
                </>
              ) : (
                <>
                  Submit Licensing Application
                  <Send size={24} />
                </>
              )}
            </button>

            <p className="text-gray-500 text-sm text-center mt-4">
              Our team will review your application and get back to you within 3-5 business days.
            </p>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 md:px-12 py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Have <span className="text-yellow-500">Questions?</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Our licensing team is here to help you navigate the partnership process
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <a 
              href="mailto:info@zentrya.africa"
              className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all"
            >
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Send size={24} className="text-yellow-500" />
              </div>
              <h3 className="font-bold text-white mb-1">Email Us</h3>
              <p className="text-yellow-500 text-sm">info@zentrya.africa</p>
            </a>

            <a 
              href="tel:+255123456789"
              className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all"
            >
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users size={24} className="text-yellow-500" />
              </div>
              <h3 className="font-bold text-white mb-1">Call Us</h3>
              <p className="text-yellow-500 text-sm">+255 741 361 767</p>
            </a>

            <Link 
              to="/contact"
              className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all"
            >
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Globe size={24} className="text-yellow-500" />
              </div>
              <h3 className="font-bold text-white mb-1">Contact Form</h3>
              <p className="text-yellow-500 text-sm">General Inquiries</p>
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
              <span className="text-yellow-500"> TV</span>
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