import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { PageDto } from "src/database/dto/page.dto";

export class GetAllDto {
    @ValidateNested({ each: true })
    @Type(() => PageDto)
    page: PageDto
}