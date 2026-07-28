import ParticleBlob from "../landing/ParticleBlob";

const AuthBranding = ({
  title = "Build Your AI Workspace",
  description = "Chat with PDFs, GitHub repositories, websites, images, YouTube videos and folders using one intelligent AI workspace.",
}) => {
  return (
<div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Blob */}

    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

        <div className="h-[950px] w-[950px]">

          <ParticleBlob />

        </div>

      </div>

      {/* Logo */}

      

      {/* Content */}

      <div className="absolute bottom-16 left-12 z-20 max-w-md">

        <h2 className="text-5xl font-black leading-tight text-slate-900">
          {title}
        </h2>

        <p className="mt-6 text-lg leading-8 text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
};

export default AuthBranding;