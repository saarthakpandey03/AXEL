import { FileText, Code2, Globe, Image as ImageIcon, Folder, MessageCircle, Layers, Zap, ArrowRight, } from "lucide-react";
import { FaYoutube } from "react-icons/fa";

const features = [
  { id: "chat-pdfs", title: "Chat with PDFs", description: "Upload any PDF and ask questions. AXEL understands and answers instantly.", icon: FileText, iconColor: "#6D5EF6", iconBg: "#EEEBFF", grid: { colStart: 1, colSpan: 9, rowStart: 1, rowSpan: 1 } },
  { id: "github-repos", title: "GitHub repositories", description: "Understand any codebase within seconds. Get insights, explanations and summaries.", icon: Code2, iconColor: "#22B37A", iconBg: "#E6F8EF", grid: { colStart: 10, colSpan: 9, rowStart: 1, rowSpan: 1 } },
  { id: "websites", title: "Websites", description: "Analyze any website, documentation or blog. Get key information in seconds.", icon: Globe, iconColor: "#3B82F6", iconBg: "#EAF1FF", grid: { colStart: 19, colSpan: 6, rowStart: 1, rowSpan: 2 } },
  { id: "youtube", title: "YouTube videos", description: "Chat with long videos using transcripts. Ask anything.", icon: FaYoutube, iconColor: "#EF4444", iconBg: "#FDECEC", grid: { colStart: 1, colSpan: 6, rowStart: 2, rowSpan: 1 } },
  { id: "images", title: "Images", description: "Extract insights from charts, screenshots and diagrams.", icon: ImageIcon, iconColor: "#A855F7", iconBg: "#F5EBFF", grid: { colStart: 7, colSpan: 6, rowStart: 2, rowSpan: 1 } },
  { id: "folders", title: "Folders", description: "Upload complete folders and search across all files instantly.", icon: Folder, iconColor: "#F59E0B", iconBg: "#FEF3E2", grid: { colStart: 13, colSpan: 6, rowStart: 2, rowSpan: 1 } },
  { id: "ai-chat", title: "AI Chat", description: "Multi-turn conversations with memory and context. AXEL remembers.", icon: MessageCircle, iconColor: "#14B8A6", iconBg: "#E7FAF7", grid: { colStart: 1, colSpan: 8, rowStart: 3, rowSpan: 1 } },
  { id: "rag-powered", title: "RAG Powered", description: "Advanced Retrieval Augmented Generation for accurate answers.", icon: Layers, iconColor: "#3B82F6", iconBg: "#EAF1FF", grid: { colStart: 9, colSpan: 8, rowStart: 3, rowSpan: 1 } },
  { id: "lightning-fast", title: "Lightning Fast", description: "Optimized for speed so you get answers in real-time.", icon: Zap, iconColor: "#A855F7", iconBg: "#F5EBFF", grid: { colStart: 17, colSpan: 8, rowStart: 3, rowSpan: 1 } },
];

function FeatureCard({ feature }) {
  const Icon = feature.icon;
  const { colStart, colSpan, rowStart, rowSpan } = feature.grid;
  return (
    <div className="bento-card group relative flex flex-col rounded-[28px] border border-slate-200 bg-white p-8 min-h-[220px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-[0_20px_60px_rgba(59,130,246,.10)]" style={{ gridColumn: `${colStart} / span ${colSpan}`, gridRow: `${rowStart} / span ${rowSpan}` }}>
      <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-blue-500/5 blur-[90px] opacity-0 transition-all duration-700 group-hover:opacity-100" />
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" style={{ backgroundColor: feature.iconBg }}>
        <Icon size={30} color={feature.iconColor} strokeWidth={2} />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
      <p className="flex-1 text-[15px] leading-7 text-slate-500">{feature.description}</p>
      {!feature.noArrow ? (
        <div className="mt-8 flex items-center gap-2 text-blue-600 font-semibold opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span>Learn More</span>
          <ArrowRight size={18} />
        </div>
      ) : (
        <div className="mt-8 h-6" />
      )}
    </div>
  );
}

export default function AxelFeaturesGrid() {
  return (
    <section className="w-full bg-[#F7F8FA] px-6 py-24">
      <style>{` .bento-grid{display:grid;grid-template-columns:repeat(24,minmax(0,1fr));grid-auto-rows:minmax(210px,auto);gap:1.35rem;} @media(max-width:1279px){.bento-grid{grid-template-columns:repeat(3,1fr);} .bento-card{grid-column:auto !important;grid-row:auto !important;}} @media(max-width:900px){.bento-grid{grid-template-columns:repeat(2,1fr);}} @media(max-width:640px){.bento-grid{grid-template-columns:1fr;}} `}</style>
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold tracking-wide text-blue-600">
            <span className="h-2 w-2 rounded-full bg-blue-600" /> FEATURES
          </span>
        </div>
        <h2 className="mt-7 text-center text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
          Everything you can do with <span className="text-blue-600">AXEL</span>
        </h2>
        <p className="mx-auto mt-7 max-w-3xl text-center text-lg leading-8 text-slate-500">
          Chat with PDFs, GitHub repositories, websites, YouTube videos, images and folders using one intelligent AI workspace.
        </p>
        <div className="bento-grid mt-20">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
