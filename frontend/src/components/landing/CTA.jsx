import { motion } from "framer-motion";
import { ArrowRight} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function CTA() {

return(

<section

className="

relative

overflow-hidden

py-36

bg-[#0f172a]

"

>

{/* Glow */}

<div

className="

absolute

left-1/2

top-1/2

h-[550px]

w-[550px]

-translate-x-1/2

-translate-y-1/2

rounded-full

bg-blue-500/20

blur-[150px]

"

/>

<div

className="

relative

mx-auto

max-w-6xl

px-8

text-center

"

>

<motion.span

initial={{opacity:0,y:20}}

whileInView={{opacity:1,y:0}}

viewport={{once:true}}

className="

inline-flex

rounded-full

bg-white/10

px-5

py-2

text-sm

font-semibold

tracking-wide

text-blue-300

"

>

READY TO BUILD?

</motion.span>

<motion.h2

initial={{opacity:0,y:40}}

whileInView={{opacity:1,y:0}}

transition={{delay:.1}}

viewport={{once:true}}

className="

mt-8

text-5xl

lg:text-7xl

font-black

leading-tight

text-white

"

>

Start chatting

<br/>

with your data

today.

</motion.h2>

<motion.p

initial={{opacity:0}}

whileInView={{opacity:1}}

transition={{delay:.2}}

viewport={{once:true}}

className="

mx-auto

mt-8

max-w-3xl

text-lg

leading-8

text-slate-300

"

>

Upload PDFs, GitHub repositories, websites,
YouTube videos and folders.
Let AXEL understand everything for you.

</motion.p>

<div

className="

mt-14

flex

flex-wrap

justify-center

gap-6

"

>        {/* Start Chat */}

        <motion.button

          whileHover={{
            scale:1.05,
            y:-3
          }}

          whileTap={{
            scale:.96
          }}

          className="

          group

          flex

          items-center

          gap-3

          rounded-full

          bg-white

          px-8

          py-4

          text-lg

          font-semibold

          text-slate-900

          shadow-xl

          transition-all

          duration-300

          hover:bg-blue-500

          hover:text-white

          "

        >

          Start Chat

          <ArrowRight

            size={20}

            className="

            transition-transform

            duration-300

            group-hover:translate-x-1

            "

          />

        </motion.button>

        {/* GitHub */}

        <motion.a

          whileHover={{
            scale:1.05,
            y:-3
          }}

          whileTap={{
            scale:.96
          }}

          href="#"

          className="

          flex

          items-center

          gap-3

          rounded-full

          border

          border-white/20

          bg-white/10

          px-8

          py-4

          text-lg

          font-semibold

          text-white

          backdrop-blur-md

          transition-all

          duration-300

          hover:bg-white

          hover:text-slate-900

          "

        >

          <FaGithub size={20}/>

          GitHub

        </motion.a>

      </div>

      {/* Stats */}

      <div

        className="

        mt-20

        grid

        grid-cols-2

        gap-8

        md:grid-cols-4

        "

      >

        {

        [

          ["10+","Supported Sources"],

          ["AI","Agent Powered"],

          ["24/7","Available"],

          ["Fast","Responses"]

        ].map(([value,label])=>(

          <div

            key={label}

            className="text-center"

          >

            <h3

              className="

              text-4xl

              font-black

              text-white

              "

            >

              {value}

            </h3>

            <p

              className="

              mt-2

              text-slate-400

              "

            >

              {label}

            </p>

          </div>

        ))

        }

      </div>

    </div>

    {/* Floating Blur */}

    <div

      className="

      absolute

      -left-20

      bottom-0

      h-64

      w-64

      rounded-full

      bg-cyan-400/10

      blur-[120px]

      "

    />

    <div

      className="

      absolute

      -right-20

      top-0

      h-64

      w-64

      rounded-full

      bg-indigo-500/10

      blur-[120px]

      "

    />

  </section>

);

}