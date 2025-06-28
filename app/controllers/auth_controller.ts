import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
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
        response.status(201).json({
            message: 'User created successfully',
            data: user
        })
    }

    public async login({request,response,auth}:HttpContext) {
        const payload = await request.validateUsing(loginValidator)
        const user = await User.verifyCredentials(payload.email,payload.password)
        await auth.use('web').login(user)
        response.status(200).json({
            message: 'User logged in successfully',
            data: user
        })
    }

    public async logout({auth,response}:HttpContext) {
        await auth.use('web').logout()
        response.status(200).json({
            message: 'User logged out successfully',
        })
    }
}