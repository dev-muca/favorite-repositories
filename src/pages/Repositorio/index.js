import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import api from "../../services/api";

import RepoCard from "../../components/RepoCard";
import RepoOwner from "../../components/RepoOwner";
import RepoList from "../../components/RepoList";
import RepoIssue from "../../components/RepoIssue";
import RepoFilter from "../../components/RepoFilter";

import { FaArrowCircleRight, FaArrowCircleLeft, FaSpinner } from "react-icons/fa";

export default function Repositorio() {
  const { repo } = useParams();

  const [repositorie, setRepositorie] = useState({});
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState("all");
  const [defaultFilter, setDefaultFilter] = useState([0, 0, 1]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  function handlePage(action) {
    setPage(action === "next" ? page + 1 : page - 1);
  }

  useEffect(() => {
    async function load() {
      const repoName = repo;

      const [repoData, issuesData] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: "open",
            per_page: 5,
          },
        }),
      ]);

      setRepositorie(repoData.data);
      setIssues(issuesData.data);

      setLoading(false);
    }

    load();
  }, [repo, page]);

  useEffect(() => {
    setLoading(true);

    async function loadIssues() {
      const repoName = repo;

      const response = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: 5,
          page,
        },
      });

      setIssues(response.data);
      setLoading(false);
    }

    loadIssues();
  }, [repo, page, filter]);

  useEffect(() => {
    setLoading(true);

    async function updateIssues() {
      const repoName = repo;

      const response = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: 5,
          page: 1,
        },
      });

      setIssues(response.data);
      setLoading(false);
    }

    updateIssues();
  }, [repo, filter]);

  if (loading) {
    return (
      <RepoCard>
        <FaSpinner size={32} className="w-full flex justify-center items-center animate-spin" />
      </RepoCard>
    );
  }

  const filterValue = (value) => {
    setFilter(value);
  };

  return (
    <RepoCard>
      <RepoOwner name={repositorie.name} img_url={repositorie.owner.avatar_url} description={repositorie.description} />

      {issues.length > 0 ? (
        <RepoList title="Issues">
          <RepoFilter filterValue={filterValue} setDefaultFilter={setDefaultFilter} checked={defaultFilter} />

          {issues.map((issue) => (
            <RepoIssue
              key={issue.id}
              img_url={issue.user.avatar_url}
              name={issue.user.login}
              title={issue.title}
              url={issue.html_url}
              status={issue.state}
            />
          ))}

          <div className="w-full flex justify-between items-center">
            <button onClick={() => handlePage("prev")} disabled={page < 1 ? 1 : 0}>
              <FaArrowCircleLeft />
            </button>
            <span>{page}</span>

            <button onClick={() => handlePage("next")}>
              <FaArrowCircleRight />
            </button>
          </div>
        </RepoList>
      ) : (
        ""
      )}
    </RepoCard>
  );
}
