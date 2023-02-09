import { MiddlewareConsumer, Module } from "@nestjs/common";
// import { APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import User from "./user.entity";
import AuthService from "./auth.service";
// import CurrentUserInterceptor from "./interceptors/currentUser.interceptor";
import CurrentUserMiddleware from "./middlewares/currentUser.middleware";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        UsersService,
        AuthService,
        // { useClass: CurrentUserInterceptor, provide: APP_INTERCEPTOR },
    ],
    controllers: [UsersController],
})
export class UsersModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CurrentUserMiddleware).forRoutes("*");
    }
}
