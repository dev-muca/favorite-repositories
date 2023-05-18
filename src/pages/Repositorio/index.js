import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import api from "../../services/api";

import RepoCard from "../../components/RepoCard";
import RepoOwner from "../../components/RepoOwner";
import RepoList from "../../components/RepoList";
import RepoIssue from "../../components/RepoIssue";

import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

export default function Repositorio() {
  const { repo } = useParams();

  const [repositorie, setRepositorie] = useState({});
  const [issues, setIssues] = useState([]);
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

      console.log(issuesData.data);

      setLoading(false);
    }

    load();
  }, [repo, page]);

  useEffect(() => {
    async function loadIssues() {
      const repoName = repo;

      const response = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: "open",
          per_page: 5,
          page,
        },
      });

      setIssues(response.data);
    }

    loadIssues();
  }, [repo, page]);

  if (loading) {
    return (
      <RepoCard>
        <h1 className="">Carregando...</h1>
      </RepoCard>
    );
  }

  return (
    <RepoCard>
      <RepoOwner name={repositorie.name} img_url={repositorie.owner.avatar_url} description={repositorie.description} />

      <RepoList title="Issues em aberto">
        {issues.map((issue) => (
          <RepoIssue
            key={issue.id}
            img_url={issue.user.avatar_url}
            name={issue.user.login}
            title={issue.title}
            url={issue.url}
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
    </RepoCard>
  );
}
