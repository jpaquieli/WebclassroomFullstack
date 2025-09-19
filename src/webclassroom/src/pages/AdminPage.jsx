import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { usePosts } from "../contexts/PostsContext";

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  padding: 20px 0 40px;
  font-family: sans-serif; /* Mantém mesma fonte do código original */
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

const Header = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
`;

const PostCard = styled.div`
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  max-width: 600px;
  margin: 0 auto 16px;
  padding: 20px;
  border-radius: 12px;
`;

const PostTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
`;

const PostContent = styled.p`
  color: #6b7280;
  margin-bottom: 15px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s ease;
`;

const EditButton = styled(Button)`
  background: #3b82f6;

  &:hover {
    background: #2563eb;
  }
`;

const DeleteButton = styled(Button)`
  background: #ef4444;

  &:hover {
    background: #dc2626;
  }
`;

const Message = styled.p`
  color: #6b7280;
  font-style: italic;
  text-align: center;
`;

export default function AdminPage() {
  const { posts = [], fetchPosts, deletePost } = usePosts();
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      await fetchPosts();
      setLoading(false);
    };
    loadPosts();
  }, [fetchPosts]);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Tem certeza que deseja excluir "${title}"?`)) {
      await deletePost(id);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <Message>Carregando posts...</Message>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container>
        <Header>⚙️ Painel de Administração</Header>

        {posts.length === 0 ? (
          <Message>Nenhum post encontrado. Crie um novo para começar!</Message>
        ) : (
          posts.map((p) => (
            <PostCard key={p.id}>
              <PostTitle>{p.title}</PostTitle>
              <PostContent>
                {p.content.length > 120 ? p.content.slice(0, 120) + "..." : p.content}
              </PostContent>

              <Actions>
                <EditButton onClick={() => nav(`/edit/${p.id}`)}>✏️ Editar</EditButton>
                <DeleteButton onClick={() => handleDelete(p.id, p.title)}>🗑️ Excluir</DeleteButton>
              </Actions>
            </PostCard>
          ))
        )}
      </Container>
    </PageWrapper>
  );
}