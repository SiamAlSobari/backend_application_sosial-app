import Like from '#models/like'
import Notification from '#models/notification'
import Profile from '#models/profile'
import { likeValidator } from '#validators/like'
import type { HttpContext } from '@adonisjs/core/http'

export default class LikesController {
    public async createLike({request,response,auth}: HttpContext) {
        const payload = await request.validateUsing(likeValidator)
        const create = await Like.create({
            postId: payload.postId,
            userId: auth.user!.id
        })
        
        const profile = await Profile.query().where('user_id',auth.user!.id).firstOrFail()
        // mencegah notification di like sendiri, jika userId yang login tidak sama dengan receiver maka jalankan notification
        if (auth.user!.id !== payload.receiverId) {
            await Notification.create({
                type: 'like',
                senderId: auth.user!.id,
                receiverId: payload.receiverId,
                isRead: false,
                message:`${profile.name} menyukai postingan anda`
            })
        }

        response.status(201).json({
            message: 'Like created successfully',
            data: create
        })
    }

    public async deleteLike({params,response,auth}: HttpContext) {
        const like = await Like.query().where('post_id',params.id).where('user_id',auth.user!.id).delete()
        response.status(200).json({
            message: 'Like deleted successfully',
            data: like
        })
    }

    public async getLIkeByPostId({params,response}: HttpContext) {
        const like = await Like.query().where('post_id',params.id)
        response.status(200).json({
            message: 'Like fetched successfully',
            data: like
        })
    }
}