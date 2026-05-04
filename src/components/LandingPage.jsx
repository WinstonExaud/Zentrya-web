// src/components/LandingPage.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tv, Download, Smartphone, Users, ChevronRight, Star } from "lucide-react";
import apiService from "../services/api";
import destinyPoster from "../assets/destiny.jpg";

const TRAILER_IDS = ["uoc8e2"];

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [trailerIndex, setTrailerIndex] = useState(0);
  const [trailerActive, setTrailerActive] = useState(false);
  const fallbackRef = useRef(null);

  // ── Start trailer 2s after mount ──────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setTrailerActive(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // ── End handler: snap IMMEDIATELY back to poster (no fade delay) ───────
  const handleTrailerEnd = () => {
    clearTimeout(fallbackRef.current);
    const next = trailerIndex + 1;
    if (next < TRAILER_IDS.length) {
      setTrailerIndex(next);
    } else {
      setTrailerActive(false); // instant — transition is 0s on exit
      setTrailerIndex(0);
    }
  };

  // ── Streamable postMessage end detection ──────────────────────────────
  useEffect(() => {
    const onMessage = (e) => {
      if (!e.data) return;
      try {
        const d = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (d.type === "player:video:ended" || d.event === "ended") {
          handleTrailerEnd();
        }
      } catch (_) {}
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [trailerIndex]);

  // ── Hard fallback: trailer is ~12s, force snap after 15s ──────────────
  useEffect(() => {
    if (!trailerActive) return;
    clearTimeout(fallbackRef.current);
    fallbackRef.current = setTimeout(handleTrailerEnd, 15_000);
    return () => clearTimeout(fallbackRef.current);
  }, [trailerActive, trailerIndex]);

  // ── Navbar scroll ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Fetch trending ─────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiService.getTrendingMovies();
        const movies = Array.isArray(res) ? res : res.movies || [];
        setTrendingMovies(movies.slice(0, 12));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const currentId = TRAILER_IDS[trailerIndex];

  return (
    <main className="min-h-screen w-full bg-black text-white font-sans">

      {/* ─── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 py-4 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-sm" : "bg-gradient-to-b from-black/50 to-transparent"
      }`}>
        <div className="text-2xl md:text-3xl font-bold tracking-wider">
          <span className="text-yellow-500">ZEN</span>
          <span className="text-white">TRYA</span>
          <span className="text-yellow-500"> TV</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/coming-soon" className="text-sm md:text-base font-medium text-white hover:text-yellow-500 transition-colors">
            Sign In
          </Link>
          <Link to="/coming-soon" className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-5 py-2 md:px-6 md:py-2.5 rounded-md font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/50">
            Join Now
          </Link>
        </div>
      </nav>

      {/* ─── HERO — strict 16:9 widescreen ──────────────────────────────────── */}
      {/*
        padding-bottom: 56.25% = 9/16 × 100vw → always a perfect 16:9 box.
        All child layers use position:absolute inset-0 to fill it exactly.
        overflow:hidden clips the oversized iframe wrapper cleanly.
      */}
      <section
        className="relative w-full overflow-hidden"
        style={{ paddingBottom: "56.25%" }}
      >
        {/* ── LAYER 1: Poster — always underneath, always visible ─────────── */}
        <div className="absolute inset-0">
          <img
            src={destinyPoster}
            alt="Destiny"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center center" }}
          />
          {/*
            ✦ NO top gradient — poster top is fully visible, clean.
            Only a left-side vignette (text legibility) + bottom fade.
          */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.42) 45%, transparent 100%)"
          }} />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 28%, transparent 55%)"
          }} />
        </div>

        {/* ── LAYER 2: Streamable trailer ─────────────────────────────────── */}
        <div
          className="absolute inset-0"
          style={{
            // Fast fade IN when trailer starts; INSTANT snap back when it ends
            opacity: trailerActive ? 1 : 0,
            transition: trailerActive ? "opacity 0.7s ease" : "opacity 0s",
            pointerEvents: "none",
          }}
        >
          {/*
            Wrapper extends 10% beyond all 4 edges so Streamable's
            title bar (top) and any bottom chrome are physically cropped
            before they enter the 16:9 viewport.
            overflow:hidden on the parent <section> does the clipping.
          */}
          <div style={{
            position: "absolute",
            top: "-10%", left: "-8%", right: "-8%", bottom: "-10%",
            overflow: "hidden",
            background: "#000",
          }}>
            {trailerActive && (
              <iframe
                key={currentId}
                allow="fullscreen; autoplay"
                allowFullScreen
                src={`https://streamable.com/e/k5f2zt?autoplay=1&loop=0&nocontrols=1`}
                title="Trailer"
                style={{
                  position: "absolute",
                  top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  // Fill the expanded wrapper at 16:9
                  width: "100%",
                  height: "100%",
                  border: "none",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>

          {/*
            ✦ NO top gradient over the trailer — just a left vignette
            and a soft bottom fade so the CTA text stays readable.
          */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.28) 38%, transparent 60%)"
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 22%, transparent 45%)"
          }} />
        </div>

        {/* ── LAYER 3: Content — always on top ────────────────────────────── */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-[4%] pb-[5%]">

          {/* Movie title */}
          <div style={{ marginBottom: "clamp(0.6rem, 1.8vw, 1.2rem)" }}>
            <h1 style={{
              fontFamily: "'Cinzel', 'Times New Roman', serif",
              fontSize: "clamp(2.2rem, 7.5vw, 7rem)",
              fontWeight: 700,
              letterSpacing: "0.1em",
              lineHeight: 1,
              color: "#f5f0e8",
              textTransform: "uppercase",
              textShadow:
                "0 0 60px rgba(255,220,120,0.35), 0 0 120px rgba(255,180,60,0.12), 2px 4px 20px rgba(0,0,0,0.98)",
              marginBottom: "clamp(0.25rem, 0.8vw, 0.6rem)",
            }}>
              DESTINY
            </h1>

            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(0.6rem, 1.2vw, 0.9rem)",
              letterSpacing: "0.2em",
              color: "#9a9080",
              fontStyle: "italic",
              marginBottom: "clamp(0.3rem, 0.8vw, 0.65rem)",
            }}>
              Some paths were written before you were born.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <span style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(0.5rem, 0.85vw, 0.62rem)",
                letterSpacing: "0.28em",
                color: "#D4A017",
                textTransform: "uppercase",
                fontWeight: 600,
              }}>Only on Zentrya TV</span>
              <span style={{ color: "#555", fontSize: "0.7rem" }}>|</span>
              <span style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(0.5rem, 0.85vw, 0.62rem)",
                letterSpacing: "0.2em",
                color: "#777",
                textTransform: "uppercase",
              }}>2026</span>
            </div>
          </div>

          {/* Free Trial CTA — always visible */}
          <div>
            <h2 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(0.8rem, 1.9vw, 1.65rem)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.02em",
              lineHeight: 1.2,
              marginBottom: "clamp(0.18rem, 0.5vw, 0.32rem)",
            }}>
              Get <span style={{ color: "#D4A017" }}>Zentrya TV</span> Free for 31 Days
            </h2>

            <p style={{
              fontSize: "clamp(0.6rem, 1.1vw, 0.86rem)",
              color: "#b0a898",
              marginBottom: "clamp(0.4rem, 1vw, 0.85rem)",
            }}>
              Stream hundreds of movies, series &amp; Zentrya Originals — all in one place.
            </p>

            <button
              onClick={() => navigate("/coming-soon")}
              className="flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
              style={{
                background: "linear-gradient(135deg,#D4A017,#f0c040)",
                boxShadow: "0 3px 20px rgba(212,160,23,0.5)",
                color: "#000",
                fontWeight: 800,
                fontSize: "clamp(0.65rem, 1.2vw, 0.95rem)",
                padding: "clamp(0.45rem, 0.9vw, 0.72rem) clamp(0.9rem, 1.8vw, 1.7rem)",
                borderRadius: "0.4rem",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.03em",
                fontFamily: "inherit",
                marginBottom: "clamp(0.3rem, 0.7vw, 0.6rem)",
              }}
            >
              Accept Free Trial
              <ChevronRight size={16} strokeWidth={3} />
            </button>

            <p style={{
              fontSize: "clamp(0.52rem, 0.85vw, 0.72rem)",
              color: "#5c5752",
              letterSpacing: "0.04em",
            }}>
              31 days free &nbsp;·&nbsp;{" "}
              <span style={{ color: "#807870" }}>then 3,000 TZS/month</span>.{" "}
              Cancel anytime.
            </p>
          </div>
        </div>

        {/* Subtle bottom fade into the rest of the page */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{ height: "12%", background: "linear-gradient(to top, #000 0%, transparent 100%)" }}
        />
      </section>

      {/* ─── TRENDING ───────────────────────────────────────────────────────── */}
      <section className="relative z-20 px-6 md:px-12 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-4xl font-bold">
            <span className="text-yellow-500">Trending</span> Now
          </h2>
          {!loading && trendingMovies.length > 0 && (
            <Link to="/coming-soon" className="text-yellow-500 hover:text-yellow-400 font-semibold flex items-center gap-2 transition-colors">
              Explore All <ChevronRight size={20} />
            </Link>
          )}
        </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-[2/3] rounded-lg bg-gray-800 animate-pulse" />
            ))}
          </div>
        ) : trendingMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="group relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10">
                {(movie.poster_url || movie.thumbnail_url) && (
                  <img
                    src={movie.poster_url || movie.thumbnail_url}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                )}
                <div className={`w-full h-full bg-gradient-to-br from-yellow-900/30 via-black to-black flex items-center justify-center ${(movie.poster_url || movie.thumbnail_url) ? "absolute inset-0 -z-10" : ""}`}>
                  {!(movie.poster_url || movie.thumbnail_url) && (
                    <span className="text-yellow-500/50 text-sm text-center px-4 font-semibold">{movie.title}</span>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-sm mb-2 text-white line-clamp-2">{movie.title}</h3>
                    <div className="flex items-center gap-2">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-yellow-500 text-sm font-semibold">
                        {movie.rating ? movie.rating.toFixed(1) : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                {movie.is_featured && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">FEATURED</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Coming soon! Check back for trending content.</p>
          </div>
        )}
      </section>

      {/* ─── WHY ZENTRYA TV ─────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-24 bg-black">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 max-w-6xl mx-auto">
          Why You'll Love <span className="text-yellow-500">Zentrya tv</span>
        </h2>
        <p className="text-gray-400 text-lg mb-16 max-w-6xl mx-auto">A New Way to Experience Entertainment</p>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Tv size={40} className="text-yellow-500" />, bg: "bg-gradient-to-br from-yellow-500/30 to-yellow-600/30 rounded-2xl", title: "Entertainment, Bigger and Better", body: "Watch Zentrya tv on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, and more." },
            { icon: <Download size={40} className="text-black" strokeWidth={2.5} />, bg: "bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/50", title: "Take It With You", body: "Download your favorites and watch wherever you go. No internet needed." },
            { icon: <Smartphone size={52} className="text-yellow-500" strokeWidth={1.5} />, bg: "rounded-2xl", title: "Watch on All Your Devices", body: "From phone to TV, enjoy seamless streaming wherever you are." },
            { icon: <Users size={52} className="text-yellow-500" strokeWidth={1.5} />, bg: "rounded-2xl", title: "Made for the Whole Family", body: "Personalized profiles with parental controls, designed for family peace of mind." },
          ].map((c, i) => (
            <div key={i} className="bg-gradient-to-br from-yellow-900/20 via-black to-black rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-500/50 transition-all group hover:scale-105 transform duration-300">
              <div className={`w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${c.bg}`}>{c.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-white">{c.title}</h3>
              <p className="text-gray-300 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-24 bg-black">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 max-w-5xl mx-auto">
          Frequently Asked <span className="text-yellow-500">Questions</span>
        </h2>
        <p className="text-gray-400 text-lg mb-12 max-w-5xl mx-auto">Discover Zentrya tv</p>
        <div className="max-w-5xl mx-auto space-y-3">
          {[
            { q: "What is Zentrya tv?", a: ["Zentrya tv is Tanzania's premier streaming platform, bringing the best of local and international entertainment to your fingertips.", "Enjoy unlimited content anytime. Fresh movies and shows added weekly."] },
            { q: "How much does Zentrya tv cost?", a: ["Just 3,000 TZS/month after your free 31-day trial. No commitments. Cancel anytime."] },
            { q: "Where can I watch?", a: ["Watch on smart TVs, smartphones, tablets, computers, and game consoles."] },
            { q: "How do I cancel?", a: ["Cancel anytime with just two clicks. No commitments, no cancellation fees."] },
            { q: "What can I watch on Zentrya tv?", a: ["Tanzanian films, African cinema, blockbusters, documentaries, TV series and exclusive Zentrya Originals."] },
            { q: "Is Zentrya tv good for the family?", a: ["Absolutely! Profiles feature PIN-protected, age-appropriate content and a safe viewing environment."] },
          ].map(({ q, a }) => (
            <details key={q} className="bg-gradient-to-r from-gray-900 to-gray-900/90 hover:from-gray-800 hover:to-gray-800/90 transition-all group rounded-lg overflow-hidden border border-gray-800 hover:border-yellow-500/30">
              <summary className="px-6 md:px-8 py-6 cursor-pointer flex items-center justify-between text-lg md:text-xl font-bold">
                <span className="text-white">{q}</span>
                <span className="text-3xl md:text-4xl text-yellow-500 group-open:rotate-45 transition-transform duration-300">+</span>
              </summary>
              <div className="px-6 md:px-8 pb-6 text-gray-300 leading-relaxed space-y-4">
                {a.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-24 bg-gradient-to-b from-black via-gray-900 to-black text-center border-t border-yellow-500/10">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Start Watching <span className="text-yellow-500">Free</span>
          </h2>
          <p className="text-lg text-gray-300 mb-2">Stream hundreds of movies, series &amp; Originals.</p>
          <p className="text-sm text-gray-500 mb-10">Tanzania Is Watching.</p>
          <button
            onClick={() => navigate("/coming-soon")}
            className="w-full sm:w-auto hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto"
            style={{
              background: "linear-gradient(135deg,#D4A017,#f0c040)",
              boxShadow: "0 4px 32px rgba(212,160,23,0.5)",
              color: "#000",
              fontWeight: 800,
              fontSize: "1.1rem",
              padding: "1rem 2.8rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.03em",
            }}
          >
            Accept Free Trial <ChevronRight size={22} strokeWidth={3} />
          </button>
          <p className="text-sm text-gray-600 mt-4">
            31 days free &nbsp;·&nbsp; then 3,000 TZS/month. Cancel anytime.
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="px-6 md:px-12 py-16 bg-black border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="text-3xl font-bold mb-3">
              <span className="text-yellow-500">ZEN</span><span className="text-white">TRYA</span><span className="text-yellow-500"> TV</span>
            </div>
            <p className="text-gray-400">The Future of Entertainment in Tanzania 🇹🇿</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { title: "Company", links: [["About Us","/about"],["Careers","/careers"],["Press","/press"]] },
              { title: "Legal", links: [["Terms of Use","/terms"],["Privacy Policy","/privacy"],["Copyright Policy","/copyright"],["Refund Policy","/refund"]] },
              { title: "Support", links: [["Contact Us","/contact"],["Help Center","/help"],["Supported Devices","/devices"]] },
              { title: "Business", links: [["Content Licensing","/licensing"],["Advertise With Us","/advertise"]] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h3 className="text-white font-bold text-lg mb-4">{title}</h3>
                <ul className="space-y-3">
                  {links.map(([label, to]) => (
                    <li key={label}><Link to={to} className="text-gray-400 hover:text-yellow-500 transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">&copy; 2026 Zentrya Tv. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="https://www.facebook.com/ZentryaTv" className="text-gray-500 hover:text-yellow-500 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
              <a href="https://twitter.com/ZentryaTv" className="text-gray-500 hover:text-yellow-500 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>
              <a href="https://www.instagram.com/zentryatv" className="text-gray-500 hover:text-yellow-500 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg></a>
              <a href="https://www.youtube.com/zentryamedia" className="text-gray-500 hover:text-yellow-500 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap');
      `}</style>
    </main>
  );
}