import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import orb1 from "@/assets/3d-orb-1.jpg";
import orb2 from "@/assets/3d-orb-2.jpg";

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-purple/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-cyan/20 rounded-full blur-3xl animate-pulse-glow delay-1000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Applications Open for 2024-25</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="gradient-text">Auditions</span>
              <br />
              <span className="text-foreground">Open</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              Create. Build. Innovate.
            </p>

            <p className="text-muted-foreground max-w-md mx-auto lg:mx-0">
              Join the Centre For Cognitive Activities and be part of a
              community that pushes the boundaries of technology and innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button
                size="lg"
                className="gradient-bg text-foreground font-semibold px-8 py-6 text-lg glow-purple hover:opacity-90 transition-opacity"
                onClick={() => scrollToSection("#auditions")}
              >
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gradient-border bg-transparent hover:bg-primary/10 text-foreground px-8 py-6 text-lg"
                onClick={() => scrollToSection("#cells")}
              >
                Explore Cells
              </Button>
            </div>
          </div>

          {/* 3D Visual Section */}
          <div className="relative flex items-center justify-center">
            {/* Main 3D orb image */}
            <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
              <img
                src={orb1}
                alt="3D Abstract Orb"
                className="w-full h-full object-cover rounded-full animate-float"
              />
              {/* Glow effect behind */}
              <div className="absolute inset-0 rounded-full bg-gradient-iridescent opacity-30 blur-3xl -z-10 scale-110" />
            </div>

            {/* Floating secondary orb */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 md:w-40 md:h-40">
              <img
                src={orb2}
                alt="Secondary 3D Orb"
                className="w-full h-full object-cover rounded-full animate-float delay-1000"
              />
              <div className="absolute inset-0 rounded-full glow-cyan -z-10 scale-125" />
            </div>

            {/* Sketchfab Embed - floating abstract model */}
            <div className="absolute -top-5 -right-5 w-36 h-36 md:w-48 md:h-48 rounded-xl overflow-hidden glass">
              <iframe
                title="3D Model"
                className="w-full h-full"
                src="https://sketchfab.com/models/faef9fe5ace445e7b2989d1c1ece361c/embed?autostart=1&ui_hint=0&ui_theme=dark&dnt=1"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                style={{ border: "none" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
