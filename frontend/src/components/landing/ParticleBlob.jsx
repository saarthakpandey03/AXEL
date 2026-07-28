import { Canvas } from "@react-three/fiber";
import BlobParticles from "./BlobParticles";

const ParticleBlob = ({
  className = "",
  cameraZ = 7,
  fov = 42,
}) => {
  return (
    <div className={`h-full w-full ${className}`}>
      <Canvas
        className="!h-full !w-full"
        gl={{
          antialias: true,
          alpha: true,
        }}
        camera={{
          position: [0, 0, cameraZ],
          fov,
        }}
      >
        <ambientLight intensity={0.35} />

        <pointLight
          position={[4, 4, 5]}
          intensity={5}
          color="#3b82f6"
        />

        <pointLight
          position={[-4, -3, 4]}
          intensity={2}
          color="#06b6d4"
        />

        <BlobParticles />
      </Canvas>
    </div>
  );
};

export default ParticleBlob;