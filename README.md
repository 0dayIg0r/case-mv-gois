<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Projeto Blackjack + E-commerce</title>
<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f8f9fa;
    color: #212529;
    line-height: 1.6;
    padding: 20px;
  }
  h1, h2, h3 {
    color: #0d6efd;
  }
  h1 {
    border-bottom: 3px solid #0d6efd;
    padding-bottom: 5px;
  }
  pre {
    background-color: #212529;
    color: #f8f9fa;
    padding: 10px;
    border-radius: 6px;
    overflow-x: auto;
  }
  code {
    background-color: #e9ecef;
    padding: 2px 5px;
    border-radius: 4px;
    font-family: monospace;
  }
  ul {
    margin: 10px 0 10px 20px;
  }
  li {
    margin-bottom: 6px;
  }
  .badge {
    display: inline-block;
    background-color: #0d6efd;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.8rem;
    margin-right: 5px;
  }
  .danger {
    background-color: #dc3545;
  }
  .section {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 15px 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }
</style>
</head>
<body>

<h1>🃏 Projeto Blackjack + E-commerce</h1>

<div class="section">
  <h2>Descrição</h2>
  <p>
    Este projeto consiste em <strong>dois sistemas integrados</strong>:
  </p>
  <ul>
    <li><strong>Blackjack (21)</strong> – jogo de cartas em Next.js com backend.</li>
    <li><strong>E-commerce</strong> – backend em NestJS e frontend em Next.js/React, usando saldo do Blackjack como moeda virtual.</li>
  </ul>
  <p>
    Objetivo: demonstrar habilidades em <strong>full-stack</strong>, autenticação, banco de dados, integração de wallets e componentização UI com ShadCN.
  </p>
</div>

<div class="section">
  <h2>Tecnologias Utilizadas</h2>
  <ul>
    <li><span class="badge">Frontend</span>Next.js, React.js, TypeScript, ShadCN/UI, TailwindCSS</li>
    <li><span class="badge">Backend</span>NestJS, Prisma, Neontech (PostgreSQL)</li>
    <li><span class="badge">Autenticação</span>Auth.js (NextAuth)</li>
  </ul>
</div>

<div class="section">
  <h2>Funcionalidades Principais</h2>
  <ul>
    <li>Blackjack: iniciar rodada, pedir carta, manter, pontuação automática, estados traduzidos em português.</li>
    <li>Integração com wallet para crédito de tokens ao finalizar a rodada.</li>
    <li>E-commerce: uso de saldo do Blackjack como moeda virtual, autenticação única via Auth.js.</li>
    <li>Persistência: Prisma + Neontech para armazenamento de usuários, jogos e transações.</li>
    <li>UI responsiva e moderna, com feedback visual das cartas e pontuação.</li>
  </ul>
</div>

<div class="section">
  <h2>Estrutura do Projeto</h2>
  <pre>
/frontend
  ├─ app/                  # Next.js app (rotas, pages)
  ├─ components/           # Componentes ShadCN/UI
  ├─ styles/               # TailwindCSS + overrides
  └─ hooks/                # Hooks personalizados

/backend
  ├─ src/
      ├─ modules/          # Módulos NestJS (game, wallet, users)
      ├─ prisma/           # Prisma schema & migrations
      ├─ main.ts           # Entry point NestJS
  └─ package.json
  </pre>
</div>

<div class="section">
  <h2>Scripts Úteis</h2>
  <h3>Frontend</h3>
  <pre>
npm install       # Instalar dependências
npm run dev       # Rodar em dev
npm run build     # Build para produção
npm start         # Start do app
  </pre>
  <h3>Backend</h3>
  <pre>
npm install
npm run start:dev     # Rodar NestJS em dev
npm run build
npm run start:prod    # Start produção
  </pre>
  <h3>Prisma</h3>
  <pre>
npx prisma generate   # Gerar client Prisma
npx prisma migrate dev # Rodar migrations
  </pre>
</div>

<div class="section">
  <h2>Variáveis de Ambiente</h2>
  <p><strong>Observação:</strong> O arquivo <code>.env</code> será fornecido apenas <span class="danger">por questões educacionais</span>.</p>
  <pre>
# Frontend / Next.js
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=<sua_chave_auth>
DATABASE_URL=<url_do_neontech>

# Backend / NestJS
JWT_SECRET=<sua_chave_jwt>

# Mail (opcional)
MAIL_HOST=<host_smtp>
MAIL_PORT=<porta>
MAIL_USERNAME=<usuario>
MAIL_PASSWORD=<senha>
  </pre>
</div>

<div class="section">
  <h2>Como Jogar / Testar</h2>
  <ol>
    <li>Rodar backend e frontend simultaneamente.</li>
    <li>Criar conta ou logar via login social.</li>
    <li>Acessar <code>/play</code> para jogar Blackjack.</li>
    <li>Ao finalizar a rodada, tokens são creditados na wallet.</li>
    <li>Usar tokens no e-commerce integrado.</li>
  </ol>
</div>

<div class="section">
  <h2>Boas Práticas</h2>
  <ul>
    <li>Código modularizado e tipado (TypeScript).</li>
    <li>Componentização UI com ShadCN para consistência visual.</li>
    <li>Uso de Prisma para consultas seguras e tipadas.</li>
    <li>Tratamento de erros nas chamadas de API.</li>
  </ul>
</div>

<div class="section">
  <h2>Contribuição</h2>
  <p>Contribuições são bem-vindas!</p>
  <ol>
    <li>Fork do repositório</li>
    <li>Criar sua branch: <code>git checkout -b feature/novaFuncionalidade</code></li>
    <li>Commit: <code>git commit -m 'feat: adicionar funcionalidade X'</code></li>
    <li>Push: <code>git push origin feature/novaFuncionalidade</code></li>
    <li>Abrir Pull Request</li>
  </ol>
</div>

<div class="section">
  <h2>Licença</h2>
  <p>MIT License – veja o arquivo <code>LICENSE</code> para detalhes.</p>
</div>

</body>
</html>
