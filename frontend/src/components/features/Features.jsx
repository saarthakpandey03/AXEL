import {
  FileText,
  Code2,
  Globe,
  Image as ImageIcon,
  Folder,
  MessageCircle,
  Layers,
  Zap,
  ArrowRight,
} from "lucide-react";

import { FaYoutube } from "react-icons/fa";

const features = [
  {
    id: "chat-pdfs",
    title: "Chat with PDFs",
    description:
      "Upload any PDF and ask questions. AXEL understands and answers instantly.",
    icon: FileText,
    iconColor: "#8B7CFF",
    iconBg: "#EEEBFF",
    darkIconColor: "#A99FFF",
    darkIconBg: "#29234A",
    grid: {
      colStart: 1,
      colSpan: 9,
      rowStart: 1,
      rowSpan: 1,
    },
  },

  {
    id: "github-repos",
    title: "GitHub repositories",
    description:
      "Understand any codebase within seconds. Get insights, explanations and summaries.",
    icon: Code2,
    iconColor: "#22B37A",
    iconBg: "#E6F8EF",
    darkIconColor: "#45D99A",
    darkIconBg: "#16382B",
    grid: {
      colStart: 10,
      colSpan: 9,
      rowStart: 1,
      rowSpan: 1,
    },
  },

  {
    id: "websites",
    title: "Websites",
    description:
      "Analyze any website, documentation or blog. Get key information in seconds.",
    icon: Globe,
    iconColor: "#3B82F6",
    iconBg: "#EAF1FF",
    darkIconColor: "#60A5FA",
    darkIconBg: "#172F52",
    grid: {
      colStart: 19,
      colSpan: 6,
      rowStart: 1,
      rowSpan: 2,
    },
  },

  {
    id: "youtube",
    title: "YouTube videos",
    description:
      "Chat with long videos using transcripts. Ask anything.",
    icon: FaYoutube,
    iconColor: "#EF4444",
    iconBg: "#FDECEC",
    darkIconColor: "#F87171",
    darkIconBg: "#4A2020",
    grid: {
      colStart: 1,
      colSpan: 6,
      rowStart: 2,
      rowSpan: 1,
    },
  },

  {
    id: "images",
    title: "Images",
    description:
      "Extract insights from charts, screenshots and diagrams.",
    icon: ImageIcon,
    iconColor: "#A855F7",
    iconBg: "#F5EBFF",
    darkIconColor: "#C084FC",
    darkIconBg: "#352044",
    grid: {
      colStart: 7,
      colSpan: 6,
      rowStart: 2,
      rowSpan: 1,
    },
  },

  {
    id: "folders",
    title: "Folders",
    description:
      "Upload complete folders and search across all files instantly.",
    icon: Folder,
    iconColor: "#F59E0B",
    iconBg: "#FEF3E2",
    darkIconColor: "#FBBF24",
    darkIconBg: "#493716",
    grid: {
      colStart: 13,
      colSpan: 6,
      rowStart: 2,
      rowSpan: 1,
    },
  },

  {
    id: "ai-chat",
    title: "AI Chat",
    description:
      "Multi-turn conversations with memory and context. AXEL remembers.",
    icon: MessageCircle,
    iconColor: "#14B8A6",
    iconBg: "#E7FAF7",
    darkIconColor: "#2DD4BF",
    darkIconBg: "#153C38",
    grid: {
      colStart: 1,
      colSpan: 8,
      rowStart: 3,
      rowSpan: 1,
    },
  },

  {
    id: "rag-powered",
    title: "RAG Powered",
    description:
      "Advanced Retrieval Augmented Generation for accurate answers.",
    icon: Layers,
    iconColor: "#3B82F6",
    iconBg: "#EAF1FF",
    darkIconColor: "#60A5FA",
    darkIconBg: "#172F52",
    grid: {
      colStart: 9,
      colSpan: 8,
      rowStart: 3,
      rowSpan: 1,
    },
  },

  {
    id: "lightning-fast",
    title: "Lightning Fast",
    description:
      "Optimized for speed so you get answers in real-time.",
    icon: Zap,
    iconColor: "#A855F7",
    iconBg: "#F5EBFF",
    darkIconColor: "#C084FC",
    darkIconBg: "#352044",
    grid: {
      colStart: 17,
      colSpan: 8,
      rowStart: 3,
      rowSpan: 1,
    },
  },
];


// =====================================================
// FEATURE CARD
// =====================================================

function FeatureCard({ feature }) {

  const Icon = feature.icon;

  const {
    colStart,
    colSpan,
    rowStart,
    rowSpan,
  } = feature.grid;


  return (

    <div
      className="
        bento-card
        group
        relative
        flex
        min-h-[220px]
        flex-col
        overflow-hidden
        rounded-[28px]
        border
        border-slate-200
        bg-white
        p-8
        transition-all
        duration-500

        hover:-translate-y-2
        hover:border-blue-200
        hover:shadow-[0_20px_60px_rgba(59,130,246,.10)]

        dark:border-slate-800
        dark:bg-[#202020]
        dark:hover:border-blue-900
        dark:hover:shadow-[0_20px_60px_rgba(37,99,235,.16)]
      "
      style={{
        gridColumn: `${colStart} / span ${colSpan}`,
        gridRow: `${rowStart} / span ${rowSpan}`,
      }}
    >

      {/* Glow */}

      <div
        className="
          absolute
          -right-20
          -top-20
          h-56
          w-56
          rounded-full
          bg-blue-500/5
          blur-[90px]
          opacity-0
          transition-all
          duration-700
          group-hover:opacity-100

          dark:bg-blue-400/10
        "
      />


      {/* Icon */}

      <div
        className="
          relative
          mb-6
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          transition-all
          duration-300
          group-hover:scale-110
          group-hover:rotate-6
        "
        style={{
          "--icon-bg": feature.iconBg,
          "--dark-icon-bg": feature.darkIconBg,
          backgroundColor: "var(--icon-bg)",
        }}
      >

        <style>
          {`
            .feature-icon-${feature.id} {
              color: ${feature.iconColor};
            }

            .dark .feature-icon-${feature.id} {
              color: ${feature.darkIconColor};
            }

            .dark .feature-bg-${feature.id} {
              background-color: ${feature.darkIconBg};
            }
          `}
        </style>

        <div
          className={`feature-bg-${feature.id} absolute inset-0 rounded-2xl`}
        />

        <Icon
          size={30}
          strokeWidth={2}
          className={`feature-icon-${feature.id} relative z-10`}
        />

      </div>


      {/* Title */}

      <h3
        className="
          relative
          mb-3
          text-2xl
          font-bold
          text-slate-900
          dark:text-white
        "
      >
        {feature.title}
      </h3>


      {/* Description */}

      <p
        className="
          relative
          flex-1
          text-[15px]
          leading-7
          text-slate-500
          dark:text-slate-400
        "
      >
        {feature.description}
      </p>


      {/* Learn More */}

      <div
        className="
          relative
          mt-8
          flex
          translate-y-3
          items-center
          gap-2
          font-semibold
          text-blue-600
          opacity-0
          transition-all
          duration-300
          group-hover:translate-y-0
          group-hover:opacity-100

          dark:text-blue-400
        "
      >

        <span>
          Learn More
        </span>

        <ArrowRight size={18} />

      </div>

    </div>
  );
}


// =====================================================
// MAIN
// =====================================================

export default function AxelFeaturesGrid() {

  return (

    <section
      className="
        w-full
        bg-[#F7F8FA]
        px-5
        py-20
        transition-colors
        duration-300

        dark:bg-[#171717]

        sm:px-6
        sm:py-24
      "
    >

      <style>
        {`
          .bento-grid {
            display: grid;
            grid-template-columns: repeat(24, minmax(0, 1fr));
            grid-auto-rows: minmax(210px, auto);
            gap: 1.35rem;
          }

          @media (max-width: 1279px) {
            .bento-grid {
              grid-template-columns: repeat(3, 1fr);
            }

            .bento-card {
              grid-column: auto !important;
              grid-row: auto !important;
            }
          }

          @media (max-width: 900px) {
            .bento-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 640px) {
            .bento-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>


      <div className="mx-auto max-w-7xl">

        {/* Badge */}

        <div className="flex justify-center">

          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-blue-100
              px-5
              py-2
              text-sm
              font-semibold
              tracking-wide
              text-blue-600

              dark:bg-blue-500/10
              dark:text-blue-400
            "
          >

            <span
              className="
                h-2
                w-2
                rounded-full
                bg-blue-600
                dark:bg-blue-400
              "
            />

            FEATURES

          </span>

        </div>


        {/* Heading */}

        <h2
          className="
            mt-7
            text-center
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
          Everything you can do with{" "}

          <span className="text-blue-600 dark:text-blue-400">
            AXEL
          </span>

        </h2>


        {/* Description */}

        <p
          className="
            mx-auto
            mt-7
            max-w-3xl
            text-center
            text-base
            leading-7
            text-slate-500

            dark:text-slate-400

            sm:text-lg
            sm:leading-8
          "
        >
          Chat with PDFs, GitHub repositories, websites,
          YouTube videos, images and folders using one
          intelligent AI workspace.
        </p>


        {/* Bento Grid */}

        <div className="bento-grid mt-14 sm:mt-20">

          {features.map((feature) => (

            <FeatureCard
              key={feature.id}
              feature={feature}
            />

          ))}

        </div>

      </div>

    </section>
  );
}