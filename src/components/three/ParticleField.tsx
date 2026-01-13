import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Simple floating particles using instanced mesh
function Particles({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 500;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
        ],
        scale: Math.random() * 0.5 + 0.1,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const dummy = new THREE.Object3D();

    particles.forEach((particle, i) => {
      const [x, y, z] = particle.position;
      
      // Add movement based on time and scroll
      dummy.position.set(
        x + Math.sin(time * 0.2 + i) * 0.5,
        y + Math.cos(time * 0.3 + i) * 0.5 - scrollProgress * 5,
        z + scrollProgress * -3
      );
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.05 + scrollProgress;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#d4a84b" transparent opacity={0.8} />
    </instancedMesh>
  );
}

// Floating ring
function FloatingRing({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2 + scrollProgress * Math.PI;
    ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <mesh ref={ref} position={[3, 0, -3]}>
      <torusGeometry args={[1.2, 0.015, 16, 100]} />
      <meshBasicMaterial color="#d4a84b" transparent opacity={0.4} />
    </mesh>
  );
}

// Floating octahedron
function FloatingOctahedron({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.3;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2 + scrollProgress * Math.PI * 2;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5 - scrollProgress * 2;
  });

  return (
    <mesh ref={ref} position={[-3, 1, -4]}>
      <octahedronGeometry args={[0.6]} />
      <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

// Floating box
function FloatingBox({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = scrollProgress * Math.PI;
    ref.current.rotation.y = state.clock.elapsedTime * 0.4;
    ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    ref.current.scale.setScalar(1 + scrollProgress * 0.3);
  });

  return (
    <mesh ref={ref} position={[2.5, -1.5, -5]}>
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.4} />
    </mesh>
  );
}

// Main scene
function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Particles scrollProgress={scrollProgress} />
      <FloatingRing scrollProgress={scrollProgress} />
      <FloatingOctahedron scrollProgress={scrollProgress} />
      <FloatingBox scrollProgress={scrollProgress} />
    </>
  );
}

interface ParticleFieldProps {
  scrollProgress: number;
}

export const ParticleField = ({ scrollProgress }: ParticleFieldProps) => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
