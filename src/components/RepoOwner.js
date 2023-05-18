import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function RepoOwner({ img_url, name, description }) {
  return (
    <div className="text-black flex flex-row gap-6">
      <Link to="/" className="h-fit">
        <FaArrowLeft size={20} />
      </Link>
      <img src={img_url} alt={name} width={120} height={120} className="border rounded-xl shadow" />
      <div className="flex flex-col gap-2 pl-1">
        <h1 className="font-medium text-3xl">{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
        <p className="text-base text-zinc-400">{description}</p>
      </div>
    </div>
  );
}
