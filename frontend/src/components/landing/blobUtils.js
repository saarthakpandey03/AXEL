import * as THREE from "three";

// Utility helpers: fibonacci sphere distribution, procedural noise,
// particle texture creation, and easing functions.

/** Generate 'count' directions evenly distributed on a unit sphere using
 * the Fibonacci sphere algorithm. Returns an array of THREE.Vector3.
 */
export function fibonacciSphere(count) {
  const pts = new Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    pts[i] = new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r);
  }

  return pts;
}

/** Lightweight stable noise function based on multiple sines. Cheap and
 * artistically useful for organic motion (not high-quality Perlin noise,
 * but deterministic and fast).
 */
export function noise3(x, y, z) {
  return (
    (Math.sin(x * 1.1 + y * 0.8 + z * 1.3) +
      Math.sin(x * 2.4 - y * 1.2 + z * 0.6) * 0.5 +
      Math.sin(x * 0.6 + y * 2.1 - z * 1.5) * 0.25) /
    1.75
  );
}

export function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/** Create a soft circular particle texture as a THREE.CanvasTexture. */
export function createParticleTexture(
  size = 64,
  innerColor = "#ffffff",
  midColor = "#7dc3ff",
) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  grad.addColorStop(0, innerColor);
  grad.addColorStop(0.35, midColor);
  grad.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  tex.generateMipmaps = true;
  return tex;
}
