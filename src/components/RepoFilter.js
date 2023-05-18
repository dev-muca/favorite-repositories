import React from "react";

export default function RepoFilter({ filterValue, setDefaultFilter, checked }) {
  return (
    <div className="flex flex-row gap-4 mt-4 border px-4 py-2 rounded-md">
      Filtrar issues:
      <label className="flex gap-1">
        <input
          type="radio"
          name="filter"
          value="open"
          onClick={(e) => {
            filterValue(e.target.value);
            setDefaultFilter([1, 0, 0]);
          }}
          defaultChecked={checked[0] ? 1 : 0}
        />
        <span>Abertas</span>
      </label>
      <label className="flex gap-1">
        <input
          type="radio"
          name="filter"
          value="closed"
          onClick={(e) => {
            filterValue(e.target.value);
            setDefaultFilter([0, 1, 0]);
          }}
          defaultChecked={checked[1] ? 1 : 0}
        />
        <span>Fechadas</span>
      </label>
      <label className="flex gap-1">
        <input
          type="radio"
          name="filter"
          value="all"
          onClick={(e) => {
            filterValue(e.target.value);
            setDefaultFilter([0, 0, 1]);
          }}
          defaultChecked={checked[2] ? 1 : 0}
        />
        <span>Todas</span>
      </label>
    </div>
  );
}
