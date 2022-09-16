import { Logger, MiddlewareConsumer, Module } from "@nestjs/common";
import { LoggerMiddleware } from "src/middlewares/logger.middleware";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes();
    }
}