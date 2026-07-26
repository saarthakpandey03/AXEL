import { useRef, useState } from "react";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

import WorkflowCard from "./WorkflowCard";
import { workflow } from "./workflowData";

const STEP_HEIGHT = 192;

export default function Workflow() {

  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({

    target: sectionRef,

    offset: ["start center", "end center"],

  });

  /* Blue Progress Line */

  const progressHeight = useTransform(
    scrollYProgress,
    [0, 1],
    [0, STEP_HEIGHT * (workflow.length - 1)]
  );

  /* Current Active Card */

  useMotionValueEvent(scrollYProgress, "change", (latest) => {

    const total = workflow.length;

    const current = Math.min(
      total - 1,
      Math.floor(latest * total)
    );

    setActiveIndex(current);

  });

  return (

    <section

      ref={sectionRef}

      className="

      relative

      py-32

      bg-white

      "

    >

      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}

        <div className="text-center">

          <span
            className="
            inline-flex

            rounded-full

            bg-zinc-100

            text-zinc-800

            px-5
            py-2

            text-sm

            font-semibold

           
            "
          >

            HOW AXEL WORKS

          </span>

          <h2
            className="

            mt-6

            text-5xl

            font-black

            tracking-tight

            text-slate-900

            "
          >

            From Upload

            <span className="text-blue-600">

              {" "}to Answer

            </span>

          </h2>

          <p
            className="

            mx-auto

            mt-6

            max-w-3xl

            text-lg

            leading-8

            text-slate-500

            "
          >

            AXEL processes every document through
            an intelligent AI pipeline before
            generating accurate answers.

          </p>

        </div>

        {/* Main Layout */}

        <div
          className="

          mt-24

          grid

          lg:grid-cols-2

          gap-20

          "
        >

          {/* LEFT PANEL */}

          <div

            className="

            sticky

            top-28

            h-[500px]

            hidden

            lg:flex

            items-center

            justify-center

            rounded-[40px]

            border

            bg-gradient-to-br

            from-blue-50

            via-white

            to-indigo-50

            shadow-xl

            "

          >
                        <motion.div

              animate={{
                scale:1 + activeIndex * 0.02,
                rotate:activeIndex * 4
              }}

              transition={{
                duration:.5
              }}

              className="text-[140px]"

            >

              {workflow[activeIndex].emoji}

            </motion.div>

          </div>

          {/* RIGHT TIMELINE */}

          <div className="relative">

            {/* Gray Line */}

            <div

              className="

              absolute

              left-[22px]

              top-0

              w-[4px]

              h-full

              rounded-full

              bg-slate-200

              "

            />

            {/* Blue Progress */}

            <motion.div

              style={{
                height:progressHeight
              }}

              className="

              absolute

              left-[22px]

              top-0

              w-[4px]

              rounded-full

              bg-black

              "

            />

            <div className="space-y-12">

              {

              workflow.map((step,index)=>(

                <WorkflowCard

                  key={step.id}

                  step={step}

                  index={index}

                  activeIndex={activeIndex}

                />

              ))

              }

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}
