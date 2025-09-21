import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Tipagem do usuário
export type User = {
  username: string;
  role: string;
};

// Tipagem do contexto
type AuthContextType = {
  token: string | null;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

// Props do Provider
type AuthProviderProps = {
  children: ReactNode;
};

// Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({ username: payload.username, role: payload.role });
      } catch (error) {
        console.error("Token inválido", error);
        setToken(null);
        localStorage.removeItem("token");
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const login = async (username: string, password: string) => {
    const res = await fetch("http://localhost:3000/v1/user/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Usuário ou senha inválidos");

    const data = await res.json();
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook seguro
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};