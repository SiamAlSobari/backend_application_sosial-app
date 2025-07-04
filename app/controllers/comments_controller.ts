import { commentRootValidator } from '#validators/comment'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentsController {
    public async createRootComment({request,response,auth}: HttpContext) {
        const payload = await request.validateUsing(commentRootValidator)
        
    }
}