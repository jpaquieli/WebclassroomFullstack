import { createContext, useContext, useState, useEffect, ReactNode } from "react";
const API_URL = import.meta.env.VITE_API_BASE_URL;

export type User = {
  username: string;
  role: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

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
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const login = async (username: string, password: string) => {
    const res = await fetch(`${API_URL}/user/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Usuário ou senha inválidos")
      console.log("API_URL usada pelo frontend:", API_URL);;

    const data = await res.json();
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};