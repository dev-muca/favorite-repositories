import React from "react";
import { FaGithub, FaHeart } from "react-icons/fa";

export default function RepoTitle() {
  return (
    <h1 className="text-gray-800 text-xl font-bold flex gap-3">
      <div className="relative">
        <FaGithub size={26} />
        <FaHeart size={12} color="#ff0000" className="absolute top-4 left-4" />
      </div>
      Repositórios do Github
    </h1>
  );
}
