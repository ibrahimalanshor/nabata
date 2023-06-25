import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from './balance.entity';
import { Repository } from 'typeorm';
import { CreateBalanceOptions, GetAllBalanceOptions } from './balance.contract';

@Injectable()
export class BalanceService {
    constructor(@InjectRepository(Balance) private balanceRepository: Repository<Balance>) {}

    async findAll(options: GetAllBalanceOptions) {
        const [data, count] = await this.balanceRepository.findAndCount({
            where: {
                userId: options.filter.userId
            }
        })

        return { count, data }
    }

    async create(options: CreateBalanceOptions) {
        const balance = this.balanceRepository.create(options.values)

        await this.balanceRepository.save(balance)

        return balance
    }
}
