import {HttpException, Injectable} from '@nestjs/common';
import {PrismaService} from '../core/prisma.service';
import {User} from '@prisma/client';
import {CreateUserDto} from '../auth/dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {
    }

    async getAll(): Promise<User[]> {
        return this.prismaService.user.findMany({include:{_count:{select:{order:true}}}});
    }

    getUsersById(id: string): Promise<User> {
        return this.prismaService.user.findUnique({
            where: {id: Number(id)},
        });
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.prismaService.user.findUnique({where: {email: email}});
    }

    async createUser(user: CreateUserDto): Promise<User> {
        return this.prismaService.user.create({data: user});
    }

    deleteUserById(id: string): void {
        this.prismaService.user.delete({where: {id: Number(id)}});
    }

    // async getAllAt() {
    //     const groupBy = await this.prismaService.user.groupBy({
    //         by: ['createdAt'],
    //         where: {
    //             createdAt: {
    //                 equals: new Date().getMonth().toString()
    //             },
    //         },
    //     })
    //     console.log(groupBy)
    //     return groupBy
    // }
}
