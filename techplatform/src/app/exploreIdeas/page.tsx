import React from "react";
import ExploreIdeasTable from "@/app/exploreIdeas/components/exploreIdeasTable";

const page = () => {
  return (
    <div className="container p-16  flex-col items-start justify-center">
      <div className="flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Explore Multiple Ideas</h1>
        <p className="text-lg text-center max-w-2xl">
          Welcome to the ideas exploration page. Here you can find various
          concepts and brainstorm new ones.
        </p>
      </div>
      <div className= "mx-auto mt-20 bg-slate-800/40 p-10 rounded-lg">
        <ExploreIdeasTable />
      </div>
    </div>
  );
};

export default page;
