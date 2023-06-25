import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Auth } from 'src/auth/auth.decorator';
import { User } from 'src/user/user.entity';
import { CreateBalanceDto } from './dto/create.dto';

@Controller('balances')
export class BalanceController {
    constructor(private balanceService: BalanceService) {}

    @Get()
    @UseGuards(AuthGuard)
    async getAll(@Auth('user') user: User) {
        return await this.balanceService.findAll({
            filter: { userId: user.id }
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
