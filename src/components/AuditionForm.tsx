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
    phone: "",
    gender: "",
    preferredCells: [],
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
      phone,
      gender,
      preferredCells,
      department,
      motivation,
    } = formData;

    if (
      !name ||
      !email ||
      !rollNumber ||
      !phone ||
      !gender ||
      !preferredCells.length ||
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
      console.log("form data: ", formData);
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

    console.log("Submitting as:", currentUser);
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

  const toggleCellPreference = (cellValue) => {
    setFormData((prev) => {
      const exists = prev.preferredCells.includes(cellValue);

      // remove
      if (exists) {
        return {
          ...prev,
          preferredCells: prev.preferredCells.filter((c) => c !== cellValue),
        };
      }

      // add (limit to 5)
      if (prev.preferredCells.length >= 5) return prev;

      return {
        ...prev,
        preferredCells: [...prev.preferredCells, cellValue],
      };
    });
  };

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
          {!currentUser && (
            <p className="text-gray-400">Sign in with Google to continue</p>
          )}
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
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={inputStyle}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    readOnly
                    value={formData.email}
                    className={inputStyle}
                    style={{ color: "gray" }}
                  />
                </div>
              </div>
            </div>

            {/* Roll & Phone no. */}
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Roll Number</Label>
                  <Input
                    name="rollNumber"
                    placeholder="e.g. 23CSXXXX"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    className={inputStyle}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    name="phone"
                    placeholder="10 digit mobile number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Department & Gender */}
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Department */}
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, department: value }))
                    }
                  >
                    <SelectTrigger className="bg-[#161616] border-[#0F0F0F] text-[#efefef] w-full focus:outline-none focus:ring-0">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#161616] border-[#0F0F0F] text-[#efefef]">
                      {departments.map((dept) => (
                        <SelectItem key={dept.value} value={dept.value}>
                          {dept.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(v) =>
                      setFormData((p) => ({ ...p, gender: v }))
                    }
                  >
                    <SelectTrigger className="bg-[#161616] border-[#0F0F0F] text-[#efefef] w-full focus:outline-none focus:ring-0">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#161616] border-[#0F0F0F] text-[#efefef]">
                      {genders.map((g) => (
                        <SelectItem key={g.value} value={g.value}>
                          {g.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Preferred Cells UI */}
            <div className="space-y-3">
              <Label>Preferred Cell(s)</Label>
              <p className="text-sm text-gray-400">
                Please select the cells in your preferred sequence.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                {cells.map((cell) => {
                  const index = formData.preferredCells.indexOf(cell.value);
                  const selected = index !== -1;

                  return (
                    <button
                      type="button"
                      key={cell.value}
                      onClick={() => toggleCellPreference(cell.value)}
                      className={`
                        relative px-4 py-2 md:px-6 md:py-3 rounded-full border transition-all duration-300 
                        ${
                          selected
                            ? "border-[#8ec5ff] bg-[#2a1a12] text-white"
                            : "border-[#2a2a2a] bg-[#1b1b1b] text-gray-300 hover:bg-[#252525]"
                        }
                      `}
                    >
                      {selected && (
                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold shadow-md">
                          {index + 1}
                        </div>
                      )}

                      {cell.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Motivation */}
            <h4>Why CCA?</h4>
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
