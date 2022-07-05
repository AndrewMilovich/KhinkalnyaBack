import {
    CanActivate,
    ExecutionContext,
    HttpStatus,
    UnauthorizedException,
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {PrismaService} from "../../core/prisma.service";
import {TokenService} from "../token/token.service";
import {AuthService} from "../auth.service";

export class AuthorizedGuard implements CanActivate {
constructor(private tokenService:TokenService,private authService:AuthService) {
}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const authHeader = request.headers.authorization;
                const bearer = authHeader.split(' ')[0];
                const accessToken = authHeader.split(' ')[1];
                console.log(accessToken)
            // console.log(verifyToken)
            if (bearer !== 'Bearer' || !accessToken|| accessToken ==='undefined') {
                throw new UnauthorizedException(
                    HttpStatus.UNAUTHORIZED,
                    'UNAUTHORIZED',
                );
            }

            return true;
        } catch (e) {
            console.log(e);
        }
    }
}
