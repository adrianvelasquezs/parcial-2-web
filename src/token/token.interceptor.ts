/* eslint-disable */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private readonly tokenService: TokenService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(async () => {
        const request = context.switchToHttp().getRequest();
        const [type, tokenString] =
          request.headers.authorization?.split(' ') ?? [];

        if (type === 'Bearer' && tokenString) {
          const tokenEntity = await this.tokenService.findByToken(tokenString);
          if (tokenEntity) {
            await this.tokenService.reduce(tokenEntity.id);
          }
        }
      }),
    );
  }
}
