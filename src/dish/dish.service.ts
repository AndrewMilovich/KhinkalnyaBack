import {Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {Dish} from "@prisma/client";
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
                    localityId: Number(dish.localityId),
                    restaurantId: Number(dish.restaurantId)
                }
            })
        }
        return this.prismaService.dish.create({
            data: {
                ...dish,
                image: '',
                price: Number(dish.price),
                weight: Number(dish.weight),
                localityId: Number(dish.localityId),
                restaurantId: Number(dish.restaurantId)
            }
        })
    }

    async getAllDishes(): Promise<Dish[]> {
        return this.prismaService.dish.findMany()
    }

    public async updateDishById(id: string, data: Partial<Dish>): Promise<Dish> {
        return this.prismaService.dish.update({where: {id: Number(id)}, data: data})
    }
    public async getDishById(id: string): Promise<Dish> {
        return this.prismaService.dish.findUnique({where: {id: Number(id)}})
    }
    public async dishByLocalityId(id: string): Promise<Dish[]> {
        return this.prismaService.dish.findMany({where: {localityId: Number(id)}})
    }

    public async deleteById(id: string) {
        return this.prismaService.dish.delete({where: {id: Number(id)}})
    }
}
