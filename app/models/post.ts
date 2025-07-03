import { DateTime } from 'luxon'
import { BaseModel, beforeCreate,  belongsTo,  column, hasMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Media from './media.js'
import User from './user.js'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare caption: string

  @column()
  declare is_private: boolean


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Media, {
    foreignKey: 'postId',
    localKey: 'id',
  })
  declare media: HasMany<typeof Media>

  @column({ columnName: 'user_id' })
  declare userId: string

  @belongsTo(() => User,{
    foreignKey: 'userId'
  })
  declare user: BelongsTo<typeof User>

  @beforeCreate()
  public static assignUuid(post: Post) {
    post.id = randomUUID()
  }

  @beforeCreate()
  public static makePublic(post: Post) {
    post.is_private = false
  }
}