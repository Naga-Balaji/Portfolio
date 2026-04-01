"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export type V3ScrollState = { hero: number; page: number };

function ScrollScene({ scrollRef }: { scrollRef: React.MutableRefObject<V3ScrollState> }) {
  const root = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const g = root.current;
    if (!g) return;
    const { hero, page } = scrollRef.current;
    const slow = Math.max(0.04, 0.22 - hero * 0.2);
    g.rotation.y += delta * slow;
    g.rotation.x = hero * 1.15 + page * 0.22;
    g.position.y = -hero * 2.4;
    g.position.z = -page * 1.8;
  });

  return (
    <group ref={root}>
      <mesh>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color="#3dff8c" wireframe />
      </mesh>
      <mesh scale={0.92}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color="#1bff68" transparent opacity={0.08} />
      </mesh>
      <mesh rotation={[Math.PI / 3.2, 0.4, 0]}>
        <torusGeometry args={[2.35, 0.018, 12, 200]} />
        <meshBasicMaterial color="#3dff8c" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[-Math.PI / 5, 1.1, 0.2]}>
        <torusGeometry args={[2.85, 0.012, 8, 160]} />
        <meshBasicMaterial color="#7dffbd" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

export function HeroCanvas({ scrollRef }: { scrollRef: React.MutableRefObject<V3ScrollState> }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0.2, 9], fov: 40 }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ height: "100%", width: "100%" }}
      >
        <ambientLight intensity={0.35} />
        <pointLight color="#3dff8c" intensity={2.2} position={[5, 3, 7]} />
        <pointLight color="#0d4d2a" intensity={1.1} position={[-7, -4, 5]} />
        <ScrollScene scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
