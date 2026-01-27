import { useMemo, useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Aarohan images
import img1 from "@/assets/aarohan1.jpeg";
import img2 from "@/assets/aarohan2.jpeg";
import img3 from "@/assets/aarohan3.jpeg";
import img4 from "@/assets/aarohan4.jpeg";

interface AarohanCard {
  title: string;
  subtitle: string;
  points: string[];
  image: string;
  theme: "light" | "purple" | "dark";
}

const AarohanSection = () => {
  const cards: AarohanCard[] = useMemo(
    () => [
      {
        title: "Aarohan",
        subtitle:
          "Our flagship event. Powered by creativity, tech and pure energy.",
        points: ["Hackathons", "Workshops", "Tech Talks", "Competitions"],
        image: img1,
        theme: "light",
      },
      {
        title: "Innovation",
        subtitle: "We build ideas into reality with strong teams & execution.",
        points: ["Rapid Prototyping", "Team Sprints", "New Experiments", "R&D"],
        image: img2,
        theme: "purple",
      },
      {
        title: "Build",
        subtitle: "Development + robotics + content, all moving together.",
        points: ["Web", "Robotics", "Design", "Content"],
        image: img3,
        theme: "dark",
      },
      {
        title: "Impact",
        subtitle: "Aarohan leaves a mark — a culture of learning and growth.",
        points: ["Community", "Mentorship", "Leadership", "Recognition"],
        image: img4,
        theme: "purple",
      },
    ],
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const safePlay = async () => {
      try {
        video.muted = true;
        video.playsInline = true;
        await video.play();
      } catch {}
    };

    safePlay();

    const onVisibilityChange = () => {
      if (document.hidden) video.pause();
      else safePlay();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const prev = () =>
    setActiveIndex((p) => (p === 0 ? cards.length - 1 : p - 1));
  const next = () =>
    setActiveIndex((p) => (p === cards.length - 1 ? 0 : p + 1));

  const isSmallMobile = windowWidth <= 400;
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const touchStartX = useRef(0);

  return (
    <section
      id="aarohan"
      className="py-8 sm:py-12 md:py-16 lg:py-24 relative overflow-hidden"
      style={{ backgroundColor: "#0F0F0F" }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/aarohan-bg.web.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ opacity: 0.55, transform: "scale(1.12)" }}
        />
        <div className="absolute inset-0 bg-[#0F0F0F]/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/80 via-[#0F0F0F]/40 to-[#0F0F0F]/90" />
      </div>

      <div className="container mx-auto px-4 relative z-30">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{ color: "#efefef" }}
          >
            Aarohan {!isSmallMobile && "Experience"}
          </h2>

          {!isMobile && (
            <p className="max-w-2xl mx-auto mt-2 text-lg text-gray-400">
              Scroll through and feel the energy of our flagship technical fest.
            </p>
          )}
        </div>

        {/* Cards */}
        <div className="relative flex flex-col items-center">
          <div
            className={`relative w-full touch-pan-x ${
              isMobile ? "max-w-sm h-[280px]" : "max-w-4xl h-[480px]"
            }`}
            onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const delta = e.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(delta) > 50) delta > 0 ? prev() : next();
            }}
          >
            {cards.map((card, idx) => {
              const total = cards.length;
              const diff = (idx - activeIndex + total) % total;
              if (diff > 3) return null;

              const isActive = diff === 0;
              const scale = 1 - diff * 0.06;
              const translateX = diff * 28;
              const translateY = diff * 16;

              return (
                <div
                  key={card.title}
                  className="absolute inset-0 rounded-3xl overflow-hidden transition-all duration-300"
                  style={{
                    transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
                    zIndex: 50 - diff,
                    opacity: 1 - diff * 0.2,
                    backgroundColor: "#161616",
                    pointerEvents: isActive ? "auto" : "none",
                    boxShadow: isActive
                      ? "0 20px 60px rgba(0,0,0,0.8)"
                      : "0 10px 30px rgba(0,0,0,0.6)",
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />

                  {/* {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/90 via-transparent to-transparent p-8 flex flex-col justify-end">
                      <h3
                        className="text-3xl font-bold mb-2"
                        style={{ color: "#efefef" }}
                      >
                        {card.title}
                      </h3>
                      <p
                        className="mb-4"
                        style={{ color: "#484848" }}
                      >
                        {card.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {card.points.map((p, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs border"
                            style={{
                              color: "#efefef",
                              backgroundColor: "#161616",
                              borderColor: "#efefef22",
                            }}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )} */}
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          {/* Mobile pagination */}
          {isMobile && (
            <div className="flex justify-center gap-2 mt-6">
              {cards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "w-6 bg-[#efefef]" : "w-2 bg-[#484848]"
                  }`}
                />
              ))}
            </div>
          )}
          {/* Desktop navigation */}
          {!isMobile && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur bg-[#161616]/80 border border-[#efefef22] hover:scale-105 transition"
              >
                <ChevronLeft className="text-[#efefef]" />
              </button>

              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full flex items-center justify-center bg-[#efefef] hover:scale-105 transition"
              >
                <ChevronRight className="text-[#0F0F0F]" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AarohanSection;
