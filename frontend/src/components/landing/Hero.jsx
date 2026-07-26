
import ParticleBlob from "./ParticleBlob";

const Hero = () => {
  return (
    <section className="w-full mt-18">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-6 lg:py-10">

        <div className="grid lg:grid-cols-2 gap-15 items-center">

          {/* Left */}

          <div>

            <p className="uppercase tracking-[6px] text-sm text-gray-500 font-medium mb-6">
              YOUR SECOND BRAIN
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-gray-900">

              Understand

              <br />

              Everything.

              <br />

              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                Ask Anything.
              </span>

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-500">

              AXEL is your AI workspace for understanding
              documents, websites, GitHub repositories,
              images, YouTube videos, folders and more —
              all in one intelligent conversation.

            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <button
                className="
                px-8
                py-4
                rounded-full
                bg-gray-900
                text-white
                font-medium
                transition-all
                duration-300
                hover:bg-blue-600
                hover:scale-105
                shadow-lg
                "
              >
                Start Chat
              </button>

              <button
                className="
                px-8
                py-4
                rounded-full
                border
                border-gray-300
                bg-white
                text-gray-900
                font-medium
                transition-all
                duration-300
                hover:border-blue-500
                hover:text-blue-600
                hover:shadow-md
                "
              >
                Documentation
              </button>

            </div>

          </div>

          {/* Right */}

          <div className="w-full h-[700px] flex items-center justify-center">
                <ParticleBlob />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;