'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
    const ref = useRef<THREE.Points>(null!)

    // Generate 3000 random particles in a sphere
    const positions = useMemo(() => {
        const count = 3000
        const arr = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            const r = 1.5 + Math.random() * 2
            arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            arr[i * 3 + 2] = r * Math.cos(phi)
        }
        return arr
    }, [])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        ref.current.rotation.y = t * 0.04
        ref.current.rotation.x = Math.sin(t * 0.02) * 0.1
    })

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled>
            <PointMaterial
                transparent
                color="#00C896"
                size={0.008}
                sizeAttenuation
                depthWrite={false}
                opacity={0.6}
            />
        </Points>
    )
}

function Grid() {
    const ref = useRef<THREE.GridHelper>(null!)

    useFrame((state) => {
        ref.current.position.z = (state.clock.getElapsedTime() * 0.3) % 1
    })

    return (
        <gridHelper
            ref={ref}
            args={[30, 30, '#1A2235', '#1A2235']}
            position={[0, -1.5, 0]}
            rotation={[0, 0, 0]}
        />
    )
}

export default function HeroCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 3], fov: 60 }}
            gl={{
                antialias: false, // Performance boost for high-DPI screens
                powerPreference: 'high-performance',
                stencil: false,
                depth: false
            }}
            dpr={[1, 2]} // Support high-DPI without excessive rendering
            style={{ background: 'transparent' }}
        >
            <ambientLight intensity={0.5} />
            <ParticleField />
            <Grid />
        </Canvas>
    )
}
