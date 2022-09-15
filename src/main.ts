import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception_filter/http.exception.filter';
import { LoggerInterceptor } from './interceptor/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggerInterceptor());
  await app.listen(3000);
}
bootstrap();
