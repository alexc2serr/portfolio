import React from 'react'

export default function SocialButtons () {
  return (
    <div style={{ display: 'flex', gap: '0.9rem', marginTop: '1rem' }}>
      <a className="social-btn" href="https://www.linkedin.com/in/alejandro-serrano-calvo-92b02623a/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.49 6 1.11 6 0 4.88 0 3.5 0 2.11 1.12 1 2.49 1 3.86 1 4.98 2.11 4.98 3.5zM.2 8.98h4.53V24H.2V8.98zM9.38 8.98h4.34v2.06h.06c.6-1.14 2.07-2.34 4.26-2.34 4.55 0 5.39 3 5.39 6.9V24h-4.54v-7.5c0-1.79-.03-4.09-2.49-4.09-2.49 0-2.87 1.94-2.87 3.96V24H9.38V8.98z" fill="currentColor" />
        </svg>
        <span style={{ marginLeft: 8 }}>LinkedIn</span>
      </a>

      <a className="social-btn" href="https://github.com/alexc2serr" target="_blank" rel="noreferrer" aria-label="GitHub">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 .5C5.73.5.74 5.5.74 11.77c0 5 3.29 9.25 7.86 10.74.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.86-1.54-3.86-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.17 1.76 1.17 1.02 1.75 2.66 1.24 3.3.95.1-.74.4-1.24.72-1.53-2.55-.3-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.3-.51-1.52.11-3.17 0 0 .96-.31 3.15 1.17.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.17 3.15-1.17.62 1.65.23 2.87.11 3.17.74.8 1.18 1.82 1.18 3.07 0 4.4-2.7 5.35-5.27 5.64.41.36.77 1.1.77 2.22 0 1.6-.02 2.88-.02 3.27 0 .31.21.68.8.56 4.57-1.49 7.86-5.74 7.86-10.74C23.26 5.5 18.27.5 12 .5z" fill="currentColor" />
        </svg>
        <span style={{ marginLeft: 8 }}>GitHub</span>
      </a>
    </div>
  )
}
