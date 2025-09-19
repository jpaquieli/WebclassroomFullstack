import api from "./api";

export async function login(credentials) {
  const res = await api.post("/auth/login", credentials);
  return res.data; // deve conter { token, user }
}