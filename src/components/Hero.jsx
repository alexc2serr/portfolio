import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { TorusKnot } from '@react-three/drei'

function AnimatedKnot ({ color }) {
  const ref = useRef()
  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.y = t * 0.3 + (mouse.x || 0) * 0.3
      ref.current.rotation.x = Math.sin(t / 2) * 0.2 + (mouse.y || 0) * 0.08
      ref.current.position.x = Math.sin(t * 0.5) * 0.08
    }
  })
  return (
    <TorusKnot ref={ref} args={[1.2, 0.35, 128, 32]} scale={1.2}>
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
    </TorusKnot>
  )
}

export default function Hero () {
  const [accent, setAccent] = useState('#7c3aed')

  useEffect(() => {
    const style = getComputedStyle(document.documentElement)
    const v = style.getPropertyValue('--accent') || '#7c3aed'
    setAccent(v.trim())
  }, [])

  return (
    <div className="canvas-wrap">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 3]} intensity={0.8} />
        <AnimatedKnot color={accent} />
      </Canvas>
    </div>
  )
}
