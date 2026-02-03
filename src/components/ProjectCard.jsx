import React from 'react'

export default function ProjectCard ({ project, onDetails }) {
  return (
    <article className="project-card">
      <div className="project-thumb" aria-hidden />
      <div className="project-info">
        <h4>{project.title}</h4>
        <p>{project.description}</p>
        <div className="project-meta">
          {project.tech.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <div className="actions">
          <a href={project.link} target="_blank" rel="noreferrer">View</a>
          {' • '}
          <button onClick={onDetails}>Details</button>
        </div>
      </div>
    </article>
  )
}
