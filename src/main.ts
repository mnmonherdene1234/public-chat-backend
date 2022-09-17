import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './utils/http.exception.filter';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { JoiPipe } from 'nestjs-joi/internal/joi.pipe';
import { LogService } from './app/log/log.service';
import { Model } from 'mongoose';
import { LogDocument } from './schemas/log.schema';
import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalPipes(new JoiPipe());
  await app.listen(process.env.PORT);
  console.log(`MY SERVER LISTENING ON ${process.env.PORT}🥰`);
}
bootstrap();
