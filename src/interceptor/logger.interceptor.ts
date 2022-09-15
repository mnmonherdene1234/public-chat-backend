import { NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common"
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

export class LoggerInterceptor implements NestInterceptor {
    logger = new Logger("HTTP LOGGER INTERCEPTOR");
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const now = Date.now();
        return next.handle().pipe(tap(() => this.logger.log(`${req.method} ${req.originalUrl} ${req.ip} ${Date.now() - now}ms`)));
    }
}