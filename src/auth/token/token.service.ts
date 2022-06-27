import {Injectable} from '@nestjs/common';
import {User, TokenPair} from "@prisma/client";
import {JwtService} from "@nestjs/jwt";
import {PrismaService} from "../../core/prisma.service";

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService, private prismaService: PrismaService) {
    }
//generate token
    async generateToken(user: User) {
        const payload = {email: user.email, id: user.id};
        const [access, refresh] = await Promise.all([
            this.jwtService.sign(payload, {secret: 'Access', expiresIn: '1d'}),
            this.jwtService.sign(payload, {secret: 'Refresh', expiresIn: '1h'}),
        ]);
        const tokenPair = await this.saveToken({access, refresh}, user.id);
        return {
            user,
            tokenPair
        };
    }
//save token to BD
    async saveToken(token, id: number): Promise<TokenPair> {
        return this.prismaService.tokenPair.create({
            data: {accessToken: token.access, refreshToken: token.refresh, authorId: id}
        })
    }
//delete token from BD
    async deleteTokenPair(id: number) {
        return this.prismaService.tokenPair.delete({where: {authorId: id}})
    }
}
