import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, CheckCircle } from "lucide-react";
import orb1 from "@/assets/3d-orb-1.png";

const cells = [
  { value: "core", label: "Core Cell" },
  { value: "robo", label: "Robo Cell" },
  { value: "wcdt", label: "WCDT" },
  { value: "rnd", label: "R&D Cell" },
  { value: "ecell", label: "E-Cell" },
];

const inputStyle = `
  bg-[#161616]
  border-[#0F0F0F]
  text-[#efefef]
  w-full
  focus:outline-none
  focus:ring-0
  focus:border-[#484848]
  focus-visible:outline-none
  focus-visible:ring-0
`;

const AuditionForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    preferredCell: "",
    motivation: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.rollNumber ||
      !formData.preferredCell ||
      !formData.motivation
    ) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you soon.",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <section className="py-24 bg-[#efefef]">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto bg-[#161616] rounded-2xl p-10 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-[#efefef] mb-4">
              Application Received!
            </h2>

            <p className="text-gray-400 mb-6">
              Thank you for applying to CCA. We'll contact you via email soon.
            </p>

            <Button
              variant="outline"
              className="border-[#efefef] text-[#efefef] focus:ring-0 focus:outline-none"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  rollNumber: "",
                  preferredCell: "",
                  motivation: "",
                });
              }}
            >
              Submit Another Application
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="auditions" className="py-24 bg-[#0F0F0F] relative">
      <div className="absolute inset-0 flex justify-center items-center opacity-20 pointer-events-none">
        <img
          src={orb1}
          alt=""
          className="w-[600px] h-[600px] blur-2xl rounded-full"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#efefef] mb-4">
            Audition Application
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Fill out the form below and take the first step towards joining CCA.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-[#161616] rounded-2xl p-8 space-y-6"
        >
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className={inputStyle}
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className={inputStyle}
              />
            </div>
          </div>

          {/* Roll */}
          <div className="space-y-2">
            <Label>Roll Number</Label>
            <Input
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleInputChange}
              placeholder="2024CSE001"
              className={inputStyle}
            />
          </div>

                    {/* Select */}
          <div className="space-y-2">
            <Label>Preferred Cell</Label>
            <Select
              value={formData.preferredCell}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, preferredCell: value }))
              }
            >
              <SelectTrigger
                className="
                  bg-[#161616]
                  border-[#0F0F0F]
                  text-[#efefef]
                  w-full
                  focus:outline-none
                  focus:ring-0
                  focus-visible:outline-none
                  focus-visible:ring-0
                "
              >
                <span className="text-[#efefef]">
                  {formData.preferredCell
                    ? cells.find((cell) => cell.value === formData.preferredCell)?.label
                    : "Select a cell"}
                </span>
              </SelectTrigger>

              <SelectContent
                className="
                  bg-[#161616]
                  border-[#0F0F0F]
                  text-[#efefef]
                "
              >
                {cells.map((cell) => (
                  <SelectItem
                    key={cell.value}
                    value={cell.value}
                    className="
                      text-[#efefef]
                      focus:bg-[#2a2a2a]
                      focus:text-[#efefef]
                      hover:bg-[#2a2a2a]
                      data-[highlighted]:bg-[#2a2a2a]
                      data-[highlighted]:text-[#efefef]
                      focus:outline-none
                      focus:ring-0
                    "
                  >
                    {cell.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Motivation */}
          <div className="space-y-2">
            <Label>Why do you want to join?</Label>
            <Textarea
              name="motivation"
              rows={4}
              value={formData.motivation}
              onChange={handleInputChange}
              placeholder="Tell us about yourself..."
              className={inputStyle}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full
              bg-[#efefef]
              text-[#0F0F0F]
              py-6
              text-lg
              hover:bg-[#e0e0e0]
              focus:outline-none
              focus:ring-0
            "
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Submit Application
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AuditionForm;