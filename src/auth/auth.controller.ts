import { Body, Controller, HttpCode, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto) {
        return {
            accessToken: await this.authService.login({ credential: loginDto })
        }
    }

    @Post('register')
    @HttpCode(200)
    async register(@Body() registerDto: RegisterDto) {
        return {
            accessToken: await this.authService.register({ credential: registerDto })
        }
    }
}