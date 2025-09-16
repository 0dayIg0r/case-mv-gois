import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Estratégia JWT para autenticação usando Passport
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // MESMO valor do AUTH_SECRET do Next
      algorithms: ['HS256'],
    });
  }

  // payload vem do token assinado no Next (ex.: { sub: userId, email?... })
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email ?? null };
  }
}
