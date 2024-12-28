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
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Idea {
  title: string;
  response: string | { role: string; content: string; refusal?: string };
  createdAt: string;
}

const IdeasPage = () => {
  const [data, setData] = useState<Idea[]>([]);
  const [loading, setloading] = useState(false);
  const { user } = useUser();


  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.id) return;
      try {
        const userId = user.id;
        const response = await fetch(
          `http://localhost:3200/response/api/ideas?userId=${userId}`
        );
        const result = await response.json();
        console.log(result.data);
        setData(result.data); // Use `result.data` to access the ideas
        if (data.length > 0) {
          setloading(false)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container h-screen py-[14vh]">
      <div>
        <h1 className="text-3xl font-bold">Ideas</h1>
        <p className="text-lg">Welcome to the ideas page</p>
        <div className="p-8">
          <Table>
            {data.length > 0 && <TableCaption>A list of your project ideas.</TableCaption>}
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[100px]">Idea Title</TableHead>
                <TableHead>Response</TableHead>
                <TableHead className="text-right">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length >= 1 ? (
                data.map((idea, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {typeof idea.response === "string"
                        ? JSON.parse(idea.response).title[1]
                        : idea.title}
                    </TableCell>
                    <TableCell>
                      {typeof idea.response === "string"
                        ? JSON.parse(idea.response).desc
                        : idea.response.content}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Date(idea.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (loading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6">
                    Loading...
                  </TableCell>
                </TableRow>
              ):(
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={3}
                    className="text-center font-medium py-8"
                  >
                    <h2>You haven't searched for any Idea yet.{" "}</h2><br />
                    <Link href={"/"}>
                      <Button variant={'outline'}>Analyse your Idea Now</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default IdeasPage;
