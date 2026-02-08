import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { auth, googleProvider, db } from "../firebase.js";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
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
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(1, s - 1));
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
    // motivation: "",
    cgpa: "",
    placeOfOrigin: "",
    whyCCA: "",
    suitability: "",
    managerialExperience: "",
    roboticsInterest: "",
    researchInterest: "",
    webDesignSkills: "",
    entrepreneurshipKnowledge: "",
    aarohanContribution: "",
    aarohanThemeIdea: "",
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

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google sign-in failed:", error);

      toast({
        title: "Sign in failed",
        description:
          "Popup blocked or domain not authorized. Try again or disable popup blocker.",
        variant: "destructive",
      });
    }
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
      whyCCA,
      suitability,
      cgpa,
    } = formData;

    if (
      !name ||
      !email ||
      !rollNumber ||
      !phone ||
      !gender ||
      !department ||
      !whyCCA ||
      !suitability ||
      !cgpa
    ) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    if (preferredCells.length < 3) {
      toast({
        title: "Select more cells",
        description: "You must select at least 3 preferred cells.",
        variant: "destructive",
      });
      return;
    }

    // ---- CELL SPECIFIC VALIDATION ----

    if (preferredCells.includes("core") && !formData.managerialExperience) {
      toast({
        title: "Core Cell question missing",
        description: "Please describe your managerial experience.",
        variant: "destructive",
      });
      return;
    }

    if (preferredCells.includes("robo") && !formData.roboticsInterest) {
      toast({
        title: "Robo Cell question missing",
        description: "Tell us about your interest in robotics.",
        variant: "destructive",
      });
      return;
    }

    if (preferredCells.includes("rnd") && !formData.researchInterest) {
      toast({
        title: "R&D question missing",
        description: "Explain your research interest.",
        variant: "destructive",
      });
      return;
    }

    if (preferredCells.includes("wdct") && !formData.webDesignSkills) {
      toast({
        title: "WDCT question missing",
        description: "Describe your web/design skills.",
        variant: "destructive",
      });
      return;
    }

    if (
      preferredCells.includes("ecell") &&
      !formData.entrepreneurshipKnowledge
    ) {
      toast({
        title: "E-Cell question missing",
        description: "Tell us your entrepreneurship knowledge.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("form data: ", formData);
      await addDoc(collection(db, "audition_applications"), {
        uid: currentUser.uid,
        name: formData.name,
        email: currentUser.email,
        rollNumber: formData.rollNumber,
        phone: formData.phone,
        gender: formData.gender,
        department: formData.department,
        cgpa: formData.cgpa,
        placeOfOrigin: formData.placeOfOrigin,

        preferredCells: formData.preferredCells,

        answers: {
          whyCCA: formData.whyCCA,
          suitability: formData.suitability,

          core: formData.preferredCells.includes("core")
            ? formData.managerialExperience
            : null,

          robo: formData.preferredCells.includes("robo")
            ? formData.roboticsInterest
            : null,

          rnd: formData.preferredCells.includes("rnd")
            ? formData.researchInterest
            : null,

          wdct: formData.preferredCells.includes("wdct")
            ? formData.webDesignSkills
            : null,

          ecell: formData.preferredCells.includes("ecell")
            ? formData.entrepreneurshipKnowledge
            : null,

          aarohanContribution: formData.aarohanContribution,
          aarohanThemeIdea: formData.aarohanThemeIdea,
        },

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
    //remove production
    console.log("Submitting as:", currentUser);
  };

  /* -------------------- SUCCESS STATE -------------------- */

  const navigate = useNavigate();
  if (isSubmitted) {
    return (
      <section className="bg-[#0F0F0F] min-h-screen flex items-center justify-center">
        <div className="w-full px-4">
          <div className="max-w-xl mx-auto text-center bg-[#161616] p-10 rounded-2xl border border-white/10">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Application Received!
            </h2>
            <p className="text-gray-400 break-words whitespace-normal">
              Thank you for applying to CCA.
              <br />
              <a
                href="https://chat.whatsapp.com/IR4DQXW83k34gWm6ur2aFe?mode=gi_t"
                target="_blank"
                rel="noreferrer"
                className="underline hover:opacity-80 block mt-2 break-all"
              >
                https://chat.whatsapp.com/IR4DQXW83k34gWm6ur2aFe?mode=gi_t
              </a>
            </p>
            <div className="mt-8">
              <Button
                onClick={() => navigate("/")}
                className="px-6 py-5 text-lg"
                style={{
                  backgroundColor: "#cca80a",
                  color: "#0F0F0F",
                }}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const toggleCellPreference = (cellValue) => {
    setFormData((prev) => {
      const exists = prev.preferredCells.includes(cellValue);

      if (exists) {
        // if (prev.preferredCells.length <= 3) return prev;

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
  /* for form pagination */
  const wantsCore = formData.preferredCells.includes("core");
  const wantsRobo = formData.preferredCells.includes("robo");
  const wantsWDCT = formData.preferredCells.includes("wdct");
  const wantsRND = formData.preferredCells.includes("rnd");
  const wantsEcell = formData.preferredCells.includes("ecell");

  const questionBlocks = [];

  if (wantsCore) {
    questionBlocks.push({
      title: "Core Cell",
      fields: ["managerialExperience"],
    });
  }

  if (wantsRobo) {
    questionBlocks.push({
      title: "Robo Cell",
      fields: ["roboticsInterest"],
    });
  }

  if (wantsRND) {
    questionBlocks.push({
      title: "R&D Cell",
      fields: ["researchInterest"],
    });
  }

  if (wantsWDCT) {
    questionBlocks.push({
      title: "WDCT",
      fields: ["webDesignSkills"],
    });
  }

  if (wantsEcell) {
    questionBlocks.push({
      title: "E-Cell",
      fields: ["entrepreneurshipKnowledge"],
    });
  }
  const commonFinalQuestions = ["aarohanContribution", "aarohanThemeIdea"];
  const allQuestionFields = [
    "whyCCA",
    "suitability",
    ...questionBlocks.flatMap((b) => b.fields),
    ...commonFinalQuestions,
  ];

  const QUESTIONS_PER_PAGE = 3;

  const questionPages = [];
  for (let i = 0; i < allQuestionFields.length; i += QUESTIONS_PER_PAGE) {
    questionPages.push(allQuestionFields.slice(i, i + QUESTIONS_PER_PAGE));
  }

  const totalSteps = 2 + questionPages.length;

  const questionMeta = {
    whyCCA: {
      label:
        "Why do you want to join the Centre for Cognitive Activities (CCA)?",
    },
    suitability: {
      label:
        "What according to you makes you suitable for being a member of CCA?",
    },
    managerialExperience: {
      label:
        "Do you have any previous managerial experience or event involvement?",
      section: "Core Cell",
    },
    roboticsInterest: {
      label: "Does robotics interest you? What level of knowledge do you have?",
      section: "Robo Cell",
    },
    researchInterest: {
      label: "Do you have any research interests or projects in mind?",
      section: "R&D Cell",
    },
    webDesignSkills: {
      label: "Can you build a website or use any designing software?",
      section: "WDCT",
    },
    aarohanContribution: {
      label: "How would you like to contribute to AAROHAN 2026? Expectations?",
      section: "AAROHAN",
    },
    aarohanThemeIdea: {
      label: "Suggest a theme and logo idea for AAROHAN 2026",
      section: "AAROHAN",
    },
    entrepreneurshipKnowledge: {
      label: "What do you know about entrepreneurship?",
      section: "E-Cell",
    },
  };

  const validateCurrentStep = () => {
    // ---------- STEP 1 : Basic Info ----------
    if (step === 1) {
      const { name, rollNumber, phone, gender, department, cgpa } = formData;

      if (!name || !rollNumber || !phone || !gender || !department || !cgpa) {
        toast({
          title: "Incomplete details",
          description: "Please fill all personal information fields.",
          variant: "destructive",
        });
        return false;
      }

      // roll format (NITD style)
      if (!/^(24|25|26)[A-Za-z]{2}\d{4,5}$/.test(rollNumber)) {
        toast({
          title: "Invalid Roll Number",
          description: "Format should be like 25CS1234",
          variant: "destructive",
        });
        return false;
      }

      // phone validation
      if (!/^\d{10}$/.test(phone)) {
        toast({
          title: "Invalid Phone",
          description: "Enter a valid 10 digit mobile number.",
          variant: "destructive",
        });
        return false;
      }

      // cgpa validation
      // ---- CGPA VALIDATION ----
      const cgpaRegex = /^(10(\.0{1,2})?|[0-9](\.\d{1,2})?)$/;

      if (!cgpaRegex.test(cgpa)) {
        toast({
          title: "Invalid CGPA format",
          description: "Enter a valid CGPA (0–10) with up to 2 decimal places.",
          variant: "destructive",
        });
        return false;
      }

      const cgpaNum = parseFloat(cgpa);

      if (cgpaNum < 0 || cgpaNum > 10) {
        toast({
          title: "Invalid CGPA",
          description: "CGPA must be between 0 and 10.",
          variant: "destructive",
        });
        return false;
      }

      return true;
    }

    // ---------- STEP 2 : Cell Selection ----------
    if (step === 2) {
      if (formData.preferredCells.length < 3) {
        toast({
          title: "Select more cells",
          description: "Choose at least 3 cells to continue",
          variant: "destructive",
        });
        return false;
      }
      return true;
    }

    // ---------- STEP 3+ : Question Pages ----------
    if (step >= 3 && step < totalSteps) {
      const currentFields = questionPages[step - 3];

      for (const field of currentFields) {
        if (!formData[field] || formData[field].trim().length < 10) {
          toast({
            title: "Incomplete answers",
            description: "Each answer must be at least 10 characters.",
            variant: "destructive",
          });
          return false;
        }
      }

      return true;
    }

    return true;
  };

  return (
    <section
      id="auditions"
      className="bg-[#0F0F0F] relative flex items-center justify-center"
      style={{
        minHeight: currentUser ? "100vh" : "100vh",
        paddingTop: currentUser ? "6rem" : "0",
        paddingBottom: currentUser ? "6rem" : "0",
      }}
    >
      <img
        src={orb1}
        alt=""
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] blur-3xl opacity-20 pointer-events-none select-none"
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
              onClick={handleGoogleSignIn}
              className="w-full bg-white text-black py-6"
            >
              <Mail className="mr-2" /> Sign in with Google
            </Button>
          </div>
        )}

        {currentUser && (
          <>
            <div className="fixed top-0 left-0 w-full h-2 bg-[#111] z-50">
              <div
                className="h-full bg-[#1d5c23] transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>

            <form
              onSubmit={handleSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              className="max-w-2xl mx-auto bg-[#161616] p-8 rounded-2xl space-y-6"
            >
              {step === 1 && (
                <>
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
                            setFormData((prev) => ({
                              ...prev,
                              department: value,
                            }))
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
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>CGPA</Label>
                        <Input
                          name="cgpa"
                          placeholder="e.g. 8.45"
                          value={formData.cgpa}
                          onChange={handleInputChange}
                          className={inputStyle}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Place of Origin</Label>
                        <Input
                          name="placeOfOrigin"
                          placeholder="City, State"
                          value={formData.placeOfOrigin}
                          onChange={handleInputChange}
                          className={inputStyle}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    className="w-full"
                    onClick={() => {
                      if (validateCurrentStep()) nextStep();
                    }}
                  >
                    Next
                  </Button>
                </>
              )}

              {/* Preferred Cells UI */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>Preferred Cell(s)</Label>
                    <p className="text-sm text-gray-400">
                      Please select the cells in your preferred sequence.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                      {cells.map((cell) => {
                        const index = formData.preferredCells.indexOf(
                          cell.value,
                        );
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

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        if (validateCurrentStep()) nextStep();
                      }}
                      className="w-full"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* QUESTION PAGES (Step >=3) */}
              {step >= 3 && (
                <div className="space-y-8">
                  {questionPages[step - 3]?.map((field) => {
                    const meta = questionMeta[field];

                    return (
                      <div key={field} className="space-y-3">
                        <Label>{meta.label}</Label>

                        <Textarea
                          name={field}
                          rows={4}
                          value={formData[field]}
                          onChange={handleInputChange}
                          className={inputStyle}
                        />
                      </div>
                    );
                  })}

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>

                    {step < totalSteps ? (
                      <Button
                        type="button"
                        className="w-full"
                        onClick={() => {
                          if (validateCurrentStep()) nextStep();
                        }}
                      >
                        Next
                      </Button>
                    ) : null}
                  </div>
                </div>
              )}

              {step === totalSteps && (
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
              )}
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default AuditionForm;
