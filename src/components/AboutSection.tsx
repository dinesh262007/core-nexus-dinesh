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
    <section id="about" className="py-12 md:py-24 relative">
      {/* Section divider */}
      <div className="section-divider mb-12 md:mb-24" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
            What We <span className="gradient-text">Do</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Centre For Cognitive Activities is a student-driven technical club
            that empowers innovation through collaboration, learning, and
            hands-on projects.
          </p>
        </div>

        {/* Feature cards */}
        <div
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article
                role="listitem"
                key={feature.title}
                className="glass rounded-xl p-4 sm:p-6 hover-lift group transition-transform transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg gradient-bg flex items-center justify-center mb-3 sm:mb-4 group-hover:glow-purple transition-all">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-sm">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
