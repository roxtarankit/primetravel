import { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavbarColorContext, NavbarContext } from '../../context/NavContext'

const Navbar = () => {
  const navGreenRef = useRef(null)
  const [navOpen, setNavOpen]   = useContext(NavbarContext)
  const [navColor, setNavColor] = useContext(NavbarColorContext)
  const navigate = useNavigate()

  return (
    <div className='z-50 flex fixed top-0 w-full items-start justify-between'>

      {/* ── LOGO — click goes to Home ── */}
      <div
        className='lg:p-5 p-2 cursor-pointer select-none'
        onClick={() => navigate('/')}
      >
        <div className='lg:w-36 w-24'>
  <h1 className="text-3xl font-extrabold tracking-wide">
    <span style={{ color: '#ffffff' }}>Prime</span>
    <span style={{ color: '#22c55e' }}>Travel</span>
  </h1>
</div>
      </div>

      {/* ── MENU BUTTON — exact original behaviour ── */}
      <div
        onClick={() => setNavOpen(true)}
        onMouseEnter={() => { navGreenRef.current.style.height = '100%' }}
        onMouseLeave={() => { navGreenRef.current.style.height = '0%'  }}
        className='lg:h-16 h-10 bg-black relative lg:w-[12vw] w-30 cursor-pointer'
      >
        <div
          ref={navGreenRef}
          className='bg-[#D3FD50] transition-all duration-300 absolute top-0 h-0 w-full'
        />
        <div className='relative h-full lg:px-12 px-8 flex flex-col justify-center items-end lg:gap-1.5 gap-0.5'>
          <div className="lg:w-18 w-12 h-0.5 bg-white" />
          <div className="lg:w-10 w-6 h-0.5 bg-white" />
        </div>
      </div>

    </div>
  )
}

export default Navbar