import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  fibonacciSphere,
  createParticleTexture,
  noise3,
  easeInOutQuad,
} from "./blobUtils";
import {
  initParticles,
  updateParticles,
  triggerExplosion,
} from "./particlePhysics";
import { useMouse } from "./mouseController";

/*
Production-grade BlobParticles

Major design decisions:
- Keep all dynamic state in typed Float32Array buffers so BufferGeometry
  attributes can be updated efficiently.
- Precompute directions with Fibonacci sphere for even distribution.
- Physics are implemented in `particlePhysics.js` and operate on arrays.
- Mouse input is captured via `useMouse` hook (normalized device coords).
- Camera control is handled via useFrame and smooth interpolation.
- Bloom readiness: `enableBloom` prop toggles a `bloom` flag on material.userData
  (postprocessing pipeline can read that flag to separate bloom passes).
*/

const COUNT = 10000; // within 9k-12k as requested
const BASE_RADIUS = 2.2;

export default function BlobParticles({ enableBloom = false }) {
  const pointsRef = useRef();
  const matRef = useRef();
  const groupRef = useRef();

  const mouse = useMouse();

  const { camera } = useThree();

  // Precompute directions and buffers once
  const { dirs, buffers, texture } = useMemo(() => {
    const dirs = fibonacciSphere(COUNT);
    const texture = createParticleTexture(64, "#ffffff", "#5EA8FF");
    const buffers = initParticles(COUNT, BASE_RADIUS, dirs);
    return { dirs, buffers, texture };
  }, []);

  // Build geometry & attributes once
  useEffect(() => {
    const geom = pointsRef.current.geometry;
    geom.setAttribute(
      "position",
      new THREE.BufferAttribute(buffers.positions, 3),
    );
    geom.setAttribute("color", new THREE.BufferAttribute(buffers.colors, 3));
    geom.attributes.position.needsUpdate = true;
    geom.attributes.color.needsUpdate = true;
  }, []);

  // State machine timings
  const TIMINGS = useMemo(
    () => ({
      idle: 4,
      breathing: 6,
      compress: 0.6,
      explode: 1.6,
      glow: 1.6,
      zoomIn: 1.2,
      hold: 1.4,
      regroup: 2.0,
      zoomOut: 1.2,
    }),
    [],
  );

  const TOTAL = Object.values(TIMINGS).reduce((a, b) => a + b, 0);

  // Camera targets
  const idleZ = 7;
  const zoomZ = 5.8;

  // Explosion applied flag to ensure trigger only once per cycle
  const explosionTriggered = useRef(false);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Cycle state based on time
    let cycle = t % TOTAL;
    let phase = "idle";
    for (const [k, v] of Object.entries(TIMINGS)) {
      if (cycle <= v) {
        phase = k;
        break;
      }
      cycle -= v;
    }

    // Camera smoothing
    if (phase === "explode" || phase === "glow" || phase === "zoomIn") {
      // approach zoomZ
      camera.position.z +=
        (zoomZ - camera.position.z) * Math.min(1, delta * 0.8);
    } else {
      camera.position.z +=
        (idleZ - camera.position.z) * Math.min(1, delta * 0.6);
    }

    // explosion trigger at start of explode phase
    if (phase === "explode" && !explosionTriggered.current) {
      triggerExplosion(buffers.velocities, dirs, buffers.seeds, 6.0);
      explosionTriggered.current = true;
    }

    if (phase !== "explode") explosionTriggered.current = false;

    // mouse world position: project NDC into world at z=0 plane
    let mouseWorld = null;
    if (mouse.current && mouse.current.active) {
      // reuse vector
      const ndc = new THREE.Vector3(mouse.current.x, mouse.current.y, 0.5);
      ndc.unproject(camera);
      // direction from camera
      const dir = ndc.sub(camera.position).normalize();
      // intersect with z=0 plane
      const distance = -camera.position.z / dir.z;
      const worldPos = camera.position
        .clone()
        .add(dir.multiplyScalar(distance));
      mouseWorld = worldPos;
    }

    // Prepare params for physics update
    const params = {
      count: COUNT,
      delta,
      time: t,
      baseRadius: BASE_RADIUS * (1 + Math.sin(t * 0.2) * 0.03), // slow breathing
      noiseScale: 2.0,
      noiseAmp: 0.12,
      springStrength: 12.0,
      damping: 0.985,
      mousePos: mouseWorld,
      mouseRadius: 0.9,
      mouseForce: 20.0,
      explosionDecay: 0.8,
    };

    // Update particle simulation (in-place)
    updateParticles(buffers, dirs, params);

    // Push updates to the GPU buffers
    const geom = pointsRef.current.geometry;
    geom.attributes.position.needsUpdate = true;
    geom.attributes.color.needsUpdate = true;

    // subtle material animation
    if (matRef.current) {
      matRef.current.size = 0.028 + Math.sin(t * 2.0) * 0.003;
      matRef.current.opacity = 0.9 + Math.sin(t * 3.0) * 0.03;
      // mark whether this material should be considered for bloom
      matRef.current.userData.bloom = !!enableBloom;
    }

    // life-like group movement
    groupRef.current.rotation.y += delta * 0.06;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.06;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry />
        <pointsMaterial
          ref={matRef}
          map={texture}
          size={0.03}
          transparent
          opacity={0.9}
          vertexColors
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
