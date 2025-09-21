# 1️⃣ Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copia package.json e package-lock para instalar dependências
COPY package*.json ./

# Instala dependências
RUN npm ci

# Copia o restante do código
COPY . .

# Build do Vite
RUN npm run build

# 2️⃣ Serve stage
FROM nginx:alpine

# Remove configurações default do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia arquivos de build do stage anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configuração customizada do nginx, se necessário
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expondo a porta padrão do nginx
EXPOSE 80

# Comando para rodar o nginx em foreground
CMD ["nginx", "-g", "daemon off;"]