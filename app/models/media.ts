import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Post from './post.js'

export default class Media extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare url: string

  @column()
  declare type: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  
  @column()
  declare postId: string

  @belongsTo(() => Post)
  declare post: BelongsTo<typeof Post>


  @beforeCreate()
  public static assignUuid(media: Media) {
    media.id = randomUUID()
  }
}