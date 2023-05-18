import React from "react";

export default function RepoInput({ error = false, ...props }) {
  const inputClassName = `w-full h-10 px-2 border rounded shadow text-black ${
    error ? "text-red-600 border-2 border-red-700" : ""
  }`;
  return <input {...props} className={inputClassName} />;
}
