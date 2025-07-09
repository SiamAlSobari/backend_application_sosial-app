import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class FollowRequest extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  
  // forign key sender
  @column({ columnName: 'sender_id' })
  declare senderId: string
  @belongsTo(() => User, { foreignKey: 'senderId' })
  declare sender: BelongsTo<typeof User>

  // forign key receiver
  @column({ columnName: 'receiver_id' })
  declare receiverId: string
  @belongsTo(() => User, { foreignKey: 'receiverId' })
  declare receiver: BelongsTo<typeof User>

  @beforeCreate()
  public static assignUuid(followRequest: FollowRequest) {
    followRequest.id = randomUUID()
  }
}