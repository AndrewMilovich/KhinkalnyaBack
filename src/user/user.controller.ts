import {Controller, Get} from '@nestjs/common';
import {User} from "@prisma/client";
import {UserService} from "./user.service";

@Controller('user')
export class UserController {
    constructor(private userService:UserService) {
    }
    @Get()
    GetUsers():Promise<User[]>{
        return  this.userService.getAll()
    }

}
