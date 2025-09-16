import "server-only";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { RoundState as DBRoundState } from "@/generated/prisma";

/** Tipos para a API */
export type Card =
  `${"A"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"J"|"Q"|"K"}${"H"|"D"|"C"|"S"}`;
export type GameState = {
  roundId: string;
  state: "idle" | "playing" | "bust" | "finished";
  hand: Card[];
  total: number;
  pointsLastRound: number;
  score: number;
  walletCredit?: "ok" | "failed";
};

/** RNG + baralho (server) */
function xorshift32(seed: number) {
  let x = seed >>> 0;
  return () => {
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    return (x >>> 0) / 0xffffffff;
  };
}
function strToSeed(s: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
}
const RANKS = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"] as const;
const SUITS = ["H","D","C","S"] as const;
function buildDeck(): Card[] {
  return SUITS.flatMap(s => RANKS.map(r => `${r}${s}` as Card));
}

function shuffle(seed: string): Card[] {
  const deck = buildDeck();
  const rnd = xorshift32(strToSeed(seed));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
// calcula valor das cartas (A vale 1 ou 11)
function rankValues(card: Card): number[] {
  const rank = card.slice(0, card.length - 1);
  if (rank === "A") return [1, 11];
  if (rank === "J" || rank === "Q" || rank === "K" || rank === "10") return [10];
  return [Number(rank)];
}
// calcula o melhor total possível (menor que 21 ou o menor possível)
export function bestTotal(cards: Card[]): number {
  // gera todas as combinações possíveis de totais (por causa do A)
  let totals = [0];
  // para cada carta, cria novas combinações somando os valores possíveis
  for (const c of cards) {
    // para cada total atual, soma os valores possíveis da carta
    const vals = rankValues(c);
    // cria novas combinações de totais
    const next: number[] = [];
    // para cada total atual, soma os valores possíveis da carta
    for (const t of totals) for (const v of vals) next.push(t + v);
    totals = Array.from(new Set(next)).sort((a,b)=>b-a);
  }
  // pega o maior total que não estourou (<=21) ou o menor total (estourou)
  const best = totals.find(t => t <= 21);
  // se não encontrou, significa que estourou
  return best ?? Math.min(...totals);
}
// calcula pontos a partir do total (0 se estourou, 100 se fez 21, proporcional se menos)
export function pointsFromTotal(total: number): number {
  if (total > 21) return 0;
  if (total === 21) return 100;
  return Math.floor((total/21)*100);
}

// converte estado do banco para estado da API
function toApiState(s: DBRoundState): "playing"|"bust"|"finished" {
  return s === "PLAYING" ? "playing" : s === "BUST" ? "bust" : "finished";
}
// pega o score total do jogador
async function getScore(userId: string) {
  const agg = await prisma.gameRound.aggregate({
    where: { userId, state: "FINISHED" },
    _sum: { points: true },
  });
  return agg._sum.points ?? 0;
}

//tentativa de integração com Wallet (crédito)
export async function creditWallet(roundId: string, amount: number, bearer?: string): Promise<"ok"|"failed"> {
  const base = process.env.WALLET_API_URL || process.env.NEXT_PUBLIC_WALLET_API_URL;
  if (!base || !bearer) return "failed";
  try {
    const res = await fetch(`${base}/wallet/credit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${bearer}` },
      body: JSON.stringify({ roundId, amount }),
      cache: "no-store",
    });
    return res.ok ? "ok" : "failed";
  } catch {
    return "failed";
  }
}

// inicia a rodada
export async function startRound(userId: string): Promise<GameState> {
  // idempotência: se já existe PLAYING, retorna
  const existing = await prisma.gameRound.findFirst({
    where: { userId, state: "PLAYING" },
    orderBy: { createdAt: "desc" },
  });


  if (existing) {
    const total = bestTotal(existing.draws as Card[]);
    const score = await getScore(userId);
    return { roundId: existing.roundId, state: "playing", hand: existing.draws as Card[], total, pointsLastRound: 0, score };
  }

// cria nova rodada
  const seed = randomUUID();
  // faz cast pq o tipo oficial do next-auth não tem o id do usuário
  const roundId = randomUUID();
  // embaralha e dá a primeira carta
  const deck = shuffle(seed);
  const hand: Card[] = [deck[0]];
  const total = bestTotal(hand);

  // salva no banco
  await prisma.gameRound.create({
    data: { userId, roundId, seed, draws: hand, total, points: 0, state: "PLAYING" },
  });

  // pega score atualizado
  const score = await getScore(userId);
  return { roundId, state: "playing", hand, total, pointsLastRound: 0, score };
}

// compra carta
export async function hitCard(userId: string): Promise<GameState> {
  const r = await prisma.gameRound.findFirst({
    where: { userId, state: "PLAYING" },
    orderBy: { createdAt: "desc" },
  });
  // verifica se existe rodada ativa
  if (!r) throw new Error("NO_ACTIVE_ROUND");

  // compra a próxima carta
  const deck = shuffle(r.seed);
  // pega a próxima carta com base no número de cartas já compradas
  const nextCard = deck[(r.draws as Card[]).length];
  // monta a nova mão e calcula total e estado
  const hand = [...(r.draws as Card[]), nextCard];
  //total de pontos da mão
  const total = bestTotal(hand);
  
  // se estourou, muda estado
  const state: DBRoundState = total > 21 ? "BUST" : "PLAYING";

  // atualiza no banco
  await prisma.gameRound.update({ where: { id: r.id }, data: { draws: hand, total, state } });

  // pega score atualizado
  const score = await getScore(userId);
  return { roundId: r.roundId, state: toApiState(state), hand, total, pointsLastRound: 0, score };
}

// para a rodada
export async function standRound(userId: string, bearerToken?: string): Promise<GameState> {
  const r = await prisma.gameRound.findFirst({
    where: { userId, state: "PLAYING" },
    orderBy: { createdAt: "desc" },
  });

  // verifica se existe rodada ativa
  if (!r) throw new Error("NO_ACTIVE_ROUND");
/// calcula pontos
  const total = bestTotal(r.draws as Card[]);
  // calcula pontos
  const points = pointsFromTotal(total);
  // pontos a adicionar (não pode ser negativo)
  const add = points > 0 ? points : 0;

  // fecha a rodada
  await prisma.gameRound.update({
    where: { id: r.id },
    data: { total, points, state: "FINISHED", finishedAt: new Date() },
  });

  // garante PlayerScore e incrementa se tiver pontos
  await prisma.playerScore.upsert({
    where: { userId },
    update: add > 0 ? { total: { increment: add } } : {},
    create: { userId, total: add },
  });

  // tenta creditar na Wallet
  let walletCredit: "ok" | "failed" | undefined;

  // se tiver pontos e token, tenta creditar
  if (add > 0 && bearerToken) {
    walletCredit = await creditWallet(r.roundId, add, bearerToken);
    if (walletCredit === "ok") {
      await prisma.gameRound.update({
        where: { id: r.id },
        data: { credited: true, creditedAt: new Date() },
      });
    }
  }
// pega score atualizado
  const score = await getScore(userId);
  return { roundId: r.roundId, state: "finished", hand: r.draws as Card[], total, pointsLastRound: points, score, walletCredit };
}
