import React from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaBars } from "react-icons/fa";

export default function RepoListItem({ name, path, ...props }) {
  return (
    <li className="p-4 my-4 flex flex-row justify-between items-center border rounded-md shadow">
      <button {...props} className="p-2 rounded-full bg-red-600">
        <FaTrash size={12} color="#fff" />
      </button>

      <span>{name}</span>

      <Link to={path} className="p-2">
        <FaBars />
      </Link>
    </li>
  );
}
