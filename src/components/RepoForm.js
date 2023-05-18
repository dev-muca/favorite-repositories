import React from "react";

export default function RepoForm({ children, ...props }) {
  return (
    <form {...props} className="flex gap-2 justify-center w-full">
      {children}
    </form>
  );
}
