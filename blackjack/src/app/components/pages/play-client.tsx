"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Separator } from "../../../../components/ui/separator";

type RoundState = "idle" | "playing" | "bust" | "finished";
type GameState = {
  roundId: string;
  state: RoundState;
  hand: string[];
  total: number;
  pointsLastRound: number;
  score: number;
  walletCredit?: "ok" | "failed";
};

export default function PlayPage() {
  const [gs, setGs] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function call(
    path: "/api/game/start" | "/api/game/hit" | "/api/game/stand"
  ) {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await fetch(path, { method: "POST" });
      const data = (await res.json()) as GameState | { error: string };
      if ("error" in data) {
        setErrorMsg(data.error);
      } else {
        setGs(data);
      }
    } catch (e: any) {
      setErrorMsg(e?.message ?? "Erro ao comunicar com o backend.");
    } finally {
      setLoading(false);
    }
  }

  //Verifica se pode iniciar ou jogar, se estiver carregando ou no estado errado
  const canStart = !loading && gs?.state !== "playing";
  const canPlay = !loading && gs?.state === "playing";

  // Componente para mostrar o naipe da carta
  function Suit({ s }: { s: string }) {
    const map: Record<string, { sym: string; className: string }> = {
      H: { sym: "♥", className: "text-red-500" },
      D: { sym: "♦", className: "text-red-500" },
      C: { sym: "♣", className: "text-emerald-600" },
      S: { sym: "♠", className: "text-slate-700 dark:text-slate-200" },
    };

    // retorna o símbolo e a classe CSS do naipe, ou '?' se inválido
    const m = map[s] ?? { sym: "?", className: "" };
    //retorna o span com o símbolo e a classe
    return <span className={m.className}>{m.sym}</span>;
  }

  // Componente para mostrar uma carta (ex.: "AH", "10D", "7C")
  function CardChip({ c }: { c: string }) {
    // ex.: "AH", "10D", "7C"
    const suit = c.slice(-1);
    //faz o fatiamento para pegar o rank (tudo menos o último caractere)
    const rank = c.slice(0, c.length - 1);
    return (
      <span className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm bg-background">
        <span className="font-semibold">{rank}</span>
        <Suit s={suit} />
      </span>
    );
  }
  // JSX do componente principal
  return (
    <main className="min-h-dvh bg-gradient-to-b from-background via-background to-muted/30">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold">
            ← Voltar
          </Link>
          <div className="text-sm text-muted-foreground">/play</div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8 md:py-12 grid gap-6 md:grid-cols-2">
        {/* Coluna: Controles & Mão */}
        <Card>
          <CardHeader>
            <CardTitle>Blackjack — Mesa</CardTitle>
            <CardDescription>
              Use <span className="font-medium">Iniciar</span> para iniciar,{" "}
              <span className="font-medium">Pedir Carta</span> para comprar, e{" "}
              <span className="font-medium">Manter</span> para finalizar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => call("/api/game/start")}
                disabled={!canStart}
              >
                Iniciar
              </Button>
              <Button
                onClick={() => call("/api/game/hit")}
                disabled={!canPlay}
                variant="secondary"
              >
                Pedir Carta
              </Button>
              <Button
                onClick={() => call("/api/game/stand")}
                disabled={!canPlay}
                variant="outline"
              >
                Manter
              </Button>
            </div>

            {loading && (
              <div className="text-sm text-muted-foreground">
                Processando...
              </div>
            )}

            {errorMsg && (
              <div className="text-sm text-red-500">Erro: {errorMsg}</div>
            )}

            <Separator />

            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">
                Estado da rodada
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={gs?.state === "playing" ? "default" : "secondary"}
                >
                  {gs?.state ?? "Aguardando jogador"}
                </Badge>
                {gs?.walletCredit && (
                  <Badge
                    variant={
                      gs.walletCredit === "ok" ? "default" : "destructive"
                    }
                  >
                    crédito {gs.walletCredit}
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Mão</div>
              <div className="flex flex-wrap gap-2">
                {gs?.hand?.length ? (
                  gs.hand.map((c) => <CardChip key={c + Math.random()} c={c} />)
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Sem cartas
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Total</div>
                <div className="text-xl font-semibold">{gs?.total ?? 0}</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">
                  Pontos (última)
                </div>
                <div className="text-xl font-semibold">
                  {gs?.pointsLastRound ?? 0}
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">
                  Score acumulado
                </div>
                <div className="text-xl font-semibold">{gs?.score ?? 0}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Dica: Ás vale 1 ou 11; 21 = 100 pontos; &gt;21 = 0 (bust).
          </CardFooter>
        </Card>

        {/* Coluna: Regras & Observações */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Regras & Integração</CardTitle>
            <CardDescription>
              Resumo do arcade + integração com Wallet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ul className="list-disc pl-5 space-y-1">
              <li>Sem dealer — você vs baralho (52 cartas).</li>
              <li>
                <b>Iniciar</b> inicia a rodada (embaralha no backend com
                seed/nonce).
              </li>
              <li>
                <b>Pedir Carta</b> compra uma carta; <b>Manter</b> finaliza e calcula
                pontos.
              </li>
              <li>
                Pontuação: 21 = 100; 0 &lt; total &lt; 21 = ⌊total/21·100⌋; &gt;
                21 = 0.
              </li>
            </ul>
            <Separator />
            <p>
              Se <b>pontos &gt; 0</b>, a rota <code>/api/game/stand</code> chama
              a carteira (Nest) e<b> credita TKN</b> com o mesmo JWT do usuário
              (Auth.js).
            </p>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Problemas nas rotas? Confira se{" "}
            <code>/api/game/start|hit|stand</code> existem e retornam o JSON
            esperado.
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
