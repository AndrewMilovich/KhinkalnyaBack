import {CanActivate, ExecutionContext, HttpStatus, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";

export class JwtGuard implements CanActivate{
    constructor() {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const accessToken = authHeader.split(' ')[1];
            if (bearer !== 'Bearer' || !accessToken) {
                throw new UnauthorizedException(
                    HttpStatus.UNAUTHORIZED,
                    'UNAUTHORIZED',
                );
            }
            console.log(accessToken)
return false
        }catch (e) {
            console.log(e)
        }
    }}