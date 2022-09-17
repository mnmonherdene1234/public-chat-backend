import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user.schema';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { LogModule } from '../log/log.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    LogModule
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
