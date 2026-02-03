import React, { useState, useRef, useEffect } from 'react'

export default function Nav ({ active }) {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ]

  useEffect(() => {
    const node = navRef.current
    function onScroll () {
      if (!node) return
      const scrolled = window.scrollY > 36
      node.classList.toggle('scrolled', scrolled)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav ref={navRef} className="nav" aria-label="Main navigation">
      <div className="nav-inner">
        <div className="nav-brand">Alejandro</div>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">☰</button>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={active === l.id ? 'active' : ''} aria-current={active === l.id ? 'true' : 'false'} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
