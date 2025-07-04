import Comment from '#models/comment'
import { commentRootValidator } from '#validators/comment'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentsController {
    public async createRootComment({request,response,auth}: HttpContext) {
        const payload = await request.validateUsing(commentRootValidator)
        const create = await Comment.create({
            comment: payload.comment,
            postId: payload.postId,
            userId: auth.user!.id,
            parentId: null
        })
        response.status(201).json({
            message: 'Comment created successfully',
            data: create
        })
    }
}