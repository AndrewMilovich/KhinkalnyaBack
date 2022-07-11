import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './core/prisma.service';
import { AdminModule } from './admin/admin.module';
import { DishModule } from './dish/dish.module';
import { S3Module } from './s3/s3.module';
import {AccessTokenMiddleware} from "./auth/middleware/access-token.middleware";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {TokenService} from "./auth/token/token.service";
import { LocalityModule } from './locality/locality.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [AuthModule, UserModule, AdminModule, DishModule, S3Module,JwtModule, LocalityModule, RestaurantModule],
  controllers: [AppController],
  providers: [AppService, PrismaService,TokenService,JwtService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer
        .apply(AccessTokenMiddleware)
        .forRoutes('user');
  }
}
