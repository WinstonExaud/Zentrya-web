// src/components/Contact.jsx
// Contact Us page for Zentrya - Multiple contact methods and support options

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Headphones,
  Send,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  Building2,
  HelpCircle,
  Smartphone,
  Zap,
  AlertCircle
} from "lucide-react";

import contactBg from "../assets/contact.jpeg";

export default function Contact() {
  const [scrolled, setScrolled] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      contact: "support@zentrya.africa",
      action: "mailto:support@zentrya.africa",
      color: "yellow"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Talk to our support team",
      contact: "+255 741 361 767",
      action: "tel:+255741361767",
      color: "yellow"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with us in real-time",
      contact: "Available 24/7",
      action: "#",
      color: "yellow"
    },
    {
      icon: Headphones,
      title: "Help Center",
      description: "Browse FAQs and guides",
      contact: "Self-service support",
      action: "/help",
      color: "yellow"
    }
  ];

  const officeInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      details: [
        "Zentrya Ltd.",
        "Dar es Salaam, Tanzania",
        "East Africa"
      ]
    },
    {
      icon: Globe,
      title: "Online Support",
      details: [
        "24/7 Live Chat Available",
        "Email Response: Within 24 Hours",
        "Help Center: Always Accessible"
      ]
    }
  ];

  const departments = [
    {
      name: "General Inquiry",
      email: "info@zentrya.africa"
    },
    {
      name: "Customer Support",
      email: "support@zentrya.africa"
    },
    {
      name: "Business & Partnerships",
      email: "business@zentrya.africa"
    },
  ];

  const socialMedia = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/zentrya",
      handle: "@zentrya",
      color: "#1877F2"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/zentrya",
      handle: "@zentrya",
      color: "#1DA1F2"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/zentrya_",
      handle: "@zentrya_",
      color: "#E4405F"
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/ZentryaMedia",
      handle: "@Zentrya",
      color: "#FF0000"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Create mailto link with form data
    const mailtoLink = `mailto:support@zentrya.africa?subject=${encodeURIComponent(contactForm.subject)}&body=${encodeURIComponent(
      `Name: ${contactForm.name}\n` +
      `Email: ${contactForm.email}\n` +
      `Phone: ${contactForm.phone || 'Not provided'}\n` +
      `Category: ${contactForm.category}\n\n` +
      `Message:\n${contactForm.message}`
    )}`;
    
    // Open default mail client
    window.location.href = mailtoLink;
    
    // Show success message
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Reset form after 4 seconds
      setTimeout(() => {
        setSubmitted(false);
        setContactForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          category: "",
          message: ""
        });
      }, 4000);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans">
      {/* Fixed Navbar */}
      <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 py-4 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-md shadow-lg shadow-black/50" : "bg-transparent"
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
            className="hidden sm:block text-sm md:text-base font-medium text-white hover:text-yellow-500 transition-colors"
          >
            Sign In
          </Link>

          <Link 
            to="/signup" 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-5 py-2 md:px-6 md:py-2.5 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/50 hover:scale-105 transform"
          >
            Join Now
          </Link>
        </div>
      </nav>

      {/* Hero Section with Enhanced Background */}
       <section className="relative pt-32 pb-24 px-6 md:px-12 overflow-hidden min-h-[70vh] flex items-center">
              {/* Background Image with Overlays */}
              <div className="absolute inset-0">
                <img 
                  src={contactBg} 
                  alt="Zentrya streaming platform" 
                  className="w-full h-full object-cover"
                />
        {/* Multi-layer Enhanced Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/10 via-transparent to-black" />
        </div>

        {/* Animated Dot Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.12) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />

        {/* Floating Blur Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

        <div className="relative max-w-5xl mx-auto text-center z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-500/20 backdrop-blur-md border border-yellow-500/40 rounded-full mb-8 shadow-lg shadow-yellow-500/20">
            <MessageCircle size={20} className="text-yellow-400" />
            <span className="text-yellow-400 font-bold text-sm tracking-wide">WE'RE HERE TO HELP</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-white via-yellow-100 to-yellow-400 bg-clip-text text-transparent mb-3">
              Get in Touch
            </span>
            <span className="block text-white">With Zentrya</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Have questions? Need support? Want to partner with us? We'd love to hear from you. 
            Our dedicated team is ready to assist you 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@zentrya.africa"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-10 py-4 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/50 flex items-center justify-center gap-2 hover:scale-105 transform"
            >
              <Mail size={24} />
              Email Us
            </a>
            <a 
              href="tel:+25541361767"
              className="bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/30 flex items-center justify-center gap-2"
            >
              <Phone size={24} />
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="px-6 md:px-12 py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your <span className="text-yellow-500">Contact Method</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-6" />
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Multiple ways to reach us - pick what works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <a
                  key={index}
                  href={method.action}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all" />
                  <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-yellow-500/40 transition-all group-hover:scale-105 transform duration-300 text-center">
                    <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-yellow-500/20 transition-colors group-hover:scale-110 duration-300">
                      <Icon size={32} className="text-yellow-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{method.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{method.description}</p>
                    <p className="text-yellow-500 font-semibold text-sm">{method.contact}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info Section */}
      <section className="px-6 md:px-12 py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Send Us a <span className="text-yellow-500">Message</span>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                Fill out the form below and we'll open your default email client to send your message 
                directly to <span className="text-yellow-500 font-semibold">support@zentrya.africa</span>
              </p>

              <form onSubmit={handleSubmit} className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-xl blur-lg" />
                <div className="relative bg-gradient-to-br from-black to-gray-800 p-8 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-white font-semibold mb-2 text-sm">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent hover:border-yellow-500/50 transition-all"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2 text-sm">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent hover:border-yellow-500/50 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-white font-semibold mb-2 text-sm">Phone Number</label>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent hover:border-yellow-500/50 transition-all"
                        placeholder="+255 XXX XXX XXX"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2 text-sm">Category *</label>
                      <select
                        required
                        value={contactForm.category}
                        onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent hover:border-yellow-500/50 transition-all"
                      >
                        <option value="">Select Category</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Customer Support</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-white font-semibold mb-2 text-sm">Subject *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent hover:border-yellow-500/50 transition-all"
                      placeholder="Brief subject line"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-white font-semibold mb-2 text-sm">Message *</label>
                    <textarea
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent hover:border-yellow-500/50 transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  {submitted && (
                    <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start gap-3">
                      <CheckCircle size={24} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-green-400 font-semibold mb-1">Message Sent Successfully!</p>
                        <p className="text-green-300 text-sm">Your default email client should have opened. If not, please email us directly at support@zentrya.africa</p>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || submitted}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-2xl hover:shadow-yellow-500/50 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform"
                  >
                    {loading ? (
                      <>
                        <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Opening Email Client...</span>
                      </>
                    ) : submitted ? (
                      <>
                        <CheckCircle size={24} />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={24} />
                      </>
                    )}
                  </button>

                  <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-blue-300 text-sm">
                      Clicking "Send Message" will open your email client with the form pre-filled
                    </p>
                  </div>
                </div>
              </form>
            </div>

            {/* Office Information */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Visit Our <span className="text-yellow-500">Office</span>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                Come meet us in person at our headquarters in Dar es Salaam, Tanzania.
              </p>

              {/* Office Details */}
              <div className="space-y-6">
                {officeInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all" />
                      <div className="relative bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                            <Icon size={24} className="text-yellow-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-3 text-white">{info.title}</h3>
                            <div className="space-y-2">
                              {info.details.map((detail, idx) => (
                                <p key={idx} className="text-gray-400 leading-relaxed">{detail}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts Section */}
      <section className="px-6 md:px-12 py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Department <span className="text-yellow-500">Contacts</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-6" />
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Reach out to the right team for faster assistance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all group-hover:scale-105 transform duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                      <Mail size={20} className="text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-2">{dept.name}</h3>
                      <a 
                        href={`mailto:${dept.email}`}
                        className="text-yellow-500 hover:text-yellow-400 transition-colors text-sm font-medium"
                      >
                        {dept.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="px-6 md:px-12 py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Connect on <span className="text-yellow-500">Social Media</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-6" />
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Follow us for updates, entertainment news, and exclusive content
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {socialMedia.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all" />
                  <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all group-hover:scale-105 transform duration-300">
                    <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500/20 transition-colors">
                      <Icon size={32} className="text-yellow-500" />
                    </div>
                    <h3 className="font-bold text-white mb-1">{social.name}</h3>
                    <p className="text-gray-400 text-sm">{social.handle}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Support Links */}
      <section className="px-6 md:px-12 py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Need <span className="text-yellow-500">Quick Help?</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-6" />
            <p className="text-gray-400 text-lg">
              Access instant support resources
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/help"
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all" />
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all group-hover:scale-105 transform duration-300 text-center">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-yellow-500/20 transition-colors group-hover:scale-110 duration-300">
                  <HelpCircle size={32} className="text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Help Center</h3>
                <p className="text-gray-400 mb-5 leading-relaxed">Browse our knowledge base and FAQs</p>
                <span className="text-yellow-500 font-semibold inline-flex items-center gap-2">
                  Visit Help Center
                  <Zap size={16} />
                </span>
              </div>
            </Link>

            <Link
              to="/devices"
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all" />
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all group-hover:scale-105 transform duration-300 text-center">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-yellow-500/20 transition-colors group-hover:scale-110 duration-300">
                  <Smartphone size={32} className="text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Supported Devices</h3>
                <p className="text-gray-400 mb-5 leading-relaxed">Check device compatibility</p>
                <span className="text-yellow-500 font-semibold inline-flex items-center gap-2">
                  View Devices
                  <Zap size={16} />
                </span>
              </div>
            </Link>

            <a
              href="mailto:support@zentrya.africa"
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all" />
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all group-hover:scale-105 transform duration-300 text-center">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-yellow-500/20 transition-colors group-hover:scale-110 duration-300">
                  <MessageCircle size={32} className="text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Email Support</h3>
                <p className="text-gray-400 mb-5 leading-relaxed">Get direct email assistance</p>
                <span className="text-yellow-500 font-semibold inline-flex items-center gap-2">
                  Email Us Now
                  <Zap size={16} />
                </span>
              </div>
            </a>
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