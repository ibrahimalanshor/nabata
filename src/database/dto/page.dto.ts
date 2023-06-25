import { IsOptional, IsNumberString } from "class-validator"

export class PageDto {
    @IsOptional()
    @IsNumberString()
    number: number

    @IsOptional()
    @IsNumberString()
    size: number
}