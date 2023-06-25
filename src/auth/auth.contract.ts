import { User } from "src/user/user.entity"

export interface UserCredential {
    email: string
    password: string
}
export interface AttempOptions {
    credential: UserCredential
}
export interface GenereateTokenOptions {
    user: User
}
export interface LoginOptions {
    credential: UserCredential
}
export interface RegisterOptions {
    user: Partial<User>
}