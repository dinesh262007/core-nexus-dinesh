import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CellsSection from "@/components/CellsSection";
import AuditionForm from "@/components/AuditionForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <CellsSection />
        <AuditionForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
