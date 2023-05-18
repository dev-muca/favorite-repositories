import React from "react";

export default function RepoCard({ children }) {
  return (
    <div className="bg-white text-black w-3/5 rounded-md shadow-md flex flex-col gap-8 p-10 mx-auto">{children}</div>
  );
}
