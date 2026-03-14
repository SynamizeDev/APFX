'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
    Sphere,
    Float,
    Stars,
    QuadraticBezierLine,
    Html,
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

type Region = 'Asia' | 'Europe' | 'Americas' | 'Middle East' | 'None'

const getActiveSession = (): Region => {
    const date = new Date()
    const utcHour = date.getUTCHours() + date.getUTCMinutes() / 60

    if (utcHour >= 0 && utcHour < 9) return 'Asia'
    if (utcHour >= 6 && utcHour < 14) return 'Middle East' // overlaps
    if (utcHour >= 7 && utcHour < 16.5) return 'Europe'
    if (utcHour >= 13.5 && utcHour < 20) return 'Americas'
    return 'Asia' // default fallback / Tokyo Sydney overlap
}

// Helper to convert lat/lon to 3D point on a sphere
const latLongToVector3 = (lat: number, lon: number, radius: number): [number, number, number] => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    const x = -(radius * Math.sin(phi) * Math.cos(theta))
    const z = radius * Math.sin(phi) * Math.sin(theta)
    const y = radius * Math.cos(phi)
    return [x, y, z]
}

// 1. Financial Hubs
const HUBS = [
    { name: 'London', lat: 51.5074, lon: -0.1278, region: 'Europe' },
    { name: 'New York', lat: 40.7128, lon: -74.0060, region: 'Americas' },
    { name: 'Dubai', lat: 25.2048, lon: 55.2708, region: 'Middle East' },
    { name: 'Singapore', lat: 1.3521, lon: 103.8198, region: 'Asia' },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503, region: 'Asia' },
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777, region: 'Asia' },
    { name: 'Frankfurt', lat: 50.1109, lon: 8.6821, region: 'Europe' },
    { name: 'Hong Kong', lat: 22.3193, lon: 114.1694, region: 'Asia' },
    { name: 'Chicago', lat: 41.8781, lon: -87.6298, region: 'Americas' },
    { name: 'Toronto', lat: 43.6510, lon: -79.3470, region: 'Americas' },
    { name: 'Zurich', lat: 47.3769, lon: 8.5417, region: 'Europe' },
    { name: 'Abu Dhabi', lat: 24.4539, lon: 54.3773, region: 'Middle East' },
    { name: 'Shanghai', lat: 31.2304, lon: 121.4737, region: 'Asia' },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093, region: 'Asia' },
    { name: 'Johannesburg', lat: -26.2041, lon: 28.0473, region: 'Europe' },
    { name: 'São Paulo', lat: -23.5505, lon: -46.6333, region: 'Americas' },
    { name: 'Mexico City', lat: 19.4326, lon: -99.1332, region: 'Americas' },
    { name: 'Seoul', lat: 37.5665, lon: 126.9780, region: 'Asia' },
    { name: 'Bangkok', lat: 13.7563, lon: 100.5018, region: 'Asia' },
    { name: 'Kuala Lumpur', lat: 3.1390, lon: 101.6869, region: 'Asia' },
    { name: 'Istanbul', lat: 41.0082, lon: 28.9784, region: 'Europe' }
]

const MINOR_NODES = [
    { name: 'Madrid', lat: 40.4168, lon: -3.7038 },
    { name: 'Rome', lat: 41.9028, lon: 12.4964 },
    { name: 'Athens', lat: 37.9838, lon: 23.7275 },
    { name: 'Jakarta', lat: -6.2088, lon: 106.8456 },
    { name: 'Ho Chi Minh', lat: 10.8231, lon: 106.6297 },
    { name: 'Manila', lat: 14.5995, lon: 120.9842 },
    { name: 'Buenos Aires', lat: -34.6037, lon: -58.3816 },
    { name: 'Santiago', lat: -33.4489, lon: -70.6693 },
    { name: 'Cairo', lat: 30.0444, lon: 31.2357 },
    { name: 'Nairobi', lat: -1.2921, lon: 36.8219 }
]

// 2. Liquidity Connections (Pairs of Indices from HUBS)
const CONNECTIONS = [
    [1, 0], [0, 6], [0, 2], [2, 5], [3, 4], [3, 7], [4, 1], [13, 3], [6, 10], [8, 1],
    [0, 10], [6, 20], [2, 11], [5, 3], [7, 12], [4, 17], [3, 19], [3, 18], [1, 9],
    [1, 15], [8, 16], [0, 14], [10, 2], [7, 4], [5, 11], [9, 8], [15, 16]
]

// Component to handle moving particles along paths
function ParticleFlow({ arcs }: { arcs: { start: any, mid: any, end: any }[] }) {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])
    // Generate random starting offsets for particles
    const arcOffsets = useMemo(() => arcs.map(() => Math.random()), [arcs])

    useFrame(({ clock }) => {
        if (!meshRef.current) return
        const time = clock.elapsedTime
        
        arcs.forEach((arc, i) => {
            // progress 0 to 1, slow movement
            const t = (arcOffsets[i] + time * 0.15) % 1
            
            // quadratic bezier interpolation
            const omt = 1 - t
            const omt2 = omt * omt
            const t2 = t * t
            
            const x = omt2 * arc.start[0] + 2 * omt * t * arc.mid[0] + t2 * arc.end[0]
            const y = omt2 * arc.start[1] + 2 * omt * t * arc.mid[1] + t2 * arc.end[1]
            const z = omt2 * arc.start[2] + 2 * omt * t * arc.mid[2] + t2 * arc.end[2]
            
            dummy.position.set(x, y, z)
            dummy.updateMatrix()
            meshRef.current!.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, arcs.length]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </instancedMesh>
    )
}

function RotatingGlobe() {
    const globeRef = useRef<THREE.Group>(null!)
    const activeSession = getActiveSession()
    const radius = 2

    const nodes = useMemo(() => {
        return HUBS.map(hub => ({
            ...hub,
            pos: latLongToVector3(hub.lat, hub.lon, radius),
            isActive: hub.region === activeSession,
        }))
    }, [activeSession])

    const minorNodes = useMemo(() => {
        return MINOR_NODES.map(node => ({
            ...node,
            pos: latLongToVector3(node.lat, node.lon, radius)
        }))
    }, [])

    const arcs = useMemo(() => {
        return CONNECTIONS.map(([startIdx, endIdx]) => {
            const start = nodes[startIdx].pos
            const end = nodes[endIdx].pos
            // Calculate a midpoint that bulges outwards
            const midPoint: [number, number, number] = [
                (start[0] + end[0]) / 2,
                (start[1] + end[1]) / 2,
                (start[2] + end[2]) / 2,
            ]
            // Normalize and extend mid point
            const length = Math.sqrt(midPoint[0]**2 + midPoint[1]**2 + midPoint[2]**2)
            const extendedMidpoint: [number, number, number] = [
                (midPoint[0] / length) * (radius * 1.3),
                (midPoint[1] / length) * (radius * 1.3),
                (midPoint[2] / length) * (radius * 1.3),
            ]
            
            return { start, mid: extendedMidpoint, end }
        })
    }, [nodes])

    const arcsRef = useRef<(any)[]>([])
    const glowRefs = useRef<(THREE.Mesh)[]>([])

    useFrame(({ clock }) => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.0018
        }
        
        const time = clock.elapsedTime
        
        // Pulse active nodes
        glowRefs.current.forEach((mesh, i) => {
            if (mesh && nodes[i].isActive) {
                // Base scale 1.8, pulse slightly using sine wave
                const ds = 1.8 + Math.sin(time * 3) * 0.2
                mesh.scale.set(ds, ds, ds)
                
                // Pulse opacity slightly
                const mat = mesh.material as THREE.MeshBasicMaterial
                mat.opacity = 0.4 + Math.sin(time * 3) * 0.1
            }
        })
        
        // Animate line dashes
        arcsRef.current.forEach(line => {
            if (line && line.material) {
                // Line material property for flowing light
                line.material.dashOffset -= 0.005
            }
        })
    })

    return (
        <group ref={globeRef}>
            {/* ── Base Globe ─────────────────────────────── */}
            <Sphere args={[radius, 64, 64]}>
                <meshStandardMaterial
                    color="#0B1020"
                    roughness={0.65}
                    metalness={0.35}
                    emissive="#00C896"
                    emissiveIntensity={0.045}
                />
            </Sphere>

            {/* ── Subtle Wireframe Overlay ───────────────── */}
            <Sphere args={[radius + 0.02, 32, 32]}>
                <meshBasicMaterial
                    color="#00C896"
                    wireframe
                    transparent
                    opacity={0.045}
                />
            </Sphere>

            {/* ── Atmospheric Halo ───────────────────────── */}
            <Sphere args={[radius + 0.12, 32, 32]}>
                <meshBasicMaterial
                    color="#00C896"
                    transparent
                    opacity={0.018}
                    side={THREE.BackSide}
                />
            </Sphere>

            {/* ── Minor Data Nodes ───────────────────────── */}
            {minorNodes.map((node, i) => (
                <mesh key={`minor-${i}`} position={node.pos as any}>
                    <sphereGeometry args={[0.015, 12, 12]} />
                    <meshBasicMaterial color="#00e5b0" transparent opacity={0.15} />
                </mesh>
            ))}

            {/* ── Network Nodes ──────────────────────────── */}
            {nodes.map((node, i) => (
                <group key={i} position={node.pos as any}>
                    {/* Core point */}
                    <mesh>
                        <sphereGeometry args={[0.045, 18, 18]} />
                        <meshBasicMaterial color="#00e5b0" />
                    </mesh>

                    {/* Glow pulse - stronger if active session */}
                    <mesh 
                        ref={el => { if (el) glowRefs.current[i] = el }}
                        scale={[1.8, 1.8, 1.8]}
                    >
                        <sphereGeometry args={[node.isActive ? 0.08 : 0.045, 18, 18]} />
                        <meshBasicMaterial
                            color="#00e5b0"
                            transparent
                            opacity={node.isActive ? 0.4 : 0.15}
                        />
                    </mesh>
                    
                    {/* Node Label (Very subtle, only visible close) */}
                    {node.isActive && (
                        <Html position={[0.1, 0.1, 0.1]} center style={{ pointerEvents: 'none' }}>
                            <div style={{
                                color: 'rgba(0, 200, 150, 0.8)',
                                fontSize: '10px',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                background: 'rgba(3, 5, 10, 0.6)',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                border: '1px solid rgba(0, 200, 150, 0.2)',
                                backdropFilter: 'blur(4px)',
                                whiteSpace: 'nowrap'
                            }}>
                                {node.name}
                            </div>
                        </Html>
                    )}
                </group>
            ))}

            {/* ── Liquidity Connection Lines ─────────────── */}
            {arcs.map((arc, i) => (
                <QuadraticBezierLine
                    ref={el => { if (el) arcsRef.current[i] = el }}
                    key={`arc-${i}`}
                    start={arc.start}
                    mid={arc.mid}
                    end={arc.end}
                    color="#00C896"
                    lineWidth={1.2}
                    transparent
                    opacity={0.15}
                    dashed
                    dashScale={2}
                    dashSize={4}
                    dashOffset={0}
                    gapSize={15}
                />
            ))}

            {/* ── Subtle Particle Flow ───────────────────── */}
            <ParticleFlow arcs={arcs} />
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

            {/* ── Floating Global Stats ───────────────────── */}
            <Html position={[-3.5, 2, 0]} center style={{ pointerEvents: 'none' }}>
                <div style={statStyle}>
                    <div style={statVal}>150+</div>
                    <div style={statLab}>Countries Served</div>
                </div>
            </Html>
            
            <Html position={[3.5, -2, 0]} center style={{ pointerEvents: 'none' }}>
                <div style={statStyle}>
                    <div style={statVal}>50+</div>
                    <div style={statLab}>Liquidity Providers</div>
                </div>
            </Html>
            
            <Html position={[3.5, 2, 0]} center style={{ pointerEvents: 'none' }}>
                <div style={{...statStyle, textAlign: 'right'}}>
                    <div style={statVal}>{'<1ms'}</div>
                    <div style={statLab}>Sub-Millisecond Execution</div>
                </div>
            </Html>
            
            <Html position={[-3.5, -2, 0]} center style={{ pointerEvents: 'none' }}>
                <div style={statStyle}>
                    <div style={statVal}>$5B+</div>
                    <div style={statLab}>Daily Trading Volume</div>
                </div>
            </Html>
        </Canvas>
    )
}

const statStyle: React.CSSProperties = {
    color: '#F8F9FA',
    fontFamily: 'Space Grotesk, sans-serif',
    background: 'rgba(11, 15, 26, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(8px)',
    padding: '12px 20px',
    borderRadius: '12px',
    whiteSpace: 'nowrap',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
}

const statVal: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 700,
    marginBottom: '2px',
    color: '#00C896'
}

const statLab: React.CSSProperties = {
    fontSize: '10px',
    color: '#A0ABBA',
    textTransform: 'uppercase',
    letterSpacing: '1px'
}