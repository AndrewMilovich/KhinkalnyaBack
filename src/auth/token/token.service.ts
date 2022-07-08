import {Injectable} from '@nestjs/common';
import {User, TokenPair} from '@prisma/client';
import {JwtService} from '@nestjs/jwt';
import {PrismaService} from '../../core/prisma.service';

@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService,
    ) {
    }

    public verifyToken(token, tokenType = 'Access') {
        try {
            let secret = 'Access'
            if (tokenType === 'Refresh') {
                secret = 'Refresh'
            }
            if (tokenType === 'Action') {
                secret = 'Action'
            }
            return this.jwtService.verify(token, {secret: secret})
        } catch (e) {
            return e.message;
        }
    }

    //generate token
    async generateToken(user: User) {
        try {
            const payload = {email: user.email, id: user.id, role: user.role};
            const [access, refresh] = await Promise.all([
                this.jwtService.sign(payload, {secret: 'Access', expiresIn: '2d'}),
                this.jwtService.sign(payload, {secret: 'Refresh', expiresIn: '1d'}),
            ]);
            const tokenPair = await this.saveToken({access, refresh}, user.id);
            return {
                user,
                tokenPair,
            };
        }catch (e) {
            console.log(e);
        }

    }

    //save token to BD
    async saveToken(token, id: number): Promise<TokenPair> {
        return this.prismaService.tokenPair.create({
            data: {
                accessToken: token.access,
                refreshToken: token.refresh,
                authorId: id,
            },
        });
    }

    //delete token from BD
    async deleteTokenPair(id: number) {
        try {
            if (!id) {
                throw new Error('invalid id...')
            }
            return this.prismaService.tokenPair.delete({where: {authorId: id}});
        } catch (e) {
            return e.message
        }

    }

    //get token by User
    async getTokenPairByUserId(id: number) {
        try {
            if (!id) {
                throw new Error('invalid id...')
            }
            return this.prismaService.tokenPair.findUnique({where: {authorId: id}});
        } catch (e) {
            return e.message
        }
    }
}
