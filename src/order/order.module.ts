import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {PrismaService} from "../core/prisma.service";
import {DishService} from "../dish/dish.service";
import {S3Service} from "../s3/s3.service";

@Module({
  providers: [OrderService,PrismaService,DishService,S3Service],
  controllers: [OrderController]
})
export class OrderModule {}
