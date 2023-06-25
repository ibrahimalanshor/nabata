import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule as Jwt, JwtService } from "@nestjs/jwt";

@Module({
    imports: [Jwt.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        global: true,
        useFactory: (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET')
        })
    })],
    exports: [Jwt]
})
export class JwtModule {}