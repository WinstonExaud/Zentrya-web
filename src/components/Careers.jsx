// src/components/Careers.jsx
// Careers page for Zentrya Tv - Jobs, Internships, Talent Submissions

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  Users, 
  Heart, 
  Zap,
  Globe,
  Award,
  Code,
  Palette,
  Megaphone,
  HeadphonesIcon,
  Film,
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  ChevronRight,
  Send,
  Upload,
  CheckCircle,
  Building2,
  GraduationCap,
  Rocket
} from "lucide-react";

export default function Careers() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume: null,
    coverLetter: ""
  });
  const [talentForm, setTalentForm] = useState({
    name: "",
    email: "",
    phone: "",
    talentType: "",
    portfolio: "",
    description: ""
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const benefits = [
    {
      icon: Heart,
      title: "Health Insurance",
      description: "Comprehensive medical coverage for you and your family"
    },
    {
      icon: DollarSign,
      title: "Competitive Salary",
      description: "Market-leading compensation packages and bonuses"
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Work-life balance with flexible working arrangements"
    },
    {
      icon: GraduationCap,
      title: "Learning & Development",
      description: "Continuous training, courses, and skill development"
    },
    {
      icon: Rocket,
      title: "Career Growth",
      description: "Clear career progression paths and mentorship"
    },
    {
      icon: Users,
      title: "Amazing Team",
      description: "Work with passionate, talented people who love what they do"
    }
  ];

  const values = [
    {
      icon: Zap,
      title: "Innovation First",
      description: "We embrace new ideas and cutting-edge technology"
    },
    {
      icon: Heart,
      title: "People Focused",
      description: "Our team is our greatest asset"
    },
    {
      icon: Globe,
      title: "Impact Driven",
      description: "Building something that transforms East Africa"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We set high standards and exceed them"
    }
  ];

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Dar es Salaam, Tanzania",
      type: "Full-time",
      experience: "3-5 years",
      icon: Code,
      description: "Build scalable backend systems and beautiful frontend experiences for millions of users.",
      requirements: [
        "Expert in React, Node.js, and PostgreSQL",
        "Experience with cloud platforms (AWS/GCP)",
        "Strong system design skills",
        "Passion for building great products"
      ]
    },
    {
      id: 2,
      title: "Mobile Developer (React Native)",
      department: "Engineering",
      location: "Dar es Salaam, Tanzania",
      type: "Full-time",
      experience: "2-4 years",
      icon: Code,
      description: "Create seamless mobile experiences for Android and iOS platforms.",
      requirements: [
        "Expert in React Native",
        "Experience with mobile streaming",
        "Published apps on App Store/Play Store",
        "Understanding of mobile UX patterns"
      ]
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      location: "Dar es Salaam, Tanzania",
      type: "Full-time",
      experience: "2-3 years",
      icon: Palette,
      description: "Design beautiful, intuitive interfaces that delight our users.",
      requirements: [
        "Strong portfolio in mobile/web design",
        "Expert in Figma and design systems",
        "Understanding of user research",
        "Passion for great user experiences"
      ]
    },
    {
      id: 4,
      title: "Content Curator",
      department: "Content",
      location: "Dar es Salaam, Tanzania",
      type: "Full-time",
      experience: "1-3 years",
      icon: Film,
      description: "Source and curate the best African and international content for our platform.",
      requirements: [
        "Deep knowledge of African cinema",
        "Experience in media/entertainment",
        "Strong negotiation skills",
        "Passion for great storytelling"
      ]
    },
    {
      id: 5,
      title: "Digital Marketing Manager",
      department: "Marketing",
      location: "Dar es Salaam, Tanzania",
      type: "Full-time",
      experience: "3-5 years",
      icon: Megaphone,
      description: "Drive user acquisition and engagement through innovative digital campaigns.",
      requirements: [
        "Experience with digital marketing channels",
        "Data-driven approach to marketing",
        "Social media expertise",
        "Understanding of Tanzanian market"
      ]
    },
    {
      id: 6,
      title: "Customer Support Specialist",
      department: "Support",
      location: "Dar es Salaam, Tanzania",
      type: "Full-time",
      experience: "0-2 years",
      icon: HeadphonesIcon,
      description: "Provide exceptional support to our users and ensure their satisfaction.",
      requirements: [
        "Excellent communication skills",
        "Fluent in Swahili and English",
        "Problem-solving mindset",
        "Customer-first attitude"
      ]
    }
  ];

  const internships = [
    {
      id: 1,
      title: "Software Engineering Intern",
      department: "Engineering",
      duration: "3-6 months",
      icon: Code,
      description: "Learn from experienced engineers while building real features for our platform."
    },
    {
      id: 2,
      title: "Design Intern",
      department: "Design",
      duration: "3-6 months",
      icon: Palette,
      description: "Work on real design projects and learn industry-standard tools and processes."
    },
    {
      id: 3,
      title: "Marketing Intern",
      department: "Marketing",
      duration: "3-6 months",
      icon: Megaphone,
      description: "Gain hands-on experience in digital marketing, social media, and campaigns."
    },
    {
      id: 4,
      title: "Content Operations Intern",
      department: "Content",
      duration: "3-6 months",
      icon: Film,
      description: "Help manage and organize our growing content library and metadata."
    }
  ];

  const categories = [
    { id: "all", name: "All Positions" },
    { id: "engineering", name: "Engineering" },
    { id: "design", name: "Design" },
    { id: "content", name: "Content" },
    { id: "marketing", name: "Marketing" },
    { id: "support", name: "Support" }
  ];

  const filteredJobs = selectedCategory === "all" 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department.toLowerCase() === selectedCategory);

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    // Handle job application submission
    console.log("Job Application:", applicationForm);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleTalentSubmit = (e) => {
    e.preventDefault();
    // Handle talent submission
    console.log("Talent Submission:", talentForm);
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
            <Briefcase size={20} className="text-yellow-500" />
            <span className="text-yellow-500 font-semibold text-sm">Join Our Team</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-yellow-100 to-yellow-500 bg-clip-text text-transparent">
              Build the Future of
            </span>
            <br />
            <span className="text-white">Entertainment in Africa</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join a team of passionate innovators transforming how millions of Tanzanians 
            and Africans experience entertainment. We're hiring!
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="#openings"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-md font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/50 flex items-center justify-center gap-2 hover:scale-105 transform"
            >
              View Open Positions
              <ChevronRight size={24} />
            </a>
            <a 
              href="#talent"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
            >
              Submit Talent
            </a>
          </div>
        </div>
      </section>

      {/* Why Join Zentrya Tv */}
      <section className="px-6 md:px-12 py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Join <span className="text-yellow-500">Zentrya Tv?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              We're building something special. Here's what makes Zentrya Tv an amazing place to work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all text-center group hover:scale-105 transform duration-300"
                >
                  <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500/20 transition-colors">
                    <Icon size={32} className="text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 md:px-12 py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Amazing <span className="text-yellow-500">Benefits</span>
            </h2>
            <p className="text-gray-400 text-lg">
              We take care of our team so they can do their best work
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

      {/* Job Openings Section */}
      <section id="openings" className="px-6 md:px-12 py-24 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Open <span className="text-yellow-500">Positions</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Find your perfect role at Zentrya Tv
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

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job) => {
              const Icon = job.icon;
              return (
                <div 
                  key={job.id}
                  className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/20 transition-colors">
                          <Icon size={24} className="text-yellow-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2 text-white">{job.title}</h3>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Building2 size={16} />
                              {job.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={16} />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={16} />
                              {job.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp size={16} />
                              {job.experience}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4">{job.description}</p>

                      <div className="mb-4">
                        <h4 className="text-white font-semibold mb-2">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-400">
                              <CheckCircle size={16} className="text-yellow-500 flex-shrink-0 mt-1" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <a 
                      href="#apply"
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-md font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/50 whitespace-nowrap flex items-center gap-2 justify-center"
                    >
                      Apply Now
                      <ChevronRight size={20} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Internships Section */}
      <section className="px-6 md:px-12 py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-yellow-500">Internship</span> Programs
            </h2>
            <p className="text-gray-400 text-lg">
              Launch your career with hands-on experience at Zentrya Tv
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {internships.map((internship) => {
              const Icon = internship.icon;
              return (
                <div 
                  key={internship.id}
                  className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-white">{internship.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Building2 size={14} />
                          {internship.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {internship.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-4">{internship.description}</p>

                  <a 
                    href="#apply"
                    className="inline-flex items-center gap-2 text-yellow-500 font-semibold hover:text-yellow-400 transition-colors"
                  >
                    Apply for Internship
                    <ChevronRight size={20} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="px-6 md:px-12 py-24 bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Apply <span className="text-yellow-500">Now</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Submit your application and join the team
            </p>
          </div>

          <form onSubmit={handleApplicationSubmit} className="bg-gradient-to-br from-black to-gray-800 p-8 rounded-xl border border-gray-700">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={applicationForm.name}
                  onChange={(e) => setApplicationForm({...applicationForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={applicationForm.email}
                  onChange={(e) => setApplicationForm({...applicationForm, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={applicationForm.phone}
                  onChange={(e) => setApplicationForm({...applicationForm, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="+255 XXX XXX XXX"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Position Applying For *</label>
                <select
                  required
                  value={applicationForm.position}
                  onChange={(e) => setApplicationForm({...applicationForm, position: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">Select Position</option>
                  {jobOpenings.map((job) => (
                    <option key={job.id} value={job.title}>{job.title}</option>
                  ))}
                  {internships.map((intern) => (
                    <option key={intern.id} value={intern.title}>{intern.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">Resume/CV *</label>
              <div className="border-2 border-dashed border-gray-700 rounded-md p-8 text-center hover:border-yellow-500/50 transition-colors">
                <Upload size={40} className="text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400 mb-2">
                  Drop your resume here or <span className="text-yellow-500 cursor-pointer">browse</span>
                </p>
                <p className="text-gray-500 text-sm">PDF, DOC, DOCX (Max 5MB)</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setApplicationForm({...applicationForm, resume: e.target.files[0]})}
                  className="hidden"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">Cover Letter</label>
              <textarea
                value={applicationForm.coverLetter}
                onChange={(e) => setApplicationForm({...applicationForm, coverLetter: e.target.value})}
                rows={6}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Tell us why you'd be a great fit for this role..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-md font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/50 flex items-center justify-center gap-2"
            >
              {submitted ? (
                <>
                  <CheckCircle size={24} />
                  Application Submitted!
                </>
              ) : (
                <>
                  Submit Application
                  <Send size={24} />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Talent Submission Section */}
      <section id="talent" className="px-6 md:px-12 py-24 bg-black">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Submit Your <span className="text-yellow-500">Talent</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Actors, directors, producers, writers — we want to hear from you!
            </p>
          </div>

          <form onSubmit={handleTalentSubmit} className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={talentForm.name}
                  onChange={(e) => setTalentForm({...talentForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={talentForm.email}
                  onChange={(e) => setTalentForm({...talentForm, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={talentForm.phone}
                  onChange={(e) => setTalentForm({...talentForm, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="+255 XXX XXX XXX"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Talent Type *</label>
                <select
                  required
                  value={talentForm.talentType}
                  onChange={(e) => setTalentForm({...talentForm, talentType: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">Select Type</option>
                  <option value="actor">Actor/Actress</option>
                  <option value="director">Director</option>
                  <option value="producer">Producer</option>
                  <option value="writer">Writer/Screenwriter</option>
                  <option value="cinematographer">Cinematographer</option>
                  <option value="editor">Editor</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">Portfolio/Website/Social Media</label>
              <input
                type="url"
                value={talentForm.portfolio}
                onChange={(e) => setTalentForm({...talentForm, portfolio: e.target.value})}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="https://..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">Tell Us About Yourself *</label>
              <textarea
                required
                value={talentForm.description}
                onChange={(e) => setTalentForm({...talentForm, description: e.target.value})}
                rows={6}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Share your experience, achievements, and why you want to work with Zentrya Tv..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-md font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/50 flex items-center justify-center gap-2"
            >
              {submitted ? (
                <>
                  <CheckCircle size={24} />
                  Submission Received!
                </>
              ) : (
                <>
                  Submit Talent Profile
                  <Send size={24} />
                </>
              )}
            </button>
          </form>
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
                &copy; 2025 Zentrya Tv. All rights reserved.
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