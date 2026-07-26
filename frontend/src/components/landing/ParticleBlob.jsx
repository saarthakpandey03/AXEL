import { Canvas } from "@react-three/fiber";
import BlobParticles from "./BlobParticles";

export default function ParticleBlob() {
  return (
    <div className="w-full h-[700px] overflow-visible">
        <Canvas
        camera={{
            position: [0, 0, 10],
            fov: 35,
        }}
        gl={{ alpha: true }}
        >
        

        <ambientLight intensity={0.25} />
        <pointLight
            position={[4, 4, 5]}
            intensity={6}
            color="#4F8CFF"
        />

        <BlobParticles />
        </Canvas>
    </div>
  );
}
