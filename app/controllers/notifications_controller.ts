import Notification from '#models/notification'
import type { HttpContext } from '@adonisjs/core/http'

export default class NotificationsController {
  public async getSomeNotifications({ response, auth }: HttpContext) {
    const notification = await Notification.query()
      .where('receiver_id', auth.user!.id)
      .where('is_read', false)
      .orderBy('created_at', 'desc')
      .limit(5)
      .preload('sender', (query) => {
        query.preload('profile')
      })
    response.status(200).json({
      message: 'Notifications fetched successfully',
      data: notification,
    })
  }

  public async getCountIsReadFalseNotifications({ response, auth }: HttpContext) {
    const count = await Notification.query()
      .where('receiver_id', auth.user!.id)
      .where('is_read', false)
      .count('* as total')
    const parsing = Number(count[0].$extras.total)
    response.status(200).json({
      message: 'Notifications count fetched successfully',
      data: parsing,
    })
  }

  public async getAllNotifications({ response, auth }: HttpContext) {
    const notification = await Notification.query()
      .where('receiver_id', auth.user!.id)
      .orderBy('created_at', 'desc')
      .preload('sender', (query) => {
        query.preload('profile')
      })
    response.status(200).json({
      message: 'Notifications fetched successfully',
      data: notification,
    })
  }

  public async updateAllNotifications({ response, auth }: HttpContext) {
    const notification = await Notification.query()
      .where('receiver_id', auth.user!.id)
      .where('is_read', false)
      .update({ is_read: true })
    response.status(200).json({
      message: 'Notifications updated successfully',
      data: notification,
    })
  }
}
