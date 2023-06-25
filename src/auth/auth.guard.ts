import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = request.headers.authorization

        if (!token) {
            throw new UnauthorizedException()
        }

        try {
            const payload = await this.jwtService.verify(token)
            const user = await this.userService.findOne({ filter: { id: payload.user_id } })

            request.user = user
        } catch (err) {
            throw new UnauthorizedException()
        }

        return true
    }
}