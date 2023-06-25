import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateBalanceDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount: number
}