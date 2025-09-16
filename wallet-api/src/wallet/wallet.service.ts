import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, TxSource, TxType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  // obtém o saldo atual do usuário calculando créditos menos débitos
  async getBalance(userId: string) {
    const [c, d] = await Promise.all([
      this.prisma.walletTransaction.aggregate({
        where: { userId, type: TxType.CREDIT },
        _sum: { amount: true },
      }),
      this.prisma.walletTransaction.aggregate({
        where: { userId, type: TxType.DEBIT },
        _sum: { amount: true },
      }),
    ]);
    // se não houver transações, retorna 0
    const credit = c._sum.amount ?? 0;
    // se não houver transações, retorna 0
    const debit = d._sum.amount ?? 0;
    // saldo = créditos - débitos
    return credit - debit;
  }

  async credit(userId: string, roundId: string, amount: number) {
   
    await this.prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId },
    });

    try {
      await this.prisma.walletTransaction.create({
        data: {
          userId,
          type: TxType.CREDIT,
          source: TxSource.BLACKJACK,
          amount,
          refId: roundId,
        },
      });
      return { ok: true };
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      
        return { ok: true, idempotent: true };
      }
      throw e;
    }
  }
// debita um valor da carteira do usuário, se houver saldo suficiente
  async debit(userId: string, orderId: string, amount: number) {
    const balance = await this.getBalance(userId);
    if (balance < amount) {
      throw new BadRequestException('INSUFFICIENT_FUNDS');
    }

    try {
      await this.prisma.walletTransaction.create({
        data: {
          userId,
          type: TxType.DEBIT,
          source: TxSource.CHECKOUT,
          amount,
          refId: orderId,
        },
      });
      return { ok: true };
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        return { ok: true, idempotent: true };
      }i
      throw e;
    }
  }
}
