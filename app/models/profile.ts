import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare avatar_image: string

  @column()
  declare banner_image: string

  @column()
  declare bio: string

  @column()
  declare negara: string

  @column()
  declare kota: string

  @column()
  declare pekerjaan: string

  @column()
  declare website: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @beforeCreate()
  public static assignUuid(profile: Profile) {
    profile.id = randomUUID()
  }
}
