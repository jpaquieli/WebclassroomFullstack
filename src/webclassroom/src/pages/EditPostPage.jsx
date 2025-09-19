import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { usePosts } from "../contexts/PostsContext";

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  padding: 20px 0 40px;
  font-family: sans-serif;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

const Card = styled.div`
  max-width: ${(props) => props.maxWidth || "700px"};
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  padding: ${(props) => props.padding || "30px 25px"};
  border-radius: 12px;
  text-align: ${(props) => props.textAlign || "left"};
  font-style: ${(props) => props.fontStyle || "normal"};
`;

const Header = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 20px;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  margin-bottom: 12px;
  font-weight: 500;
  text-align: center;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const StyledInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  max-width: 500px;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 500px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
  min-width: 100px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SaveButton = styled(Button)`
  flex: 2;
  min-width: 120px;
  background: #3b82f6;

  &:hover:enabled {
    background: #2563eb;
  }
`;

const CancelButton = styled(Button)`
  flex: 1;
  background: #6b7280;

  &:hover {
    background: #4b5563;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export default function EditPostPage() {
  const { id } = useParams();
  const { getPost, updatePost } = usePosts();
  const nav = useNavigate();

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      getPost(id).then((p) => {
        if (p) {
          setPost(p);
          setTitle(p.title);
          setAuthor(p.author);
          setContent(p.content);
        }
        setLoading(false);
      });
    }
  }, [id, getPost]);

  const handleSave = async () => {
    if (!title.trim() || !author.trim() || !content.trim()) {
      setError("Preencha todos os campos antes de salvar.");
      return;
    }

    setError("");

    await updatePost(id, { title, author, content });

    const updatedPost = { ...post, title, author, content };
    setPost(updatedPost);

    nav("/admin");
  };

  if (loading) {
    return (
      <PageWrapper>
        <LoadingWrapper>
          <Container>
            <Card
              maxWidth="500px"
              padding="20px"
              textAlign="center"
              fontStyle="italic"
            >
              Carregando...
            </Card>
          </Container>
        </LoadingWrapper>
      </PageWrapper>
    );
  }

  const isDisabled = !title.trim() || !author.trim() || !content.trim();

  return (
    <PageWrapper>
      <Container>
        <Card>
          <Header>✏️ Editar Post</Header>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormWrapper>
            <StyledInput
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <StyledTextarea
              placeholder="Conteúdo"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <Actions>
              <SaveButton onClick={handleSave} disabled={isDisabled}>
                💾 Salvar
              </SaveButton>
              <CancelButton onClick={() => nav("/admin")}>↩️ Cancelar</CancelButton>
            </Actions>
          </FormWrapper>
        </Card>
      </Container>
    </PageWrapper>
  );
}