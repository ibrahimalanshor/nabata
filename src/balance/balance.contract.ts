import { Balance } from "./balance.entity"

export interface GetAllBalanceOptions {
    filter: {
        userId: number
    }
}

export interface CreateBalanceOptions {
    values: Partial<Balance>
}