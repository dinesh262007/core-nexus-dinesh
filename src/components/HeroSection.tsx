import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import orb1 from "@/assets/3d-orb-1.png";
import orb2 from "@/assets/3d-orb-2.png";

const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden pt-16 md:pt-20"
    >
      {/* Background gradient effects (reduced on small screens) */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      <div className="hidden md:block absolute top-1/4 left-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-gradient-purple/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-56 h-56 lg:w-80 lg:h-80 bg-gradient-cyan/20 rounded-full blur-3xl animate-pulse-glow delay-1000" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass text-xs md:text-sm text-muted-foreground mx-auto md:mx-0">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              <span>CCA Audition 2026</span>
            </div>

            <h1 className="font-bold leading-tight text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
              <span className="gradient-text">Auditions</span>
              <br />
              <span className="text-foreground">Open</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light">
              Create. Build. Innovate.
            </p>

            <p className="text-muted-foreground max-w-xl mx-auto md:mx-0 text-sm sm:text-base">
              Join the Centre For Cognitive Activities and be part of a community that pushes the boundaries of technology and innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start pt-4">
              <Button
                size="lg"
                className="gradient-bg text-foreground font-semibold px-6 py-3 md:px-8 md:py-4 text-base md:text-lg glow-purple hover:opacity-90 transition-opacity w-full sm:w-auto"
                onClick={() => scrollToSection("#auditions")}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="gradient-border bg-transparent hover:bg-primary/10 text-foreground px-6 py-3 md:px-8 md:py-4 text-base md:text-lg w-full sm:w-auto"
                onClick={() => scrollToSection("#cells")}
              >
                Explore Cells
              </Button>
            </div>
          </div>

          {/* 3D Visual Section */}
          <div className="relative flex items-center justify-center mt-6 md:mt-0">
            {/* Main 3D orb image (responsive sizing) */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px]">
              <img
                src={orb1}
                alt="3D Abstract Orb"
                className="w-full h-full object-cover rounded-full animate-float"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-iridescent opacity-30 blur-3xl -z-10 scale-110" />
            </div>

            {/* Floating secondary orb (responsive position/size) */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 md:-bottom-10 md:-left-10 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
              <img
                src={orb2}
                alt="Secondary 3D Orb"
                className="w-full h-full object-cover rounded-full animate-float delay-1000"
              />
              <div className="absolute inset-0 rounded-full glow-cyan -z-10 scale-125" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator (reduced size on small screens) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-4 h-7 sm:w-5 sm:h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-1.5">
          <div className="w-1 h-1.5 sm:h-2 bg-muted-foreground rounded-full" />
        </div>
      </div>
    </section>
  );
};
export default HeroSection;