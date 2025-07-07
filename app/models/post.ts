import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Media from './media.js'
import User from './user.js'
import Like from './like.js'
import Comment from './comment.js'
import Bookmark from './bookmark.js'

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

  // Foreign Keys to User
  @column({ columnName: 'user_id' })
  declare userId: string
  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  // Relations to Media
  @hasMany(() => Media, {
    foreignKey: 'postId',
    localKey: 'id',
  })
  declare media: HasMany<typeof Media>

  // Relations to Like
  @hasMany(() => Like, {
    foreignKey: 'postId',
    localKey: 'id',
  })
  declare likes: HasMany<typeof Like>

  // Relations to Comment
  @hasMany(() => Comment, {
    foreignKey: 'postId',
    localKey: 'id',
  })
  declare comments: HasMany<typeof Comment>

  // Relations to Bookmark
  @hasMany(() => Bookmark, {
    foreignKey: 'postId',
    localKey: 'id',
  })
  declare bookmarks: HasMany<typeof Bookmark>

  @beforeCreate()
  public static assignUuid(post: Post) {
    post.id = randomUUID()
  }

  @beforeCreate()
  public static makePublic(post: Post) {
    post.is_private = false
  }
}
