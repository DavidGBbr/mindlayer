import React from "react";
import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>Last update: {new Date(data.updated_at).toLocaleString("pt-BR")}</p>
      )}
    </div>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  return (
    <>
      <h1>Database</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>
            Database max connections:{" "}
            {data.dependencies?.database?.max_connections}
          </p>
          <p>
            Database used connections:{" "}
            {data.dependencies?.database?.used_connections}
          </p>
          <p>Database version: {data.dependencies?.database?.version}</p>
        </>
      )}
    </>
  );
}
