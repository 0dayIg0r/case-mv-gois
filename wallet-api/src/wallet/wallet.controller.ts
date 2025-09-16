import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WalletService } from './wallet.service';
import { CreditDto } from './dto/credit.dto';
import { DebitDto } from './dto/debit.dto';


// Controlador da Wallet que lida com operações de saldo, crédito e débito
@Controller('wallet')
// faz a proteção com JWT
@UseGuards(JwtAuthGuard)
export class WalletController {
  constructor(private readonly wallet: WalletService) {}

  // retorna o saldo do usuário autenticado
  @Get('balance')
  async balance(@Req() req: any) {
    const userId = req.user?.userId as string;
    const balance = await this.wallet.getBalance(userId);
    return { balance };
  }

  // credita um valor na carteira do usuário autenticado
  @Post('credit')
  async credit(@Req() req: any, @Body() dto: CreditDto) {
    const userId = req.user?.userId as string;
    return this.wallet.credit(userId, dto.roundId, dto.amount);
  }

  // debita um valor na carteira do usuário autenticado
  @Post('debit')
  async debit(@Req() req: any, @Body() dto: DebitDto) {
    const userId = req.user?.userId as string;
    return this.wallet.debit(userId, dto.orderId, dto.amount);
  }
}
