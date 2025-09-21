const API_URL = import.meta.env.VITE_API_BASE_URL;

export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt?: string;
  updatedAt?: string;
};

export async function getPosts(): Promise<Post[]> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/post`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Erro ao buscar posts");
  return res.json();
}

export async function getPost(id: number): Promise<Post> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/post/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Erro ao buscar post");
  return res.json();
}

export async function createPost(post: Omit<Post, "id">): Promise<Post> {
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
  return res.json();
}

export async function updatePost(
  id: number,
  post: Partial<Omit<Post, "id">>
): Promise<Post> {
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

export async function deletePost(id: number): Promise<void> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/post/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Erro ao deletar post");
}