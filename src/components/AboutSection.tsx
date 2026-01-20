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
    <section id="about" className="py-24 relative">
      {/* Section divider */}
      <div className="section-divider mb-24" />

      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            What We <span className="gradient-text">Do</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Centre For Cognitive Activities is a student-driven technical club
            that empowers innovation through collaboration, learning, and
            hands-on projects.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass rounded-xl p-6 hover-lift group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4 group-hover:glow-purple transition-all">
                <feature.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
