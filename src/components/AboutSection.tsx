import { Lightbulb, Cpu, FlaskConical, Users } from "lucide-react";

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
        relative z-20
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
          height: "150px",
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* HEADING */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#efefef]">
            What We Do
          </h2>

          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            Centre For Cognitive Activities is a student-driven technical club
            that empowers innovation through collaboration, learning, and
            hands-on projects.
          </p>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  relative group
                  rounded-2xl p-6
                  overflow-hidden
                  transition-all duration-300
                  border border-white/20
                  bg-[#161616]
                  hover:-translate-y-1
                "
              >
                {/* PIXEL EFFECT */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <pixel-canvas data-gap="6" data-speed="80"></pixel-canvas>
                </div>

                {/* GLOW */}
                <div
                  className="
                    absolute inset-0 rounded-2xl
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                    pointer-events-none
                  "
                />

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col justify-center items-center">
                  {/* ICON + TITLE */}
                  <div
                    className=" flex flex-col justify-center items-center
                      transform transition-all duration-300 ease-out
                      group-hover:-translate-y-3
                      group-hover:scale-90
                    "
                  >
                    {/* ICON */}
                    <div className="relative w-12 h-12 flex items-center justify-center rounded-xl mb-2">
                      <div className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Icon className="relative w-6 h-6 text-[#efefef]" />
                    </div>

                    {/* TITLE */}
                    <h3 className="text-xl font-semibold text-[#efefef] mb-2">
                      {feature.title}
                    </h3>
                  </div>

                  {/* DESCRIPTION */}
                  <p
                    className=" text-center
                      text-sm leading-relaxed text-[#EFEFEF]
                      transform scale-80 translate-y-3 opacity-0
                      transition-all duration-300 ease-out
                      group-hover:scale-100
                      group-hover:translate-y-0
                      group-hover:opacity-100
                    "
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
