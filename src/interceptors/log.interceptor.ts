import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogService } from 'src/app/logs/log.service';
import { LogDto } from 'src/app/logs/dto/log.dto';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        try {
          let log: LogDto = new LogDto();
          log.ip = req.ip;
          log.id = req.user?.id;
          log.method = req.method;
          log.path = req.originalUrl;
          log.status = parseInt(res.statusCode);
          log.time = Date.now() - now;
          this.logService.create(log);
        } catch (error) {
          throw new BadRequestException(error);
        }
      }),
    );
  }
}
