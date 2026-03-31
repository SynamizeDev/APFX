'use client'

import { useRef, useMemo, Suspense, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import {
    Sphere,
    Float,
    QuadraticBezierLine,
    Html,
} from '@react-three/drei'
import * as THREE from 'three'

/* Equirectangular Earth texture (public domain / CC). 2K for balance of quality and load. */
const EARTH_TEXTURE_URL = 'https://cdn.jsdelivr.net/npm/artastra@1.0.8/textures/earth.jpg'

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
    { name: 'Tel Aviv', lat: 32.0853, lon: 34.7818, region: 'Middle East' },
    { name: 'Dubai', lat: 25.2048, lon: 55.2708, region: 'Middle East' },
    { name: 'Riyadh', lat: 24.7136, lon: 46.6753, region: 'Middle East' },
    { name: 'Singapore', lat: 1.3521, lon: 103.8198, region: 'Asia' },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503, region: 'Asia' },
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777, region: 'Asia' },
    { name: 'Melbourne', lat: -37.8136, lon: 144.9631, region: 'Asia' },
    { name: 'Frankfurt', lat: 50.1109, lon: 8.6821, region: 'Europe' },
    { name: 'Paris', lat: 48.8566, lon: 2.3522, region: 'Europe' },
    { name: 'Hong Kong', lat: 22.3193, lon: 114.1694, region: 'Asia' },
    { name: 'Chicago', lat: 41.8781, lon: -87.6298, region: 'Americas' },
    { name: 'Toronto', lat: 43.6510, lon: -79.3470, region: 'Americas' },
    { name: 'Zurich', lat: 47.3769, lon: 8.5417, region: 'Europe' },
    { name: 'Madrid', lat: 40.4168, lon: -3.7038, region: 'Europe' },
    { name: 'Shanghai', lat: 31.2304, lon: 121.4737, region: 'Asia' },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093, region: 'Asia' },
    { name: 'Johannesburg', lat: -26.2041, lon: 28.0473, region: 'Middle East' },
    { name: 'São Paulo', lat: -23.5505, lon: -46.6333, region: 'Americas' },
    { name: 'Mexico City', lat: 19.4326, lon: -99.1332, region: 'Americas' },
    { name: 'Seoul', lat: 37.5665, lon: 126.9780, region: 'Asia' },
    { name: 'Bangkok', lat: 13.7563, lon: 100.5018, region: 'Asia' },
    { name: 'Kuala Lumpur', lat: 3.1390, lon: 101.6869, region: 'Asia' },
    { name: 'Istanbul', lat: 41.0082, lon: 28.9784, region: 'Middle East' },
    { name: 'San Francisco', lat: 37.7749, lon: -122.4194, region: 'Americas' },
    { name: 'Santiago', lat: -33.4489, lon: -70.6693, region: 'Americas' },
    { name: 'Cairo', lat: 30.0444, lon: 31.2357, region: 'Middle East' }
]

const MINOR_NODES = [
    { name: 'Lisbon', lat: 38.7223, lon: -9.1393 },
    { name: 'Rome', lat: 41.9028, lon: 12.4964 },
    { name: 'Athens', lat: 37.9838, lon: 23.7275 },
    { name: 'Jakarta', lat: -6.2088, lon: 106.8456 },
    { name: 'Ho Chi Minh', lat: 10.8231, lon: 106.6297 },
    { name: 'Manila', lat: 14.5995, lon: 120.9842 },
    { name: 'Buenos Aires', lat: -34.6037, lon: -58.3816 },
    { name: 'Santiago', lat: -33.4489, lon: -70.6693 },
    { name: 'Cairo', lat: 30.0444, lon: 31.2357 },
    { name: 'Nairobi', lat: -1.2921, lon: 36.8219 },
    { name: 'Doha', lat: 25.2854, lon: 51.5310 },
    { name: 'Kuwait City', lat: 29.3759, lon: 47.9774 },
    { name: 'Casablanca', lat: 33.5731, lon: -7.5898 },
    { name: 'Lagos', lat: 6.5244, lon: 3.3792 }
]

// 2. Liquidity Connections (Pairs of Indices from HUBS)
const CONNECTIONS = [
    [1, 0], [0, 8], [0, 2], [2, 3], [3, 4], [4, 6], [6, 1],
    [5, 7], [5, 10], [7, 11], [10, 5], [12, 1],
    [8, 9], [9, 13], [13, 8], [8, 14], [14, 9],
    [1, 15], [15, 16], [16, 1],
    [1, 22], [22, 12], [22, 15],
    [3, 18], [18, 21], [21, 3],
    [0, 12], [12, 2], [9, 0]
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

function RotatingGlobe({ earthMap = null }: { earthMap?: THREE.Texture | null }) {
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
    const nodeGroupRefs = useRef<(THREE.Group | null)[]>([])
    const [nodeLabelVisible, setNodeLabelVisible] = useState<boolean[]>(() => Array(HUBS.length).fill(true))
    const prevLabelVisibleRef = useRef<boolean[]>(Array(HUBS.length).fill(true))
    const centerVec = useMemo(() => new THREE.Vector3(), [])
    const nodeWorldVec = useMemo(() => new THREE.Vector3(), [])
    const cameraVec = useMemo(() => new THREE.Vector3(), [])

    useFrame((state, _delta) => {
        const { camera } = state
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.0018
        }
        
        const time = state.clock.elapsedTime
        
        // Depth-check: only show labels when node is on the camera-facing side of the globe
        const globeCenter = globeRef.current
        if (globeCenter) {
            globeCenter.getWorldPosition(centerVec)
            cameraVec.copy(camera.position)
            let anyChange = false
            for (let i = 0; i < nodeGroupRefs.current.length; i++) {
                const group = nodeGroupRefs.current[i]
                if (!group) continue
                group.getWorldPosition(nodeWorldVec)
                const toNode = nodeWorldVec.clone().sub(centerVec)
                const toCamera = cameraVec.clone().sub(centerVec)
                const facingCamera = toNode.dot(toCamera) > 0
                if (prevLabelVisibleRef.current[i] !== facingCamera) {
                    anyChange = true
                }
                prevLabelVisibleRef.current[i] = facingCamera
            }
            if (anyChange) {
                setNodeLabelVisible([...prevLabelVisibleRef.current])
            }
        }
        
        // Pulse active nodes
        glowRefs.current.forEach((mesh, i) => {
            if (mesh && nodes[i].isActive) {
                const ds = 1.8 + Math.sin(time * 3) * 0.2
                mesh.scale.set(ds, ds, ds)
                const mat = mesh.material as THREE.MeshBasicMaterial
                mat.opacity = 0.4 + Math.sin(time * 3) * 0.1
            }
        })
        
        arcsRef.current.forEach(line => {
            if (line && line.material) {
                line.material.dashOffset -= 0.005
            }
        })
    })

    return (
        <group ref={globeRef}>
            {/* ── Base Globe: real earth texture when loaded, else solid dark ─ */}
            <Sphere args={[radius, 64, 64]}>
                {earthMap ? (
                    <meshStandardMaterial
                        map={earthMap}
                        roughness={0.9} // More matte
                        metalness={0.15}
                        color="#05080A" // Dark base for oceans
                        emissive="#00C896" // Neon land
                        emissiveMap={earthMap}
                        emissiveIntensity={0.65}
                    />
                ) : (
                    <meshStandardMaterial
                        color="#05080A"
                        roughness={0.8}
                        metalness={0.2}
                        emissive="#00C896"
                        emissiveIntensity={0.2}
                    />
                )}
            </Sphere>

            {/* ── Very subtle wireframe (optional tech accent, barely visible) ─ */}
            <Sphere args={[radius + 0.015, 32, 32]}>
                <meshBasicMaterial
                    color="#00C896"
                    wireframe
                    transparent
                    opacity={earthMap ? 0.03 : 0.045}
                />
            </Sphere>

            {/* ── Atmospheric Halo ───────────────────────── */}
            <Sphere args={[radius + 0.25, 32, 32]}>
                <meshBasicMaterial
                    color="#00C896"
                    transparent
                    opacity={0.012}
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
                <group
                    key={i}
                    position={node.pos as any}
                    ref={el => { if (el) nodeGroupRefs.current[i] = el }}
                >
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
                    
                    {/* Node label: show when camera-facing; highlight active session */}
                    {nodeLabelVisible[i] && (
                        <Html position={[0.1, 0.1, 0.1]} center style={{ pointerEvents: 'none' }}>
                            <div style={{
                                color: node.isActive ? 'rgba(0, 200, 150, 0.9)' : 'rgba(0, 200, 150, 0.55)',
                                fontSize: node.isActive ? '10px' : '9px',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                background: 'rgba(3, 5, 10, 0.6)',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                border: node.isActive
                                  ? '1px solid rgba(0, 200, 150, 0.28)'
                                  : '1px solid rgba(0, 200, 150, 0.14)',
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

/* Loads earth texture and renders globe with it; suspends until loaded. */
function GlobeWithTexture() {
    const earthMap = useLoader(THREE.TextureLoader, EARTH_TEXTURE_URL)
    useMemo(() => {
        earthMap.colorSpace = THREE.SRGBColorSpace
        earthMap.anisotropy = 4
    }, [earthMap])
    return <RotatingGlobe earthMap={earthMap} />
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
            <ambientLight intensity={0.5} />

            {/* Primary key light (sun-like, for realistic shading) */}
            <pointLight
                position={[10, 8, 10]}
                intensity={0.8}
                color="#e0fff5" // Very subtle teal tint
            />

            {/* Accent fill (brand tint on dark side) */}
            <pointLight
                position={[-6, -4, -8]}
                intensity={0.35}
                color="#00C896"
            />

            {/* Soft fill for depth */}
            <pointLight
                position={[-8, -6, -10]}
                intensity={0.4}
            />

            {/* ── Motion Wrapper (Suspense: show solid globe until texture loads) ─ */}
            <Suspense
                fallback={
                    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.45}>
                        <RotatingGlobe />
                    </Float>
                }
            >
                <Float
                    speed={1.4}
                    rotationIntensity={0.4}
                    floatIntensity={0.45}
                >
                    <GlobeWithTexture />
                </Float>
            </Suspense>

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