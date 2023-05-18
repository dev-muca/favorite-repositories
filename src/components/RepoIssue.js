import React from "react";

export default function RepoIssue({ img_url, name, title, url, status }) {
  const statusClassName = `${
    status === "open" ? "bg-green-600" : "bg-rose-700"
  } text-white w-fit px-3 py-1 rounded text-xs`;
  return (
    <li className="my-4 border p-4 flex gap-2 rounded-md shadow relative">
      <img src={img_url} width={60} height={60} alt={name} className="border rounded-full w-14 h-14 my-auto" />
      <div className="ml-2 pl-4 border-l">
        <h1 className="font-medium mb-2 whitespace-nowrap">
          <span className="font-bold">Issue: </span>
          <span>{title.slice(0, 60) + " ..."}</span>
        </h1>
        <p className={statusClassName}>{status === "open" ? "ABERTA" : "FECHADA"}</p>
        <a
          href={url}
          className="bg-blue-500 hover:bg-blue-400 text-white absolute bottom-2 right-2 px-3 py-1 rounded text-sm"
        >
          Ler mais
        </a>
      </div>
    </li>
  );
}
