import 'server-only';
import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { getToken } from 'next-auth/jwt';
import { hitCard } from '../_logic';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userIdFromSession = (session as any)?.user?.id;
    const t = await getToken({ req, secret: process.env.AUTH_SECRET });
    const userId = userIdFromSession ?? t?.sub;

    if (!userId) return Response.json({ error: 'UNAUTHENTICATED' }, { status: 401 });

    const gs = await hitCard(userId); 
    return Response.json(gs, { status: 200 });
  } catch (e: any) {
    if (e?.message === 'NO_ACTIVE_ROUND') {
      return Response.json({ error: 'NO_ACTIVE_ROUND' }, { status: 400 });
    }
    return Response.json({ error: 'INTERNAL_ERROR', detail: String(e?.message ?? e) }, { status: 500 });
  }
}
