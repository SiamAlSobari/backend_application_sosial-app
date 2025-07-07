import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import User from './user.js'
import Post from './post.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Bookmark extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  //foreign keys user
  @column({ columnName: 'user_id' })
  declare userId: string
  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>


  //foreign keys post
  @column({ columnName: 'post_id' })
  declare postId: string
  @belongsTo(() => Post, { foreignKey: 'postId' })
  declare post: BelongsTo<typeof Post>

  @beforeCreate()
  public static assignUuid(bookmark: Bookmark) {
    bookmark.id = randomUUID()
  }
}