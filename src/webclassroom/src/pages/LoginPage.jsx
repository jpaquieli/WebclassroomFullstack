import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext.jsx";

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: sans-serif;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  border-radius: 12px;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  margin-bottom: 12px;
  font-weight: 500;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 80%;
  margin-bottom: 12px;
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

const StyledButton = styled.button`
  width: 80%;
  margin-top: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  color: white;
  background: #3b82f6;
  cursor: pointer;
  transition: background 0.2s ease;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover:enabled {
    background: #2563eb;
  }
`;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Preencha usuário e senha para continuar.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await login(username, password);
      navigate("/"); // redireciona para home
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Container>
        <Card>
          <Header>🔑 Login</Header>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Form onSubmit={handleLogin}>
            <StyledInput
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <StyledInput
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <StyledButton type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </StyledButton>
          </Form>
        </Card>
      </Container>
    </PageWrapper>
  );
}