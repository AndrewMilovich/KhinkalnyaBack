import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import {PrismaService} from "../core/prisma.service";
import {DishService} from "../dish/dish.service";
import {S3Service} from "../s3/s3.service";

@Module({
  controllers: [AdminController],
  providers: [AdminService,PrismaService,DishService,S3Service]
})
export class AdminModule {}
