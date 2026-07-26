import { motion } from "framer-motion";
import {
  Bot,
  User,
  CheckCircle2,
} from "lucide-react";

const ChatBubble = () => {

const steps=[

"Reading Repository",

"Extracting Files",

"Creating Embeddings",

"Searching ChromaDB",

"AI Agent Thinking",

"Generating Response"

];

return(

<div

className="

relative

overflow-hidden

rounded-[36px]

border

border-slate-200

bg-white

shadow-[0_20px_80px_rgba(15,23,42,.08)]

"

>

{/* Top */}

<div

className="

border-b

border-slate-100

px-8

py-6

"

>

<h3

className="

text-2xl

font-black

text-slate-900

"

>

Live Demo

</h3>

<p

className="

mt-2

text-slate-500

"

>

See how AXEL reasons before answering.

</p>

</div>

{/* Chat */}

<div

className="

space-y-8

p-8

"

>

{/* USER */}

<div

className="

flex

justify-end

"

>

<div

className="

max-w-lg

rounded-3xl

bg-slate-900

px-6

py-5

text-white

"

>

<div

className="

mb-3

flex

items-center

gap-3

"

>

<User size={18}/>

<span

className="font-semibold"

>

You

</span>

</div>

<p>

Summarize this GitHub repository.

</p>

</div>

</div>

{/* BOT */}

<div

className="

flex

justify-start

"

>

<motion.div

initial={{

opacity:0,

y:25

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

className="

max-w-xl

rounded-3xl

bg-slate-50

px-6

py-6

"

>

<div

className="

mb-5

flex

items-center

gap-3

"

>

<div

className="

flex

h-10

w-10

items-center

justify-center

rounded-full

bg-blue-600

text-white

"

>

<Bot size={18}/>

</div>

<div>

<h4

className="font-bold"

>

AXEL

</h4>

<p

className="text-sm text-slate-500"

>

AI Workspace

</p>

</div>

</div>

<div className="space-y-4">
            {steps.map((step, index) => (

          <motion.div

            key={step}

            initial={{
              opacity:0,
              x:-20
            }}

            whileInView={{
              opacity:1,
              x:0
            }}

            viewport={{
              once:true
            }}

            transition={{
              delay:index*0.25
            }}

            className="

            flex

            items-center

            gap-3

            "

          >

            <CheckCircle2

              size={18}

              className="text-green-500"

            />

            <span className="text-slate-600">

              {step}...

            </span>

          </motion.div>

        ))}

        {/* Typing */}

        <motion.div

          initial={{
            opacity:0
          }}

          whileInView={{
            opacity:1
          }}

          transition={{
            delay:1.8
          }}

          className="

          flex

          items-center

          gap-2

          py-2

          "

        >

          <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"/>

          <div
            className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
            style={{animationDelay:".15s"}}
          />

          <div
            className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
            style={{animationDelay:".3s"}}
          />

          <span className="ml-2 text-sm text-slate-500">

            Thinking...

          </span>

        </motion.div>

        {/* Final Response */}

        <motion.div

          initial={{
            opacity:0,
            y:20
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          transition={{
            delay:2.2,
            duration:.6
          }}

          className="

          mt-6

          rounded-2xl

          border

          border-blue-100

          bg-blue-50

          p-5

          "

        >

          <p className="leading-8 text-slate-700">

            This repository is a full-stack MERN application
            using JWT authentication, protected routes,
            MongoDB as the database and Express APIs.
            It follows a modular architecture with reusable
            React components and demonstrates clean state
            management and scalable project structure.

          </p>

        </motion.div>

      </div>

    </motion.div>

  </div>

</div>

</div>
);

};

export default ChatBubble;
