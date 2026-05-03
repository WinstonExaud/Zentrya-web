// src/components/Pricing.jsx
// Pricing page for Zentrya Tv - Subscription plans with Tanzanian pricing

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Check,
  X,
  Star,
  Zap,
  Crown,
  Smartphone,
  Tv,
  Download,
  Users,
  Film,
  Sparkles,
  ArrowRight,
  Play,
  Globe,
  Shield,
  Clock,
  Award
} from "lucide-react";
import pricingBg from "../assets/pricing.jpg";

export default function Pricing() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [billingCycle, setBillingCycle] = useState("monthly"); // monthly or yearly
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pricing plans with Tanzanian Shillings
  const plans = [
    {
      id: "mobile",
      name: "Mobile",
      icon: Smartphone,
      color: "blue",
      tagline: "Perfect for on-the-go",
      monthly: 2999,
      yearly: 30000, // 2 months free
      features: [
        { text: "Mobile & Tablet only", included: true },
        { text: "SD Quality (480p)", included: true },
        { text: "1 Device at a time", included: true },
        { text: "Download on 1 device", included: true },
        { text: "Unlimited viewing", included: true },
        { text: "Cancel anytime", included: true },
        { text: "HD Quality", included: false },
        { text: "Watch on TV", included: false },
        { text: "4K Ultra HD", included: false }
      ],
      popular: false
    },
    {
      id: "basic",
      name: "Basic",
      icon: Play,
      color: "yellow",
      tagline: "Great for individuals",
      monthly: 9900,
      yearly: 99000, // 2 months free
      features: [
        { text: "All devices supported", included: true },
        { text: "HD Quality (720p)", included: true },
        { text: "1 Device at a time", included: true },
        { text: "Download on 1 device", included: true },
        { text: "Unlimited viewing", included: true },
        { text: "Cancel anytime", included: true },
        { text: "Watch on TV", included: true },
        { text: "Multiple profiles", included: true },
        { text: "4K Ultra HD", included: false }
      ],
      popular: false
    },
    {
      id: "standard",
      name: "Standard",
      icon: Tv,
      color: "yellow",
      tagline: "Most popular choice",
      monthly: 14900,
      yearly: 149000, // 2 months free
      features: [
        { text: "All devices supported", included: true },
        { text: "Full HD Quality (1080p)", included: true },
        { text: "2 Devices at once", included: true },
        { text: "Download on 2 devices", included: true },
        { text: "Unlimited viewing", included: true },
        { text: "Cancel anytime", included: true },
        { text: "Watch on TV", included: true },
        { text: "Up to 5 profiles", included: true },
        { text: "4K Ultra HD", included: false }
      ],
      popular: true,
      badge: "Most Popular"
    },
    {
      id: "premium",
      name: "Premium",
      icon: Crown,
      color: "yellow",
      tagline: "Best experience",
      monthly: 19900,
      yearly: 199000, // 2 months free
      features: [
        { text: "All devices supported", included: true },
        { text: "4K Ultra HD + HDR", included: true },
        { text: "4 Devices at once", included: true },
        { text: "Download on 4 devices", included: true },
        { text: "Unlimited viewing", included: true },
        { text: "Cancel anytime", included: true },
        { text: "Watch on TV", included: true },
        { text: "Up to 5 profiles", included: true },
        { text: "Premium audio quality", included: true }
      ],
      popular: false,
      badge: "Best Value"
    }
  ];

  const features = [
    {
      icon: Film,
      title: "Unlimited Movies & Series",
      description: "Access thousands of African films and TV shows"
    },
    {
      icon: Globe,
      title: "Watch Anywhere",
      description: "Stream on phone, tablet, laptop, and TV"
    },
    {
      icon: Download,
      title: "Download & Watch Offline",
      description: "Download your favorites to watch without internet"
    },
    {
      icon: Users,
      title: "Multiple Profiles",
      description: "Create profiles for everyone in your family"
    },
    {
      icon: Shield,
      title: "Safe for Kids",
      description: "Parental controls and kids profiles available"
    },
    {
      icon: Clock,
      title: "Cancel Anytime",
      description: "No contracts, no commitment, no cancellation fees"
    }
  ];

  const faqs = [
    {
      question: "What is Zentrya Tv?",
      answer: "Zentrya Tv is Tanzania's premier streaming platform offering unlimited access to African movies, series, and exclusive Zentrya Tv Originals. Watch on any device, anytime, anywhere."
    },
    {
      question: "How much does Zentrya Tv cost?",
      answer: "Zentrya Tv offers flexible plans starting from TSh 3,000/month for Mobile to TSh 19,900/month for Premium 4K. Choose yearly billing and save up to 2 months!"
    },
    {
      question: "Can I watch on my TV?",
      answer: "Yes! All plans except Mobile support TV streaming. Watch on Smart TVs, Android TV, Apple TV, Chromecast, Fire TV, PlayStation, and Xbox."
    },
    {
      question: "Can I download shows to watch offline?",
      answer: "Absolutely! All plans include downloads. Mobile and Basic plans allow 1 device, Standard allows 2 devices, and Premium allows 4 devices for downloads."
    },
    {
      question: "How do I pay?",
      answer: "We accept M-Pesa, Airtel Money, Tigo Pesa, HaloPesa, and major credit/debit cards. All payments are secure and encrypted."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes! There are no contracts or cancellation fees. You can cancel online with just a few clicks and continue watching until the end of your billing period."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! New users get a 7-day free trial with full access to all features. No credit card required to start."
    },
    {
      question: "How many people can watch at once?",
      answer: "It depends on your plan: Mobile & Basic (1 device), Standard (2 devices), Premium (4 devices). You can create up to 5 profiles on all plans."
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0
    }).format(price).replace('TZS', 'TSh');
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan.id);
    // Navigate to signup with selected plan
    //navigate(`/signup?plan=${plan.id}&billing=${billingCycle}`);
    navigate(`/coming-soon`);
  };

  const getPlanPrice = (plan) => {
    return billingCycle === "monthly" ? plan.monthly : plan.yearly;
  };

  const getMonthlyEquivalent = (plan) => {
    if (billingCycle === "yearly") {
      return Math.floor(plan.yearly / 12);
    }
    return plan.monthly;
  };

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans">
      {/* Fixed Navbar */}
      <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 py-4 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-sm border-b border-gray-800" : "bg-gradient-to-b from-black/80 to-transparent"
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
            to="/coming-soon" 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-5 py-2 md:px-6 md:py-2.5 rounded-md font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/50"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 overflow-hidden min-h-[70vh] flex items-center">
        {/* Background Image with Overlays */}
        <div className="absolute inset-0">
          <img 
            src={pricingBg} 
            alt="Zentrya Tv streaming platform" 
            className="w-full h-full object-cover"
          />
          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/10 via-transparent to-black" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-6">
            <Award size={20} className="text-yellow-500" />
            <span className="text-yellow-500 font-semibold text-sm">Choose Your Perfect Plan</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Watch Unlimited <br />
            <span className="bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              African Stories
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Stream thousands of movies and series. Cancel anytime. Start your free trial today.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all relative ${
                billingCycle === "yearly"
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="px-6 md:px-12 py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = getPlanPrice(plan);
              const monthlyEquiv = getMonthlyEquivalent(plan);
              const isPopular = plan.popular;

              return (
                <div
                  key={plan.id}
                  className={`relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border-2 transition-all duration-300 ${
                    isPopular
                      ? "border-yellow-500 shadow-xl shadow-yellow-500/20 scale-105"
                      : "border-gray-800 hover:border-yellow-500/30"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Popular Badge */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Star size={14} fill="currentColor" />
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6 mt-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${plan.color}-500/10 flex items-center justify-center`}>
                      <Icon size={32} className={`text-${plan.color}-500`} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm">{plan.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6 pb-6 border-b border-gray-800">
                    <div className="text-4xl font-bold text-yellow-500 mb-2">
                      {formatPrice(monthlyEquiv)}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {billingCycle === "yearly" ? (
                        <>
                          <span>per month</span>
                          <div className="text-xs mt-1">
                            Billed {formatPrice(price)} yearly
                          </div>
                        </>
                      ) : (
                        "per month"
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X size={20} className="text-gray-600 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${feature.included ? "text-gray-300" : "text-gray-600"}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                      isPopular
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-yellow-500 shadow-lg hover:shadow-yellow-500/50"
                        : "bg-gray-800 text-white hover:bg-gray-700"
                    }`}
                  >
                    Get Started
                    <ArrowRight size={18} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* 7-Day Trial Notice */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full">
              <Sparkles size={20} className="text-green-500" />
              <span className="text-green-500 font-semibold">
                All plans include a 7-day free trial • No credit card required
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 md:px-12 py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You <span className="text-yellow-500">Need</span>
            </h2>
            <p className="text-gray-400 text-lg">
              All plans include these amazing features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all"
                >
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-6 md:px-12 py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Compare <span className="text-yellow-500">Plans</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Find the perfect plan for your needs
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 text-gray-400 font-semibold">Feature</th>
                  {plans.map(plan => (
                    <th key={plan.id} className="text-center py-4 px-4">
                      <div className="text-white font-bold">{plan.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-4 text-gray-300">Monthly Price</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="text-center py-4 px-4 text-yellow-500 font-bold">
                      {formatPrice(plan.monthly)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-4 text-gray-300">Video Quality</td>
                  <td className="text-center py-4 px-4 text-gray-300">SD (480p)</td>
                  <td className="text-center py-4 px-4 text-gray-300">HD (720p)</td>
                  <td className="text-center py-4 px-4 text-gray-300">Full HD (1080p)</td>
                  <td className="text-center py-4 px-4 text-gray-300">4K Ultra HD</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-4 text-gray-300">Devices at Once</td>
                  <td className="text-center py-4 px-4 text-gray-300">1</td>
                  <td className="text-center py-4 px-4 text-gray-300">1</td>
                  <td className="text-center py-4 px-4 text-gray-300">2</td>
                  <td className="text-center py-4 px-4 text-gray-300">4</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-4 text-gray-300">Download Devices</td>
                  <td className="text-center py-4 px-4 text-gray-300">1</td>
                  <td className="text-center py-4 px-4 text-gray-300">1</td>
                  <td className="text-center py-4 px-4 text-gray-300">2</td>
                  <td className="text-center py-4 px-4 text-gray-300">4</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-4 text-gray-300">Watch on TV</td>
                  <td className="text-center py-4 px-4"><X size={20} className="text-gray-600 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check size={20} className="text-green-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check size={20} className="text-green-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4"><Check size={20} className="text-green-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 md:px-12 py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="text-yellow-500">Questions</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to know about Zentrya Tv
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-gradient-to-br from-black to-gray-800 rounded-xl border border-gray-700 overflow-hidden group"
              >
                <summary className="px-6 py-4 cursor-pointer font-semibold text-lg text-white hover:text-yellow-500 transition-colors list-none flex items-center justify-between">
                  {faq.question}
                  <ArrowRight size={20} className="transform group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-4 text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-12 py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-6">
            <Zap size={20} className="text-yellow-500" />
            <span className="text-yellow-500 font-semibold text-sm">Start Watching Today</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your <span className="text-yellow-500">Free Trial?</span>
          </h2>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of viewers enjoying the best African entertainment. No credit card required.
          </p>

          <Link
            to="/coming-soon"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-10 py-4 rounded-lg font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/50"
          >
            Get Started Free
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-16 bg-black border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-yellow-500">ZEN</span>
                <span className="text-white">TRYA</span>
              </div>
              <p className="text-gray-400 text-sm">
                The Future of Entertainment in Tanzania 🇹🇿
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <Link to="/about" className="block text-gray-400 hover:text-yellow-500 transition-colors text-sm">About</Link>
                <Link to="/careers" className="block text-gray-400 hover:text-yellow-500 transition-colors text-sm">Careers</Link>
                <Link to="/press" className="block text-gray-400 hover:text-yellow-500 transition-colors text-sm">Press</Link>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <Link to="/help" className="block text-gray-400 hover:text-yellow-500 transition-colors text-sm">Help Center</Link>
                <Link to="/contact" className="block text-gray-400 hover:text-yellow-500 transition-colors text-sm">Contact</Link>
                <Link to="/devices" className="block text-gray-400 hover:text-yellow-500 transition-colors text-sm">Devices</Link>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <Link to="/terms" className="block text-gray-400 hover:text-yellow-500 transition-colors text-sm">Terms</Link>
                <Link to="/privacy" className="block text-gray-400 hover:text-yellow-500 transition-colors text-sm">Privacy</Link>
                <Link to="/refund" className="block text-gray-400 hover:text-yellow-500 transition-colors text-sm">Refund Policy</Link>
              </div>
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