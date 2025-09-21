import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { usePosts } from "../contexts/PostsContext.js";

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
}

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  padding-top: 20px;
  padding-bottom: 40px;
`;

const LoadingWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const PostCard = styled.div`
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  padding: 20px;
  line-height: 1.6;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Author = styled.small`
  display: block;
  margin-bottom: 20px;
  color: #6b7280;
`;

const Content = styled.p`
  font-size: 1rem;
  color: #374151;
  white-space: pre-wrap;
`;

export default function PostView() {
  const { id } = useParams<{ id: string }>();
  const { getPost } = usePosts();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const numericId = Number(id);
    if (isNaN(numericId)) {
      console.error("ID inválido");
      setLoading(false);
      return;
    }

    getPost(numericId).then((p) => {
      setPost(p);
      setLoading(false);
    });
  }, [id, getPost]);

  if (loading) {
    return (
      <LoadingWrapper>
        <PostCard style={{ fontStyle: "italic", textAlign: "center", maxWidth: "500px" }}>
          Carregando...
        </PostCard>
      </LoadingWrapper>
    );
  }

  if (!post) {
    return (
      <LoadingWrapper>
        <PostCard style={{ fontStyle: "italic", textAlign: "center", maxWidth: "500px" }}>
          Post não encontrado.
        </PostCard>
      </LoadingWrapper>
    );
  }

  return (
    <PageWrapper>
      <PostCard>
        <Title>{post.title}</Title>
        <Author>👨‍🏫 {post.author}</Author>
        <Content>{post.content}</Content>
      </PostCard>
    </PageWrapper>
  );
}