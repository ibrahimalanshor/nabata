import { IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string
}