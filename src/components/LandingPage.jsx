// src/components/LandingPage.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tv, Download, Smartphone, Users, ChevronRight, Star } from "lucide-react";
import apiService from "../services/api";
import destinyPoster    from "../assets/destiny.jpg";
import knockTwicePoster from "../assets/knock-twice.jpg";   // ← rename your uploaded file
import sayItAgainPoster from "../assets/say-it-again.jpg";  // ← rename your uploaded file

// ── Movie catalogue ─────────────────────────────────────────────────────────
const MOVIES = [
  {
    src:     destinyPoster,
    title:   "DESTINY",
    tagline: "Some paths were written before you were born.",
    titleStyle: {
      fontFamily:  "'Cinzel', 'Times New Roman', serif",
      fontWeight:  700,
      letterSpacing: "0.1em",
      color:       "#f5f0e8",
      textShadow:  "0 0 60px rgba(255,220,120,0.4), 2px 4px 20px rgba(0,0,0,0.99)",
    },
    taglineStyle: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", color: "#9a9080" },
    accentColor: "#D4A017",
  },
  {
    src:     knockTwicePoster,
    title:   "KNOCK TWICE",
    tagline: "Some doors should stay closed.",
    titleStyle: {
      fontFamily:  "'Cinzel', 'Times New Roman', serif",
      fontWeight:  900,
      letterSpacing: "0.06em",
      color:       "#e8ddd0",
      textShadow:  "0 0 40px rgba(220,50,30,0.55), 0 0 90px rgba(180,20,10,0.25), 2px 4px 18px rgba(0,0,0,0.99)",
    },
    taglineStyle: { fontFamily: "Georgia, serif", fontStyle: "italic", color: "#a08878" },
    accentColor: "#cc3322",
  },
  {
    src:     sayItAgainPoster,
    title:   "SAY IT AGAIN",
    tagline: "Words have power. Use them wisely.",
    titleStyle: {
      fontFamily:  "'Inter', 'Helvetica Neue', Arial, sans-serif",
      fontWeight:  800,
      letterSpacing: "0.04em",
      color:       "#ffffff",
      textShadow:  "0 0 30px rgba(255,255,255,0.15), 2px 3px 14px rgba(0,0,0,0.99)",
    },
    taglineStyle: { fontFamily: "'Inter', Arial, sans-serif", fontStyle: "normal", color: "#888" },
    accentColor: "#ffffff",
  },
];

// ── Trailer IDs (one per movie; set null if no trailer for that film) ───────
const TRAILER_IDS = ["k5f2zt", null, null];

// Auto-advance timing
const DESKTOP_TRAILER_DURATION_MS = 15_000; // fallback if postMessage misses
const DESKTOP_POSTER_PAUSE_MS     = 5_000;  // how long poster shows before next slide
const MOBILE_SLIDE_INTERVAL_MS    = 6_000;

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled]         = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [isMobile, setIsMobile]         = useState(false);

  // ── Desktop hero state ────────────────────────────────────────────────────
  const [desktopIndex, setDesktopIndex]       = useState(0);
  const [trailerActive, setTrailerActive]     = useState(false);
  const [posterVisible, setPosterVisible]     = useState(true);
  const desktopTimerRef = useRef(null);

  // ── Mobile carousel state ─────────────────────────────────────────────────
  const [slideIndex, setSlideIndex] = useState(0);
  const touchStartX    = useRef(null);
  const mobileTimerRef = useRef(null);

  // ── Detect mobile ──────────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ══════════════════════════════════════════════════════════════════════════
  // DESKTOP LOGIC
  // Cycle: poster shown → (trailer if exists) → poster pause → next slide
  // ══════════════════════════════════════════════════════════════════════════

  const clearDesktopTimer = () => clearTimeout(desktopTimerRef.current);

  const goToNextDesktop = useCallback(() => {
    clearDesktopTimer();
    setTrailerActive(false);
    setPosterVisible(false);
    setTimeout(() => {
      setDesktopIndex((i) => (i + 1) % MOVIES.length);
      setPosterVisible(true);
    }, 400);
  }, []);

  // When desktop slide changes, decide: show trailer or just pause then advance
  useEffect(() => {
    if (isMobile) return;
    clearDesktopTimer();
    const trailerId = TRAILER_IDS[desktopIndex];

    if (trailerId) {
      // Small delay then start trailer
      desktopTimerRef.current = setTimeout(() => setTrailerActive(true), 1800);
    } else {
      // No trailer — just show poster for a while then advance
      desktopTimerRef.current = setTimeout(goToNextDesktop, DESKTOP_POSTER_PAUSE_MS);
    }
    return clearDesktopTimer;
  }, [desktopIndex, isMobile]);

  // Streamable postMessage end detection
  useEffect(() => {
    if (isMobile) return;
    const onMessage = (e) => {
      if (!e.data) return;
      try {
        const d = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (d.type === "player:video:ended" || d.event === "ended") goToNextDesktop();
      } catch (_) {}
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [desktopIndex, isMobile, goToNextDesktop]);

  // Hard fallback when trailer is active
  useEffect(() => {
    if (isMobile || !trailerActive) return;
    clearDesktopTimer();
    desktopTimerRef.current = setTimeout(goToNextDesktop, DESKTOP_TRAILER_DURATION_MS);
    return clearDesktopTimer;
  }, [trailerActive, isMobile, goToNextDesktop]);

  // ══════════════════════════════════════════════════════════════════════════
  // MOBILE LOGIC — auto-advance every N seconds, swipe support
  // ══════════════════════════════════════════════════════════════════════════

  const restartMobileTimer = useCallback((idx) => {
    clearInterval(mobileTimerRef.current);
    mobileTimerRef.current = setInterval(() => {
      setSlideIndex((i) => {
        const next = (i + 1) % MOVIES.length;
        return next;
      });
    }, MOBILE_SLIDE_INTERVAL_MS);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    restartMobileTimer(slideIndex);
    return () => clearInterval(mobileTimerRef.current);
  }, [isMobile, slideIndex]);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      clearInterval(mobileTimerRef.current);
      setSlideIndex((i) => diff > 0
        ? (i + 1) % MOVIES.length
        : (i - 1 + MOVIES.length) % MOVIES.length
      );
    }
    touchStartX.current = null;
  };

  // ── Navbar scroll ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Fetch trending ─────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiService.getTrendingMovies();
        const movies = Array.isArray(res) ? res : res.movies || [];
        setTrendingMovies(movies.slice(0, 12));
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const dMovie  = MOVIES[desktopIndex];
  const mMovie  = MOVIES[slideIndex];
  const trailerId = TRAILER_IDS[desktopIndex];

  return (
    <main className="min-h-screen w-full bg-black text-white font-sans">

      {/* ─── NAVBAR ───────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-5 md:px-12 py-3 md:py-4 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-sm" : "bg-gradient-to-b from-black/60 to-transparent"
      }`}>
        <div className="text-xl md:text-3xl font-bold tracking-wider">
          <span className="text-yellow-500">ZEN</span>
          <span className="text-white">TRYA</span>
          <span className="text-yellow-500"> TV</span>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <Link to="/coming-soon" className="text-sm font-medium text-white hover:text-yellow-500 transition-colors">Sign In</Link>
          <Link to="/coming-soon" className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-1.5 md:px-6 md:py-2.5 rounded-md text-sm md:text-base font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-lg">Join Now</Link>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full md:hidden overflow-hidden"
        style={{ height: "100svh" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Poster slides */}
        {MOVIES.map((movie, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === slideIndex ? 1 : 0 }}>
            <img src={movie.src} alt={movie.title} className="w-full h-full object-cover"
              style={{ objectPosition: "center 20%" }} />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.72) 30%, rgba(0,0,0,0.18) 65%, transparent 100%)"
            }} />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 60%)"
            }} />
          </div>
        ))}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-8">
          {/* Title */}
          <h1 style={{
            ...mMovie.titleStyle,
            fontSize: "clamp(2.6rem, 12vw, 4rem)",
            lineHeight: 1.05,
            marginBottom: "0.45rem",
            transition: "all 0.5s ease",
          }}>
            {mMovie.title}
          </h1>

          {/* Tagline */}
          <p style={{
            ...mMovie.taglineStyle,
            fontSize: "0.82rem",
            letterSpacing: "0.14em",
            marginBottom: "0.55rem",
          }}>
            {mMovie.tagline}
          </p>

          {/* Badge */}
          <div className="flex items-center gap-3 mb-5">
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.58rem", letterSpacing: "0.28em", color: mMovie.accentColor, textTransform: "uppercase", fontWeight: 600 }}>
              Only on Zentrya TV
            </span>
            <span style={{ color: "#555" }}>|</span>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.58rem", letterSpacing: "0.2em", color: "#777", textTransform: "uppercase" }}>2027</span>
          </div>

          {/* CTA */}
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", fontWeight: 700, color: "#fff", lineHeight: 1.25, marginBottom: "0.28rem" }}>
            Get <span style={{ color: "#D4A017" }}>Zentrya TV</span> Free for 31 Days
          </h2>
          <p style={{ fontSize: "0.76rem", color: "#b0a898", marginBottom: "0.9rem" }}>
            Stream hundreds of movies, series &amp; Zentrya Originals.
          </p>

          <button onClick={() => navigate("/coming-soon")}
            className="w-full flex items-center justify-center gap-2 active:scale-95 transition-all"
            style={{
              background: "linear-gradient(135deg,#D4A017,#f0c040)",
              boxShadow: "0 4px 24px rgba(212,160,23,0.5)",
              color: "#000", fontWeight: 800, fontSize: "0.92rem",
              padding: "0.82rem 1.5rem", borderRadius: "0.45rem",
              border: "none", cursor: "pointer", letterSpacing: "0.03em",
              fontFamily: "inherit", marginBottom: "0.7rem",
            }}>
            Accept Free Trial <ChevronRight size={18} strokeWidth={3} />
          </button>

          <p style={{ fontSize: "0.7rem", color: "#5c5752", textAlign: "center", letterSpacing: "0.03em" }}>
            31 days free &nbsp;·&nbsp; <span style={{ color: "#807870" }}>then 3,000 TZS/month</span>. Cancel anytime.
          </p>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {MOVIES.map((_, i) => (
              <button key={i} onClick={() => { clearInterval(mobileTimerRef.current); setSlideIndex(i); }}
                style={{
                  width: i === slideIndex ? 24 : 7, height: 7, borderRadius: 4,
                  background: i === slideIndex ? "#D4A017" : "rgba(255,255,255,0.28)",
                  border: "none", cursor: "pointer",
                  transition: "all 0.35s ease", padding: 0,
                }} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          DESKTOP HERO — 16:9, trailer + poster cycle with dots
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden hidden md:block"
        style={{ paddingBottom: "56.25%" }}
      >
        {/* All poster layers stacked; only active one is opaque */}
        {MOVIES.map((movie, i) => (
          <div key={i} className="absolute inset-0"
            style={{
              opacity: i === desktopIndex && posterVisible ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}>
            <img src={movie.src} alt={movie.title} className="w-full h-full object-cover"
              style={{ objectPosition: "center center" }} />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.44) 46%, transparent 100%)"
            }} />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.18) 28%, transparent 55%)"
            }} />
          </div>
        ))}

        {/* Trailer layer */}
        <div className="absolute inset-0"
          style={{
            opacity: trailerActive ? 1 : 0,
            transition: trailerActive ? "opacity 0.7s ease" : "opacity 0s",
            pointerEvents: "none",
          }}>
          <div style={{
            position: "absolute", top: "-10%", left: "-8%", right: "-8%", bottom: "-10%",
            overflow: "hidden", background: "#000",
          }}>
            {trailerActive && trailerId && (
              <iframe
                key={`${desktopIndex}-${trailerId}`}
                allow="fullscreen; autoplay" allowFullScreen
                src={`https://streamable.com/e/${trailerId}?autoplay=1&loop=0&nocontrols=1`}
                title="Trailer"
                style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "100%", height: "100%",
                  border: "none", pointerEvents: "none",
                }}
              />
            )}
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 38%, transparent 62%)"
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.1) 24%, transparent 48%)"
          }} />
        </div>

        {/* Desktop content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-[4%] pb-[4.5%]">

          {/* Title — transitions with the slide */}
          <div style={{ marginBottom: "clamp(0.5rem, 1.6vw, 1.1rem)" }}>
            <h1 style={{
              ...dMovie.titleStyle,
              fontSize: "clamp(2rem, 7vw, 6.5rem)",
              lineHeight: 1,
              marginBottom: "clamp(0.22rem, 0.7vw, 0.55rem)",
              transition: "all 0.5s ease",
            }}>
              {dMovie.title}
            </h1>

            <p style={{
              ...dMovie.taglineStyle,
              fontSize: "clamp(0.58rem, 1.15vw, 0.88rem)",
              letterSpacing: "0.18em",
              marginBottom: "clamp(0.28rem, 0.75vw, 0.6rem)",
            }}>
              {dMovie.tagline}
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(0.48rem, 0.82vw, 0.6rem)", letterSpacing: "0.28em", color: dMovie.accentColor, textTransform: "uppercase", fontWeight: 600 }}>
                Only on Zentrya TV
              </span>
              <span style={{ color: "#555" }}>|</span>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(0.48rem, 0.82vw, 0.6rem)", letterSpacing: "0.2em", color: "#777", textTransform: "uppercase" }}>2027</span>
            </div>
          </div>

          {/* CTA */}
          <div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(0.78rem, 1.85vw, 1.6rem)", fontWeight: 700, color: "#fff", letterSpacing: "0.02em", lineHeight: 1.2, marginBottom: "clamp(0.16rem, 0.45vw, 0.3rem)" }}>
              Get <span style={{ color: "#D4A017" }}>Zentrya TV</span> Free for 31 Days
            </h2>
            <p style={{ fontSize: "clamp(0.58rem, 1.05vw, 0.84rem)", color: "#b0a898", marginBottom: "clamp(0.38rem, 0.95vw, 0.82rem)" }}>
              Stream hundreds of movies, series &amp; Zentrya Originals — all in one place.
            </p>
            <button onClick={() => navigate("/coming-soon")}
              className="flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
              style={{
                background: "linear-gradient(135deg,#D4A017,#f0c040)",
                boxShadow: "0 3px 20px rgba(212,160,23,0.5)",
                color: "#000", fontWeight: 800,
                fontSize: "clamp(0.62rem, 1.15vw, 0.92rem)",
                padding: "clamp(0.42rem, 0.85vw, 0.7rem) clamp(0.85rem, 1.7vw, 1.65rem)",
                borderRadius: "0.4rem", border: "none", cursor: "pointer",
                letterSpacing: "0.03em", fontFamily: "inherit",
                marginBottom: "clamp(0.28rem, 0.65vw, 0.55rem)",
              }}>
              Accept Free Trial <ChevronRight size={15} strokeWidth={3} />
            </button>
            <p style={{ fontSize: "clamp(0.5rem, 0.82vw, 0.7rem)", color: "#5c5752", letterSpacing: "0.04em" }}>
              31 days free &nbsp;·&nbsp; <span style={{ color: "#807870" }}>then 3,000 TZS/month</span>. Cancel anytime.
            </p>
          </div>
        </div>

        {/* Desktop dots — bottom center */}
        <div className="absolute bottom-[3%] left-0 right-0 z-20 flex justify-center gap-2.5">
          {MOVIES.map((_, i) => (
            <button key={i}
              onClick={() => {
                clearDesktopTimer();
                setTrailerActive(false);
                setPosterVisible(false);
                setTimeout(() => { setDesktopIndex(i); setPosterVisible(true); }, 400);
              }}
              style={{
                width: i === desktopIndex ? 26 : 8,
                height: 8, borderRadius: 4,
                background: i === desktopIndex ? "#D4A017" : "rgba(255,255,255,0.3)",
                border: "none", cursor: "pointer",
                transition: "all 0.35s ease", padding: 0,
              }}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{ height: "10%", background: "linear-gradient(to top,#000 0%,transparent 100%)" }} />
      </section>

      {/* ─── TRENDING ───────────────────────────────────────────────────────── */}
      <section className="relative z-20 px-4 md:px-12 py-8 md:py-12">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl md:text-4xl font-bold">
            <span className="text-yellow-500">Trending</span> Now
          </h2>
          {!loading && trendingMovies.length > 0 && (
            <Link to="/coming-soon" className="text-yellow-500 hover:text-yellow-400 font-semibold flex items-center gap-1 text-sm md:text-base transition-colors">
              Explore All <ChevronRight size={16} />
            </Link>
          )}
        </div>
        {loading ? (
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {[...Array(12)].map((_, i) => <div key={i} className="aspect-[2/3] rounded-lg bg-gray-800 animate-pulse" />)}
          </div>
        ) : trendingMovies.length > 0 ? (
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="group relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10">
                {(movie.poster_url || movie.thumbnail_url) && (
                  <img src={movie.poster_url || movie.thumbnail_url} alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = "none"; }} />
                )}
                <div className={`w-full h-full bg-gradient-to-br from-yellow-900/30 via-black to-black flex items-center justify-center ${(movie.poster_url || movie.thumbnail_url) ? "absolute inset-0 -z-10" : ""}`}>
                  {!(movie.poster_url || movie.thumbnail_url) && <span className="text-yellow-500/50 text-xs text-center px-2 font-semibold">{movie.title}</span>}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-300">
                  <h3 className="font-semibold text-xs text-white line-clamp-2">{movie.title}</h3>
                  <div className="hidden md:flex items-center gap-1 mt-1">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-yellow-500 text-xs font-semibold">{movie.rating ? movie.rating.toFixed(1) : "N/A"}</span>
                  </div>
                </div>
                {movie.is_featured && <div className="absolute top-1.5 left-1.5 bg-yellow-500 text-black px-1.5 py-0.5 rounded text-[10px] font-bold">FEATURED</div>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12"><p className="text-gray-400">Coming soon! Check back for trending content.</p></div>
        )}
      </section>

      {/* ─── WHY ZENTRYA TV ─────────────────────────────────────────────────── */}
      <section className="px-4 md:px-12 py-14 md:py-24 bg-black">
        <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 max-w-6xl mx-auto">
          Why You'll Love <span className="text-yellow-500">Zentrya tv</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-lg mb-10 md:mb-16 max-w-6xl mx-auto">A New Way to Experience Entertainment</p>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: <Tv size={28} className="text-yellow-500" />, iconLg: <Tv size={40} className="text-yellow-500" />, bg: "bg-gradient-to-br from-yellow-500/30 to-yellow-600/30 rounded-xl", title: "Entertainment, Bigger and Better", body: "Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, and more." },
            { icon: <Download size={26} className="text-black" strokeWidth={2.5} />, iconLg: <Download size={38} className="text-black" strokeWidth={2.5} />, bg: "bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/50", title: "Take It With You", body: "Download favorites and watch offline. No internet needed." },
            { icon: <Smartphone size={30} className="text-yellow-500" strokeWidth={1.5} />, iconLg: <Smartphone size={44} className="text-yellow-500" strokeWidth={1.5} />, bg: "rounded-xl", title: "Watch on All Devices", body: "From phone to TV, seamless streaming everywhere." },
            { icon: <Users size={30} className="text-yellow-500" strokeWidth={1.5} />, iconLg: <Users size={44} className="text-yellow-500" strokeWidth={1.5} />, bg: "rounded-xl", title: "Made for the Family", body: "Personalized profiles with parental controls." },
          ].map((c, i) => (
            <div key={i} className="bg-gradient-to-br from-yellow-900/20 via-black to-black rounded-xl md:rounded-2xl p-5 md:p-8 border border-yellow-500/20 hover:border-yellow-500/50 transition-all">
              <div className={`w-12 h-12 md:w-20 md:h-20 flex items-center justify-center mb-4 md:mb-6 ${c.bg}`}>
                <span className="md:hidden">{c.icon}</span>
                <span className="hidden md:block">{c.iconLg}</span>
              </div>
              <h3 className="text-base md:text-2xl font-bold mb-2 md:mb-4 text-white">{c.title}</h3>
              <p className="text-gray-300 text-xs md:text-base leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-12 py-14 md:py-24 bg-black">
        <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 max-w-5xl mx-auto">
          Frequently Asked <span className="text-yellow-500">Questions</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-lg mb-8 md:mb-12 max-w-5xl mx-auto">Discover Zentrya tv</p>
        <div className="max-w-5xl mx-auto space-y-2 md:space-y-3">
          {[
            { q: "What is Zentrya tv?", a: ["Tanzania's premier streaming platform — local and international entertainment at your fingertips.", "Unlimited content, fresh movies and shows added weekly."] },
            { q: "How much does Zentrya tv cost?", a: ["Just 3,000 TZS/month after your free 31-day trial. No commitments. Cancel anytime."] },
            { q: "Where can I watch?", a: ["Smart TVs, smartphones, tablets, computers, and game consoles."] },
            { q: "How do I cancel?", a: ["Cancel anytime with just two clicks. No fees."] },
            { q: "What can I watch?", a: ["Tanzanian films, African cinema, blockbusters, documentaries, TV series and exclusive Zentrya Originals."] },
            { q: "Is Zentrya tv good for the family?", a: ["PIN-protected profiles with age-appropriate content and safe viewing environment."] },
          ].map(({ q, a }) => (
            <details key={q} className="bg-gradient-to-r from-gray-900 to-gray-900/90 hover:from-gray-800 hover:to-gray-800/90 transition-all group rounded-lg overflow-hidden border border-gray-800 hover:border-yellow-500/30">
              <summary className="px-4 md:px-8 py-4 md:py-6 cursor-pointer flex items-center justify-between text-sm md:text-xl font-bold">
                <span className="text-white pr-4">{q}</span>
                <span className="text-2xl md:text-4xl text-yellow-500 group-open:rotate-45 transition-transform duration-300 flex-shrink-0">+</span>
              </summary>
              <div className="px-4 md:px-8 pb-4 md:pb-6 text-gray-300 text-sm md:text-base leading-relaxed space-y-3">
                {a.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section className="px-4 md:px-12 py-16 md:py-24 bg-gradient-to-b from-black via-gray-900 to-black text-center border-t border-yellow-500/10">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-bold mb-3">Start Watching <span className="text-yellow-500">Free</span></h2>
          <p className="text-sm md:text-lg text-gray-300 mb-2">Stream hundreds of movies, series &amp; Originals.</p>
          <p className="text-xs md:text-sm text-gray-500 mb-8">Tanzania Is Watching.</p>
          <button onClick={() => navigate("/coming-soon")}
            className="w-full sm:w-auto hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto"
            style={{
              background: "linear-gradient(135deg,#D4A017,#f0c040)",
              boxShadow: "0 4px 32px rgba(212,160,23,0.5)",
              color: "#000", fontWeight: 800, fontSize: "1rem",
              padding: "0.9rem 2.4rem", borderRadius: "0.5rem",
              border: "none", cursor: "pointer", letterSpacing: "0.03em",
            }}>
            Accept Free Trial <ChevronRight size={20} strokeWidth={3} />
          </button>
          <p className="text-xs md:text-sm text-gray-600 mt-3">31 days free · then 3,000 TZS/month. Cancel anytime.</p>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="px-4 md:px-12 py-10 md:py-16 bg-black border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12">
            <div className="text-2xl md:text-3xl font-bold mb-2">
              <span className="text-yellow-500">ZEN</span><span className="text-white">TRYA</span><span className="text-yellow-500"> TV</span>
            </div>
            <p className="text-gray-400 text-sm">The Future of Entertainment in Tanzania 🇹🇿</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
            {[
              { title: "Company", links: [["About Us","/about"],["Careers","/careers"],["Press","/press"]] },
              { title: "Legal", links: [["Terms of Use","/terms"],["Privacy Policy","/privacy"],["Copyright Policy","/copyright"],["Refund Policy","/refund"]] },
              { title: "Support", links: [["Contact Us","/contact"],["Help Center","/help"],["Supported Devices","/devices"]] },
              { title: "Business", links: [["Content Licensing","/licensing"],["Advertise With Us","/advertise"]] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h3 className="text-white font-bold text-sm md:text-lg mb-3 md:mb-4">{title}</h3>
                <ul className="space-y-2 md:space-y-3">
                  {links.map(([label, to]) => (
                    <li key={label}><Link to={to} className="text-gray-400 hover:text-yellow-500 transition-colors text-xs md:text-base">{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs md:text-sm">&copy; 2026 Zentrya Tv. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="https://www.facebook.com/ZentryaTv" className="text-gray-500 hover:text-yellow-500 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
              <a href="https://twitter.com/ZentryaTv" className="text-gray-500 hover:text-yellow-500 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>
              <a href="https://www.instagram.com/zentryatv" className="text-gray-500 hover:text-yellow-500 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg></a>
              <a href="https://www.youtube.com/zentryamedia" className="text-gray-500 hover:text-yellow-500 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
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