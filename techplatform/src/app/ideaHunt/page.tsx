"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import Select from "react-select";
import { TableDemo } from "./components/Itables";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";

interface FormData {
  ideaUrl: string;
  ideaTitle: string;
  devName: string;
  ideaTag: string;
  problemSolved: string;
  ideaComp: string;
  isOpenSource: boolean;
  ideaDescription: string;
  selectedTechnologies: string[];
  targetAudience: string;
  launchDate: string;
  teamSize: number;
  techStack: string;
  repoLink: string;
  budget: string;
}

const Page = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const [formData, setFormData] = useState<FormData>({
    devName: "",
    ideaUrl: "",
    ideaTitle: "",
    ideaComp: "",
    ideaTag: "",
    isOpenSource: false,
    ideaDescription: "",
    targetAudience: "",
    problemSolved: "",
    launchDate: "",
    techStack: "",
    teamSize: 0,
    repoLink: "",
    budget: "",
    selectedTechnologies: [],
  });

  const [isSending, setisSending] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (selectedOptions: any) => {
    const selectedValues = Array.isArray(selectedOptions)
      ? selectedOptions.map((option: any) => option.value)
      : selectedOptions?.value
      ? [selectedOptions.value] // If it's a single selected value, convert it to an array
      : [];

    setFormData((prev) => ({
      ...prev,
      selectedTechnologies: selectedValues,
    }));
  };

  const handleIdeaSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisSending(true);
    try {
      console.log("Submitting form data:", formData);

      const response = await fetch(
        "http://localhost:3200/response/api/submit-idea",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ formData, userId: user?.id }),
        }
      );

      if (!response.ok) throw new Error("Submission failed");

      if (!validateForm()) {
        setisSending(false);
        return;
      }
      
      toast({
        variant: "default",
        title: "Idea Submitted Successfully",
        description: "Your idea has been submitted successfully",
      });
      window.location.reload();
      setFormData({
        devName: "",
        ideaUrl: "",
        ideaTitle: "",
        ideaComp: "",
        ideaTag: "",
        targetAudience: "",
        isOpenSource: false,
        ideaDescription: "",
        problemSolved: "",
        launchDate: "",
        techStack: "",
        teamSize: 0,
        repoLink: "",
        budget: "",
        selectedTechnologies: [],
      });
    } catch (error) {
      console.error("Error:", error);
      setisSending(false);
    }
  };

  const validateForm = () => {
    if (!formData.ideaTitle || !formData.devName || !formData.ideaUrl) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return false;
    }
    return true;
  };
  

  return (
    <div className="container h-screen py-[14vh]">
      <h2 className="text-4xl font-semibold text-center text-foreground dark:text-gray-100">
        Validate your Ideas
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
        Share your innovative ideas with us and get valuable feedback from the
        community. Whether it's a new product, a unique solution, or an
        open-source project, we are here to help you refine and validate your
        concepts.
      </p>
      <Card className="max-w-5xl mx-auto mt-10 p-8 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <form onSubmit={handleIdeaSubmit}>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Submit Your Idea
          </h2>
          <div className="flex flex-col gap-6">
            {/* Existing Fields */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              {/* Link to Product */}
              <div>
                <Label
                  htmlFor="ideaUrl"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Link to the Product
                </Label>
                <Input
                  type="url"
                  id="ideaUrl"
                  value={formData.ideaUrl}
                  onChange={handleInputChange}
                  placeholder="https://getyourstack.com"
                  className="mt-2 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md"
                />
              </div>

              {/* Developer Name */}
              <div>
                <Label
                  htmlFor="devName"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Developer Name
                </Label>
                <Input
                  type="text"
                  id="devName"
                  value={formData.devName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="mt-2 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md"
                />
              </div>

              {/* Product Name */}
              <div>
                <Label
                  htmlFor="ideaTitle"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Product Name
                </Label>
                <Input
                  type="text"
                  id="ideaTitle"
                  value={formData.ideaTitle}
                  onChange={handleInputChange}
                  placeholder="GetYourStack"
                  className="mt-2 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md"
                />
              </div>
            </div>

            {/* Additional Fields */}
            {/* Problem Solved */}
            <div>
              <Label
                htmlFor="problemSolved"
                className="text-gray-700 dark:text-gray-300"
              >
                Problem Solved
              </Label>
              <Textarea
                id="problemSolved"
                value={formData.problemSolved}
                onChange={handleInputChange}
                placeholder="What problem does your product aim to solve?"
                className="mt-2 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md"
              />
            </div>

            {/* Target Audience */}
            <div>
              <Label
                htmlFor="targetAudience"
                className="text-gray-700 dark:text-gray-300"
              >
                Target Audience
              </Label>
              <Input
                type="text"
                id="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                placeholder="Who is your product built for?"
                className="mt-2 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md"
              />
            </div>

            {/* Funding Source */}
            <div>
              <Label
                htmlFor="fundingSource"
                className="text-gray-700 dark:text-gray-300"
              >
                Funding Source
              </Label>
              <Select
                id="fundingSource"
                className="mt-2 w-full dark:bg-gray-800 text-gray-800 dark:text-gray-700"
                options={[
                  { value: "self-funded", label: "Self-Funded" },
                  { value: "investors", label: "Investors" },
                  { value: "crowdfunding", label: "Crowdfunding" },
                ]}
                onChange={handleSelectChange}
              />
            </div>
            {/* Expected Launch Date */}
            <div>
              <Label
                htmlFor="launchDate"
                className="text-gray-700 dark:text-gray-300"
              >
                Expected Launch Date
              </Label>
              <Input
                type="date"
                id="launchDate"
                value={formData.launchDate}
                onChange={handleInputChange}
                className="mt-2 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md"
              />
            </div>

            {/* Technology Stack */}
            <div>
              <Label
                htmlFor="techStack"
                className="text-gray-700 dark:text-gray-300"
              >
                Technology Stack
              </Label>
              <Textarea
                id="techStack"
                value={formData.techStack}
                onChange={handleInputChange}
                placeholder="List the technologies used (e.g., React, Node.js, Blockchain, etc.)"
                className="mt-2 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md"
              />
            </div>

            {/* Team Size */}
            <div>
              <Label
                htmlFor="teamSize"
                className="text-gray-700 dark:text-gray-300"
              >
                Team Size
              </Label>
              <Input
                type="number"
                id="teamSize"
                value={formData.teamSize}
                onChange={handleInputChange}
                placeholder="How many members are on your team?"
                className="mt-2 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md"
              />
            </div>

            {/* GitHub/Repository Link */}
            <div>
              <Label
                htmlFor="repoLink"
                className="text-gray-700 dark:text-gray-300"
              >
                GitHub/Repository Link
              </Label>
              <Input
                type="url"
                id="repoLink"
                value={formData.repoLink}
                onChange={handleInputChange}
                placeholder="https://github.com/username/repository"
                className="mt-2 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md"
              />
            </div>

            {/* Estimated Budget */}
            <div>
              <Label
                htmlFor="budget"
                className="text-gray-700 dark:text-gray-300"
              >
                Estimated Budget
              </Label>
              <Input
                type="text"
                id="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="Enter your estimated budget (e.g., $5000)"
                className="mt-2 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md"
              />
            </div>

            {/* Final CTA */}
            <Button
              type="submit"
              className={`mt-6 w-full py-3 text-lg rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold dark:bg-blue-700 dark:hover:bg-blue-600 ${
                isSending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSending}
            >
              {isSending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Card>

      <div className="container p-8 my-10">
        <TableDemo />
      </div>
    </div>
  );
};

export default Page;
