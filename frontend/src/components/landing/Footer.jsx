import { ArrowUpRight, Mail } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  const product = ["Features", "Workflow", "AI Agent", "Live Demo"];
  const resources = ["Documentation", "GitHub", "API", "Blog"];
  const company = ["About", "Contact", "Privacy", "Terms"];

  return (
    <footer className="relative overflow-hidden bg-[#0B1220] pt-24 pb-10">
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-8">
        <div className="grid gap-16 lg:grid-cols-4">
          <div>
            <h2 className="text-5xl font-black tracking-tight text-white">AXEL</h2>
            <p className="mt-5 leading-8 text-slate-400">
              AI Workspace for understanding documents, repositories, websites, videos and more.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="rounded-full bg-white/10 p-3 text-slate-300 transition hover:bg-blue-600 hover:text-white">
                <FaGithub size={18} />
              </button>
              <button className="rounded-full bg-white/10 p-3 text-slate-300 transition hover:bg-blue-600 hover:text-white">
                <FaLinkedin size={18} />
              </button>
              <button className="rounded-full bg-white/10 p-3 text-slate-300 transition hover:bg-blue-600 hover:text-white">
                <Mail size={18} />
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white">Product</h3>
            <div className="mt-6 space-y-4">
              {product.map((item) => (
                <a key={item} href="#" className="group flex items-center gap-2 text-slate-400 transition hover:text-white">
                  {item}
                  <ArrowUpRight size={15} className="opacity-0 transition group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white">Resources</h3>
            <div className="mt-6 space-y-4">
              {resources.map((item) => (
                <a key={item} href="#" className="group flex items-center gap-2 text-slate-400 transition hover:text-white">
                  {item}
                  <ArrowUpRight size={15} className="opacity-0 transition group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white">Company</h3>
            <div className="mt-6 space-y-4">
              {company.map((item) => (
                <a key={item} href="#" className="group flex items-center gap-2 text-slate-400 transition hover:text-white">
                  {item}
                  <ArrowUpRight size={15} className="opacity-0 transition group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-8 flex flex-col gap-4 md:flex-row items-center justify-between">
          <p className="text-slate-500">© 2026 AXEL. All rights reserved.</p>
          <p className="text-slate-500">Made with ❤️ by Saarthak Pandey</p>
        </div>
      </div>
    </footer>
  );
}
