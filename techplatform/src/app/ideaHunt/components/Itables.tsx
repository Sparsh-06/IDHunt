"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Idea {
  projectID: string;
  ideaTitle: string;
  devName: string;
  ideaDescription: string;
  isOpenSource: boolean;
  upvotes: number;
  downvotes: number;
  userId: string;
  problemSolved: string;
}

export function TableDemo() {
  const { user } = useUser();
  const [fetchedIdeas, setFetchedIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchIdeas() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:3200/response/api/getValidationIdeas"
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText} (${response.status})`);
      }

      const data = await response.json();

      // Validate response structure
      if (!data || !Array.isArray(data.data)) {
        throw new Error("Unexpected response format");
      }

      setFetchedIdeas(data.data);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <div className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700">
      <Table className="min-w-full bg-gray-800 rounded-xl shadow-sm">
        <TableCaption className="text-gray-400 font-bold text-lg">
          Recent Ideas
        </TableCaption>
        <TableHeader className="bg-gray-700 text-gray-300">
          <TableRow>
            <TableHead className="px-6 py-4 text-left">Idea Name</TableHead>
            <TableHead className="px-6 py-4 text-left">Developer</TableHead>
            <TableHead className="px-6 py-4 text-left">Description</TableHead>
            <TableHead className="px-6 py-4 text-right">Upvotes</TableHead>
            <TableHead className="px-6 py-4 text-right">Downvotes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <span className="text-gray-400 mt-4 block">Loading...</span>
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10">
                <span className="text-red-400 block mb-4">
                  {error}
                </span>
                <button
                  onClick={fetchIdeas}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Retry
                </button>
              </TableCell>
            </TableRow>
          ) : fetchedIdeas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10">
                <span className="text-gray-400 block">
                  No ideas found. Be the first to submit one!
                </span>
              </TableCell>
            </TableRow>
          ) : (
            fetchedIdeas.map((idea) => (
              <TableRow
                key={idea.projectID}
                className="hover:bg-gray-700 transition-all duration-200"
              >
                <TableCell className="px-6 py-4 font-semibold text-blue-400">
                  <Link
                    href={`/ideaHunt/${idea.projectID}`}
                    className="hover:underline"
                  >
                    {idea.ideaTitle}
                  </Link>
                  {idea.userId === user?.id && (
                    <Badge variant="destructive" className="ml-2">
                      You
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-300">
                  {idea.devName}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-400">
                  {idea.problemSolved}
                </TableCell>
                <TableCell className="px-6 py-4 text-right text-green-400">
                  {idea.upvotes}
                </TableCell>
                <TableCell className="px-6 py-4 text-right text-red-400">
                  {idea.downvotes}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
