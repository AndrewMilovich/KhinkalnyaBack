import {Controller, Get, UseGuards} from '@nestjs/common';
import {User} from "@prisma/client";
import {UserService} from "./user.service";
import {JwtGuard} from "../auth/guards/jwt-guard";

@Controller('user')
export class UserController {
    constructor(private userService:UserService) {
    }
    @Get()
    @UseGuards(JwtGuard)
    GetUsers():Promise<User[]>{
        return  this.userService.getAll()
    }

}
