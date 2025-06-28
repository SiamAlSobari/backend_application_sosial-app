import User from '#models/user'
import { registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    public async register({request,response}:HttpContext) {
        const payload = await request.validateUsing(registerValidator)
        const existingUser = await User.findBy('email',payload.email)
        if (existingUser) {
            return response.badRequest('Email already exists')
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
}