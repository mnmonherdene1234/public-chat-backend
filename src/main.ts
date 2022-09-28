import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './utils/http.exception.filter';
import { HTTPLoggerInterceptor } from './interceptors/http.logger.interceptor';
import { JoiPipe } from 'nestjs-joi/internal/joi.pipe';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.use(helmet());
  app.use(compression());
  app.setGlobalPrefix('/v1/api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HTTPLoggerInterceptor());
  app.useGlobalPipes(new JoiPipe());
  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`SERVER LISTENING ON ${port}`);
}
bootstrap();
