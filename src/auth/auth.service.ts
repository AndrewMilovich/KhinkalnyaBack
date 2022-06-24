import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {TokenService} from "./token/token.service";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private tokenService: TokenService) {
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
                age: Number(userDto.age)
            });
            return this.tokenService.generateToken(userFromDb);
        } catch (e) {
            console.log(e);
            return e.message[0]
        }
    }

    async login(data: LoginUserDto) {
        try {
            const userFromDb = await this._validate(data)
            await this.tokenService.deleteTokenPair(userFromDb.id)
            return this.tokenService.generateToken(userFromDb)
        } catch (e) {
            console.log(e);
        }
    }

    private async _validate(data: LoginUserDto) {
        try {
            const userFromDb = await this.userService.getUserByEmail(data.email)
            const checkPassword = await bcrypt.compare(data.password, userFromDb.password)
            if (userFromDb && checkPassword) {
                return userFromDb
            }
        } catch (e) {
            new UnauthorizedException(
                HttpStatus.UNAUTHORIZED,
                'wrong email or password')
            console.log(e);
        }

    }

}
