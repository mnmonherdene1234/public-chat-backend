import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './utils/http.exception.filter';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { JoiPipe } from 'nestjs-joi/internal/joi.pipe';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.use(compression());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalPipes(new JoiPipe());
  await app.listen(process.env.PORT);
  console.log(`MY SERVER LISTENING ON ${process.env.PORT}`);
}
bootstrap();
