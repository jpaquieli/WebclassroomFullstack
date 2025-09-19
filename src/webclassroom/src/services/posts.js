const API_URL = "http://localhost:3000/v1";

export async function getPosts() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/post`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Erro ao buscar posts");

  return res.json();
}

export async function getPost(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/post/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Erro ao buscar post");

  return res.json();
}

export async function createPost(post) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });

  if (!res.ok) throw new Error("Erro ao criar post");

  return res.text(); // backend retorna texto, não JSON
}

export async function updatePost(id, post) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/post/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });

  if (!res.ok) throw new Error("Erro ao atualizar post");

  return res.json();
}

export async function deletePost(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/post/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Erro ao deletar post");

  return res.text();
}