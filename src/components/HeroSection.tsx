import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroBg from "../assets/site-bg.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative max-h-[80vh] overflow-visible z-0 flex items-center"
      style={{
        backgroundImage: `url(${HeroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-6 pt-28 pb-48">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="space-y-6 text-center md:text-left">
            {/* Pill */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mx-auto mt-auto md:mx-0"
              style={{
                backgroundColor: "#161616",
                color: "#efefef",
              }}
            >
              <Sparkles className="w-4 h-4" />
              CCA Audition 2026
            </div>

            {/* Heading */}
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              style={{ color: "#0F0F0F" }}
            >
              Auditions <br /> Open
            </h1>

            {/* Sub text */}
            <p
              className="text-lg max-w-xl mx-auto md:mx-0"
              style={{ color: "#484848" }}
            >
              Create. Build. Innovate.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="px-8 py-6 text-lg"
                style={{
                  backgroundColor: "#0F0F0F",
                  color: "#efefef",
                }}
                onClick={() => navigate("/apply")}
              >
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="
                  px-8 py-6 text-lg
                  border
                  hover:bg-[#0F0F0F]
                  hover:text-[#efefef]
                  focus-visible:ring-0
                  focus:ring-0
                  active:ring-0
                  ring-0
                "
                style={{
                  borderColor: "#0F0F0F",
                  color: "#efefef",
                }}
                onClick={() => scrollTo("#cells")}
              >
                Explore Cells
              </Button>
            </div>
          </div>

          <div />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
