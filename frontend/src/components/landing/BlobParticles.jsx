import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import {
  fibonacciSphere,
  createParticleTexture,
} from "./blobUtils";

import {
  initParticles,
  updateParticles,
  triggerExplosion,
} from "./particlePhysics";

import { useMouse } from "./mouseController";

const COUNT = 10000;
const BASE_RADIUS = 2.2;

const getCurrentTheme = () => {
  return document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
};

export default function BlobParticles({
  enableBloom = false,
}) {
  const pointsRef = useRef(null);
  const matRef = useRef(null);
  const groupRef = useRef(null);

  const textureRef = useRef(null);

  const mouse = useMouse();
  const { camera } = useThree();

  // =====================================================
  // THEME
  // =====================================================

  const [theme, setTheme] = useState(getCurrentTheme);

  useEffect(() => {
    const updateTheme = () => {
      setTheme(getCurrentTheme());
    };

    // Detect Tailwind dark class changes
    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial check
    updateTheme();

    return () => {
      observer.disconnect();
    };
  }, []);

  // =====================================================
  // THEME COLORS
  // =====================================================

  const colors = useMemo(() => {
    if (theme === "dark") {
      return {
        center: "#E0F2FE",
        edge: "#22D3EE",
        particle: "#6366F1",
      };
    }

    return {
      center: "#172554",
      edge: "#2563EB",
      particle: "#3B82F6",
    };
  }, [theme]);

  // =====================================================
  // PARTICLE DATA
  // =====================================================

  const { dirs, buffers } = useMemo(() => {
    const dirs = fibonacciSphere(COUNT);

    const buffers = initParticles(
      COUNT,
      BASE_RADIUS,
      dirs
    );

    return {
      dirs,
      buffers,
    };
  }, []);

  // =====================================================
  // CREATE / UPDATE PARTICLE TEXTURE
  // =====================================================

  useEffect(() => {
    const newTexture = createParticleTexture(
      64,
      colors.center,
      colors.edge
    );

    textureRef.current = newTexture;

    if (matRef.current) {
      matRef.current.map = newTexture;
      matRef.current.needsUpdate = true;
    }

    return () => {
      newTexture.dispose();
    };
  }, [colors]);

  // =====================================================
  // UPDATE PARTICLE COLORS
  // =====================================================

  useEffect(() => {
    const particleColor = new THREE.Color(
      colors.particle
    );

    const colorsArray = buffers.colors;

    for (let i = 0; i < COUNT; i++) {
      const index = i * 3;

      colorsArray[index] = particleColor.r;
      colorsArray[index + 1] = particleColor.g;
      colorsArray[index + 2] = particleColor.b;
    }

    if (pointsRef.current?.geometry) {
      const colorAttribute =
        pointsRef.current.geometry.attributes.color;

      if (colorAttribute) {
        colorAttribute.needsUpdate = true;
      }
    }
  }, [theme, colors.particle, buffers]);

  // =====================================================
  // GEOMETRY
  // =====================================================

  useEffect(() => {
    if (!pointsRef.current) {
      return;
    }

    const geometry =
      pointsRef.current.geometry;

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        buffers.positions,
        3
      )
    );

    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(
        buffers.colors,
        3
      )
    );

   if (geometry.attributes.position) {
    geometry.attributes.position.needsUpdate = true;
  }

  if (geometry.attributes.color) {
    geometry.attributes.color.needsUpdate = true;
  }

  }, [buffers]);

  // =====================================================
  // TIMINGS
  // =====================================================

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
    []
  );

  const TOTAL = Object.values(
    TIMINGS
  ).reduce(
    (a, b) => a + b,
    0
  );

  // =====================================================
  // CAMERA
  // =====================================================

  const idleZ = 7;
  const zoomZ = 5.8;

  const explosionTriggered =
    useRef(false);

  // =====================================================
  // ANIMATION
  // =====================================================

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // ---------------------------------------------------
    // Current animation phase
    // ---------------------------------------------------

    let cycle = t % TOTAL;
    let phase = "idle";

    for (const [key, value] of Object.entries(TIMINGS)) {
      if (cycle <= value) {
        phase = key;
        break;
      }

      cycle -= value;
    }

    // ---------------------------------------------------
    // Camera
    // ---------------------------------------------------

    if (
      phase === "explode" ||
      phase === "glow" ||
      phase === "zoomIn"
    ) {
      camera.position.z +=
        (zoomZ - camera.position.z) *
        Math.min(1, delta * 0.8);
    } else {
      camera.position.z +=
        (idleZ - camera.position.z) *
        Math.min(1, delta * 0.6);
    }

    // ---------------------------------------------------
    // Explosion
    // ---------------------------------------------------

    if (
      phase === "explode" &&
      !explosionTriggered.current
    ) {
      triggerExplosion(
        buffers.velocities,
        dirs,
        buffers.seeds,
        6.0
      );

      explosionTriggered.current = true;
    }

    if (phase !== "explode") {
      explosionTriggered.current = false;
    }

    // ---------------------------------------------------
    // Mouse world position
    // ---------------------------------------------------

    let mouseWorld = null;

    if (
      mouse.current &&
      mouse.current.active
    ) {
      const ndc = new THREE.Vector3(
        mouse.current.x,
        mouse.current.y,
        0.5
      );

      ndc.unproject(camera);

      const direction = ndc
        .sub(camera.position)
        .normalize();

      const distance =
        -camera.position.z /
        direction.z;

      const worldPos =
        camera.position
          .clone()
          .add(
            direction.multiplyScalar(
              distance
            )
          );

      mouseWorld = worldPos;
    }

    // ---------------------------------------------------
    // Physics
    // ---------------------------------------------------

    const params = {
      count: COUNT,
      delta,
      time: t,

      baseRadius:
        BASE_RADIUS *
        (1 + Math.sin(t * 0.2) * 0.03),

      noiseScale: 2.0,
      noiseAmp: 0.12,

      springStrength: 12.0,
      damping: 0.985,

      mousePos: mouseWorld,
      mouseRadius: 0.9,
      mouseForce: 20.0,

      explosionDecay: 0.8,
    };

    updateParticles(
      buffers,
      dirs,
      params
    );

    // ---------------------------------------------------
    // GPU updates
    // ---------------------------------------------------

    if (pointsRef.current?.geometry) {
      const geometry = pointsRef.current.geometry;

      if (geometry.attributes.position) {
        geometry.attributes.position.needsUpdate = true;
      }

      if (geometry.attributes.color) {
        geometry.attributes.color.needsUpdate = true;
      }
    }

    // ---------------------------------------------------
    // Material animation
    // ---------------------------------------------------

    if (matRef.current) {
      matRef.current.size =
        0.028 +
        Math.sin(t * 2.0) * 0.003;

      matRef.current.opacity =
        0.9 +
        Math.sin(t * 3.0) * 0.03;

      matRef.current.userData.bloom =
        Boolean(enableBloom);
    }

    // ---------------------------------------------------
    // Blob movement
    // ---------------------------------------------------

    if (groupRef.current) {
      groupRef.current.rotation.y +=
        delta * 0.06;

      groupRef.current.rotation.x =
        Math.sin(t * 0.4) * 0.06;

      groupRef.current.position.y =
        Math.sin(t * 0.8) * 0.06;
    }
  });

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <group ref={groupRef}>

      <points ref={pointsRef}>

        <bufferGeometry />

        <pointsMaterial
          ref={matRef}
          map={textureRef.current}
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