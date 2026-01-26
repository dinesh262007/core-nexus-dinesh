import { Instagram, Linkedin, Mail } from "lucide-react";

const navLinks = ["Home", "About", "Cells", "Aarohan"];

export default function Footer() {
  return (
    <footer className="relative bg-[#0F0F0F] text-[#efefef] overflow-hidden">
      {/* Upper content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-16 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">

          {/* Logo */}
          <div className="md:col-span-6 flex items-center justify-center md:justify-start">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#efefef]">
              CCA
            </h2>
          </div>

          {/* Navigation */}
          <nav className="md:col-span-3 space-y-3 md:space-y-4 text-xs sm:text-sm font-light tracking-widest text-center md:text-left">
            {navLinks.map((item) => (
              <a
                key={item}
                href="#"
                className="block text-[#484848] hover:text-[#efefef] transition"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Contact + Socials */}
          <div className="md:col-span-3 space-y-6 md:space-y-8 text-xs sm:text-sm text-center md:text-left">
            <div className="bg-[#161616] p-4 rounded-lg">
              <p className="uppercase tracking-widest text-[#484848] mb-2 text-xs">
                Contact
              </p>
              <p className="text-[#484848]">contact@ccanitd.in</p>
              <p className="text-[#484848]">NIT Durgapur, India</p>
            </div>

            <div className="bg-[#161616] p-4 rounded-lg">
              <p className="uppercase tracking-widest text-[#484848] mb-2 text-xs">
                Our Voice
              </p>
              <div className="space-y-1">
                <a className="flex items-center gap-2 text-[#484848] hover:text-[#efefef] justify-center md:justify-start transition">
                  Instagram →
                </a>
                <a className="flex items-center gap-2 text-[#484848] hover:text-[#efefef] justify-center md:justify-start transition">
                  LinkedIn →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom brand */}
      <div className="relative z-10 overflow-hidden">
        <h1 className="select-none text-[20vw] sm:text-[24vw] md:text-[28vw] leading-none font-bold tracking-tight text-[#484848] text-center">
          CCA
        </h1>

        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-xs text-[#484848]">
          © {new Date().getFullYear()} CCA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}