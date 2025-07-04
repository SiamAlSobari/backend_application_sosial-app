import type { HttpContext } from '@adonisjs/core/http'

export default class CommentsController {
    public async createRootComment({request,response,auth}: HttpContext) {}
}