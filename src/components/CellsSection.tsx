import orb3 from "@/assets/3d-orb-3.jpg";
import orb4 from "@/assets/3d-orb-4.jpg";
import orb5 from "@/assets/3d-orb-5.jpg";

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
      "The backbone of CCA operations. Core Cell handles event management, coordination, and ensures smooth functioning of all club activities.",
    tags: ["Management", "Leadership", "Events"],
    image: orb3,
  },
  {
    name: "Robo Cell",
    description:
      "Where machines come to life. Build robots, explore automation, and compete in national-level robotics competitions.",
    tags: ["Robotics", "Arduino", "Automation"],
    image: orb4,
  },
  {
    name: "WCDT",
    description:
      "Web, Content & Design Team. Crafting stunning websites, compelling content, and beautiful designs that tell our story.",
    tags: ["Web Dev", "UI/UX", "Content"],
    image: orb5,
  },
  {
    name: "R&D Cell",
    description:
      "Research and Development hub. Explore emerging technologies, conduct experiments, and publish groundbreaking work.",
    tags: ["Research", "AI/ML", "Innovation"],
    image: orb3,
  },
  {
    name: "E-Cell",
    description:
      "Entrepreneurship Cell. Transform ideas into startups. Learn business skills, pitch to investors, and build the next big thing.",
    tags: ["Startups", "Business", "Pitching"],
    image: orb4,
  },
];

const CellsSection = () => {
  return (
    <section id="cells" className="py-24 relative">
      {/* Section divider */}
      <div className="section-divider mb-24" />

      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Our <span className="gradient-text">Cells</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Five specialized cells, each with a unique focus. Find your passion
            and join the team that resonates with you.
          </p>
        </div>

        {/* Cell rows */}
        <div className="space-y-8">
          {cells.map((cell, index) => (
            <div
              key={cell.name}
              className={`group glass rounded-2xl p-6 md:p-8 hover-lift transition-all ${
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              <div
                className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Cell Image */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                  <img
                    src={cell.image}
                    alt={cell.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-iridescent opacity-20 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* Cell Content */}
                <div
                  className={`flex-1 text-center md:text-left ${
                    index % 2 === 1 ? "md:text-right" : ""
                  }`}
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 gradient-text">
                    {cell.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 max-w-xl">
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
                        className="px-3 py-1 rounded-full text-sm gradient-border bg-muted/50 text-muted-foreground"
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
