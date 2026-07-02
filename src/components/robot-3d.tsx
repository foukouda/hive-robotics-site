"use client";

import { Suspense, Component, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Bounds,
  Center,
  RoundedBox,
  useGLTF,
} from "@react-three/drei";

const MODEL_URL = "/models/robot.glb";

/**
 * Real robot model from `public/models/robot.glb` (quantized glTF, decoded
 * natively by three). `<Center>` + `<Bounds>` auto-frame it whatever its
 * exported scale/position. If the file is missing, the boundary falls back
 * to a stylised robot.
 *
 * If the model appears lying down (CAD is often Z-up), add a rotation, e.g.
 * `<primitive object={scene} rotation={[-Math.PI / 2, 0, 0]} />`.
 */
function GLBRobot() {
  const { scene } = useGLTF(MODEL_URL);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

/** Stylised delivery robot built from primitives — the fallback when no .glb is present. */
function ProceduralRobot() {
  const wheels: [number, number][] = [
    [-0.78, 0.62],
    [0.78, 0.62],
    [-0.78, -0.62],
    [0.78, -0.62],
  ];
  return (
    <group position={[0, -0.1, 0]}>
      <RoundedBox args={[1.9, 1.15, 1.2]} radius={0.16} smoothness={4} position={[0, 0.25, 0]} castShadow>
        <meshStandardMaterial color="#f4f5f7" metalness={0.15} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0.2, 0.61]}>
        <planeGeometry args={[1.3, 0.55]} />
        <meshStandardMaterial color="#00E85C" emissive="#00E85C" emissiveIntensity={0.7} toneMapped={false} />
      </mesh>
      <RoundedBox args={[1.05, 0.16, 0.16]} radius={0.07} smoothness={4} position={[0, 0.72, 0.52]}>
        <meshStandardMaterial color="#1B3D2C" metalness={0.3} roughness={0.4} />
      </RoundedBox>
      <RoundedBox args={[1.75, 0.35, 1.05]} radius={0.1} smoothness={4} position={[0, -0.42, 0]}>
        <meshStandardMaterial color="#1B3D2C" metalness={0.2} roughness={0.5} />
      </RoundedBox>
      {wheels.map(([x, z], i) => (
        <mesh key={i} position={[x, -0.52, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 28]} />
          <meshStandardMaterial color="#111214" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/** Catches the useGLTF error (missing/broken model) and shows the procedural robot instead. */
class ModelBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function Robot3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [3.5, 2, 4.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      className="cursor-grab active:cursor-grabbing"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 6, 5]} intensity={1.4} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#00E85C" />

      <Bounds fit clip observe margin={1.2}>
        <Suspense fallback={<ProceduralRobot />}>
          <ModelBoundary fallback={<ProceduralRobot />}>
            <GLBRobot />
          </ModelBoundary>
        </Suspense>
      </Bounds>

      <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={12} blur={2.8} far={5} />

      <OrbitControls
        makeDefault
        autoRotate
        autoRotateSpeed={1.1}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
