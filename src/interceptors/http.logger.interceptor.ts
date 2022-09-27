import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class HTTPLoggerInterceptor implements NestInterceptor {
  logger = new Logger('LOGGER INTERCEPTOR');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `${req.method} ${req.originalUrl} ${res.statusCode} ${req.ip} ${
              Date.now() - now
            }ms`,
          ),
        ),
      );
  }
}
