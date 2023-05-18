import React from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { MdMore } from "react-icons/md";

export default function RepoListItem({ name, path, ...props }) {
  return (
    <li className="py-2 px-4 my-4 flex flex-row justify-between items-center border rounded-md shadow">
      <button {...props} className="p-2 rounded-full bg-red-600">
        <FaTrash size={12} color="#fff" />
      </button>

      <span>{name}</span>

      <Link to={path} className="p-2">
        <MdMore size={22} color="#222" />
      </Link>
    </li>
  );
}
