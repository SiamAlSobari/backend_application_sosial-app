import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'crypto'

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare type:'like' | 'comment' | 'friend_request' | 'comment_reply' | 'accepted_friend_request' | 'rejected_friend_request'

  @column({columnName: 'is_read'})
  declare isRead: boolean

  @column()
  declare message:string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  //Foreign key sender
  @column({ columnName: 'sender_id' })
  declare senderId: string
  @belongsTo(() => User, { foreignKey: 'senderId' })
  declare sender: BelongsTo<typeof User>

  //Foreign key receiver
  @column({ columnName: 'receiver_id' })
  declare receiverId: string
  @belongsTo(() => User, { foreignKey: 'receiverId' })
  declare receiver: BelongsTo<typeof User>

  @beforeCreate()
  public static assignUuid(notification: Notification) {
    notification.id = randomUUID()
  }

}