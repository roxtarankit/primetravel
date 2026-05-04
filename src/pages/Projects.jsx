import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from '../components/projects/ProjectCard'

gsap.registerPlugin(ScrollTrigger)

import img1 from '../assets/image1.jpg'
import img2 from '../assets/priya5.jpeg'
import img3 from '/images/priya2.jpeg'
import img4 from '../assets/image3.jpg'
import img5 from '../assets/Auli_Himalayas.jpg'
import img6 from '../assets/image6.jpg'

const projects = [
  {
    slogan: { top: 'Not all who wander', bottom: 'are lost' },
    images: [
      { src: img1, title: 'Chakrata',  tag: 'Uttarakhand'  },
      { src: img2, title: 'Mussoorie', tag: 'Hill Station'  },
      { src: img3, title: 'Dhanaulti', tag: 'Himalayas'     },
    ],
  },
  {
    slogan: { top: 'The world is a book —', bottom: 'read every page' },
    images: [
      { src: img4, title: 'Rishikesh', tag: 'Adventure' },
      { src: img5, title: 'Auli',      tag: 'Skiing'    },
      { src: img6, title: 'Dehradun',  tag: 'Forest'    },
    ],
  },
]

const WORDS = [
  'Mountains','✦','Forests','✦','Valleys','✦','Rivers',
  '✦','Peaks','✦','Trails','✦','Glaciers','✦','Lakes','✦',
]

const PLACE_STATS = [
  { num: '6+',   label: 'Destinations',   color: '#D3FD50' },
  { num: '2',    label: 'Regions',        color: '#a78bfa' },
  { num: '100%', label: 'Worth It',       color: '#34d399' },
  { num: '∞',    label: 'Memories',       color: '#fb923c' },
]

const TRAVEL_TIPS = [
  { icon: '🏔️', tip: 'Best time for Uttarakhand hills is April–June and Sep–Nov.' },
  { icon: '🎿', tip: 'Auli skiing season runs from January to March.' },
  { icon: '🌊', tip: 'Rishikesh rafting is best between September and June.' },
  { icon: '🌿', tip: 'Carry layers — mountain weather changes fast at altitude.' },
]

const Projects = () => {
  const containerRef = useRef(null)
  const titleRef     = useRef(null)
  const marqueeRef   = useRef(null)
  const navigate     = useNavigate()

  useGSAP(() => {

    // ── Title letter reveal
    const el = titleRef.current
    if (el) {
      el.innerHTML = el.textContent
        .split('')
        .map(ch => `<span style="display:inline-block">${ch === ' ' ? '&nbsp;' : ch}</span>`)
        .join('')
      gsap.from(el.querySelectorAll('span'), {
        yPercent: 120, opacity: 0, stagger: 0.04, duration: 0.9, ease: 'power3.out',
      })
    }

    // ── Marquee
    gsap.to('.marquee-track', {
      xPercent: -50, repeat: -1, duration: 20, ease: 'none',
    })

    // ── Hero subtitle
    gsap.from('.hero-sub', {
      opacity: 0, y: 16, duration: 0.8, ease: 'power2.out', delay: 0.8,
    })

    // ── Stats
    gsap.from('.place-stat', {
      y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.stats-row', start: 'top 88%', once: true },
    })

    // ── Per-row scroll animations
    gsap.utils.toArray('.proj-row').forEach(row => {
      const cards  = row.querySelectorAll('.card-item')
      const slogan = row.querySelector('.row-slogan')

      gsap.from(cards, {
        y: 70, opacity: 0, scale: 0.94, stagger: 0.12, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 87%', toggleActions: 'play none none reverse' },
      })

      gsap.from(slogan, {
        x: -24, opacity: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: row, start: 'top 87%', toggleActions: 'play none none reverse' },
      })

      cards.forEach(card => {
        const img = card.querySelector('img')
        if (!img) return
        gsap.to(img, {
          yPercent: -10, ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    })

    // ── Tips
    gsap.from('.tip-card', {
      y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.tips-section', start: 'top 87%', once: true },
    })

    // ── Story CTA
    gsap.from('.story-cta', {
      opacity: 0, y: 40, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.story-cta', start: 'top 90%', once: true },
    })

    // ── CTA
    gsap.from('.cta-wrap', {
      opacity: 0, y: 40, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-wrap', start: 'top 90%', once: true },
    })

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="bg-[#080808] min-h-screen text-white">

      {/* ══════════ HERO ══════════ */}
      <div className="px-5 lg:px-12 pt-[28vh] pb-8">
        <p className="hero-sub text-white uppercase tracking-[0.35em] text-[10px] mb-5">
          Curated Escapes · India
        </p>
        <div className="overflow-hidden">
          <h1
            ref={titleRef}
            className="font-[font2] text-[18vw] sm:text-[14vw] lg:text-[11vw] uppercase leading-none tracking-tight"
          >
            Places
          </h1>
        </div>

        {/* Hero description */}
        <div className="hero-sub mt-8 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <p className="text-white/35 text-sm lg:text-base font-light max-w-md leading-relaxed">
            Six handpicked destinations across Uttarakhand — mountains, rivers, forests, and snow. Every place here has been explored personally.
          </p>
          <button
            onClick={() => navigate('/agence')}
            className="group relative overflow-hidden border border-[#D3FD50]/30 text-[#D3FD50] text-[9px] uppercase tracking-[0.3em] px-7 py-3 rounded-full hover:border-[#D3FD50] transition-colors duration-500 shrink-0"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">Read Travel Stories →</span>
            <span className="absolute inset-0 bg-[#D3FD50] translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
          </button>
        </div>

        <div className="mt-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-white/30 text-[9px] tracking-[0.35em] uppercase">Scroll to explore</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
      </div>

      {/* ══════════ MARQUEE ══════════ */}
      <div className="overflow-hidden border-y border-white/[0.07] py-3 mb-14">
        <div className="marquee-track flex gap-10 w-max whitespace-nowrap">
          {[...WORDS, ...WORDS].map((w, i) => (
            <span key={i} className="text-white text-[9px] uppercase tracking-[0.35em] font-light">{w}</span>
          ))}
        </div>
      </div>

      {/* ══════════ STATS ══════════ */}
      <section className="stats-row border-b border-white/[0.06] px-5 lg:px-12 py-12 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {PLACE_STATS.map((s, i) => (
            <div key={i} className="place-stat text-center lg:text-left">
              <div className="font-[font2] text-5xl lg:text-6xl leading-none" style={{ color: s.color }}>
                {s.num}
              </div>
              <p className="text-white/25 text-[9px] uppercase tracking-widest mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ PROJECT ROWS ══════════ */}
      <div className="px-5 lg:px-12 space-y-10 lg:space-y-16">
        {projects.map((proj, ri) => (
          <div key={ri} className="proj-row">

            {/* Slogan */}
            <div className={`row-slogan mb-6 flex ${ri % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div>
                <p className="text-white/20 text-[9px] uppercase tracking-widest mb-1">
                  — {String(ri + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </p>
                <p className="font-[font2] text-white/50 text-xl lg:text-2xl leading-snug">
                  {proj.slogan.top}<br />
                  <span className="text-white">{proj.slogan.bottom}</span>
                </p>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              {proj.images.map((img, ci) => (
                <div key={ci} className="card-item">
                  <ProjectCard src={img.src} title={img.title} tag={img.tag} index={ci} />
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* ══════════ TRAVEL TIPS ══════════ */}
      <section className="tips-section border-t border-white/[0.06] px-5 lg:px-12 py-20 mt-20">
        <div className="mb-12">
          <p className="text-white/25 text-[9px] uppercase tracking-[0.4em] mb-2">Before You Go</p>
          <h2 className="font-[font2] uppercase leading-none" style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)' }}>
            Travel Tips
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRAVEL_TIPS.map((t, i) => (
            <div key={i}
              className="tip-card border border-white/[0.07] rounded-2xl p-6 hover:border-white/20 transition-colors duration-400 group">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {t.icon}
              </div>
              <p className="text-white/45 text-sm leading-relaxed font-light">{t.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ STORY CTA BANNER ══════════ */}
      <section className="story-cta border-t border-white/[0.06] px-5 lg:px-12 py-20">
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.07] p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10"
          style={{ background: 'linear-gradient(135deg, rgba(211,253,80,0.06) 0%, rgba(167,139,250,0.04) 100%)' }}>

          {/* Glow */}
          <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(211,253,80,0.08) 0%, transparent 70%)' }} />

          <div className="relative z-10 max-w-lg">
            <p className="text-white/25 text-[9px] uppercase tracking-[0.4em] mb-3">Community</p>
            <h2 className="font-[font2] uppercase leading-none text-white mb-4"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>
              Have a travel story to share?
            </h2>
            <p className="text-white/40 text-sm font-light leading-relaxed">
              Join our community of travellers. Share your experience, inspire someone, and become part of the PrimeTravel story.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
            <button
              onClick={() => navigate('/agence')}
              className="group relative overflow-hidden border border-[#D3FD50]/40 text-[#D3FD50] text-[10px] uppercase tracking-[0.3em] px-10 py-4 rounded-full hover:border-[#D3FD50] transition-colors duration-500"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                Read Stories
              </span>
              <span className="absolute inset-0 bg-[#D3FD50] translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
            </button>

            <button
              onClick={() => navigate('/agence')}
              className="group relative overflow-hidden border border-white/15 text-white/50 text-[10px] uppercase tracking-[0.3em] px-10 py-4 rounded-full hover:border-white/40 hover:text-white transition-all duration-500"
            >
              + Share Yours
            </button>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <div className="cta-wrap px-5 lg:px-12 py-16 text-center border-t border-white/[0.06]">
        <p className="text-white/20 uppercase tracking-[0.4em] text-[9px] mb-4">Ready?</p>
        <h2 className="font-[font2] text-[10vw] lg:text-[6vw] uppercase leading-none mb-10">
          Your next <span className="text-white/20">adventure</span> awaits
        </h2>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate('/agence')}
            className="group relative overflow-hidden border border-white/20 text-[10px] uppercase tracking-[0.3em] px-10 py-4 rounded-full hover:border-[#D3FD50] transition-colors duration-500"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">Our Stories</span>
            <span className="absolute inset-0 bg-[#D3FD50] translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
          </button>
          <button
            onClick={() => navigate('/')}
            className="group relative overflow-hidden border border-white/20 text-[10px] uppercase tracking-[0.3em] px-10 py-4 rounded-full hover:border-white/50 transition-colors duration-500"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">Back to Home</span>
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="border-t border-white/[0.06] px-5 lg:px-12 py-10">

        {/* Top row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10">
          {/* Logo */}
          <div>
            <h2 className="font-[font2] text-2xl uppercase">
              <span className="text-white">Prime</span>
              <span className="text-[#22c55e]">Travel</span>
            </h2>
            <p className="text-white/20 text-[9px] uppercase tracking-widest mt-1">Curated Escapes · India</p>
          </div>

          {/* Nav links */}
          <div className="flex gap-8">
            {[
              { label: 'Home',    path: '/'        },
              { label: 'Places',  path: '/projects' },
              { label: 'Stories', path: '/agence'   },
            ].map(({ label, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="text-white/50 text-[9px] uppercase tracking-widest hover:text-white transition-colors duration-300 relative group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D3FD50] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Made by */}
          <div className="text-right">
            <p className="text-white text-sm">
              Made with <span className="text-red-400">♥</span> by{' '}
              <span className="text-white font-medium">Priya</span>
            </p>
            <p className="text-white/50 text-[9px] uppercase tracking-widest mt-1">
              © 2026 PrimeTravel
            </p>
          </div>
        </div>

        {/* Bottom divider + tagline */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-white text-[9px] uppercase tracking-widest">
            All photographs taken during personal travel across India
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#D3FD50] animate-pulse" />
            <span className="text-white text-[9px] uppercase tracking-widest">
              Hoshiarpur · India · 2026
            </span>
          </div>
        </div>

      </footer>

    </div>
  )
}

export default Projects