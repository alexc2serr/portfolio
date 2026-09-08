import React from 'react'

export default function ProjectCard ({ project, index, onDetails }) {
  return (
    <article className="project-card">
      <div className="project-thumb" aria-hidden>
        <span className="project-number">0{index + 1}</span>
        <span className="project-mark">+</span>
      </div>
      <div className="project-info">
        <div className="project-title-row">
          <h4>{project.title}</h4>
          <span className="project-arrow" aria-hidden>↗</span>
        </div>
        <p>{project.description}</p>
        <div className="project-meta">
          {project.tech.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <div className="actions">
          <a href={project.link} target="_blank" rel="noreferrer">View project <span aria-hidden>↗</span></a>
          <button onClick={onDetails}>Details</button>
        </div>
      </div>
    </article>
  )
}
