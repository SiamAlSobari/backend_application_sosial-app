import User from "#models/user";
import { inject } from "@adonisjs/core";

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

interface LoginPayload {
    email: string;
    password: string;
}

@inject()
export class AuthService {
    public async register(payload:RegisterPayload) {
        const existingUser = await User.findBy('email', payload.email)
        if (existingUser) {
            throw new Error('User already exists')
        }
        const user = await User.create({
            email: payload.email,
            password: payload.password
        })
        await user.related('profile').create({
            name: payload.name
        })
        return user
    }

    public async login(payload:LoginPayload) {
        const user = await User.verifyCredentials(payload.email, payload.password)
        await user.load('profile')
        if (!user) {
            throw new Error('User not found')
        }
        return user
    }
}