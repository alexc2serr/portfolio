import React, { useEffect, useState } from 'react'
import Hero from './components/Hero'
import ThemeToggle from './components/ThemeToggle'
import ProjectCard from './components/ProjectCard'
import Nav from './components/Nav'
import SkillsNet from './components/SkillsNet'
import SocialButtons from './components/SocialButtons'
import ProjectModal from './components/ProjectModal'
import ContactPanel from './components/ContactPanel'
import WhyHire from './components/WhyHire'
import './styles.css'

const skills = [
  { id: 'python', label: 'Python', desc: 'Scripting, automation, and tooling.' },
  { id: 'networking', label: 'Networking', desc: 'TCP/IP, routing, and packet analysis.' },
  { id: 'linux', label: 'Linux', desc: 'Server admin and shell scripting.' },
  { id: 'websec', label: 'Web Security', desc: 'Vulnerabilities, testing, and remediation.' },
  { id: 'threejs', label: 'Three.js', desc: '3D visuals and WebGL.' },
  { id: 'react', label: 'React', desc: 'Modern front-end development.' },
  { id: 'git', label: 'Git', desc: 'Version control and workflows.' },
  { id: 'docker', label: 'Docker', desc: 'Containerization and deployment.' },
  { id: 'wireshark', label: 'Wireshark', desc: 'Packet inspection and analysis.' },
  { id: 'sql', label: 'SQL', desc: 'Databases and queries.' }
]

const projects = [
  {
    title: 'Hospital Information System',
    description: 'Enterprise-grade cyber-physical hospital information system.',
    link: '#',
    tech: ['Python', 'RBAC', 'MAC', 'Security'],
    details:
      'Secure hospital information system implementing role-based and mandatory access control, integrated with real-time location services in a simulated environment.'
  },
  {
    title: 'E-Commerce Web Platform',
    description: 'Full-stack e-commerce web application.',
    link: '#',
    tech: ['React', 'JavaScript', 'SQL'],
    details:
      'E-commerce platform with product management, user authentication, and database-backed transactions, focused on clean architecture and scalability.'
  },
  {
    title: 'UNO Cards Game',
    description: 'Classic UNO card game implemented in C.',
    link: '#',
    tech: ['C', 'Data Structures'],
    details:
      'Console-based UNO game using linked lists and structured programming to manage game logic and player turns.'
  },
  {
    title: 'Encrypted Account Manager',
    description: 'Secure credential and account management tool.',
    link: '#',
    tech: ['Cryptography', 'Security', 'Python'],
    details:
      'Account manager focused on encryption, secure storage, and basic key management concepts.'
  },
  {
    title: 'European Projects For Circe',
    description: 'Public Projects for Fundación CIRCE.',
    link: '#',
    tech: ['Enviromental', 'Python', 'Full Stack Development'],
    details:
      'Web applications and data analysis tools supporting various European environmental projects led by Fundación CIRCE.'
  },
  {
    title: 'Private Projects for Circe',
    description: 'Secure, internal projects for Fundación CIRCE.',
    link: '#',
    tech: ['Cryptography', 'Security', 'Python'],
    details:
      'Internal tools and applications with a focus on data security and privacy for Fundación CIRCE.'
  }
];

export default function App () {
  const [theme, setTheme] = useState('dark')
  const [active, setActive] = useState('home')
  const [selected, setSelected] = useState(null)
  const [messageSent, setMessageSent] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    // Lightweight parallax (keeps earlier behavior)
    const els = Array.from(document.querySelectorAll('[data-parallax]'))

    function updatePositions () {
      const viewportHeight = window.innerHeight
      els.forEach((el) => {
        const speed = Number(el.dataset.parallaxSpeed) || 0.08
        const rect = el.getBoundingClientRect()
        const offset = (rect.top - viewportHeight / 2)
        const y = -offset * speed
        el.style.transform = `translate3d(0, ${y}px, 0)`
      })
    }

    let ticking = false
    function onScroll () {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updatePositions()
          ticking = false
        })
        ticking = true
      }
    }

    updatePositions()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updatePositions)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updatePositions)
    }
  }, [])

  useEffect(() => {
    // Active nav link using IntersectionObserver centered in viewport
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry closest to center by intersectionRatio
        let topEntry = null
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!topEntry || entry.intersectionRatio > topEntry.intersectionRatio) topEntry = entry
          }
        })
        if (topEntry) setActive(topEntry.target.id)
      },
      { root: null, threshold: [0.25, 0.5, 0.75], rootMargin: '-20% 0px -20% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  function openProject (project) {
    setSelected(project)
  }

  function closeProject () {
    setSelected(null)
  }

  function submitContact (e) {
    e.preventDefault()
    // basic client-side feedback (no backend)
    setMessageSent(true)
    setTimeout(() => setMessageSent(false), 4000)
    e.target.reset()
  }

  return (
    <div className="site">
      <Nav active={active} />

      <header className="site-header">
        <div className="brand">
          <h1>Alejandro Serrano</h1>
          <p className="subtitle">Computer Science Engineer & Cybersecurity</p>
        </div>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </header>

      <main>
        <section id="home" className="hero-section" data-parallax data-parallax-speed="0.06">
          <Hero />
          <div className="intro" data-parallax data-parallax-speed="0.12">
            <h2>Hi, I&apos;m Alejandro</h2>
            <p>
              I am Alejandro Serrano, a student from Zaragoza, Spain studying a
              Bachelor in Computer Science and Cybersecurity.
            </p>
            <SocialButtons />
          </div>
        </section>

        <section id="skills" className="section" data-parallax data-parallax-speed="0.04">
          <h3>Skills</h3>
          <p className="muted">Hover a node to see a short description</p>
          <SkillsNet skills={skills} />
        </section>

        <section id="projects" className="section" data-parallax data-parallax-speed="0.02">
          <h3>Projects</h3>
          <div className="projects-grid">
            {projects.map((p) => (
              <ProjectCard key={p.title} project={p} onDetails={() => openProject(p)} />
            ))}
          </div>
        </section>

        <WhyHire />

        <section id="contact" className="section contact">
          <h3>Contact</h3>
          <p className="muted">Connect with me on LinkedIn or send an email — visually and quickly.</p>
          <div className="contact-center">
            <ContactPanel />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Alejandro Serrano</p>
      </footer>

      {selected && <ProjectModal project={selected} onClose={closeProject} />}
    </div>
  )
}
