import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

const oldAI = [
  "Single document only",
  "No long-term memory",
  "Limited context window",
  "Hallucinated answers",
  "No GitHub understanding",
  "No agent workflow",
];

const axel = [
  "Multi-source reasoning",
  "Long-term memory",
  "AI Agent workflow",
  "RAG-powered answers",
  "GitHub + PDF support",
  "Images + Websites + YouTube",
];

function ComparisonCard({
  title,
  items,
  positive,
}) {

  const Icon = positive
    ? CheckCircle2
    : XCircle;

  return (

    <motion.div

      initial={{
        opacity:0,
        y:40
      }}

      whileInView={{
        opacity:1,
        y:0
      }}

      viewport={{
        once:true
      }}

      transition={{
        duration:.6
      }}

      className={`

      group

      relative

      overflow-hidden

      rounded-[32px]

      border

      p-10

      transition-all

      duration-500

      ${positive

      ?

      "border-blue-200 bg-white hover:shadow-[0_25px_70px_rgba(59,130,246,.15)]"

      :

      "border-gray-200 bg-gray-50"

      }

      `}

    >

      <div

        className={`

        absolute

        -right-24

        -top-24

        h-60

        w-60

        rounded-full

        blur-[110px]

        opacity-0

        transition-all

        duration-700

        group-hover:opacity-100

        ${positive

        ?

        "bg-blue-500/15"

        :

        "bg-gray-300/20"

        }

        `}

      />

      <h3

        className="

        text-3xl

        font-black

        text-slate-900

        "

      >

        {title}

      </h3>

      <div

        className="

        mt-10

        space-y-6

        "

      >
                {items.map((item, index) => (

          <motion.div

            key={index}

            initial={{
              opacity:0,
              x:20
            }}

            whileInView={{
              opacity:1,
              x:0
            }}

            viewport={{
              once:true
            }}

            transition={{
              delay:index*0.08
            }}

            className="

            flex

            items-start

            gap-4

            "

          >

            <Icon

              size={24}

              className={`

              mt-1

              shrink-0

              ${positive

              ?

              "text-blue-600"

              :

              "text-gray-400"

              }

              `}

            />

            <p

              className={`

              text-lg

              leading-8

              ${positive

              ?

              "text-slate-700"

              :

              "text-slate-500"

              }

              `}

            >

              {item}

            </p>

          </motion.div>

        ))}

      </div>

    </motion.div>

  );

}

export default function Comparison() {

  return (

    <section className="py-28 bg-[#fafafa]">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">

          <span

            className="

            inline-flex

            rounded-full

            bg-blue-100

            px-5

            py-2

            text-sm

            font-semibold

            tracking-wide

            text-blue-600

            "

          >

            WHY AXEL

          </span>

          <h2

            className="

            mt-6

            text-5xl

            lg:text-6xl

            font-black

            tracking-tight

            text-slate-900

            "

          >

            Built for

            <span className="text-blue-600">

              {" "}Understanding

            </span>

          </h2>

          <p

            className="

            mt-6

            max-w-3xl

            mx-auto

            text-lg

            leading-8

            text-slate-500

            "

          >

            AXEL doesn't just answer questions.

            It understands your data, reasons across
            multiple sources and responds with
            accurate context-aware answers.

          </p>

        </div>

        <div

          className="

          mt-20

          grid

          gap-8

          lg:grid-cols-2

          "

        >

          <ComparisonCard

            title="Traditional AI"

            items={oldAI}

            positive={false}

          />

          <ComparisonCard

            title="AXEL AI"

            items={axel}

            positive

          />

        </div>

      </div>

    </section>

  );

}
    
      