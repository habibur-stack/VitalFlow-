import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  Heart, Zap, Globe, TrendingUp, Star, Check, ChevronDown,
  Phone, Mail, MapPin, ArrowRight, Menu, X, Shield, Users, Award,
  Leaf, Activity, Sparkles, Target, BarChart3, BookOpen, Laptop,
  Play, ChevronLeft, ChevronRight, Clock, Brain, Sun, Coffee,
} from "lucide-react";

// ─── Utilities ────────────────────────────────────────────────────────────────

const cn = (...c: (string | false | undefined | null)[]) =>
  c.filter(Boolean).join(" ");

function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-60px",
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({
  end,
  suffix = "",
  prefix = "",
  duration = 2200,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true });
  useEffect(() => {
    if (!inView) return;
    let t0: number | null = null;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const pct = Math.min((ts - t0) / duration, 1);
      const eased = 1 - (1 - pct) ** 3;
      setVal(Math.round(eased * end));
      if (pct < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, end, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const NAV = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Products", id: "products" },
  { label: "Business", id: "business" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

const BENEFITS = [
  {
    icon: Heart,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    title: "Better Wellness",
    desc: "Personalized protocols backed by continuous biomarker tracking give you a real-time picture of your body's performance and recovery.",
  },
  {
    icon: Sun,
    color: "text-amber-500",
    bg: "bg-amber-50",
    title: "Healthy Aging",
    desc: "Science-backed formulations support cellular health, inflammation balance, and longevity markers — helping you age on your own terms.",
  },
  {
    icon: Globe,
    color: "text-blue-500",
    bg: "bg-blue-50",
    title: "Work From Anywhere",
    desc: "A fully digital business model means your office is wherever you have a connection — the beach, a coffee shop, or your own kitchen.",
  },
  {
    icon: TrendingUp,
    color: "text-violet-500",
    bg: "bg-violet-50",
    title: "Additional Income",
    desc: "A transparent compensation structure with multiple earning layers. Start part-time, grow at your pace, build income that compounds.",
  },
];

const STEPS = [
  {
    num: "01",
    icon: Coffee,
    title: "Book a Consultation",
    desc: "A free, zero-pressure 30-minute call to understand your health goals and lifestyle — and show you exactly what's possible.",
  },
  {
    num: "02",
    icon: Zap,
    title: "Discover the Technology",
    desc: "Experience a personalized demo of our wellness platform, review your baseline assessment, and see a protocol built just for you.",
  },
  {
    num: "03",
    icon: Sparkles,
    title: "Start Your Journey",
    desc: "Begin your wellness program with full community support. Explore the business side whenever you're ready — on your timeline.",
  },
];

const PRODUCTS = [
  {
    title: "BioTrack Pro",
    category: "Wellness Technology",
    desc: "Continuous biometric monitoring with AI-driven recovery and performance coaching. Real data, real insights, real change.",
    img: "photo-1434494878577-86c23bcb06b9",
    tag: "Most Popular",
    tagColor: "bg-emerald-600",
  },
  {
    title: "Longevity Stack",
    category: "Healthy Aging",
    desc: "A precision supplement protocol designed around clinical research on cellular aging, mitochondrial health, and inflammation.",
    img: "photo-1556909115-3f381036bcb3",
    tag: "Best Seller",
    tagColor: "bg-blue-600",
  },
  {
    title: "Daily Ritual Kit",
    category: "Daily Routine",
    desc: "Morning and evening formulations that integrate seamlessly into your existing routine — no complicated protocols required.",
    img: "photo-1602080858428-57174f9431cf",
    tag: "Starter Pick",
    tagColor: "bg-violet-600",
  },
  {
    title: "Natural Wellness Protocol",
    category: "Natural Wellness",
    desc: "A whole-system approach combining adaptogens, targeted nutrients, and lifestyle frameworks for sustained energy and clarity.",
    img: "photo-1684895800144-7fb91695a9be",
    tag: "New",
    tagColor: "bg-amber-500",
  },
];

const BIZ_PROFILES = [
  { icon: Laptop, title: "Entrepreneurs", desc: "Add a recurring revenue stream to your portfolio with minimal overhead." },
  { icon: Heart, title: "Health Professionals", desc: "Extend your impact beyond the clinic with products you genuinely believe in." },
  { icon: Activity, title: "Massage Therapists", desc: "Complement your practice with trusted wellness protocols for your clients." },
  { icon: Brain, title: "Chiropractors", desc: "Offer evidence-informed supplementation alongside your existing services." },
  { icon: Sparkles, title: "Wellness Coaches", desc: "Give your clients better tools and build sustainable income simultaneously." },
  { icon: Clock, title: "Retirees", desc: "Find purpose, community, and supplemental income on a completely flexible schedule." },
  { icon: Globe, title: "Remote Workers", desc: "Already working digitally? Plug a flexible business into your existing lifestyle." },
  { icon: BookOpen, title: "Anyone Curious", desc: "No background required — just a genuine interest in wellness and growth." },
];

const WHY_US = [
  { icon: Shield, title: "Personal Support", desc: "A dedicated specialist walks with you from day one." },
  { icon: Users, title: "Vibrant Community", desc: "10,000+ active members across 15+ countries." },
  { icon: BookOpen, title: "200+ Lessons", desc: "A full training platform covering health, business, and mindset." },
  { icon: BarChart3, title: "Real Data", desc: "Decisions backed by your actual biology, not guesswork." },
  { icon: Zap, title: "Cutting-Edge Tech", desc: "Biomarker tools that rival clinical-grade assessments." },
  { icon: Leaf, title: "Clean Ingredients", desc: "Third-party tested, non-GMO, transparently sourced." },
  { icon: Globe, title: "Flexible Lifestyle", desc: "Build from anywhere, grow at your own pace." },
  { icon: Award, title: "Proven Results", desc: "Documented health improvements across every demographic." },
];

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "Wellness Coach & Business Partner",
    text: "I was genuinely skeptical — I'd tried every supplement and tracking app out there. Within 60 days, my sleep score improved by 34% and I had more sustained energy than I'd had in years. The business side was a bonus I didn't expect to take seriously. Eighteen months later it's my primary income.",
    rating: 5,
    img: "photo-1580489944761-15a19d654956",
    metric: "+34% Sleep Score",
  },
  {
    name: "Dr. David Kim",
    role: "Former Chiropractor",
    text: "The science here is real. I was familiar with the biomarker research and initially joined just to use the products. The business model is built on genuine value — I now help my former patients access the same technology and I'm building a team of health professionals.",
    rating: 5,
    img: "photo-1507003211169-0a1dd7228f2d",
    metric: "42% HRV Increase",
  },
  {
    name: "Jessica Lawson",
    role: "Retired Teacher, 58",
    text: "After 30 years of teaching I wanted purpose, not just a pension. The community gave me that. I work about 15 hours a week, my health has measurably improved, and I earned enough in my first year to take two European vacations I'd been putting off for decades.",
    rating: 5,
    img: "photo-1494790108377-be9c29b29330",
    metric: "$4,800 first month",
  },
];

const FAQS = [
  {
    q: "What makes your wellness technology different from other products?",
    a: "Our technology uses continuous biomarker analysis to create genuinely personalized protocols — not generic recommendations. Unlike commodity supplements or basic wearables, our system builds an increasingly accurate model of your biology over time, so recommendations improve the longer you use it.",
  },
  {
    q: "Is this a pyramid scheme or MLM?",
    a: "No. We're a legitimate direct-to-consumer wellness company with real, peer-reviewed science behind our formulations. Business partners earn income by sharing products with customers and, optionally, building a referral team. There is never any pressure to recruit — the products stand entirely on their own merit.",
  },
  {
    q: "How much does it cost to get started?",
    a: "Product memberships start at an accessible monthly price, and business enrollment has multiple entry tiers. Our free discovery consultation walks through all options transparently, with no pressure. You'll always know exactly what you're committing to before spending anything.",
  },
  {
    q: "Can I do this part-time around my current career?",
    a: "Most of our most successful partners began part-time. The business model is designed for people with full lives — our digital tools, automated systems, and community support handle much of the operational work so you can focus on the conversations that matter.",
  },
  {
    q: "What kind of training and ongoing support is included?",
    a: "You receive a dedicated onboarding specialist, access to our private learning platform with 200+ lessons, weekly live coaching calls, and an active community of thousands of partners worldwide. Ongoing mentorship is a core part of what we offer.",
  },
  {
    q: "How soon can I expect to see health results?",
    a: "Most members report noticeable improvements in energy and sleep quality within 2–4 weeks. More substantial biomarker changes — HRV, recovery metrics, inflammatory markers — are typically measurable at the 90-day follow-up assessment we conduct with all members.",
  },
  {
    q: "Do I need any health, medical, or business background?",
    a: "Not at all. We've designed our training for first-time entrepreneurs and wellness enthusiasts alike. Health professionals do find the science exciting and often see rapid growth, but anyone passionate about wellness and helping others can build something meaningful here.",
  },
  {
    q: "What if I've never done any marketing or sales?",
    a: "Our system is purpose-built for people who don't think of themselves as salespeople. We provide ready-to-use digital assets, a personal product website, step-by-step playbooks, and frameworks for natural conversations — you share your genuine experience, not a pitch.",
  },
  {
    q: "Are the products certified and third-party tested?",
    a: "Yes. All formulations are manufactured in NSF-certified, GMP-compliant facilities and independently tested for potency, purity, and safety. Full certificates of analysis are available upon request, and we're fully compliant with FDA dietary supplement guidelines.",
  },
  {
    q: "How exactly does the income opportunity work?",
    a: "You earn retail margin on direct customer sales, ongoing commissions from monthly customer subscriptions, and team-building bonuses when partners you've introduced help others. The compensation plan is fully transparent — we'll walk through every detail in your discovery call.",
  },
];

// ─── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tIndex, setTIndex] = useState(0);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "" });
  const [leadDone, setLeadDone] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "both",
    message: "",
  });
  const [contactDone, setContactDone] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      mobileOpen ? 280 : 0
    );
  };

  const prevT = () => setTIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const nextT = () => setTIndex((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* ── STICKY HEADER ───────────────────────────────────────── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-200 group-hover:shadow-lg group-hover:shadow-emerald-200 transition-shadow">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span
              className={cn(
                "text-lg font-bold tracking-tight transition-colors duration-300",
                scrolled ? "text-[#0d1b2a]" : "text-white"
              )}
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              VitalFlow
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-black/5",
                  scrolled ? "text-[#0d1b2a]/80 hover:text-[#0d1b2a]" : "text-white/85 hover:text-white"
                )}
              >
                {n.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => scrollTo("contact")}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all duration-200 shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Free Consultation
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              scrolled ? "text-[#0d1b2a]" : "text-white"
            )}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden bg-white border-b border-border overflow-hidden transition-all duration-300",
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="px-6 py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-left px-4 py-3 rounded-xl text-sm font-medium text-[#0d1b2a]/80 hover:text-[#0d1b2a] hover:bg-[#f3f4f8] transition-colors"
              >
                {n.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="mt-2 px-5 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold text-center"
            >
              Book Free Consultation  ao now add tgeiu miner , 
            </button>
          </nav>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a] via-[#0f2d2a] to-[#0a2a1f]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 50%, rgba(5,150,105,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.3) 0%, transparent 60%), radial-gradient(ellipse at 60% 80%, rgba(5,150,105,0.2) 0%, transparent 50%)",
          }}
        />

        {/* Floating decorative circles */}
        <div
          className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-[0.06] border border-emerald-400"
          style={{ animation: "float1 8s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-[0.08] border border-blue-400"
          style={{ animation: "float2 11s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full opacity-[0.05] bg-emerald-400"
          style={{ animation: "float3 9s ease-in-out infinite" }}
        />

        <style>{`
          @keyframes float1 { 0%,100%{transform:translate(0,0) rotate(0deg)} 33%{transform:translate(20px,-30px) rotate(5deg)} 66%{transform:translate(-15px,20px) rotate(-3deg)} }
          @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,-20px)} }
          @keyframes float3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(15px,25px) scale(1.05)} }
          @keyframes pulseRing { 0%,100%{transform:scale(1);opacity:0.4} 50%{transform:scale(1.08);opacity:0.2} }
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 0; }
        `}</style>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left column */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Premium Wellness Technology
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Activate Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">
                Wellness.
              </span>
              <br />
              Create More{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
                Freedom.
              </span>
              <br />
              <span className="text-white/90">Build a Business </span>
              <br />
              <span className="text-white/70 text-4xl lg:text-5xl xl:text-6xl">
                That Fits Your Life.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-white/65 text-lg lg:text-xl leading-relaxed max-w-xl mb-10"
            >
              Discover cutting-edge wellness technology while creating an
              opportunity for additional income through a supportive, global
              community — no background required.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button
                onClick={() => scrollTo("contact")}
                className="group px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base transition-all duration-200 shadow-xl shadow-emerald-900/40 hover:shadow-2xl hover:shadow-emerald-900/50 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 justify-center"
              >
                Book Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo("lead")}
                className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-base transition-all duration-200 flex items-center gap-2.5 justify-center"
              >
                <BookOpen className="w-4 h-4" />
                Download Free Guide
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="flex flex-wrap items-center gap-6"
            >
              {[
                { icon: Shield, label: "GMP Certified" },
                { icon: Award, label: "3rd Party Tested" },
                { icon: Users, label: "10K+ Members" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-white/50"
                >
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — wellness dashboard card */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-sm lg:max-w-md"
            >
              {/* Main card */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-white/50 text-xs font-medium uppercase tracking-widest">
                      Today's Overview
                    </p>
                    <p className="text-white font-bold text-lg mt-0.5">
                      Your Wellness Score
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <span className="text-emerald-400 font-black text-xl">87</span>
                  </div>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Sleep", value: "7h 42m", icon: "🌙", color: "bg-blue-500/15 border-blue-500/20" },
                    { label: "Recovery", value: "94%", icon: "⚡", color: "bg-emerald-500/15 border-emerald-500/20" },
                    { label: "HRV", value: "58ms", icon: "💓", color: "bg-violet-500/15 border-violet-500/20" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className={cn("rounded-2xl p-3 border text-center", m.color)}
                    >
                      <div className="text-lg mb-1">{m.icon}</div>
                      <div className="text-white font-bold text-sm">{m.value}</div>
                      <div className="text-white/40 text-[10px] mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Progress bars */}
                <div className="space-y-3 mb-5">
                  {[
                    { label: "Stress Level", pct: 22, color: "bg-emerald-500" },
                    { label: "Activity Goal", pct: 78, color: "bg-blue-400" },
                    { label: "Hydration", pct: 65, color: "bg-sky-400" },
                  ].map((b) => (
                    <div key={b.label}>
                      <div className="flex justify-between text-[11px] text-white/50 mb-1.5">
                        <span>{b.label}</span>
                        <span>{b.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${b.pct}%` }}
                          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                          className={cn("h-full rounded-full", b.color)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Image with overlay */}
                <div className="rounded-2xl overflow-hidden h-40 relative">
                  <img
                    src="https://images.unsplash.com/photo-1549062572-b4280938a25f?w=600&h=300&fit=crop&auto=format&q=80"
                    alt="Happy healthy couple"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-white text-xs font-medium">
                      Live your best life
                    </span>
                    <span className="text-emerald-400 text-xs font-semibold">
                      Day 47 ✓
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating stat bubbles */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -left-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-border"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground leading-none mb-0.5">
                    Income Growth
                  </p>
                  <p className="text-sm font-bold text-[#0d1b2a]">+$2,400/mo </p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-border"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground leading-none mb-0.5">
                    Community
                  </p>
                  <p className="text-sm font-bold text-[#0d1b2a]">10,000+</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs tracking-widest uppercase">Scroll </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ── TRUST BAR ──────────────────────────────────────────── */}
      <section className="py-12 border-y border-border bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-8">
            Trusted By Leading Wellness Communities
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {[
              "Forbes Health",
              "Wellness Today",
              "BiOptimizers",
              "FunctionalMD",
              "HealthIQ",
              "Biohacker Review",
            ].map((brand) => (
              <div
                key={brand}
                className="text-muted-foreground/50 font-bold text-sm lg:text-base tracking-tight"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {[
              { end: 10000, suffix: "+", label: "Active Members", prefix: "" },
              { end: 98, suffix: "%", label: "Satisfaction Rate", prefix: "" },
              { end: 15, suffix: "+", label: "Countries", prefix: "" },
              { end: 4.9, suffix: "★", label: "Average Rating", prefix: "" },
            ].map(({ end, suffix, label, prefix }) => (
              <Reveal key={label} className="text-center">
                <div
                  className="text-4xl lg:text-5xl font-extrabold text-[#0d1b2a] mb-2"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  <Counter end={end} suffix={suffix} prefix={prefix} />
                </div>
                <p className="text-muted-foreground text-sm">{label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ───────────────────────────────────────────── */}
      <section id="about" className="py-24 lg:py-32 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-emerald-600 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Why VitalFlow
            </p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-[#0d1b2a] leading-tight mb-5"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Four pillars that change everything 
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our approach combines precision wellness technology with a
              community-driven business model designed for modern life.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map(({ icon: Icon, color, bg, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="group bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl border border-border hover:border-transparent transition-all duration-300 hover:-translate-y-1 h-full">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300",
                      bg
                    )}
                  >
                    <Icon className={cn("w-5 h-5", color)} />
                  </div>
                  <h3
                    className="text-lg font-bold text-[#0d1b2a] mb-3"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-emerald-600 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Simple Process
            </p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-[#0d1b2a] leading-tight mb-5"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Three steps to transform your health
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-14 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />

            {STEPS.map(({ num, icon: Icon, title, desc }, i) => (
              <Reveal key={num} delay={i * 0.15}>
                <div className="relative text-center lg:text-left group">
                  <div className="inline-flex lg:flex items-center justify-center lg:justify-start gap-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:shadow-xl group-hover:shadow-emerald-200 transition-shadow">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0d1b2a] text-white text-[10px] font-bold flex items-center justify-center">
                        {num.slice(1)}
                      </span>
                    </div>
                  </div>
                  <h3
                    className="text-xl font-bold text-[#0d1b2a] mb-3"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4} className="text-center mt-14">
            <button
              onClick={() => scrollTo("contact")}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all duration-200 shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-200 hover:-translate-y-0.5"
            >
              Start Your Journey Today
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <Reveal y={20} className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1556909115-3f381036bcb3?w=800&h=600&fit=crop&auto=format&q=80"
                  alt="Healthy couple cooking together"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent" />
              </div>
              {/* Floating mission card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 max-w-xs border border-border">
                <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-2">
                  Our Mission
                </p>
                <p className="text-sm text-[#0d1b2a] font-medium leading-snug">
                  Making precision wellness technology accessible to everyone,
                  while creating real financial opportunity for those who share
                  our vision. 
                </p>
              </div>
            </Reveal>

            {/* Text */}
            <div>
              <Reveal>
                <p className="text-emerald-600 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                  Our Story
                </p>
                <h2
                  className="text-4xl lg:text-5xl font-extrabold text-[#0d1b2a] leading-tight mb-6"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  Built by wellness believers, for wellness believers
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  VitalFlow was founded by a team of clinicians, biohackers, and
                  entrepreneurs who were frustrated by the gap between
                  cutting-edge longevity research and what the average person
                  could actually access and afford.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  We spent three years building technology that translates complex
                  biomarker data into simple, actionable protocols — and a
                  community model that allows the most passionate advocates to
                  build meaningful businesses sharing it.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="space-y-4">
                  {[
                    "Grounded in peer-reviewed science and clinical validation",
                    "Community-first model with transparent compensation",
                    "Continuous product innovation driven by member data",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <p className="text-[#0d1b2a] text-sm font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ───────────────────────────────────────────── */}
      <section id="products" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-emerald-600 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Our Products
            </p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-[#0d1b2a] leading-tight mb-5"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Technology that knows your biology
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Each product is designed around one idea: your body is unique, and
              your wellness protocol should be too.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map(({ title, category, desc, img, tag, tagColor }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-border hover:border-transparent transition-all duration-400 hover:-translate-y-2 h-full flex flex-col">
                  <div className="relative h-52 overflow-hidden bg-[#f3f4f8]">
                    <img
                      src={`https://images.unsplash.com/${img}?w=400&h=300&fit=crop&auto=format&q=80`}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span
                      className={cn(
                        "absolute top-3 left-3 px-3 py-1 rounded-full text-white text-[11px] font-semibold",
                        tagColor
                      )}
                    >
                      {tag}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-emerald-600 text-[11px] font-semibold uppercase tracking-widest mb-2">
                      {category}
                    </p>
                    <h3
                      className="text-lg font-bold text-[#0d1b2a] mb-3"
                      style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                    >
                      {title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      {desc}
                    </p>
                    <button
                      onClick={() => scrollTo("contact")}
                      className="mt-5 w-full py-2.5 rounded-xl border border-emerald-200 text-emerald-700 text-sm font-semibold hover:bg-emerald-50 transition-colors"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUSINESS OPPORTUNITY ───────────────────────────────── */}
      <section id="business" className="py-24 lg:py-32 bg-[#0d1b2a] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 50%, rgba(5,150,105,0.5) 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, rgba(59,130,246,0.3) 0%, transparent 55%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Business Opportunity
            </p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Build a Flexible Lifestyle Business
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              No storefront. No inventory. No cold calls. Just a product you
              believe in and a community that has your back from day one.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {BIZ_PROFILES.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.07}>
                <div className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/40 rounded-2xl p-5 transition-all duration-300 cursor-default h-full">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-[18px] h-[18px] text-emerald-400" />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-1.5">{title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Income showcase */}
          <Reveal delay={0.2}>
            <div className="bg-white/8 backdrop-blur border border-white/12 rounded-3xl p-8 lg:p-10 grid lg:grid-cols-3 gap-8 mb-12">
              {[
                { label: "Part-Time (10 hrs/wk)", range: "$500 – $2,000", note: "Months 1–3", color: "text-emerald-400" },
                { label: "Active Builder (20 hrs/wk)", range: "$2,000 – $8,000", note: "Months 3–12", color: "text-blue-400" },
                { label: "Full-Time Leader", range: "$8,000 – $25,000+", note: "Year 2+", color: "text-violet-400" },
              ].map(({ label, range, note, color }) => (
                <div key={label} className="text-center lg:text-left">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-2">
                    {label}
                  </p>
                  <p
                    className={cn(
                      "text-3xl font-extrabold mb-1",
                      color,
                      { fontFamily: "'Bricolage Grotesque', sans-serif" } as React.CSSProperties
                    )}
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    {range}
                  </p>
                  <p className="text-white/30 text-xs">{note} · Monthly</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3} className="text-center">
            <p className="text-white/35 text-xs mb-6">
              Results vary. Income claims represent potential, not guarantees. See income disclosure statement.
            </p>
            <button
              onClick={() => scrollTo("contact")}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all duration-200 shadow-xl shadow-emerald-900/40 hover:-translate-y-0.5"
            >
              Schedule Your Discovery Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-emerald-600 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              The VitalFlow Advantage.  
            </p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-[#0d1b2a] leading-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Why thousands choose us
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_US.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.07}>
                <div className="group flex flex-col gap-3 p-6 rounded-2xl hover:bg-[#f0fdf9] border border-transparent hover:border-emerald-100 transition-all duration-300 cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-[18px] h-[18px] text-emerald-600" />
                  </div>
                  <h3
                    className="font-bold text-[#0d1b2a] text-sm"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────── */}
      <section id="testimonials" className="py-24 lg:py-32 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-emerald-600 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Real Stories
            </p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-[#0d1b2a] leading-tight mb-5"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Lives genuinely changed
            </h2>
          </Reveal>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-3xl">
              <motion.div
                key={tIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl shadow-sm border border-border p-8 lg:p-12"
              >
                <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-start">
                  {/* Avatar */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#f3f4f8] flex-shrink-0">
                      <img
                        src={`https://images.unsplash.com/${TESTIMONIALS[tIndex].img}?w=120&h=120&fit=crop&auto=format&q=80`}
                        alt={TESTIMONIALS[tIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-[#0d1b2a] text-sm">
                        {TESTIMONIALS[tIndex].name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {TESTIMONIALS[tIndex].role}
                      </p>
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
                      <p className="text-emerald-700 text-xs font-bold">
                        {TESTIMONIALS[tIndex].metric}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: TESTIMONIALS[tIndex].rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-amber-400 fill-amber-400"
                          />
                        )
                      )}
                    </div>
                    <blockquote
                      className="text-[#0d1b2a] text-lg lg:text-xl leading-relaxed font-medium mb-6"
                      style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                    >
                      "{TESTIMONIALS[tIndex].text}"
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevT}
                className="w-10 h-10 rounded-full border border-border bg-white hover:bg-[#f0fdf9] hover:border-emerald-200 transition-colors flex items-center justify-center"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4 text-[#0d1b2a]" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTIndex(i)}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      i === tIndex
                        ? "w-6 h-2 bg-emerald-600"
                        : "w-2 h-2 bg-[#0d1b2a]/20 hover:bg-[#0d1b2a]/40"
                    )}
                  />
                ))}
              </div>
              <button
                onClick={nextT}
                className="w-10 h-10 rounded-full border border-border bg-white hover:bg-[#f0fdf9] hover:border-emerald-200 transition-colors flex items-center justify-center"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4 text-[#0d1b2a]" />
              </button>
            </div>
          </div>

          {/* Video placeholder */}
          <Reveal delay={0.2} className="mt-14">
            <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden relative aspect-video bg-[#0d1b2a] cursor-pointer group">
              <img
                src="https://images.unsplash.com/photo-1555689070-2d15336749b6?w=900&h=500&fit=crop&auto=format&q=80"
                alt="Watch our story"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                </div>
                <p className="text-white font-semibold text-sm tracking-wide">
                  Watch Our Community Story
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── LEAD MAGNET ────────────────────────────────────────── */}
      <section id="lead" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-8 lg:p-12 text-center shadow-2xl shadow-emerald-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-black/5 translate-y-1/2 -translate-x-1/2" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white text-xs font-semibold uppercase tracking-widest mb-6">
                    <BookOpen className="w-3.5 h-3.5" />
                    Free Resource
                  </div>
                  <h2
                    className="text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4"
                    style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                  >
                    Download Your Free<br />Healthy Aging Guide
                  </h2>
                  <p className="text-white/75 leading-relaxed mb-8">
                    Our 28-page guide covers the science behind biological aging,
                    the top five biomarkers to track, and a 90-day protocol used
                    by our most successful members.
                  </p>

                  {leadDone ? (
                    <div className="bg-white/15 backdrop-blur rounded-2xl p-6 text-white">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                        <Check className="w-5 h-5" />
                      </div>
                      <p className="font-bold mb-1">Check your inbox!</p>
                      <p className="text-white/70 text-sm">
                        Your free guide is on its way.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setLeadDone(true);
                      }}
                      className="space-y-3"
                    >
                      {[
                        { name: "name" as const, placeholder: "Your full name", type: "text" },
                        { name: "email" as const, placeholder: "Your email address", type: "email" },
                        { name: "phone" as const, placeholder: "Your phone (optional)", type: "tel" },
                      ].map(({ name, placeholder, type }) => (
                        <input
                          key={name}
                          type={type}
                          placeholder={placeholder}
                          value={leadForm[name]}
                          onChange={(e) =>
                            setLeadForm((f) => ({ ...f, [name]: e.target.value }))
                          }
                          required={name !== "phone"}
                          className="w-full px-5 py-3.5 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:bg-white/20 focus:border-white/40 transition-colors"
                        />
                      ))}
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-white text-emerald-700 font-bold text-sm hover:bg-white/95 transition-colors shadow-lg"
                      >
                        Get Instant Access →
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="text-emerald-600 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              FAQ
            </p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-[#0d1b2a] leading-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Questions we always answer
            </h2>
          </Reveal>

          <AccordionPrimitive.Root
            type="single"
            collapsible
            className="space-y-3"
          >
            {FAQS.map(({ q, a }, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <AccordionPrimitive.Item
                  value={`faq-${i}`}
                  className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
                >
                  <AccordionPrimitive.Trigger className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group cursor-pointer">
                    <span
                      className="font-semibold text-[#0d1b2a] text-sm leading-snug"
                      style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                    >
                      {q}
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </AccordionPrimitive.Trigger>
                  <AccordionPrimitive.Content className="overflow-hidden data-[state=open]:animate-[accordionDown_0.25s_ease-out] data-[state=closed]:animate-[accordionUp_0.25s_ease-out]">
                    <style>{`
                      @keyframes accordionDown { from{height:0;opacity:0} to{height:var(--radix-accordion-content-height);opacity:1} }
                      @keyframes accordionUp { from{height:var(--radix-accordion-content-height);opacity:1} to{height:0;opacity:0} }
                    `}</style>
                    <p className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed">
                      {a}
                    </p>
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              </Reveal>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-[#0d1b2a]">
        <img
          src="https://images.unsplash.com/photo-1684895800144-7fb91695a9be?w=1400&h=700&fit=crop&auto=format&q=60"
          alt="Couple in nature"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 100%, rgba(5,150,105,0.35) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Your Journey Starts Here
            </div>
            <h2
              className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Ready to Improve Your Health and Explore a New Opportunity?
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              A free, no-pressure consultation. Just an honest conversation about
              your goals and whether VitalFlow is a fit.
            </p>
            <button
              onClick={() => scrollTo("contact")}
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg transition-all duration-200 shadow-2xl shadow-emerald-900/50 hover:shadow-2xl hover:-translate-y-0.5"
            >
              Book Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────── */}
      <section id="contact" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-emerald-600 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Get In Touch
            </p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-[#0d1b2a] leading-tight mb-5"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              We would love to hear from you
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
            {/* Left — info */}
            <div className="space-y-6">
              {[
                { icon: Phone, title: "Phone", val: "+1 (800) 555-0198", sub: "Mon–Fri, 8am–6pm EST" },
                { icon: Mail, title: "Email", val: "hello@vitalflow.com", sub: "We reply within 2 hours" },
                { icon: MapPin, title: "Location", val: "Austin, TX · Remote Worldwide", sub: "Global community" },
              ].map(({ icon: Icon, title, val, sub }) => (
                <Reveal key={title}>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#f8fafc] border border-border hover:border-emerald-100 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-[18px] h-[18px] text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mb-1">
                        {title}
                      </p>
                      <p className="font-bold text-[#0d1b2a] text-sm">{val}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{sub}</p>
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Map placeholder */}
              <Reveal>
                <div className="h-48 rounded-2xl bg-[#f0fdf9] border border-emerald-100 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">
                      Austin, TX · Worldwide Remote
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right — form */}
            <Reveal delay={0.1}>
              <div className="bg-[#f8fafc] rounded-3xl p-7 lg:p-8 border border-border">
                {contactDone ? (
                  <div className="h-full flex flex-col items-center justify-center py-12 text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Check className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h3
                      className="text-2xl font-bold text-[#0d1b2a]"
                      style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                    >
                      Message received!
                    </h3>
                    <p className="text-muted-foreground max-w-xs">
                      We'll be in touch within 2 hours. Check your inbox for a
                      confirmation.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setContactDone(true);
                    }}
                    className="space-y-4"
                  >
                    <h3
                      className="text-xl font-bold text-[#0d1b2a] mb-6"
                      style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                    >
                      Book your free consultation
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#0d1b2a] mb-2 uppercase tracking-widest">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Jane Smith"
                          value={contactForm.name}
                          onChange={(e) => setContactForm((f) => ({ ...f, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-border text-[#0d1b2a] text-sm placeholder-muted-foreground focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-300 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#0d1b2a] mb-2 uppercase tracking-widest">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="jane@example.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-border text-[#0d1b2a] text-sm placeholder-muted-foreground focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-300 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0d1b2a] mb-2 uppercase tracking-widest">
                        Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm((f) => ({ ...f, phone: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-border text-[#0d1b2a] text-sm placeholder-muted-foreground focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-300 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0d1b2a] mb-2 uppercase tracking-widest">
                        I'm most interested in
                      </label>
                      <select
                        value={contactForm.interest}
                        onChange={(e) => setContactForm((f) => ({ ...f, interest: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-border text-[#0d1b2a] text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-300 transition-colors"
                      >
                        <option value="health">Improving my health</option>
                        <option value="business">The business opportunity</option>
                        <option value="both">Both health & business</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0d1b2a] mb-2 uppercase tracking-widest">
                        Message (optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us a little about your goals..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-border text-[#0d1b2a] text-sm placeholder-muted-foreground focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-300 transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="group w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all duration-200 shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-200 flex items-center justify-center gap-2.5"
                    >
                      Book Free Consultation
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-center text-muted-foreground text-xs">
                      No spam. No sales pressure. Just a genuine conversation.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="bg-[#0a1520] text-white/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span
                  className="text-lg font-bold text-white tracking-tight"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  VitalFlow
                </span>
              </div>
              <p className="text-white/45 text-sm leading-relaxed max-w-xs mb-6">
                Premium wellness technology and a community-driven business
                opportunity designed for the modern lifestyle.
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: Globe, label: "Website" },
                  { Icon: Target, label: "Instagram" },
                  { Icon: Users, label: "Facebook" },
                  { Icon: Zap, label: "LinkedIn" },
                ].map(({ Icon, label }) => (
                  <button
                    key={label}
                    aria-label={label}
                    className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Company",
                links: ["About Us", "Our Science", "Blog", "Careers", "Press"],
              },
              {
                title: "Products",
                links: ["BioTrack Pro", "Longevity Stack", "Daily Ritual Kit", "Natural Protocol", "View All"],
              },
              {
                title: "Support",
                links: ["Book Consultation", "Help Center", "Community Forum", "Income Disclosure", "Contact Us"],
              },
            ].map(({ title, links }) => (
              <div key={title}>
                <p className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-4">
                  {title}
                </p>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-white/45 text-sm hover:text-white/80 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">
              © 2025 VitalFlow Wellness. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Income Disclosure", "Disclaimer"].map(
                (l) => (
                  <a
                    key={l}
                    href="#"
                    className="text-white/30 text-xs hover:text-white/60 transition-colors"
                  >
                    {l}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* ── MOBILE STICKY CTA ──────────────────────────────────── */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-all duration-300",
          scrolled ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        )}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-border px-4 py-3 flex gap-3">
          <button
            onClick={() => scrollTo("lead")}
            className="flex-1 py-3 rounded-xl border border-emerald-200 text-emerald-700 text-sm font-semibold transition-colors hover:bg-emerald-50"
          >
            Free Guide
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="flex-1 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-md shadow-emerald-200"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
