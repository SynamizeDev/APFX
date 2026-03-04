'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
    Sphere,
    Float,
    Stars,
} from '@react-three/drei'
import * as THREE from 'three'

/* =========================================================
   APFX Global Network Globe
   Premium, restrained, institutional visualization
   ---------------------------------------------------------
   • Subtle rotation + float (no gimmicks)
   • Clear regional presence (liquidity hubs)
   • Performance-conscious materials & lights
   • Brand-aligned emerald accent
   ========================================================= */

function RotatingGlobe() {
    const globeRef = useRef<THREE.Mesh>(null!)

    useFrame(() => {
        // Slow, authoritative rotation (institutional, not playful)
        globeRef.current.rotation.y += 0.0018
    })

    /**
     * Major liquidity / operations hubs
     * Positions are intentionally abstracted (not geographic-accurate)
     * to keep the visual editorial rather than literal.
     */
    const nodes = useMemo(
        () => [
            { pos: [1.45, 0.2, 0.9], label: 'Dubai' },
            { pos: [1.25, -0.45, 1.55], label: 'Mumbai' },
        ],
        []
    )

    return (
        <group>
            {/* ── Base Globe ─────────────────────────────── */}
            <Sphere ref={globeRef} args={[2, 64, 64]}>
                <meshStandardMaterial
                    color="#0B1020"
                    roughness={0.65}
                    metalness={0.35}
                    emissive="#00C896"
                    emissiveIntensity={0.045}
                />
            </Sphere>

            {/* ── Subtle Wireframe Overlay ───────────────── */}
            <Sphere args={[2.02, 32, 32]}>
                <meshBasicMaterial
                    color="#00C896"
                    wireframe
                    transparent
                    opacity={0.045}
                />
            </Sphere>

            {/* ── Atmospheric Halo ───────────────────────── */}
            <Sphere args={[2.12, 32, 32]}>
                <meshBasicMaterial
                    color="#00C896"
                    transparent
                    opacity={0.018}
                    side={THREE.BackSide}
                />
            </Sphere>

            {/* ── Network Nodes ──────────────────────────── */}
            {nodes.map((node, i) => (
                <group key={i} position={node.pos as any}>
                    {/* Core point */}
                    <mesh>
                        <sphereGeometry args={[0.045, 18, 18]} />
                        <meshBasicMaterial color="#00C896" />
                    </mesh>

                    {/* Glow pulse */}
                    <mesh scale={[1.8, 1.8, 1.8]}>
                        <sphereGeometry args={[0.045, 18, 18]} />
                        <meshBasicMaterial
                            color="#00C896"
                            transparent
                            opacity={0.18}
                        />
                    </mesh>
                </group>
            ))}
        </group>
    )
}

export default function Globe() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            gl={{
                antialias: false,
                powerPreference: 'high-performance',
                stencil: false,
                depth: true,
            }}
            dpr={[1, 2]}
        >
            {/* ── Lighting ──────────────────────────────── */}
            <ambientLight intensity={0.45} />

            {/* Primary accent light */}
            <pointLight
                position={[10, 8, 10]}
                intensity={1}
                color="#00C896"
            />

            {/* Soft fill for depth */}
            <pointLight
                position={[-8, -6, -10]}
                intensity={0.45}
            />

            {/* ── Motion Wrapper ────────────────────────── */}
            <Float
                speed={1.4}
                rotationIntensity={0.4}
                floatIntensity={0.45}
            >
                <RotatingGlobe />
            </Float>

            {/* ── Background Stars (low density, premium) ─ */}
            <Stars
                radius={120}
                depth={60}
                count={1800}
                factor={4}
                saturation={0}
                fade
                speed={0.6}
            />
        </Canvas>
    )
}