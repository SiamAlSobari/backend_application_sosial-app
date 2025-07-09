import Notification from '#models/notification'
import type { HttpContext } from '@adonisjs/core/http'

export default class NotificationsController {
    public async getSomeNotifications({response,request,auth}: HttpContext) {
        const notification = await Notification.query().where('receiver_id',auth.user!.id).where('is_read',false).orderBy('created_at','desc').limit(5)
        response.status(200).json({
            message: 'Notifications fetched successfully',
            data: notification
        })
    }
}