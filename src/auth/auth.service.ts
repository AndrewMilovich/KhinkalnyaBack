import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {TokenService} from "./token/token.service";

@Injectable()
export class AuthService {
    constructor( private userService: UserService, private tokenService:TokenService) {
    }

    async registration(userDto: CreateUserDto) {
        try {
            const findUser = await this.userService.getUserByEmail(userDto.email);
            if (findUser) {
                return new HttpException('user is already exist', HttpStatus.BAD_REQUEST);
            }
            const hashPass = await bcrypt.hash(userDto.password, 7);
            const userFromDb = await this.userService.createUser({
                ...userDto,
                password: hashPass,
                age:Number(userDto.age)
            });
            return this.tokenService.generateToken(userFromDb);
        } catch (e) {
            console.log(e);
            return e.message[0]
        }

    }



}
