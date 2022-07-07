import {Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {Dish, Locality} from "@prisma/client";
import {CreateDishDto} from "./dto/create-dish.dto";
import {S3Service} from "../s3/s3.service";

@Injectable()
export class DishService {
    constructor(private prismaService: PrismaService, private s3: S3Service) {
    }

    async createDish(dish: Dish, file): Promise<Dish> {
        if (file) {
            const img = await this.s3.uploadFile(file)
            return this.prismaService.dish.create({
                data: {
                    ...dish,
                    image: img.Location,
                    price: Number(dish.price),
                    weight: Number(dish.weight),
                    localityId: Number(dish.localityId)
                }
            })
        }
        return this.prismaService.dish.create({
            data: {
                ...dish,
                image: '',
                price: Number(dish.price),
                weight: Number(dish.weight),
                localityId: Number(dish.localityId)
            }
        })
    }

    async getAllDishes(): Promise<Dish[]> {
        return this.prismaService.dish.findMany()
    }

    async getLocality(): Promise<Locality[]> {
        return this.prismaService.locality.findMany({include: {Dish: true}});
    }
}
