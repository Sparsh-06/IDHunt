"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Idea {
  id: number;
  title: string;
  desc: string;
  createdAt: string;
  devName: string;
  tech_stack: { name: string }[];
  pros: string[];
}

export default function ExploreIdeasTable() {
  const [data, setData] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [techStackFilter, setTechStackFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3200/response/api/all-ideas`
        );
        const result = await response.json();
        const fetchedIdeas = result.data.map((idea: any) => ({
          ...idea,
          id: idea.id || Math.random(),
          title:
            typeof idea.response === "string"
              ? JSON.parse(idea.response).title
              : idea.title,
          desc:
            typeof idea.response === "string"
              ? JSON.parse(idea.response).desc
              : idea.response.content,
          tech_stack:
            typeof idea.response === "string"
              ? JSON.parse(idea.response).tech_stack
              : idea.tech_stack,
          pros:
            typeof idea.response === "string"
              ? JSON.parse(idea.response).pros
              : idea.pros,
          createdAt: idea.createdAt,
          devName: idea.devName,
        }));
        setData(fetchedIdeas);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = techStackFilter
    ? data.filter((idea) =>
        idea.tech_stack.some((tech) => tech.name === techStackFilter)
      )
    : data;

  if (loading) {
    return (
      <div className="text-center text-gray-400 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="rounded-lg p-6 mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-200 dark:text-gray-200">
        Top Ideas
      </h1>
      <p className="text-lg text-gray-400 dark:text-gray-400 mb-6">
        Discover a variety of project ideas shared by the community.
      </p>

      {/* Tech Stack Filter */}
      <div className="mb-4 justify-end flex">
        <Select
          onValueChange={(value) =>
            setTechStackFilter(value === "All" ? null : value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Tech Stack" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tech Stacks</SelectLabel>
              <SelectItem value="All">All</SelectItem>
              {[
                ...new Set(
                  data.flatMap((idea) =>
                    idea.tech_stack.map((tech) => tech.name)
                  )
                ),
              ].map((techName) => (
                <SelectItem key={techName} value={techName}>
                  {techName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableCaption className="text-gray-500 dark:text-gray-500">
            A curated list of innovative project ideas.
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-800 dark:bg-gray-800 ">
              <TableHead className="w-[150px] p-4 text-left text-sm font-semibold text-gray-400 dark:text-gray-400">
                Idea Title
              </TableHead>
              <TableHead className="p-4 text-left text-sm font-semibold text-gray-400 dark:text-gray-400">
                Description
              </TableHead>
              <TableHead className="p-4 text-right text-sm font-semibold text-gray-400 dark:text-gray-400">
                Created At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((idea) => (
              <TableRow
                key={idea.id}
                className="hover:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => setSelectedIdea(idea)}
              >
                <TableCell className="p-4 font-medium text-gray-300 dark:text-gray-300">
                  {idea.title[0]}
                </TableCell>
                <TableCell className="p-4 text-gray-400 dark:text-gray-400">
                  {idea.desc}
                </TableCell>
                <TableCell className="p-4 text-right text-gray-500 dark:text-gray-500">
                  {new Date(idea.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog for Idea Details */}
      <Dialog open={!!selectedIdea} onOpenChange={() => setSelectedIdea(null)}>
        <DialogContent className="max-w-2xl p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg transition-transform duration-300 ease-in-out">
          <DialogHeader className="border-b border-gray-200 dark:border-slate-600 pb-4">
            <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              {selectedIdea?.title[0]}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="mt-4 space-y-4 text-gray-600 dark:text-gray-300">
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {selectedIdea?.desc}
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-500">
              <p className="flex items-center">
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Created on:
                </span>
                <span className="ml-2">
                  {selectedIdea
                    ? new Date(selectedIdea.createdAt).toLocaleDateString()
                    : ""}
                </span>
              </p>
              <p className="flex items-center">
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Developer:
                </span>
                <span className="ml-2">{selectedIdea?.devName}</span>
              </p>
            </div>

            <div className="mt-4">
              <p className="font-medium text-gray-600 dark:text-gray-400">
                Tech Stacks:
              </p>
              <ul className="flex flex-wrap gap-2 mt-2">
                {selectedIdea?.tech_stack.map((tech, index) => (
                  <li
                    key={index}
                    className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                  >
                    {tech.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <p className="font-medium text-gray-600 dark:text-gray-400">
                Advantages:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {selectedIdea?.pros.map((pro, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 dark:text-gray-400 py-1"
                  >
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
