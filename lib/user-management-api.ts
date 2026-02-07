export const blockUsersApi = async (ids: string[]) => {
  const response = await fetch("/api/block", {
    method: "POST",
    body: JSON.stringify({ ids }),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const unblockUsersApi = async (ids: string[]) => {
  const response = await fetch("/api/unblock", {
    method: "POST",
    body: JSON.stringify({ ids }),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const deleteUsersApi = async (ids: string[]) => {
  const response = await fetch("/api/delete", {
    method: "POST",
    body: JSON.stringify({ ids }),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const deleteUnverifiedApi = async (ids: string[]) => {
  const response = await fetch("/api/deleteUnverified", {
    method: "POST",
    body: JSON.stringify({ ids }),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};
