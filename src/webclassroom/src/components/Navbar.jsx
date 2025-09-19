import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext.jsx";

const Nav = styled.nav`
  background: #2563eb;
  padding: 12px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 16px;
`;

const LinksGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const LogoutButton = styled.button`
  background: #ef4444;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease, transform 0.1s ease;

  &:hover {
    background: #dc2626;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null; // Navbar não aparece se não estiver logado

  return (
    <Nav>
      <Ul>
        <LinksGroup>
          <li>
            <StyledLink to="/">Home</StyledLink>
          </li>
          <li>
            <StyledLink to="/create">Criar Post</StyledLink>
          </li>
          <li>
            <StyledLink to="/admin">Admin</StyledLink>
          </li>
        </LinksGroup>

        <li>
          <LogoutButton onClick={logout}>Sair</LogoutButton>
        </li>
      </Ul>
    </Nav>
  );
}