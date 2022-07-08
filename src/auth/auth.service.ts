import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UserService} from '../user/user.service';
import * as bcrypt from 'bcrypt';
import {TokenService} from './token/token.service';
import {LoginUserDto} from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private tokenService: TokenService,
    ) {
    }

    //registration user
    async registration(userDto: CreateUserDto) {
        try {
            const findUser = await this.userService.getUserByEmail(userDto.email);
            if (findUser) {
                 new HttpException(
                    'user is already exist',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const hashPass = await bcrypt.hash(userDto.password, 7);
            const userFromDb = await this.userService.createUser({
                ...userDto,
                password: hashPass,
                age: Number(userDto.age),
            });
            return this.tokenService.generateToken(userFromDb);
        } catch (e) {
          throw new HttpException(e.message,404)
        }
    }

    //login User
    async login(data: LoginUserDto) {
        try {
            const userFromDb = await this._validate(data);
            if (userFromDb) {
                const tokenPairFromDb = await this.tokenService.getTokenPairByUserId(userFromDb.id);
                if (tokenPairFromDb) {
                    await this.tokenService.deleteTokenPair(userFromDb.id);
                }
            }
            return this.tokenService.generateToken(userFromDb);
        } catch (e) {
            console.log(e);
        }
    }

//logout
    async logout(accessToken: string) {
        try {
            const tokenPayload = await this.tokenService.verifyToken(accessToken, 'Access');
            if (!tokenPayload) {
                throw new UnauthorizedException(HttpStatus.UNAUTHORIZED, 'access token not valid')
            }
            return this.tokenService.deleteTokenPair(tokenPayload.id);
        } catch (e) {
            throw new HttpException('wrong email or password',403)
        }
    }

    //validation User from password
    private async _validate(data: LoginUserDto) {
        try {
            const userFromDb = await this.userService.getUserByEmail(data.email);
            const checkPassword = await bcrypt.compare(
                data.password,
                userFromDb.password,
            );
            if (userFromDb && checkPassword) {
                return userFromDb;
            }
        } catch (e) {
           new UnauthorizedException(
                HttpStatus.UNAUTHORIZED,
                'wrong email or password',
            );
            console.log(e);
        }
    }

    async refresh(refreshToken: string) {

        try {
            const tokenPayload = await this.tokenService.verifyToken(refreshToken, 'Refresh');
            console.log(tokenPayload)
            const tokenPairByUserId = await this.tokenService.getTokenPairByUserId(tokenPayload.id);
            if (!tokenPayload || refreshToken !== tokenPairByUserId.refreshToken) {
                return new HttpException(
                    'token not valid',
                    HttpStatus.BAD_REQUEST,
                );
            }
            await this.tokenService.deleteTokenPair(tokenPayload.id);
            return this.tokenService.generateToken(tokenPayload);
        } catch (e) {
            console.log(e);
        }
    }
}
