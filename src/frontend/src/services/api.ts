import axios, { InternalAxiosRequestConfig } from "axios";

// 🔹 Declaração global das variáveis de ambiente do Vite
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL?: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

// Cria instância do Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/v1",
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      // @ts-ignore: headers precisa ser AxiosHeaders
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;