// src/components/TermsOfUse.jsx
// Terms of Use page for Zentrya Tv

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Shield, AlertCircle, CheckCircle, Scale } from "lucide-react";

export default function TermsOfUse() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: `By accessing and using Zentrya Tv's streaming service ("Service"), you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our Service.

These terms constitute a legally binding agreement between you and Zentrya Ltd., a company registered in Tanzania. Your continued use of the Service indicates your acceptance of these terms and any modifications thereof.`
    },
    {
      id: "service",
      title: "2. Service Description",
      content: `Zentrya Tv provides a subscription-based streaming service that allows members to access entertainment content, including movies, TV shows, documentaries, and other video content over the internet to certain internet-connected devices.

The Service and any content viewed through the Service are for your personal and non-commercial use only. During your subscription, we grant you a limited, non-exclusive, non-transferable right to access the Service and view content.`
    },
    {
      id: "eligibility",
      title: "3. Eligibility",
      content: `You must be at least 18 years of age to subscribe to our Service. Minors may only use the Service under the supervision of an adult. By using the Service, you represent and warrant that you meet these eligibility requirements.

You must provide accurate and complete information when creating your account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.`
    },
    {
      id: "subscription",
      title: "4. Subscription and Billing",
      content: `4.1 Subscription Plans: We offer various subscription plans with different features and pricing. Detailed information about our plans is available on our website.

4.2 Billing: Your subscription begins on the date you complete the registration process. You will be charged the subscription fee at the start of each billing cycle until you cancel.

4.3 Payment Methods: We accept various payment methods including mobile money (M-Pesa, Airtel Money, Tigo Pesa), credit/debit cards, and other methods as indicated on our website.

4.4 Price Changes: We may change our subscription fees from time to time. We will notify you at least 30 days before any price change takes effect.

4.5 Free Trials: Free trial offers, if available, are limited to new subscribers only. We may verify your eligibility and reserve the right to revoke free trial access.`
    },
    {
      id: "cancellation",
      title: "5. Cancellation and Refunds",
      content: `You may cancel your subscription at any time. Your cancellation will take effect at the end of your current billing period, and you will continue to have access to the Service until that time.

Payments are non-refundable except as required by law or as specified in our Refund Policy. We do not provide refunds or credits for partial subscription periods.`
    },
    {
      id: "content",
      title: "6. Content and Licenses",
      content: `6.1 Content Availability: The content available through the Service may vary by location and may change from time to time. We do not guarantee the availability of any specific content.

6.2 License: All content on Zentrya Tv is licensed, not sold. We grant you a limited, non-exclusive, non-transferable license to stream and view content through the Service for personal, non-commercial use only.

6.3 Geographic Restrictions: Content available through the Service is primarily licensed for viewing in Tanzania. You agree not to use any technology to circumvent geographic restrictions.

6.4 Quality: Stream quality may vary based on your internet connection speed, device capabilities, and other factors. We do not guarantee any specific quality level.`
    },
    {
      id: "prohibited",
      title: "7. Prohibited Uses",
      content: `You agree not to:
• Use the Service for any illegal purpose or in violation of any laws
• Share your account credentials with others
• Circumvent or attempt to circumvent any security features
• Copy, download, reproduce, distribute, or create derivative works from our content
• Use any automated systems or software to extract data from the Service
• Remove, alter, or obscure any copyright, trademark, or other proprietary notices
• Use the Service in any way that could damage, disable, or impair our servers
• Attempt to gain unauthorized access to any part of the Service
• Upload, post, or transmit any malicious code or viruses
• Impersonate any person or entity or misrepresent your affiliation with any person or entity`
    },
    {
      id: "intellectual",
      title: "8. Intellectual Property",
      content: `All content, features, and functionality of the Service, including but not limited to text, graphics, logos, icons, images, audio clips, video clips, data compilations, and software, are the exclusive property of Zentrya Tv or its content suppliers and are protected by Tanzanian and international copyright, trademark, patent, trade secret, and other intellectual property laws.

Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.`
    },
    {
      id: "user-content",
      title: "9. User-Generated Content",
      content: `If our Service allows you to post reviews, comments, or other content, you grant Zentrya Tv a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute such content in connection with the Service.

You represent and warrant that you own or have the necessary rights to any content you post and that such content does not violate any third-party rights or applicable laws.`
    },
    {
      id: "privacy",
      title: "10. Privacy and Data Protection",
      content: `Your use of the Service is subject to our Privacy Policy, which is incorporated into these Terms by reference. We collect, use, and protect your personal information as described in the Privacy Policy.

We comply with applicable Tanzanian data protection laws and regulations. By using the Service, you consent to our collection and use of your data as described in our Privacy Policy.`
    },
    {
      id: "disclaimer",
      title: "11. Disclaimer of Warranties",
      content: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

We do not warrant that the Service will be uninterrupted, secure, or error-free, or that any defects will be corrected. You use the Service at your own risk.`
    },
    {
      id: "limitation",
      title: "12. Limitation of Liability",
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, Zentrya Tv SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.

Our total liability to you for all claims arising out of or relating to these Terms or the Service shall not exceed the amount you paid to us in the 12 months preceding the claim.`
    },
    {
      id: "termination",
      title: "13. Termination",
      content: `We may suspend or terminate your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.

Upon termination, your right to use the Service will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.`
    },
    {
      id: "governing",
      title: "14. Governing Law and Dispute Resolution",
      content: `These Terms shall be governed by and construed in accordance with the laws of the United Republic of Tanzania, without regard to its conflict of law provisions.

Any disputes arising out of or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the courts of Tanzania, located in Dar es Salaam.`
    },
    {
      id: "changes",
      title: "15. Changes to Terms",
      content: `We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on our website and updating the "Last Updated" date.

Your continued use of the Service after any changes constitutes your acceptance of the new Terms. If you do not agree to the modified Terms, you must stop using the Service.`
    },
    {
      id: "general",
      title: "16. General Provisions",
      content: `16.1 Entire Agreement: These Terms, together with our Privacy Policy and any other legal notices published by us, constitute the entire agreement between you and Zentrya Tv.

16.2 Waiver: Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.

16.3 Severability: If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect.

16.4 Assignment: You may not assign or transfer these Terms or your rights under them without our written consent. We may assign our rights to any affiliate or successor.

16.5 Contact: For questions about these Terms, please contact us at legal@Zentrya Tv.com.`
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
      <section className="relative pt-32 pb-16 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-black to-black" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-6">
            <Scale size={20} className="text-yellow-500" />
            <span className="text-yellow-500 font-semibold text-sm">Legal Agreement</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Terms of <span className="text-yellow-500">Use</span>
          </h1>

          <p className="text-gray-400 text-lg mb-6">
            Last Updated: January 31, 2026
          </p>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle size={24} className="text-yellow-500 flex-shrink-0 mt-1" />
              <div className="text-left">
                <p className="text-white font-semibold mb-2">Important Notice</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Please read these Terms of Use carefully before using Zentrya Tv's streaming service. 
                  By accessing or using our Service, you agree to be bound by these terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="px-6 md:px-12 py-12 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FileText size={24} className="text-yellow-500" />
            Table of Contents
          </h2>
          
          <div className="grid md:grid-cols-2 gap-3">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-gray-400 hover:text-yellow-500 transition-colors text-sm"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="px-6 md:px-12 py-12 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  {section.title}
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Acceptance Section */}
          <div className="mt-16 bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800">
            <div className="flex items-start gap-4">
              <CheckCircle size={32} className="text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">Agreement Acknowledgment</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  By clicking "I Agree" during registration or by continuing to use the Zentrya Tv service, 
                  you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
                </p>
                <p className="text-gray-400 text-sm">
                  If you have any questions about these terms, please contact us at{" "}
                  <a href="mailto:terms@zentrya.africa" className="text-yellow-500 hover:text-yellow-400">
                    terms@zentrya.africa
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Related Policies */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-white">Related Legal Documents</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                to="/privacy"
                className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all group"
              >
                <Shield size={24} className="text-yellow-500 mb-3" />
                <h4 className="font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                  Privacy Policy
                </h4>
                <p className="text-gray-400 text-sm">
                  Learn how we collect, use, and protect your personal information
                </p>
              </Link>

              <Link 
                to="/copyright"
                className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all group"
              >
                <FileText size={24} className="text-yellow-500 mb-3" />
                <h4 className="font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                  Copyright Policy
                </h4>
                <p className="text-gray-400 text-sm">
                  Our policy regarding copyright and intellectual property rights
                </p>
              </Link>

              <Link 
                to="/refund"
                className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all group"
              >
                <CheckCircle size={24} className="text-yellow-500 mb-3" />
                <h4 className="font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                  Refund Policy
                </h4>
                <p className="text-gray-400 text-sm">
                  Information about cancellations, refunds, and billing
                </p>
              </Link>

              <Link 
                to="/contact"
                className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all group"
              >
                <AlertCircle size={24} className="text-yellow-500 mb-3" />
                <h4 className="font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                  Contact Support
                </h4>
                <p className="text-gray-400 text-sm">
                  Have questions? Get in touch with our legal team
                </p>
              </Link>
            </div>
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
              <span className="text-yellow-500"> TV</span>
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