import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Real Unsplash travel images of India
const INDIA_IMAGES = [
  'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80', // Spiti
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80', // Taj Mahal
  'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=800&q=80', // Kerala
  'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80', // Delhi
  'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80', // Varanasi
  'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80', // Ladakh
]

// ── YouTube travel videos (embed-ready, India travel)
const TRAVEL_VIDEOS = [
  {
    id: 'Mv25eZZwcvM?si=MwclVK4IzgrwyIce',
    title: 'Dhanaulti',
    place: 'Uttarakhand',
    thumb: 'https://img.youtube.com/vi/jWzXUwJqBtA/maxresdefault.jpg',
  },
  {
    id: 'sczxemORf-g?si=A06pc7bhnSrbCZCg',
    title: 'Chakrata',
    place: 'Uttarakhand',
    thumb: 'https://img.youtube.com/vi/oNkVJ4G6RhA/maxresdefault.jpg',
  },
  {
    id: 'ouO7TfocF-c?si=NUJMPSio6sxH7KYn',
    title: 'Mussoorie',
    place: 'Uttarakhand',
    thumb: 'https://img.youtube.com/vi/LmDHuUBH5O4/maxresdefault.jpg',
  },
]

// ── Stories with real images
const INITIAL_STORIES = [
  {
    id: 1,
    name: 'Priya',
    initials: 'PS',
    place: 'Mussoorie',
    state: 'Uttarakhand',
    date: 'June 2025',
    color: '#a78bfa',
    image: '/images/priya2.jpeg',
    quote: 'At 2,270m above sea level, the air is thin but the soul feels full.',
    story: 'I enjoyed the mussoorie and Dehradun view from the sky high mountains.',
    tags: ['Solo Travel', 'Scenery', 'Himalaya'],
    rating: 5,
  },
  {
    id: 2,
    name: 'Amara Mehta',
    initials: 'AM',
    place: 'Sundarbans',
    state: 'West Bengal',
    date: 'December 2023',
    color: '#34d399',
    image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=600&q=80',
    quote: 'The jungle doesn\'t care if you\'re watching. It just lives.',
    story: 'Our boat moved silently through mangrove channels at 5am. The guide whispered — tiger, 40 metres. I didn\'t breathe for two minutes. It looked at us, turned, and disappeared into the roots. I\'ve travelled 30 countries. Nothing compares to that moment.',
    tags: ['Wildlife', 'Boat Safari', 'Tiger Spotting'],
    rating: 5,
  },
  {
    id: 3,
    name: 'Meera Iyer',
    initials: 'MI',
    place: 'Hampi',
    state: 'Karnataka',
    date: 'February 2024',
    color: '#fb923c',
    image: '/images/hampi.jpg',
    quote: 'Ruins don\'t feel broken here. They feel like they\'re still breathing.',
    story: 'I cycled through Hampi for three days with no itinerary. Giant boulders balanced on each other like giants froze mid-play. The Virupaksha temple at sunset — the sky turned the colour of turmeric. I sat on a boulder and cried a little. India does that to you.',
    tags: ['Cycling', 'History', 'Temples'],
    rating: 5,
  },
  {
    id: 4,
    name: 'Rohan Das',
    initials: 'RD',
    place: 'Rann of Kutch',
    state: 'Gujarat',
    date: 'November 2023',
    color: '#60a5fa',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=600&q=80',
    quote: 'The white desert at midnight made me feel like I was standing on the moon.',
    story: 'Full moon night at the Rann. The salt flat stretched to the horizon like a white mirror. No sound except wind. My friends and I lay on the ground and stared up. The Milky Way was so clear it looked painted. We didn\'t speak for an hour. We didn\'t need to.',
    tags: ['Desert', 'Stargazing', 'Full Moon'],
    rating: 5,
  },
  {
    id: 5,
    name: 'Kavya Nair',
    initials: 'KN',
    place: 'Kerala Backwaters',
    state: 'Kerala',
    date: 'January 2024',
    color: '#f472b6',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
    quote: 'Time moves differently on a houseboat. Slower. Better.',
    story: 'Three days on a houseboat in Alleppey. The cook made fish curry every morning fresh from the canal. We drifted through narrow waterways, coconut palms overhead, kingfishers diving beside us. I read two books. I slept deeply. I forgot what stress felt like.',
    tags: ['Houseboat', 'Backwaters', 'Slow Travel'],
    rating: 5,
  },
]

const QUOTES = [
  { text: 'The world is a book, and those who do not travel read only one page.', author: 'Saint Augustine' },
  { text: 'India is not a country. It\'s an emotion.', author: 'Unknown Traveller' },
  { text: 'Not all those who wander are lost.', author: 'J.R.R. Tolkien' },
  { text: 'Travel is the only thing you buy that makes you richer.', author: 'Anonymous' },
  { text: 'Once a year, go somewhere you\'ve never been before.', author: 'Dalai Lama' },
]

const COLORS = ['#a78bfa', '#34d399', '#fb923c', '#60a5fa', '#f472b6', '#facc15']

const StarRating = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map(s => (
      <button key={s} type="button" onClick={() => onChange?.(s)}
        className="text-xl transition-transform hover:scale-125"
        style={{ color: s <= value ? '#facc15' : 'rgba(255,255,255,0.12)' }}>★</button>
    ))}
  </div>
)

// ── Video Card with play button overlay
const VideoCard = ({ video }) => {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="relative rounded-2xl overflow-hidden group cursor-pointer"
      style={{ aspectRatio: '16/9' }}
      onClick={() => setPlaying(true)}>
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <>
          <img src={video.thumb} alt={video.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="w-0 h-0 border-t-[10px] border-b-[10px] border-l-[18px] border-t-transparent border-b-transparent border-l-white ml-1" />
            </div>
          </div>
          {/* Info */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white/40 text-[9px] uppercase tracking-widest mb-1">{video.place}</p>
            <h3 className="font-[font1] text-white text-xl uppercase leading-tight">{video.title}</h3>
          </div>
        </>
      )}
    </div>
  )
}

// ── Story Card
const StoryCard = ({ story }) => {
  const [expanded, setExpanded] = useState(false)
  const cardRef = useRef(null)
  const imgRef = useRef(null)

  const onEnter = () => {
    gsap.to(cardRef.current, { y: -8, duration: 0.4, ease: 'power2.out' })
    gsap.to(imgRef.current, { scale: 1.06, duration: 0.7, ease: 'power2.out' })
  }
  const onLeave = () => {
    gsap.to(cardRef.current, { y: 0, duration: 0.4, ease: 'power2.out' })
    gsap.to(imgRef.current, { scale: 1, duration: 0.7, ease: 'power2.out' })
  }

  return (
    <div ref={cardRef}
      className="relative border border-white/[0.07] rounded-3xl overflow-hidden hover:border-white/20 transition-colors duration-500"
      onMouseEnter={onEnter} onMouseLeave={onLeave}>

      {/* Image top */}
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <img ref={imgRef} src={story.image} alt={story.place}
          className="w-full h-full object-cover"
          style={{ willChange: 'transform' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
        {/* Color accent overlay */}
        <div className="absolute inset-0 opacity-20"
          style={{ background: `linear-gradient(135deg, ${story.color}44 0%, transparent 60%)` }} />
        {/* Rating top right */}
        <div className="absolute top-4 right-4">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
            <span style={{ color: '#facc15' }}>★</span>
            <span className="text-white text-xs">{story.rating}.0</span>
          </div>
        </div>
        {/* Season/date top left */}
        <div className="absolute top-4 left-4">
          <span className="bg-black/40 backdrop-blur-sm text-white/60 text-[9px] tracking-widest uppercase px-3 py-1 rounded-full border border-white/10">
            {story.date}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        {/* Author row */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ background: `${story.color}25`, border: `1.5px solid ${story.color}60`, color: story.color }}>
            {story.initials}
          </div>
          <div>
            <p className="text-white text-sm font-medium leading-none">{story.name}</p>
            <p className="text-white/30 text-[9px] uppercase tracking-widest mt-0.5">{story.state}</p>
          </div>
        </div>

        {/* Place */}
        <h3 className="font-[font1] uppercase leading-none mb-3"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: story.color }}>
          {story.place}
        </h3>

        {/* Quote */}
        <p className="text-white/55 text-sm italic leading-relaxed mb-4 border-l-2 pl-4"
          style={{ borderColor: `${story.color}50` }}>
          "{story.quote}"
        </p>

        {/* Story text expandable */}
        <p className={`text-white/35 text-sm leading-relaxed font-light transition-all duration-500 ${expanded ? '' : 'line-clamp-2'}`}>
          {story.story}
        </p>

        <button onClick={() => setExpanded(!expanded)}
          className="mt-2 text-[9px] uppercase tracking-widest font-light transition-colors duration-300"
          style={{ color: story.color }}>
          {expanded ? '↑ Less' : '↓ Read More'}
        </button>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-5">
          {story.tags.map((tag, i) => (
            <span key={i} className="text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: `${story.color}12`, color: `${story.color}cc`, border: `1px solid ${story.color}25` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 hover:w-full transition-all duration-700 ease-out rounded-b-3xl"
        style={{ background: `linear-gradient(90deg, ${story.color}, transparent)` }} />
    </div>
  )
}

const Agence = () => {
  const containerRef = useRef(null)
  const navigate = useNavigate()
  const formRef = useRef(null)
  const galleryRef = useRef(null)

  const [stories, setStories] = useState(INITIAL_STORIES)
  const [formOpen, setFormOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [form, setForm] = useState({ name: '', place: '', state: '', date: '', quote: '', story: '', tags: '', rating: 5 })

  useGSAP(() => {
    // Hero title
    gsap.from('.ag-hero-word', {
      yPercent: 115, opacity: 0, stagger: 0.07, duration: 1.1, ease: 'power4.out', delay: 0.2,
    })

    // Hero image strip
    gsap.from('.gallery-img', {
      scale: 1.1, opacity: 0, stagger: 0.08, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.gallery-strip', start: 'top 88%', once: true },
    })

    // Videos
    gsap.from('.video-card', {
      y: 40, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.videos-section', start: 'top 85%', once: true },
    })

    // Story cards
    gsap.from('.story-card-wrap', {
      y: 50, opacity: 0, stagger: 0.1, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: '.stories-grid', start: 'top 85%', once: true },
    })

    // Stats
    gsap.from('.ag-stat', {
      y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.ag-stats', start: 'top 88%', once: true },
    })

    // Parallax on hero images
    gsap.utils.toArray('.gallery-img').forEach(img => {
      gsap.to(img, {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
  }, { scope: containerRef })

  const toggleForm = () => {
    if (!formOpen) {
      setFormOpen(true)
      setSubmitted(false)
      setTimeout(() => {
        gsap.from(formRef.current, { y: 40, opacity: 0, duration: 0.6, ease: 'power3.out' })
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
    } else {
      gsap.to(formRef.current, {
        y: 20, opacity: 0, duration: 0.4, ease: 'power2.in',
        onComplete: () => setFormOpen(false),
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.place || !form.story) return
    const initials = form.name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    const tagArr = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    const color = COLORS[stories.length % COLORS.length]
    const newStory = {
      id: Date.now(), name: form.name, initials, place: form.place,
      state: form.state || 'India', date: form.date || 'Recently', color,
      image: `https://source.unsplash.com/600x400/?india,travel,${form.place.split(' ')[0]}`,
      quote: form.quote || `${form.place} changed something in me.`,
      story: form.story,
      tags: tagArr.length ? tagArr : ['Travel'],
      rating: form.rating,
    }
    setStories(prev => [newStory, ...prev])
    setSubmitted(true)
    setForm({ name: '', place: '', state: '', date: '', quote: '', story: '', tags: '', rating: 5 })
    setTimeout(() => { setFormOpen(false); setSubmitted(false) }, 2800)
  }

  const inputClass = "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/25 transition-colors duration-300"

  return (
    <div ref={containerRef} className="bg-[#080808] text-white min-h-screen">

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-screen flex flex-col justify-end px-5 lg:px-14 pb-16 pt-36 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(211,253,80,0.06) 0%, transparent 70%)' }} />

        <p className="text-white/25 text-[9px] uppercase tracking-[0.45em] mb-8">
          Travel Stories · Community · India
        </p>

        {/* Big title */}
        <div className="font-[font1] uppercase leading-none mb-10 overflow-hidden">
          {['Stories', 'That', 'Move You'].map((word, wi) => (
            <div key={wi} className="overflow-hidden">
              <span className="ag-hero-word block"
                style={{ fontSize: 'clamp(3.5rem, 13vw, 11rem)', lineHeight: 0.9 }}>
                {word}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <p className="text-white/35 text-sm lg:text-base font-light max-w-lg leading-relaxed">
            Real travellers. Real places. Real India. Every story here was lived, not imagined. Add yours and inspire the next wanderer.
          </p>
          <button onClick={toggleForm}
            className="group relative overflow-hidden border border-[#D3FD50]/40 text-[#D3FD50] text-[10px] uppercase tracking-[0.3em] px-10 py-4 rounded-full hover:border-[#D3FD50] transition-colors duration-500 shrink-0">
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">+ Share Your Story</span>
            <span className="absolute inset-0 bg-[#D3FD50] translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
          </button>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ══════════ PHOTO GALLERY STRIP ══════════ */}
      <section className="gallery-strip border-y border-white/[0.06] py-6 overflow-hidden">
  <div
    className="flex gap-3 px-5 lg:px-14"
    style={{ width: 'max-content' }}
    ref={el => {
      if (!el) return
      // Auto-scroll marquee using GSAP
      gsap.to(el, {
        x: () => -(el.scrollWidth / 2),
        duration: 30,
        ease: 'none',
        repeat: -1,
      })
    }}
  >
    {/* Duplicate images for seamless loop */}
    {[...INDIA_IMAGES, ...INDIA_IMAGES].map((src, i) => (
      <div key={i} className="relative shrink-0 overflow-hidden rounded-2xl group"
        style={{ width: 'clamp(200px, 22vw, 320px)', height: 'clamp(260px, 28vw, 420px)' }}>
        <img
          src={src}
          alt={`India ${i + 1}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
    ))}
  </div>
</section>

      {/* ══════════ STATS ══════════ */}
      <section className="ag-stats border-b border-white/[0.06] px-5 lg:px-14 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { num: `${stories.length}`, label: 'Stories Shared',   color: '#D3FD50' },
            { num: '28+',               label: 'States Covered',   color: '#a78bfa' },
            { num: '140+',              label: 'Places Explored',  color: '#34d399' },
            { num: '∞',                 label: 'Memories Created', color: '#fb923c' },
          ].map((s, i) => (
            <div key={i} className="ag-stat text-center lg:text-left">
              <div className="font-[font1] text-5xl lg:text-7xl leading-none" style={{ color: s.color }}>{s.num}</div>
              <p className="text-white/25 text-[9px] uppercase tracking-widest mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ VIDEO SECTION ══════════ */}
      <section className="videos-section px-5 lg:px-14 py-24 border-b border-white/[0.06]">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-white/25 text-[9px] uppercase tracking-[0.4em] mb-2">Watch & Wander</p>
            <h2 className="font-[font1] uppercase leading-none" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
              Travel Films
            </h2>
          </div>
          <p className="hidden lg:block text-white/15 text-[9px] uppercase tracking-widest">Click to play</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {TRAVEL_VIDEOS.map((v, i) => (
            <div key={i} className="video-card">
              <VideoCard video={v} />
            </div>
          ))}
        </div>
        
      </section>

      {/* ══════════ ROTATING QUOTE ══════════ */}
      <section className="px-5 lg:px-14 py-20 border-b border-white/[0.06] text-center">
        <button onClick={() => setQuoteIdx(i => (i + 1) % QUOTES.length)} className="group max-w-3xl mx-auto block">
          <div className="text-[#D3FD50] text-5xl font-serif opacity-25 mb-4">"</div>
          <p className="font-[font1] text-2xl lg:text-4xl uppercase leading-tight text-white/75 mb-5">
            {QUOTES[quoteIdx].text}
          </p>
          <p className="text-white/25 text-[9px] uppercase tracking-[0.3em]">— {QUOTES[quoteIdx].author}</p>
          <p className="text-white/15 text-[8px] uppercase tracking-widest mt-4 group-hover:text-white/30 transition-colors duration-300">
            Click for next quote →
          </p>
        </button>
      </section>

      {/* ══════════ ADD STORY FORM ══════════ */}
      {formOpen && (
        <section ref={formRef} className="px-5 lg:px-14 py-20 border-b border-white/[0.06]">
          <div className="max-w-2xl mx-auto">
            <p className="text-white/25 text-[9px] uppercase tracking-[0.4em] mb-3">Share Your Journey</p>
            <h2 className="font-[font1] text-4xl lg:text-5xl uppercase leading-none mb-10">Your Story</h2>

            {submitted ? (
              <div className="text-center py-16 border border-white/[0.07] rounded-3xl">
                <div className="text-5xl mb-4">🌿</div>
                <p className="font-[font1] text-3xl uppercase text-[#D3FD50] mb-2">Story Added!</p>
                <p className="text-white/30 text-sm">Scroll up to see your story live on the page.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div>
                    <label className="text-white/30 text-[9px] uppercase tracking-widest block mb-2">Your Name *</label>
                    <input className={inputClass} placeholder="e.g. Priya Sharma" value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div>
                    <label className="text-white/30 text-[9px] uppercase tracking-widest block mb-2">Place Visited *</label>
                    <input className={inputClass} placeholder="e.g. Spiti Valley" value={form.place}
                      onChange={e => setForm(f => ({ ...f, place: e.target.value }))} required />
                  </div>
                  <div>
                    <label className="text-white/30 text-[9px] uppercase tracking-widest block mb-2">State / Region</label>
                    <input className={inputClass} placeholder="e.g. Himachal Pradesh" value={form.state}
                      onChange={e => setForm(f => ({ ...f, state: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-white/30 text-[9px] uppercase tracking-widest block mb-2">When?</label>
                    <input className={inputClass} placeholder="e.g. June 2024" value={form.date}
                      onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="text-white/30 text-[9px] uppercase tracking-widest block mb-2">Your One-Line Quote</label>
                  <input className={inputClass} placeholder="e.g. The mountains made me feel small in the best way."
                    value={form.quote} onChange={e => setForm(f => ({ ...f, quote: e.target.value }))} />
                </div>
                <div>
                  <label className="text-white/30 text-[9px] uppercase tracking-widest block mb-2">Your Story *</label>
                  <textarea className={`${inputClass} resize-none`} rows={5}
                    placeholder="Tell us what happened. The more real, the better..."
                    value={form.story} onChange={e => setForm(f => ({ ...f, story: e.target.value }))} required />
                </div>
                <div>
                  <label className="text-white/30 text-[9px] uppercase tracking-widest block mb-2">Tags (comma separated)</label>
                  <input className={inputClass} placeholder="e.g. Trekking, Solo, Monsoon" value={form.tags}
                    onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} />
                </div>
                <div>
                  <label className="text-white/30 text-[9px] uppercase tracking-widest block mb-3">Your Rating</label>
                  <StarRating value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="submit"
                    className="group relative overflow-hidden border border-[#D3FD50]/40 text-[#D3FD50] text-[10px] uppercase tracking-[0.3em] px-10 py-4 rounded-full hover:border-[#D3FD50] transition-colors duration-500">
                    <span className="relative z-10 group-hover:text-black transition-colors duration-300">Publish Story</span>
                    <span className="absolute inset-0 bg-[#D3FD50] translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
                  </button>
                  <button type="button" onClick={toggleForm}
                    className="text-white/25 text-[10px] uppercase tracking-widest hover:text-white/50 transition-colors duration-300 px-6">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      )}

      {/* ══════════ STORIES GRID ══════════ */}
      <section className="px-5 lg:px-14 py-20">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-white/25 text-[9px] uppercase tracking-[0.4em] mb-2">Field Notes</p>
            <h2 className="font-[font1] uppercase leading-none" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
              All Stories
            </h2>
          </div>
          <button onClick={toggleForm}
            className="hidden lg:flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/30 hover:text-[#D3FD50] transition-colors duration-300 border-b border-white/10 hover:border-[#D3FD50] pb-1">
            + Add yours
          </button>
        </div>

        <div className="stories-grid grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {stories.map((story, i) => (
            <div key={story.id} className="story-card-wrap">
              <StoryCard story={story} />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ PRIYA'S NOTE ══════════ */}
      <section className="border-t border-white/[0.06] px-5 lg:px-14 py-24">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image */}
          <div className="relative shrink-0 w-64 h-80 rounded-3xl overflow-hidden">
            <img src="/src/assets/priya4.jpeg"
              alt="Priya" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <p className="text-white font-medium text-sm">Priya</p>
              <p className="text-white/40 text-[9px] uppercase tracking-widest">Founder · PrimeTravel</p>
            </div>
          </div>
          {/* Text */}
          <div className="max-w-xl">
            <div className="text-[#D3FD50] text-4xl font-serif opacity-30 mb-5">"</div>
            <p className="font-[font1] text-2xl lg:text-3xl uppercase leading-tight text-white/80 mb-6">
              India doesn't just show you places. It shows you yourself.
            </p>
            <p className="text-white/35 text-sm font-light leading-relaxed">
              I started travelling India with a backpack and no plan. Six years later, I've slept under the stars in Rajasthan, trekked glaciers in Sikkim, and eaten the most extraordinary food in the most unexpected places. This site is my love letter to this country.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="border-t border-white/[0.06] px-5 lg:px-14 py-20 text-center">
        <p className="text-white/20 text-[9px] uppercase tracking-[0.4em] mb-4">Ready to explore?</p>
        <h2 className="font-[font1] uppercase leading-none mb-10"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
          Find Your <span className="text-white/20">Place</span>
        </h2>
        <button onClick={() => navigate('/projects')}
          className="group relative overflow-hidden border border-white/20 text-[10px] uppercase tracking-[0.3em] px-12 py-5 rounded-full hover:border-[#D3FD50] transition-colors duration-500">
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">Explore Places</span>
          <span className="absolute inset-0 bg-[#D3FD50] translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
        </button>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <div className="border-t border-white/[0.04] px-5 lg:px-14 py-8 flex flex-col lg:flex-row items-center justify-between gap-4">
        <span className="font-[font1] text-xl uppercase">
          <span className="text-white">Prime</span><span className="text-[#22c55e]">Travel</span>
        </span>
        <span className="text-white/20 text-[9px] uppercase tracking-widest">
          Made with <span className="text-red-400">♥</span> by Priya · © 2026
        </span>
        <div className="flex gap-6">
          {[{ l: 'Home', p: '/' }, { l: 'Places', p: '/projects' }].map(({ l, p }) => (
            <button key={l} onClick={() => navigate(p)}
              className="text-white/20 text-[9px] uppercase tracking-widest hover:text-white transition-colors duration-300">
              {l}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Agence