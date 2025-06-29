import { getBaseUrl } from '#config/filename'
import Post from '#models/post'
import { PostService } from '#services/post_service'
import { createPostValidator } from '#validators/post'
import { inject } from '@adonisjs/core'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

@inject()
export default class PostsController {
    constructor(
        private readonly postService: PostService
    ) {}

    public async createPost({request,response,auth}: HttpContext) {
        const payload = await request.validateUsing(createPostValidator)
        const post = await this.postService.createPostWithMedia(
            auth.user!.id,
            payload.caption,
            payload.media,
            request
        )
        return post
    }
}