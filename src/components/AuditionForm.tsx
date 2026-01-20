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
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, CheckCircle } from "lucide-react";
import orb1 from "@/assets/3d-orb-1.jpg";

const cells = [
  { value: "core", label: "Core Cell" },
  { value: "robo", label: "Robo Cell" },
  { value: "wcdt", label: "WCDT" },
  { value: "rnd", label: "R&D Cell" },
  { value: "ecell", label: "E-Cell" },
];

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

    // Basic validation
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

    // Simulate API call - Replace with Supabase integration
    await new Promise((resolve) => setTimeout(resolve, 2000));

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
      <section id="auditions" className="py-24 relative">
        <div className="section-divider mb-24" />
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto glass rounded-2xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-bg flex items-center justify-center glow-purple">
              <CheckCircle className="w-10 h-10 text-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              Application Received!
            </h2>
            <p className="text-muted-foreground mb-6">
              Thank you for applying to CCA. We'll review your application and
              contact you via email for the next steps.
            </p>
            <Button
              variant="outline"
              className="gradient-border bg-transparent"
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
    <section id="auditions" className="py-24 relative">
      {/* Section divider */}
      <div className="section-divider mb-24" />

      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20">
        <img
          src={orb1}
          alt=""
          className="w-full h-full object-cover rounded-full blur-2xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Audition</span> Application
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ready to join CCA? Fill out the form below and take the first step
            towards an amazing journey.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto glass rounded-2xl p-8 md:p-10 space-y-6"
        >
          {/* Google Sign-in placeholder */}
          <Button
            type="button"
            variant="outline"
            className="w-full gradient-border bg-transparent hover:bg-primary/10 py-6 text-foreground"
            onClick={() => {
              toast({
                title: "Google Sign-in",
                description:
                  "Connect Supabase to enable Google authentication.",
              });
            }}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or fill manually
              </span>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-muted/50 border-border focus:border-primary"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-muted/50 border-border focus:border-primary"
            />
          </div>

          {/* Roll Number */}
          <div className="space-y-2">
            <Label htmlFor="rollNumber">Roll Number / Student ID</Label>
            <Input
              id="rollNumber"
              name="rollNumber"
              placeholder="e.g., 2024CSE001"
              value={formData.rollNumber}
              onChange={handleInputChange}
              className="bg-muted/50 border-border focus:border-primary"
            />
          </div>

          {/* Preferred Cell */}
          <div className="space-y-2">
            <Label htmlFor="preferredCell">Preferred Cell</Label>
            <Select
              value={formData.preferredCell}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, preferredCell: value }))
              }
            >
              <SelectTrigger className="bg-muted/50 border-border">
                <SelectValue placeholder="Select a cell" />
              </SelectTrigger>
              <SelectContent>
                {cells.map((cell) => (
                  <SelectItem key={cell.value} value={cell.value}>
                    {cell.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Motivation */}
          <div className="space-y-2">
            <Label htmlFor="motivation">Why do you want to join CCA?</Label>
            <Textarea
              id="motivation"
              name="motivation"
              placeholder="Tell us about yourself and why you'd be a great fit..."
              rows={4}
              value={formData.motivation}
              onChange={handleInputChange}
              className="bg-muted/50 border-border focus:border-primary resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full gradient-bg text-foreground font-semibold py-6 text-lg glow-purple hover:opacity-90 transition-opacity"
            disabled={isSubmitting}
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
