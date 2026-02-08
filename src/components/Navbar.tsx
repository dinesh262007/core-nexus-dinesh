import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ccalogo from "@/assets/ccalogo.png"; // adjust path if needed
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#cells", label: "Cells" },
  { href: "#aarohan", label: "Aarohan" },
  { href: "/apply", label: "Apply" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
  setIsMobileMenuOpen(false);

  // If it's a route
  if (href.startsWith("/")) {
    navigate(href);
    return;
  }

  // Otherwise it's a section anchor
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};


  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Sign-in error:", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign-out error:", err);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "border-b-gray-600 py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center"
        >
          <img
            src={ccalogo}
            alt="CCA Logo"
            className="h-10 w-auto object-contain hover:opacity-80 transition-opacity"
          />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavigation(link.href)}

              className="text-muted-foreground hover:text-[#a7c0d4] transition-colors duration-200 text-sm font-medium text-[#9facac]"
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={user ? handleSignOut : handleSignIn}
            className="bg-black text-foreground hover:text-black hover:bg-primary/10 transition-colors duration-200 px-6"
          >
            {user ? "Sign Out" : "Sign In"}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-lg p-4 animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigation(link.href)}
                className="text-muted-foreground hover:text-foreground transition-colors text-left py-2"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={user ? handleSignOut : handleSignIn}
              className="bg-black text-foreground hover:text-black hover:bg-primary/10 transition-colors duration-200 px-6"
            >
              {user ? "Sign Out" : "Sign In"}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
