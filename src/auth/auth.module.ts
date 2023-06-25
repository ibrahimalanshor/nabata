import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "src/jwt/jwt.module";

@Module({
    imports: [UserModule, JwtModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}