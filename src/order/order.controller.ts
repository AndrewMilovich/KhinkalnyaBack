import {Body, Controller, Post} from '@nestjs/common';
import {OrderService} from "./order.service";

@Controller('order')
export class OrderController {
    constructor(private  orderService:OrderService) {
    }
    @Post()
    AddLocality(@Body() data: any) {
        console.log(data)
        return this.orderService.createOrder(data)
    }

}
