import { AuthService } from '#services/auth_service'
import { loginValidator, registerValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthController {
    constructor(
        private readonly authService:AuthService
    ) {}

    public async register({request,response}:HttpContext) {
        const payload = await request.validateUsing(registerValidator)
        try {
            const user = await this.authService.register(payload)
            response.status(201).json({
                message: 'User registered successfully',
                data: user
            })
        } catch (error) {
            response.badRequest({
                message: error.message
            })
        }
    }

    public async login({request,response,auth}:HttpContext) {
        const payload = await request.validateUsing(loginValidator)
        try {
            const user = await this.authService.login(payload)
            await auth.use('web').login(user)
            response.status(200).json({
                message: 'User logged in successfully',
                data: user
            })
        } catch (error) {
            response.badRequest({
                message: error.message
            })
        }

    }

    public async logout({auth,response}:HttpContext) {
        await auth.use('web').logout()
        response.status(200).json({
            message: 'User logged out successfully',
        })
    }
}