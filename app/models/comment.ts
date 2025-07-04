import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import Post from './post.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare comment: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // foreign key post
  @column({ columnName: 'post_id' })
  declare postId: string
  @belongsTo(() => Post, { foreignKey: 'postId' })
  declare post: BelongsTo<typeof Post>

  //foreign key user
  @column({ columnName: 'user_id' })
  declare userId: string
  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>

  //foregn key parent
  @column({ columnName: 'parent_id' })
  declare parentId: string | null
  @belongsTo(() => Comment, { foreignKey: 'parentId', localKey: 'id' })
  declare parent: BelongsTo<typeof Comment>

  //relations children comments
  @hasMany(() => Comment, {
    foreignKey: 'parentId',
    localKey: 'id',
  })
  declare children: HasMany<typeof Comment>

  @beforeCreate()
  public static assignUuid(comment: Comment) {
    comment.id = randomUUID()
  }
}
