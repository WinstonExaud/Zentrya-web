// src/components/PrivacyPolicy.jsx
// Privacy Policy page for Zentrya

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye, Database, UserCheck, Globe, AlertCircle, FileText } from "lucide-react";

export default function PrivacyPolicy() {
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
      id: "introduction",
      title: "1. Introduction",
      icon: Shield,
      content: `Welcome to Zentrya. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our streaming service.

This policy applies to all users of Zentrya's services, including our website, mobile applications, and any related services (collectively, the "Service").

By using our Service, you agree to the collection and use of information in accordance with this policy.`
    },
    {
      id: "information-collect",
      title: "2. Information We Collect",
      icon: Database,
      content: `2.1 Information You Provide:
• Account Information: Name, email address, password, phone number, payment information
• Profile Information: Viewing preferences, ratings, reviews, watchlist
• Payment Information: Credit/debit card details, mobile money account information (processed securely by our payment partners)
• Communication: Customer support inquiries, feedback, survey responses

2.2 Information We Collect Automatically:
• Device Information: Device type, operating system, browser type, IP address
• Usage Data: Content viewed, watch time, search queries, interaction with features
• Location Data: General location based on IP address (we do not collect precise GPS location)
• Cookies and Similar Technologies: See our Cookie Policy for details

2.3 Information from Third Parties:
• Payment processors (transaction confirmations)
• Social media platforms (if you connect your accounts)
• Analytics providers (aggregated usage statistics)`
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
      icon: Eye,
      content: `We use your information for the following purposes:

3.1 Service Delivery:
• Process your subscription and payments
• Provide access to content and features
• Manage your account and preferences
• Deliver customer support

3.2 Personalization:
• Recommend content based on your viewing history
• Customize your user experience
• Remember your preferences and settings

3.3 Communication:
• Send service-related notifications
• Provide customer support responses
• Send marketing communications (with your consent)
• Notify you of updates and new features

3.4 Security and Fraud Prevention:
• Protect against unauthorized access
• Detect and prevent fraud
• Enforce our Terms of Use
• Comply with legal obligations

3.5 Analytics and Improvement:
• Analyze usage patterns and trends
• Improve our Service and content offerings
• Develop new features and services
• Conduct research and testing`
    },
    {
      id: "sharing",
      title: "4. How We Share Your Information",
      icon: Globe,
      content: `We do not sell your personal information. We may share your information in the following circumstances:

4.1 Service Providers:
• Payment processors (e.g., M-Pesa, Stripe)
• Cloud hosting providers
• Customer support platforms
• Analytics services
• Content delivery networks

4.2 Business Transfers:
In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.

4.3 Legal Requirements:
• To comply with applicable laws and regulations
• To respond to legal process (subpoenas, court orders)
• To protect our rights, property, or safety
• To enforce our Terms of Use

4.4 With Your Consent:
We may share information with third parties when you explicitly consent to such sharing.`
    },
    {
      id: "data-security",
      title: "5. Data Security",
      icon: Lock,
      content: `We implement appropriate technical and organizational measures to protect your personal data:

5.1 Security Measures:
• Encryption of data in transit and at rest
• Secure authentication protocols
• Regular security audits and assessments
• Access controls and authentication
• Secure data centers and infrastructure

5.2 Payment Security:
• We do not store complete credit card information
• Payment processing is handled by PCI-DSS compliant providers
• Mobile money transactions use secure API connections

5.3 Account Security:
• Strong password requirements
• Option for two-factor authentication
• Session management and timeout controls
• Suspicious activity monitoring

However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.`
    },
    {
      id: "your-rights",
      title: "6. Your Privacy Rights",
      icon: UserCheck,
      content: `You have the following rights regarding your personal data:

6.1 Access and Portability:
• Request a copy of your personal data
• Export your data in a common format

6.2 Correction:
• Update or correct inaccurate information
• Complete incomplete information

6.3 Deletion:
• Request deletion of your account and data
• Note: We may retain certain information as required by law

6.4 Objection and Restriction:
• Object to certain data processing activities
• Request restriction of processing in specific circumstances

6.5 Marketing Communications:
• Opt-out of marketing emails at any time
• Manage communication preferences in account settings

6.6 Cookies:
• Control cookie preferences through your browser settings
• Opt-out of certain analytics cookies

To exercise these rights, contact us at info@zentrya.africa.`
    },
    {
      id: "children",
      title: "7. Children's Privacy",
      content: `Our Service is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13.

If you are a parent or guardian and believe your child has provided us with personal information, please contact us at info@zentrya.africa. We will take steps to delete such information from our systems.

For children aged 13-17, we recommend parental supervision when using our Service. Parents can create kids profiles with appropriate content restrictions.`
    },
    {
      id: "cookies",
      title: "8. Cookies and Tracking",
      content: `We use cookies and similar tracking technologies to:
• Remember your preferences and settings
• Analyze usage patterns and improve our Service
• Deliver personalized content recommendations
• Measure the effectiveness of marketing campaigns

Types of cookies we use:
• Essential cookies: Required for the Service to function
• Functional cookies: Remember your preferences
• Analytics cookies: Help us understand usage patterns
• Marketing cookies: Deliver relevant advertisements

You can control cookies through your browser settings. Disabling certain cookies may affect functionality of the Service.`
    },
    {
      id: "retention",
      title: "9. Data Retention",
      content: `We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy:

• Active Accounts: We retain data while your subscription is active
• Inactive Accounts: Data is retained for 12 months after subscription ends
• Legal Obligations: Some data may be retained longer as required by law
• Backups: Data in backups may persist for up to 90 days after deletion

After the retention period, we securely delete or anonymize your personal data.`
    },
    {
      id: "international",
      title: "10. International Data Transfers",
      content: `Your information may be transferred to and processed in countries other than Tanzania. These countries may have different data protection laws.

When we transfer data internationally, we ensure appropriate safeguards are in place:
• Standard contractual clauses
• Adequacy decisions by relevant authorities
• Explicit consent when required

We primarily store data in secure data centers within Africa and ensure all transfers comply with applicable data protection laws.`
    },
    {
      id: "third-party",
      title: "11. Third-Party Services",
      content: `Our Service may contain links to third-party websites, applications, or services. This Privacy Policy does not apply to these third-party services.

We are not responsible for the privacy practices of third parties. We recommend reviewing the privacy policies of any third-party services you use.

Third-party services we integrate with:
• Payment providers (M-Pesa, Airtel Money, Stripe)
• Social media platforms (Facebook, Twitter, Instagram)
• Analytics providers (anonymized data only)`
    },
    {
      id: "changes",
      title: "12. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by:
• Posting the updated policy on our website
• Sending an email notification to your registered email address
• Displaying a prominent notice in the Service

The "Last Updated" date at the top of this policy indicates when it was last revised. Your continued use of the Service after changes constitutes acceptance of the updated policy.`
    },
    {
      id: "contact",
      title: "13. Contact Us",
      content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

Email: info@zentrya.africa
Phone: +255 741 361 767
Address: Zentrya Ltd., Dar es Salaam, Tanzania

Data Protection Officer: privacy@zentrya.africa
We will respond to your inquiry within 30 days.`
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
            <Shield size={20} className="text-yellow-500" />
            <span className="text-yellow-500 font-semibold text-sm">Your Privacy Matters</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Privacy <span className="text-yellow-500">Policy</span>
          </h1>

          <p className="text-gray-400 text-lg mb-6">
            Last Updated: January 31, 2026
          </p>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Lock size={24} className="text-yellow-500 flex-shrink-0 mt-1" />
              <div className="text-left">
                <p className="text-white font-semibold mb-2">Our Commitment to Your Privacy</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  At Zentrya, we are committed to protecting your privacy and being transparent about 
                  how we collect, use, and safeguard your personal information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="px-6 md:px-12 py-12 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Privacy at a Glance</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 text-center">
              <div className="w-14 h-14 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database size={28} className="text-yellow-500" />
              </div>
              <h3 className="font-bold text-white mb-2">What We Collect</h3>
              <p className="text-gray-400 text-sm">
                Account info, viewing data, device details, and payment information
              </p>
            </div>

            <div className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 text-center">
              <div className="w-14 h-14 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye size={28} className="text-yellow-500" />
              </div>
              <h3 className="font-bold text-white mb-2">How We Use It</h3>
              <p className="text-gray-400 text-sm">
                To provide service, personalize experience, and improve our platform
              </p>
            </div>

            <div className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 text-center">
              <div className="w-14 h-14 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck size={28} className="text-yellow-500" />
              </div>
              <h3 className="font-bold text-white mb-2">Your Rights</h3>
              <p className="text-gray-400 text-sm">
                Access, correct, delete, or export your data at any time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="px-6 md:px-12 py-12 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FileText size={24} className="text-yellow-500" />
            Table of Contents
          </h2>
          
          <div className="grid md:grid-cols-2 gap-3">
            {sections.map((section) => (
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

      {/* Policy Content */}
      <section className="px-6 md:px-12 py-12 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.id} id={section.id}>
                  <div className="flex items-start gap-3 mb-4">
                    {Icon && (
                      <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-yellow-500" />
                      </div>
                    )}
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {section.title}
                    </h2>
                  </div>
                  <div className="prose prose-invert max-w-none ml-13">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact for Privacy Questions */}
          <div className="mt-16 bg-gradient-to-br from-black to-gray-800 p-8 rounded-xl border border-gray-700">
            <div className="flex items-start gap-4">
              <AlertCircle size={32} className="text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">Questions About Your Privacy?</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We're here to help you understand how we protect your data. If you have any questions 
                  or concerns about our privacy practices, please don't hesitate to reach out.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="mailto:privacy@zentrya.africa"
                    className="inline-flex items-center gap-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 px-4 py-2 rounded-md font-semibold transition-all border border-yellow-500/20"
                  >
                    Email Privacy Team
                  </a>
                  <Link 
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md font-semibold transition-all"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Policies */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-white">Related Legal Documents</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                to="/terms"
                className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all group"
              >
                <FileText size={24} className="text-yellow-500 mb-3" />
                <h4 className="font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                  Terms of Use
                </h4>
                <p className="text-gray-400 text-sm">
                  Legal terms governing your use of Zentrya's service
                </p>
              </Link>

              <Link 
                to="/copyright"
                className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition-all group"
              >
                <Shield size={24} className="text-yellow-500 mb-3" />
                <h4 className="font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                  Copyright Policy
                </h4>
                <p className="text-gray-400 text-sm">
                  How we protect intellectual property rights
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