import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {RestaurantService} from "./restaurant.service";
import {CreateRestaurantDto} from "./dto/create-restaurant.dto";

@Controller('restaurant')
export class RestaurantController {
    constructor(private restaurantService: RestaurantService) {
    }

    @Get()
    GetRestaurant() {
        return this.restaurantService.getRestaurant();
    }

    @Post()
    AddRestaurant(@Body() data: CreateRestaurantDto) {
        return this.restaurantService.addRestaurant(data)
    }

    @Put('/:id')
    updateById(@Param('id') id: string, @Body() data: CreateRestaurantDto) {
        return this.restaurantService.updateRestaurantById(data, id)
    }

    @Delete('/:id')
    deleteById(@Param('id') id: string) {
        return this.restaurantService.deleteById(id)
    }
}
