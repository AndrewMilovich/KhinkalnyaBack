import { Module } from '@nestjs/common';
import { LocalityController } from './locality.controller';
import { LocalityService } from './locality.service';
import {PrismaService} from "../core/prisma.service";
import {S3Service} from "../s3/s3.service";

@Module({
  controllers: [LocalityController],
  providers: [LocalityService,PrismaService,S3Service]
})
export class LocalityModule {}
