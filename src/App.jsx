import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

/* ─── Google Fonts injected once ─── */
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --cream:      #F5F0E8;
      --beige:      #EDE5D4;
      --sand:       #D4C4A8;
      --mocha:      #8B6F5C;
      --walnut:     #5C3D2E;
      --espresso:   #2C1A0E;
      --charcoal:   #1A1612;
      --warm-white: #FAF7F2;
      --pad: clamp(20px, 5vw, 80px);
    }

    html { scroll-behavior: smooth; }
    body {
      background: var(--cream);
      color: var(--charcoal);
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
    }

    .font-display { font-family: 'Cormorant Garamond', serif; }
    .font-serif   { font-family: 'Playfair Display', serif; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--cream); }
    ::-webkit-scrollbar-thumb { background: var(--mocha); border-radius: 2px; }

    /* ── Nav links ── */
    .nav-link {
      position: relative; letter-spacing: 0.08em; font-size: 0.72rem;
      text-transform: uppercase; font-weight: 400;
      color: var(--warm-white); text-decoration: none; transition: opacity .25s;
    }
    .nav-link::after {
      content: ''; position: absolute; bottom: -2px; left: 0;
      width: 0; height: 1px; background: var(--sand);
      transition: width .35s cubic-bezier(.4,0,.2,1);
    }
    .nav-link:hover::after { width: 100%; }
    .nav-link:hover { opacity: .75; }

    /* ── Buttons ── */
    .btn-primary {
      background: var(--espresso); color: var(--warm-white); border: none;
      padding: 14px 36px; font-family: 'DM Sans', sans-serif;
      font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
      cursor: pointer; transition: background .3s, transform .2s; display: inline-block;
    }
    .btn-primary:hover { background: var(--walnut); transform: translateY(-1px); }
    .btn-outline {
      background: transparent; color: var(--warm-white);
      border: 1px solid rgba(255,255,255,.45); padding: 13px 35px;
      font-family: 'DM Sans', sans-serif; font-size: 0.72rem;
      letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer;
      transition: background .3s, border-color .3s, transform .2s;
    }
    .btn-outline:hover {
      background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.7);
      transform: translateY(-1px);
    }

    /* ── Grain ── */
    .grain::before {
      content: ''; position: fixed; inset: 0; z-index: 9999;
      pointer-events: none; opacity: .028;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height%3D'100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      background-size: 256px;
    }

    .section-label {
      font-size: 0.65rem; letter-spacing: 0.2em;
      text-transform: uppercase; color: var(--mocha); font-weight: 500;
    }

    @keyframes float {
      0%,100% { transform: translateY(0px); }
      50%      { transform: translateY(-8px); }
    }

    /* ── Hamburger ── */
    .hamburger {
      display: none; flex-direction: column; gap: 5px;
      cursor: pointer; padding: 4px; background: none; border: none;
    }
    .hamburger span {
      display: block; width: 22px; height: 1.5px;
      background: var(--warm-white); transition: all .3s;
    }
    .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
    .hamburger.open span:nth-child(2) { opacity: 0; }
    .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

    /* ── Mobile overlay menu ── */
    .mobile-menu {
      position: fixed; inset: 0; z-index: 999;
      background: rgba(26,10,4,.97);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 36px;
      backdrop-filter: blur(20px);
    }
    .mobile-menu a {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.2rem; font-weight: 300;
      color: var(--warm-white); text-decoration: none;
      letter-spacing: 0.08em; transition: color .2s;
    }
    .mobile-menu a:hover { color: var(--sand); }

    /* ── Tab scroll ── */
    .tab-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .tab-scroll::-webkit-scrollbar { display: none; }

    /* ════════════════════════════════
       RESPONSIVE BREAKPOINTS
    ════════════════════════════════ */

    /* Tablet: ≤ 900px */
    @media (max-width: 900px) {
      /* About 2-col → 1-col */
      .about-grid   { grid-template-columns: 1fr !important; gap: 48px !important; }
      /* Signatures 3-col → 1-col */
      .sig-grid     { grid-template-columns: 1fr !important; }
      /* Gallery mosaic → 2-col */
      .gallery-grid { grid-template-columns: 1fr 1fr !important; grid-template-rows: auto !important; }
      .gallery-tall { grid-row: auto !important; }
      /* Locations 2-col → 1-col */
      .location-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
      /* Footer 4-col → 2-col */
      .footer-grid  { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
      /* Bakery 5-col → 3-col */
      .bakery-strip { grid-template-columns: repeat(3,1fr) !important; }
      /* Food 2-col grid → keep but reduce gap */
      .food-grid    { gap: 8px !important; }
    }

    /* Mobile: ≤ 640px */
    @media (max-width: 640px) {
      .hamburger          { display: flex !important; }
      .nav-desktop-links  { display: none !important; }
      .nav-cta            { display: none !important; }

      /* Section padding */
      .sec { padding: 64px 20px !important; }

      /* Hero */
      .hero-content   { padding-left: 20px !important; padding-right: 20px !important; max-width: 100% !important; }
      .hero-right     { display: none !important; }
      .hero-stats     { display: none !important; }
      .hero-scroll    { display: none !important; }

      /* About */
      .about-grid     { grid-template-columns: 1fr !important; gap: 40px !important; }
      .about-badges   { gap: 20px !important; }
      .about-panel    { height: 280px !important; }

      /* Menu tabs */
      .menu-header    { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
      .sig-grid       { grid-template-columns: 1fr !important; gap: 8px !important; }
      .menu-2col      { grid-template-columns: 1fr !important; gap: 8px !important; }
      .food-grid      { grid-template-columns: 1fr !important; gap: 8px !important; }

      /* Coffee & iced cards — stack illustration on smaller screens */
      .coffee-card    { padding: 20px 16px !important; gap: 14px !important; }
      .cup-illus      { width: 56px !important; }
      .cup-illus svg  { width: 52px !important; height: 52px !important; }

      /* Signature card cup illustration — shrink */
      .sig-cup        { display: none !important; }

      /* Bakery strip */
      .bakery-strip   { grid-template-columns: 1fr 1fr !important; }

      /* Gallery */
      .gallery-grid   { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
      .gallery-tall   { grid-row: auto !important; }
      .gallery-cell   { height: 220px !important; }

      /* Reviews */
      .reviews-grid   { grid-template-columns: 1fr !important; }

      /* Locations */
      .location-grid  { grid-template-columns: 1fr !important; gap: 24px !important; }
      .loc-header     { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }

      /* Instagram */
      .insta-strip    { grid-template-columns: repeat(3,1fr) !important; }
      .insta-header   { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }

      /* Footer */
      .footer-grid    { grid-template-columns: 1fr !important; gap: 32px !important; }
      .footer-bottom  { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }

      /* Allergens grid */
      .allergen-grid  { grid-template-columns: 1fr !important; }

      /* Retail grid */
      .retail-grid    { grid-template-columns: 1fr !important; }

      /* Buttons */
      .btn-primary, .btn-outline { padding: 13px 22px !important; font-size: 0.68rem !important; }

      /* Hide decorative elements */
      .decor-only { display: none !important; }
    }

    /* Very small: ≤ 380px */
    @media (max-width: 380px) {
      .bakery-strip { grid-template-columns: 1fr !important; }
      .insta-strip  { grid-template-columns: repeat(2,1fr) !important; }
    }
  `}</style>
);

/* ─── Animated section wrapper ─── */
function Reveal({ children, delay = 0, className = "", y = 28 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Smooth scroll helper ─── */
function scrollToTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─── NAV ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { label: "Menu",      id: "menu" },
    { label: "Story",     id: "about" },
    { label: "About Us",   id: "gallery" },
    { label: "Locations", id: "locations" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          padding: scrolled ? "14px max(20px,4vw)" : "22px max(20px,4vw)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(42,24,12,.94)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,.06)" : "none",
          transition: "all .45s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, position: "relative", zIndex: 1001 }}
        >
          <span className="font-display" style={{
            fontSize: "1.45rem", letterSpacing: "0.25em",
            color: "var(--warm-white)", fontWeight: 300,
          }}>INFUSE</span>
        </button>

        {/* Desktop links */}
        <div className="nav-desktop-links" style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {links.map(l => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.id)}
              className="nav-link"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >{l.label}</button>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          onClick={() => scrollTo("locations")}
          className="btn-primary nav-cta"
          style={{ padding: "10px 24px" }}
        >Visit Us</button>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          style={{ position: "relative", zIndex: 1001 }}
          aria-label="Toggle menu"
        >
          <span/><span/><span/>
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map((l, i) => (
              <motion.button
                key={l.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.1 }}
                onClick={() => { scrollTo(l.id); setMenuOpen(false); }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2.2rem", fontWeight: 300,
                  color: "var(--warm-white)", letterSpacing: "0.08em",
                }}
              >{l.label}</motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
            >
              <button
                className="btn-primary"
                style={{ marginTop: 8, padding: "14px 40px" }}
                onClick={() => { scrollTo("locations"); setMenuOpen(false); }}
              >Visit Us</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── HERO ─── */
function Hero({ setPage = () => {}, lang = "en", t = T.en }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="hero" ref={ref} style={{ height: "100vh", minHeight: 640, position: "relative", overflow: "hidden" }}>
      {/* Background */}
      <motion.div style={{ y, position: "absolute", inset: 0 }}>
        {/* Deep warm gradient simulating a warm-lit café */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #1A0F07 0%, #2C1A0E 35%, #3D2416 55%, #1A0F07 100%)",
        }} />
        {/* Warm light bloom */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 60% at 65% 40%, rgba(139,111,92,.35) 0%, transparent 65%)",
        }} />
        {/* Subtle texture lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,.012) 80px)",
        }} />
        {/* Abstract coffee art - circle bloom */}
        <div style={{
          position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)",
          width: "42vw", height: "42vw", maxWidth: 520, maxHeight: 520,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at 35% 45%, rgba(139,111,92,.18) 0%, rgba(92,61,46,.12) 45%, transparent 70%)",
          border: "1px solid rgba(212,196,168,.08)",
        }} />
        {/* Thin ring */}
        <div style={{
          position: "absolute", right: "6%", top: "50%", transform: "translateY(-50%)",
          width: "46vw", height: "46vw", maxWidth: 560, maxHeight: 560,
          borderRadius: "50%",
          border: "1px solid rgba(212,196,168,.04)",
        }} />
      </motion.div>

      {/* Overlay gradient bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "45%",
        background: "linear-gradient(to top, var(--cream) 0%, transparent 100%)",
        zIndex: 2,
      }} />

      {/* Content */}
      <motion.div style={{ opacity, position: "relative", zIndex: 3 }}
        className="flex flex-col justify-center h-full"
        className="hero-content" style={{ paddingLeft: "max(48px, 8vw)", maxWidth: 640, opacity, position: "relative", zIndex: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="section-label"
          style={{ color: "rgba(212,196,168,.7)", marginBottom: 24 }}
        >
          {lang === "ar" ? "قهوة مختصة — الرياض" : "Specialty Coffee — Riyadh"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display"
          style={{
            fontSize: "clamp(3.2rem, 7vw, 5.8rem)",
            lineHeight: 1.04, fontWeight: 300,
            color: "var(--warm-white)",
            letterSpacing: "-0.01em",
            marginBottom: 10,
          }}
        >
          {t.hero.title1}<br />
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>{t.hero.title2}</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.9 }}
          style={{
            fontSize: "0.95rem", color: "rgba(245,240,232,.55)",
            fontWeight: 300, lineHeight: 1.7, maxWidth: 360,
            marginTop: 20, marginBottom: 40,
            letterSpacing: "0.01em",
          }}
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
        >
          <button className="btn-primary" onClick={() => setPage("menu")}>{t.cta.viewMenu}</button>
          <button className="btn-outline" onClick={() => setPage("branches")}>INFUSE</button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="hero-scroll" style={{
            position: "absolute", bottom: "10vh", left: "max(48px, 8vw)",
            display: "flex", alignItems: "center", gap: 12,
          }}
        >
          <div style={{ width: 32, height: 1, background: "rgba(212,196,168,.4)" }} />
          <span style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,196,168,.45)" }}>
            {lang === "ar" ? "للأسفل" : "Scroll"}
          </span>
        </motion.div>
      </motion.div>

      {/* Right side decorative element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="hero-right" style={{
          position: "absolute", right: "max(48px, 8vw)", top: "50%",
          transform: "translateY(-50%)", zIndex: 3,
          textAlign: "right",
        }}
      >
        {/* Coffee cup silhouette - SVG-drawn */}
        <svg width="220" height="260" viewBox="0 0 220 260" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.18 }}
        >
          <ellipse cx="105" cy="60" rx="72" ry="14" stroke="#D4C4A8" strokeWidth="1"/>
          <path d="M33 60 Q28 160 55 210 Q80 250 105 252 Q130 250 155 210 Q182 160 177 60" stroke="#D4C4A8" strokeWidth="1" fill="none"/>
          <path d="M177 80 Q200 88 202 115 Q204 142 177 148" stroke="#D4C4A8" strokeWidth="1" fill="none"/>
          <ellipse cx="105" cy="252" rx="50" ry="6" stroke="#D4C4A8" strokeWidth="0.5" opacity="0.5"/>
          {/* Steam lines */}
          <path d="M80 45 Q84 30 80 18" stroke="#D4C4A8" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
          <path d="M105 40 Q109 22 105 8" stroke="#D4C4A8" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
          <path d="M130 45 Q134 30 130 18" stroke="#D4C4A8" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
        </svg>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="hero-stats" style={{
          position: "absolute", bottom: "10vh", right: "max(48px, 8vw)",
          display: "flex", flexDirection: "column", gap: 20, zIndex: 3,
          textAlign: "right",
        }}
      >
        {[
          { num: "4", label: lang === "ar" ? "فروع في الرياض" : "Riyadh Branches" },
          { num: "12", label: lang === "ar" ? "مشروب مميز" : "Signature Drinks" },
          { num: "2022", label: lang === "ar" ? "سنة التأسيس" : "Est. Year" },
        ].map(s => (
          <div key={s.label}>
            <div className="font-display" style={{ fontSize: "1.6rem", color: "var(--warm-white)", fontWeight: 300, lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(212,196,168,.4)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─── ABOUT ─── */
function About({ lang = "en", t = T.en }) {
  const ta = t.about;
  const stats = [
    { num: "2022", label: ta.badge },
    { num: "4",    label: t.hero.stat2l },
    { num: "85+",  label: t.hero.stat3l },
    { num: "3+",   label: t.hero.stat4l },
  ];
  const values = [
    { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg>), title: ta.v1t, text: ta.v1p },
    { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>), title: ta.v2t, text: ta.v2p },
    { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>), title: ta.v3t, text: ta.v3p },
    { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.5"/></svg>), title: ta.v4t, text: ta.v4p },
  ];

  return (
    <div>
      {/* ── HERO TAGLINE SECTION ── */}
      <section style={{
        background: "var(--espresso)",
        padding: "clamp(64px,10vw,110px) clamp(20px,6vw,80px)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Warm texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(255,255,255,.015) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(255,255,255,.015) 60px)",
        }}/>
        <div style={{
          position: "absolute", top: "10%", right: "5%",
          width: "45%", height: "80%",
          background: "radial-gradient(ellipse, rgba(139,111,92,.18) 0%, transparent 65%)",
          pointerEvents: "none",
        }}/>

        <div style={{ maxWidth: 800, position: "relative" }}>
          <Reveal>
            <p className="section-label" style={{ marginBottom: 20, color: "rgba(212,196,168,.45)" }}>
              {t.hero.label}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display" style={{
              fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 300,
              color: "var(--warm-white)", lineHeight: 1.05,
              letterSpacing: "-0.01em", marginBottom: 28,
            }}>
              {t.hero.title1}<br /><em style={{ color: "rgba(212,196,168,.7)" }}>{t.hero.title2}</em>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{
              fontSize: "clamp(0.95rem,1.5vw,1.1rem)", fontWeight: 300,
              color: "rgba(212,196,168,.55)", lineHeight: 1.8,
              maxWidth: 520,
            }}>
              {t.hero.sub}
            </p>
          </Reveal>
        </div>

        {/* Stats row */}
        <Reveal delay={0.3}>
          <div style={{
            display: "flex", gap: 0, flexWrap: "wrap",
            marginTop: 64, borderTop: "1px solid rgba(212,196,168,.12)",
            paddingTop: 40,
          }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{
                flex: "1 1 120px",
                padding: "0 32px 0 0",
                borderRight: i < stats.length - 1 ? "1px solid rgba(212,196,168,.1)" : "none",
                marginRight: i < stats.length - 1 ? 32 : 0,
              }}>
                <div className="font-display" style={{
                  fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300,
                  color: "var(--warm-white)", lineHeight: 1,
                }}>{s.num}</div>
                <div style={{
                  fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "rgba(212,196,168,.38)", marginTop: 6,
                  fontFamily: "'DM Sans', sans-serif",
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── OUR STORY ── */}
      <section style={{ background: "var(--cream)", padding: "clamp(64px,10vw,110px) clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px,6vw,90px)", alignItems: "center",
          }} className="about-grid">

            {/* Left — story */}
            <div>
              <Reveal>
                <p className="section-label" style={{ marginBottom: 16 }}>{ta.label}</p>
                <h2 className="font-display" style={{
                  fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 300,
                  color: "var(--espresso)", lineHeight: 1.1, marginBottom: 28,
                }}>
                  {ta.title1}<br /><em>{ta.title2}</em>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ fontSize: "0.93rem", lineHeight: 1.9, color: "#5a4a3a", fontWeight: 300, marginBottom: 18 }}>
                  {ta.p1}
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p style={{ fontSize: "0.93rem", lineHeight: 1.9, color: "#5a4a3a", fontWeight: 300, marginBottom: 18 }}>
                  {ta.p2}</p>
              </Reveal>
              <Reveal delay={0.25}>
                <p style={{ fontSize: "0.93rem", lineHeight: 1.9, color: "#5a4a3a", fontWeight: 300, marginBottom: 36 }}>
                  {ta.p3}</p>
              </Reveal>

              {/* Pillars */}
              <Reveal delay={0.3}>
                <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                  {[
                    { label: ta.bean1, sub: ta.bean1sub },
                    { label: ta.bean2, sub: ta.bean2sub },
                    { label: ta.bean3, sub: ta.bean3sub },
                  ].map(b => (
                    <div key={b.label}>
                      <div style={{ fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mocha)", marginBottom: 5 }}>{b.label}</div>
                      <div style={{ fontSize: "0.78rem", color: "#8a7060", fontWeight: 300 }}>{b.sub}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — dark visual panel */}
            <Reveal delay={0.15} y={40}>
              <div style={{ position: "relative" }}>
                <div style={{
                  background: "linear-gradient(145deg,#2C1A0E 0%,#3D2416 55%,#1A0F07 100%)",
                  height: "clamp(360px,50vw,480px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden", position: "relative",
                }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,.018) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,.018) 40px)",
                  }}/>
                  <div style={{
                    position: "absolute", top: "15%", left: "20%",
                    width: "60%", height: "60%",
                    background: "radial-gradient(ellipse,rgba(139,111,92,.25) 0%,transparent 70%)",
                  }}/>
                  <div style={{ position: "relative", textAlign: "center" }}>
                    <div className="font-display" style={{
                      fontSize: "clamp(3rem,6vw,5rem)", fontWeight: 300,
                      color: "rgba(212,196,168,.09)", letterSpacing: "0.3em", lineHeight: 1,
                      userSelect: "none",
                    }}>INFUSE</div>
                    {[120, 80, 44].map(size => (
                      <div key={size} style={{
                        position: "absolute", top: "50%", left: "50%",
                        transform: "translate(-50%,-50%)",
                        width: size, height: size, borderRadius: "50%",
                        border: "1px solid rgba(212,196,168,.1)",
                      }}/>
                    ))}
                  </div>
                </div>

                {/* Floating est. badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute", bottom: -24, left: -20,
                    background: "var(--warm-white)",
                    padding: "20px 24px",
                    boxShadow: "0 20px 60px rgba(44,26,14,.14)",
                  }}
                >
                  <div className="font-display" style={{ fontSize: "2rem", color: "var(--espresso)", fontWeight: 300, lineHeight: 1 }}>2022</div>
                  <div style={{ fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mocha)", marginTop: 3 }}>{ta.badge}</div>
                </motion.div>

                {/* Top corner tag */}
                <div style={{
                  position: "absolute", top: -16, right: -16,
                  background: "var(--espresso)", padding: "12px 18px",
                }}>
                  <div style={{ fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,196,168,.6)" }}>
                    {ta.tag}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── VALUES / PILLARS ── */}
      <section style={{ background: "var(--beige)", padding: "clamp(56px,8vw,96px) clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p className="section-label" style={{ marginBottom: 14 }}>{ta.valuesLabel}</p>
            <h2 className="font-display" style={{
              fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 300,
              color: "var(--espresso)", lineHeight: 1.1, marginBottom: 48,
            }}>
              {ta.valuesTitle1}<br /><em>{ta.valuesTitle2}</em>
            </h2>
          </Reveal>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))",
            gap: 2,
          }}>
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <ValueCard v={v} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ v }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "var(--espresso)" : "var(--cream)",
        padding: "36px 28px",
        transition: "background .4s cubic-bezier(.4,0,.2,1)",
        cursor: "default",
      }}
    >
      <div style={{
        color: hov ? "rgba(212,196,168,.6)" : "var(--mocha)",
        marginBottom: 18, transition: "color .4s",
      }}>{v.icon}</div>
      <h3 style={{
        fontSize: "1rem", fontWeight: 500,
        color: hov ? "var(--warm-white)" : "var(--espresso)",
        marginBottom: 10, transition: "color .4s",
        letterSpacing: "0.01em",
      }}>{v.title}</h3>
      <p style={{
        fontSize: "0.82rem", lineHeight: 1.75, fontWeight: 300,
        color: hov ? "rgba(212,196,168,.5)" : "#7a6455",
        transition: "color .4s",
      }}>{v.text}</p>
    </div>
  );
}
/* ─── REAL MENU DATA (verified from live website photos) ─── */
function getMenuData(lang) {
  const isAr = lang === "ar";
  return {
  classicCoffee: [
    { name: "Espresso",          price: "﷼ 10", kcal: "5 kcal",   shape: "espresso",   desc: isAr?"نكهة نقية ومركزة":"Pure, concentrated shot" },
    { name: "Americano",         price: "﷼ 12", kcal: "5 kcal",   shape: "americano",  desc: isAr?"إسبريسو وماء ساخن":"Espresso & hot water" },
    { name: "Cortado",           price: "﷼ 15", kcal: "25 kcal",  shape: "cortado",    desc: isAr?"نصف إسبريسو ونصف حليب":"Equal parts espresso & milk" },
    { name: "Latte",             price: "﷼ 17", kcal: "103 kcal", shape: "latte",      desc: isAr?"حليب مبخر ناعم":"Silky steamed milk" },
    { name: "Flat White",        price: "﷼ 15", kcal: "75 kcal",  shape: "flatwhite",  desc: isAr?"رغوة ناعمة، مخملية":"Micro-foamed, velvety" },
    { name: "Cappuccino",        price: "﷼ 17", kcal: "97 kcal",  shape: "cappuccino", desc: isAr?"رغوة كثيفة، إسبريسو قوي":"Thick foam, bold espresso" },
    { name: "Coffee of The Day", price: "﷼ 12", kcal: "5 kcal",   shape: "cotd",       desc: isAr?"حبوب بيروفية / إثيوبية":"Peru Beans / Ethiopian Beans", note: isAr?"٨ أوقية · ١٢ أوقية":"8 oz · 12 oz" },
    { name: "V60",               price: "﷼ 20", kcal: null,       shape: "v60",        desc: isAr?"حبوب يمنية / إثيوبية":"Yemeni Beans / Ethiopian Beans", tag: isAr?"مختص":"Specialty", featured: true },
  ],
  classicIced: [
    { name: "Ice Latte",             price: "﷼ 17", kcal: "145 kcal", shape: "icelatte",     desc: isAr?"إسبريسو على الثلج مع حليب كريمي":"Espresso over ice, creamy milk" },
    { name: "Ice Americano",         price: "﷼ 12", kcal: "20 kcal",  shape: "iceamericano", desc: isAr?"إسبريسو قوي، ماء بارد وثلج":"Bold espresso, cold water & ice" },
    { name: "Ice Coffee of The Day", price: "﷼ 15", kcal: "20 kcal",  shape: "icecotd",      desc: isAr?"حبوب بيروفية / إثيوبية":"Peru Beans / Ethiopian Beans" },
    { name: "Ice V60",               price: "﷼ 20", kcal: null,       shape: "icev60",       desc: isAr?"حبوب يمنية / إثيوبية":"Yemeni Beans / Ethiopian Beans", tag: isAr?"مختص":"Specialty" },
  ],
  signatures: [
    { name: "Infuse I",    subtitle: "Spanish Latte", price: "﷼ 23", kcal: "295 kcal", tag: isAr?"الأكثر مبيعاً":"Bestseller",
      desc: isAr?"لاتيه إسباني بلمسة إنفيوز — حليب مكثف، إسبريسو مضاعف، حليب مبخر ناعم.":"Our signature take on the classic Spanish latte — condensed milk, double espresso, velvety steamed milk.",
      bg: "linear-gradient(145deg,#3D2416 0%,#5C3D2E 100%)", accent: "#8B6F5C" },
    { name: "Infuse II",   subtitle: "Coconut Latte", price: "﷼ 26", kcal: "342 kcal", tag: isAr?"مميز":"Signature",
      desc: isAr?"حليب جوز الهند الكريمي، إسبريسو غني، لمسة من الحلاوة. ساخن أو مثلج.":"Creamy coconut milk, rich espresso, a touch of sweetness. Available hot or iced.",
      bg: "linear-gradient(145deg,#1E2A1A 0%,#2E4028 100%)", accent: "#5A7A4A" },
    { name: "7 Cups",      subtitle: "Coffee of The Day", price: "﷼ 69", kcal: null, tag: isAr?"للمجموعات":"Catering",
      desc: isAr?"صندوق ١.٣ لتر — مثالي للمكتب، الاجتماعات، أو التجمعات الصباحية. يكفي ٧ أشخاص.":"1.3 Liter box — perfect for the office, meetings, or a morning gathering. Serves 7.",
      bg: "linear-gradient(145deg,#1A2030 0%,#2A3050 100%)", accent: "#4A6090" },
  ],
  infusion: [
    { name: "Watermelon Hibiscus Ice Tea", price: "﷼ 18", kcal: "70 kcal",  shape: "hibiscus", desc: isAr?"كركديه وبطيخ طازج على الثلج":"Vibrant hibiscus & fresh watermelon over ice" },
    { name: "INFUSE Matcha",              price: "﷼ 24", kcal: "141 kcal", shape: "matcha",   desc: isAr?"ساخن / بارد":"Hot / Cold", tag: isAr?"مختص":"Specialty" },
    { name: "Maramiya Yuzu",              price: "﷼ 20", kcal: "284 kcal", shape: "yuzu",     desc: isAr?"شاي فلسطيني، يوزو، فانيلا وماء فوار":"Palestinian Tea, Yuzu, Vanilla and Sparkling water" },
  ],
  croissants: [
    { name: "Plain Croissant",      price: "﷼ 14", kcal: "321 kcal" },
    { name: "Cheese Croissant",     price: "﷼ 14", kcal: "452 kcal" },
    { name: "Zaatar Croissant",     price: "﷼ 14", kcal: "354 kcal" },
    { name: "Almond Croissant",     price: "﷼ 16", kcal: "580 kcal" },
    { name: "Chocolate Croissant",  price: "﷼ 14", kcal: null       },
  ],
  bakery: [
    { name: "Classic Scones",                 price: "﷼ 4",  kcal: "180 kcal",  note: isAr?"قطعة واحدة":"One piece" },
    { name: "Classic Scones Box",             price: "﷼ 20", kcal: "1080 kcal", note: isAr?"٦ قطع":"6 pcs" },
    { name: "Apple Cinnamon Pecan Scones",    price: "﷼ 5",  kcal: "235 kcal",  note: isAr?"قطعة واحدة":"One piece" },
    { name: "Apple Cinnamon Pecan Scones Box",price: "﷼ 25", kcal: "1410 kcal", note: isAr?"٦ قطع":"6 pcs" },
  ],
  desserts: [
    { name: "Cookie MAMA",    price: "﷼ 18", kcal: "550 kcal",  note: isAr?"٢٢ قطعة كوكيز صغيرة":"22 pieces of Mini Cookies", tag: isAr?"المفضلة":"Fan Favourite" },
    { name: "Mango Coconut",  price: "﷼ 18", kcal: "253 kcal",  note: isAr?"قاعدة بسكويت تارت، كريمة مشكلة، جبن وجوز هند مبشور":"Tart biscuit base, mixed cream, cheese & shredded coconut", tag: isAr?"جديد":"New" },
    { name: "Original Tart",  price: "﷼ 22", kcal: "329 kcal",  note: null },
    { name: "Pecan Tart",     price: "﷼ 22", kcal: "345 kcal",  note: null },
    { name: "Lemon Tart",     price: "﷼ 22", kcal: "340 kcal",  note: null },
    { name: "INFUSE Tiramisu",price: "﷼ 18", kcal: "336 kcal",  note: null },
    { name: "Infuse Bytes",   price: "﷼ 17", kcal: null,        note: isAr?"٣ قطع شوكولاتة":"3 pieces chocolate bites" },
  ],
  sandwiches: [
    { name: "Spicy Tuna Sandwich",     price: "﷼ 28", kcal: "535 kcal" },
    { name: "Infuse Sandwich",         price: "﷼ 26", kcal: "722 kcal" },
    { name: "Grilled Halloumi Sandwich",price: "﷼ 26", kcal: "716 kcal" },
  ],
  cups: [
    { name: "Granola Yogurt",    price: "﷼ 24", kcal: "582 kcal", note: null },
    { name: "Chia Oats Pudding", price: "﷼ 22", kcal: "543 kcal", note: isAr?"بذور شيا · شوفان · زبادي يوناني · نوتيلا · موز":"Chia Seeds · Oats · Greek Yogurt · Nutella · Banana" },
  ],
  water: [
    { name: "Water", price: "﷼ 4", kcal: "1 kcal", note: null },
  ],
  retail: [
    { name: "Yemeni Coffee Beans",   price: "﷼ 48", kcal: null, note: isAr?"عنب، توت أزرق، كركديه وتوابل":"Grape, Blueberry, Roselle and Spices" },
    { name: "Ethiopian Coffee Beans",price: "﷼ 56", kcal: null, note: isAr?"توت أحمر، خوخ، زهري":"Red Berries, Peach, Floral" },
  ],
  allergens: [
    { name: isAr?"المكسرات":"Nuts",         desc: isAr?"مثل الكاجو والفستق وغيرها":"Such as cashews, pistachios and others", icon: "🥜" },
    { name: isAr?"الألبان":"Dairy",        desc: isAr?"مثل الحليب والجبن والزبادي":"Such as milk, cheese and yogurt",         icon: "🥛" },
    { name: isAr?"البيض":"Eggs",         desc: isAr?"مثل الكيك والبيض المخفوق":"Such as cake and scambled eggs",          icon: "🥚" },
    { name: isAr?"القمح/الغلوتين":"Wheat/Gluten", desc: isAr?"مثل الخبز والمعكرونة والدقيق":"Such as bread, pasta, flour",             icon: "🌾" },
  ],
  };
}

/* ─── SVG Cup Illustrations (warm-toned, brand-matched) ─── */
function CupIllustration({ shape, size = 96 }) {
  const warm = "#D4C4A8";
  const mid  = "#8B6F5C";
  const dark = "#3D2416";
  const foam = "#EDE5D4";
  const cream = "#C8A882";

  const cups = {
    espresso: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="56" rx="16" ry="4" fill={dark} opacity=".18"/>
        <rect x="24" y="28" width="32" height="28" rx="3" fill={dark}/>
        <ellipse cx="40" cy="28" rx="16" ry="5" fill={mid}/>
        <ellipse cx="40" cy="28" rx="11" ry="3.5" fill={cream} opacity=".7"/>
        <path d="M56 36 Q66 36 66 44 Q66 52 56 52" stroke={mid} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <rect x="26" y="54" width="28" height="3" rx="1.5" fill={mid} opacity=".4"/>
      </svg>
    ),
    americano: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="58" rx="19" ry="5" fill={dark} opacity=".15"/>
        <rect x="20" y="22" width="40" height="36" rx="3" fill={dark}/>
        <ellipse cx="40" cy="22" rx="20" ry="6" fill={mid}/>
        <ellipse cx="40" cy="22" rx="14" ry="4" fill="#2C1A0E" opacity=".8"/>
        <ellipse cx="40" cy="22" rx="8" ry="2" fill="#1A0F07" opacity=".6"/>
        <path d="M60 32 Q72 32 72 42 Q72 52 60 52" stroke={mid} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <rect x="22" y="56" width="36" height="3" rx="1.5" fill={mid} opacity=".35"/>
      </svg>
    ),
    cortado: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="57" rx="15" ry="4" fill={dark} opacity=".18"/>
        <rect x="25" y="26" width="30" height="31" rx="3" fill={dark}/>
        <ellipse cx="40" cy="26" rx="15" ry="5" fill={mid}/>
        <ellipse cx="40" cy="26" rx="11" ry="3.5" fill={foam}/>
        {/* Latte art */}
        <ellipse cx="40" cy="26" rx="6" ry="2" fill={cream} opacity=".8"/>
        <path d="M36 24 Q40 22 44 24" stroke={cream} strokeWidth="1" fill="none" opacity=".6"/>
        <path d="M55 34 Q64 34 64 42 Q64 50 55 50" stroke={mid} strokeWidth="2" fill="none" strokeLinecap="round"/>
        <rect x="27" y="55" width="26" height="3" rx="1.5" fill={mid} opacity=".35"/>
      </svg>
    ),
    latte: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="60" rx="20" ry="5" fill={dark} opacity=".13"/>
        <rect x="19" y="20" width="42" height="40" rx="3" fill={dark}/>
        <ellipse cx="40" cy="20" rx="21" ry="6.5" fill={mid}/>
        <ellipse cx="40" cy="20" rx="16" ry="4.5" fill={foam}/>
        {/* Heart latte art */}
        <path d="M33 18 Q33 14 37 16 Q40 18 40 18 Q40 18 43 16 Q47 14 47 18 Q47 22 40 26 Q33 22 33 18Z" fill={cream} opacity=".75"/>
        <path d="M61 30 Q74 30 74 42 Q74 54 61 54" stroke={mid} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <rect x="21" y="58" width="38" height="3" rx="1.5" fill={mid} opacity=".3"/>
      </svg>
    ),
    flatwhite: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="59" rx="19" ry="5" fill={dark} opacity=".13"/>
        <rect x="20" y="21" width="40" height="38" rx="3" fill={dark}/>
        <ellipse cx="40" cy="21" rx="20" ry="6" fill={mid}/>
        <ellipse cx="40" cy="21" rx="15" ry="4.2" fill={foam}/>
        {/* Tulip art */}
        <ellipse cx="40" cy="20" rx="7" ry="3" fill={cream} opacity=".8"/>
        <path d="M35 23 Q40 21 45 23" stroke={cream} strokeWidth="1.2" fill="none" opacity=".6"/>
        <path d="M37 25 Q40 23 43 25" stroke={cream} strokeWidth="1" fill="none" opacity=".5"/>
        <path d="M61 31 Q73 31 73 42 Q73 53 61 53" stroke={mid} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <rect x="22" y="57" width="36" height="3" rx="1.5" fill={mid} opacity=".3"/>
      </svg>
    ),
    cappuccino: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="59" rx="19" ry="5" fill={dark} opacity=".13"/>
        <rect x="20" y="22" width="40" height="37" rx="3" fill={dark}/>
        <ellipse cx="40" cy="22" rx="20" ry="6" fill={mid}/>
        {/* Thick foam dome */}
        <ellipse cx="40" cy="19" rx="17" ry="7" fill={foam}/>
        <ellipse cx="40" cy="17" rx="12" ry="5" fill="#FAF7F2" opacity=".9"/>
        {/* Heart */}
        <path d="M35 16 Q35 12 38.5 14 Q40 16 40 16 Q40 16 41.5 14 Q45 12 45 16 Q45 20 40 23 Q35 20 35 16Z" fill={cream} opacity=".65"/>
        <path d="M61 32 Q73 32 73 42 Q73 52 61 52" stroke={mid} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <rect x="22" y="57" width="36" height="3" rx="1.5" fill={mid} opacity=".3"/>
      </svg>
    ),
    cotd: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="59" rx="18" ry="4.5" fill={dark} opacity=".15"/>
        <rect x="21" y="22" width="38" height="37" rx="3" fill={dark}/>
        <ellipse cx="40" cy="22" rx="19" ry="5.5" fill={mid}/>
        <ellipse cx="40" cy="22" rx="13" ry="3.8" fill="#2A1A08" opacity=".9"/>
        {/* Steam */}
        <path d="M33 16 Q36 10 33 4" stroke={warm} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".5"/>
        <path d="M40 14 Q43 8 40 2" stroke={warm} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".4"/>
        <path d="M47 16 Q50 10 47 4" stroke={warm} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".3"/>
        <path d="M59 32 Q71 32 71 42 Q71 52 59 52" stroke={mid} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <rect x="23" y="57" width="34" height="3" rx="1.5" fill={mid} opacity=".3"/>
      </svg>
    ),
    v60: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        {/* V60 dripper */}
        <path d="M22 18 L40 58 L58 18 Z" fill={dark} opacity=".9"/>
        <path d="M24 18 L40 55 L56 18" stroke={mid} strokeWidth="1" fill="none" opacity=".4"/>
        {/* Top rim */}
        <ellipse cx="40" cy="18" rx="18" ry="5" fill={mid}/>
        <ellipse cx="40" cy="18" rx="14" ry="3.5" fill="#2A1A08"/>
        {/* Coffee stream */}
        <line x1="40" y1="58" x2="40" y2="68" stroke={cream} strokeWidth="1.5" opacity=".6"/>
        {/* Cup below */}
        <ellipse cx="40" cy="72" rx="12" ry="3" fill={dark}/>
        <rect x="28" y="68" width="24" height="8" rx="2" fill={dark} opacity=".8"/>
        {/* Spiral lines on dripper */}
        <path d="M30 26 Q40 24 50 26" stroke={warm} strokeWidth="0.8" fill="none" opacity=".25"/>
        <path d="M32 32 Q40 30 48 32" stroke={warm} strokeWidth="0.8" fill="none" opacity=".2"/>
        <path d="M34 38 Q40 36 46 38" stroke={warm} strokeWidth="0.8" fill="none" opacity=".15"/>
      </svg>
    ),
    icev60: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="68" rx="16" ry="4" fill={dark} opacity=".15"/>
        <rect x="24" y="18" width="32" height="50" rx="8" fill={dark} opacity=".85"/>
        <rect x="26" y="20" width="28" height="46" rx="7" fill="#0F1A28" opacity=".8"/>
        <rect x="29" y="36" width="9" height="9" rx="2" fill="#A8C8E8" opacity=".3"/>
        <rect x="42" y="32" width="8" height="8" rx="2" fill="#A8C8E8" opacity=".25"/>
        <rect x="30" y="48" width="8" height="7" rx="2" fill="#A8C8E8" opacity=".2"/>
        <rect x="41" y="44" width="7" height="8" rx="2" fill="#A8C8E8" opacity=".22"/>
        <ellipse cx="40" cy="28" rx="12" ry="3.5" fill="#2A1A08" opacity=".9"/>
        <ellipse cx="40" cy="20" rx="14" ry="4" fill={foam} opacity=".9"/>
        <ellipse cx="40" cy="20" rx="10" ry="2.5" fill="#FAF7F2"/>
        <rect x="44" y="8" width="4" height="54" rx="2" fill={warm} opacity=".65"/>
        <rect x="26" y="38" width="28" height="10" rx="1" fill="#4A8AA8" opacity=".25"/>
      </svg>
    ),
    icelatte: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="68" rx="16" ry="4" fill={dark} opacity=".15"/>
        {/* Tall cup — cream/latte layered look */}
        <rect x="24" y="16" width="32" height="52" rx="8" fill={dark} opacity=".8"/>
        {/* Cream top half */}
        <rect x="26" y="18" width="28" height="20" rx="7" fill={foam} opacity=".55"/>
        {/* Dark coffee bottom half */}
        <rect x="26" y="38" width="28" height="28" rx="3" fill="#2A1408" opacity=".6"/>
        {/* Branded blue band */}
        <rect x="24" y="40" width="32" height="11" rx="1" fill="#5AABCC" opacity=".3"/>
        {/* White lid */}
        <ellipse cx="40" cy="18" rx="14" ry="4.5" fill={foam} opacity=".95"/>
        <ellipse cx="40" cy="16" rx="10" ry="2.5" fill="#FAF7F2"/>
        {/* Straw */}
        <rect x="45" y="6" width="3.5" height="56" rx="1.5" fill={warm} opacity=".6"/>
      </svg>
    ),
    iceamericano: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="68" rx="16" ry="4" fill={dark} opacity=".15"/>
        <rect x="24" y="18" width="32" height="50" rx="8" fill={dark} opacity=".85"/>
        <rect x="26" y="20" width="28" height="46" rx="7" fill="#0A1520" opacity=".8"/>
        {/* Ice */}
        <rect x="30" y="40" width="9" height="9" rx="2" fill="#8AB0D0" opacity=".3"/>
        <rect x="41" y="36" width="8" height="8" rx="2" fill="#8AB0D0" opacity=".25"/>
        <rect x="31" y="50" width="7" height="7" rx="2" fill="#8AB0D0" opacity=".2"/>
        {/* Dark coffee top */}
        <ellipse cx="40" cy="20" rx="14" ry="4" fill="#1A0F07" opacity=".9"/>
        {/* Straw */}
        <rect x="35" y="10" width="3" height="52" rx="1.5" fill={warm} opacity=".55"/>
      </svg>
    ),
    icecotd: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="68" rx="16" ry="4" fill={dark} opacity=".15"/>
        <rect x="24" y="18" width="32" height="50" rx="8" fill={dark} opacity=".85"/>
        <rect x="26" y="20" width="28" height="46" rx="7" fill="#1A1208" opacity=".75"/>
        <rect x="30" y="42" width="8" height="8" rx="2" fill="#C8A040" opacity=".2"/>
        <rect x="42" y="38" width="8" height="8" rx="2" fill="#C8A040" opacity=".18"/>
        <ellipse cx="40" cy="20" rx="14" ry="4" fill={mid} opacity=".7"/>
        <rect x="44" y="10" width="3" height="52" rx="1.5" fill={warm} opacity=".55"/>
      </svg>
    ),
    hibiscus: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="72" rx="17" ry="4" fill="#2A0A10" opacity=".15"/>
        {/* Tall clear cup */}
        <path d="M20 16 Q20 12 24 12 L56 12 Q60 12 60 16 L56 70 Q56 72 52 72 L28 72 Q24 72 24 70 Z"
          fill="#8B1A2A" opacity=".75"/>
        {/* Deep red hibiscus colour */}
        <path d="M22 16 L58 16 L54 70 L26 70 Z" fill="#C0253A" opacity=".45"/>
        {/* Ice cubes */}
        <rect x="28" y="28" width="9" height="9" rx="2" fill="#F0A0A8" opacity=".25"/>
        <rect x="42" y="24" width="9" height="9" rx="2" fill="#F0A0A8" opacity=".2"/>
        <rect x="29" y="42" width="8" height="8" rx="2" fill="#F0A0A8" opacity=".18"/>
        <rect x="42" y="40" width="8" height="8" rx="2" fill="#F0A0A8" opacity=".15"/>
        {/* Infuse band */}
        <rect x="20" y="50" width="40" height="12" rx="1" fill="#FAF7F2" opacity=".2"/>
        <text x="40" y="58.5" textAnchor="middle" fontSize="5.5" fill="#C0253A"
          fontFamily="Georgia, serif" letterSpacing="1" fontStyle="italic">Infuse</text>
        {/* Clear lid */}
        <ellipse cx="40" cy="13" rx="18" ry="4.5" fill="#F0C0C8" opacity=".5"/>
        <ellipse cx="40" cy="12" rx="14" ry="3" fill="#FAE0E4" opacity=".55"/>
        <ellipse cx="36" cy="11" rx="4" ry="1.8" fill="rgba(255,255,255,.4)"/>
        {/* Straw */}
        <rect x="50" y="2" width="3.5" height="60" rx="1.5" fill="#D4C4A8" opacity=".6"/>
      </svg>
    ),
    matcha: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="72" rx="17" ry="4" fill="#0A1A0A" opacity=".12"/>
        {/* Tall cup */}
        <path d="M20 16 Q20 12 24 12 L56 12 Q60 12 60 16 L56 70 Q56 72 52 72 L28 72 Q24 72 24 70 Z"
          fill="#1A2A10" opacity=".85"/>
        {/* White/cream milk bottom layer */}
        <path d="M24 52 L28 70 Q28 72 32 72 L48 72 Q52 72 52 70 L56 52 Z"
          fill="#FAF7F2" opacity=".8"/>
        {/* Vivid green matcha middle layer */}
        <path d="M21 28 L59 28 L56 52 L24 52 Z" fill="#5A9A30" opacity=".75"/>
        {/* Deep matcha top */}
        <path d="M20 16 L60 16 L59 28 L21 28 Z" fill="#3A7020" opacity=".8"/>
        {/* Bubbles/froth at green/white border */}
        <ellipse cx="36" cy="52" rx="3" ry="1.2" fill="#A8D880" opacity=".35"/>
        <ellipse cx="44" cy="52" rx="2.5" ry="1" fill="#A8D880" opacity=".3"/>
        {/* Infuse band — warm teal */}
        <rect x="20" y="40" width="40" height="11" rx="1" fill="#6ABBD8" opacity=".38"/>
        <text x="40" y="48" textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,.8)"
          fontFamily="Georgia, serif" letterSpacing="1" fontStyle="italic">Infuse</text>
        {/* White lid */}
        <ellipse cx="40" cy="13" rx="18" ry="4.5" fill="#EDE5D4" opacity=".9"/>
        <ellipse cx="40" cy="12" rx="14" ry="3" fill="#FAF7F2" opacity=".95"/>
        <ellipse cx="36" cy="11" rx="4" ry="1.8" fill="rgba(255,255,255,.5)"/>
        {/* No straw — matches photo (hot/cold cup with lid) */}
      </svg>
    ),
    yuzu: (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="72" rx="17" ry="4" fill="#1A1008" opacity=".12"/>
        {/* Tall clear cup */}
        <path d="M20 16 Q20 12 24 12 L56 12 Q60 12 60 16 L56 70 Q56 72 52 72 L28 72 Q24 72 24 70 Z"
          fill="#8A5010" opacity=".7"/>
        {/* Warm amber tea colour */}
        <path d="M22 16 L58 16 L54 70 L26 70 Z" fill="#D4780A" opacity=".45"/>
        {/* Lighter amber top */}
        <path d="M22 16 L58 16 L57 32 L23 32 Z" fill="#E8A020" opacity=".3"/>
        {/* Yuzu lemon slice on top */}
        <ellipse cx="40" cy="18" rx="10" ry="10" fill="#F0D040" opacity=".75"/>
        <ellipse cx="40" cy="18" rx="7" ry="7" fill="#F8E060" opacity=".6"/>
        {/* Lemon segment lines */}
        <line x1="40" y1="11" x2="40" y2="25" stroke="#D4A810" strokeWidth="0.8" opacity=".5"/>
        <line x1="33" y1="14" x2="47" y2="22" stroke="#D4A810" strokeWidth="0.8" opacity=".4"/>
        <line x1="33" y1="22" x2="47" y2="14" stroke="#D4A810" strokeWidth="0.8" opacity=".4"/>
        <ellipse cx="40" cy="18" rx="3" ry="3" fill="#F0D040" opacity=".4"/>
        {/* Infuse band */}
        <rect x="20" y="48" width="40" height="12" rx="1" fill="#6ABBD8" opacity=".35"/>
        <text x="40" y="56.5" textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,.8)"
          fontFamily="Georgia, serif" letterSpacing="1" fontStyle="italic">Infuse</text>
        {/* White lid */}
        <ellipse cx="40" cy="13" rx="18" ry="4.5" fill="#EDE5D4" opacity=".85"/>
        <ellipse cx="40" cy="12" rx="14" ry="3" fill="#FAF7F2" opacity=".9"/>
        <ellipse cx="36" cy="11" rx="4" ry="1.8" fill="rgba(255,255,255,.45)"/>
      </svg>
    ),
  };
  return cups[shape] || cups.latte;
}


/* ─── Item name translator ─── */
function tName(name, lang) {
  if (lang !== "ar") return name;
  const map = {
    "Espresso": "إسبريسو", "Americano": "أمريكانو", "Cortado": "كورتادو",
    "Latte": "لاتيه", "Flat White": "فلات وايت", "Cappuccino": "كابوتشينو",
    "Coffee of The Day": "قهوة اليوم", "V60": "V60",
    "Ice Latte": "لاتيه مثلج", "Ice Americano": "أمريكانو مثلج",
    "Ice Coffee of The Day": "قهوة اليوم المثلجة", "Ice V60": "V60 مثلج",
    "Infuse I": "إنفيوز I", "Infuse II": "إنفيوز II", "7 Cups": "٧ أكواب",
    "Spanish Latte": "لاتيه إسباني", "Coconut Latte": "لاتيه جوز الهند",
    "Watermelon Hibiscus Ice Tea": "شاي الكركديه والبطيخ المثلج",
    "INFUSE Matcha": "ماتشا إنفيوز", "Maramiya Yuzu": "مرامية يوزو",
    "Plain Croissant": "كرواسان سادة", "Cheese Croissant": "كرواسان جبن",
    "Zaatar Croissant": "كرواسان زعتر", "Almond Croissant": "كرواسان لوز",
    "Chocolate Croissant": "كرواسان شوكولاتة",
    "Classic Scones": "سكونز كلاسيك", "Classic Scones Box": "صندوق سكونز كلاسيك",
    "Apple Cinnamon Pecan Scones": "سكونز تفاح وقرفة وبيكان",
    "Apple Cinnamon Pecan Scones Box": "صندوق سكونز تفاح وقرفة وبيكان",
    "Spicy Tuna Sandwich": "سندويش تونة حارة",
    "Infuse Sandwich": "سندويش إنفيوز",
    "Grilled Halloumi Sandwich": "سندويش حلومي مشوي",
    "Granola Yogurt": "يوغرت غرانولا",
    "Chia Oats Pudding": "بودينغ الشيا والشوفان",
    "Water": "ماء",
    "Cookie MAMA": "كوكي ماما", "Mango Coconut": "مانغو جوز الهند",
    "Original Tart": "تارت أصلي", "Pecan Tart": "تارت بيكان",
    "Lemon Tart": "تارت ليمون", "INFUSE Tiramisu": "تيراميسو إنفيوز",
    "Infuse Bytes": "إنفيوز بايتس",
    "Yemeni Coffee Beans": "حبوب قهوة يمنية",
    "Ethiopian Coffee Beans": "حبوب قهوة إثيوبية",
  };
  return map[name] || name;
}

/* ─── Visual Coffee Card (for Coffee tab) ─── */
function CoffeeCard({ item, index, lang = "en" }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "var(--espresso)" : "var(--warm-white)",
        border: `1px solid ${hov ? "transparent" : "rgba(212,196,168,.3)"}`,
        padding: "28px 24px 24px",
        display: "flex", alignItems: "center", gap: 20,
        cursor: "default",
        transition: "background .4s cubic-bezier(.4,0,.2,1), border-color .4s, box-shadow .4s, transform .35s",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hov ? "0 20px 60px rgba(28,14,6,.18)" : "0 2px 12px rgba(28,14,6,.04)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Warm glow behind cup on hover */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 110,
        background: hov
          ? "radial-gradient(ellipse at 50% 60%, rgba(139,111,92,.18) 0%, transparent 70%)"
          : "radial-gradient(ellipse at 50% 60%, rgba(139,111,92,.07) 0%, transparent 70%)",
        transition: "opacity .4s", pointerEvents: "none",
      }}/>

      {/* Cup illustration */}
      <div className="cup-illus" style={{
        flexShrink: 0, width: 80, display: "flex", alignItems: "center", justifyContent: "center",
        filter: hov ? "brightness(1.15) saturate(1.1)" : "brightness(0.95)",
        transition: "filter .4s, transform .4s",
        transform: hov ? "scale(1.06) translateY(-2px)" : "scale(1)",
        position: "relative", zIndex: 1,
      }}>
        <CupIllustration shape={item.shape} size={72} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <h3 style={{
                fontSize: "0.98rem", fontWeight: 500,
                color: hov ? "var(--warm-white)" : "var(--espresso)",
                letterSpacing: "0.01em", transition: "color .4s",
              }}>{tName(item.name, lang)}</h3>
              {item.tag && (
                <span style={{
                  fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase",
                  color: hov ? "rgba(212,196,168,.6)" : "var(--mocha)",
                  border: `1px solid ${hov ? "rgba(212,196,168,.25)" : "var(--sand)"}`,
                  padding: "2px 7px", transition: "all .4s",
                }}>{item.tag}</span>
              )}
            </div>
            {item.desc && (
              <p style={{
                fontSize: "0.75rem", marginTop: 3,
                color: hov ? "rgba(212,196,168,.5)" : "#9a8878",
                fontWeight: 300, transition: "color .4s",
              }}>{item.desc}</p>
            )}
            {item.note && (
              <p style={{
                fontSize: "0.68rem", marginTop: 2,
                color: hov ? "rgba(212,196,168,.4)" : "#b0a090",
                fontWeight: 300, fontStyle: "italic", transition: "color .4s",
              }}>{item.note}</p>
            )}
          </div>
          {/* Price block */}
          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
            <div className="font-display" style={{
              fontSize: "1.15rem", fontWeight: 300,
              color: hov ? "var(--warm-white)" : "var(--espresso)",
              transition: "color .4s", lineHeight: 1,
            }}>{item.price}</div>
            {item.kcal && (
              <div style={{
                fontSize: "0.6rem", marginTop: 3,
                color: hov ? "rgba(212,196,168,.4)" : "#b8a890",
                transition: "color .4s",
              }}>{item.kcal}</div>
            )}
          </div>
        </div>
      </div>

      {/* Right-edge accent on hover */}
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 2,
        background: "var(--mocha)",
        transform: hov ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: "bottom",
        transition: "transform .4s cubic-bezier(.4,0,.2,1)",
      }}/>
    </motion.div>
  );
}

/* ─── Layered Signature Cup SVG (matches real product photo) ─── */
function SignatureCupSVG({ variant, hov }) {
  // variant: "spanish" | "coconut" | "box"
  if (variant === "box") {
    // 7-cup carton box
    return (
      <svg width="90" height="110" viewBox="0 0 90 110" fill="none">
        {/* Box body */}
        <rect x="12" y="20" width="54" height="72" rx="4" fill="#A8D8E8" opacity=".85"/>
        <rect x="14" y="22" width="50" height="68" rx="3" fill="#B8E0F0" opacity=".6"/>
        {/* Handle top */}
        <rect x="22" y="10" width="34" height="14" rx="4" fill="#8ABCD0" opacity=".9"/>
        <rect x="34" y="10" width="10" height="5" rx="2" fill="#5A9AB8" opacity=".7"/>
        {/* Nozzle */}
        <rect x="58" y="48" width="16" height="10" rx="5" fill="#6AACCC" opacity=".9"/>
        <circle cx="74" cy="53" r="4" fill="#4A8AAA" opacity=".8"/>
        {/* Label area */}
        <rect x="18" y="42" width="38" height="30" rx="2" fill="rgba(255,255,255,.15)"/>
        {/* INFUSE text on box */}
        <text x="37" y="61" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,.8)"
          fontFamily="serif" letterSpacing="1.5" fontStyle="italic">infuse</text>
        {/* Small cup beside */}
        <rect x="22" y="86" width="18" height="18" rx="6" fill="#D4C4A8" opacity=".7"/>
        <ellipse cx="31" cy="87" rx="9" ry="2.5" fill="#EDE5D4" opacity=".6"/>
        <ellipse cx="31" cy="87" rx="5" ry="1.5" fill="#2A1A08" opacity=".7"/>
        {/* Shadow */}
        <ellipse cx="39" cy="98" rx="28" ry="5" fill="#1A0F07" opacity=".1"/>
      </svg>
    );
  }

  // Spanish Latte & Coconut Latte — tall layered iced cup from photo
  const milkColor   = variant === "coconut" ? "#F0EDE6" : "#FAF7F2";
  const bandColor   = "#6ABBD8";
  const coffeeColor = "#3A1E08";

  return (
    <svg width="80" height="110" viewBox="0 0 80 110" fill="none">
      {/* Drop shadow */}
      <ellipse cx="40" cy="103" rx="20" ry="4" fill="#1A0F07" opacity=".12"/>

      {/* Cup body — slightly tapered, taller */}
      <path d="M18 18 Q18 14 22 14 L58 14 Q62 14 62 18 L58 95 Q58 98 54 98 L26 98 Q22 98 22 95 Z"
        fill={variant === "coconut" ? "#2A1E12" : "#1E1208"} opacity=".9"/>

      {/* White/milk bottom layer (~40% of cup) */}
      <path d="M22 62 L26 98 Q26 100 30 100 L50 100 Q54 100 54 98 L58 62 Z"
        fill={milkColor} opacity=".88"/>

      {/* Dark espresso/coffee top layer (~55% of cup) */}
      <path d="M18 18 Q18 14 22 14 L58 14 Q62 14 62 18 L58 62 L22 62 Z"
        fill={coffeeColor} opacity=".82"/>

      {/* Subtle coffee gradient depth */}
      <path d="M20 18 L60 18 L58 48 L22 48 Z"
        fill={variant === "coconut" ? "#5A3820" : "#4A2410"} opacity=".3"/>

      {/* Branded blue Infuse band */}
      <rect x="18" y="56" width="44" height="14" rx="1"
        fill={bandColor} opacity={hov ? ".55" : ".42"}/>
      <text x="40" y="65.5" textAnchor="middle" fontSize="5.5"
        fill="rgba(255,255,255,.85)" fontFamily="Georgia, serif"
        letterSpacing="1" fontStyle="italic">Infuse</text>

      {/* Transparent cup wall highlights */}
      <path d="M22 18 L22 62" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
      <path d="M58 18 L58 62" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>

      {/* Clear plastic lid */}
      <ellipse cx="40" cy="15" rx="20" ry="5.5" fill="#D0E8F0" opacity=".5"/>
      <ellipse cx="40" cy="14" rx="16" ry="3.5" fill="#E8F4FA" opacity=".6"/>
      {/* Lid dome highlight */}
      <ellipse cx="36" cy="13" rx="5" ry="2" fill="rgba(255,255,255,.3)" opacity=".5"/>

      {/* Straw */}
      <rect x="51" y="2" width="4" height="68" rx="2"
        fill="#D4C4A8" opacity={hov ? ".8" : ".6"}/>
      {/* Straw inner line */}
      <rect x="52.5" y="2" width="1" height="68" rx="0.5"
        fill="rgba(255,255,255,.2)"/>
    </svg>
  );
}

/* ─── Signature Cards (hero-style with real cup illustration) ─── */
function SignatureCard({ item, index, lang = "en" }) {
  const [hov, setHov] = useState(false);

  const cupVariant = item.name === "7 Cups" ? "box"
    : item.name === "Infuse II" ? "coconut"
    : "spanish";

  return (
    <Reveal delay={index * 0.1}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: item.bg,
          position: "relative", overflow: "hidden",
          transition: "transform .45s cubic-bezier(.4,0,.2,1), box-shadow .45s",
          transform: hov ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hov
            ? `0 32px 80px rgba(28,14,6,.32), 0 0 0 1px ${item.accent}40`
            : "0 4px 24px rgba(28,14,6,.12)",
          cursor: "default",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          minHeight: 240,
        }}
      >
        {/* Accent glow top-right */}
        <div style={{
          position: "absolute", top: "-30%", right: "-10%",
          width: "70%", height: "150%",
          background: `radial-gradient(ellipse, ${item.accent}30 0%, transparent 60%)`,
          opacity: hov ? 1 : 0.45,
          transition: "opacity .5s", pointerEvents: "none",
        }}/>
        {/* Subtle grid texture */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,.012) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,.012) 40px)",
        }}/>

        {/* Main content row */}
        <div style={{
          position: "relative",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          padding: "32px 32px 0",
        }}>
          {/* Left: text */}
          <div style={{ flex: 1, paddingRight: 16 }}>
            {/* Tag */}
            <div style={{
              display: "inline-block", marginBottom: 16,
              fontSize: "0.5rem", letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(212,196,168,.55)", border: "1px solid rgba(212,196,168,.18)",
              padding: "3px 10px",
            }}>{item.tag}</div>

            {/* Name */}
            <div style={{ marginBottom: 4 }}>
              <div className="font-display" style={{
                fontSize: "clamp(1.7rem,2.6vw,2.3rem)", fontWeight: 300,
                color: "var(--warm-white)", lineHeight: 1,
              }}>{tName(item.name, lang)}</div>
              <div className="font-display" style={{
                fontSize: "clamp(0.9rem,1.4vw,1.15rem)", fontWeight: 300,
                color: "rgba(212,196,168,.48)", fontStyle: "italic", marginTop: 4,
              }}>{tName(item.subtitle, lang)}</div>
            </div>

            <p style={{
              fontSize: "0.76rem", color: "rgba(212,196,168,.4)",
              fontWeight: 300, lineHeight: 1.7, marginTop: 14, maxWidth: 220,
            }}>{item.desc}</p>
          </div>

          {/* Right: cup illustration */}
          <motion.div
            animate={{ y: hov ? -6 : 0, scale: hov ? 1.04 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="sig-cup" style={{ flexShrink: 0, marginTop: -8 }}
          >
            <SignatureCupSVG variant={cupVariant} hov={hov} />
          </motion.div>
        </div>

        {/* Bottom price row */}
        <div style={{
          position: "relative",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 32px 28px",
          borderTop: "1px solid rgba(212,196,168,.1)",
          marginTop: 24,
        }}>
          <div>
            <div className="font-display" style={{
              fontSize: "2rem", color: "var(--warm-white)",
              fontWeight: 300, lineHeight: 1,
            }}>{item.price}</div>
            {item.kcal && (
              <div style={{ fontSize: "0.6rem", color: "rgba(212,196,168,.32)", marginTop: 3, letterSpacing: "0.05em" }}>
                {item.kcal}
              </div>
            )}
          </div>
          <motion.div
            animate={{ opacity: hov ? 1 : 0.28, x: hov ? 0 : -10 }}
            transition={{ duration: 0.35 }}
            style={{
              fontSize: "0.6rem", letterSpacing: "0.14em",
              textTransform: "uppercase", color: "rgba(212,196,168,.6)",
            }}
          >
            {item.name === "7 Cups" ? "Serves 7 · 1.3 Liter →" : "Hot / Iced →"}
          </motion.div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Simple menu row for non-coffee tabs ─── */
/* ─── Food Illustrations ─── */
function FoodIllustration({ name, size = 80 }) {
  const dark = "#3D2416";
  const mocha = "#8B6F5C";
  const s = size;

  if (name === "Plain Croissant") return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="68" rx="24" ry="5" fill={dark} opacity=".1"/>
      <path d="M14 52 Q12 36 24 26 Q36 16 50 20 Q64 24 66 38 Q68 52 56 58 Q44 64 30 62 Q16 60 14 52Z" fill="#D4A050" opacity=".9"/>
      <path d="M16 50 Q14 36 26 27 Q38 18 51 22 Q63 26 64 39 Q65 50 55 56 Q44 62 31 60 Q18 58 16 50Z" fill="#E0B060" opacity=".7"/>
      <path d="M20 48 Q19 37 29 30 Q39 23 51 27 Q61 31 61 42 Q61 50 53 54 Q44 58 33 57 Q22 56 20 48Z" fill="#ECC070" opacity=".5"/>
      <path d="M22 44 Q28 38 38 36 Q48 34 56 40" stroke="#C89040" strokeWidth="1.2" fill="none" opacity=".5"/>
      <path d="M24 50 Q30 45 40 43 Q50 41 57 46" stroke="#C89040" strokeWidth="1" fill="none" opacity=".4"/>
      <ellipse cx="36" cy="32" rx="4" ry="3" fill="#F0C878" opacity=".6" transform="rotate(-20 36 32)"/>
    </svg>
  );

  if (name === "Cheese Croissant") return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="68" rx="24" ry="5" fill={dark} opacity=".1"/>
      <path d="M14 52 Q12 36 24 26 Q36 16 50 20 Q64 24 66 38 Q68 52 56 58 Q44 64 30 62 Q16 60 14 52Z" fill="#D4A050" opacity=".9"/>
      <path d="M16 50 Q14 36 26 27 Q38 18 51 22 Q63 26 64 39 Q65 50 55 56 Q44 62 31 60 Q18 58 16 50Z" fill="#E0B060" opacity=".7"/>
      <path d="M28 56 Q32 62 38 64 Q44 66 50 62 Q46 60 40 60 Q34 60 28 56Z" fill="#F0D060" opacity=".8"/>
      <path d="M30 54 Q36 58 42 58 Q48 56 52 52" stroke="#E8C840" strokeWidth="2" fill="none" opacity=".6"/>
      <ellipse cx="40" cy="58" rx="8" ry="3" fill="#F5E070" opacity=".5"/>
    </svg>
  );

  if (name === "Zaatar Croissant") return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="68" rx="24" ry="5" fill={dark} opacity=".1"/>
      <path d="M14 52 Q12 36 24 26 Q36 16 50 20 Q64 24 66 38 Q68 52 56 58 Q44 64 30 62 Q16 60 14 52Z" fill="#C49040" opacity=".9"/>
      <path d="M16 50 Q14 36 26 27 Q38 18 51 22 Q63 26 64 39 Q65 50 55 56 Q44 62 31 60 Q18 58 16 50Z" fill="#D4A050" opacity=".6"/>
      <circle cx="30" cy="38" r="1.5" fill="#5A7A20" opacity=".65"/>
      <circle cx="36" cy="34" r="1.5" fill="#5A7A20" opacity=".6"/>
      <circle cx="42" cy="32" r="1.5" fill="#5A7A20" opacity=".55"/>
      <circle cx="48" cy="36" r="1.5" fill="#5A7A20" opacity=".6"/>
      <circle cx="34" cy="44" r="1.5" fill="#5A7A20" opacity=".55"/>
      <circle cx="40" cy="42" r="1.5" fill="#5A7A20" opacity=".5"/>
      <circle cx="46" cy="40" r="1.5" fill="#5A7A20" opacity=".55"/>
      <circle cx="52" cy="44" r="1.5" fill="#5A7A20" opacity=".5"/>
      <path d="M22 44 Q28 38 38 36 Q48 34 56 40" stroke="#A07828" strokeWidth="1" fill="none" opacity=".4"/>
    </svg>
  );

  if (name === "Almond Croissant") return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="68" rx="24" ry="5" fill={dark} opacity=".1"/>
      <path d="M14 52 Q12 36 24 26 Q36 16 50 20 Q64 24 66 38 Q68 52 56 58 Q44 64 30 62 Q16 60 14 52Z" fill="#C89040" opacity=".9"/>
      <path d="M16 50 Q14 36 26 27 Q38 18 51 22 Q63 26 64 39 Q65 50 55 56 Q44 62 31 60 Q18 58 16 50Z" fill="#D8A850" opacity=".65"/>
      <ellipse cx="28" cy="38" rx="4" ry="2" fill="#E8C870" opacity=".75" transform="rotate(-30 28 38)"/>
      <ellipse cx="36" cy="32" rx="4" ry="2" fill="#E8C870" opacity=".75" transform="rotate(-5 36 32)"/>
      <ellipse cx="44" cy="30" rx="4" ry="2" fill="#E8C870" opacity=".75" transform="rotate(20 44 30)"/>
      <ellipse cx="52" cy="36" rx="4" ry="2" fill="#E8C870" opacity=".75" transform="rotate(45 52 36)"/>
      <ellipse cx="32" cy="46" rx="4" ry="2" fill="#E8C870" opacity=".7" transform="rotate(-20 32 46)"/>
      <ellipse cx="40" cy="44" rx="4" ry="2" fill="#E8C870" opacity=".7" transform="rotate(10 40 44)"/>
      <ellipse cx="48" cy="42" rx="4" ry="2" fill="#E8C870" opacity=".7" transform="rotate(35 48 42)"/>
      <circle cx="26" cy="50" r="1" fill="white" opacity=".5"/>
      <circle cx="32" cy="48" r="1" fill="white" opacity=".5"/>
      <circle cx="38" cy="52" r="1" fill="white" opacity=".5"/>
      <circle cx="44" cy="50" r="1" fill="white" opacity=".5"/>
      <circle cx="50" cy="48" r="1" fill="white" opacity=".5"/>
    </svg>
  );

  if (name === "Chocolate Croissant") return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="68" rx="24" ry="5" fill={dark} opacity=".1"/>
      <path d="M14 52 Q12 36 24 26 Q36 16 50 20 Q64 24 66 38 Q68 52 56 58 Q44 64 30 62 Q16 60 14 52Z" fill="#8B5020" opacity=".9"/>
      <path d="M16 50 Q14 36 26 27 Q38 18 51 22 Q63 26 64 39 Q65 50 55 56 Q44 62 31 60 Q18 58 16 50Z" fill="#A06030" opacity=".65"/>
      <path d="M24 42 Q32 38 40 40 Q48 42 54 38" stroke="#3D1A08" strokeWidth="2.5" fill="none" opacity=".7" strokeLinecap="round"/>
      <path d="M26 48 Q34 45 42 47 Q50 49 56 45" stroke="#3D1A08" strokeWidth="2" fill="none" opacity=".55" strokeLinecap="round"/>
      <circle cx="38" cy="54" r="4" fill="#2C1008" opacity=".6"/>
      <circle cx="44" cy="52" r="3" fill="#2C1008" opacity=".5"/>
    </svg>
  );

  if (name === "Classic Scones") return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="66" rx="20" ry="5" fill={dark} opacity=".1"/>
      <circle cx="40" cy="46" r="18" fill="#D4A870" opacity=".85"/>
      <circle cx="40" cy="44" r="16" fill="#E0B880" opacity=".7"/>
      <circle cx="40" cy="43" r="14" fill="#ECC888" opacity=".6"/>
      <path d="M28 38 Q32 32 38 30 Q44 28 50 32 Q54 36 52 40" stroke="#C49860" strokeWidth="1.5" fill="none" opacity=".5"/>
      <path d="M30 42 Q36 36 42 34 Q48 32 52 38" stroke="#C49860" strokeWidth="1" fill="none" opacity=".4"/>
      <circle cx="34" cy="36" r="3" fill="#D4A860" opacity=".5"/>
      <circle cx="46" cy="34" r="2.5" fill="#D4A860" opacity=".45"/>
    </svg>
  );

  if (name === "Classic Scones Box") return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="68" rx="26" ry="5" fill={dark} opacity=".1"/>
      <rect x="12" y="38" width="56" height="26" rx="3" fill="#E8D8C0" opacity=".85"/>
      <rect x="14" y="40" width="52" height="22" rx="2" fill="#F0E4CC" opacity=".6"/>
      <path d="M12 38 Q12 22 28 24 L52 24 Q68 22 68 38" fill="#C8B898" opacity=".7" stroke="#A89878" strokeWidth="0.8"/>
      <circle cx="28" cy="48" r="9" fill="#D4A870" opacity=".9"/>
      <circle cx="40" cy="46" r="9" fill="#DEB878" opacity=".85"/>
      <circle cx="52" cy="48" r="9" fill="#D4A870" opacity=".9"/>
      <rect x="20" y="52" width="40" height="8" rx="1" fill="rgba(255,255,255,.3)"/>
      <text x="40" y="58" textAnchor="middle" fontSize="4.5" fill={mocha} fontFamily="Georgia,serif" fontStyle="italic" opacity=".7">infuse</text>
    </svg>
  );

  if (name === "Apple Cinnamon Pecan Scones") return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="66" rx="20" ry="5" fill={dark} opacity=".1"/>
      <circle cx="40" cy="46" r="18" fill="#C8904A" opacity=".85"/>
      <circle cx="40" cy="44" r="16" fill="#D8A05A" opacity=".7"/>
      <path d="M32 46 Q36 38 40 36 Q44 34 46 38 Q48 42 44 46 Q40 50 36 48" stroke="#7A3A10" strokeWidth="1.5" fill="none" opacity=".6"/>
      <rect x="34" y="42" width="5" height="4" rx="1" fill="#A0D870" opacity=".6"/>
      <rect x="42" y="44" width="4" height="3" rx="1" fill="#A0D870" opacity=".55"/>
      <ellipse cx="36" cy="50" rx="3" ry="2" fill="#8B5020" opacity=".7" transform="rotate(20 36 50)"/>
      <ellipse cx="44" cy="48" rx="3" ry="2" fill="#8B5020" opacity=".65" transform="rotate(-15 44 48)"/>
    </svg>
  );

  if (name === "Apple Cinnamon Pecan Scones Box") return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="68" rx="26" ry="5" fill={dark} opacity=".1"/>
      <rect x="12" y="38" width="56" height="26" rx="3" fill="#E8D4B8" opacity=".85"/>
      <rect x="14" y="40" width="52" height="22" rx="2" fill="#F0DCC4" opacity=".6"/>
      <path d="M12 38 Q12 22 28 24 L52 24 Q68 22 68 38" fill="#C0A880" opacity=".7" stroke="#A08860" strokeWidth="0.8"/>
      <circle cx="28" cy="48" r="9" fill="#C8904A" opacity=".9"/>
      <circle cx="40" cy="46" r="9" fill="#D4A058" opacity=".85"/>
      <circle cx="52" cy="48" r="9" fill="#C8904A" opacity=".9"/>
      <rect x="20" y="52" width="40" height="8" rx="1" fill="rgba(255,255,255,.3)"/>
      <text x="40" y="58" textAnchor="middle" fontSize="4.5" fill={mocha} fontFamily="Georgia,serif" fontStyle="italic" opacity=".7">infuse</text>
    </svg>
  );

  if (name === "Spicy Tuna Sandwich") return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="68" rx="28" ry="5" fill={dark} opacity=".1"/>
      <path d="M14 62 L40 22 L66 62 Z" fill="#C49A50" opacity=".6"/>
      <path d="M16 64 L36 28 L56 64 Z" fill="#D4AA60" opacity=".85"/>
      <line x1="22" y1="56" x2="50" y2="56" stroke="#A07830" strokeWidth="1.5" opacity=".5"/>
      <line x1="24" y1="52" x2="48" y2="52" stroke="#A07830" strokeWidth="1.5" opacity=".45"/>
      <line x1="26" y1="48" x2="46" y2="48" stroke="#A07830" strokeWidth="1.2" opacity=".4"/>
      <path d="M26 64 Q36 60 46 64" fill="#E87050" opacity=".7"/>
      <path d="M28 62 Q36 59 44 62" fill="#F08060" opacity=".5"/>
      <circle cx="34" cy="61" r="1.5" fill="#D02020" opacity=".6"/>
      <circle cx="40" cy="60" r="1.5" fill="#D02020" opacity=".5"/>
      <circle cx="46" cy="61" r="1.2" fill="#D02020" opacity=".55"/>
    </svg>
  );

  if (name === "Infuse Sandwich") return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="68" rx="28" ry="5" fill={dark} opacity=".1"/>
      <path d="M14 62 L40 22 L66 62 Z" fill="#C49A50" opacity=".6"/>
      <path d="M16 64 L36 28 L56 64 Z" fill="#D4AA60" opacity=".85"/>
      <line x1="22" y1="56" x2="50" y2="56" stroke="#A07830" strokeWidth="1.5" opacity=".5"/>
      <line x1="24" y1="52" x2="48" y2="52" stroke="#A07830" strokeWidth="1.2" opacity=".4"/>
      <path d="M26 64 Q32 59 38 60 Q44 61 46 64" fill="#7AAA40" opacity=".8"/>
      <path d="M27 63 Q33 61 39 62 Q43 63 45 63" fill="#E8A078" opacity=".6"/>
      <circle cx="36" cy="61" r="2.5" fill="#E04030" opacity=".7"/>
      <circle cx="42" cy="62" r="2" fill="#E04030" opacity=".6"/>
    </svg>
  );

  if (name === "Grilled Halloumi Sandwich") return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="68" rx="28" ry="5" fill={dark} opacity=".1"/>
      <path d="M14 62 L40 22 L66 62 Z" fill="#C49A50" opacity=".6"/>
      <path d="M16 64 L36 28 L56 64 Z" fill="#D4AA60" opacity=".85"/>
      <line x1="22" y1="56" x2="50" y2="56" stroke="#A07830" strokeWidth="1.5" opacity=".5"/>
      <line x1="24" y1="52" x2="48" y2="52" stroke="#A07830" strokeWidth="1.2" opacity=".4"/>
      <rect x="26" y="59" width="20" height="5" rx="1" fill="#F0E0A0" opacity=".85"/>
      <line x1="30" y1="59" x2="30" y2="64" stroke="#C09840" strokeWidth="1" opacity=".5"/>
      <line x1="34" y1="59" x2="34" y2="64" stroke="#C09840" strokeWidth="1" opacity=".5"/>
      <line x1="38" y1="59" x2="38" y2="64" stroke="#C09840" strokeWidth="1" opacity=".5"/>
      <path d="M27 64 Q33 60 38 61" fill="#7AAA40" opacity=".7"/>
    </svg>
  );

  if (name === "Granola Yogurt") return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="68" rx="18" ry="4" fill={dark} opacity=".12"/>
      <path d="M22 28 Q22 22 26 22 L54 22 Q58 22 58 28 L54 66 Q54 68 50 68 L30 68 Q26 68 26 66 Z" fill="#D4C4A8" opacity=".4"/>
      <path d="M24 28 L56 28 L52 66 L28 66 Z" fill="#EDE5D4" opacity=".5"/>
      <path d="M28 52 L30 66 L50 66 L52 52 Z" fill="#FAF7F2" opacity=".85"/>
      <path d="M24 28 L56 28 L54 48 L26 48 Z" fill="#C89850" opacity=".7"/>
      <ellipse cx="30" cy="36" rx="3" ry="2" fill="#A07030" opacity=".6" transform="rotate(0 30 36)"/>
      <ellipse cx="36" cy="32" rx="3" ry="2" fill="#A07030" opacity=".6" transform="rotate(30 36 32)"/>
      <ellipse cx="42" cy="30" rx="3" ry="2" fill="#A07030" opacity=".6" transform="rotate(60 42 30)"/>
      <ellipse cx="48" cy="34" rx="3" ry="2" fill="#A07030" opacity=".6" transform="rotate(90 48 34)"/>
      <ellipse cx="33" cy="42" rx="3" ry="2" fill="#A07030" opacity=".6" transform="rotate(120 33 42)"/>
      <ellipse cx="39" cy="40" rx="3" ry="2" fill="#A07030" opacity=".6" transform="rotate(150 39 40)"/>
      <ellipse cx="45" cy="38" rx="3" ry="2" fill="#A07030" opacity=".6" transform="rotate(180 45 38)"/>
      <rect x="22" y="44" width="36" height="10" rx="1" fill="#6ABBD8" opacity=".3"/>
      <text x="40" y="51" textAnchor="middle" fontSize="4.5" fill="rgba(255,255,255,.8)" fontFamily="Georgia,serif" fontStyle="italic">Infuse</text>
      <ellipse cx="40" cy="24" rx="18" ry="5" fill="#FAF7F2" opacity=".9"/>
      <ellipse cx="40" cy="23" rx="14" ry="3.5" fill="white" opacity=".7"/>
    </svg>
  );

  if (name === "Chia Oats Pudding") return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="68" rx="18" ry="4" fill={dark} opacity=".12"/>
      <path d="M22 28 Q22 22 26 22 L54 22 Q58 22 58 28 L54 66 Q54 68 50 68 L30 68 Q26 68 26 66 Z" fill="#D4C4A8" opacity=".4"/>
      <path d="M24 28 L56 28 L52 66 L28 66 Z" fill="#EDE5D4" opacity=".45"/>
      <path d="M28 54 L30 66 L50 66 L52 54 Z" fill="#D4B880" opacity=".7"/>
      <ellipse cx="31" cy="60" rx="1.2" ry="0.8" fill="#3D2416" opacity=".5"/>
      <ellipse cx="34" cy="62" rx="1.2" ry="0.8" fill="#3D2416" opacity=".5"/>
      <ellipse cx="37" cy="61" rx="1.2" ry="0.8" fill="#3D2416" opacity=".5"/>
      <ellipse cx="40" cy="63" rx="1.2" ry="0.8" fill="#3D2416" opacity=".5"/>
      <ellipse cx="43" cy="61" rx="1.2" ry="0.8" fill="#3D2416" opacity=".5"/>
      <ellipse cx="46" cy="62" rx="1.2" ry="0.8" fill="#3D2416" opacity=".5"/>
      <path d="M26 42 L54 42 L52 54 L28 54 Z" fill="#5C2A10" opacity=".75"/>
      <ellipse cx="38" cy="36" rx="10" ry="7" fill="#F0D840" opacity=".85"/>
      <ellipse cx="38" cy="35" rx="7" ry="5" fill="#F8E860" opacity=".7"/>
      <rect x="22" y="42" width="36" height="10" rx="1" fill="#6ABBD8" opacity=".3"/>
      <text x="40" y="49" textAnchor="middle" fontSize="4.5" fill="rgba(255,255,255,.8)" fontFamily="Georgia,serif" fontStyle="italic">Infuse</text>
      <ellipse cx="40" cy="24" rx="18" ry="5" fill="#FAF7F2" opacity=".9"/>
      <ellipse cx="40" cy="23" rx="14" ry="3.5" fill="white" opacity=".7"/>
    </svg>
  );

  if (name === "Water") return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="70" rx="18" ry="4" fill="#1A0F07" opacity=".08"/>
      <rect x="20" y="18" width="40" height="48" rx="3" fill="#5AB8E8" opacity=".85"/>
      <rect x="22" y="20" width="36" height="44" rx="2" fill="#70C8F0" opacity=".5"/>
      <rect x="22" y="28" width="36" height="24" rx="2" fill="rgba(255,255,255,.15)"/>
      <text x="40" y="39" textAnchor="middle" fontSize="7" fill="white" fontFamily="sans-serif" fontWeight="bold" fontStyle="italic" opacity=".9">{"it's"}</text>
      <text x="40" y="48" textAnchor="middle" fontSize="6" fill="white" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1" opacity=".85">WATER</text>
      <rect x="32" y="12" width="16" height="8" rx="3" fill="#FAF7F2" opacity=".9"/>
      <rect x="34" y="10" width="12" height="4" rx="2" fill="#E8E0D0" opacity=".7"/>
      <rect x="24" y="22" width="6" height="28" rx="3" fill="rgba(255,255,255,.2)"/>
    </svg>
  );
}

/* ─── Food Card (vertical, matches DessertCard style) ─── */
function FoodCard({ item, index, categoryColor = "#5C3D2E", lang = "en" }) {
  const [hov, setHov] = useState(false);
  const bgs = [
    "linear-gradient(145deg,#2C1A0A 0%,#3E2A14 100%)",
    "linear-gradient(145deg,#1A1E0A 0%,#2A2C14 100%)",
    "linear-gradient(145deg,#1C1408 0%,#2E2010 100%)",
    "linear-gradient(145deg,#0E1A10 0%,#182818 100%)",
    "linear-gradient(145deg,#1A1210 0%,#2C1E14 100%)",
    "linear-gradient(145deg,#101820 0%,#182430 100%)",
    "linear-gradient(145deg,#1A1808 0%,#2A2810 100%)",
    "linear-gradient(145deg,#200E0A 0%,#301810 100%)",
  ];
  const bg = bgs[index % bgs.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: bg, position: "relative", overflow: "hidden",
        transition: "transform .4s cubic-bezier(.4,0,.2,1), box-shadow .4s",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hov ? "0 24px 64px rgba(28,14,6,.28)" : "0 4px 16px rgba(28,14,6,.08)",
        display: "flex", flexDirection: "column", cursor: "default",
      }}
    >
      {/* Illustration area */}
      <div style={{
        height: 160, position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: hov
            ? `radial-gradient(ellipse at 50% 65%, ${categoryColor}28 0%, transparent 65%)`
            : `radial-gradient(ellipse at 50% 65%, ${categoryColor}12 0%, transparent 65%)`,
          transition: "opacity .5s",
        }}/>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 29px,rgba(255,255,255,.01) 30px),repeating-linear-gradient(90deg,transparent,transparent 29px,rgba(255,255,255,.01) 30px)",
        }}/>
        <motion.div
          animate={{ y: hov ? -7 : 0, scale: hov ? 1.1 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <FoodIllustration name={item.name} size={110} />
        </motion.div>
        {/* Index */}
        <div style={{
          position: "absolute", top: 12, right: 14,
          fontSize: "0.52rem", letterSpacing: "0.14em",
          color: "rgba(212,196,168,.18)",
          fontFamily: "'Cormorant Garamond', serif",
        }}>0{index + 1}</div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(212,196,168,.07)" }}/>

      {/* Info */}
      <div style={{ padding: "18px 18px 20px", position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 2,
          background: categoryColor,
          transform: hov ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "bottom",
          transition: "transform .4s cubic-bezier(.4,0,.2,1)",
        }}/>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 5 }}>
          <h3 style={{
            fontSize: "0.88rem", fontWeight: 400, lineHeight: 1.25,
            color: hov ? "var(--warm-white)" : "rgba(245,240,232,.82)",
            transition: "color .4s", flex: 1,
          }}>{tName(item.name, lang)}</h3>
          <div className="font-display" style={{
            fontSize: "1.05rem", fontWeight: 300, flexShrink: 0,
            color: hov ? "var(--warm-white)" : "rgba(212,196,168,.88)",
            transition: "color .4s",
          }}>{item.price}</div>
        </div>
        {item.note && (
          <p style={{
            fontSize: "0.67rem", fontWeight: 300, lineHeight: 1.5, marginBottom: 4,
            color: "rgba(212,196,168,.38)",
          }}>{item.note}</p>
        )}
        {item.kcal && (
          <div style={{ fontSize: "0.58rem", color: "rgba(212,196,168,.22)" }}>{item.kcal}</div>
        )}
      </div>
    </motion.div>
  );
}

/* --- Menu Row --- */
function MenuRow({ item, last }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        padding: "15px 10px",
        borderBottom: last ? "none" : "1px solid rgba(212,196,168,.2)",
        gap: 16,
        background: hov ? "rgba(139,111,92,.04)" : "transparent",
        transition: "background .2s",
        marginLeft: -10, marginRight: -10,
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{
            fontSize: "0.88rem", fontWeight: 400,
            color: hov ? "var(--espresso)" : "#4a3828",
            transition: "color .2s",
          }}>{item.name}</span>
          {item.tag && (
            <span style={{
              fontSize: "0.5rem", letterSpacing: "0.14em", textTransform: "uppercase",
              color: "var(--mocha)", border: "1px solid var(--sand)", padding: "2px 7px",
            }}>{item.tag}</span>
          )}
        </div>
        {item.note && <div style={{ fontSize: "0.7rem", color: "#a09080", fontWeight: 300, marginTop: 3, lineHeight: 1.5 }}>{item.note}</div>}
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div className="font-display" style={{
          fontSize: "0.98rem", fontWeight: 300,
          color: hov ? "var(--espresso)" : "var(--mocha)",
          transition: "color .2s",
        }}>{item.price}</div>
        {item.kcal && <div style={{ fontSize: "0.58rem", color: "#b8a890", marginTop: 2 }}>{item.kcal}</div>}
      </div>
    </div>
  );
}

/* ─── Menu Category Panel (for non-coffee tabs) ─── */
function MenuCategory({ title, items, accent = "var(--mocha)", delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div style={{
        background: "var(--warm-white)",
        border: "1px solid rgba(212,196,168,.28)",
        padding: "28px 24px",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          paddingBottom: 14, marginBottom: 4,
          borderBottom: "1px solid rgba(212,196,168,.28)",
        }}>
          <div style={{ width: 3, height: 16, background: accent, flexShrink: 0 }}/>
          <h3 style={{
            fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--espresso)", fontWeight: 500,
          }}>{title}</h3>
        </div>
        {items.map((item, i) => (
          <MenuRow key={item.name} item={item} last={i === items.length - 1}/>
        ))}
      </div>
    </Reveal>
  );
}

/* ─── Shared dessert color constant ─── */
const DESSERT_GOLD = "#C8A050";

/* ─── Dessert Illustrations ─── */
function DessertIllustration({ name, size = 80 }) {
  const cream = "#FAF7F2";
  const sand  = "#D4C4A8";
  const mocha = "#8B6F5C";
  const dark  = "#3D2416";
  const gold  = DESSERT_GOLD;

  const illustrations = {
    "Cookie MAMA": (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        {/* Tub body */}
        <ellipse cx="40" cy="62" rx="26" ry="8" fill={dark} opacity=".12"/>
        <rect x="14" y="28" width="52" height="36" rx="6" fill="#FAF0F8" opacity=".9"/>
        <rect x="16" y="30" width="48" height="32" rx="5" fill="#FDF4FC" opacity=".7"/>
        {/* Pink lid */}
        <ellipse cx="40" cy="28" rx="26" ry="8" fill="#F0A0C0" opacity=".9"/>
        <ellipse cx="40" cy="27" rx="20" ry="5.5" fill="#F8C0D8" opacity=".8"/>
        {/* Illustrated character on side — minimal */}
        <rect x="22" y="36" width="16" height="16" rx="3" fill="#F0A0C0" opacity=".3"/>
        <circle cx="30" cy="42" r="4" fill="#D070A0" opacity=".4"/>
        <rect x="44" y="36" width="16" height="16" rx="3" fill="#A0C0F0" opacity=".25"/>
        {/* Mini cookies peeking out top */}
        <circle cx="33" cy="24" r="4" fill={gold} opacity=".7"/>
        <circle cx="40" cy="22" r="3.5" fill="#C89040" opacity=".65"/>
        <circle cx="47" cy="24" r="4" fill={gold} opacity=".6"/>
        {/* Chocolate chips */}
        <circle cx="32" cy="23" r="1" fill={dark} opacity=".5"/>
        <circle cx="39" cy="21" r="1" fill={dark} opacity=".45"/>
        <circle cx="47" cy="23" r="1" fill={dark} opacity=".4"/>
        {/* Infuse label */}
        <text x="40" y="50" textAnchor="middle" fontSize="5" fill={mocha}
          fontFamily="Georgia, serif" letterSpacing="0.5" fontStyle="italic" opacity=".6">infuse</text>
      </svg>
    ),
    "Mango Coconut": (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="68" rx="24" ry="5" fill={dark} opacity=".1"/>
        {/* Box open */}
        <rect x="12" y="38" width="56" height="26" rx="3" fill="#E8F4F8" opacity=".85"/>
        <rect x="14" y="40" width="52" height="22" rx="2" fill="#F0F8FC" opacity=".7"/>
        {/* Box lid open */}
        <path d="M12 38 Q12 20 32 22 L48 22 Q68 20 68 38" fill="#B8DCF0" opacity=".6" stroke="#8ABCD0" strokeWidth="0.8"/>
        {/* Bar inside */}
        <rect x="18" y="42" width="44" height="16" rx="2" fill={cream} opacity=".9"/>
        {/* Coconut shreds on top */}
        <path d="M22 42 Q28 40 34 42" stroke="rgba(255,255,255,.8)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M30 41 Q36 39 42 41" stroke="rgba(255,255,255,.7)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M38 42 Q44 40 50 42" stroke="rgba(255,255,255,.65)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M46 41 Q52 39 58 41" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Cream layer */}
        <rect x="18" y="50" width="44" height="6" rx="1" fill="#FFF8E0" opacity=".7"/>
        {/* Biscuit base */}
        <rect x="18" y="54" width="44" height="4" rx="1" fill={sand} opacity=".6"/>
        {/* Infuse box label */}
        <text x="40" y="32" textAnchor="middle" fontSize="5" fill="#5A9AB8"
          fontFamily="Georgia, serif" letterSpacing="0.5" fontStyle="italic">Infuse</text>
      </svg>
    ),
    "Original Tart": (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="66" rx="22" ry="5" fill={dark} opacity=".1"/>
        {/* Tart shell */}
        <ellipse cx="40" cy="54" rx="28" ry="8" fill={gold} opacity=".7"/>
        <ellipse cx="40" cy="52" rx="26" ry="7" fill="#D4A840" opacity=".6"/>
        {/* Cream filling */}
        <ellipse cx="40" cy="50" rx="22" ry="10" fill="#FFFBF0" opacity=".92"/>
        <ellipse cx="40" cy="48" rx="20" ry="8" fill={cream} opacity=".85"/>
        {/* Blueberries on top */}
        <circle cx="36" cy="44" r="5" fill="#4A3080" opacity=".8"/>
        <circle cx="36" cy="44" r="3.5" fill="#5A40A0" opacity=".7"/>
        <circle cx="44" cy="43" r="5" fill="#3A2070" opacity=".8"/>
        <circle cx="44" cy="43" r="3.5" fill="#4A30A0" opacity=".7"/>
        <circle cx="40" cy="46" r="4.5" fill="#4A3080" opacity=".75"/>
        {/* Berry highlights */}
        <circle cx="35" cy="42.5" r="1" fill="rgba(255,255,255,.4)"/>
        <circle cx="43" cy="41.5" r="1" fill="rgba(255,255,255,.35)"/>
        {/* Tart edge ridges */}
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={i}
            x1={40 + 26*Math.cos(i*Math.PI/4)} y1={54 + 8*Math.sin(i*Math.PI/4)}
            x2={40 + 28*Math.cos(i*Math.PI/4)} y2={54 + 8*Math.sin(i*Math.PI/4)+1}
            stroke={gold} strokeWidth="1" opacity=".4"
          />
        ))}
      </svg>
    ),
    "Pecan Tart": (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="66" rx="22" ry="5" fill={dark} opacity=".1"/>
        <ellipse cx="40" cy="54" rx="28" ry="8" fill={gold} opacity=".7"/>
        <ellipse cx="40" cy="52" rx="26" ry="7" fill="#D4A840" opacity=".6"/>
        <ellipse cx="40" cy="50" rx="22" ry="10" fill="#FFFBF0" opacity=".92"/>
        <ellipse cx="40" cy="48" rx="20" ry="8" fill={cream} opacity=".85"/>
        {/* Pecan nut */}
        <ellipse cx="40" cy="44" rx="8" ry="6" fill="#8B5A20" opacity=".85"/>
        <ellipse cx="40" cy="44" rx="6" ry="4.5" fill="#A06828" opacity=".7"/>
        {/* Pecan texture lines */}
        <path d="M34 44 Q40 40 46 44" stroke="#6A4010" strokeWidth="1" fill="none" opacity=".5"/>
        <path d="M35 46 Q40 42 45 46" stroke="#6A4010" strokeWidth="0.8" fill="none" opacity=".4"/>
        <line x1="40" y1="38" x2="40" y2="50" stroke="#6A4010" strokeWidth="0.8" opacity=".3"/>
        {/* Pecan highlight */}
        <ellipse cx="37" cy="42" rx="2" ry="1.5" fill="rgba(255,200,100,.3)"/>
      </svg>
    ),
    "Lemon Tart": (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="66" rx="22" ry="5" fill={dark} opacity=".1"/>
        <ellipse cx="40" cy="54" rx="28" ry="8" fill={gold} opacity=".7"/>
        <ellipse cx="40" cy="52" rx="26" ry="7" fill="#D4A840" opacity=".6"/>
        <ellipse cx="40" cy="50" rx="22" ry="10" fill="#FFFBF0" opacity=".95"/>
        <ellipse cx="40" cy="48" rx="20" ry="8" fill="#FFF8C0" opacity=".85"/>
        {/* Lemon slice */}
        <ellipse cx="40" cy="44" rx="9" ry="9" fill="#F8E040" opacity=".85"/>
        <ellipse cx="40" cy="44" rx="7" ry="7" fill="#FAEC60" opacity=".75"/>
        {/* Lemon segments */}
        <line x1="40" y1="35" x2="40" y2="53" stroke="#D4B010" strokeWidth="0.7" opacity=".5"/>
        <line x1="31.4" y1="38.6" x2="48.6" y2="49.4" stroke="#D4B010" strokeWidth="0.7" opacity=".45"/>
        <line x1="31.4" y1="49.4" x2="48.6" y2="38.6" stroke="#D4B010" strokeWidth="0.7" opacity=".45"/>
        <ellipse cx="40" cy="44" rx="3" ry="3" fill="#FAEC60" opacity=".5"/>
        {/* Lemon rind edge */}
        <ellipse cx="40" cy="44" rx="9" ry="9" fill="none" stroke="#D4B010" strokeWidth="1.2" opacity=".4"/>
      </svg>
    ),
    "INFUSE Tiramisu": (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="68" rx="28" ry="5" fill={dark} opacity=".1"/>
        {/* Square tiramisu slice */}
        {/* Bottom ladyfinger layer */}
        <rect x="12" y="54" width="56" height="10" rx="2" fill="#C8A060" opacity=".8"/>
        <rect x="14" y="56" width="52" height="6" rx="1" fill="#D4B070" opacity=".6"/>
        {/* Mascarpone layer */}
        <rect x="12" y="42" width="56" height="14" rx="1" fill={cream} opacity=".92"/>
        <rect x="14" y="44" width="52" height="10" rx="1" fill="#FFFBF5" opacity=".7"/>
        {/* Top ladyfinger layer */}
        <rect x="12" y="32" width="56" height="12" rx="2" fill="#B89050" opacity=".75"/>
        {/* Cocoa powder dusting on top */}
        <rect x="12" y="30" width="56" height="5" rx="2" fill="#6A3A18" opacity=".55"/>
        <rect x="14" y="31" width="52" height="3" rx="1" fill="#7A4A22" opacity=".4"/>
        {/* Fine cocoa texture dots */}
        {[18,24,30,36,42,48,54,60].map(x => (
          <circle key={x} cx={x} cy={32} r="0.8" fill={dark} opacity=".3"/>
        ))}
        {[21,27,33,39,45,51,57].map(x => (
          <circle key={x} cx={x} cy={33.5} r="0.7" fill={dark} opacity=".25"/>
        ))}
        {/* INFUSE chocolate badge */}
        <circle cx="40" cy="31" r="4" fill={dark} opacity=".7"/>
        <text x="40" y="33" textAnchor="middle" fontSize="3.5" fill={cream}
          fontFamily="Georgia, serif" letterSpacing="0.3">i</text>
        {/* Layer lines on sides */}
        <line x1="12" y1="42" x2="68" y2="42" stroke={sand} strokeWidth="0.5" opacity=".4"/>
        <line x1="12" y1="54" x2="68" y2="54" stroke={sand} strokeWidth="0.5" opacity=".4"/>
      </svg>
    ),
    "Infuse Bytes": (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <ellipse cx="40" cy="70" rx="30" ry="5" fill={dark} opacity=".08"/>
        {/* 3 chocolate truffles */}
        {/* Left — white chocolate */}
        <ellipse cx="22" cy="54" rx="12" ry="10" fill="#F5EDDA" opacity=".9"/>
        <ellipse cx="22" cy="52" rx="10" ry="8" fill="#FAF3E8" opacity=".85"/>
        <ellipse cx="19" cy="49" rx="3" ry="2" fill="rgba(255,255,255,.5)"/>
        {/* Shadow under left */}
        <ellipse cx="22" cy="63" rx="10" ry="3" fill={dark} opacity=".08"/>
        {/* Middle — milk chocolate */}
        <ellipse cx="40" cy="52" rx="12" ry="10" fill="#8B5020" opacity=".85"/>
        <ellipse cx="40" cy="50" rx="10" ry="8" fill="#A06030" opacity=".75"/>
        <ellipse cx="37" cy="47" rx="3" ry="2" fill="rgba(255,200,100,.3)"/>
        <ellipse cx="40" cy="61" rx="10" ry="3" fill={dark} opacity=".08"/>
        {/* Right — white chocolate */}
        <ellipse cx="58" cy="54" rx="12" ry="10" fill="#F0E8D0" opacity=".88"/>
        <ellipse cx="58" cy="52" rx="10" ry="8" fill="#F8F0DE" opacity=".82"/>
        <ellipse cx="55" cy="49" rx="3" ry="2" fill="rgba(255,255,255,.45)"/>
        <ellipse cx="58" cy="63" rx="10" ry="3" fill={dark} opacity=".08"/>
        {/* Subtle chocolate drizzle lines */}
        <path d="M36 48 Q40 44 44 48" stroke={dark} strokeWidth="0.8" fill="none" opacity=".3"/>
      </svg>
    ),
  };
  return illustrations[name] || (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="55" rx="24" ry="8" fill={DESSERT_GOLD} opacity=".6"/>
      <ellipse cx="40" cy="52" rx="22" ry="10" fill={cream} opacity=".85"/>
    </svg>
  );
}

/* ─── Dessert Card ─── */
function DessertCard({ item, index, lang = "en" }) {
  const [hov, setHov] = useState(false);

  // Each dessert gets a unique warm background tone
  const bgs = [
    "linear-gradient(145deg,#2A1A10 0%,#3D2818 100%)", // Cookie MAMA — warm brown
    "linear-gradient(145deg,#1A2818 0%,#2A3820 100%)", // Mango Coconut — deep green
    "linear-gradient(145deg,#2A2010 0%,#3A2E18 100%)", // Original Tart — gold brown
    "linear-gradient(145deg,#1E1A10 0%,#302A18 100%)", // Pecan Tart — dark tan
    "linear-gradient(145deg,#281E08 0%,#3A2C10 100%)", // Lemon Tart — warm amber
    "linear-gradient(145deg,#1A1210 0%,#2C1E14 100%)", // Tiramisu — espresso
    "linear-gradient(145deg,#201418 0%,#301820 100%)", // Infuse Bytes — dark cocoa
  ];
  const bg = bgs[index % bgs.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: bg,
        cursor: "default", position: "relative", overflow: "hidden",
        transition: "transform .4s cubic-bezier(.4,0,.2,1), box-shadow .4s",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hov
          ? "0 28px 72px rgba(28,14,6,.3)"
          : "0 4px 20px rgba(28,14,6,.1)",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* ── Illustration area (top ~60%) ── */}
      <div style={{
        height: 200, position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        {/* Warm radial glow behind illustration */}
        <div style={{
          position: "absolute", inset: 0,
          background: hov
            ? "radial-gradient(ellipse at 50% 60%, rgba(200,160,80,.22) 0%, transparent 65%)"
            : "radial-gradient(ellipse at 50% 60%, rgba(200,160,80,.1) 0%, transparent 65%)",
          transition: "opacity .5s",
        }}/>
        {/* Subtle grid texture */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 29px,rgba(255,255,255,.012) 30px),repeating-linear-gradient(90deg,transparent,transparent 29px,rgba(255,255,255,.012) 30px)",
        }}/>
        {/* Illustration — large */}
        <motion.div
          animate={{ y: hov ? -8 : 0, scale: hov ? 1.1 : 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <DessertIllustration name={item.name} size={120} />
        </motion.div>

        {/* Tag badge top-left */}
        {item.tag && (
          <div style={{
            position: "absolute", top: 14, left: 14,
            fontSize: "0.5rem", letterSpacing: "0.16em", textTransform: "uppercase",
            color: "rgba(212,196,168,.65)",
            border: "1px solid rgba(212,196,168,.2)",
            padding: "3px 9px", background: "rgba(0,0,0,.2)",
          }}>{item.tag}</div>
        )}

        {/* Index number top-right */}
        <div style={{
          position: "absolute", top: 14, right: 14,
          fontSize: "0.55rem", letterSpacing: "0.15em",
          color: "rgba(212,196,168,.2)",
          fontFamily: "'Cormorant Garamond', serif",
        }}>0{index + 1}</div>
      </div>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: "rgba(212,196,168,.08)" }}/>

      {/* ── Info area (bottom) ── */}
      <div style={{ padding: "20px 22px 22px", position: "relative" }}>
        {/* Hover accent line on left */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 2,
          background: DESSERT_GOLD,
          transform: hov ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "bottom",
          transition: "transform .45s cubic-bezier(.4,0,.2,1)",
        }}/>

        {/* Name + price row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
          <h3 style={{
            fontSize: "1rem", fontWeight: 400,
            color: hov ? "var(--warm-white)" : "rgba(245,240,232,.85)",
            letterSpacing: "0.01em", lineHeight: 1.2,
            transition: "color .4s", flex: 1,
          }}>{tName(item.name, lang)}</h3>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div className="font-display" style={{
              fontSize: "1.2rem", fontWeight: 300,
              color: hov ? "var(--warm-white)" : "rgba(212,196,168,.9)",
              transition: "color .4s", lineHeight: 1,
            }}>{item.price}</div>
          </div>
        </div>

        {/* Note / description */}
        {item.note && (
          <p style={{
            fontSize: "0.72rem", fontWeight: 300, lineHeight: 1.55,
            color: "rgba(212,196,168,.4)",
            transition: "color .4s",
            marginBottom: 6,
          }}>{item.note}</p>
        )}

        {/* Kcal */}
        {item.kcal && (
          <div style={{
            fontSize: "0.6rem", letterSpacing: "0.05em",
            color: hov ? "rgba(212,196,168,.35)" : "rgba(212,196,168,.25)",
            transition: "color .4s",
          }}>{item.kcal}</div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Allergen Row ─── */
function AllergenRow({ allergen }) {
  const [hov, setHov] = useState(false);
  const iconMap = {
    "Nuts":         { bg: "#3D2416", emoji: "🥜" },
    "Dairy":        { bg: "#2C3A28", emoji: "🥛" },
    "Eggs":         { bg: "#3A3020", emoji: "🥚" },
    "Wheat/Gluten": { bg: "#2A2C1A", emoji: "🌾" },
  };
  const style = iconMap[allergen.name] || { bg: "#2C1A0E", emoji: "⚠️" };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "var(--warm-white)" : "transparent",
        border: `1px solid ${hov ? "rgba(212,196,168,.3)" : "rgba(212,196,168,.15)"}`,
        padding: "22px 24px",
        display: "flex", alignItems: "center", gap: 20,
        transition: "background .3s, border-color .3s, transform .3s",
        transform: hov ? "translateX(4px)" : "translateX(0)",
        cursor: "default",
      }}
    >
      {/* Icon circle */}
      <div style={{
        width: 48, height: 48, flexShrink: 0, borderRadius: "50%",
        background: hov ? style.bg : "var(--beige)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.2rem",
        transition: "background .3s",
        boxShadow: hov ? `0 8px 24px ${style.bg}60` : "none",
      }}>
        {allergen.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: "0.92rem", fontWeight: 500,
          color: hov ? "var(--espresso)" : "#4a3828",
          marginBottom: 4, transition: "color .3s",
        }}>{allergen.name}</div>
        <div style={{
          fontSize: "0.76rem", color: "#9a8878",
          fontWeight: 300, lineHeight: 1.55,
        }}>{allergen.desc}</div>
      </div>

      {/* Right line accent */}
      <div style={{
        width: 24, height: 1,
        background: "var(--sand)",
        opacity: hov ? 1 : 0,
        transition: "opacity .3s",
      }}/>
    </div>
  );
}

/* ─── Retail Card (Coffee Beans) ─── */
function RetailCard({ item, lang = "en" }) {
  const [hov, setHov] = useState(false);
  const isYemeni = item.name.includes("Yemeni");
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "var(--espresso)" : "var(--warm-white)",
        border: `1px solid ${hov ? "transparent" : "rgba(212,196,168,.28)"}`,
        padding: "28px 24px",
        display: "flex", alignItems: "center", gap: 18,
        transition: "background .4s cubic-bezier(.4,0,.2,1), box-shadow .4s, transform .35s",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hov ? "0 20px 56px rgba(28,14,6,.18)" : "0 2px 12px rgba(28,14,6,.04)",
        position: "relative", overflow: "hidden", cursor: "default",
      }}
    >
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 100,
        background: hov
          ? "radial-gradient(ellipse at 50% 60%, rgba(139,111,92,.18) 0%, transparent 70%)"
          : "radial-gradient(ellipse at 50% 60%, rgba(139,111,92,.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }}/>
      <motion.div
        animate={{ y: hov ? -4 : 0, scale: hov ? 1.05 : 1 }}
        transition={{ duration: 0.45, ease: [0.22,1,0.36,1] }}
        style={{ flexShrink: 0, width: 64, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}
      >
        <svg width="60" height="72" viewBox="0 0 60 72" fill="none">
          <ellipse cx="30" cy="68" rx="18" ry="4" fill="#1A0F07" opacity=".1"/>
          <rect x="8" y="18" width="44" height="48" rx="4" fill={isYemeni ? "#D4C4A8" : "#C8B898"} opacity=".35"/>
          <rect x="10" y="20" width="40" height="44" rx="3" fill={isYemeni ? "#EDE5D4" : "#E0D4BC"} opacity=".25"/>
          {[[18,44],[26,40],[34,44],[22,50],[30,48],[38,52],[16,56],[24,54],[32,58],[40,56],[20,62],[28,60],[36,62]].map(([x,y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="3.5" ry="2.5"
              fill={isYemeni ? "#5C3820" : "#4A2E14"}
              opacity={0.55 + (i % 3) * 0.1}
              transform={`rotate(${(i * 37) % 60 - 30} ${x} ${y})`}
            />
          ))}
          <rect x="10" y="24" width="40" height="16" rx="2" fill={hov ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.35)"}/>
          <text x="30" y="31" textAnchor="middle" fontSize="4.5"
            fill={hov ? "rgba(212,196,168,.7)" : "#3D2416"}
            fontFamily="Georgia, serif" letterSpacing="0.3" fontWeight="bold">
            {isYemeni ? "YEMENI" : "ETHIOPIAN"}
          </text>
          <text x="30" y="37" textAnchor="middle" fontSize="3.5"
            fill={hov ? "rgba(212,196,168,.5)" : "#5C3D2E"}
            fontFamily="Georgia, serif" letterSpacing="0.5" fontStyle="italic">infuse</text>
          <rect x="8" y="14" width="44" height="8" rx="2" fill={isYemeni ? "#8B6F5C" : "#6A5040"} opacity=".7"/>
          <rect x="12" y="15" width="36" height="5" rx="1" fill={isYemeni ? "#A08060" : "#806050"} opacity=".5"/>
        </svg>
      </motion.div>
      <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "0.5rem", letterSpacing: "0.16em", textTransform: "uppercase", color: hov ? "rgba(212,196,168,.45)" : "var(--mocha)", marginBottom: 5, transition: "color .4s" }}>
              Infuse Retails
            </div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 500, color: hov ? "var(--warm-white)" : "var(--espresso)", letterSpacing: "0.01em", marginBottom: 6, transition: "color .4s" }}>
              {tName(item.name, lang)}
            </h3>
            <p style={{ fontSize: "0.73rem", fontWeight: 300, lineHeight: 1.55, color: hov ? "rgba(212,196,168,.5)" : "#9a8878", transition: "color .4s" }}>
              {item.note}
            </p>
          </div>
          <div className="font-display" style={{ fontSize: "1.15rem", fontWeight: 300, color: hov ? "var(--warm-white)" : "var(--espresso)", transition: "color .4s", flexShrink: 0 }}>
            {item.price}
          </div>
        </div>
      </div>
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 2,
        background: "var(--mocha)",
        transform: hov ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: "bottom",
        transition: "transform .4s cubic-bezier(.4,0,.2,1)",
      }}/>
    </div>
  );
}

function TabBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none", border: "none", cursor: "pointer",
        padding: "11px 22px",
        fontSize: "0.67rem", letterSpacing: "0.14em", textTransform: "uppercase",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: active ? 500 : 400,
        color: active ? "var(--espresso)" : "#9a8878",
        borderBottom: active ? "2px solid var(--espresso)" : "2px solid transparent",
        marginBottom: -1,
        transition: "color .25s, border-color .25s",
        whiteSpace: "nowrap",
      }}
    >{label}</button>
  );
}

// MENU_TABS defined dynamically per language in Menu component

function Menu({ lang = "en", t = T.en }) {
  const MENU_TABS = t.menu.tabs;
  const menuData = getMenuData(lang);
  const [activeTab, setActiveTab] = useState(MENU_TABS[0]);

  return (
    <section id="menu" style={{ background: "var(--cream)", padding: "clamp(64px,10vw,120px) clamp(20px,6vw,80px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <Reveal>
          <div className="menu-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p className="section-label" style={{ marginBottom: 14 }}>Our Menu</p>
              <h2 className="font-display" style={{
                fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 300,
                color: "var(--espresso)", lineHeight: 1.1,
              }}>
                Every Item,<br /><em>Made with Intention</em>
              </h2>
            </div>
            <p style={{ fontSize: "0.8rem", color: "#8a7060", fontWeight: 300, maxWidth: 200, textAlign: "right", lineHeight: 1.75 }}>
              Seasonal ingredients.<br />Crafted in-house. Priced fairly.
            </p>
          </div>
        </Reveal>

        {/* Signatures — always visible */}
        <Reveal delay={0.04}>
          <p style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--mocha)", marginBottom: 16 }}>
            Signatures
          </p>
        </Reveal>
        <div className="sig-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 60 }}>
          {menuData.signatures.map((s, i) => <SignatureCard key={s.name} item={s} index={i} lang={lang} />)}
        </div>

        {/* Tabs */}
        <Reveal delay={0.08}>
          <div className="tab-scroll" style={{
            display: "flex", borderBottom: "1px solid rgba(212,196,168,.32)",
            marginBottom: 40, overflowX: "auto",
          }}>
            {MENU_TABS.map(t => (
              <TabBtn key={t} label={t} active={activeTab === t} onClick={() => setActiveTab(t)} />
            ))}
          </div>
        </Reveal>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── COFFEE TAB ── */}
            {activeTab === MENU_TABS[0] && (
              <div className="menu-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {menuData.classicCoffee.map((item, i) => (
                  <CoffeeCard key={item.name} item={item} index={i} lang={lang} />
                ))}
              </div>
            )}

            {/* ── ICED TAB ── */}
            {activeTab === MENU_TABS[1] && (
              <div className="menu-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {menuData.classicIced.map((item, i) => (
                  <CoffeeCard key={item.name} item={item} index={i} lang={lang} />
                ))}
              </div>
            )}

            {/* ── INFUSIONS TAB ── */}
            {activeTab === MENU_TABS[2] && (
              <div className="menu-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {menuData.infusion.map((item, i) => (
                  <CoffeeCard key={item.name} item={item} index={i} lang={lang} />
                ))}
              </div>
            )}

            {/* ── FOOD TAB ── */}
            {/* ── BAKERY TAB ── */}
            {activeTab === MENU_TABS[3] && (
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

                {/* Croissants */}
                <div>
                  <Reveal>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{ width: 3, height: 16, background: "#8B6F5C" }}/>
                      <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--espresso)", fontWeight: 500 }}>Croissants</p>
                    </div>
                  </Reveal>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", gap: 8 }}>
                    {menuData.croissants.map((item, i) => <FoodCard key={item.name} item={item} index={i} lang={lang} categoryColor="#8B6F5C"/>)}
                  </div>
                </div>

                {/* Bakery */}
                <div>
                  <Reveal>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{ width: 3, height: 16, background: "#A08050" }}/>
                      <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--espresso)", fontWeight: 500 }}>Scones & Bakery</p>
                    </div>
                  </Reveal>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", gap: 8 }}>
                    {menuData.bakery.map((item, i) => <FoodCard key={item.name} item={item} index={i} lang={lang} categoryColor="#A08050"/>)}
                  </div>
                </div>

              </div>
            )}

            {/* ── SANDWICHES TAB ── */}
            {activeTab === MENU_TABS[4] && (
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

                {/* Sandwiches */}
                <div>
                  <Reveal>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{ width: 3, height: 16, background: "#5C3D2E" }}/>
                      <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--espresso)", fontWeight: 500 }}>Sandwiches</p>
                    </div>
                  </Reveal>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", gap: 8 }}>
                    {menuData.sandwiches.map((item, i) => <FoodCard key={item.name} item={item} index={i} lang={lang} categoryColor="#5C3D2E"/>)}
                  </div>
                </div>

                {/* Our Cups */}
                <div>
                  <Reveal>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{ width: 3, height: 16, background: "#4A6A3A" }}/>
                      <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--espresso)", fontWeight: 500 }}>Our Cups</p>
                    </div>
                  </Reveal>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", gap: 8 }}>
                    {menuData.cups.map((item, i) => <FoodCard key={item.name} item={item} index={i} lang={lang} categoryColor="#4A6A3A"/>)}
                  </div>
                </div>

                {/* Water */}
                <div>
                  <Reveal>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{ width: 3, height: 16, background: "#4A90B8" }}/>
                      <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--espresso)", fontWeight: 500 }}>Water</p>
                    </div>
                  </Reveal>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", gap: 8 }}>
                    <FoodCard item={{ name: "Water", price: "﷼ 4", kcal: "1 kcal", note: null }} index={0} categoryColor="#4A90B8" lang={lang}/>
                  </div>
                </div>

              </div>
            )}

            {/* ── DESSERTS TAB ── */}
            {activeTab === MENU_TABS[5] && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
                {menuData.desserts.map((item, i) => (
                  <DessertCard key={item.name} item={item} index={i} lang={lang} />
                ))}
              </div>
            )}

            {/* ── RETAIL TAB ── */}
            {activeTab === MENU_TABS[6] && (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <Reveal>
                  <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mocha)", marginBottom: 12 }}>
                    Infuse Retails — Coffee Beans
                  </p>
                </Reveal>
                <div className="retail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {menuData.retail.map((item, i) => (
                    <Reveal key={item.name} delay={i * 0.08}>
                      <RetailCard item={item} lang={lang} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* ── ALLERGENS TAB ── */}
            {activeTab === MENU_TABS[7] && (
              <div style={{ maxWidth: 720 }}>
                <Reveal>
                  <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mocha)", marginBottom: 32 }}>
                    Allergen Information
                  </p>
                </Reveal>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {menuData.allergens.map((a, i) => (
                    <Reveal key={a.name} delay={i * 0.07}>
                      <AllergenRow allergen={a} />
                    </Reveal>
                  ))}
                </div>
                <Reveal delay={0.35}>
                  <p style={{
                    fontSize: "0.72rem", color: "#9a8878", fontWeight: 300,
                    lineHeight: 1.75, marginTop: 40,
                    paddingTop: 28, borderTop: "1px solid rgba(212,196,168,.28)",
                  }}>
                    If you have a food allergy or intolerance, please inform our team before ordering. We take allergen safety seriously and will do our best to accommodate your needs.
                  </p>
                </Reveal>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <Reveal delay={0.12}>
          <div style={{
            marginTop: 56, paddingTop: 28,
            borderTop: "1px solid rgba(212,196,168,.28)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 14,
          }}>
            <p style={{ fontSize: "0.7rem", color: "#9a8878", fontWeight: 300, lineHeight: 1.7 }}>
              All prices include VAT · Calorie counts are approximate · Menu may vary by branch
            </p>
            <button onClick={() => scrollTo("locations")} style={{
              background: "none", border: "none", cursor: "pointer", padding: 0,
              fontSize: "0.63rem", letterSpacing: "0.12em", textTransform: "uppercase",
              color: "var(--mocha)", borderBottom: "1px solid var(--sand)", paddingBottom: 2,
              fontFamily: "'DM Sans', sans-serif",
            }}>{lang === "ar" ? "← ابحث عن فرع" : "Find a Branch →"}</button>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ─── BAKERY HIGHLIGHT STRIP ─── */
function Desserts({ lang = "en" }) {
  const menuData = getMenuData(lang);
  const highlights = [
    { num: "01", name: "Cookie MAMA",              detail: "﷼ 18 · 550 kcal",  sub: "Dessert · 22 mini cookies" },
    { num: "02", name: "Chocolate Croissant",      detail: "﷼ 14",              sub: "Croissant"                 },
    { num: "03", name: lang==="ar"?"صندوق سكونز كلاسيك":"Classic Scones Box", detail: "﷼ 20 · 1080 kcal", sub: lang==="ar"?"مخبوزات · ٦ قطع":"Bakery · 6 pcs"            },
    { num: "04", name: "INFUSE Tiramisu",          detail: "﷼ 18 · 336 kcal",  sub: "Dessert"                   },
    { num: "05", name: "Infuse Bytes",             detail: "﷼ 17",              sub: "Dessert · 3 chocolate bites" },
  ];

  const [active, setActive] = useState(null);

  return (
    <section style={{ background: "var(--beige)", padding: "clamp(56px,8vw,100px) clamp(20px,6vw,80px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div className="menu-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p className="section-label" style={{ marginBottom: 14 }}>{lang === "ar" ? "المخبوزات والحلويات" : "Bakery & Desserts"}</p>
              <h2 className="font-display" style={{
                fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 300,
                color: "var(--espresso)", lineHeight: 1.1,
              }}>
                {lang === "ar" ? "طازجة دائماً" : "Baked Fresh,"}<br /><em>{lang === "ar" ? "كل صباح" : "Every Morning"}</em>
              </h2>
            </div>
            <button onClick={() => scrollTo("menu")} style={{
              background: "none", border: "none", cursor: "pointer", padding: 0,
              fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase",
              color: "var(--mocha)", borderBottom: "1px solid var(--sand)", paddingBottom: 2,
              fontFamily: "'DM Sans', sans-serif",
            }}>{lang === "ar" ? "← القائمة الكاملة" : "Full Menu →"}</button>
          </div>
        </Reveal>

        <div className="bakery-strip" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 2 }}>
          {highlights.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.06}>
              <div
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  background: active === i ? "var(--espresso)" : "var(--cream)",
                  padding: "32px 24px 28px",
                  transition: "background .4s cubic-bezier(.4,0,.2,1)",
                  cursor: "default",
                  minHeight: 180,
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{
                    fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase",
                    color: active === i ? "rgba(212,196,168,.35)" : "var(--mocha)",
                    marginBottom: 16, transition: "color .4s",
                  }}>{item.num} / {item.sub}</div>
                  <h3 className="font-display" style={{
                    fontSize: "1.15rem", fontWeight: 300, lineHeight: 1.25,
                    color: active === i ? "var(--warm-white)" : "var(--espresso)",
                    marginBottom: 8, transition: "color .4s",
                  }}>{tName(item.name, lang)}</h3>
                </div>
                <div style={{
                  fontSize: "0.75rem",
                  color: active === i ? "rgba(212,196,168,.5)" : "#9a8878",
                  fontWeight: 300, transition: "color .4s",
                }}>{item.detail}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── GALLERY ─── */
function Gallery({ lang = "en" }) {
  const cells = [
    { label: lang === "ar" ? "القهوة تُصنع" : "The Pour", size: "large", bg: "linear-gradient(145deg,#1A0F07 0%,#3D2416 100%)", detail: "V60 brewing station — warm light, ritual process." },
    { label: lang === "ar" ? "ضوء الصباح" : "Morning Light", size: "small", bg: "linear-gradient(135deg,#2C1A0E 0%,#4A2E1E 100%)", detail: "Sunlight through linen curtains." },
    { label: lang === "ar" ? "الزاوية" : "The Corner", size: "small", bg: "linear-gradient(135deg,#1E1812 0%,#2E2418 100%)", detail: "Private reading nook." },
    { label: lang === "ar" ? "تفاصيل البار" : "Bar Detail", size: "medium", bg: "linear-gradient(160deg,#2A1A10 0%,#3A2818 100%)", detail: "Handmade concrete countertop." },
    { label: lang === "ar" ? "المنظر العلوي" : "Overhead", size: "medium", bg: "linear-gradient(135deg,#1A1410 0%,#2A2018 100%)", detail: "The terrace — our most loved spot." },
  ];

  return (
    <section id="gallery" style={{ background: "var(--cream)", padding: "clamp(64px,10vw,120px) clamp(20px,6vw,80px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div className="menu-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p className="section-label" style={{ marginBottom: 14 }}>{lang === "ar" ? "المساحة الداخلية" : "Interior"}</p>
              <h2 className="font-display" style={{
                fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 300,
                color: "var(--espresso)", lineHeight: 1.1,
              }}>
                {lang === "ar" ? "صُممت لتكون" : "Designed to"}<br /><em>{lang === "ar" ? "كأنك في بيتك" : "Feel Like Home"}</em>
              </h2>
            </div>
            <button onClick={() => scrollTo("locations")} style={{
              background: "none", border: "none", cursor: "pointer", padding: 0,
              fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase",
              color: "var(--mocha)", borderBottom: "1px solid var(--sand)", paddingBottom: 2,
              fontFamily: "'DM Sans', sans-serif",
            }}>{lang === "ar" ? "← ابحث عن فرع" : "Find a Branch →"}</button>
          </div>
        </Reveal>

        {/* Mosaic grid */}
        <div className="gallery-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "280px 280px",
          gap: 6,
        }}>
          {/* Large cell spans 2 rows */}
          <Reveal className="gallery-tall" style={{ gridRow: "1 / 3", gridColumn: "1" }}>
            <GalleryCell cell={cells[0]} style={{ gridRow: "1/3", height: "100%" }} tall />
          </Reveal>
          <Reveal delay={0.1}><GalleryCell cell={cells[1]} /></Reveal>
          <Reveal delay={0.15}><GalleryCell cell={cells[2]} /></Reveal>
          <Reveal delay={0.2}><GalleryCell cell={cells[3]} /></Reveal>
          <Reveal delay={0.25}><GalleryCell cell={cells[4]} /></Reveal>
        </div>
      </div>
    </section>
  );
}

function GalleryCell({ cell, tall, style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: cell.bg, borderRadius: 1, overflow: "hidden",
        position: "relative", cursor: "default",
        height: tall ? "100%" : "100%",
        ...style,
      }}
    >
      {/* Warm overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 40% 35%, rgba(139,111,92,.2) 0%, transparent 60%)",
        transition: "opacity .4s", opacity: hov ? 1 : 0.5,
      }} />

      {/* Grid texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 19px,rgba(255,255,255,.012) 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(255,255,255,.012) 20px)",
      }} />

      {/* Label */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "40px 24px 20px",
        background: "linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 100%)",
        transition: "opacity .4s", opacity: hov ? 1 : 0.6,
      }}>
        <div style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,196,168,.5)", marginBottom: 4 }}>{cell.label}</div>
        <AnimatePresence>
          {hov && (
            <motion.p
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: "0.78rem", color: "rgba(245,240,232,.7)", fontWeight: 300, lineHeight: 1.5 }}
            >{cell.detail}</motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Corner accent */}
      <div style={{
        position: "absolute", top: 16, right: 16,
        width: 20, height: 20,
        borderTop: "1px solid rgba(212,196,168,.2)",
        borderRight: "1px solid rgba(212,196,168,.2)",
      }} />
    </div>
  );
}

/* ─── REVIEWS ─── */
const reviews = [
  {
    name: "Mohammd Badran",
    role: "Local Guide · 101 reviews",
    text: "Really impressed with the quality of the place, they have a variety of options in the bakery section. I ordered apple cinnamon scones — it was amazing. Really calm outdoor seating and they have a rooftop seating with water sprays. Staff were very friendly and welcoming.",
    rating: 5,
    scores: { Food: 5, Service: 5, Atmosphere: 4 },
    recommended: "Pecan Scones",
    when: "A year ago",
  },
  {
    name: "Rana Alrayes",
    role: "Local Guide · 12 reviews",
    text: "My fav place for studying, lucky that it's near my uni. The matcha is so good! Also the coffee of the day. Thank you Infuse.",
    rating: 5,
    scores: { Food: 5, Service: 5, Atmosphere: 5 },
    recommended: null,
    when: "A year ago",
  },
  {
    name: "Waleed Alshehri",
    role: "Local Guide · 225 reviews",
    text: "Lovely cafe with a warm vibe and top-quality coffee. The pastries are delicious, the staff is welcoming, and it's a great spot to unwind or catch up with friends.",
    rating: 5,
    scores: { Food: 4, Service: 5, Atmosphere: 5 },
    recommended: null,
    when: "8 months ago",
  },
  {
    name: "Abdulaziz Alhassan",
    role: "Local Guide · 38 reviews · 61 photos",
    text: "I tried the Yemeni beans as an ice drip, and it was perfectly balanced with a rich, clean finish. The branding and overall vibe reflect the same level of care: simple, modern, and refined. A spot equally great for a quick morning coffee or a slow start to the day.",
    rating: 3,
    scores: null,
    recommended: null,
    when: "8 months ago",
  },
  {
    name: "The Art of Tau",
    role: "Local Guide · 181 reviews",
    text: "Beautiful coffee place. Serving good coffee and friendly customer service. Nice short menu and easy to decide what to select.",
    rating: 5,
    scores: { Food: 4, Service: 5, Atmosphere: 4 },
    recommended: "Spicy Tuna Sandwich, Chia Oats Pudding",
    when: "A year ago",
  },
  {
    name: "HA",
    role: "Local Guide · 21 reviews",
    text: "If you're a matcha lover, this place is a must-visit! They have the best matcha latte I've ever had. Highly recommend giving it a try!",
    rating: 5,
    scores: null,
    recommended: null,
    when: "3 years ago",
  },
];

function BranchPhotoGallery({ loc }) {
  const photos = BRANCH_PHOTOS[loc.name] || [];
  const [photoIdx, setPhotoIdx] = useState(0);
  const [imgError, setImgError] = useState(false);

  if (photos.length === 0 || imgError) return (
    <div style={{
      background: "linear-gradient(145deg,#2C1A0E,#3D2416)",
      height: 240, display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div className="font-display" style={{ fontSize:"0.58rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(212,196,168,.25)", marginBottom:10 }}>Photos Coming Soon</div>
        <div className="font-display" style={{ fontSize:"1.4rem", fontWeight:300, color:"rgba(212,196,168,.18)", letterSpacing:"0.15em" }}>{loc.name}</div>
      </div>
      <div style={{ position:"absolute", top:"20%", left:"30%", width:"40%", height:"60%", background:"radial-gradient(ellipse,rgba(139,111,92,.12) 0%,transparent 70%)" }}/>
    </div>
  );

  return (
    <div style={{ position:"relative" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={photoIdx}
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          transition={{ duration:0.4 }}
          style={{ height:260, overflow:"hidden", position:"relative" }}
        >
          <img
            src={photos[photoIdx].src}
            alt={loc.name + " " + photos[photoIdx].label}
            onError={() => setImgError(true)}
            style={{
              width:"100%", height:"100%",
              objectFit:"cover",
              objectPosition:"center center",
              display:"block",
            }}
          />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(26,10,4,.65) 0%,rgba(26,10,4,.1) 50%,transparent 75%)" }}/>
          <div style={{ position:"absolute", bottom:16, left:18 }}>
            <div style={{ fontSize:"0.52rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(212,196,168,.6)", marginBottom:4 }}>{photos[photoIdx].label}</div>
            <div className="font-display" style={{ fontSize:"1.2rem", fontWeight:300, color:"var(--warm-white)", letterSpacing:"0.1em" }}>{loc.name}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      {photos.length > 1 && (
        <div style={{ position:"absolute", top:12, right:12, display:"flex", gap:4 }}>
          {photos.map((p, pi) => (
            <button key={pi} onClick={() => { setPhotoIdx(pi); setImgError(false); }} style={{
              background: photoIdx===pi ? "var(--warm-white)" : "rgba(26,10,4,.55)",
              border: "1px solid " + (photoIdx===pi ? "transparent" : "rgba(212,196,168,.3)"),
              cursor:"pointer", padding:"5px 11px",
              fontSize:"0.52rem", letterSpacing:"0.12em", textTransform:"uppercase",
              color: photoIdx===pi ? "var(--espresso)" : "rgba(212,196,168,.85)",
              fontFamily:"'DM Sans',sans-serif", backdropFilter:"blur(8px)", transition:"all .25s",
            }}>{p.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}

/* Branded Map Pin */
function BrandedMapPin({ loc }) {
  const grids = {
    "Al Nakheel":  { r1:30, r2:55, c1:20, c2:50, c3:75 },
    "Al Hamra":    { r1:25, r2:60, c1:15, c2:45, c3:70 },
    "King Salman": { r1:35, r2:58, c1:25, c2:52, c3:78 },
    "Al Muroj":    { r1:28, r2:52, c1:18, c2:48, c3:72 },
  };
  const g = grids[loc.name] || grids["Al Nakheel"];
  return (
    <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", display:"block", marginBottom:10 }}>
      <motion.div whileHover={{ scale:1.01 }} transition={{ duration:0.3 }}
        style={{ height:200, position:"relative", overflow:"hidden", background:"#D4C4A0", cursor:"pointer" }}>
        <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" style={{ position:"absolute", inset:0 }}>
          <rect width="400" height="200" fill="#D4C4A0"/>
          <rect x="0"      y="0"        width={g.c1}           height={g.r1}           fill="#C8B48C" rx="1"/>
          <rect x={g.c1+8} y="0"       width={g.c2-g.c1-4}   height={g.r1}           fill="#BEA880" rx="1"/>
          <rect x={g.c2+8} y="0"       width="80"              height={g.r1}           fill="#C8B48C" rx="1"/>
          <rect x="180"    y="0"        width="100"             height={g.r1}           fill="#C4B088" rx="1"/>
          <rect x="300"    y="0"        width="100"             height={g.r1}           fill="#C0AC84" rx="1"/>
          <rect x="0"      y={g.r1+8} width={g.c1}           height={g.r2-g.r1-4}   fill="#CABC90" rx="1"/>
          <rect x={g.c1+8} y={g.r1+8} width={g.c2-g.c1-4} height="55"              fill="#C2B488" rx="1"/>
          <rect x={g.c2+8} y={g.r1+8} width="70"            height="55"              fill="#C8B890" rx="1"/>
          <rect x="185"    y={g.r1+8} width="110"             height="55"              fill="#BEB08A" rx="1"/>
          <rect x="0"      y={g.r2+8} width="90"              height="80"              fill="#C6B68E" rx="1"/>
          <rect x="98"     y={g.r2+8} width="85"              height="80"              fill="#C2B08A" rx="1"/>
          <rect x="191"    y={g.r2+8} width="100"             height="80"              fill="#C8B890" rx="1"/>
          <rect x="299"    y={g.r2+8} width="101"             height="80"              fill="#C0AC84" rx="1"/>
          <rect x="0"      y={g.r1}   width="400"             height="8"               fill="#E8DCC0"/>
          <rect x="0"      y={g.r2}   width="400"             height="8"               fill="#E8DCC0"/>
          <rect x={g.c1}   y="0"      width="8"               height="200"             fill="#E8DCC0"/>
          <rect x={g.c2}   y="0"      width="8"               height="200"             fill="#E8DCC0"/>
          <rect x={g.c3}   y="0"      width="6"               height="200"             fill="#E0D4B8"/>
          <rect width="400" height="200" fill="rgba(180,140,80,.07)"/>
          <radialGradient id={"vig_"+loc.name.replace(" ","")} cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="transparent"/>
            <stop offset="100%" stopColor="rgba(60,36,12,.22)"/>
          </radialGradient>
          <rect width="400" height="200" fill={"url(#vig_"+loc.name.replace(" ","")+")"}/>
        </svg>
        <div style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-100%)",
          display:"flex", flexDirection:"column", alignItems:"center",
          filter:"drop-shadow(0 8px 20px rgba(26,10,4,.4))" }}>
          <div style={{ width:76, height:76, borderRadius:"50%", background:"var(--espresso)",
            border:"3px solid var(--sand)", display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center", position:"relative" }}>
            <div style={{ position:"absolute", inset:5, borderRadius:"50%", border:"1px solid rgba(212,196,168,.2)" }}/>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"0.55rem",
              letterSpacing:"0.22em", color:"rgba(212,196,168,.55)", textTransform:"uppercase",
              fontWeight:300, lineHeight:1, marginBottom:3 }}>INFUSE</span>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"0.7rem",
              fontWeight:400, color:"var(--warm-white)", letterSpacing:"0.04em",
              lineHeight:1.1, textAlign:"center", maxWidth:60, padding:"0 4px" }}>{loc.name}</span>
          </div>
          <svg width="16" height="22" viewBox="0 0 16 22" fill="none" style={{ marginTop:-2 }}>
            <path d="M8 0 C8 0 0 8 0 14 Q0 22 8 22 Q16 22 16 14 C16 8 8 0 8 0Z" fill="var(--espresso)"/>
          </svg>
          <div style={{ width:18,height:5,borderRadius:"50%",background:"rgba(26,10,4,.25)",filter:"blur(3px)",marginTop:-3 }}/>
        </div>
        <div style={{ position:"absolute", bottom:8, right:10, background:"rgba(44,26,14,.65)",
          backdropFilter:"blur(8px)", padding:"4px 9px", display:"flex", alignItems:"center", gap:5 }}>
          <svg width="7" height="9" viewBox="0 0 10 14" fill="none">
            <path d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 5 3.5a1.5 1.5 0 0 1 0 3z" fill="rgba(212,196,168,.7)"/>
          </svg>
          <span style={{ fontSize:"0.5rem", letterSpacing:"0.12em", textTransform:"uppercase",
            color:"rgba(212,196,168,.7)", fontFamily:"'DM Sans',sans-serif" }}>Open in Maps</span>
        </div>
      </motion.div>
    </a>
  );
}

/* Locations Accordion */
function Locations({ lang = "en", t = T.en }) {
  const [active, setActive] = useState(null);
  const locs = lang === "ar" && t.locations ? locations.map((l,i) => ({...l, name: t.locations[i].name, address: t.locations[i].address, hours: t.locations[i].hours, tag: t.locations[i].tag})) : locations;
  return (
    <section id="locations" style={{ background:"var(--warm-white)", padding:"clamp(64px,10vw,120px) clamp(20px,6vw,80px)" }}>
      <div style={{ maxWidth:760, margin:"0 auto" }}>
        <Reveal>
          <div style={{ marginBottom:52 }}>
            <p className="section-label" style={{ marginBottom:14 }}>Find Us</p>
            <h2 className="font-display" style={{ fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:300, color:"var(--espresso)", lineHeight:1.1 }}>
              Four Branches<br/><em>Across Riyadh</em>
            </h2>
          </div>
        </Reveal>
        <div>
          {locs.map((loc,i) => {
            const isOpen = active === i;
            return (
              <Reveal key={loc.name} delay={i*0.06}>
                <div style={{ borderTop:"1px solid rgba(212,196,168,.32)" }}>
                  <button onClick={()=>setActive(isOpen?null:i)} style={{
                    width:"100%", background:"none", border:"none", cursor:"pointer",
                    padding:"22px 0", display:"flex", justifyContent:"space-between",
                    alignItems:"center", gap:16, textAlign:"left",
                  }}>
                    <div style={{ display:"flex", alignItems:"center", gap:14, flex:1, flexWrap:"wrap" }}>
                      <span style={{ fontSize:"0.56rem", letterSpacing:"0.12em",
                        color: isOpen?"var(--mocha)":"rgba(139,111,92,.3)",
                        minWidth:20, transition:"color .3s", fontFamily:"'DM Sans',sans-serif" }}>0{i+1}</span>
                      <span className="font-display" style={{ fontSize:"clamp(1.25rem,2.5vw,1.65rem)", fontWeight:300,
                        color: isOpen?"var(--espresso)":"#8a7060", transition:"color .3s" }}>{loc.name}</span>
                      <span style={{ fontSize:"0.48rem", letterSpacing:"0.14em", textTransform:"uppercase",
                        color: isOpen?"var(--mocha)":"rgba(139,111,92,.38)",
                        border: isOpen?"1px solid var(--sand)":"1px solid rgba(212,196,168,.2)",
                        padding:"2px 8px", transition:"all .3s", fontFamily:"'DM Sans',sans-serif" }}>{loc.tag}</span>
                      {!isOpen && <span style={{ fontSize:"0.72rem", color:"#b0a090", fontWeight:300, fontFamily:"'DM Sans',sans-serif" }}>{loc.address}</span>}
                    </div>
                    <motion.div animate={{ rotate:isOpen?45:0, backgroundColor:isOpen?"var(--espresso)":"rgba(212,196,168,.2)" }}
                      transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
                      style={{ width:30, height:30, borderRadius:"50%", flexShrink:0,
                        display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <line x1="6" y1="1" x2="6" y2="11" stroke={isOpen?"#FAF7F2":"#8B6F5C"} strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="1" y1="6" x2="11" y2="6" stroke={isOpen?"#FAF7F2":"#8B6F5C"} strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div key="panel"
                        initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
                        exit={{ height:0, opacity:0 }} transition={{ duration:0.42, ease:[0.22,1,0.36,1] }}
                        style={{ overflow:"hidden" }}>
                        <div style={{ paddingBottom:28 }}>
                          <BranchPhotoGallery loc={loc}/>
                          <div style={{ background:"var(--espresso)", padding:"16px 20px",
                            display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:10 }}>
                            <div>
                              <div style={{ fontSize:"0.5rem", letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(212,196,168,.32)", marginBottom:3 }}>Address</div>
                              <div style={{ fontSize:"0.8rem", color:"var(--warm-white)", fontWeight:300 }}>{loc.address}</div>
                            </div>
                            <div style={{ textAlign:"right" }}>
                              <div style={{ fontSize:"0.5rem", letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(212,196,168,.32)", marginBottom:3 }}>Hours</div>
                              <div style={{ fontSize:"0.8rem", color:"var(--warm-white)", fontWeight:300 }}>{loc.hours}</div>
                            </div>
                          </div>
                          <BrandedMapPin loc={loc}/>
                          <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", display:"block" }}>
                            <motion.div whileHover={{ backgroundColor:"var(--walnut)" }} transition={{ duration:0.22 }}
                              style={{ background:"var(--espresso)", padding:"13px 20px",
                                display:"flex", alignItems:"center", justifyContent:"center", gap:9, cursor:"pointer" }}>
                              <svg width="10" height="13" viewBox="0 0 10 14" fill="none">
                                <path d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 5 3.5a1.5 1.5 0 0 1 0 3z" fill="rgba(212,196,168,.68)"/>
                              </svg>
                              <span style={{ fontSize:"0.6rem", letterSpacing:"0.15em", textTransform:"uppercase",
                                color:"rgba(212,196,168,.72)", fontFamily:"'DM Sans',sans-serif" }}>{t.branches.getDir} {loc.name}</span>
                            </motion.div>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
          <div style={{ borderTop:"1px solid rgba(212,196,168,.32)" }}/>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer({ setPage = () => {}, lang = "en", t = T.en }) {
  return (
    <footer style={{ background: "var(--charcoal)", padding: "clamp(48px,7vw,80px) clamp(20px,6vw,80px) 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top grid */}
        <div className="footer-grid" style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48, marginBottom: 64,
        }}>
          {/* Brand */}
          <div>
            <div className="font-display" style={{
              fontSize: "1.8rem", letterSpacing: "0.25em", color: "var(--warm-white)",
              fontWeight: 300, marginBottom: 20,
            }}>INFUSE</div>
            <p style={{
              fontSize: "0.8rem", color: "rgba(212,196,168,.4)", fontWeight: 300,
              lineHeight: 1.8, maxWidth: 260,
            }}>
              {t.footer.desc}
            </p>
          </div>

          {/* Links */}
          {[
            { title: t.footer.visit, links: [
                { label: lang==="ar"?"النخيل":"Al Nakheel",  action: () => setPage("branches") },
                { label: lang==="ar"?"الحمراء":"Al Hamra",    action: () => setPage("branches") },
                { label: lang==="ar"?"الملك سلمان":"King Salman", action: () => setPage("branches") },
                { label: lang==="ar"?"المروج":"Al Muroj",    action: () => setPage("branches") },
              ]},
            { title: t.footer.explore, links: [
                { label: t.footer.menu, action: () => setPage("menu") },
                { label: t.footer.about, action: () => setPage("about") },
                { label: t.footer.branches, action: () => setPage("branches") },
              ]},
            { title: t.footer.connect, links: [
                { label: t.footer.instagram, action: () => window.open("https://instagram.com/infuse.ksa","_blank") },
                { label: t.footer.orderApp, action: () => window.open("https://infuse.tryorder.net/app","_blank") },
              ]},
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(212,196,168,.3)", marginBottom: 20 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => (
                  <button key={l.label}
                    onClick={l.action || undefined}
                    style={{
                      background: "none", border: "none", cursor: l.action ? "pointer" : "default",
                      padding: 0, textAlign: "left",
                      fontSize: "0.82rem", color: "rgba(212,196,168,.5)",
                      fontWeight: 300, transition: "color .2s",
                      fontFamily: "'DM Sans', sans-serif",
                      opacity: l.action ? 1 : 0.5,
                    }}
                    onMouseEnter={e => { if(l.action) e.target.style.color = "rgba(212,196,168,.9)"; }}
                    onMouseLeave={e => { e.target.style.color = "rgba(212,196,168,.5)"; }}
                  >{l.label}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,.06)", marginBottom: 32 }} />

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ fontSize: "0.65rem", color: "rgba(212,196,168,.25)", letterSpacing: "0.05em" }}>
            {t.footer.copy}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── TRANSLATIONS ─── */
const T = {
  en: {
    dir: "ltr",
    fontFamily: "'DM Sans', sans-serif",
    displayFont: "'Cormorant Garamond', serif",
    nav: { about: "About", menu: "Menu", branches: "Branches", order: "Order Now" },
    hero: {
      label: "Est. 2022 — Riyadh, Saudi Arabia",
      title1: "Infuse",
      title2: "Your Senses",
      sub: "Specialty coffee, thoughtful spaces, and a community worth being part of. Riyadh-born, craft-focused, people-first.",
      stat1l: "Est. in Riyadh", stat2l: "Branches", stat3l: "SCA Score", stat4l: "Bean Origins",
    },
    about: {
      label: "Our Story",
      title1: "Coffee as a",
      title2: "Craft, Not a Rush",
      p1: "INFUSE opened its doors in 2022 with one clear belief — that great coffee is worth slowing down for. What started as a single branch in Riyadh has grown into four locations across the city, each one a reflection of the same commitment to quality, design, and community.",
      p2: "We source specialty-grade beans from Yemen, Ethiopia, and Peru — origins chosen for their distinct character. Our V60, espresso-based drinks, and cold brews are crafted to let those flavors speak clearly, without noise.",
      p3: "Our spaces are built for the people of Riyadh — students, professionals, coffee lovers, and anyone who needs a calm corner to think, connect, or simply sit still. Warm light, clean architecture, and coffee that means it.",
      bean1: "Yemeni Beans", bean1sub: "Grape, Blueberry, Roselle",
      bean2: "Ethiopian Beans", bean2sub: "Red Berries, Peach, Floral",
      bean3: "Peruvian Beans", bean3sub: "Coffee of the Day rotation",
      badge: "Est. in Riyadh", tag: "Specialty Café",
      valuesLabel: "What Drives Us",
      valuesTitle1: "Four Principles,", valuesTitle2: "One Standard",
      v1t: "Rooted in Riyadh", v1p: "Born and built in Riyadh. Every branch, every cup, every detail is designed with the people of this city in mind.",
      v2t: "Specialty First", v2p: "We work exclusively with specialty-grade beans — Yemeni, Ethiopian, and Peruvian — each chosen for character, not convenience.",
      v3t: "A Space to Slow Down", v3p: "Whether you're studying, catching up with a friend, or just breathing — INFUSE is designed for people who want to be somewhere, not just pass through.",
      v4t: "Made with Care", v4p: "From the beans we select to the spaces we build — every decision at INFUSE is made with intention. Nothing here is accidental.",
    },
    menu: {
      label: "Our Menu", title1: "Every Item,", title2: "Made with Intention",
      sub: "Seasonal ingredients. Crafted in-house. Priced fairly.",
      sigLabel: "Signatures",
      tabs: ["Coffee", "Iced", "Infusions", "Bakery", "Sandwiches", "Desserts", "Retail", "Allergens"],
      footer: "All prices include VAT · Calorie counts are approximate · Menu may vary by branch",
      findBranch: "Find a Branch →",
      pageTitle1: "Every Item,", pageTitle2: "Made with Intention",
      cta: "Ready to visit?", ctaBtn: "Find a Branch →",
      hotIced: "Hot / Iced →", serves7: "Serves 7 · 1.3 Liter →",
      allergenInfo: "Allergen Information",
      allergenNote: "If you have a food allergy or intolerance, please inform our team before ordering.",
      infuseRetails: "Infuse Retails — Coffee Beans",
    },
    branches: {
      label: "Find Us", title1: "Four Branches", title2: "Across Riyadh",
      pageTitle1: "Four Branches", pageTitle2: "Across Riyadh",
      address: "Address", hours: "Hours",
      getDir: "Get Directions —",
      openMaps: "Open in Maps",
      photosComingSoon: "Photos Coming Soon",
      cta: "Can't make it in? Order online.", ctaBtn: "Order Now →",
      tags: { "Café & Drive-Through": "كافيه وسيارة", "Drive-Through": "سيارة فقط", "Café": "كافيه" },
    },
    reviews: {
      label: "Guest Reviews", title1: "What Our Guests", title2: "Are Saying",
      recommends: "Recommends:",
    },
    footer: {
      desc: "Specialty coffee, thoughtful spaces, and a community worth being part of. Riyadh-born, craft-focused.",
      visit: "Visit", explore: "Explore", connect: "Connect",
      menu: "Menu", about: "About Us", branches: "Branches",
      instagram: "Instagram", orderApp: "Order App",
      copy: "© 2026 INFUSE Coffee. All rights reserved. Riyadh, Saudi Arabia.",
    },
    cta: { ready: "Ready to order?", sub: "Browse the full menu or find your nearest branch.", viewMenu: "View Menu", findBranch: "Find a Branch" },
  },

  ar: {
    dir: "rtl",
    fontFamily: "'Noto Sans Arabic', 'Tajawal', sans-serif",
    displayFont: "'Noto Sans Arabic', 'Tajawal', sans-serif",
    nav: { about: "من نحن", menu: "القائمة", branches: "الفروع", order: "اطلب الآن" },
    hero: {
      label: "تأسست عام ٢٠٢٢ — الرياض، المملكة العربية السعودية",
      title1: "قهوة مختصة",
      title2: "في قلب الرياض",

      sub: "قهوة مختصة، مساحات مدروسة، ومجتمع يستحق أن تكون جزءاً منه. ولدنا في الرياض، ونعمل بشغف.",
      stat1l: "تأسست في الرياض", stat2l: "فروع", stat3l: "تقييم SCA", stat4l: "أصول القهوة",
    },
    about: {
      label: "قصتنا",
      title1: "القهوة فن",
      title2: "وليست عجلة",
      p1: "فتحت إنفيوز أبوابها عام ٢٠٢٢ بفكرة واضحة — أن القهوة الجيدة تستحق التمهّل. بدأنا بفرع واحد في الرياض ونمونا إلى أربعة فروع، كل منها يعكس نفس الالتزام بالجودة والتصميم والمجتمع.",
      p2: "نختار حبوبنا من اليمن وإثيوبيا والبيرو — أصول بشخصية مميزة. قهوة V60 ومشروباتنا المبنية على الإسبريسو والقهوة الباردة مصنوعة لتُبرز هذه النكهات بوضوح.",
      p3: "مساحاتنا مبنية لأهل الرياض — طلاب، محترفون، عشاق القهوة، وكل من يحتاج إلى ركن هادئ للتفكير أو اللقاء أو مجرد الجلوس. إضاءة دافئة، تصميم نظيف، وقهوة تتكلم عن نفسها.",
      bean1: "حبوب يمنية", bean1sub: "عنب، توت أزرق، كركديه",
      bean2: "حبوب إثيوبية", bean2sub: "توت أحمر، خوخ، زهري",
      bean3: "حبوب بيروفية", bean3sub: "قهوة اليوم المتغيرة",
      badge: "تأسست في الرياض", tag: "كافيه مختص",
      valuesLabel: "ما يحرّكنا",
      valuesTitle1: "أربعة مبادئ،", valuesTitle2: "معيار واحد",
      v1t: "جذورنا في الرياض", v1p: "وُلدنا وبُنينا في الرياض. كل فرع، كل كوب، كل تفصيلة صُممت مع أهل هذه المدينة في البال.",
      v2t: "الجودة أولاً", v2p: "نعمل حصرياً مع حبوب القهوة المختصة — يمنية وإثيوبية وبيروفية — كل منها مختارة لشخصيتها لا لراحتها.",
      v3t: "مساحة للتمهّل", v3p: "سواء كنت تذاكر، تلتقي صديقاً، أو تأخذ نفساً — إنفيوز مصممة لمن يريد أن يكون في مكان، لا أن يمر عليه.",
      v4t: "صُنع باهتمام", v4p: "من الحبوب التي نختارها إلى المساحات التي نبنيها — كل قرار في إنفيوز مدروس. لا شيء هنا عشوائي.",
    },
    menu: {
      label: "قائمتنا", title1: "كل عنصر،", title2: "مصنوع بعناية",
      sub: "مكونات موسمية. مُعدّة داخلياً. بأسعار عادلة.",
      sigLabel: "المشروبات المميزة",
      tabs: ["القهوة", "المثلجة", "المنقوعات", "المخبوزات", "السندويشات", "الحلويات", "متجر", "المواد المسببة للحساسية"],
      footer: "جميع الأسعار تشمل ضريبة القيمة المضافة · السعرات الحرارية تقريبية · قد تختلف القائمة حسب الفرع",
      findBranch: "← ابحث عن فرع",
      pageTitle1: "كل عنصر،", pageTitle2: "مصنوع بعناية",
      cta: "هل أنت مستعد للزيارة؟", ctaBtn: "← ابحث عن فرع",
      hotIced: "ساخن / مثلج ←", serves7: "يخدم ٧ أشخاص · ١.٣ لتر ←",
      allergenInfo: "معلومات المواد المسببة للحساسية",
      allergenNote: "إذا كان لديك حساسية غذائية، يرجى إخبار فريقنا قبل الطلب.",
      infuseRetails: "متجر إنفيوز — حبوب القهوة",
    },
    branches: {
      label: "أوجدنا", title1: "أربعة فروع", title2: "في الرياض",
      pageTitle1: "أربعة فروع", pageTitle2: "في الرياض",
      address: "العنوان", hours: "أوقات العمل",
      getDir: "← اتجاهات",
      openMaps: "افتح في الخرائط",
      photosComingSoon: "الصور قادمة قريباً",
      tags: { "Café & Drive-Through": "كافيه ودرايف ثرو", "Drive-Through": "درايف ثرو", "Café": "كافيه" },
      cta: "لا تستطيع الحضور؟ اطلب أونلاين.", ctaBtn: "← اطلب الآن",
    },
    reviews: {
      label: "آراء ضيوفنا", title1: "ماذا يقول", title2: "ضيوفنا",
      recommends: "يوصي بـ:",
    },
    footer: {
      desc: "قهوة مختصة، مساحات مدروسة، ومجتمع يستحق أن تكون جزءاً منه. ولدنا في الرياض، ونعمل بشغف.",
      visit: "زيارة", explore: "استكشف", connect: "تواصل",
      menu: "القائمة", about: "من نحن", branches: "الفروع",
      instagram: "إنستغرام", orderApp: "تطبيق الطلب",
      copy: "© ٢٠٢٦ إنفيوز للقهوة. جميع الحقوق محفوظة. الرياض، المملكة العربية السعودية.",
    },
    cta: { ready: "هل أنت مستعد للطلب؟", sub: "تصفح القائمة الكاملة أو ابحث عن أقرب فرع.", viewMenu: "عرض القائمة", findBranch: "ابحث عن فرع" },
    locations: [
      { name: "النخيل", address: "حي النخيل، الرياض", hours: "٧:٠٠ ص – ١٢:٠٠ م", tag: "كافيه ودرايف ثرو" },
      { name: "الحمراء", address: "حي الحمراء، الرياض", hours: "٧:٠٠ ص – ١٢:٠٠ م", tag: "كافيه" },
      { name: "الملك سلمان", address: "حي الملك سلمان، الرياض", hours: "٧:٠٠ ص – ١٢:٠٠ م", tag: "درايف ثرو" },
      { name: "المروج", address: "حي المروج، الرياض", hours: "٧:٠٠ ص – ١٢:٠٠ م", tag: "كافيه" },
    ],
    menuItems: {
      classicCoffee: "القهوة الكلاسيكية",
      classicIced: "القهوة الكلاسيكية المثلجة",
      signatures: "المشروبات المميزة",
      croissants: "الكرواسان",
      bakery: "المخبوزات",
      sandwiches: "السندويشات",
      cups: "أكوابنا",
      water: "ماء",
      dessert: "الحلويات",
      retail: "متجر إنفيوز",
      allergens: "مواد الحساسية",
      drinks: {
        "Espresso": "إسبريسو", "Americano": "أمريكانو", "Cortado": "كورتادو",
        "Latte": "لاتيه", "Flat White": "فلات وايت", "Cappuccino": "كابوتشينو",
        "Coffee of The Day": "قهوة اليوم", "V60": "V60",
        "Ice Latte": "لاتيه مثلج", "Ice Americano": "أمريكانو مثلج",
        "Ice Coffee of The Day": "قهوة اليوم المثلجة", "Ice V60": "V60 مثلج",
        "Infuse I": "إنفيوز I", "Infuse II": "إنفيوز II", "7 Cups": "٧ أكواب",
        "Spanish Latte": "لاتيه إسباني", "Coconut Latte": "لاتيه جوز الهند",
        "Watermelon Hibiscus Ice Tea": "شاي الكركديه والبطيخ المثلج",
        "INFUSE Matcha": "ماتشا إنفيوز", "Maramiya Yuzu": "مرامية يوزو",
        "Plain Croissant": "كرواسان سادة", "Cheese Croissant": "كرواسان جبن",
        "Zaatar Croissant": "كرواسان زعتر", "Almond Croissant": "كرواسان لوز",
        "Chocolate Croissant": "كرواسان شوكولاتة",
        "Classic Scones": "سكونز كلاسيك", "Classic Scones Box": "صندوق سكونز كلاسيك",
        "Apple Cinnamon Pecan Scones": "سكونز تفاح وقرفة وبيكان",
        "Apple Cinnamon Pecan Scones Box": "صندوق سكونز تفاح وقرفة وبيكان",
        "Spicy Tuna Sandwich": "سندويش تونة حارة",
        "Infuse Sandwich": "سندويش إنفيوز",
        "Grilled Halloumi Sandwich": "سندويش حلومي مشوي",
        "Granola Yogurt": "يوغرت غرانولا",
        "Chia Oats Pudding": "بودينغ الشيا والشوفان",
        "Water": "ماء",
        "Cookie MAMA": "كوكي ماما", "Mango Coconut": "مانغو جوز الهند",
        "Original Tart": "تارت أصلي", "Pecan Tart": "تارت بيكان",
        "Lemon Tart": "تارت ليمون", "INFUSE Tiramisu": "تيراميسو إنفيوز",
        "Infuse Bytes": "إنفيوز بايتس",
        "Yemeni Coffee Beans": "حبوب قهوة يمنية",
        "Ethiopian Coffee Beans": "حبوب قهوة إثيوبية",
      },
      allergens: {
        "Nuts": "المكسرات", "Dairy": "الألبان", "Eggs": "البيض", "Wheat/Gluten": "القمح/الغلوتين",
      },
    },
  },
};

/* ─── GOOGLE ARABIC FONT ─── */
const ArabicFontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap');
    [dir="rtl"] { font-family: 'Tajawal', sans-serif; }
    [dir="rtl"] .font-display { font-family: 'Tajawal', sans-serif; font-weight: 500; }
    [dir="rtl"] .section-label { letter-spacing: 0.05em; }
    [dir="rtl"] .nav-link { letter-spacing: 0.02em; }
  `}</style>
);

/* ─── PAGE NAV ─── */
function PageNav({ page, setPage, lang, setLang }) {
  const t = T[lang];
  const tabs = [
    { id: "about",    label: t.nav.about,    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>) },
    { id: "menu",     label: t.nav.menu,     icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>) },
    { id: "branches", label: t.nav.branches, icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg>) },
  ];

  return (
    <>
      {/* Desktop top nav — 3 page tabs */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(42,24,12,.94)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 max(20px,4vw)",
        height: 60,
      }}>
        {/* Logo */}
        <button onClick={() => { setPage("about"); scrollToTop(); }} style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
        }}>
          <span className="font-display" style={{
            fontSize: "1.35rem", letterSpacing: "0.25em",
            color: "var(--warm-white)", fontWeight: 300,
          }}>INFUSE</span>
        </button>

        {/* Tab buttons — desktop */}
        <div className="nav-desktop-links" style={{ display: "flex", gap: 4 }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => { setPage(t.id); scrollToTop(); }}
              style={{
                background: page === t.id ? "rgba(255,255,255,.1)" : "none",
                border: "none", cursor: "pointer",
                padding: "8px 20px",
                fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase",
                fontFamily: "'DM Sans', sans-serif",
                color: page === t.id ? "var(--warm-white)" : "rgba(212,196,168,.5)",
                fontWeight: page === t.id ? 500 : 400,
                transition: "all .25s",
                display: "flex", alignItems: "center", gap: 7,
              }}
            >
              <span style={{ opacity: page === t.id ? 1 : 0.6 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Order App CTA + Language toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Language toggle */}
          <button
            onClick={() => { setLang(lang === "en" ? "ar" : "en"); scrollToTop(); }}
            style={{
              background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(212,196,168,.2)",
              cursor: "pointer", padding: "7px 14px",
              fontSize: "0.65rem", letterSpacing: "0.1em",
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(212,196,168,.8)",
              transition: "all .25s",
              fontWeight: 500,
            }}
          >{lang === "en" ? "عربي" : "EN"}</button>

          <a href="https://infuse.tryorder.net/app" target="_blank" rel="noopener noreferrer"
            style={{ textDecoration: "none" }} className="nav-cta">
            <button className="btn-primary" style={{ padding: "9px 20px", fontFamily: t.fontFamily }}>
              {t.nav.order}
            </button>
          </a>
        </div>

        {/* Mobile hamburger placeholder */}
        <div style={{ width: 30 }} className="hamburger" />
      </div>

      {/* Mobile bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(26,14,6,.96)", backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,.06)",
        display: "flex",
        padding: "10px 0 max(10px, env(safe-area-inset-bottom))",
      }} className="mobile-bottom-nav">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => { setPage(t.id); scrollToTop(); }}
            style={{
              flex: 1, background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              padding: "4px 0",
              color: page === t.id ? "var(--warm-white)" : "rgba(212,196,168,.35)",
              transition: "color .25s",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <motion.div
              animate={{ scale: page === t.id ? 1.1 : 1, y: page === t.id ? -2 : 0 }}
              transition={{ duration: 0.25 }}
            >
              {t.icon}
            </motion.div>
            <span style={{
              fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase",
              fontWeight: page === t.id ? 500 : 400,
            }}>{t.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default function App() {
  const [page, setPage] = useState("about");
  const [lang, setLang] = useState("en");
  const t = T[lang];
  const isAr = lang === "ar";

  return (
    <div className="grain" dir={t.dir} style={{ fontFamily: t.fontFamily }}>
      <FontLink />
      <ArabicFontLink />
      <style>{`
        .mobile-bottom-nav { display: none; }
        @media (max-width: 640px) {
          .mobile-bottom-nav { display: flex !important; }
          .nav-desktop-links { display: none !important; }
          .nav-cta { display: none !important; }
        }
        .page-content {
          padding-top: 60px;
          padding-bottom: 80px;
          min-height: 100vh;
        }
        @media (min-width: 641px) {
          .page-content { padding-bottom: 0; }
        }
      `}</style>

      <PageNav page={page} setPage={setPage} lang={lang} setLang={setLang} />

      <AnimatePresence mode="wait">
        {/* ── PAGE 1: ABOUT ── */}
        {page === "about" && (
          <motion.div
            key={"about-" + lang}
            initial={{ opacity: 0, x: isAr ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isAr ? 20 : -20 }}
            transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
            className="page-content"
          >
            <Hero setPage={setPage} lang={lang} t={t} />
            <About lang={lang} t={t} />
            <Gallery lang={lang} />

            {/* CTA strip */}
            <div style={{
              background: "var(--espresso)",
              padding: "48px clamp(20px,6vw,80px)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: 20,
            }}>
              <div>
                <div className="font-display" style={{ fontSize: "1.6rem", fontWeight: 300, color: "var(--warm-white)", marginBottom: 6 }}>
                  {t.cta.ready}
                </div>
                <div style={{ fontSize: "0.8rem", color: "rgba(212,196,168,.5)", fontWeight: 300 }}>
                  {t.cta.sub}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => { setPage("menu"); scrollToTop(); }}>
                  {t.cta.viewMenu}
                </button>
                <button className="btn-outline" onClick={() => { setPage("branches"); scrollToTop(); }}
                  style={{ color: "rgba(212,196,168,.8)", borderColor: "rgba(212,196,168,.3)" }}>
                  {t.cta.findBranch}
                </button>
              </div>
            </div>

            <Footer setPage={setPage} lang={lang} t={t} />
          </motion.div>
        )}

        {/* ── PAGE 2: MENU ── */}
        {page === "menu" && (
          <motion.div
            key={"menu-" + lang}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
            className="page-content"
          >
            <div style={{ background: "var(--espresso)", padding: "48px clamp(20px,6vw,80px) 40px" }}>
              <p className="section-label" style={{ marginBottom: 12, color: "rgba(212,196,168,.45)" }}>{t.menu.label}</p>
              <h1 className="font-display" style={{ fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 300, color: "var(--warm-white)", lineHeight: 1.05 }}>
                {t.menu.pageTitle1}<br /><em>{t.menu.pageTitle2}</em>
              </h1>
            </div>
            <Menu lang={lang} t={t} />
            <Desserts lang={lang} />

            <div style={{
              background: "var(--beige)", padding: "40px clamp(20px,6vw,80px)",
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
            }}>
              <span style={{ fontSize: "0.9rem", color: "var(--espresso)", fontWeight: 300 }}>{t.menu.cta}</span>
              <button className="btn-primary" onClick={() => { setPage("branches"); scrollToTop(); }}>{t.menu.ctaBtn}</button>
            </div>

            <Footer setPage={setPage} lang={lang} t={t} />
          </motion.div>
        )}

        {/* ── PAGE 3: BRANCHES ── */}
        {page === "branches" && (
          <motion.div
            key={"branches-" + lang}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
            className="page-content"
          >
            <div style={{ background: "var(--espresso)", padding: "48px clamp(20px,6vw,80px) 40px" }}>
              <p className="section-label" style={{ marginBottom: 12, color: "rgba(212,196,168,.45)" }}>{t.branches.label}</p>
              <h1 className="font-display" style={{ fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 300, color: "var(--warm-white)", lineHeight: 1.05 }}>
                {t.branches.pageTitle1}<br /><em>{t.branches.pageTitle2}</em>
              </h1>
            </div>
            <Locations lang={lang} t={t} />

            <div style={{
              background: "var(--beige)", padding: "40px clamp(20px,6vw,80px)",
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
            }}>
              <span style={{ fontSize: "0.9rem", color: "var(--espresso)", fontWeight: 300 }}>{t.branches.cta}</span>
              <a href="https://infuse.tryorder.net/app" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-primary">{t.branches.ctaBtn}</button>
              </a>
            </div>

            <Footer setPage={setPage} lang={lang} t={t} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
