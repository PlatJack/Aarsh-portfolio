'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { clusters, mapItems, type MapItem } from '@/lib/data';

// Deterministic RNG so the layout is identical on every visit
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const gauss = (rand: () => number) => {
  const u = 1 - rand();
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

const clusterById = Object.fromEntries(clusters.map(c => [c.id, c]));

export function itemPositions() {
  const rand = mulberry32(7);
  const totals: Record<string, number> = {};
  mapItems.forEach(i => (totals[i.cluster] = (totals[i.cluster] ?? 0) + 1));
  const seen: Record<string, number> = {};
  return Object.fromEntries(
    mapItems.map(item => {
      const c = clusterById[item.cluster];
      const n = totals[item.cluster];
      const k = (seen[item.cluster] = (seen[item.cluster] ?? 0) + 1) - 1;
      // Spread nodes evenly around the cluster centre, staggering height so labels don't collide
      const angle = (k / n) * Math.PI * 2 + rand() * 0.3;
      const radius = n === 1 ? 0.5 : 1.1 + (n > 4 ? 0.5 : 0) + rand() * 0.25;
      const pos = new THREE.Vector3(
        c.center[0] + Math.cos(angle) * radius,
        c.center[1] + ((k % 3) - 1) * 0.75 + (rand() - 0.5) * 0.2,
        c.center[2] + Math.sin(angle) * radius
      );
      return [item.id, pos];
    })
  ) as Record<string, THREE.Vector3>;
}

const vertex = /* glsl */ `
  attribute float size;
  attribute vec3 color;
  attribute float phase;
  uniform float uTime;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.6 + phase) * 0.04;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = size * uPixelRatio * (46.0 / -mv.z);
    vColor = color;
    vAlpha = 0.55 + 0.45 * sin(uTime * 1.3 + phase * 3.0);
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

function Cloud({ dim }: { dim: string | null }) {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const rand = mulberry32(42);
    const pos: number[] = [];
    const col: number[] = [];
    const size: number[] = [];
    const phase: number[] = [];
    const tmp = new THREE.Color();

    clusters.forEach(c => {
      tmp.set(c.color);
      for (let i = 0; i < 420; i++) {
        pos.push(c.center[0] + gauss(rand) * 1.0, c.center[1] + gauss(rand) * 0.8, c.center[2] + gauss(rand) * 1.0);
        const k = 0.75 + rand() * 0.5;
        col.push(tmp.r * k, tmp.g * k, tmp.b * k);
        size.push(0.6 + rand() * 1.6);
        phase.push(rand() * Math.PI * 2);
      }
    });

    // Sparse background "noise" tokens
    for (let i = 0; i < 700; i++) {
      pos.push((rand() - 0.5) * 22, (rand() - 0.5) * 13, (rand() - 0.5) * 14);
      col.push(0.35, 0.38, 0.42);
      size.push(0.4 + rand() * 0.8);
      phase.push(rand() * Math.PI * 2);
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    g.setAttribute('size', new THREE.Float32BufferAttribute(size, 1));
    g.setAttribute('phase', new THREE.Float32BufferAttribute(phase, 1));
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 } }),
    []
  );

  useFrame((_, dt) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value += dt;
      mat.current.opacity = THREE.MathUtils.lerp(mat.current.opacity, dim ? 0.45 : 1, 0.08);
    }
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Links({ positions }: { positions: Record<string, THREE.Vector3> }) {
  const geometry = useMemo(() => {
    const pts: number[] = [];
    const cols: number[] = [];
    const tmp = new THREE.Color();
    mapItems.forEach(item => {
      const c = clusterById[item.cluster];
      const p = positions[item.id];
      tmp.set(c.color);
      pts.push(c.center[0], c.center[1], c.center[2], p.x, p.y, p.z);
      cols.push(tmp.r, tmp.g, tmp.b, tmp.r, tmp.g, tmp.b);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
    return g;
  }, [positions]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial vertexColors transparent opacity={0.28} blending={THREE.AdditiveBlending} depthWrite={false} />
    </lineSegments>
  );
}

function Rig({ focus, reduce }: { focus: string | null; reduce: boolean }) {
  const controls = useRef<OrbitControlsImpl>(null);
  const target = useMemo(() => new THREE.Vector3(), []);
  const { camera, size } = useThree();

  // Pull the camera back on portrait screens so every cluster stays in frame
  useEffect(() => {
    const aspect = size.width / size.height;
    const dist = aspect < 1 ? 12.5 * Math.min(1.8, 1.1 / aspect) : 12.5;
    camera.position.setLength(dist);
  }, [camera, size]);

  useFrame(() => {
    const c = focus ? clusterById[focus] : null;
    target.set(c ? c.center[0] : 0, c ? c.center[1] : 0, c ? c.center[2] : 0);
    if (controls.current) {
      controls.current.target.lerp(target, 0.05);
      controls.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controls}
      enableZoom={false}
      enablePan={false}
      autoRotate={!reduce}
      autoRotateSpeed={0.45}
      rotateSpeed={0.6}
      enableDamping
      dampingFactor={0.08}
    />
  );
}

const kindGlyph: Record<MapItem['kind'], string> = { paper: '✦', project: '◆', work: '●', award: '★' };

// Projects 3D anchors to screen space each frame and moves the matching DOM labels.
// One overlay instead of drei's <Html> avoids creating a React root per label.
function Projector({ anchors, labels }: { anchors: Record<string, THREE.Vector3>; labels: React.RefObject<Record<string, HTMLElement | null>> }) {
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera, size }) => {
    for (const id in anchors) {
      const el = labels.current?.[id];
      if (!el) continue;
      v.copy(anchors[id]).project(camera);
      const hidden = v.z > 1;
      el.style.visibility = hidden ? 'hidden' : 'visible';
      if (hidden) continue;
      const x = (v.x * 0.5 + 0.5) * size.width;
      const y = (-v.y * 0.5 + 0.5) * size.height;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      // Nearer labels stack above farther ones
      el.style.zIndex = String(Math.round((1 - v.z) * 1000) + (id.startsWith('cluster:') ? 0 : 1000));
    }
  });
  return null;
}

export default function EmbedMap({
  selected,
  focus,
  onSelect,
  reduce,
  active,
}: {
  selected: string | null;
  focus: string | null;
  onSelect: (id: string) => void;
  reduce: boolean;
  active: boolean;
}) {
  const positions = useMemo(() => itemPositions(), []);
  const anchors = useMemo(() => {
    const a: Record<string, THREE.Vector3> = { ...positions };
    clusters.forEach(c => {
      a[`cluster:${c.id}`] = new THREE.Vector3(c.center[0], c.center[1] + (c.center[1] < 0 ? -2.1 : 2.1), c.center[2]);
    });
    return a;
  }, [positions]);
  const labels = useRef<Record<string, HTMLElement | null>>({});
  // Narrow screens show glyph-only nodes; labels appear for gold and selected nodes
  const compact = typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 1.0, 12.5], fov: 50 }}
        dpr={[1, 1.75]}
        frameloop={active ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true }}
      >
        <Cloud dim={focus} />
        <Links positions={positions} />
        <Rig focus={focus} reduce={reduce} />
        <Projector anchors={anchors} labels={labels} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {clusters.map(c => (
          <div
            key={c.id}
            ref={el => {
              labels.current[`cluster:${c.id}`] = el;
            }}
            className="absolute left-0 top-0 whitespace-nowrap font-mono text-[9px] font-medium uppercase tracking-[0.2em] transition-opacity sm:text-[10px]"
            style={{ color: c.color, opacity: focus && focus !== c.id ? 0.25 : 0.9, textShadow: `0 0 16px ${c.color}`, visibility: 'hidden' }}
          >
            {c.label}
          </div>
        ))}

        {mapItems.map(item => {
          const c = clusterById[item.cluster];
          const color = item.gold ? '#fcd34d' : c.color;
          const isSel = selected === item.id;
          const faded = focus && focus !== item.cluster;
          return (
            <div
              key={item.id}
              ref={el => {
                labels.current[item.id] = el;
              }}
              className="absolute left-0 top-0"
              style={{ visibility: 'hidden' }}
            >
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                className="pointer-events-auto flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[10.5px] backdrop-blur-sm transition-[opacity,transform,background-color] duration-300 hover:scale-110"
                style={{
                  opacity: faded ? 0.2 : 1,
                  color: isSel ? '#060708' : '#e5e7eb',
                  background: isSel ? color : 'rgba(6,7,8,0.55)',
                  borderColor: `${color}${isSel ? 'ff' : '66'}`,
                  boxShadow: isSel ? `0 0 18px ${color}88` : 'none',
                }}
              >
                <span style={{ color: isSel ? '#060708' : color }}>{kindGlyph[item.kind]}</span>
                {compact && !isSel && !item.gold ? <span className="sr-only">{item.label}</span> : item.label}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
