import { Balance } from "./balance.entity"

export interface GetAllBalanceOptions {
    filter: {
        userId: number
    },
    page?: {
        size: number
        number: number
    },
    order?: Record<string, 'asc' | 'desc'>
}

export interface CreateBalanceOptions {
    values: Partial<Balance>
}