import React, { useEffect, useRef, useState } from 'react'

export default function SkillsNet ({ skills }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const colorsRef = useRef({})
  const [tooltip, setTooltip] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = canvas.width = containerRef.current.clientWidth
    let height = canvas.height = containerRef.current.clientHeight

    function readColors () {
      const style = getComputedStyle(document.documentElement)
      colorsRef.current = {
        accent: style.getPropertyValue('--accent').trim() || '#7c3aed',
        text: style.getPropertyValue('--text').trim() || '#0f172a',
        muted: style.getPropertyValue('--muted').trim() || '#55607a',
        isDark: document.documentElement.classList.contains('dark')
      }
    }

    readColors()

    // observe theme class changes so contrast updates on toggle
    const mo = new MutationObserver(() => readColors())
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    // nodes
    const nodes = skills.map((s, i) => ({
      id: s.id,
      label: s.label,
      desc: s.desc,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: 28
    }))

    const mouse = { x: -9999, y: -9999 }
    let hoveredId = null
    let paused = false

    function clampNode (n) {
      const pad = 12
      n.x = Math.max(n.r + pad, Math.min(n.x, width - n.r - pad))
      n.y = Math.max(n.r + pad, Math.min(n.y, height - n.r - pad))
    }

    // ensure initial nodes are within bounds
    nodes.forEach(clampNode)

    function resize () {
      width = canvas.width = containerRef.current.clientWidth
      height = canvas.height = containerRef.current.clientHeight
      // ensure nodes stay inside after resize
      nodes.forEach(clampNode)
    }

    function findHovered () {
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < n.r * 1.4) return n
      }
      return null
    }

    function tick () {
      ctx.clearRect(0, 0, width, height)
      const { accent, isDark, text } = colorsRef.current

      // move nodes only when not paused
      if (!paused) {
        nodes.forEach((n) => {
          n.x += n.vx
          n.y += n.vy
          // bounce and clamp
          if (n.x < n.r + 12) { n.x = n.r + 12; n.vx *= -1 }
          if (n.x > width - n.r - 12) { n.x = width - n.r - 12; n.vx *= -1 }
          if (n.y < n.r + 12) { n.y = n.r + 12; n.vy *= -1 }
          if (n.y > height - n.r - 12) { n.y = height - n.r - 12; n.vy *= -1 }
        })
      }

      // draw lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 220) {
            ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(20,20,20,0.08)'
            ctx.lineWidth = isDark ? 1.8 : 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // draw nodes
      nodes.forEach((n) => {
        const isHover = hoveredId === n.id

        ctx.beginPath()
        ctx.fillStyle = isHover ? accent : (isDark ? 'rgba(255,255,255,0.12)' : 'rgba(20,20,20,0.12)')
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,0.06)'
        ctx.lineWidth = 1
        ctx.moveTo(n.x, n.y)
        ctx.arc(n.x, n.y, isHover ? n.r * 1.25 : n.r, 0, Math.PI * 2)
        if (isHover) {
          ctx.save()
          ctx.shadowColor = accent
          ctx.shadowBlur = 18
          ctx.fill()
          ctx.restore()
        } else {
          ctx.fill()
        }
        ctx.stroke()

        ctx.fillStyle = isHover ? '#ffffff' : text
        ctx.font = '700 13px Inter, system-ui'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(n.label, n.x, n.y)
      })

      raf = requestAnimationFrame(tick)
    }

    let raf = requestAnimationFrame(tick)

    function onMove (e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left
      mouse.y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top

      const hovered = findHovered()
      if (hovered) {
        // pause the animation and show tooltip
        if (hoveredId !== hovered.id) {
          hoveredId = hovered.id
          paused = true
          setTooltip({ x: hovered.x, y: hovered.y, label: hovered.label, desc: hovered.desc })
        } else {
          setTooltip((t) => t ? ({ ...t, x: hovered.x, y: hovered.y }) : ({ x: hovered.x, y: hovered.y, label: hovered.label, desc: hovered.desc }))
        }
      } else if (hoveredId !== null) {
        // resume motion
        hoveredId = null
        paused = false
        setTooltip(null)
      }
    }

    function onLeave () {
      mouse.x = -9999
      mouse.y = -9999
      hoveredId = null
      paused = false
      setTooltip(null)
    }

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('touchmove', onMove, { passive: true })
    canvas.addEventListener('mouseleave', onLeave)
    canvas.addEventListener('touchend', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('touchmove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      canvas.removeEventListener('touchend', onLeave)
      mo.disconnect()
    }
  }, [skills]) // no tooltip dependency to avoid reinitialization

  return (
    <div ref={containerRef} className="skills-net">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      {tooltip && (
        <div className="skills-tooltip" style={{ left: Math.max(40, Math.min(tooltip.x, containerRef.current.clientWidth - 40)) + 'px', top: Math.max(40, tooltip.y) + 'px' }}>
          <strong>{tooltip.label}</strong> — {tooltip.desc}
        </div>
      )}
    </div>
  )
}
