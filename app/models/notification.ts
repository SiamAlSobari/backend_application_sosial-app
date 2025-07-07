import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare type:'like' | 'comment' | 'friend_request' | 'comment_reply' | 'accepted_friend_request' | 'rejected_friend_request'

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

}