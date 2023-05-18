import RepoAdd from "../../components/RepoAdd";
import RepoCard from "../../components/RepoCard";
import RepoForm from "../../components/RepoForm";
import RepoInput from "../../components/RepoInput";
import RepoList from "../../components/RepoList";
import RepoListItem from "../../components/RepoListItem";
import RepoTitle from "../../components/RepoTitle";

import { React, useState, useCallback, useEffect } from "react";

import api from "../../services/api";

export default function Repositories() {
  const [newRepo, setNewRepo] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search
  useEffect(() => {
    const localRepos = localStorage.getItem("repositories");

    if (localRepos) {
      setRepositories(JSON.parse(localRepos));
    }
  }, []);

  // Save Updates
  useEffect(() => {
    localStorage.setItem("repositories", JSON.stringify(repositories));
  }, [repositories]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        setAlert(null);

        try {
          if (newRepo === "") {
            throw new Error("Informe um repositório!");
          }

          const response = await api.get(`repos/${newRepo}`);

          const hasRepo = repositories.find((r) => r.name === newRepo);

          if (hasRepo) {
            throw new Error("Repositório já incluído!");
          }

          const data = {
            name: response.data.full_name,
          };

          setRepositories([...repositories, data]);
          setNewRepo("");
        } catch (err) {
          setAlert(true);
          console.log(err);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repositories]
  );

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  const handleDelete = useCallback(
    (repo) => {
      const find = repositories.filter((r) => r.name !== repo);
      setRepositories(find);
    },
    [repositories]
  );

  return (
    <RepoCard>
      <RepoTitle />

      <RepoForm onSubmit={handleSubmit}>
        <RepoInput
          value={newRepo}
          onChange={handleInputChange}
          error={alert}
          onClick={() => setAlert(false)}
          placeholder="Informe um repositório"
        />
        <RepoAdd loading={loading} />
      </RepoForm>

      {repositories.length > 0 ? (
        <RepoList title="Repositórios Favoritos">
          {repositories.map((repo) => (
            <RepoListItem
              key={repo.name}
              name={repo.name}
              path={`/repositorio/${encodeURIComponent(repo.name)}`}
              onClick={() => handleDelete(repo.name)}
            />
          ))}
        </RepoList>
      ) : (
        ""
      )}
    </RepoCard>
  );
}
