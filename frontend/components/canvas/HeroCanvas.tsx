'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* =========================================================
   APFX Hero Canvas
   Ambient market-energy visualization
   ---------------------------------------------------------
   • Subtle, institutional particle motion
   • Forward-moving grid = progress / momentum
   • Zero interaction cost, high performance
   • Designed to sit behind hero copy
   ========================================================= */

function ParticleField() {
    const ref = useRef<THREE.Points>(null!)

    /**
     * Generate a controlled particle cloud.
     * Distribution is spherical but biased outward
     * to avoid visual clutter in the center.
     */
    const positions = useMemo(() => {
        const count = 3000
        const arr = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            const r = 1.6 + Math.random() * 2.2

            arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            arr[i * 3 + 2] = r * Math.cos(phi)
        }

        return arr
    }, [])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        // Slow orbital drift — calm, institutional
        ref.current.rotation.y = t * 0.035
        ref.current.rotation.x = Math.sin(t * 0.018) * 0.08
    })

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled>
            <PointMaterial
                transparent
                color="#00C896"
                size={0.0075}
                sizeAttenuation
                depthWrite={false}
                opacity={0.55}
            />
        </Points>
    )
}

function GridPlane() {
    const ref = useRef<THREE.GridHelper>(null!)

    useFrame((state) => {
        // Continuous forward motion = scale & momentum
        ref.current.position.z =
            (state.clock.getElapsedTime() * 0.25) % 1
    })

    return (
        <gridHelper
            ref={ref}
            args={[32, 32, '#1A2235', '#1A2235']}
            position={[0, -1.6, 0]}
            rotation={[0, 0, 0]}
        />
    )
}

export default function HeroCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 3.2], fov: 58 }}
            gl={{
                antialias: false, // deliberate: cleaner + faster
                powerPreference: 'high-performance',
                stencil: false,
                depth: false,
            }}
            dpr={[1, 2]}
            style={{
                background: 'transparent',
                pointerEvents: 'none', // hero text always wins
            }}
        >
            {/* ── Lighting ─────────────────────────────── */}
            <ambientLight intensity={0.55} />

            {/* ── Scene ───────────────────────────────── */}
            <ParticleField />
            <GridPlane />
        </Canvas>
    )
}