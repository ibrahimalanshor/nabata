import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hash } from "bcrypt";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async findOne(options: { filter: Partial<User>}): Promise<User> {
        return await this.userRepository.findOneByOrFail(options.filter)
    }

    async create(options: { values: Partial<User> }): Promise<User> {
        try {
            const user = this.userRepository.create({
                ...options.values,
                password: await hash(options.values.password, 10)
            })
            
            await this.userRepository.insert(user)
            
            return user
        } catch (err) {
            if (err.errno === 1062) {
                throw new ConflictException
            }

            throw err
        }
    }
}