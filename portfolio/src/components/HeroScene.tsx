import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Satellite-constellation network visualisation.
 * Wireframe earth + orbiting satellites with downlink beams to
 * ground stations (PoPs), plus inter-satellite + ground packet pulses.
 */

const R = 1.7;          // earth radius
const ORBITS = [
  { radius: 2.4, inclination: 0.4,  speed: 0.18, count: 4, color: '#22d3ee' },
  { radius: 2.8, inclination: -0.9, speed: 0.13, count: 3, color: '#67e8f9' },
  { radius: 3.2, inclination: 1.3,  speed: 0.10, count: 3, color: '#a5f3fc' },
];

// Ground stations (lat/lon).
const POPS = [
  { lat:  37, lon: -122 }, // SFO
  { lat:  40, lon:  -74 }, // NYC
  { lat:  51, lon:    0 }, // LON
  { lat:  35, lon:  139 }, // TYO
  { lat:   1, lon:  103 }, // SIN
  { lat:  19, lon:   72 }, // BOM
  { lat: -23, lon:  -46 }, // GRU
  { lat: -33, lon:  151 }, // SYD
  { lat:  25, lon:   55 }, // DXB
  { lat: -34, lon:   18 }, // CPT
];

function latLonToVec3(lat: number, lon: number, r = R) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  );
}

const GROUND = POPS.map((p) => latLonToVec3(p.lat, p.lon));

function GroundStation({ position }: { position: THREE.Vector3 }) {
  const ring = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const s = 1 + Math.sin(t * 1.8 + position.x) * 0.25;
    if (ring.current) ring.current.scale.setScalar(s);
  });
  // Orient the marker to lie tangent on the surface
  const quat = useMemo(() => {
    const up = position.clone().normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);
    return q;
  }, [position]);
  return (
    <group position={position} quaternion={quat}>
      <mesh>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#67e8f9" />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.06, 0.075, 24]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Satellite({
  radius,
  inclination,
  phase,
  speed,
  color,
  satRef,
}: {
  radius: number;
  inclination: number;
  phase: number;
  speed: number;
  color: string;
  satRef: React.MutableRefObject<THREE.Group | null>;
}) {
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + phase;
    // Orbit in XZ plane, then rotate by inclination around the X axis.
    const x = Math.cos(t) * radius;
    const zFlat = Math.sin(t) * radius;
    const y = -Math.sin(inclination) * zFlat;
    const z =  Math.cos(inclination) * zFlat;
    if (satRef.current) {
      satRef.current.position.set(x, y, z);
      satRef.current.rotation.y = -t;
    }
  });
  return (
    <group ref={satRef}>
      {/* body */}
      <mesh>
        <boxGeometry args={[0.08, 0.06, 0.06]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* solar panels */}
      <mesh position={[0.13, 0, 0]}>
        <boxGeometry args={[0.14, 0.005, 0.08]} />
        <meshBasicMaterial color="#1e293b" />
      </mesh>
      <mesh position={[-0.13, 0, 0]}>
        <boxGeometry args={[0.14, 0.005, 0.08]} />
        <meshBasicMaterial color="#1e293b" />
      </mesh>
      {/* glow halo */}
      <mesh>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function OrbitRing({ radius, inclination, color }: { radius: number; inclination: number; color: string }) {
  const pts = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    const segs = 128;
    for (let i = 0; i <= segs; i++) {
      const t = (i / segs) * Math.PI * 2;
      arr.push(new THREE.Vector3(
        Math.cos(t) * radius,
        Math.sin(t) * Math.sin(inclination) * radius * 0.4,
        Math.sin(t) * radius,
      ));
    }
    return arr;
  }, [radius, inclination]);
  return <Line points={pts} color={color} transparent opacity={0.22} lineWidth={1} />;
}

function DownlinkBeam({
  satRef,
  ground,
  color,
  cadence,
  offset,
}: {
  satRef: React.MutableRefObject<THREE.Group | null>;
  ground: THREE.Vector3;
  color: string;
  cadence: number;
  offset: number;
}) {
  const lineRef = useRef<THREE.Group>(null!);
  const beamRef = useRef<THREE.Mesh>(null!);
  const pulseRef = useRef<THREE.Mesh>(null!);
  const tmpA = useMemo(() => new THREE.Vector3(), []);
  const tmpB = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    if (!satRef.current || !beamRef.current || !pulseRef.current) return;
    const t = clock.getElapsedTime();
    tmpA.copy(satRef.current.position);
    tmpB.copy(ground);
    const dir = tmpA.clone().sub(tmpB);
    const len = dir.length();
    const mid = tmpB.clone().add(tmpA).multiplyScalar(0.5);

    // Beam — thin cylinder from ground to satellite
    beamRef.current.position.copy(mid);
    beamRef.current.scale.set(1, len, 1);
    beamRef.current.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize(),
    );

    // Cadence: pulse opacity
    const wave = (Math.sin(t * cadence + offset) + 1) / 2; // 0..1
    (beamRef.current.material as THREE.MeshBasicMaterial).opacity = 0.05 + wave * 0.25;

    // Packet pulse travels ground -> satellite
    const k = ((t * 0.6 + offset) % 1);
    pulseRef.current.position.lerpVectors(tmpB, tmpA, k);
    (pulseRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.2 + Math.sin(k * Math.PI) * 0.7;
  });

  return (
    <group ref={lineRef}>
      <mesh ref={beamRef}>
        <cylinderGeometry args={[0.004, 0.004, 1, 6, 1, true]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.025, 10, 10]} />
        <meshBasicMaterial color="#fde68a" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function Constellation() {
  const world = useRef<THREE.Group>(null!);

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();
    if (world.current) {
      world.current.rotation.y = t * 0.05 + mouse.x * 0.25;
      world.current.rotation.x = -0.18 + mouse.y * 0.12;
    }
  });

  // Build satellite specs + refs, deterministic per render.
  const satellites = useMemo(() => {
    const list: {
      ref: React.MutableRefObject<THREE.Group | null>;
      radius: number;
      inclination: number;
      phase: number;
      speed: number;
      color: string;
      ground: THREE.Vector3;
      cadence: number;
      offset: number;
    }[] = [];
    let gi = 0;
    ORBITS.forEach((o) => {
      for (let i = 0; i < o.count; i++) {
        list.push({
          ref: { current: null },
          radius: o.radius,
          inclination: o.inclination,
          phase: (i / o.count) * Math.PI * 2,
          speed: o.speed,
          color: o.color,
          ground: GROUND[gi % GROUND.length],
          cadence: 1.2 + (gi % 3) * 0.4,
          offset: gi * 0.7,
        });
        gi++;
      }
    });
    return list;
  }, []);

  return (
    <group ref={world}>
      {/* Wireframe earth */}
      <mesh>
        <sphereGeometry args={[R, 40, 28]} />
        <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.55} />
      </mesh>
      {/* Solid inner sphere for occlusion */}
      <mesh>
        <sphereGeometry args={[R * 0.99, 48, 32]} />
        <meshBasicMaterial color="#05070d" />
      </mesh>
      {/* Equator highlight */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R, 0.005, 8, 96]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.55} />
      </mesh>

      {/* Ground stations */}
      {GROUND.map((g, i) => (
        <GroundStation key={i} position={g} />
      ))}

      {/* Orbit rings */}
      {ORBITS.map((o, i) => (
        <group key={i} rotation={[o.inclination, 0, 0]}>
          <OrbitRing radius={o.radius} inclination={0} color={o.color} />
        </group>
      ))}

      {/* Satellites — inclination is baked into the satellite's transform,
          so its local position equals its world position (within `world`). */}
      {satellites.map((s, i) => (
        <Satellite
          key={i}
          radius={s.radius}
          inclination={s.inclination}
          phase={s.phase}
          speed={s.speed}
          color={s.color}
          satRef={s.ref}
        />
      ))}

      {/* Downlink beams — beams resolve sat world-position internally. */}
      {satellites.map((s, i) => (
        <DownlinkBeam
          key={`beam-${i}`}
          satRef={s.ref}
          ground={s.ground}
          color={s.color}
          cadence={s.cadence}
          offset={s.offset}
        />
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0.5, 6.8], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#05070d']} />
        <fog attach="fog" args={['#05070d', 7, 14]} />
        <ambientLight intensity={0.7} />
        <Suspense fallback={null}>
          <Constellation />
        </Suspense>
      </Canvas>
      {/* Soft vignette to keep hero text readable */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,7,13,0.85)_100%)]" />
    </div>
  );
}
