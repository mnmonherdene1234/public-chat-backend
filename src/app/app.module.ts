import {
  Module,
  MiddlewareConsumer,
  Global,
  CacheModule,
  CacheInterceptor,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { MessageModule } from './messages/message.module';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 5,
      limit: 10,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 30,
      max: 100,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, { dbName: 'chat' }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    AuthModule,
    UserModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes();
  }
}
