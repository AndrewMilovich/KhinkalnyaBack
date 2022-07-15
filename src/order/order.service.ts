import {Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {Order} from "@prisma/client";
import {DishService} from "../dish/dish.service";

@Injectable()
export class OrderService {
    constructor(private prismaService: PrismaService,private dishService:DishService) {
    }

    getAll(): Promise<Order[]> {
        return this.prismaService.order.findMany()
    }
   async createOrder(data:Order):Promise<Order>{
        for (const datum of data.dish) {
             const dishById = await this.dishService.getDishById(datum.toString());
            await this.dishService.updateDishById(datum.toString(),{quantity_sold:dishById.quantity_sold+1})
        }
        return this.prismaService.order.create({data})
    }
}
