import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { EntityNotFoundError } from "typeorm";
import { compare } from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import {  } from 'typeorm'

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async attemp(options: { credential: { email: string, password: string }}): Promise<User> {
        try {
            const user = await this.userService.findOne({
                filter: { email: options.credential.email }
            })

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

    async register(options: { credential: Partial<User> }): Promise<string> {
        try {
            const user = await this.userService.create({
                values: options.credential
            })
    
            return await this.generateToken(user)
        } catch (err) {
            if (err.errno === 1062) {
                throw new BadRequestException("Email already exists")
            }

            throw err
        }
    }
}