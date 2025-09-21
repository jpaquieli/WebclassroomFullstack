import { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { usePosts, Post } from "../contexts/PostsContext";
import { Container } from "../components/UI";

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  padding-top: 20px;
  padding-bottom: 40px;
`;

const Header = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const PostCard = styled.div`
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  max-width: 600px;
  margin: 0 auto 16px;
  padding: 20px;
  border-radius: 12px;
`;

const PostTitle = styled(Link)`
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.3rem;
  transition: color 0.2s ease;

  &:hover {
    color: #1e40af;
  }
`;

const PostAuthor = styled.small`
  display: block;
  margin-bottom: 8px;
  color: #6b7280;
`;

const PostContent = styled.p`
  margin: 0;
  color: #6b7280;
`;

const Message = styled.p`
  color: #6b7280;
  font-style: italic;
  text-align: center;
`;

export default function HomePage() {
  const { posts, fetchPosts } = usePosts();
  const [q, setQ] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      await fetchPosts();
      setLoading(false);
    };
    loadPosts();
  }, [fetchPosts]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
  };

  if (loading || !posts) {
    return (
      <PageWrapper>
        <Message>Carregando posts...</Message>
      </PageWrapper>
    );
  }

  const filtered: Post[] = posts.filter((p) =>
    (p.title + p.content + p.author).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <PageWrapper>
      <Container>
        <Header>📚 Últimos Posts</Header>

        <SearchWrapper>
          <SearchInput
            placeholder="🔎 Buscar por título, autor ou conteúdo"
            value={q}
            onChange={handleSearchChange}
          />
        </SearchWrapper>

        {filtered.length === 0 ? (
          <Message>Nenhum post encontrado.</Message>
        ) : (
          filtered.map((p) => (
            <PostCard key={p.id}>
              <h3 style={{ marginBottom: "10px" }}>
                <PostTitle to={`/posts/${p.id}`}>{p.title}</PostTitle>
              </h3>
              <PostAuthor>👨‍🏫 {p.author}</PostAuthor>
              <PostContent>
                {p.content.length > 120 ? `${p.content.slice(0, 120)}...` : p.content}
              </PostContent>
            </PostCard>
          ))
        )}
      </Container>
    </PageWrapper>
  );
}