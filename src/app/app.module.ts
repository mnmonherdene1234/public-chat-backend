import {
  Module,
  NestModule,
  MiddlewareConsumer,
  Global,
  CacheModule,
  CacheInterceptor,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleGuard } from 'src/guards/role.guard';
import { User, UserSchema } from 'src/schemas/user.schema';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogModule } from './log/log.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';

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
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    UserModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    RoleGuard,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserService,
    RoleGuard,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes();
  }
}
