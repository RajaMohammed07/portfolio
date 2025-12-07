import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

// Individual shooting star
const ShootingStar = ({ startPosition, speed, delay }) => {
  const meshRef = useRef();
  const trailRef = useRef();
  const timeRef = useRef(delay);

  const trailGeometry = useMemo(() => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      points.push(new THREE.Vector3(i * 0.15, i * 0.08, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state, delta) => {
    timeRef.current += delta;
    
    if (meshRef.current && trailRef.current) {
      // Reset position when star goes off screen
      if (meshRef.current.position.x < -15 || meshRef.current.position.y < -10) {
        meshRef.current.position.set(
          startPosition[0] + Math.random() * 10,
          startPosition[1] + Math.random() * 5,
          startPosition[2]
        );
        timeRef.current = 0;
      }

      // Move the shooting star diagonally
      if (timeRef.current > 0) {
        meshRef.current.position.x -= delta * speed;
        meshRef.current.position.y -= delta * speed * 0.5;
        
        trailRef.current.position.copy(meshRef.current.position);
      }
    }
  });

  return (
    <group>
      {/* Star head - bright glowing sphere */}
      <mesh ref={meshRef} position={startPosition}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* Star glow */}
      <mesh position={startPosition}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
      </mesh>

      {/* Trail */}
      <line ref={trailRef} geometry={trailGeometry} position={startPosition}>
        <lineBasicMaterial 
          color="#3b82f6" 
          transparent 
          opacity={0.6}
          linewidth={2}
        />
      </line>
    </group>
  );
};

// Meteor with glowing trail
const Meteor = ({ startPosition, speed, delay, color }) => {
  const groupRef = useRef();
  const timeRef = useRef(-delay);
  const particles = useRef([]);

  // Create trail particles
  const trailParticles = useMemo(() => {
    const temps = [];
    for (let i = 0; i < 15; i++) {
      temps.push({
        offset: i * 0.12,
        scale: 1 - (i / 15) * 0.8,
        opacity: 1 - (i / 15),
      });
    }
    return temps;
  }, []);

  useFrame((state, delta) => {
    timeRef.current += delta;
    
    if (groupRef.current) {
      if (timeRef.current > 0) {
        groupRef.current.position.x -= delta * speed;
        groupRef.current.position.y -= delta * speed * 0.6;
        groupRef.current.position.z += delta * speed * 0.2;
      }

      // Reset when off screen
      if (groupRef.current.position.x < -20 || groupRef.current.position.y < -15) {
        groupRef.current.position.set(
          startPosition[0] + Math.random() * 15,
          startPosition[1] + Math.random() * 8,
          startPosition[2] + (Math.random() - 0.5) * 10
        );
        timeRef.current = -Math.random() * 3;
      }
    }
  });

  return (
    <group ref={groupRef} position={startPosition}>
      {/* Meteor head */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>

      {/* Trail particles */}
      {trailParticles.map((particle, i) => (
        <mesh key={i} position={[particle.offset, particle.offset * 0.5, 0]}>
          <sphereGeometry args={[0.08 * particle.scale, 8, 8]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={particle.opacity * 0.6} 
          />
        </mesh>
      ))}
    </group>
  );
};

// Twinkling distant star
const TwinklingStar = ({ position }) => {
  const meshRef = useRef();
  const speedRef = useRef(Math.random() * 2 + 1);

  useFrame((state) => {
    if (meshRef.current) {
      const opacity = 0.3 + Math.sin(state.clock.elapsedTime * speedRef.current) * 0.4;
      meshRef.current.material.opacity = Math.max(0.1, opacity);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
    </mesh>
  );
};

const ThreeBackground = () => {
  // Generate random twinkling stars
  const twinklingStars = useMemo(() => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        position: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 30,
          -10 - Math.random() * 20,
        ],
      });
    }
    return stars;
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Ambient lighting */}
          <ambientLight intensity={0.1} />

          {/* Multiple shooting stars with different speeds and positions */}
          <ShootingStar startPosition={[12, 8, -5]} speed={8} delay={0} />
          <ShootingStar startPosition={[15, 10, -8]} speed={10} delay={2} />
          <ShootingStar startPosition={[10, 6, -3]} speed={6} delay={4} />
          <ShootingStar startPosition={[18, 12, -10]} speed={12} delay={1} />
          <ShootingStar startPosition={[8, 9, -6]} speed={7} delay={3} />

          {/* Larger meteors with colorful trails */}
          <Meteor startPosition={[20, 15, -5]} speed={5} delay={0} color="#3b82f6" />
          <Meteor startPosition={[25, 12, -8]} speed={4} delay={3} color="#8b5cf6" />
          <Meteor startPosition={[18, 18, -3]} speed={6} delay={1.5} color="#06b6d4" />
          <Meteor startPosition={[22, 14, -10]} speed={4.5} delay={4} color="#10b981" />
          <Meteor startPosition={[15, 16, -6]} speed={5.5} delay={2.5} color="#f59e0b" />

          {/* Twinkling stars in background */}
          {twinklingStars.map((star, i) => (
            <TwinklingStar key={i} position={star.position} />
          ))}

          {/* Dense starfield background */}
          <Stars
            radius={100}
            depth={60}
            count={8000}
            factor={4}
            saturation={0.2}
            fade
            speed={0.2}
          />

          {/* Additional layer of smaller stars */}
          <Stars
            radius={50}
            depth={30}
            count={3000}
            factor={2}
            saturation={0}
            fade
            speed={0.1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
