import { Instagram, Linkedin, Facebook, Twitter, Phone } from "lucide-react";
import ccalogo from "../assets/cca logo white.png";
const navLinks = ["Home", "About", "Cells", "Aarohan"];


export default function Footer() {
  return (
    <footer className="relative bg-[#141313] text-[#efefef] overflow-hidden">
      {/* Upper content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-16 md:pb-32">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Logo */}
          <div className="col-span-2 row-span-1 md:col-span-6 flex flex-col items-center justify-center md:justify-start">
            <img
              src={ccalogo}
              alt="CCA Logo"
              className="h-20 lg:h-40 w-auto object-contain transition-opacity"
            />
            <p className="font-mono text-md md:text-lg lg:text-xl font-bold tracking-tight text-[#a9a8a8] mt-2">
              NITD
            </p>
          </div>
          {/* Navigation */}
          <nav className="col-span-1 row-span-1 md:col-span-3 space-y-3 md:space-y-4 text-xs sm:text-sm font-light tracking-widest text-center md:text-left self-center">
            {navLinks.map((item) => (
              <a
                key={item}
                href="#"
                className="block text-[#bebcbc] hover:text-[#efefef] transition"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Contact + Socials */}
          <div className="col-span-1 row-span-1 md:col-span-3 space-y-6 md:space-y-8 text-xs sm:text-sm text-center md:text-left">
            <div className="p-4 rounded-lg">
              <p className="uppercase tracking-widest text-[#bebcbc] mb-2 text-xs">
                Contact
              </p>

              {/* Phone numbers */}
              <div className="flex flex-col gap-1 mb-2">
                <div className="flex items-center justify-center md:self-start gap-2 text-[#bebcbc]">
                  <Phone size={14} />
                  <span className="text-sm">9811608307</span>
                </div>

                <div className="flex items-center justify-center md:self-start gap-2 text-[#bebcbc]">
                  <Phone size={14} />
                  <span className="text-sm">7001392178</span>
                </div>
              </div>

              {/* Location */}
              <p className="text-[#bebcbc] text-sm">NIT Durgapur, India</p>
            </div>

            <div className="p-4 rounded-lg">
              <p className="uppercase tracking-widest text-[#bebcbc] mb-2 text-xs">
                Our Voice
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <a
                  href="https://www.facebook.com/ccanitd.in"
                  aria-label="Facebook"
                  className="text-[#bebcbc] hover:text-[#efefef] transition"
                >
                  <Facebook size={18} />
                </a>

                <a
                  href="https://www.instagram.com/cca.nitd/"
                  aria-label="Instagram"
                  className="text-[#bebcbc] hover:text-[#efefef] transition"
                >
                  <Instagram size={18} />
                </a>

                <a
                  href="https://www.linkedin.com/company/center-for-cognitive-activities-nit-durgapur/"
                  aria-label="LinkedIn"
                  className="text-[#bebcbc] hover:text-[#efefef] transition"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom brand */}
      <div className="relative z-10 overflow-hidden">
        <div className="text-end text-xs text-[#676666] mb-3 mr-3">
          © Made with ❤️ WDCT | CCA
        </div>
      </div>
    </footer>
  );
}
