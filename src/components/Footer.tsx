import { Instagram, Linkedin, Mail } from "lucide-react";

const navLinks = ["Home", "About", "Cells", "Aarohan"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Vertical light bands */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-0 h-full w-40 bg-gradient-to-b from-purple-500/30 via-blue-600/40 to-transparent blur-3xl" />
        <div className="absolute left-1/2 top-0 h-full w-32 bg-gradient-to-b from-blue-700/40 via-indigo-600/40 to-transparent blur-3xl" />
      </div>

      {/* Upper content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Column 1 — Logo (1/2) */}
          <div className="md:col-span-6 flex items-center justify-center md:justify-start">
            <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-200">
              CCA
            </h2>
          </div>

          {/* Column 2 — Navigation (1/4) */}
          <nav className="md:col-span-3 space-y-4 text-sm font-light tracking-widest text-center md:text-left">
            {navLinks.map((item) => (
              <a
                key={item}
                href="#"
                className="block text-white/70 hover:text-white transition"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Column 3 — Contact + Socials (1/4) */}
          <div className="md:col-span-3 space-y-8 text-sm text-white/70 text-center md:text-left">
            {/* Contact */}
            <div>
              <p className="uppercase tracking-widest text-white/40 mb-3">
                Contact
              </p>
              <p>contact@ccanitd.in</p>
              <p>NIT Durgapur, India</p>
            </div>

            {/* Social */}
            <div>
              <p className="uppercase tracking-widest text-white/40 mb-3">
                Our Voice
              </p>
              <div className="space-y-2">
                <a href="#" className="flex items-center gap-2 hover:text-white">
                  Instagram <span>→</span>
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-white">
                  LinkedIn <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom brand block */}
      <div className="relative z-10 overflow-hidden">
        <h1 className="select-none text-[28vw] leading-none font-bold tracking-tight text-gray-300 text-center">
          CCA
        </h1>

        <div className="absolute bottom-6 right-6 text-xs text-white/40">
          © {new Date().getFullYear()} CCA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
