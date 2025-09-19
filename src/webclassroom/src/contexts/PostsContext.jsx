import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  getPosts as apiGetPosts,
  getPost as apiGetPost,
  createPost as apiCreatePost,
  updatePost as apiUpdatePost,
  deletePost as apiDeletePost,
} from "../services/posts";
import { useAuth } from "./AuthContext.jsx";

const PostsContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const usePosts = () => useContext(PostsContext);

export function PostsProvider({ children }) {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  // 🔹 Pega todos os posts
  const fetchPosts = useCallback(async () => {
    try {
      const data = await apiGetPosts();
      setPosts(data);
    } catch (err) {
      console.error("Erro ao buscar posts:", err);
    }
  }, []);

  // 🔹 Pega um post específico
  const getPost = useCallback(
    async (id) => {
      const existing = posts.find((p) => p.id === Number(id));
      if (existing) return existing; // retorna do estado se já existir

      try {
        const data = await apiGetPost(id);
        return data;
      } catch (err) {
        console.error("Erro ao buscar post:", err);
        return null;
      }
    },
    [posts]
  );

  // 🔹 Cria um post e atualiza o estado imediatamente
  const createPost = async (post) => {
    try {
      const newPost = await apiCreatePost(post);
      setPosts((prev) => [newPost, ...prev]);
    } catch (err) {
      console.error("Erro ao criar post:", err);
    }
  };

  // 🔹 Atualiza um post
  const updatePost = async (id, updatedData) => {
    try {
      await apiUpdatePost(id, updatedData);
      setPosts((prev) =>
        prev.map((p) => (p.id === Number(id) ? { ...p, ...updatedData } : p))
      );
    } catch (err) {
      console.error("Erro ao atualizar post:", err);
    }
  };

  // 🔹 Deleta um post
  const deletePost = async (id) => {
    try {
      await apiDeletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== Number(id)));
    } catch (err) {
      console.error("Erro ao deletar post:", err);
    }
  };

  // 🔹 Busca posts quando o usuário estiver logado
  useEffect(() => {
    if (user) fetchPosts();
  }, [user, fetchPosts]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        fetchPosts,
        getPost,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}