// src/components/HelpCenter.jsx
// Help Center page for Zentrya Tv - FAQ only version

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import aboutBg from "../assets/faq.jpg";

export default function HelpCenter() {
  const [scrolled, setScrolled] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqs = [
    // GETTING STARTED
    {
      question: "How do I sign up for Zentrya Tv?",
      answer: "Download the Zentrya Tv mobile app from Google Play Store (Android) or join the iOS waitlist. Create an account with your phone number, choose a subscription plan, and start watching. You'll get a 30-day free trial for new accounts."
    },
    {
      question: "What content is available on Zentrya Tv?",
      answer: "Zentrya Tv offers a vast library of Tanzanian and East African movies, TV shows, documentaries, and original content. We feature Bongo Movies, local series, international content, and exclusive Zentrya Tv Originals. New content is added weekly."
    },
    {
      question: "Can I watch Zentrya Tv on my computer or laptop?",
      answer: "Web streaming is not available yet. Currently, Zentrya Tv is only available on mobile devices through our Android app. Download the app to start streaming. Web streaming is coming soon!"
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! New users get a 30-day free trial with full access to all content. No payment required until the trial ends. You can cancel anytime during the trial period without being charged."
    },
    {
      question: "What languages are available on Zentrya Tv?",
      answer: "Zentrya Tv supports Swahili and English interfaces. Content includes movies and shows in Swahili, English, and other African languages with subtitle options available for most titles."
    },
    {
      question: "Can I watch with my family?",
      answer: "Yes! Create up to 5 profiles per account. Each family member gets personalized recommendations. Kids profiles are available with age-appropriate content filtering."
    },
    {
      question: "What are Zentrya Tv Originals?",
      answer: "Zentrya Tv Originals are exclusive movies and series produced or commissioned by Zentrya Tv. These include Tanzanian and East African stories you won't find anywhere else. New Originals premiere monthly."
    },
    {
      question: "How often is new content added?",
      answer: "New movies and episodes are added weekly. Major releases typically arrive on Fridays. Check the 'New Releases' section in the app for the latest additions."
    },

    // ACCOUNT & PROFILE
    {
      question: "How do I reset my password?",
      answer: "In the app, go to Settings > Account > Reset Password. Enter your registered phone number and follow the SMS verification process to create a new password."
    },
    {
      question: "How many profiles can I create?",
      answer: "You can create up to 5 profiles per account. Each profile has its own personalized recommendations, watchlist, and viewing history. Kids profiles are also available with age-appropriate content filtering."
    },
    {
      question: "How do I switch between profiles?",
      answer: "Tap your profile icon in the app. A menu shows all profiles on your account. Tap any profile name to switch. Each profile maintains separate viewing history and preferences."
    },
    {
      question: "How do I set up a Kids profile?",
      answer: "To create a Kids profile: Tap profile icon > Manage Profiles > Add Profile > Enter name > Toggle 'Kids Profile' ON > Save. Kids profiles show only age-appropriate content."
    },

    // DEVICES & APPS
    {
      question: "What devices support Zentrya Tv?",
      answer: "Currently, Zentrya Tv is available on Android phones and tablets (7.0+). iOS app coming soon - join the waitlist! Web streaming is not available yet but coming soon."
    },
    {
      question: "How many devices can I use simultaneously?",
      answer: "Basic Plan: 1 device, Standard Plan: 2 devices, Premium Plan: 4 devices. You can install the app on unlimited devices but only stream on the allowed number simultaneously."
    },
    {
      question: "How do I download the mobile app?",
      answer: "Android: Open Google Play Store, search 'Zentrya Tv', tap Install. iOS: Join our waitlist at Zentrya Tv.com/waitlist to be notified when available. Minimum Android version: 7.0."
    },
    {
      question: "What internet speed do I need?",
      answer: "Minimum speeds: SD (480p): 3 Mbps, HD (720p): 5 Mbps, Full HD (1080p): 10 Mbps, 4K Ultra HD: 25 Mbps. WiFi or mobile data connection required."
    },
    {
      question: "Can I use Zentrya Tv offline?",
      answer: "Yes, with downloads! Download movies/episodes on mobile (Standard/Premium plans only). Once downloaded, watch anytime without internet. Downloads available for 30 days or 48 hours after starting playback."
    },

    // STREAMING QUALITY
    {
      question: "Why is my video buffering?",
      answer: "Buffering is usually caused by slow internet. Solutions: 1) Check your internet speed (need 5+ Mbps for HD) 2) Lower video quality in player settings 3) Close other apps using bandwidth 4) Move closer to WiFi router 5) Clear app cache."
    },
    {
      question: "How do I change video quality?",
      answer: "While watching, tap the screen, then tap the HD/Quality icon. Select desired quality (Auto, 240p, 360p, 480p, 720p, 1080p, 4K). Available qualities depend on your plan and content."
    },
    {
      question: "What is data saver mode?",
      answer: "Data Saver reduces video quality to save mobile data. Enable in App Settings > Data Usage > Data Saver. Limits streaming to SD quality (~0.3GB/hour vs HD ~1GB/hour). Recommended for cellular connections."
    },
    {
      question: "How much data does streaming use?",
      answer: "Approximate data per hour: SD (480p): 0.7GB, HD (720p): 1.5GB, Full HD (1080p): 3GB, 4K: 7GB. Use Data Saver on mobile to reduce usage. WiFi recommended for HD/4K."
    },
    {
      question: "Can I watch in 4K?",
      answer: "Coming soon! 4K Ultra HD streaming is not available yet but will be added in a future update. Stay tuned for announcements about new features and content quality improvements."
    },

    // DOWNLOADS
    {
      question: "How do I download videos for offline viewing?",
      answer: "To download: Find the movie/episode > Tap the download icon > Choose quality > Wait for download to complete. Downloads available on mobile apps only with Standard or Premium plans."
    },
    {
      question: "How long do downloads last?",
      answer: "Downloads expire after 30 days or 48 hours after you start watching (whichever comes first). You can renew expired downloads if you're still subscribed."
    },
    {
      question: "Where are my downloads saved?",
      answer: "Downloads are stored in the Zentrya Tv app's secure storage. They're encrypted and can't be accessed by other apps or file managers. Access via app's Downloads section."
    },
    {
      question: "Why can't I download certain titles?",
      answer: "Some content isn't available for download due to licensing restrictions. These titles show a disabled download button. We're working to expand download availability."
    },
    {
      question: "Can I watch downloads without internet?",
      answer: "Yes! Watch completely offline with no internet connection needed. Note: You must connect online every 30 days to verify your subscription and renew downloads."
    },

    // SECURITY & PRIVACY
    {
      question: "Is my payment information secure?",
      answer: "Yes! We use industry-standard encryption (SSL/TLS) and are PCI-DSS compliant. We never store complete card details. All transactions are processed through secure payment gateways."
    },
    {
      question: "How do I secure my account?",
      answer: "Security tips: 1) Use a strong, unique password 2) Don't share your password 3) Log out on shared devices 4) Review account activity regularly 5) Update payment info only through our official app."
    },
    {
      question: "What should I do if my account is hacked?",
      answer: "If compromised: 1) Reset password immediately 2) Sign out all devices (Settings > Manage Devices > Sign Out All) 3) Contact support@Zentrya Tv.com 4) Check billing for unauthorized charges."
    },

    // TROUBLESHOOTING
    {
      question: "Video won't play - what should I do?",
      answer: "Try these steps: 1) Check internet connection 2) Restart app 3) Clear app cache 4) Update app to latest version 5) Restart your device 6) Reinstall the app. Still not working? Contact support."
    },
    {
      question: "App keeps crashing on mobile",
      answer: "To fix crashes: 1) Update app from Play Store 2) Restart phone 3) Clear app cache (Settings > Apps > Zentrya Tv > Clear Cache) 4) Free up storage space (need 1GB+ free) 5) Reinstall app."
    },
    {
      question: "Can't sign in - 'Incorrect password' error",
      answer: "If password isn't working: 1) Use 'Forgot Password' to reset 2) Check that you're using the correct phone number 3) Ensure password is typed correctly 4) Contact support if reset SMS doesn't arrive."
    },
    {
      question: "Sound not working",
      answer: "Audio troubleshooting: 1) Check device volume and mute 2) Test audio with other apps 3) Restart device 4) Update app 5) Check audio output device (headphones, speakers) 6) Reinstall app."
    },
    {
      question: "Download failed or stuck",
      answer: "Download troubleshooting: 1) Check internet connection 2) Verify sufficient storage space 3) Restart app 4) Delete and retry download 5) Download over WiFi 6) Update app."
    },
    {
      question: "My List items disappeared",
      answer: "Missing My List: 1) Check correct profile is selected 2) Scroll down (items may have moved) 3) Verify item wasn't removed from Zentrya Tv 4) Restart app 5) Contact support if issue persists."
    }
  ];

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
            to="/contact" 
            className="text-sm md:text-base font-medium text-white hover:text-yellow-500 transition-colors"
          >
            Contact
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
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        </div>

        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.08) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-6">
            <HelpCircle size={20} className="text-yellow-500" />
            <span className="text-yellow-500 font-semibold text-sm">HELP CENTER</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-yellow-100 to-yellow-500 bg-clip-text text-transparent">
              Frequently Asked
            </span>
            <br />
            <span className="text-white">Questions</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about Zentrya Tv
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 md:px-12 py-20 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gray-400 text-lg">
              {faqs.length} helpful articles
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details 
                key={index}
                open={expandedFAQ === index}
                onToggle={(e) => setExpandedFAQ(e.target.open ? index : null)}
                className="bg-gradient-to-r from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-500/30 transition-all group"
              >
                <summary className="px-6 md:px-8 py-6 cursor-pointer flex items-center justify-between text-lg font-bold list-none">
                  <span className="text-white flex items-center gap-3 flex-1">
                    <HelpCircle size={24} className="text-yellow-500 flex-shrink-0" />
                    <span className="text-left">{faq.question}</span>
                  </span>
                  <span className="text-3xl text-yellow-500 group-open:rotate-45 transition-transform duration-300 flex-shrink-0 ml-4">+</span>
                </summary>
                <div className="px-6 md:px-8 pb-6 text-gray-300 leading-relaxed">
                  <div className="pl-9">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-6 md:px-12 py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Still Need <span className="text-yellow-500">Help?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Our support team is here for you
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/50"
          >
            Contact Support
          </Link>
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