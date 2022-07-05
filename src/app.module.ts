import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './core/prisma.service';
import { AdminModule } from './admin/admin.module';
import { DishModule } from './dish/dish.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [AuthModule, UserModule, AdminModule, DishModule, S3Module],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
