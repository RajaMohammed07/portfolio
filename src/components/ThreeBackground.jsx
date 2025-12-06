import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { useRef, Suspense } from "react";

const AnimatedSphere = ({ position, color, size, speed, distort }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
          
          {/* Main decorative spheres */}
          <AnimatedSphere
            position={[-3, 1.5, -2]}
            color="#3b82f6"
            size={1.2}
            speed={0.5}
            distort={0.4}
          />
          <AnimatedSphere
            position={[3.5, -1, -3]}
            color="#8b5cf6"
            size={0.8}
            speed={0.7}
            distort={0.3}
          />
          <AnimatedSphere
            position={[2, 2.5, -4]}
            color="#06b6d4"
            size={0.5}
            speed={0.6}
            distort={0.5}
          />
          <AnimatedSphere
            position={[-2.5, -2, -2.5]}
            color="#10b981"
            size={0.6}
            speed={0.8}
            distort={0.35}
          />
          
          {/* Starfield background */}
          <Stars
            radius={50}
            depth={50}
            count={1500}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
