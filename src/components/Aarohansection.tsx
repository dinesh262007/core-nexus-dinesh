import { useMemo, useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Aarohan images
import img1 from "@/assets/aarohan1.jpeg";
import img2 from "@/assets/aarohan2.jpeg";
import img3 from "@/assets/aarohan3.jpeg";
import img4 from "@/assets/aarohan4.jpeg";

// ✅ Premium MP4 background video
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
    []
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

  // ✅ TOP PREMIUM: keeps video stable + restarts on tab focus
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const safePlay = async () => {
      try {
        video.muted = true;
        video.playsInline = true;
        await video.play();
      } catch (e) {
        // Autoplay might fail until user interacts (rare)
      }
    };

    safePlay();

    const onVisibilityChange = () => {
      if (!videoRef.current) return;

      if (document.hidden) {
        videoRef.current.pause();
      } else {
        safePlay();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const prev = () => {
    setActiveIndex((p) => (p === 0 ? cards.length - 1 : p - 1));
  };

  const next = () => {
    setActiveIndex((p) => (p === cards.length - 1 ? 0 : p + 1));
  };

  const isSmallMobile = windowWidth <= 400;
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  return (
    <section
      id="aarohan"
      className="py-8 sm:py-12 md:py-16 lg:py-24 relative overflow-hidden bg-black"
    >
      {/* ✅ MP4 Background (Guaranteed Working) */}
<div className="absolute inset-0 overflow-hidden bg-black" style={{ zIndex: 0 }}>
  <video
    ref={videoRef}
    className="absolute inset-0 w-full h-full object-cover"
    src="/aarohan-bg.web.mp4"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    style={{
      opacity: 0.55,
      filter: "blur(0px)",
      transform: "scale(1.12)",
    }}
  />

  {/* Premium overlays */}
  <div className="absolute inset-0 bg-black/30" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/80" />

  {/* Glow */}
  <div
    className="absolute inset-0 opacity-70"
    style={{
      background:
        "radial-gradient(circle at 25% 30%, rgba(168,85,247,0.22), transparent 55%), radial-gradient(circle at 75% 65%, rgba(59,130,246,0.16), transparent 55%)",
    }}
  />
</div>


      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-30">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
            <span className="gradient-text">Aarohan</span>
            {!isSmallMobile && " Experience"}
          </h2>

          {!isMobile && (
            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base lg:text-lg">
              Scroll through and feel the energy of our flagship technical fest.
            </p>
          )}
        </div>

        {/* Stack Cards */}
        <div className="relative flex items-center justify-center">
          <div
            className={`relative w-full ${
              isSmallMobile
                ? "max-w-xs h-[220px]"
                : isMobile
                ? "max-w-sm h-[280px]"
                : isTablet
                ? "max-w-md h-[350px]"
                : "max-w-lg lg:max-w-4xl h-[400px] lg:h-[480px]"
            }`}
          >
            {cards.map((card, idx) => {
              const total = cards.length;
              const diff = (idx - activeIndex + total) % total;

              const maxVisible = isSmallMobile ? 2 : isMobile ? 3 : 4;
              if (diff > maxVisible) return null;

              const isActive = diff === 0;

              let scale = 1;
              let translateX = 0;
              let translateY = 0;
              let rotate = 0;
              let opacity = 1;

              if (isSmallMobile) {
                scale = 1 - diff * 0.1;
                translateX = diff * 16;
                translateY = diff * 8;
                rotate = diff * 1;
                opacity = 1 - diff * 0.3;
              } else if (isMobile) {
                scale = 1 - diff * 0.08;
                translateX = diff * 20;
                translateY = diff * 10;
                rotate = diff * 1.2;
                opacity = 1 - diff * 0.25;
              } else {
                scale = 1 - diff * 0.065;
                translateX = diff * 28;
                translateY = diff * 16;
                rotate = diff * 1.5;
                opacity = 1 - diff * 0.2;
              }

              const zIndex = 60 - diff;

              return (
                <div
                  key={card.title}
                  className={`absolute inset-0 ${
                    isSmallMobile
                      ? "rounded-xl"
                      : isMobile
                      ? "rounded-2xl"
                      : "rounded-3xl"
                  } border border-white/10 transition-all duration-300 ease-out overflow-hidden`}
                  style={{
                    transform: `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                    opacity,
                    zIndex,
                    pointerEvents: isActive ? "auto" : "none",
                    boxShadow: isActive
                      ? "0 12px 50px rgba(0,0,0,0.72)"
                      : "0 6px 24px rgba(0,0,0,0.45)",
                  }}
                >
                  <div className="relative h-full w-full">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Mobile minimal overlay */}
                    {isActive && isMobile && (
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 to-transparent">
                        <h3 className="text-white font-bold text-lg truncate">
                          {card.title}
                        </h3>
                      </div>
                    )}

                    {/* Desktop premium overlay */}
                    {isActive && !isMobile && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent p-6 md:p-8 flex flex-col justify-end">
                        <h3 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl mb-2">
                          {card.title}
                        </h3>
                        <p className="text-white/80 text-sm md:text-base lg:text-lg mb-4">
                          {card.subtitle}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {card.points
                            .slice(0, isTablet ? 3 : 4)
                            .map((point, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-full text-xs md:text-sm bg-white/10 backdrop-blur-sm text-white border border-white/20"
                              >
                                {point}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div
            className={`absolute ${
              isSmallMobile
                ? "-bottom-10 gap-2"
                : isMobile
                ? "-bottom-12 gap-3"
                : "-bottom-14 md:-bottom-16 gap-4"
            } flex items-center justify-center`}
          >
            <button
              onClick={prev}
              className={`rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/30 transition active:scale-95 ${
                isSmallMobile
                  ? "w-8 h-8"
                  : isMobile
                  ? "w-9 h-9"
                  : "w-10 h-10 md:w-12 md:h-12"
              }`}
              aria-label="Previous"
            >
              <ChevronLeft
                className={`text-white ${
                  isSmallMobile ? "w-3 h-3" : isMobile ? "w-4 h-4" : "w-5 h-5"
                }`}
              />
            </button>

            <button
              onClick={next}
              className={`rounded-full bg-white/95 flex items-center justify-center hover:bg-white transition active:scale-95 ${
                isSmallMobile
                  ? "w-8 h-8"
                  : isMobile
                  ? "w-9 h-9"
                  : "w-10 h-10 md:w-12 md:h-12"
              }`}
              aria-label="Next"
            >
              <ChevronRight
                className={`text-black ${
                  isSmallMobile ? "w-3 h-3" : isMobile ? "w-4 h-4" : "w-5 h-5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile dots */}
        {isMobile && (
          <div className="flex justify-center items-center gap-1.5 mt-12 mb-4">
            {cards.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-full transition-all ${
                  idx === activeIndex ? "bg-white" : "bg-white/40"
                } ${isSmallMobile ? "w-1.5 h-1.5" : "w-2 h-2"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Mobile points */}
        {isMobile && (
          <div className="text-center mt-8 mb-4 px-4">
            <h3 className="text-white text-xl font-bold mb-2">
              {cards[activeIndex].title}
            </h3>
            <div className="flex flex-wrap justify-center gap-1.5">
              {cards[activeIndex].points.slice(0, 3).map((point, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-full text-xs bg-white/10 text-white border border-white/20"
                >
                  {point}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className={`${isSmallMobile ? "h-8" : isMobile ? "h-12" : "h-16 md:h-20"}`} />
      </div>
    </section>
  );
};

export default AarohanSection;

