import React from 'react'

export default function ProjectModal ({ project, onClose }) {
  return (
    <div className="project-modal" role="dialog" aria-modal="true">
      <div className="overlay" onClick={onClose} />
      <div className="panel">
        <button className="close" aria-label="Close" onClick={onClose}>✕</button>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <div style={{ marginTop: '0.8rem', color: 'var(--muted)' }}>{project.details}</div>
        <div style={{ marginTop: '1rem' }}>
          <strong>Tech:</strong> {project.tech.join(', ')}
        </div>
        <div style={{ marginTop: '1rem' }}>
          <a href={project.link} target="_blank" rel="noreferrer">Open project</a>
        </div>
      </div>
    </div>
  )
}
