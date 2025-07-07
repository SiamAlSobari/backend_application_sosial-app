 import Bookmark from '#models/bookmark'
import { createPostBookmarkValidator } from '#validators/bookmark'
import type { HttpContext } from '@adonisjs/core/http'

export default class BookmarksController {
    public async createPostBookmark({request,response,auth}: HttpContext) {
        const payload = await request.validateUsing(createPostBookmarkValidator)
        const create = await Bookmark.create({
            postId: payload.postId,
            userId: auth.user!.id
        })
        response.status(201).json({
            message: 'Bookmark created successfully',
            data: create
        })
    }

    public async deletePostBookmark({params,response}: HttpContext) {
        const bookmark = await Bookmark.findOrFail(params.id)
        await bookmark.delete()
        response.status(200).json({
            message: 'Bookmark deleted successfully',
            data: bookmark
        })
    }
}