import 'server-only';
import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { getToken } from 'next-auth/jwt';
import { standRound } from '../_logic';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // Pega userId da sessão ou do JWT
    const session = await auth();
    //faz cast pq o tipo oficial do next-auth não tem o id do usuário
    const userIdFromSession = (session as any)?.user?.id;
    //pega o token (bearer) caso tenha
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    //pega o token raw (string) caso precise enviar para outra API
    const raw = (await getToken({ req, secret: process.env.AUTH_SECRET, raw: true })) as string | null;

    //prioriza o userId da sessão, se não tiver tenta pegar do token JWT
    const userId = userIdFromSession ?? token?.sub;
    // se não tiver userId, retorna erro 401
    if (!userId) return Response.json({ error: 'UNAUTHENTICATED' }, { status: 401 });

    // finaliza a rodada
    const gs = await standRound(userId, raw ?? undefined); // <-- await
    return Response.json(gs, { status: 200 });
  } catch (e: any) {
    if (e?.message === 'NO_ACTIVE_ROUND') {
      return Response.json({ error: 'NO_ACTIVE_ROUND' }, { status: 400 });
    }
    console.error('POST /api/game/stand error:', e);
    return Response.json({ error: 'INTERNAL_ERROR', detail: String(e?.message ?? e) }, { status: 500 });
  }
}
