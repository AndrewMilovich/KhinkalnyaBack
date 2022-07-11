import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {DishService} from "./dish.service";
import {CreateDishDto} from "./dto/create-dish.dto";
import {Dish} from "@prisma/client";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('dish')
export class DishController {
constructor(private prismaService:PrismaService,private dishService:DishService) {
}
    @Get()
    GetAllDishes(){
        return this.dishService.getAllDishes()
    }
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    addDish(@UploadedFile() file, @Body() dish: Dish) {
        return this.dishService.createDish(dish,file);
    }
}
