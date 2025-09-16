import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // para outros módulos injetarem o PrismaService
})
export class PrismaModule {}
