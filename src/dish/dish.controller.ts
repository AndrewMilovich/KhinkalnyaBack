import {Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {DishService} from "./dish.service";
import {Dish} from "@prisma/client";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('dish')
export class DishController {
    constructor(private dishService: DishService) {
    }

    @Get()
    GetAllDishes() {
        return this.dishService.getAllDishes()
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    addDish(@UploadedFile() file, @Body() dish: Dish) {
        return this.dishService.createDish(dish, file);
    }

    @Put('id')
    updateDishById(@Param() id, @Body() dish: Partial<Dish>) {
        return this.dishService.updateDishById(id, dish)
    }

    @Get('locality/:id')
    getDishByLocality(@Param('id') id:string) {
        return this.dishService.dishByLocalityId(id)
    }
}
