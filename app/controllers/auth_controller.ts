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
            name: payload.name,
        })
        response.status(200).json(user)
    }

    public async login({request,response,auth}:HttpContext) {
        const payload = await request.validateUsing(registerValidator)
        const user = await User.verifyCredentials(payload.email,payload.password)
        const token = await auth.use('web').login(user)
        return user
    }
}