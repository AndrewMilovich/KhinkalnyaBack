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
                throw new HttpException(
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
            throw new HttpException(e.message, 404)
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
            throw new HttpException('wrong email or password', 401)
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
            throw new HttpException('token not valid', 402)
        }
    }

    //validation User from password
    private async _validate(data: LoginUserDto) {
        try {
            const userFromDb = await this.userService.getUserByEmail(data.email);
            if (userFromDb === null) {
                throw new HttpException('wrong email or  password', 402)
            }
            const checkPassword = await bcrypt.compare(
                data.password,
                userFromDb.password,
            );
            if (userFromDb && checkPassword) {
                return userFromDb;
            }else
            {
                throw new HttpException('wrong password', 402)
            }
        } catch (e) {
            throw new HttpException('wrong email or  password', 402)

        }
    }

    async refresh(refreshToken: string) {

        try {
            const tokenPayload = await this.tokenService.verifyToken(refreshToken, 'Refresh');
            console.log(tokenPayload)
            const tokenPairByUserId = await this.tokenService.getTokenPairByUserId(tokenPayload.id);
            if (!tokenPayload || refreshToken !== tokenPairByUserId.refreshToken) {
                throw new HttpException('token not valid', 402)
            }
            await this.tokenService.deleteTokenPair(tokenPayload.id);
            return this.tokenService.generateToken(tokenPayload);
        } catch (e) {
            throw new HttpException('token not valid', 402)
        }
    }
}
