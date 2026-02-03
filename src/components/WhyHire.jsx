import React from 'react'

export default function WhyHire () {
  const cards = [
    {
      title: 'Security-first mindset',
      desc: 'I design systems with security in mind and practice secure development and testing.'
    },
    {
      title: 'Hands-on skills',
      desc: 'Linux, networking, scripting and Three.js — delivering practical, demonstrable results.'
    },
    {
      title: 'Fast learner & team player',
      desc: 'Quickly picks up tools, follows best practices, and communicates clearly with teams.'
    }
  ]

  return (
    <section id="hire" className="section why-hire">
      <h3>Why hire me?</h3>
      <p className="muted">Short, impact-oriented strengths that make me ready for internships or junior roles.</p>

      <div className="hire-grid">
        {cards.map((c) => (
          <article key={c.title} className="hire-card">
            <div className="badge">✓</div>
            <h4>{c.title}</h4>
            <p className="muted">{c.desc}</p>
          </article>
        ))}
      </div>

      <div className="hire-cta">
        <a className="btn-cta" href="mailto:hello@example.com?subject=Hiring%20Inquiry%20-%20Alejandro%20Serrano">Hire me — Contact</a>
        <a className="btn-link" href="/resume.txt" download>Download resume</a>
      </div>
    </section>
  )
}
