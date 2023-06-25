import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './balance.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([Balance]), UserModule],
  controllers: [BalanceController],
  providers: [BalanceService]
})
export class BalanceModule {}
