import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';


// Módulo de autenticação que configura o Passport com a estratégia JWT
@Module({
  imports: [PassportModule],
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
