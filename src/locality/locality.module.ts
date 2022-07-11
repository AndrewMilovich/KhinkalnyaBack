import { Module } from '@nestjs/common';
import { LocalityController } from './locality.controller';
import { LocalityService } from './locality.service';
import {PrismaService} from "../core/prisma.service";

@Module({
  controllers: [LocalityController],
  providers: [LocalityService,PrismaService]
})
export class LocalityModule {}
