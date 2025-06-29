import { PostService } from '#services/post_service'
import { createPostValidator } from '#validators/post'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PostsController {
    constructor(
        private readonly postService: PostService
    ) {}

    public async createPost({request,auth,response}: HttpContext) {
        const payload = await request.validateUsing(createPostValidator)
        if (!payload.caption && (!payload.media || payload.media.length === 0)) {
            response.badRequest({
                message: 'Caption or media is required'
            })
        }
        const post = await this.postService.createPostWithMedia(
            auth.user!.id,
            payload.caption || '',
            payload.media || [],
            request
        )
        return post
    }
}