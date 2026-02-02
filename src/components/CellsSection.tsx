import orb3 from "@/assets/3d-orb-3.jpg";
import orb4 from "@/assets/3d-orb-4.jpg";
import orb5 from "@/assets/3d-orb-5.jpg";
import core from "@/assets/cells/core.png";
import robo from "@/assets/cells/robo.png";
import wdct from "@/assets/cells/wdct.png";
import rnd from "@/assets/cells/rnd.png";
import ecell from "@/assets/cells/ecell.png";

interface Cell {
  name: string;
  description: string;
  tags: string[];
  image: string;
}

const cells: Cell[] = [
  {
    name: "Core Cell",
    description:
      "The driving force of CCA — disciplined, collaborative, and focused on smooth club operations. We lead workshops, events, and secure sponsorships for Aarohan.",
    tags: ["Management", "Leadership", "Events"],
    image: core,
  },
  {
    name: "Robo Cell",
    description:
      "Where innovation meets robotics. From Arduino to automation, we host workshops and competitions to spread awareness and creativity in robotics.",
    tags: ["Robotics", "Arduino", "Automation"],
    image: robo,
  },
  {
    name: "WDCT",
    description:
      "The digital architects of CCA. We design websites, run web dev workshops, and manage online content for Aarohan and beyond.",
    tags: ["Web Dev", "UI/UX", "Content"],
    image: wdct,
  },
  {
    name: "R&D Cell",
    description:
      "Fueling innovation through research. We nurture curiosity and exploration in engineering, science, and humanities with cutting-edge projects.",
    tags: ["Research", "AI/ML", "Innovation"],
    image: rnd,
  },
  {
    name: "E-Cell",
    description:
      "Igniting entrepreneurial spirit. We inspire startups, foster innovation, and support incubation for bold ideas within the campus.",
    tags: ["Startups", "Business", "Pitching"],
    image: ecell,
  },
];

const CellsSection = () => {
  return (
    <section id="cells" className="py-24 bg-[#0f0f0f]">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#efefef]">
            Our Cells
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            Five specialized cells, each with a unique focus. Find your passion
            and join the team that resonates with you.
          </p>
        </div>

        {/* Cell rows */}
        <div className="space-y-8">
          {cells.map((cell, index) => (
            <div
              key={cell.name}
              className="
                relative
                group
                rounded-2xl
                p-6 md:p-8
                transition-all
                duration-300
                hover:-translate-y-2
                border border-white/10
                hover:border-purple-400/40
                bg-[#161616]
              "
            >
              {/* Hover glow + elevation */}
              <div
                className="
                  absolute inset-0 rounded-2xl
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  pointer-events-none
                "
                style={{
                  boxShadow:
                    "0 18px 40px rgba(0,0,0,0.65), 0 0 40px rgba(168,85,247,0.25)",
                }}
              />

              <div
                className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-10 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Cell Image */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                  {/* image glow */}
                  <div className="absolute inset-0 rounded-xl bg-purple-500/25 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <img
                    src={cell.image}
                    alt={cell.name}
                    className="
                      relative
                      w-full h-full
                      object-contain
                      mix-blend-lighten
                      drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]
                    "
                  />
                </div>

                {/* Cell Content */}
                <div
                  className={`flex-1 text-center md:text-left ${
                    index % 2 === 1 ? "md:text-right" : ""
                  }`}
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-[#efefef]">
                    {cell.name}
                  </h3>

                  <p className="mb-4 max-w-xl text-gray-400 mx-auto md:mx-0">
                    {cell.description}
                  </p>

                  <div
                    className={`flex flex-wrap gap-2 justify-center ${
                      index % 2 === 1 ? "md:justify-end" : "md:justify-start"
                    }`}
                  >
                    {cell.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                          px-3 py-1 rounded-full
                          text-sm text-gray-300
                          border border-[#484848]/40
                          bg-black/20
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CellsSection;
