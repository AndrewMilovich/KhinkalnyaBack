import {Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import { Restaurant} from "@prisma/client";
import {CreateRestaurantDto} from "./dto/create-restaurant.dto";

@Injectable()
export class RestaurantService {
    constructor(private prismaService: PrismaService) {
    }

    public async getRestaurant(): Promise<Restaurant[]> {
        return this.prismaService.restaurant.findMany();
    }

    public async addRestaurant(data: CreateRestaurantDto): Promise<Restaurant> {
        return this.prismaService.restaurant.create({data})
    }

    public async updateRestaurantById(data: CreateRestaurantDto, id: string): Promise<Restaurant> {
        return this.prismaService.restaurant.update({where: {id: Number(id)}, data: data})
    }

    public async deleteById(id: string) {
        return this.prismaService.restaurant.delete({where: {id: Number(id)}})
    }
}
