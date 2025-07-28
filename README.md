📚 WebClassroom

📝 Descrição do Projeto

Esta plataforma foi desenvolvida para atender à demanda de professores da rede pública que não possuem ferramentas acessíveis para compartilhar conteúdos com seus alunos.

Com foco em tecnologia acessível, escalabilidade e praticidade, esta aplicação oferece uma interface para postagem e leitura de conteúdos educacionais.

⸻

🚀 Funcionalidades
	•	✅ Criação de usuários de tipo professor e aluno
	•	✅ Login de usuários via JWT
	•	✅ Listagem de posts (alunos e professores)
	•	✅ Leitura detalhada de um post (alunos e professores)
	•	✅ Busca por título ou conteúdo (alunos e professores)
	•	✅ Criação de postagens (professores)
	•	✅ Edição de postagens (professores)
	•	✅ Exclusão de postagens (professores)

⸻

📡 Fluxo de endpoints da API

POST v1/user
Cria um novo usuário (obs: Apenas usuários do tipo professor terão acesso a todas rotas).
Body:
{
  "username": "professor",
  "password": "minhasenha123",
  "role": "professor"
}

POST v1/user/signin
Autentica o usuário e retorna o Token
Body:
{
  "username": "professor",
  "password": "minhasenha123"
}

obs: Para as rotas a seguir o usuário deve estar autenticado via token bearer
GET v1/post (alunos e professores)
Lista todos os posts.
Parâmetros de query opcionais:
	•	page (número da página, padrão = 1)
	•	limit (quantos posts retornar por página, padrão = 10)

GET v1/post/:id (alunos e professores)
Retorna os detalhes de um post específico.

GET v1/post/search?q=termo (alunos e professores)
Busca por posts que contenham o termo no título ou conteúdo.
Parâmetros de query opcionais:
	•	page (número da página, padrão = 1)
	•	limit (quantos posts retornar por página, padrão = 10)

POST v1/post (professores)
Cria um novo post (professores).
Body:
{
  "title": "Teste",
  "content": "Teste",
  "author": "Teste"
}

PUT v1/post/:id (professores)
Edita uma postagem existente.
Body:
{
  "content": "Teste edição",
}

DELETE v1/post/:id (professores)
Exclui uma postagem.

🛠️ Tecnologias Utilizadas
	•	Node.js
	•	Express.js
	•	PostgreSQL
	•	Docker & Docker Compose
	•	GitHub Actions (CI/CD)
	•	Render (deploy)
	•	Jest (testes)

⚙️ Como Executar o Projeto

▶️ Executando Localmente com Docker Compose
1.	Clone o repositório:
    git clone https://github.com/jpaquieli/WebClassroom.git

2.	Crie o arquivo .env com as variáveis de ambiente necessárias de acordo com o .env.example

3.	Suba os containers:
    docker-compose up --build

4.	A API estará exposta em:
    http://localhost:3000

☁️ Ambiente de Produção (Render)

O deploy automático está configurado na Render.
	•	Variáveis de Ambiente:
        Configure as mesmas variáveis do .env dentro da aba Environment da Render.
	•	Deploy automático via GitHub Actions: 
        Ao realizar push na main, o deploy é disparado automaticamente.
	•	A aplicação está exposta na URL:
        https://webclassroom-latest.onrender.com 

🧪 Testes

Execute os testes com:
    npm test

	•	Framework: Jest
	•	Foco em testes de criação, edição e exclusão de postagens
    •   Os testes fazem parte da esteira de CI do github actions

📦 CI/CD com GitHub Actions

A pipeline automatiza:
	•	Instalação de dependências
    •	Execução das rotinas de lint
	•	Execução dos testes
    •	Push da imagem para o Docker Hub
	•	Deploy (Render)

Arquivo: .github/workflows/main.yml