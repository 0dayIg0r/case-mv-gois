# 🃏 Projeto Blackjack + E-commerce (parcial)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge\&logo=next.js\&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge\&logo=nestjs\&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-0C344B?style=for-the-badge\&logo=prisma\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-24292F?style=for-the-badge\&logo=github\&logoColor=white)

---

## Descrição

Este projeto é um **sistema full-stack** composto por:

* **Blackjack (21)** – jogo de cartas em Next.js com backend. Permite iniciar rodada, pedir carta, manter e pontuação automática.
* **E-commerce** – backend em NestJS, parcialmente implementado. Algumas funcionalidades estão faltando e o frontend ainda não foi desenvolvido.

O objetivo é demonstrar habilidades em **Next.js, NestJS, Prisma, Auth.js, Neontech (PostgreSQL) e ShadCN/UI**.

Vídeo explicativo: https://drive.google.com/file/d/1V_MjcXU_3M0RuTUWM2e97QNlaqeLbTDD/view?usp=drive_link

---

## Observações Importantes

* ⚠️ **E-commerce incompleto**: algumas rotas e funcionalidades ainda não estão implementadas.
* Para testar o projeto, o usuário precisa criar uma **chave no GitHub** para login social via Auth.js (NextAuth).
* É necessário criar uma **conta no Neontech** e configurar a URL do banco na variável de ambiente `DATABASE_URL`.

---

## Tecnologias Utilizadas

**Frontend**

* Next.js + React.js + TypeScript
* ShadCN/UI (componentes prontos)
* TailwindCSS (estilização utilitária)

**Backend**

* NestJS
* Prisma ORM
* Neontech (PostgreSQL)

**Autenticação**

* Auth.js (NextAuth)
* Login social via GitHub
* JWT para integração frontend/backend

---

## Requisitos

Antes de rodar o projeto, você precisará:

1. Node.js >= 18
2. Conta no GitHub e gerar **OAuth App** para login social
3. Conta no Neontech e criar banco PostgreSQL
4. Arquivo `.env` com todas as variáveis de ambiente configuradas

---

## Configuração do Projeto

### 1. Criar arquivo `.env`

```env
# Frontend / Next.js
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=<pegar da sua conta Auth.js>
GITHUB_ID=<seu_id_github>
GITHUB_SECRET=<seu_secret_github>
DATABASE_URL=<url_do_banco_neontech>

# Backend / NestJS
JWT_SECRET=<mesma_chave_do_auth>

```

> ⚠️ O `.env` será fornecido apenas por questões educacionais.

### 2. Criar conta e obter chaves

* **GitHub**: criar conta → Settings → Developer Settings → OAuth Apps → criar App → pegar `Client ID` e `Client Secret`.
* **Neontech**: criar conta → criar banco PostgreSQL → pegar URL do banco e colocar em `DATABASE_URL`.
* **Auth.js (NextAuth)**: gerar `AUTH_SECRET` para JWT e colocar no `.env`.

---

## Estrutura do Projeto

```
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
```

---

## Scripts Úteis

**Frontend**

```bash
npm install       # Instalar dependências
npm run dev       # Rodar em dev
npm run build     # Build para produção
npm start         # Start do app
```

**Backend**

```bash
npm install
npm run start:dev     # Rodar NestJS em dev
npm run build
npm run start:prod    # Start produção
```

**Prisma**

```bash
npx prisma generate   # Gerar client Prisma
npx prisma migrate dev # Rodar migrations
```

---

## Como Jogar / Testar

1. Rodar backend e frontend simultaneamente
2. Criar conta ou logar via GitHub
3. Acessar `/play` para jogar Blackjack
4. Ao finalizar a rodada, tokens são creditados na wallet
5. Usar tokens no e-commerce (funcionalidades limitadas)

---

## Boas Práticas

* Código modularizado e tipado (TypeScript)
* Componentização UI com ShadCN para consistência visual
* Uso de Prisma para consultas seguras e tipadas
* Tratamento de erros nas chamadas de API

---

## Contribuição

1. Fork do repositório
2. Criar branch: `git checkout -b feature/novaFuncionalidade`
3. Commit: `git commit -m 'feat: adicionar funcionalidade X'`
4. Push: `git push origin feature/novaFuncionalidade`
5. Abrir Pull Request

---

## Licença

MIT License – veja o arquivo `LICENSE` para detalhes.
