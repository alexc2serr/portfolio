import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

function FloatCard ({ pos, label, url, color }) {
  const ref = useRef()
  const local = useRef({ hover: false, scale: 1 })

  useFrame((state, delta) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    // subtle rotation and float
    ref.current.rotation.y = Math.sin(t * 0.6) * 0.08
    ref.current.rotation.x = Math.cos(t * 0.3) * 0.03

    // smooth scale animation
    const target = local.current.hover ? 1.12 : 1
    local.current.scale += (target - local.current.scale) * Math.min(0.16, delta * 10)
    ref.current.scale.setScalar(local.current.scale)

    // gentle bobbing
    ref.current.position.y = pos[1] + Math.sin(t * 1.2 + pos[0]) * 0.06
  })

  function onHover (v, e) {
    e.stopPropagation()
    local.current.hover = v
  }

  return (
    <group ref={ref} position={pos} onPointerOver={(e) => onHover(true, e)} onPointerOut={(e) => onHover(false, e)}>
      <mesh castShadow>
        <boxGeometry args={[2.2, 0.9, 0.44]} />
        <meshStandardMaterial color={color} metalness={0.45} roughness={0.32} emissive={new THREE.Color(color).multiplyScalar(0.08)} />
      </mesh>

      {/* subtle ground ring for depth */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <circleGeometry args={[0.95, 32]} />
        <meshStandardMaterial color={color} transparent opacity={0.12} />
      </mesh>

      <Html center position={[0, 0, 0.3]} style={{ pointerEvents: 'auto' }}>
        <a className="contact-card" href={url} target="_blank" rel="noreferrer" aria-label={label} onMouseEnter={(e)=>onHover(true,e)} onMouseLeave={(e)=>onHover(false,e)}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            {label === 'Email' ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M2 6v12h20V6l-10 6L2 6z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.49 6 1.11 6 0 4.88 0 3.5 0 2.11 1.12 1 2.49 1 3.86 1 4.98 2.11 4.98 3.5zM.2 8.98h4.53V24H.2V8.98zM9.38 8.98h4.34v2.06h.06c.6-1.14 2.07-2.34 4.26-2.34 4.55 0 5.39 3 5.39 6.9V24h-4.54v-7.5c0-1.79-.03-4.09-2.49-4.09-2.49 0-2.87 1.94-2.87 3.96V24H9.38V8.98z" fill="currentColor" />
              </svg>
            )}
            <strong style={{ fontSize: 17 }}>{label}</strong>
          </span>
        </a>
      </Html>
    </group>
  )
}

export default function ContactPanel () {
  const [accent, setAccent] = useState('#7c3aed')

  useEffect(() => {
    const style = getComputedStyle(document.documentElement)
    setAccent(style.getPropertyValue('--accent').trim() || '#7c3aed')
  }, [])

  return (
    <div className="contact-canvas" style={{ width: 420, height: 200 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[2, 2, 5]} intensity={0.6} />
        <directionalLight position={[-2, -2, 3]} intensity={0.25} />
        <FloatCard pos={[-3.2, 0.1, 0]} label="Email" url="mailto:hello@example.com" color={accent} />
        <FloatCard pos={[3.2, -0.1, 0]} label="LinkedIn" url="https://www.linkedin.com/in/alejandro-serrano-calvo-92b02623a/" color={accent} />
      </Canvas>
    </div>
  )
}
