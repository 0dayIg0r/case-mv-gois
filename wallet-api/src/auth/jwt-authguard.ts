import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Guarda de autenticação que usa a estratégia JWT
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
