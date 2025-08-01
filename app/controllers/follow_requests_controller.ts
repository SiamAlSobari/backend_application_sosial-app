 import FollowRequest from '#models/follow_request'
import Follower from '#models/follower'
import Notification from '#models/notification'
import Profile from '#models/profile'
import { followRequestValidator } from '#validators/follow_request'
import type { HttpContext } from '@adonisjs/core/http'

export default class FollowRequestsController {
    public async createFollowRequest({response,auth,request}: HttpContext) {
        const profile = await Profile.query().where('user_id',auth.user!.id).firstOrFail()
        const payload = await request.validateUsing(followRequestValidator)
        const create = await FollowRequest.create({
            senderId: auth.user!.id,
            receiverId: payload.receiverId
        })
        //mencegah notification di like sendiri, jika userId yang login tidak sama dengan receiver maka jalankan notification
        if (auth.user!.id !== payload.receiverId) {
            await Notification.create({
                type: 'follow_request',
                senderId: auth.user!.id,
                receiverId: payload.receiverId,
                isRead: false,
                message:`${profile.name} meminta follow anda`
            })
        }
        //create follower dimana auth.user!.id melakukan follow ke payload.receiverId/user yang di follow
        await Follower.create({
            followerId: auth.user!.id,
            followingId: payload.receiverId
        })
        response.status(201).json({
            message: 'Follow request created successfully',
            data: create
        })
    }
}