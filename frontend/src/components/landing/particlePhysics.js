import * as THREE from "three";
import { noise3 } from "./blobUtils";

// Particle physics helpers. This module focuses on array-based updates so we
// can operate on raw Float32Arrays (needed for BufferGeometry updates).

/** Initialize particle buffers. Returns an object with preallocated
 * Float32Arrays for positions, colors, velocities, forces, target positions,
 * and an array of direction THREE.Vector3 for convenience.
 */
export function initParticles(count, radius, dirs) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const forces = new Float32Array(count * 3);
  const targets = new Float32Array(count * 3);
  const seeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const d = dirs[i];
    const r = radius;
    const ix = i * 3;

    positions[ix] = d.x * r;
    positions[ix + 1] = d.y * r;
    positions[ix + 2] = d.z * r;

    targets[ix] = d.x * r;
    targets[ix + 1] = d.y * r;
    targets[ix + 2] = d.z * r;

    velocities[ix] = 0;
    velocities[ix + 1] = 0;
    velocities[ix + 2] = 0;

    forces[ix] = 0;
    forces[ix + 1] = 0;
    forces[ix + 2] = 0;

    // base color set to idle blue-ish
    colors[ix] = 0.37; // r
    colors[ix + 1] = 0.72; // g
    colors[ix + 2] = 1; // b

    seeds[i] = Math.random() * 1000;
  }

  return { positions, colors, velocities, forces, targets, seeds };
}

/** Apply explosion by adding an initial outward velocity per particle.
 * This assigns a randomized impulse once (not every frame).
 */
export function triggerExplosion(velocities, dirs, seeds, magnitude = 3.5) {
  const tmp = new THREE.Vector3();
  for (let i = 0; i < seeds.length; i++) {
    const ix = i * 3;
    const d = dirs[i];

    // random unit vector perturbation
    tmp
      .set(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
      )
      .normalize();
    // base outward + random
    const vx =
      d.x * (magnitude * (0.6 + Math.random() * 0.8)) +
      tmp.x * (magnitude * 0.5);
    const vy =
      d.y * (magnitude * (0.6 + Math.random() * 0.8)) +
      tmp.y * (magnitude * 0.5);
    const vz =
      d.z * (magnitude * (0.6 + Math.random() * 0.8)) +
      tmp.z * (magnitude * 0.5);

    velocities[ix] += vx;
    velocities[ix + 1] += vy;
    velocities[ix + 2] += vz;
  }
}

/** Update loop that applies spring to target, noise deformation, damping,
 * explosion decay and mouse repulsion.
 * - positions, velocities, forces and colors are updated in place.
 * - mousePos is optional THREE.Vector3 in world space.
 */
export function updateParticles(
  { positions, velocities, forces, targets, colors, seeds },
  dirs,
  params,
) {
  const {
    count,
    delta,
    time,
    baseRadius,
    noiseScale,
    noiseAmp,
    springStrength,
    damping,
    mousePos,
    mouseRadius,
    mouseForce,
    explosionDecay,
  } = params;

  // local temp vectors to avoid allocations in loop
  const px = 0;
  for (let i = 0; i < count; i++) {
    const ix = i * 3;

    // procedural deformation around the base target
    const seed = seeds[i];
    const d = dirs[i];
    const n = noise3(
      d.x * noiseScale + time * 0.4 + seed,
      d.y * noiseScale + time * 0.4,
      d.z * noiseScale + time * 0.4,
    );
    const r = baseRadius + n * noiseAmp;

    // update target (breathing + ripples)
    targets[ix] = d.x * r;
    targets[ix + 1] = d.y * r;
    targets[ix + 2] = d.z * r;

    // spring force toward target
    const fx = (targets[ix] - positions[ix]) * springStrength;
    const fy = (targets[ix + 1] - positions[ix + 1]) * springStrength;
    const fz = (targets[ix + 2] - positions[ix + 2]) * springStrength;

    // mouse repulsion
    let mx = 0,
      my = 0,
      mz = 0;
    if (mousePos) {
      const dx = positions[ix] - mousePos.x;
      const dy = positions[ix + 1] - mousePos.y;
      const dz = positions[ix + 2] - mousePos.z;
      const dist2 = dx * dx + dy * dy + dz * dz;
      const mr = mouseRadius * mouseRadius;
      if (dist2 < mr) {
        const dist = Math.sqrt(dist2) + 0.0001;
        const pct = 1 - dist / mouseRadius;
        const strength = mouseForce * pct * pct;
        mx = (dx / dist) * strength;
        my = (dy / dist) * strength;
        mz = (dz / dist) * strength;
      }
    }

    // accumulate forces -> simple integration
    const ax = fx + mx - velocities[ix] * explosionDecay;
    const ay = fy + my - velocities[ix + 1] * explosionDecay;
    const az = fz + mz - velocities[ix + 2] * explosionDecay;

    velocities[ix] += ax * delta;
    velocities[ix + 1] += ay * delta;
    velocities[ix + 2] += az * delta;

    // damping
    velocities[ix] *= damping;
    velocities[ix + 1] *= damping;
    velocities[ix + 2] *= damping;

    positions[ix] += velocities[ix] * delta;
    positions[ix + 1] += velocities[ix + 1] * delta;
    positions[ix + 2] += velocities[ix + 2] * delta;

    // color pulse: brighter when particles are far from target (explosion)
    const dxT = positions[ix] - targets[ix];
    const dyT = positions[ix + 1] - targets[ix + 1];
    const dzT = positions[ix + 2] - targets[ix + 2];
    const distT = Math.sqrt(dxT * dxT + dyT * dyT + dzT * dzT);
    const glow = Math.min(1, distT / 1.5);

    // blend from blue to near-white based on glow
    colors[ix] = 0.37 + glow * 0.6; // r
    colors[ix + 1] = 0.72 + glow * 0.28; // g
    colors[ix + 2] = 1; // b stays 1
  }
}
