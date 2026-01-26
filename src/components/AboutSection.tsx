import { Lightbulb, Cpu, FlaskConical, Users } from "lucide-react";
import Core from "../assets/cells/core.png"
import Wdct from "../assets/cells/wdct.png"
import Ecell from "../assets/cells/ecell.png"
import Rnd from "../assets/cells/rnd.png"
import Robo from "../assets/cells/robo.png"
const features = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We foster creative thinking and novel approaches to solve complex problems.",
  },
  {
    icon: Cpu,
    title: "Technology",
    description:
      "Cutting-edge tech projects spanning robotics, AI, web development, and more.",
  },
  {
    icon: FlaskConical,
    title: "Research",
    description:
      "Dedicated R&D initiatives pushing the boundaries of what's possible.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "A vibrant community of passionate students collaborating and growing together.",
  },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="
        relative
        z-20
        -mt-[clamp(3rem,14vw,6rem)]
        pt-[clamp(6rem,14vw,10rem)]
        pb-24
        overflow-hidden
      "
    >
      {/* ANGLED DARK BRIDGE */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundColor: "#0F0F0F",
          clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0 100%)",
          height: "150px"
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#efefef]">
            What We Do
          </h2>

          <p className="max-w-2xl mx-auto text-[#484848]">
            Centre For Cognitive Activities is a student-driven technical club
            that empowers innovation through collaboration, learning, and
            hands-on projects.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  rounded-2xl
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-2
                "
                style={{
                  backgroundColor: "#161616",
                }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4">
                  <Icon className="w-6 h-6 text-[#efefef]" />
                </div>

                <h3 className="text-xl font-semibold text-[#efefef] mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#484848]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;