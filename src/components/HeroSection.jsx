// src/components/HeroSection.jsx
// Cinematic Hero with Trailer Autoplay → Poster Slide Transition
// Drop this into LandingPage.jsx to replace the existing <section className="relative h-screen ...">

import { useState, useEffect, useRef } from "react";
import { ChevronRight, Play, Volume2, VolumeX } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ─── CONFIG ─────────────────────────────────────────────────────────────────
// Replace these with your actual trailer YouTube/MP4 URLs
const TRAILERS = [
  {
    id: "trailer1",
    // For YouTube: use embed URL with autoplay params
    url: "https://youtu.be/gh7As_2FzCM?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&loop=0&enablejsapi=1&playsinline=1",
    type: "youtube", // "youtube" | "mp4"
  },
  {
    id: "trailer2",
    url: "https://youtu.be/J-HzL7W9gZM?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&loop=0&enablejsapi=1&playsinline=1",
    type: "youtube",
  },
];

// Poster image — make sure this path matches your asset
import posterImage from "../assets/void-signal.png";

// Duration (ms) to show each trailer before switching (fallback if postMessage events unavailable)
const TRAILER_DURATION = 90000; // 90 seconds per trailer
// ────────────────────────────────────────────────────────────────────────────

export default function HeroSection({ email, setEmail, emailError, setEmailError, onGetStarted }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("trailer"); // "trailer" | "poster"
  const [trailerIndex, setTrailerIndex] = useState(0);
  const [trailerEntering, setTrailerEntering] = useState(true);
  const [posterVisible, setPosterVisible] = useState(false);
  const [muted, setMuted] = useState(true);
  const [iframeKey, setIframeKey] = useState(0); // force re-mount on trailer change
  const timerRef = useRef(null);
  const iframeRef = useRef(null);

  // ── Trailer sequencing ──────────────────────────────────────────────────
  const advanceTrailer = () => {
    clearTimeout(timerRef.current);

    if (trailerIndex < TRAILERS.length - 1) {
      // Fade out current trailer
      setTrailerEntering(false);
      setTimeout(() => {
        setTrailerIndex((i) => i + 1);
        setIframeKey((k) => k + 1);
        setTrailerEntering(true);
        // Start timer for next trailer
        timerRef.current = setTimeout(advanceTrailer, TRAILER_DURATION);
      }, 800);
    } else {
      // All trailers done → slide in poster
      setTrailerEntering(false);
      setTimeout(() => {
        setPhase("poster");
        setTimeout(() => setPosterVisible(true), 50); // trigger CSS transition
      }, 800);
    }
  };

  useEffect(() => {
    // Trailer enters on mount
    setTrailerEntering(true);
    timerRef.current = setTimeout(advanceTrailer, TRAILER_DURATION);
    return () => clearTimeout(timerRef.current);
  }, []); // eslint-disable-line

  // Listen for YouTube postMessage events to detect video end
  useEffect(() => {
    const handleMessage = (event) => {
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data.event === "onStateChange" && data.info === 0) {
          // State 0 = ended
          advanceTrailer();
        }
      } catch (_) {}
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [trailerIndex]); // eslint-disable-line

  // Toggle mute by rebuilding iframe URL
  const currentTrailer = TRAILERS[trailerIndex];
  const iframeSrc = currentTrailer.url.replace(
    muted ? "mute=0" : "mute=1",
    muted ? "mute=1" : "mute=0"
  );

  const handleToggleMute = () => setMuted((m) => !m);

  const handleSkipToContent = () => {
    clearTimeout(timerRef.current);
    setTrailerEntering(false);
    setTimeout(() => {
      setPhase("poster");
      setTimeout(() => setPosterVisible(true), 50);
    }, 600);
  };

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: "600px" }}>

      {/* ── TRAILER PHASE ─────────────────────────────────────────────── */}
      {phase === "trailer" && (
        <div
          className="absolute inset-0 z-10"
          style={{
            opacity: trailerEntering ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          {/* Cinematic letterbox bars */}
          <div
            className="absolute top-0 left-0 right-0 z-20 bg-black"
            style={{ height: "8%" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 z-20 bg-black"
            style={{ height: "8%" }}
          />

          {/* iframe wrapper — 16:9 scaled to cover viewport */}
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black"
          >
            {currentTrailer.type === "youtube" ? (
              <iframe
                key={iframeKey}
                ref={iframeRef}
                src={`${currentTrailer.url.split("?")[0]}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&rel=0&showinfo=0&loop=0&enablejsapi=1&playsinline=1&modestbranding=1`}
                allow="autoplay; fullscreen"
                allowFullScreen
                className="absolute"
                style={{
                  // Scale 16:9 to cover any viewport
                  width: "177.78vh", // 16/9 * 100vh
                  height: "100vh",
                  minWidth: "100vw",
                  minHeight: "56.25vw", // 9/16 * 100vw
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  border: "none",
                  pointerEvents: "none",
                }}
                title={`Trailer ${trailerIndex + 1}`}
              />
            ) : (
              <video
                key={iframeKey}
                src={currentTrailer.url}
                autoPlay
                muted={muted}
                playsInline
                onEnded={advanceTrailer}
                className="absolute"
                style={{
                  width: "177.78vh",
                  height: "100vh",
                  minWidth: "100vw",
                  minHeight: "56.25vw",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  objectFit: "cover",
                }}
              />
            )}
          </div>

          {/* Gradient overlays on sides + bottom */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: `
                linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.5) 100%),
                linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 30%, transparent 60%)
              `,
            }}
          />

          {/* Top-left: Logo */}
          <div className="absolute top-6 left-8 z-30">
            <div className="text-2xl font-bold tracking-wider">
              <span className="text-yellow-500">ZEN</span>
              <span className="text-white">TRYA</span>
              <span className="text-yellow-500"> TV</span>
            </div>
          </div>

          {/* Top-right: controls */}
          <div className="absolute top-6 right-8 z-30 flex items-center gap-3">
            {/* Mute toggle */}
            <button
              onClick={handleToggleMute}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold transition-all"
              style={{
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(8px)",
              }}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              {muted ? "Unmute" : "Mute"}
            </button>

            {/* Skip */}
            <button
              onClick={handleSkipToContent}
              className="px-4 py-2 rounded-full text-white text-sm font-semibold transition-all hover:bg-yellow-500 hover:text-black"
              style={{
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(8px)",
              }}
            >
              Skip ›
            </button>
          </div>

          {/* Trailer progress dots */}
          <div className="absolute bottom-10 left-1/2 z-30 flex gap-2" style={{ transform: "translateX(-50%)" }}>
            {TRAILERS.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all"
                style={{
                  width: i === trailerIndex ? "28px" : "8px",
                  height: "8px",
                  background: i === trailerIndex ? "#D4A017" : "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>

          {/* NOW STREAMING label */}
          <div className="absolute bottom-24 left-1/2 z-30 text-center" style={{ transform: "translateX(-50%)" }}>
            <p
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#D4A017", letterSpacing: "0.25em" }}
            >
              Now Streaming — Trailer {trailerIndex + 1} of {TRAILERS.length}
            </p>
          </div>
        </div>
      )}

      {/* ── POSTER PHASE ──────────────────────────────────────────────── */}
      {phase === "poster" && (
        <div
          className="absolute inset-0 z-10"
          style={{
            opacity: posterVisible ? 1 : 0,
            transform: posterVisible ? "scale(1)" : "scale(1.04)",
            transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Poster background */}
          <div className="absolute inset-0">
            <img
              src={posterImage}
              alt="The Void Signal"
              className="w-full h-full"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
            {/* Gradient for readability */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 55%, transparent 100%),
                  linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 30%, transparent 65%)
                `,
              }}
            />
          </div>

          {/* ── POSTER HERO CONTENT ──────────────────────────────────── */}
          <div
            className="absolute inset-0 z-20 flex flex-col justify-end px-8 md:px-16 pb-24"
          >
            {/* "ONLY ON ZENTRYA TV | 31 JAN 2027" badge */}
            <div
              className="mb-6 inline-flex items-center gap-3"
              style={{
                opacity: posterVisible ? 1 : 0,
                transform: posterVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s",
              }}
            >
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#D4A017", letterSpacing: "0.2em" }}
              >
                🇹🇿 Zentrya Original
              </span>
              <span className="text-gray-500">·</span>
              <span className="text-xs text-gray-400 font-semibold tracking-wider">
                Only on Zentrya TV &nbsp;|&nbsp; 31 Jan 2027
              </span>
            </div>

            {/* "THE" — small uppercase, spaced */}
            <div
              style={{
                opacity: posterVisible ? 1 : 0,
                transform: posterVisible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.8s ease 0.75s, transform 0.8s ease 0.75s",
              }}
            >
              <p
                className="font-light text-white"
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
                  letterSpacing: "0.6em",
                  marginBottom: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                }}
              >
                THE
              </p>
            </div>

            {/* "VOID SIGNAL" — massive display title */}
            <div
              style={{
                opacity: posterVisible ? 1 : 0,
                transform: posterVisible ? "translateX(0)" : "translateX(-40px)",
                transition: "opacity 0.9s ease 0.9s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.9s",
              }}
            >
              <h1
                className="font-bold text-white leading-none"
                style={{
                  fontSize: "clamp(4rem, 12vw, 11rem)",
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  letterSpacing: "-0.01em",
                  textShadow: "0 0 80px rgba(100,60,200,0.25), 0 4px 32px rgba(0,0,0,0.8)",
                  lineHeight: 0.9,
                }}
              >
                VOID SIGNAL
              </h1>
            </div>

            {/* Tagline: "It was never silent. It was listening." */}
            <div
              style={{
                opacity: posterVisible ? 1 : 0,
                transform: posterVisible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.8s ease 1.2s, transform 0.8s ease 1.2s",
              }}
            >
              <p
                className="text-gray-300 mt-4 mb-8"
                style={{
                  fontSize: "clamp(0.9rem, 1.8vw, 1.2rem)",
                  fontFamily: "'Georgia', serif",
                  fontStyle: "italic",
                  letterSpacing: "0.08em",
                }}
              >
                It was never silent. It was listening.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-4 mb-10"
              style={{
                opacity: posterVisible ? 1 : 0,
                transform: posterVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s ease 1.4s, transform 0.8s ease 1.4s",
              }}
            >
              <button
                onClick={() => navigate("/coming-soon")}
                className="flex items-center gap-3 font-bold rounded-md transition-all hover:scale-105"
                style={{
                  background: "#D4A017",
                  color: "#000",
                  padding: "14px 32px",
                  fontSize: "1rem",
                  letterSpacing: "0.05em",
                  boxShadow: "0 4px 24px rgba(212,160,23,0.4)",
                }}
              >
                <Play size={20} fill="black" />
                Watch Trailer
              </button>
              <button
                onClick={() => navigate("/coming-soon")}
                className="flex items-center gap-3 font-semibold rounded-md text-white transition-all hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  padding: "14px 32px",
                  fontSize: "1rem",
                  backdropFilter: "blur(8px)",
                }}
              >
                More Info
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Email CTA */}
            <div
              style={{
                opacity: posterVisible ? 1 : 0,
                transform: posterVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s ease 1.6s, transform 0.8s ease 1.6s",
                maxWidth: "560px",
              }}
            >
              <p className="text-gray-300 text-sm mb-3">
                Ready to watch? Enter your email to get started
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    onKeyPress={(e) => e.key === "Enter" && onGetStarted()}
                    className="w-full px-5 py-3 rounded-md text-white text-sm"
                    style={{
                      background: "rgba(0,0,0,0.55)",
                      border: emailError ? "1px solid #ef4444" : "1px solid rgba(255,255,255,0.25)",
                      backdropFilter: "blur(8px)",
                      outline: "none",
                    }}
                  />
                  {emailError && (
                    <p className="text-red-400 text-xs mt-1">{emailError}</p>
                  )}
                </div>
                <button
                  onClick={onGetStarted}
                  className="flex items-center justify-center gap-2 font-bold rounded-md transition-all hover:scale-105 whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, #D4A017, #b8880f)",
                    color: "#000",
                    padding: "12px 28px",
                    fontSize: "0.95rem",
                    boxShadow: "0 2px 12px rgba(212,160,23,0.35)",
                  }}
                >
                  Get Started
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>

          {/* Replay trailers button */}
          <div className="absolute top-6 right-8 z-30">
            <button
              onClick={() => {
                setPosterVisible(false);
                setTimeout(() => {
                  setPhase("trailer");
                  setTrailerIndex(0);
                  setIframeKey((k) => k + 1);
                  setTrailerEntering(true);
                  timerRef.current = setTimeout(advanceTrailer, TRAILER_DURATION);
                }, 500);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold transition-all hover:border-yellow-500"
              style={{
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Play size={14} />
              Replay Trailer
            </button>
          </div>
        </div>
      )}

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
        style={{
          height: "120px",
          background: "linear-gradient(to top, #000 0%, transparent 100%)",
        }}
      />
    </section>
  );
}