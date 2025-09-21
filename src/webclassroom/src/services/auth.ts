import api from "./api";

// 🔹 Tipos
type Credentials = {
  username: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: {
    id: number;
    username: string;
    [key: string]: any; // outros campos do usuário
  };
};

export async function login(credentials: Credentials): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/auth/login", credentials);
  return res.data;
}