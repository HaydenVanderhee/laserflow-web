/**
 * Book a Call Page - Liquid Flow Aesthetics Design
 * - Pre-call questionnaire form
 * - Glassmorphic form cards
 * - Smooth form transitions
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calendar,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building2,
  Users,
  Target,
  MessageSquare,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

interface FormData {
  // Step 1: Basic Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  websiteUrl: string;
  runAds: string;
  // Step 2: Business Details
  monthlyRevenue: string;
  businessSize: string;
  currentSoftware: string;
  monthlyLeads: string;
  bottlenecks: string[];
  biggestChallengeStep2: string;
  // Step 3: Goals & Challenges
  pastAutomation: string;
  goals: string;
  timeline: string;
  revenueTarget: string;
  additionalInfo: string;
  agreedToTerms: boolean;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  businessName: "",
  websiteUrl: "",
  runAds: "",
  monthlyRevenue: "",
  businessSize: "",
  currentSoftware: "",
  monthlyLeads: "",
  bottlenecks: [],
  biggestChallengeStep2: "",
  pastAutomation: "",
  goals: "",
  timeline: "",
  revenueTarget: "",
  additionalInfo: "",
  agreedToTerms: false,
};

export default function Book() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const totalSteps = 3;

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.businessName) {
          toast.error("Please fill in all required fields");
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          toast.error("Please enter a valid email address");
          return false;
        }
        return true;
      case 2:
        if (!formData.monthlyRevenue || !formData.businessSize || !formData.monthlyLeads) {
          toast.error("Please fill in all required fields");
          return false;
        }
        return true;
      case 3:
        if (!formData.timeline) {
          toast.error("Please fill in all required fields");
          return false;
        }
        if (!formData.agreedToTerms) {
          toast.error("Please agree to the Terms & Conditions and Privacy Policy");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit to webhook");
      }

      // Open booking page in new tab
      window.open("https://api.leadconnectorhq.com/widget/bookings/discovery-call-1ct8u", "_blank");

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Your booking request has been submitted!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred during submission. Please try again.");
      setIsSubmitting(false);
    }
  };

  const stepIcons = [Building2, Users, Target];
  const stepTitles = ["Basic Information", "Business Details", "Goals & Timeline"];

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg mx-auto px-4"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[oklch(0.5_0.2_250)] to-[oklch(0.65_0.2_200)] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
            Thank You, {formData.firstName}!
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            We've received your booking request. Our team will review your information
            and reach out within 24 hours to schedule your discovery call.
          </p>
          <div className="glass-card rounded-xl p-6 text-left">
            <h3 className="font-semibold font-[family-name:var(--font-display)] mb-4 text-foreground">
              What happens next?
            </h3>
            <ul className="space-y-3">
              {[
                "We'll review your business details",
                "You'll receive a calendar invite within 24 hours",
                "Prepare any questions you have about AI automation",
                "We'll discuss your specific needs on the call",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-[oklch(0.65_0.2_200)] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-24">
      <div className="container max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-[oklch(0.7_0.15_220)] mb-6">
            <Calendar className="w-4 h-4" />
            Free Discovery Call
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
            Book Your <span className="gradient-text">Discovery Call</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tell us about your med spa so we can prepare a customized demonstration
            of how Laserflow can transform your operations.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {[1, 2, 3].map((s) => {
              const Icon = stepIcons[s - 1];
              return (
                <div key={s} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 ${s <= step ? "text-[oklch(0.7_0.15_220)]" : "text-muted-foreground"
                      }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${s < step
                        ? "bg-gradient-to-br from-[oklch(0.5_0.2_250)] to-[oklch(0.65_0.2_200)]"
                        : s === step
                          ? "bg-gradient-to-br from-[oklch(0.5_0.2_250)] to-[oklch(0.65_0.2_200)]"
                          : "bg-secondary"
                        }`}
                    >
                      {s < step ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <Icon className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <span className="hidden md:block text-sm font-medium">
                      {stepTitles[s - 1]}
                    </span>
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-8 md:w-16 h-0.5 mx-2 transition-all ${s < step
                        ? "bg-gradient-to-r from-[oklch(0.5_0.2_250)] to-[oklch(0.65_0.2_200)]"
                        : "bg-border"
                        }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glass-card rounded-2xl p-6 md:p-10"
        >
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[oklch(0.5_0.2_250)] to-[oklch(0.65_0.2_200)] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold font-[family-name:var(--font-display)] text-foreground">
                    Basic Information
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Let's start with your contact details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    className="bg-input border-border focus:border-[oklch(0.5_0.2_250)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Smith"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    className="bg-input border-border focus:border-[oklch(0.5_0.2_250)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@medspa.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="bg-input border-border focus:border-[oklch(0.5_0.2_250)]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    className="bg-input border-border focus:border-[oklch(0.5_0.2_250)]"
                  />
                </div>
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="businessName" className="text-foreground font-semibold">
                  Med Spa Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="businessName"
                  placeholder="Radiant Skin Med Spa"
                  value={formData.businessName}
                  onChange={(e) => updateFormData("businessName", e.target.value)}
                  className="bg-input border-border focus:border-[oklch(0.5_0.2_250)]"
                />
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="websiteUrl" className="text-foreground font-semibold">
                  Website URL
                </Label>
                <Input
                  id="websiteUrl"
                  placeholder="https://www.yourmedspa.com"
                  value={formData.websiteUrl}
                  onChange={(e) => updateFormData("websiteUrl", e.target.value)}
                  className="bg-input border-border focus:border-[oklch(0.5_0.2_250)]"
                />
              </div>

              <div className="space-y-3 mt-6">
                <Label className="text-foreground font-semibold">Do you currently run ads for your med spa?</Label>
                <RadioGroup
                  value={formData.runAds}
                  onValueChange={(value) => updateFormData("runAds", value)}
                  className="flex gap-6 pt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="ads-yes" />
                    <Label htmlFor="ads-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="ads-no" />
                    <Label htmlFor="ads-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 2: Business Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[oklch(0.5_0.2_250)] to-[oklch(0.65_0.2_200)] flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold font-[family-name:var(--font-display)] text-foreground">
                    Business Details
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Help us understand your current operations
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-foreground">
                    Current Monthly Revenue <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.monthlyRevenue}
                    onValueChange={(value) => updateFormData("monthlyRevenue", value)}
                  >
                    <SelectTrigger className="bg-input border-border md:w-[280px]">
                      <SelectValue placeholder="Select revenue range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-10k">Under $10k</SelectItem>
                      <SelectItem value="10k-30k">$10k - $30k</SelectItem>
                      <SelectItem value="30k-80k">$30k - $80k</SelectItem>
                      <SelectItem value="80k-150k">$80k - $150k</SelectItem>
                      <SelectItem value="150k+">$150k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-foreground">
                    How many staff members does your med spa have?{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.businessSize}
                    onValueChange={(value) => updateFormData("businessSize", value)}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3"
                  >
                    {["1-5", "6-15", "16-30", "30+"].map((size) => (
                      <div key={size}>
                        <RadioGroupItem
                          value={size}
                          id={`size-${size}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`size-${size}`}
                          className="flex items-center justify-center p-4 rounded-lg border border-border bg-input cursor-pointer transition-all peer-data-[state=checked]:border-[oklch(0.5_0.2_250)] peer-data-[state=checked]:bg-[oklch(0.5_0.2_250_/_0.1)] hover:bg-secondary"
                        >
                          {size}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentSoftware" className="text-foreground">
                    What software do you currently use for scheduling/CRM?
                  </Label>
                  <Input
                    id="currentSoftware"
                    placeholder="e.g., Mindbody, Vagaro, Zenoti, or None"
                    value={formData.currentSoftware}
                    onChange={(e) => updateFormData("currentSoftware", e.target.value)}
                    className="bg-input border-border focus:border-[oklch(0.5_0.2_250)]"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-foreground">
                    How many leads do you receive per month?{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.monthlyLeads}
                    onValueChange={(value) => updateFormData("monthlyLeads", value)}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select monthly lead volume" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-50">Under 50</SelectItem>
                      <SelectItem value="50-100">50 - 100</SelectItem>
                      <SelectItem value="100-250">100 - 250</SelectItem>
                      <SelectItem value="250-500">250 - 500</SelectItem>
                      <SelectItem value="500+">500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 pt-4">
                  <Label className="text-foreground font-semibold">
                    Bottlenecks / Pain Points (select all that apply)
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {[
                      "Leads getting lost",
                      "Staff too busy to follow up",
                      "No shows",
                      "Price shoppers",
                      "Scaling issues",
                      "Unclear ROI",
                      "Busy admin",
                      "Inconsistent bookings",
                    ].map((point) => (
                      <div key={point} className="flex items-center space-x-3">
                        <Checkbox
                          id={`bottleneck-${point.replace(/ /g, '-')}`}
                          checked={formData.bottlenecks.includes(point)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateFormData("bottlenecks", [...formData.bottlenecks, point]);
                            } else {
                              updateFormData("bottlenecks", formData.bottlenecks.filter((p) => p !== point));
                            }
                          }}
                        />
                        <Label htmlFor={`bottleneck-${point.replace(/ /g, '-')}`} className="font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm">
                          {point}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-b border-border/30 pb-4">
                  <Label htmlFor="biggestChallengeStep2" className="text-foreground font-semibold">
                    Your biggest challenge right now
                  </Label>
                  <Textarea
                    id="biggestChallengeStep2"
                    placeholder="Tell us about the main challenge you're facing in your med spa operations..."
                    value={formData.biggestChallengeStep2}
                    onChange={(e) => updateFormData("biggestChallengeStep2", e.target.value)}
                    className="bg-input border-border focus:border-[oklch(0.5_0.2_250)] min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Goals & Timeline */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[oklch(0.5_0.2_250)] to-[oklch(0.65_0.2_200)] flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold font-[family-name:var(--font-display)] text-foreground">
                    Goals & Timeline
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Tell us about your automation goals
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-foreground font-semibold">Have you ever implemented any automation/AI systems in the past?</Label>
                  <RadioGroup
                    value={formData.pastAutomation}
                    onValueChange={(value) => updateFormData("pastAutomation", value)}
                    className="flex gap-6 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="past-yes" />
                      <Label htmlFor="past-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="past-no" />
                      <Label htmlFor="past-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals" className="text-foreground font-semibold">
                    What are your main goals for automation?
                  </Label>
                  <Textarea
                    id="goals"
                    placeholder="e.g., Reduce response time, increase bookings, free up staff time..."
                    value={formData.goals}
                    onChange={(e) => updateFormData("goals", e.target.value)}
                    className="bg-input border-border focus:border-[oklch(0.5_0.2_250)] min-h-[100px]"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-foreground font-semibold">
                    When are you looking to implement automation? <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.timeline}
                    onValueChange={(value) => updateFormData("timeline", value)}
                    className="grid grid-cols-1 md:grid-cols-3 gap-3"
                  >
                    {[
                      { value: "asap", label: "As soon as possible" },
                      { value: "1-3-months", label: "1-3 months" },
                      { value: "exploring", label: "Just exploring" },
                    ].map((option) => (
                      <div key={option.value}>
                        <RadioGroupItem
                          value={option.value}
                          id={`timeline-${option.value}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`timeline-${option.value}`}
                          className="flex items-center justify-center p-4 rounded-lg border border-border bg-input cursor-pointer transition-all peer-data-[state=checked]:border-[oklch(0.5_0.2_250)] peer-data-[state=checked]:bg-[oklch(0.5_0.2_250_/_0.1)] hover:bg-secondary text-center"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="revenueTarget" className="text-foreground font-semibold">
                    If we could fix your booking system in 30 days, what is your revenue target for the next 3 months?
                  </Label>
                  <Textarea
                    id="revenueTarget"
                    placeholder="e.g., Increase revenue by 30%, reach $50k/month, etc."
                    value={formData.revenueTarget}
                    onChange={(e) => updateFormData("revenueTarget", e.target.value)}
                    className="bg-input border-border focus:border-[oklch(0.5_0.2_250)] min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo" className="text-foreground font-semibold">
                    Anything else you'd like us to know?
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Any specific questions or requirements..."
                    value={formData.additionalInfo}
                    onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                    className="bg-input border-border focus:border-[oklch(0.5_0.2_250)] min-h-[100px]"
                  />
                </div>

                <div className="pt-4">
                  <div className="flex items-start space-x-3 p-4 rounded-lg border border-border/50 bg-black/20">
                    <Checkbox
                      id="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onCheckedChange={(checked) => updateFormData("agreedToTerms", checked === true)}
                    />
                    <Label htmlFor="agreedToTerms" className="text-sm font-normal text-muted-foreground leading-relaxed pt-0.5 inline-block">
                      I agree to Laserflow's <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=ca6aefbb-e411-4065-8cfb-36cbea11c613" target="_blank" rel="noopener noreferrer" className="text-[#48CFCB] hover:underline whitespace-nowrap">Terms &amp; Conditions</a> and <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=576499bb-e5ba-4839-989d-a639e19739ef" target="_blank" rel="noopener noreferrer" className="text-[#48CFCB] hover:underline whitespace-nowrap">Privacy Policy</a>, and consent to being contacted regarding my inquiry.
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10 pt-6 border-t border-border/50">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={prevStep}
                className="border-border/50 hover:bg-secondary"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <Button onClick={nextStep} className="btn-gradient text-white border-0">
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-gradient text-white border-0 min-w-[160px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <>
                    Submit Request
                    <MessageSquare className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>

          {step === 3 && (
            <div className="mt-8 text-xs text-muted-foreground/80 leading-relaxed flex flex-col items-start space-y-2">
              <motion.div
                initial={false}
                animate={{ height: showDisclaimer ? "auto" : "48px" }}
                className="relative overflow-hidden w-full"
              >
                <div className="space-y-4">
                  <p>
                    By clicking 'Submit', I agree to receive recurring marketing messages and outbound calls at the number provided. I understand these communications may be sent via automated technology, including an AI voice and pre-recorded messages, from Laserflow or its partners.
                  </p>
                  <p>
                    Consent is not a condition of purchase. Msg &amp; data rates may apply. I can opt-out at any time by replying STOP to any text or stating 'Unsubscribe' during a call.
                  </p>
                </div>
                {!showDisclaimer && (
                  <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                )}
              </motion.div>
              <button
                onClick={() => setShowDisclaimer(!showDisclaimer)}
                type="button"
                className="text-[#48CFCB] hover:underline flex items-center gap-1.5 transition-colors pt-1"
              >
                {showDisclaimer ? (
                  <>Show less <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>Read full disclaimer <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
            </div>
          )}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Your information is secure and will only be used to prepare for your call.
          </p>
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-[oklch(0.65_0.2_200)]" />
              No commitment
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-[oklch(0.65_0.2_200)]" />
              Free consultation
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-[oklch(0.65_0.2_200)]" />
              Custom demo
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
