# 📚 WebClassroom

## 📝 Descrição do Projeto

A **WebClassroom** foi desenvolvida para atender à demanda de professores da rede pública que não possuem ferramentas acessíveis para compartilhar conteúdos com seus alunos.

Com foco em **tecnologia acessível**, **escalabilidade** e **praticidade**, a aplicação oferece uma interface segura e moderna para **postagem e leitura de conteúdos educacionais**.

---

## 🚀 Funcionalidades

- ✅ Criação de usuários dos tipos **professor** e **aluno**
- ✅ Login de usuários via **JWT**
- ✅ Listagem de posts (alunos e professores)
- ✅ Leitura detalhada de um post (alunos e professores)
- ✅ Busca por título ou conteúdo (alunos e professores)
- ✅ Criação de postagens (apenas professores)
- ✅ Edição de postagens (apenas professores)
- ✅ Exclusão de postagens (apenas professores)

---

## 🏛 Arquitetura do Sistema (Frontend)

O frontend da **WebClassroom** foi desenvolvido com **React + TypeScript**, utilizando **Vite** como bundler, e adota uma arquitetura baseada em **componentes reutilizáveis** e **context API** para gerenciamento de estado global.

### Estrutura:

- **pages/**: telas da aplicação (Home, Login, PostView, Dashboard do professor)
- **components/**: componentes reutilizáveis (Cards, Botões, Inputs, Containers)
- **contexts/**: gerencia o estado global, incluindo `AuthContext` e `PostsContext`
- **services/**: integração com a API (login, posts CRUD)
- **styles/**: estilos globais e temas
- **App.tsx**: roteamento principal com `react-router-dom`
- **Vite**: bundler moderno, rápido e otimizado

### Fluxo de Uso da Aplicação:

1. **Login/Autenticação:**  
   O usuário realiza login via JWT. Professores possuem acesso a rotas administrativas.

2. **Listagem de Posts:**  
   Alunos e professores podem visualizar os últimos posts. O sistema suporta busca por título, conteúdo ou autor.

3. **Visualização Detalhada:**  
   Ao clicar em um post, o usuário visualiza o conteúdo completo em uma página dedicada.

4. **Gestão de Postagens (Professores):**  
   Professores podem criar, editar e excluir postagens. O frontend valida campos obrigatórios e controla o estado de loading.

5. **Responsividade e UX:**  
   Layouts flexíveis e estilizados com **Styled Components**, garantindo boa experiência em desktop e mobile.

---

## 📡 Endpoints da API

### 👤 Autenticação e Cadastro

#### `POST /v1/user`  
Cria um novo usuário.  
> **Obs:** Apenas usuários com `role: "professor"` têm acesso às rotas protegidas de postagens.  
**Body:**
```json
{
  "username": "professor",
  "password": "minhasenha123",
  "role": "professor"
}

POST /v1/user/signin

Autentica o usuário e retorna um token JWT.
Body:

{
  "username": "professor",
  "password": "minhasenha123"
}

📄 Postagens (Requer token Bearer JWT)

GET /v1/post

Lista todos os posts com paginação.
Query params (opcional): page (default: 1), limit (default: 10)

GET /v1/post/:id

Retorna os detalhes de um post específico.

GET /v1/post/search?q=termo

Busca posts que contenham o termo no título ou conteúdo.
Query params (opcional): page (default: 1), limit (default: 10)

POST /v1/post (somente professores)

Cria uma nova postagem.
Body:

{
  "title": "Título da postagem",
  "content": "Conteúdo da postagem",
  "author": "Nome do professor"
}

PUT /v1/post/:id (somente professores)

Edita uma postagem existente.
Body:

{
  "content": "Novo conteúdo"
}

DELETE /v1/post/:id (somente professores)

Exclui uma postagem.

🛠️ Tecnologias Utilizadas
	•	Node.js
	•	Express.js
	•	PostgreSQL
	•	Docker & Docker Compose
	•	GitHub Actions (CI/CD)
	•	Render (Deploy)
	•	Jest (testes unitários)
	•	React
	•	React Router
	•	Styled Components
	•	Vite
	•	Axios

⚙️ Como Executar o Projeto

▶️ Backend Local com Docker Compose
	1.	Clone o repositório:

git clone https://github.com/jpaquieli/WebClassroom.git
cd WebClassroom

	2.	Crie o arquivo .env com base no .env.example e configure as variáveis necessárias.
	3.	Suba os containers:

docker-compose up --build

	4.	A API estará disponível em: http://localhost:3000

▶️ Frontend Local com Vite
	1.	Entre na pasta do frontend:

cd webclassroom-frontend

	2.	Instale dependências:

npm install

	3.	Rode o frontend:

npm run dev

	4.	O frontend estará disponível em: http://localhost:5173


📦 CI/CD com GitHub Actions

A pipeline realiza:
	•	🔍 Instalação de dependências
	•	🧹 Execução das rotinas de lint
	•	✅ Execução dos testes
	•	📦 Push da imagem para o Docker Hub
	•	🚀 Deploy na Render

Arquivo da pipeline: .github/workflows/main.yml
