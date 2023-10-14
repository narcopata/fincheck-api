import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from 'src/shared/config/env';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { metadataTokens } from 'src/shared/metadataTokens';

type BaseObjectType = Record<string | number | symbol, unknown>;

type ExtendedObject<
  Obj extends object | BaseObjectType,
  Key extends keyof Obj = keyof Obj,
  Value extends Obj[Key] = Obj[Key],
> = BaseObjectType & {
  [key in Key]: Value;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  private static extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      metadataTokens.IS_PUBLIC,
      [context.getClass(), context.getHandler()],
    );

    if (isPublic) {
      return true;
    }

    const request: ExtendedObject<Request> = context
      .switchToHttp()
      .getRequest();

    const token = AuthGuard.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'Você não está autorizado a acessar este recurso.',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync<
        ExtendedObject<{
          sub: string;
        }>
      >(token, {
        secret: env.jwtSecret,
      });

      request.userId = payload.sub;
    } catch {
      throw new UnauthorizedException(
        'Você não está autorizado a acessar este recurso.',
      );
    }

    return true;
  }
}
