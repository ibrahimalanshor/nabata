import { Body, Controller, Get, HttpCode, Post, Query, UseGuards } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Auth } from 'src/auth/auth.decorator';
import { User } from 'src/user/user.entity';
import { CreateBalanceDto } from './dto/create.dto';
import { GetAllDto } from './dto/get-all.dto';

@Controller('balances')
export class BalanceController {
    constructor(private balanceService: BalanceService) {}

    @Get()
    @UseGuards(AuthGuard)
    async getAll(@Auth('user') user: User, @Query() query: GetAllDto) {
        console.log(query)
        return await this.balanceService.findAll({
            filter: { userId: user.id },
            page: query.page,
            // order: query.order
        })
    }

    @Post()
    @UseGuards(AuthGuard)
    @HttpCode(201)
    async create(@Body() createBalanceDto: CreateBalanceDto, @Auth('user') user: User) {
        return await this.balanceService.create({
            values: {
                ...createBalanceDto,
                userId: user.id
            }
        })
    }
}
