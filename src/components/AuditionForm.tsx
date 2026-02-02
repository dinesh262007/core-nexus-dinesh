import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { auth, googleProvider, db } from "../firebase.js";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, CheckCircle, Mail } from "lucide-react";
import orb1 from "@/assets/3d-orb-1.png";

/* -------------------- CONSTANT DATA -------------------- */

const cells = [
  { value: "core", label: "Core Cell" },
  { value: "robo", label: "Robo Cell" },
  { value: "wdct", label: "WDCT" },
  { value: "rnd", label: "R&D Cell" },
  { value: "ecell", label: "E-Cell" },
];

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const departments = [
  { value: "bt", label: "Biotechnology" },
  { value: "che", label: "Chemical Engineering" },
  { value: "ce", label: "Civil Engineering" },
  { value: "cse", label: "Computer Science and Engineering" },
  { value: "ee", label: "Electrical Engineering" },
  { value: "ece", label: "Electronics and Communication Engineering" },
  { value: "ic", label: "Integrated Chemistry" },
  { value: "mnc", label: "Mathematics and Computing" },
  { value: "me", label: "Mechanical Engineering" },
  { value: "mme", label: "Metallurgical and Materials Engineering" },
];

const inputStyle = `
  bg-[#161616]
  border-[#0F0F0F]
  text-[#efefef]
  w-full
  focus:outline-none
  focus:ring-0
  focus:border-[#484848]
`;

/* -------------------- COMPONENT -------------------- */

const AuditionForm = () => {
  const { toast } = useToast();

  const [currentUser, setCurrentUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    gender: "",
    preferredCell: "",
    department: "",
    motivation: "",
  });

  /* -------------------- AUTH LISTENER -------------------- */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setFormData((prev) => ({
          ...prev,
          name: user.displayName || "",
          email: user.email || "",
        }));
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  /* -------------------- HANDLERS -------------------- */

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast({
        title: "Not signed in",
        description: "Please sign in with Google first.",
        variant: "destructive",
      });
      return;
    }

    const {
      name,
      email,
      rollNumber,
      gender,
      preferredCell,
      department,
      motivation,
    } = formData;

    if (
      !name ||
      !email ||
      !rollNumber ||
      !gender ||
      !preferredCell ||
      !department ||
      !motivation
    ) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "audition_applications"), {
        ...formData,
        uid: currentUser.uid,
        email: currentUser.email,
        createdAt: serverTimestamp(),
      });

      setIsSubmitted(true);

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* -------------------- SUCCESS STATE -------------------- */

  if (isSubmitted) {
    return (
      <section className="py-24 bg-[#0F0F0F]">
        <div className="container px-4">
          <div className="max-w-xl mx-auto text-center bg-[#161616] p-10 rounded-2xl border border-white/10">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#cca80a] flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Application Received!
            </h2>
            <p className="text-gray-400">
              Thank you for applying to CCA.
              <br />
              <a
                href="https://chat.whatsapp.com/K6u1mYk1v3pQn"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Join WhatsApp Group
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* -------------------- MAIN RENDER -------------------- */

  return (
    <section id="auditions" className="py-24 bg-[#0F0F0F] relative">
      <img
        src={orb1}
        alt=""
        className="absolute inset-0 m-auto w-[600px] h-[600px] blur-2xl opacity-20"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Audition Application
          </h2>
          <p className="text-gray-400">
            Sign in with Google to continue
          </p>
        </div>

        {!currentUser && (
          <div className="max-w-md mx-auto">
            <Button
              onClick={() => signInWithPopup(auth, googleProvider)}
              className="w-full bg-white text-black py-6"
            >
              <Mail className="mr-2" /> Sign in with Google
            </Button>
          </div>
        )}

        {currentUser && (
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-[#161616] p-8 rounded-2xl space-y-6"
          >
            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={inputStyle}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  name="email"
                  readOnly
                  value={formData.email}
                  className={inputStyle}
                />
              </div>
            </div>

            {/* Roll & Gender */}
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="rollNumber"
                placeholder="Roll Number"
                value={formData.rollNumber}
                onChange={handleInputChange}
                className={inputStyle}
              />

              <Select
                value={formData.gender}
                onValueChange={(v) =>
                  setFormData((p) => ({ ...p, gender: v }))
                }
              >
                <SelectTrigger className={inputStyle}>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((g) => (
                    <SelectItem key={g.value} value={g.value}>
                      {g.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Motivation */}
            <Textarea
              name="motivation"
              rows={4}
              value={formData.motivation}
              onChange={handleInputChange}
              placeholder="Why do you want to join?"
              className={inputStyle}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black py-6"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Send className="mr-2" /> Submit
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default AuditionForm;
