import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Follower extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // foreign keys followerId
  @column({ columnName: 'follower_id' })
  declare followerId: string
  @belongsTo(() => User, { foreignKey: 'followerId' })
  declare follower: BelongsTo<typeof User>


  
  // foreign keys followingId
  @column({ columnName: 'following_id' })
  declare followingId: string
  @belongsTo(() => User, { foreignKey: 'followingId' })
  declare following: BelongsTo<typeof User>


  @beforeCreate()
  public static assignUuid(follower: Follower) {
    follower.id = randomUUID()
  }
}