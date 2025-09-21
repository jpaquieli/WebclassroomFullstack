import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { usePosts, Post } from "../contexts/PostsContext.js";

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
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  padding: 30px 25px;
  border-radius: 12px;
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
  margin-bottom: 8px;
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
  margin-bottom: 8px;
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
  cursor: pointer;
  font-size: 0.95rem;
  color: white;
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

export default function CreatePostPage() {
  const { createPost } = usePosts();
  const nav = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    if (!title.trim() || !author.trim() || !content.trim()) {
      setError("Preencha todos os campos antes de salvar.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await createPost({ title, author, content });
      setTitle("");
      setAuthor("");
      setContent("");
      setLoading(false);
      nav("/");
    } catch (err) {
      console.error(err);
      setError("Erro ao criar post. Tente novamente.");
      setLoading(false);
    }
  };

  const isDisabled =
    !title.trim() || !author.trim() || !content.trim() || loading;

  return (
    <PageWrapper>
      <Container>
        <Card>
          <Header>✍️ Criar Novo Post</Header>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormWrapper>
            <StyledInput
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <StyledInput
              placeholder="Autor"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <StyledTextarea
              placeholder="Conteúdo"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <Actions>
              <SaveButton onClick={handleSave} disabled={isDisabled}>
                💾 {loading ? "Salvando..." : "Salvar"}
              </SaveButton>

              <CancelButton onClick={() => nav("/")}>↩️ Cancelar</CancelButton>
            </Actions>
          </FormWrapper>
        </Card>
      </Container>
    </PageWrapper>
  );
}