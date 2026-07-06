const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3333";

export async function api(path, options = {}) {
  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers ?? {})
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message ?? data?.error ?? "Erro ao chamar API.");
  }

  return data;
}

export function jsonBody(payload) {
  return JSON.stringify(payload);
}
