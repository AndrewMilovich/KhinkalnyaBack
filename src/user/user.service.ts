import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import {User} from "@prisma/client";
import {CreateUserDto} from "../auth/dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
    getAll(): Promise<User[]> {
        return this.prismaService.user.findMany();

    }
    getUsersById(id: string): Promise<User> {
        return this.prismaService.user.findUnique({
            where: { id: Number(id) },
        });
    }

    getUserByEmail(userEmail: string): Promise<User> {
        return this.prismaService.user.findFirst({ where: { email: userEmail } });
    }

    createUser(data: CreateUserDto): Promise<User> {
        return this.prismaService.user.create({data});
    }

    deleteUserById(id: string): void {
        this.prismaService.user.delete({ where: { id: Number(id) } });
    }


}
