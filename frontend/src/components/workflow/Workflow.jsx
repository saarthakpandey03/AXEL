import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

import WorkflowCard from "./WorkFlowCard.jsx";
import { workflow } from "./workflowData.jsx";

const STEP_HEIGHT = 192;

export default function Workflow() {

  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const progressHeight = useTransform(
    scrollYProgress,
    [0, 1],
    [0, STEP_HEIGHT * (workflow.length - 1)]
  );

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {

      const total = workflow.length;

      const current = Math.min(
        total - 1,
        Math.floor(latest * total)
      );

      setActiveIndex(current);
    }
  );


  return (

    <section
      ref={sectionRef}
      className="
        relative
        bg-white
        py-24
        text-slate-900
        transition-colors
        duration-300

        dark:bg-[#171717]
        dark:text-white

        sm:py-28
        lg:py-32
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          sm:px-8
          lg:px-12
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="text-center">

          <span
            className="
              inline-flex
              items-center
              rounded-full
              bg-zinc-100
              px-5
              py-2
              text-sm
              font-semibold
              text-zinc-800
              transition-colors
              duration-300

              dark:bg-zinc-800
              dark:text-zinc-200
            "
          >
            HOW AXEL WORKS
          </span>


          <h2
            className="
              mt-6
              text-4xl
              font-black
              tracking-tight
              text-slate-900
              transition-colors
              duration-300

              dark:text-white

              sm:text-5xl
              lg:text-6xl
            "
          >
            From Upload{" "}

            <span
              className="
                text-blue-600
                dark:text-blue-400
              "
            >
              to Answer
            </span>

          </h2>


          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-base
              leading-7
              text-slate-500

              dark:text-slate-400

              sm:text-lg
              sm:leading-8
            "
          >
            AXEL processes every document through an
            intelligent AI pipeline before generating
            accurate answers.
          </p>

        </div>


        {/* =================================================
            WORKFLOW
        ================================================= */}

        <div
          className="
            mt-16
            grid
            gap-12

            lg:mt-24
            lg:grid-cols-2
            lg:gap-20
          "
        >

          {/* =================================================
              VISUAL PANEL
          ================================================= */}

          <div
            className="
              sticky
              top-28
              hidden
              h-[500px]
              items-center
              justify-center
              overflow-hidden
              rounded-[40px]
              border
              border-blue-100
              bg-gradient-to-br
              from-blue-50
              via-white
              to-indigo-50
              shadow-xl
              transition-all
              duration-300

              dark:border-slate-800
              dark:from-[#172554]
              dark:via-[#202020]
              dark:to-[#1e1b4b]
              dark:shadow-[0_20px_70px_rgba(37,99,235,0.12)]

              lg:flex
            "
          >

            {/* Background glow */}

            <div
              className="
                absolute
                h-72
                w-72
                rounded-full
                bg-blue-400/20
                blur-[100px]

                dark:bg-cyan-400/10
              "
            />


            {/* Active Emoji */}

            <motion.div
              animate={{
                scale:
                  1 + activeIndex * 0.02,

                rotate:
                  activeIndex * 4,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                relative
                z-10
                text-[110px]
                drop-shadow-xl

                sm:text-[130px]
                lg:text-[140px]
              "
            >
              {workflow[activeIndex].emoji}
            </motion.div>

          </div>


          {/* =================================================
              STEPS
          ================================================= */}

          <div className="relative">

            {/* Background line */}

            <div
              className="
                absolute
                left-[22px]
                top-0
                h-full
                w-[4px]
                rounded-full
                bg-slate-200

                dark:bg-slate-800
              "
            />


            {/* Progress line */}

            <motion.div
              style={{
                height: progressHeight,
              }}
              className="
                absolute
                left-[22px]
                top-0
                w-[4px]
                rounded-full
                bg-blue-600

                dark:bg-cyan-400
              "
            />


            {/* Workflow Cards */}

            <div className="space-y-12">

              {workflow.map(
                (step, index) => (

                  <WorkflowCard
                    key={step.id}
                    step={step}
                    index={index}
                    activeIndex={activeIndex}
                  />

                )
              )}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}