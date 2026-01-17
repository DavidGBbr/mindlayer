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

  let updatedAt = "Loading...";

  if (!isLoading && data) {
    updatedAt = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Last update: {updatedAt}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatusInformation = "Loading...";

  if (!isLoading && data) {
    databaseStatusInformation = data.dependencies;
  }

  return (
    <>
      <h1>Database</h1>
      <div>
        Database max connections:{" "}
        {databaseStatusInformation.database.max_connections}
      </div>
      <div>
        Database used connections:{" "}
        {databaseStatusInformation.database.used_connections}
      </div>
      <div>Database version: {databaseStatusInformation.database.version}</div>
    </>
  );
}
