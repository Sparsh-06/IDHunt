"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Lightbulb, Link2, Monitor, PenTool, Tag, User, User2 } from "lucide-react";
import Link from "next/link";

interface Idea {
  ideaTitle: string;
  devName: string;
  ideaDescription: string;
  isOpenSource: boolean;
  ideaTag: string;
  ideaComp: string;
  projectID: string;
  targetAudience?: string;
  problemSolved?: string;
  launchDate?: string;
  techStack?: string;
  teamSize?: string;
  repoLink?: string;
  budget?: number;
  selectedTechnologies?: string[];
}

const Page = ({ params }: { params: { IdeaValidateID: string } }) => {
  const { toast } = useToast();
  const { user } = useUser();
  const [content, setContent] = useState<Idea[]>([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submission, setsubmission] = useState(false);

  useEffect(() => {
    const fetchIdeaForVal = async () => {
      try {
        const response = await fetch(
          `http://localhost:3200/response/api/getValidationIdeas/${params.IdeaValidateID}`
        );
        if (!response.ok) throw new Error("Failed to fetch ideas");

        const data = await response.json();
        setContent(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeaForVal();
  }, [params.IdeaValidateID]);

  const handleVote = async (type: "upvote" | "downvote") => {
    try {
      const voteURL = `http://localhost:3200/response/api/${type}Idea/${params.IdeaValidateID}`;
      const response = await fetch(voteURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ideaID: content[0]?.projectID,
          feedback: comment,
          userId: user?.id,
          [`${type}Count`]: 1,
        }),
      });

      if (response.ok) {
        toast({
          variant: "default",
          title: "Success",
          description: `${type.charAt(0).toUpperCase() + type.slice(1)} recorded successfully.`,
        });
        setsubmission(true);
      } else {
        throw new Error(`Failed to record ${type}`);
      }
    } catch (error) {
      console.error(`Error ${type}ing:`, error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `An error occurred while ${type}ing.`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12  text-white">
      <div className="py-[10vh]">
        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : content.length > 0 ? (
          <div>
            <h1 className="text-3xl font-bold text-center mb-8">Idea Validation</h1>
            <div className="space-y-8">
              {content.map((idea) => (
                <Card
                key={idea.projectID}
                className="shadow-lg bg-gray-800 rounded-lg p-8 border border-gray-600 max-w-4xl mx-auto"
              >
                <CardContent>
                  <div className="flex flex-col md:grid md:grid-cols-2 gap-8">
                    {/* Idea Name and Tagline */}
                    <div>
                      <Label className="text-lg font-semibold flex items-center gap-2 text-yellow-400">
                        <Lightbulb /> Idea Name
                      </Label>
                      <h2 className="text-2xl font-bold mt-1">{idea.ideaTitle || "N/A"}</h2>
                    </div>
                    <div>
                      <Label className="text-lg font-semibold flex items-center gap-2 text-blue-400">
                        <Tag /> Tagline
                      </Label>
                      <h2 className="text-xl font-semibold mt-1">{idea.ideaTag || "N/A"}</h2>
                    </div>
                  </div>
              
                  <Separator className="my-6" />
              
                  {/* Description Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <User /> Developer
                      </Label>
                      <p className="text-md mt-1">By {idea.devName}</p>
                    </div>
                    <div>
                      <Label className="text-lg font-semibold">Description</Label>
                      <p className="text-md mt-1">{idea.ideaDescription || "No description provided."}</p>
                    </div>
                    <div>
                      <Label className="text-lg font-semibold">Competitors</Label>
                      <p className="text-md mt-1">{idea.ideaComp || "N/A"}</p>
                    </div>
                    <div>
                      <Label className="text-lg font-semibold">Source Type</Label>
                      <p className="text-md mt-1">{idea.isOpenSource ? "Open Source" : "Closed Source"}</p>
                    </div>
                  </div>
              
                  <Separator className="my-6" />
              
                  {/* Additional Details Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <User2 /> Target Audience
                      </Label>
                      <p className="text-md mt-1">{idea.targetAudience || "N/A"}</p>
                    </div>
                    <div>
                      <Label className="text-lg font-semibold">Problem Solved</Label>
                      <p className="text-md mt-1">{idea.problemSolved || "N/A"}</p>
                    </div>
                    <div>
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <Calendar /> Launch Date
                      </Label>
                      <p className="text-md mt-1">{idea.launchDate || "N/A"}</p>
                    </div>
                    <div>
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <PenTool /> Tech Stack
                      </Label>
                      <p className="text-md mt-1">{idea.techStack || "N/A"}</p>
                    </div>
                    <div>
                      <Label className="text-lg font-semibold">Team Size</Label>
                      <p className="text-md mt-1">{idea.teamSize || "N/A"}</p>
                    </div>
                    <div>
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <Link2 /> Repository
                      </Label>
                      <Link
                        href={idea.repoLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                      >
                        View on GitHub
                      </Link>
                    </div>
                    <div>
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <Monitor /> Budget
                      </Label>
                      <p className="text-md mt-1">${idea.budget || "N/A"}</p>
                    </div>
                    <div>
                      <Label className="text-lg font-semibold">Selected Technologies</Label>
                      <p className="text-md mt-1">{idea.selectedTechnologies?.join(", ") || "N/A"}</p>
                    </div>
                  </div>
              
                  <Separator className="my-6" />
              
                  {/* Feedback and Voting Section */}
                  <div className="space-y-4">
                    <Label htmlFor="comment" className="text-lg font-semibold">
                      Add Feedback
                    </Label>
                    <input
                      type="text"
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Leave a comment before voting"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    />
                    <div className="flex space-x-4 mt-4">
                      <Button
                        onClick={() => handleVote("upvote")}
                        variant="outline"
                        className="px-6 py-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
                      >
                        Like
                      </Button>
                      <Button
                        onClick={() => handleVote("downvote")}
                        variant="outline"
                        className="px-6 py-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                      >
                        Dislike
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-lg">No ideas found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
