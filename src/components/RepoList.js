import React from "react";

export default function RepoList({ children, title }) {
  return (
    <ul className="text-black list-none mt-5">
      <h1 className="font-bold underline ml-2">{title}</h1>
      {children}
    </ul>
  );
}
