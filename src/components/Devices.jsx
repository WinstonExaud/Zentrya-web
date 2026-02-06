// src/components/Devices.jsx
// Supported Devices page for Zentrya

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Smartphone,
  Tablet,
  Monitor,
  Tv,
  Laptop,
  Chrome,
  Wifi,
  Download,
  CheckCircle,
  AlertCircle,
  Play,
  Settings,
  Cast,
  Zap,
  HardDrive
} from "lucide-react";

export default function Devices() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const deviceCategories = [
    { id: "all", name: "All Devices" },
    { id: "mobile", name: "Mobile" },
    { id: "tv", name: "TV & Streaming" },
    { id: "computer", name: "Computer" },
    { id: "gaming", name: "Gaming" }
  ];

  const devices = [
    // Mobile Devices
    {
      category: "mobile",
      icon: Smartphone,
      name: "Android Phones",
      description: "Android 7.0 and higher",
      features: ["HD Streaming", "Offline Downloads", "Chromecast Support"],
      supported: true,
      downloadLink: "https://play.google.com/store"
    },
    {
      category: "mobile",
      icon: Smartphone,
      name: "iPhone & iPad",
      description: "iOS 14.0 and higher",
      features: ["HD Streaming", "Offline Downloads", "AirPlay Support"],
      supported: true,
      downloadLink: "https://apps.apple.com"
    },
    {
      category: "mobile",
      icon: Tablet,
      name: "Android Tablets",
      description: "Android 7.0 and higher",
      features: ["HD Streaming", "Offline Downloads", "Large Screen Optimized"],
      supported: true,
      downloadLink: "https://play.google.com/store"
    },

    // TV & Streaming Devices
    {
      category: "tv",
      icon: Tv,
      name: "Smart TVs",
      description: "Android TV, Samsung, LG WebOS",
      features: ["4K Streaming", "HDR Support", "Voice Control"],
      supported: true,
      downloadLink: null
    },
    {
      category: "tv",
      icon: Cast,
      name: "Chromecast",
      description: "All generations",
      features: ["Cast from Mobile", "HD/4K Support", "Easy Setup"],
      supported: true,
      downloadLink: null
    },
    {
      category: "tv",
      icon: Tv,
      name: "Apple TV",
      description: "4th generation and higher",
      features: ["4K Streaming", "AirPlay", "Siri Integration"],
      supported: true,
      downloadLink: null
    },
    {
      category: "tv",
      icon: Tv,
      name: "Amazon Fire TV",
      description: "Fire Stick, Fire TV Cube",
      features: ["HD/4K Streaming", "Alexa Voice", "Easy Access"],
      supported: true,
      downloadLink: null
    },

    // Computers
    {
      category: "computer",
      icon: Chrome,
      name: "Web Browsers",
      description: "Chrome, Firefox, Safari, Edge",
      features: ["HD Streaming", "All Browsers Supported", "No Download Required"],
      supported: true,
      downloadLink: "https://zentrya.com"
    },
    {
      category: "computer",
      icon: Laptop,
      name: "Windows PC",
      description: "Windows 10 and higher",
      features: ["HD Streaming", "Browser-based", "Desktop App (Coming Soon)"],
      supported: true,
      downloadLink: null
    },
    {
      category: "computer",
      icon: Laptop,
      name: "Mac",
      description: "macOS 10.15 and higher",
      features: ["HD Streaming", "Browser-based", "Safari Support"],
      supported: true,
      downloadLink: null
    },

    // Gaming Consoles
    {
      category: "gaming",
      icon: Tv,
      name: "PlayStation",
      description: "PS4, PS5",
      features: ["HD/4K Streaming", "Easy Navigation", "Controller Support"],
      supported: true,
      downloadLink: null
    },
    {
      category: "gaming",
      icon: Tv,
      name: "Xbox",
      description: "Xbox One, Series X/S",
      features: ["HD/4K Streaming", "Game Controller", "Quick Access"],
      supported: true,
      downloadLink: null
    }
  ];

  const requirements = [
    {
      icon: Wifi,
      title: "Internet Speed",
      items: [
        "Standard Definition: 3 Mbps",
        "High Definition: 5 Mbps",
        "4K Ultra HD: 25 Mbps",
        "Multiple Devices: Add 3-5 Mbps per device"
      ]
    },
    {
      icon: HardDrive,
      title: "Storage Space",
      items: [
        "Mobile Downloads: 500MB - 2GB per movie",
        "TV Series Episodes: 200MB - 1GB",
        "Recommended Free Space: 5GB minimum",
        "Manage downloads in app settings"
      ]
    },
    {
      icon: Monitor,
      title: "Display Requirements",
      items: [
        "Minimum Resolution: 720p",
        "Recommended: 1080p Full HD",
        "4K Support: Available on compatible devices",
        "HDR: Supported on select content"
      ]
    }
  ];

  const setupGuides = [
    {
      device: "Smart TV",
      steps: [
        "Navigate to your TV's app store",
        "Search for 'Zentrya'",
        "Download and install the app",
        "Open Zentrya and sign in",
        "Start streaming!"
      ]
    },
    {
      device: "Mobile Phone",
      steps: [
        "Open Google Play Store or App Store",
        "Search for 'Zentrya'",
        "Tap 'Install' or 'Get'",
        "Open the app and sign in",
        "Enjoy unlimited streaming!"
      ]
    },
    {
      device: "Web Browser",
      steps: [
        "Open your web browser",
        "Visit zentrya.com",
        "Click 'Sign In'",
        "Enter your credentials",
        "Start watching immediately!"
      ]
    },
    {
      device: "Chromecast",
      steps: [
        "Open Zentrya app on your phone",
        "Tap the Cast icon",
        "Select your Chromecast device",
        "Choose content to watch",
        "Enjoy on the big screen!"
      ]
    }
  ];

  const features = [
    {
      icon: Download,
      title: "Offline Downloads",
      description: "Download content on mobile devices and watch without internet"
    },
    {
      icon: Cast,
      title: "Multi-Device Casting",
      description: "Cast from phone to TV with Chromecast or AirPlay"
    },
    {
      icon: Play,
      title: "Seamless Playback",
      description: "Pick up where you left off across all devices"
    },
    {
      icon: Settings,
      title: "Quality Control",
      description: "Adjust video quality to manage data usage"
    }
  ];

  const filteredDevices = selectedCategory === "all" 
    ? devices 
    : devices.filter(device => device.category === selectedCategory);

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
            <Monitor size={20} className="text-yellow-500" />
            <span className="text-yellow-500 font-semibold text-sm">Device Compatibility</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-yellow-100 to-yellow-500 bg-clip-text text-transparent">
              Watch on Any
            </span>
            <br />
            <span className="text-white">Device You Own</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stream Zentrya on your phone, tablet, computer, smart TV, and gaming consoles. 
            Unlimited entertainment on all your favorite devices.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800">
              <Smartphone size={32} className="text-yellow-500 mx-auto mb-2" />
              <p className="text-white font-semibold text-sm">Mobile</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800">
              <Tv size={32} className="text-yellow-500 mx-auto mb-2" />
              <p className="text-white font-semibold text-sm">Smart TV</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800">
              <Laptop size={32} className="text-yellow-500 mx-auto mb-2" />
              <p className="text-white font-semibold text-sm">Computer</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800">
              <Play size={32} className="text-yellow-500 mx-auto mb-2" />
              <p className="text-white font-semibold text-sm">Gaming</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-12 py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Platform <span className="text-yellow-500">Features</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Enjoy these features across all supported devices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all text-center"
                >
                  <div className="w-14 h-14 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={28} className="text-yellow-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supported Devices Section */}
      <section className="px-6 md:px-12 py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Supported <span className="text-yellow-500">Devices</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Stream on your favorite devices and platforms
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {deviceCategories.map((category) => (
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevices.map((device, index) => {
              const Icon = device.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={28} className="text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{device.name}</h3>
                      <p className="text-gray-400 text-sm">{device.description}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {device.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                        <CheckCircle size={16} className="text-yellow-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {device.downloadLink && (
                    <a 
                      href={device.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 px-4 py-2 rounded-md font-semibold transition-all border border-yellow-500/20 text-sm"
                    >
                      <Download size={16} />
                      Download App
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="px-6 md:px-12 py-24 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              System <span className="text-yellow-500">Requirements</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Ensure optimal streaming with these recommendations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {requirements.map((req, index) => {
              const Icon = req.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800"
                >
                  <div className="w-14 h-14 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={28} className="text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{req.title}</h3>
                  <ul className="space-y-2">
                    {req.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className="text-yellow-500 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Internet Speed Notice */}
          <div className="mt-12 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Zap size={24} className="text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Internet Speed Tip</h3>
                <p className="text-gray-300 leading-relaxed">
                  For the best experience, we recommend a stable internet connection. You can adjust 
                  video quality in app settings to match your connection speed and save on data usage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Guides */}
      <section className="px-6 md:px-12 py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Setup <span className="text-yellow-500">Guides</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Quick and easy setup instructions for each device type
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {setupGuides.map((guide, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all"
              >
                <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <Settings size={24} className="text-yellow-500" />
                  {guide.device}
                </h3>
                <ol className="space-y-3">
                  {guide.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500 font-bold text-sm">
                        {idx + 1}
                      </span>
                      <span className="text-gray-300 flex-1 pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="px-6 md:px-12 py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Need <span className="text-yellow-500">Help?</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Common issues and solutions
            </p>
          </div>

          <div className="space-y-4">
            <details className="bg-gradient-to-r from-black to-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-yellow-500/30 transition-all group">
              <summary className="px-6 py-4 cursor-pointer flex items-center justify-between text-lg font-bold">
                <span className="text-white">Video won't play or keeps buffering</span>
                <span className="text-3xl text-yellow-500 group-open:rotate-45 transition-transform duration-300">+</span>
              </summary>
              <div className="px-6 pb-4 text-gray-300">
                <ul className="list-disc list-inside space-y-2">
                  <li>Check your internet connection speed (minimum 3 Mbps)</li>
                  <li>Try lowering video quality in settings</li>
                  <li>Close other apps using internet</li>
                  <li>Restart your device and try again</li>
                </ul>
              </div>
            </details>

            <details className="bg-gradient-to-r from-black to-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-yellow-500/30 transition-all group">
              <summary className="px-6 py-4 cursor-pointer flex items-center justify-between text-lg font-bold">
                <span className="text-white">Can't find Zentrya app on my device</span>
                <span className="text-3xl text-yellow-500 group-open:rotate-45 transition-transform duration-300">+</span>
              </summary>
              <div className="px-6 pb-4 text-gray-300">
                <ul className="list-disc list-inside space-y-2">
                  <li>Ensure your device meets minimum requirements</li>
                  <li>Check if Zentrya is available in your region's app store</li>
                  <li>Try streaming via web browser at zentrya.com</li>
                  <li>Contact support for device-specific help</li>
                </ul>
              </div>
            </details>

            <details className="bg-gradient-to-r from-black to-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-yellow-500/30 transition-all group">
              <summary className="px-6 py-4 cursor-pointer flex items-center justify-between text-lg font-bold">
                <span className="text-white">How do I download content for offline viewing?</span>
                <span className="text-3xl text-yellow-500 group-open:rotate-45 transition-transform duration-300">+</span>
              </summary>
              <div className="px-6 pb-4 text-gray-300">
                <ul className="list-disc list-inside space-y-2">
                  <li>Open the Zentrya mobile app (downloads only available on mobile)</li>
                  <li>Find the content you want to download</li>
                  <li>Tap the download icon</li>
                  <li>Access downloads from the "My Downloads" section</li>
                </ul>
              </div>
            </details>

            <details className="bg-gradient-to-r from-black to-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-yellow-500/30 transition-all group">
              <summary className="px-6 py-4 cursor-pointer flex items-center justify-between text-lg font-bold">
                <span className="text-white">Casting to TV not working</span>
                <span className="text-3xl text-yellow-500 group-open:rotate-45 transition-transform duration-300">+</span>
              </summary>
              <div className="px-6 pb-4 text-gray-300">
                <ul className="list-disc list-inside space-y-2">
                  <li>Ensure your device and TV are on the same WiFi network</li>
                  <li>Restart both your device and TV</li>
                  <li>Update the Zentrya app to the latest version</li>
                  <li>Check Chromecast/AirPlay is enabled on your TV</li>
                </ul>
              </div>
            </details>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Still having issues?</p>
            <Link 
              to="/help"
              className="inline-flex items-center gap-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 px-6 py-3 rounded-md font-semibold transition-all border border-yellow-500/20"
            >
              Visit Help Center
              <AlertCircle size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 py-24 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Start <span className="text-yellow-500">Streaming?</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join Zentrya today and watch on all your devices
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-10 py-4 rounded-md font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/50 flex items-center justify-center gap-2"
            >
              Get Started
              <Play size={24} />
            </Link>
            <Link 
              to="/contact"
              className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-md font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
            >
              Contact Support
            </Link>
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

          <div className="pt-8 border-t border-gray-900">
            <p className="text-gray-500 text-sm text-center">
              &copy; 2025 Zentrya. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}