<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>README - Blackjack + E-commerce</title>
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; color: #212529; line-height: 1.6; padding: 20px; }
  h1, h2, h3 { color: #0d6efd; }
  h1 { border-bottom: 3px solid #0d6efd; padding-bottom: 8px; }
  pre { background-color: #212529; color: #f8f9fa; padding: 12px; border-radius: 6px; overflow-x: auto; }
  code { background-color: #e9ecef; padding: 2px 5px; border-radius: 4px; font-family: monospace; }
  ul { margin: 10px 0 10px 20px; }
  li { margin-bottom: 6px; }
  .badge { display: inline-block; background-color: #0d6efd; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.8rem; margin-right: 5px; }
  .danger { background-color: #dc3545; padding: 2px 6px; border-radius: 4px; color: white; font-weight: bold; }
  .section { background-color: #ffffff; border-radius: 10px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
  a { color: #0d6efd; text-decoration: none; }
  a:hover { text-decoration: underline; }
</style>
</head>
<body>

<h1>🃏 Projeto Blackjack + E-commerce (parcial)</h1>

<div class="section">
  <h2>Descrição</h2>
  <p>Este projeto é um <strong>sistema full-stack</strong> composto por:</p>
  <ul>
    <li><strong>Blackjack (21)</strong> – jogo de cartas em Next.js com backend. Permite iniciar rodada, pedir carta, manter e pontuação automática.</li>
    <li><strong>E-commerce</strong> – backend em NestJS, parcialmente implementado. Algumas funcionalidades estão faltando e o frontend ainda não foi desenvolvido.</li>
  </ul>
  <p>O objetivo é demonstrar habilidades em <strong>Next.js, NestJS, Prisma, Auth.js, Neontech (PostgreSQL) e ShadCN/UI</strong>.</p>
</div>

<div class="section">
  <h2>Observações Importantes</h2>
  <ul>
    <li><span class="danger">E-commerce incompleto:</span> algumas rotas e funcionalidades ainda não estão implementadas.</li>
    <li>Para testar o projeto, o usuário precisa criar uma <strong>chave no GitHub</strong> para login social via Auth.js (NextAuth).</li>
    <li>É necessário criar uma <strong>conta no Neontech</strong> e configurar a URL do banco na variável de ambiente <code>DATABASE_URL</code>.</li>
  </ul>
</div>

<div class="section">
  <h2>Tecnologias Utilizadas</h2>
  <ul>
    <li><span class="badge">Frontend</span>Next.js + React.js + TypeScript</li>
    <li><span class="badge">UI</span>ShadCN/UI + TailwindCSS</li>
    <li><span class="badge">Backend</span>NestJS + Prisma + Neontech (PostgreSQL)</li>
    <li><span class="badge">Autenticação</span>Auth.js (NextAuth) com login GitHub e JWT</li>
  </ul>
</div>

<div class="section">
  <h2>Requisitos</h2>
  <ul>
    <li>Node.js >= 18</li>
    <li>Conta no GitHub e gerar <strong>chave OAuth</strong> para login social</li>
    <li>Conta no Neontech e criar banco PostgreSQL</li>
    <li>Arquivo <code>.env</code> com todas as variáveis de ambiente configuradas</li>
  </ul>
</div>

<div class="section">
  <h2>Configuração do Projeto</h2>
  <h3>1. Criar arquivo .env</h3>
  <pre>
# Frontend / Next.js
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=<pegar da sua conta Auth.js>
GITHUB_ID=<seu_id_github>
GITHUB_SECRET=<seu_secret_github>
DATABASE_URL=<url_do_banco_neontech>

# Backend / NestJS
JWT_SECRET=<mesma_chave_do_auth>

# Mail (opcional)
MAIL_HOST=<host_smtp>
MAIL_PORT=<porta>
MAIL_USERNAME=<usuario>
MAIL_PASSWORD=<senha>
  </pre>
  <p><span class="danger">Observação:</span> O .env será fornecido apenas por questões educacionais.</p>

  <h3>2. Criar conta e obter chaves</h3>
  <ul>
    <li><strong>GitHub</strong>: criar conta → Settings → Developer Settings → OAuth Apps → criar App → pegar <code>Client ID</code> e <code>Client Secret</code>.</li>
    <li><strong>Neontech</strong>: criar conta → criar banco PostgreSQL → pegar <code>URL do banco</code> e colocar em <code>DATABASE_URL</code>.</li>
    <li><strong>Auth.js (NextAuth)</strong>: gerar <code>AUTH_SECRET</code> para JWT e colocar no .env.</li>
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
  <h2>Como Jogar / Testar</h2>
  <ol>
    <li>Rodar backend e frontend simultaneamente</li>
    <li>Criar conta ou logar via GitHub</li>
    <li>Acessar <code>/play</code> para jogar Blackjack</li>
    <li>Ao finalizar a rodada, tokens são creditados na wallet</li>
    <li>Usar tokens no e-commerce (funcionalidades limitadas)</li>
  </ol>
</div>

<div class="section">
  <h2>Boas Práticas</h2>
  <ul>
    <li>Código modularizado e tipado (TypeScript)</li>
    <li>Componentização UI com ShadCN para consistência visual</li>
    <li>Uso de Prisma para consultas seguras e tipadas</li>
    <li>Tratamento de erros nas chamadas de API</li>
  </ul>
</div>

<div class="section">
  <h2>Contribuição</h2>
  <ol>
    <li>Fork do repositório</li>
    <li>Criar branch: <code>git checkout -b feature/novaFuncionalidade</code></li>
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
