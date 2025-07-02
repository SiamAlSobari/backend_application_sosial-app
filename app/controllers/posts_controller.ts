import Post from '#models/post'
import { PostService } from '#services/posts_service'
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
            return response.badRequest({
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

    public async getPosts({response,request}:HttpContext){
        const {page = '1', limit = '10'} = request.qs()
        const parsedPage = parseInt(page)
        const parsedLimit = parseInt(limit)
        const posts = await Post.query().preload('media').preload('user',
            (query) => {
                query.preload('profile')
            }
        ).orderBy('created_at','desc').paginate(parsedPage,parsedLimit)
        response.status(200).json({
            message: 'Posts fetched successfully',
            total_page: posts.lastPage,
            current_page:posts.currentPage,
            perPage:posts.perPage,
            total: posts.total,
            data: posts.toJSON()
        })
    }
}