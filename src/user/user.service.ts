import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { User,Locality } from '@prisma/client';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async getAll(): Promise<User[]> {
    return this.prismaService.user.findMany({include:{order:true}});
  }

  getUsersById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id: Number(id) },
    });
  }

  async getUserByEmail(userEmail: string): Promise<User> {
    return this.prismaService.user.findFirst({ where: { email: userEmail } });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({ data: user });
  }

  deleteUserById(id: string): void {
    this.prismaService.user.delete({ where: { id: Number(id) } });
  }
}
