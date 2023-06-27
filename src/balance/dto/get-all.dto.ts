import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { PageDto } from "src/database/dto/page.dto";

export class GetAllDto {
    @ValidateNested({ each: true })
    @Type(() => PageDto)
    page: PageDto

    @IsArray()
    @IsString({each: true})
    order: string[]
}