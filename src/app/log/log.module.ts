import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { Log, LogSchema } from 'src/schemas/log.schema';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  controllers: [LogController],
  providers: [LogService, LogInterceptor],
  exports: [LogService],
})
export class LogModule {}
