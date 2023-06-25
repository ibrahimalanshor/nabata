import { Controller, Get, UseGuards } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Auth } from 'src/auth/auth.decorator';
import { User } from 'src/user/user.entity';

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
}
