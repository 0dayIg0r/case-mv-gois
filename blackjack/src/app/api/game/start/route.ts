import "server-only";
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { getToken } from "next-auth/jwt";
import { startRound } from "../_logic";

// configuração da rota
export const runtime = "nodejs";

// força ser dinâmica (não cache)
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // pega userId da sessão ou do JWT
    const session = await auth();
    //faz cast pq o tipo oficial do next-auth não tem o id do usuário
    const userIdFromSession = (session as any)?.user?.id;

    //pega o token (bearer) caso tenha
    const t = await getToken({ req, secret: process.env.AUTH_SECRET });
    //prioriza o userId da sessão, se não tiver tenta pegar do token JWT
    const userId = userIdFromSession ?? t?.sub;

    // se não tiver userId, retorna erro 401
    if (!userId) {
      return Response.json({ error: "UNAUTHENTICATED" }, { status: 401 });
    }

    // inicia a rodada
    const gs = await startRound(userId);
    return Response.json(gs, { status: 201 });
  } catch (err: any) {
    return Response.json(
      { error: "INTERNAL_ERROR", detail: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}
