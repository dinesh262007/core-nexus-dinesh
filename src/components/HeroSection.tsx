import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

const HeroSection = () => {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const vantaEffect = useRef<any>(null);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Load THREE
    const threeScript = document.createElement("script");
    threeScript.src = "/three.r134.min.js";
    threeScript.async = true;

    // Load VANTA WAVES
    const vantaScript = document.createElement("script");
    vantaScript.src = "/vanta.waves.min.js";
    vantaScript.async = true;

    threeScript.onload = () => {
      document.body.appendChild(vantaScript);
    };

    vantaScript.onload = () => {
      if (!vantaEffect.current && vantaRef.current) {
        vantaEffect.current = window.VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          backgroundAlpha: 1,
          color: 5263440,
          shininess: 30,
          waveHeight: 15,
          waveSpeed: 1,
          zoom: 1,
        });
      }
    };

    document.body.appendChild(threeScript);

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <section
      id="home"
      ref={vantaRef}
      className="relative max-h-[80vh] flex items-center overflow-hidden"
    >
      <div className="container mx-auto px-6 pt-28 pb-48 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-[#161616] text-[#efefef]">
              <Sparkles className="w-4 h-4" />
              CCA Audition 2026
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0F0F0F]">
              Auditions <br /> Open
            </h1>

            <p className="text-lg max-w-xl text-[#484848]">
              Create. Build. Innovate.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-[#0F0F0F] text-[#efefef]"
                onClick={() => scrollTo("#auditions")}
              >
                Apply Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-[#0F0F0F] text-[#efefef] hover:bg-[#0F0F0F]"
                onClick={() => scrollTo("#cells")}
              >
                Explore Cells
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
