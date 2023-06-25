import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('balances')
export class Balance {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ default: 0 })
    amount: number

    @Column()
    userId: number

    @ManyToOne(() => User, {
        cascade: ['remove'],
        nullable: false
    })
    user: User
}