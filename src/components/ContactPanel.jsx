import React from 'react'

export default function ContactPanel () {
  return (
    <div className="contact-canvas">
      <a className="contact-link" href="mailto:hello@example.com">
        <span className="contact-icon" aria-hidden>✉</span>
        <span><strong>Email</strong><small>hello@example.com</small></span>
        <span aria-hidden>↗</span>
      </a>
      <a className="contact-link" href="https://www.linkedin.com/in/alejandro-serrano-calvo-92b02623a/" target="_blank" rel="noreferrer">
        <span className="contact-icon" aria-hidden>in</span>
        <span><strong>LinkedIn</strong><small>Connect professionally</small></span>
        <span aria-hidden>↗</span>
      </a>
    </div>
  )
}
