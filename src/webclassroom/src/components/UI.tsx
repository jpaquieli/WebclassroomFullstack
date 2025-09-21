import { styled } from "styled-components"; // ✅ Import correto no styled-components v6

// 🎨 Paleta de cores centralizada
export const colors = {
  primary: "#2563eb",
  primaryHover: "#1e40af",
  border: "#e5e7eb",
  background: "#ffffff",
  text: "#111827",
};

// 📦 Container genérico
export const Container = styled.div`
  padding: 24px;
  max-width: 900px;
  margin: 0 auto;
  font-family: Inter, system-ui, sans-serif;
  color: ${colors.text};
`;

// 🪪 Card reutilizável
export const Card = styled.div`
  padding: 20px;
  border: 1px solid ${colors.border};
  border-radius: 12px;
  background: ${colors.background};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

// 🔤 Input genérico
export const Input = styled.input`
  padding: 10px 12px;
  width: 100%;
  margin-bottom: 12px;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
`;

// 📝 Textarea genérica
export const Textarea = styled.textarea`
  padding: 10px 12px;
  width: 100%;
  margin-bottom: 12px;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
`;

// 🔘 Botão reutilizável
export const Button = styled.button`
  padding: 10px 16px;
  background: ${colors.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;

  &:hover {
    background: ${colors.primaryHover};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;