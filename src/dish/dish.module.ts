import { Module } from '@nestjs/common';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';
import {PrismaService} from "../core/prisma.service";
import {S3Service} from "../s3/s3.service";

@Module({
  controllers: [DishController],
  providers: [DishService,PrismaService,S3Service]
})
export class DishModule {}
