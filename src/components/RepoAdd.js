import React from "react";
import { FaSpinner, FaHeart } from "react-icons/fa";

export default function RepoAdd({ loading = false, ...props }) {
  return (
    <button
      {...props}
      disabled={loading ? 1 : 0}
      className="w-12 h-10 bg-slate-600 rounded flex justify-center items-center shadow duration-300 hover:bg-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? <FaSpinner color="#FFF" className="animate-spin" /> : <FaHeart color="#FFF" />}
    </button>
  );
}
