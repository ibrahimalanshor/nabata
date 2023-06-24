import { UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { EntityNotFoundError, Repository } from "typeorm";
import { compare, hash } from 'bcrypt'
import { JwtService } from "@nestjs/jwt";

export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) {}

    async attemp(options: { credential: { email: string, password: string }}): Promise<User> {
        try {
            const user = await this.userRepository.findOneByOrFail({ email: options.credential.email })

            if (!(await compare(options.credential.password, user.password))) {
                throw new UnauthorizedException("Password Incorrect")
            }

            return user
        } catch (err) {
            if (err instanceof EntityNotFoundError) {
                throw new UnauthorizedException("Credential not found")
            }

            throw err
        }
    }

    async generateToken(user: User): Promise<string> {
        return await this.jwtService.sign({
            user_id: user.id
        }, { expiresIn: '15m' })
    }
    
    async login(options: { credential: { email: string, password: string } }): Promise<string> {
        const user = await this.attemp({ credential: options.credential })

        return await this.generateToken(user)
    }
}