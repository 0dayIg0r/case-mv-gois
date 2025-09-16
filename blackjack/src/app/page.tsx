"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import {
  Github,
  Gamepad2,
  Coins,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  async function handleGithubLogin() {
    try {
      setLoading(true);
      await signIn("github", { redirectTo: "/play" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-dvh bg-gradient-to-b from-background via-background to-muted/30">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Sparkles className="h-5 w-5" />
            <span>Blackjack + TKN</span>
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Demo
            </Badge>
            <Button
              onClick={handleGithubLogin}
              className="gap-2"
              disabled={loading}
            >
              {loading ? (
                <span className="relative">
                  <span className="absolute inset-0 animate-ping opacity-60">
                    {" "}
                  </span>
                  <Github className="h-4 w-4 animate-spin" />
                </span>
              ) : (
                <Github className="h-4 w-4" />
              )}
              Fazer login com GitHub
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              Jogue <span className="text-primary">Blackjack</span> e use seus
              pontos como{" "}
              <span className="underline decoration-primary/50">moeda</span> no
              e-commerce
            </h1>
            <p className="text-muted-foreground">
              Login único (SSO) com GitHub. O saldo em <strong>TKN</strong> é
              creditado nas vitórias e pode ser usado no checkout.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/play">
                <Button size="lg" className="gap-2">
                  <Gamepad2 className="h-4 w-4" />
                  Jogar agora
                </Button>
              </Link>
              <Link href="/wallet">
                <Button variant="outline" size="lg" className="gap-2">
                  <Coins className="h-4 w-4" />
                  Ver saldo
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Badge variant="secondary">Next.js App Router</Badge>
              <Badge variant="secondary">shadcn/ui</Badge>
              <Badge variant="secondary">Auth.js</Badge>
              <Badge variant="secondary">Prisma</Badge>
              <Badge variant="secondary">Neon Tech - Postgres</Badge>
            </div>
          </div>

          <Card className="border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Anti-fraude & logs de rodada
              </CardTitle>
              <CardDescription>
                Embaralhamento no backend, seed/nonce e registro de
                cartas/timestamps para auditoria.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border p-4">
                  <div className="text-xs text-muted-foreground">Estado</div>
                  <div className="font-semibold">Jogando → Pegar Carta/Parar</div>
                </div>
                <div className="rounded-xl border p-4">
                  <div className="text-xs text-muted-foreground">Pontuação</div>
                  <div className="font-semibold">0..100 (21 = 100)</div>
                </div>
                <div className="rounded-xl border p-4">
                  <div className="text-xs text-muted-foreground">Moeda</div>
                  <div className="font-semibold">TKN (1:1 pontos)</div>
                </div>
                <div className="rounded-xl border p-4">
                  <div className="text-xs text-muted-foreground">
                    Integração
                  </div>
                  <div className="font-semibold">Wallet (NestJS) via JWT</div>
                </div>
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground">
                Ao finalizar com <strong>Stand</strong>, creditamos o saldo se
                os pontos forem &gt; 0.
              </p>
            </CardContent>
            <CardFooter className="justify-end">
              <Link
                href="/docs"
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                Ver documentação <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 pb-14">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="h-5 w-5" />
                Blackjack Arcade
              </CardTitle>
              <CardDescription>
                Iniciar / Pedir Carta / Manter com Ás valendo 1 ou 11.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                Saldo central em TKN
              </CardTitle>
              <CardDescription>
                Crédito no jogo, débito no e-commerce.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                SSO + Segurança
              </CardTitle>
              <CardDescription>
                Auth.js (GitHub) e JWT compartilhado com a API.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-sm text-muted-foreground">
          Feito com Next.js, shadcn/ui e Auth.js — Demo técnica para o case MV
          Gois.
        </div>
      </footer>
    </main>
  );
}
