import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../core/prisma.service';

@Module({
  providers: [TokenService, JwtService, PrismaService],
})
export class TokenModule {}
