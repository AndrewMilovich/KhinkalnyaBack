import {Body, Controller, Post} from '@nestjs/common';
import {DishService} from "../dish/dish.service";
import {CreateDishDto} from "../dish/dto/create-dish.dto";

@Controller('admin')
export class AdminController {
    constructor(private dishService: DishService) {
    }

}
