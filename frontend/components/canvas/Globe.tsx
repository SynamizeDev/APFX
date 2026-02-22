'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Stars, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function RotatingGlobe() {
    const meshRef = useRef<THREE.Mesh>(null!)

    useFrame((state) => {
        meshRef.current.rotation.y += 0.002
    })

    // Mock dots for major regions (UAE, India, UK, USA)
    const dots = useMemo(() => {
        return [
            { pos: [1.2, 0.8, 1.2], label: 'London' },
            { pos: [1.5, 0.2, 0.8], label: 'Dubai' },
            { pos: [1.3, -0.4, 1.5], label: 'Mumbai' },
            { pos: [-1.4, 0.6, 1.0], label: 'New York' },
            { pos: [0.8, -1.2, 1.5], label: 'Singapore' },
        ]
    }, [])

    return (
        <group>
            {/* Base Globe */}
            <Sphere ref={meshRef} args={[2, 64, 64]}>
                <meshStandardMaterial
                    color="#101827"
                    roughness={0.7}
                    metalness={0.4}
                    emissive="#00C896"
                    emissiveIntensity={0.05}
                />
            </Sphere>

            {/* Wireframe overlay */}
            <Sphere args={[2.02, 32, 32]}>
                <meshBasicMaterial color="#00C896" wireframe transparent opacity={0.05} />
            </Sphere>

            {/* Atmospheric glow */}
            <Sphere args={[2.1, 32, 32]}>
                <meshBasicMaterial color="#00C896" transparent opacity={0.02} side={THREE.BackSide} />
            </Sphere>

            {/* Region Highlights */}
            {dots.map((dot, i) => (
                <mesh key={i} position={dot.pos as any}>
                    <sphereGeometry args={[0.04, 16, 16]} />
                    <meshBasicMaterial color="#00C896" />
                    {/* Subtle pulse */}
                    <mesh position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
                        <sphereGeometry args={[0.04, 16, 16]} />
                        <meshBasicMaterial color="#00C896" transparent opacity={0.2} />
                    </mesh>
                </mesh>
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
                stencil: false
            }}
            dpr={[1, 2]}
        >
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00C896" />
            <pointLight position={[-10, -5, -10]} intensity={0.5} />
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <RotatingGlobe />
            </Float>
            {/* Low density stars for depth */}
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
    )
}
